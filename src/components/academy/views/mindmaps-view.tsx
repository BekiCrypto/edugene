"use client";

import { useEffect, useState } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight, AlertCircle } from "lucide-react";

export function MindMapsView() {
  const { curriculumId, grade, subjectId, setSubject, setMindMap, setView } =
    useAcademy();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [mindMaps, setMindMaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offlineBundle, setOfflineBundle] = useState<any | null>(null);

  useEffect(() => {
    if (!curriculumId) return;
    fetch(`/api/academy/subjects?curriculumId=${curriculumId}${grade ? `&grade=${grade}` : ""}`)
      .then((r) => r.json())
      .then((d) => setSubjects(d.subjects || []))
      .catch(() => {});
  }, [curriculumId, grade]);

  useEffect(() => {
    if (!subjectId || !grade) {
      setMindMaps([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      if (curriculumId) {
        const bundle = await offlineStore.getBundle(curriculumId, grade);
        if (bundle) {
          setOfflineBundle(bundle);
          const subj = bundle.subjects.find((s: any) => s.subject.id === subjectId);
          if (subj) {
            setMindMaps(subj.mindMaps);
            setLoading(false);
            return;
          }
        }
      }
      setOfflineBundle(null);
      fetch(`/api/academy/mindmap?subjectId=${subjectId}&grade=${grade}`)
        .then((r) => r.json())
        .then((d) => setMindMaps(d.mindMaps || []))
        .catch(() => setMindMaps([]))
        .finally(() => setLoading(false));
    })();
  }, [subjectId, grade, curriculumId]);

  if (!curriculumId || !grade) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <AlertCircle className="mx-auto mb-3 text-muted-foreground" />
          <h2 className="text-lg font-semibold mb-2">Pick a curriculum and grade</h2>
          <Button onClick={() => setView("home")}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Mind Maps</h1>
        <p className="text-sm text-muted-foreground">
          Visual study guides that connect the key concepts in each unit. Great for
          quick revision before quizzes and exams.
          {offlineBundle && " (offline cache)"}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSubject(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              subjectId === s.id
                ? "bg-teal-500 text-white border-teal-500"
                : "bg-card border-border hover:border-teal-400"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {!subjectId && (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          Pick a subject above to see its mind maps.
        </Card>
      )}

      {loading && (
        <div className="space-y-2 animate-pulse">
          <div className="h-24 rounded-lg bg-muted" />
        </div>
      )}

      {!loading && mindMaps.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {mindMaps.map((m) => (
            <Card
              key={m.id}
              className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-teal-400"
              onClick={() => {
                setMindMap(m.id);
                setView("mindmap");
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                  <Brain size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{m.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {m.description}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {m.nodes?.length ?? 0} nodes
                    </Badge>
                    <ChevronRight size={14} className="text-muted-foreground ml-auto" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && subjectId && mindMaps.length === 0 && (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          No mind maps for this subject at Grade {grade}.
        </Card>
      )}
    </div>
  );
}
