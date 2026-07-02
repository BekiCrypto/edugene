"use client";

import { useEffect, useState } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Trash2,
  HardDrive,
  CheckCircle2,
  WifiOff,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface DownloadedItem {
  curriculumId: string;
  grade: number;
  curriculumName: string;
  savedAt: number;
  sizeBytes: number;
}

export function DownloadsView({
  curricula,
  onDownloaded,
}: {
  curricula: any[];
  onDownloaded: () => void;
}) {
  const { curriculumId, setCurriculum, grade, setGrade } = useAcademy();
  const [downloaded, setDownloaded] = useState<DownloadedItem[]>([]);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [storage, setStorage] = useState<{ usage: number; quota: number } | null>(null);

  const refresh = async () => {
    const all = await offlineStore.getAll();
    setDownloaded(all);
    const est = await offlineStore.estimateStorage();
    setStorage(est);
  };

  useEffect(() => {
    refresh();
  }, []);

  async function downloadBundle(cId: string, g: number) {
    setDownloading(true);
    setProgress(0);
    try {
      const r = await fetch(`/api/academy/download?curriculumId=${cId}&grade=${g}`);
      if (!r.ok) throw new Error("Download failed");
      // Read the response stream to show progress
      const reader = r.body?.getReader();
      const contentLength = Number(r.headers.get("Content-Length")) || 0;
      let received = 0;
      const chunks: Uint8Array[] = [];
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            received += value.length;
            if (contentLength) {
              setProgress(Math.round((received / contentLength) * 100));
            }
          }
        }
      }
      const text = new TextDecoder().decode(concat(chunks));
      const bundle = JSON.parse(text);
      await offlineStore.saveBundle(bundle);
      setProgress(100);
      toast.success(
        `Downloaded Grade ${g} bundle (${bundle.subjects.length} subjects, ${bundle.subjects.reduce((a: number, s: any) => a + s.lessons.length, 0)} lessons)`
      );
      await refresh();
      onDownloaded();
    } catch (e: any) {
      toast.error(`Download failed: ${e.message}`);
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  }

  async function removeBundle(cId: string, g: number) {
    await offlineStore.removeBundle(cId, g);
    toast.success(`Removed Grade ${g} bundle`);
    await refresh();
    onDownloaded();
  }

  async function clearAll() {
    if (!confirm("Remove all offline bundles?")) return;
    await offlineStore.clear();
    toast.success("All offline bundles cleared");
    await refresh();
    onDownloaded();
  }

  const isDownloaded = (cId: string, g: number) =>
    downloaded.some((d) => d.curriculumId === cId && d.grade === g);

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Download size={20} /> Offline Downloads
        </h1>
        <p className="text-sm text-muted-foreground">
          Download an entire grade bundle (all subjects, lessons, quizzes, exams,
          mind maps) once, then study without an internet connection.
        </p>
      </div>

      {/* Storage info */}
      <Card className="p-4 mb-4 bg-muted/30">
        <div className="flex items-center gap-2 flex-wrap">
          <HardDrive size={16} className="text-muted-foreground" />
          <div className="text-sm">
            {downloaded.length} bundles ·{" "}
            {downloaded.reduce((s, d) => s + d.sizeBytes, 0) > 0
              ? `${(downloaded.reduce((s, d) => s + d.sizeBytes, 0) / 1024).toFixed(0)} KB`
              : "empty"}
          </div>
          {storage && storage.quota > 0 && (
            <div className="text-xs text-muted-foreground ml-auto">
              Device storage: {(storage.usage / 1024 / 1024).toFixed(1)} MB used of{" "}
              {(storage.quota / 1024 / 1024).toFixed(0)} MB
            </div>
          )}
          {downloaded.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              className="ml-auto"
              onClick={clearAll}
            >
              <Trash2 size={14} className="mr-1" /> Clear all
            </Button>
          )}
        </div>
      </Card>

      {/* Selector */}
      <Card className="p-4 mb-4">
        <div className="text-sm font-medium mb-3">Download a new bundle</div>

        <div className="mb-3">
          <div className="text-xs text-muted-foreground mb-1">Curriculum</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {curricula.map((c) => (
              <button
                key={c.id}
                onClick={() => setCurriculum(c.id)}
                className={`text-left p-2 rounded-md border-2 text-sm transition-colors ${
                  curriculumId === c.id
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-950/30"
                    : "border-border hover:border-teal-300"
                }`}
                style={{ borderLeftWidth: "4px", borderLeftColor: c.color }}
              >
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">
                  Grades {c.grades} · {c.subjects.length} subjects
                </div>
              </button>
            ))}
          </div>
        </div>

        {curriculumId && (
          <div>
            <div className="text-xs text-muted-foreground mb-1">Grade</div>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => {
                const c = curricula.find((x) => x.id === curriculumId);
                const available = c ? gradeInSpec(g, c.grades) : false;
                const done = isDownloaded(curriculumId, g);
                return (
                  <button
                    key={g}
                    disabled={!available}
                    onClick={() => setGrade(g)}
                    className={`relative aspect-square rounded-md border-2 text-sm font-medium transition-colors ${
                      !available
                        ? "opacity-30 cursor-not-allowed border-border"
                        : grade === g
                        ? "border-teal-500 bg-teal-500 text-white"
                        : "border-border hover:border-teal-400"
                    }`}
                  >
                    {g}
                    {done && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                        <CheckCircle2 size={8} className="text-white" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {downloading && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1">
                <RefreshCw size={12} className="animate-spin" /> Downloading…
              </span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        {curriculumId && grade && !downloading && (
          <Button
            className="mt-3 w-full"
            onClick={() => downloadBundle(curriculumId, grade)}
            disabled={isDownloaded(curriculumId, grade)}
          >
            {isDownloaded(curriculumId, grade) ? (
              <>
                <CheckCircle2 size={16} className="mr-2" /> Already downloaded
              </>
            ) : (
              <>
                <Download size={16} className="mr-2" /> Download Grade {grade} bundle
              </>
            )}
          </Button>
        )}
      </Card>

      {/* Downloaded bundles */}
      <h2 className="text-lg font-semibold mb-3">Downloaded bundles</h2>
      {downloaded.length === 0 ? (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          <WifiOff className="mx-auto mb-2" />
          No bundles downloaded yet. Pick a curriculum and grade above and tap
          "Download".
        </Card>
      ) : (
        <div className="space-y-2">
          {downloaded.map((d) => (
            <Card key={`${d.curriculumId}-${d.grade}`} className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">
                    {d.curriculumName} — Grade {d.grade}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Saved {new Date(d.savedAt).toLocaleString()} ·{" "}
                    {(d.sizeBytes / 1024).toFixed(0)} KB
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeBundle(d.curriculumId, d.grade)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* PWA install hint */}
      <Card className="p-4 mt-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
          <div className="text-sm text-foreground/90">
            <div className="font-medium mb-1">Install as an app</div>
            For the best offline experience, install Global Academy as a Progressive
            Web App. On Chrome/Edge, click the install icon in the address bar; on
            iOS Safari, tap Share → "Add to Home Screen". Once installed, the app
            works offline and behaves like a native app.
          </div>
        </div>
      </Card>
    </div>
  );
}

function concat(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

function gradeInSpec(grade: number, spec: string): boolean {
  for (const part of spec.split(",")) {
    const p = part.trim();
    const m = p.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (grade >= a && grade <= b) return true;
    } else if (/^\d+$/.test(p) && parseInt(p, 10) === grade) {
      return true;
    }
  }
  return false;
}
