"use client";

import { useEffect, useState } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  BookOpen,
  FileText,
  Brain,
  Download,
  TrendingUp,
  Award,
  Library,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_COLORS: Record<string, string> = {
  mathematics: "#0ea5e9",
  "english-language": "#f97316",
  sciences: "#16a34a",
  "social-studies": "#a855f7",
  computing: "#dc2626",
};

export function HomeView({ curricula }: { curricula: any[] }) {
  const {
    curriculumId,
    setCurriculum,
    grade,
    setGrade,
    setView,
    progress,
    achievements,
    studentKey,
  } = useAcademy();

  const [subjects, setSubjects] = useState<any[]>([]);
  const [downloaded, setDownloaded] = useState<
    { curriculumId: string; grade: number; curriculumName: string; savedAt: number; sizeBytes: number }[]
  >([]);

  // Load subjects when curriculum changes
  useEffect(() => {
    if (!curriculumId) {
      setSubjects([]);
      return;
    }
    fetch(`/api/academy/subjects?curriculumId=${curriculumId}`)
      .then((r) => r.json())
      .then((d) => setSubjects(d.subjects || []))
      .catch(() => setSubjects([]));
  }, [curriculumId]);

  // Load downloaded bundles
  useEffect(() => {
    offlineStore.getAll().then((all) => setDownloaded(all));
  }, []);

  const currentCurriculum = curricula.find((c) => c.id === curriculumId);

  const stats = {
    lessons: Object.values(progress).filter((p) => p.itemType === "lesson").length,
    quizzes: Object.values(progress).filter((p) => p.itemType === "quiz").length,
    exams: Object.values(progress).filter((p) => p.itemType === "exam").length,
    completed: Object.values(progress).filter((p) => p.status === "completed").length,
    bestScore: Object.values(progress).reduce(
      (max, p) => Math.max(max, p.bestScore ?? 0),
      0
    ),
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Hero */}
      <section className="mb-8">
        <div className="rounded-xl bg-gradient-to-br from-teal-500 via-emerald-600 to-teal-700 p-6 sm:p-8 text-white shadow-lg">
          <div className="flex items-center gap-2 text-sm font-medium opacity-90 mb-2">
            <Sparkles size={16} /> Welcome to Global Academy
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-2">
            Master Grade 1–12 across 5 global curricula.
          </h1>
          <p className="text-sm sm:text-base opacity-90 max-w-2xl">
            Lessons, quizzes, sample exams, and mind map study guides — for Pearson
            Edexcel, Cambridge, British National, IB, and US Common Core. Download a
            grade bundle once and study offline, anywhere.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setView("subjects")}
              disabled={!curriculumId || !grade}
            >
              <Library size={16} className="mr-1" /> Browse subjects
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setView("downloads")}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
            >
              <Download size={16} className="mr-1" /> Download for offline
            </Button>
          </div>
        </div>
      </section>

      {/* Step 1: Choose curriculum */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-semibold">
            1
          </span>
          <h2 className="text-lg font-semibold">Choose your curriculum</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {curricula.map((c) => (
            <button
              key={c.id}
              onClick={() => setCurriculum(c.id)}
              className={cn(
                "text-left p-4 rounded-lg border-2 transition-all hover:shadow-md",
                curriculumId === c.id
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-950/30"
                  : "border-border bg-card hover:border-teal-300"
              )}
              style={{
                borderLeftWidth: "4px",
                borderLeftColor: c.color,
              }}
            >
              <div className="font-semibold text-sm mb-1">{c.name}</div>
              <div className="text-xs text-muted-foreground mb-2">
                {c.publisher} · {c.region}
              </div>
              <div className="text-xs text-foreground/80 line-clamp-2">
                {c.description}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Grades {c.grades}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {c.subjects.length} subjects
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Choose grade */}
      {curriculumId && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-semibold">
              2
            </span>
            <h2 className="text-lg font-semibold">Choose your grade</h2>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => {
              const isAvailable = currentCurriculum
                ? gradeInSpec(g, currentCurriculum.grades)
                : false;
              const isDownloaded = downloaded.some(
                (d) => d.curriculumId === curriculumId && d.grade === g
              );
              return (
                <button
                  key={g}
                  disabled={!isAvailable}
                  onClick={() => setGrade(g)}
                  className={cn(
                    "relative aspect-square rounded-lg border-2 text-sm font-semibold transition-all",
                    !isAvailable && "opacity-30 cursor-not-allowed border-border",
                    isAvailable &&
                      grade === g &&
                      "border-teal-500 bg-teal-500 text-white",
                    isAvailable &&
                      grade !== g &&
                      "border-border bg-card hover:border-teal-400"
                  )}
                >
                  {g}
                  {isDownloaded && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
                  )}
                </button>
              );
            })}
          </div>
          {currentCurriculum && (
            <p className="text-xs text-muted-foreground mt-2">
              {currentCurriculum.name} supports grades {currentCurriculum.grades}.
              Downloaded grade bundles show a green dot.
            </p>
          )}
        </section>
      )}

      {/* Step 3: Available subjects + quick links */}
      {curriculumId && grade && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-semibold">
              3
            </span>
            <h2 className="text-lg font-semibold">
              Subjects for Grade {grade} · {currentCurriculum?.name}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  useAcademy.getState().setSubject(s.id);
                  setView("lessons");
                }}
                className="text-left p-4 rounded-lg border border-border bg-card hover:border-teal-400 hover:shadow-sm transition-all flex items-start gap-3"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: s.color }}
                >
                  <SubjectIcon slug={s.slug} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {s.description}
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground mt-1" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Stats dashboard */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrendingUp size={18} /> Your progress
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <StatCard
            icon={BookOpen}
            label="Lessons visited"
            value={stats.lessons}
            color="#0ea5e9"
          />
          <StatCard
            icon={FileText}
            label="Quizzes taken"
            value={stats.quizzes}
            color="#f97316"
          />
          <StatCard
            icon={Award}
            label="Exams attempted"
            value={stats.exams}
            color="#a855f7"
          />
          <StatCard
            icon={Brain}
            label="Completed"
            value={stats.completed}
            color="#16a34a"
          />
          <StatCard
            icon={Sparkles}
            label="Best score"
            value={stats.bestScore ? `${stats.bestScore}%` : "—"}
            color="#dc2626"
          />
        </div>
        {stats.lessons === 0 && (
          <div className="mt-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            No activity yet. Pick a curriculum and grade above, then open your first
            lesson to start tracking progress.
          </div>
        )}
      </section>

      {/* Achievements preview */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Award size={18} /> Recent achievements
          </h2>
          <div className="flex flex-wrap gap-2">
            {achievements.slice(-8).map((a) => (
              <Badge key={a.code} variant="secondary" className="gap-1 py-1.5">
                <Award size={12} /> {a.title}
              </Badge>
            ))}
          </div>
          <Button
            variant="link"
            size="sm"
            className="mt-2 p-0 h-auto"
            onClick={() => setView("progress")}
          >
            View all achievements <ChevronRight size={14} />
          </Button>
        </section>
      )}

      {/* Offline bundles preview */}
      {downloaded.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Download size={18} /> Offline-ready bundles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {downloaded.map((d) => (
              <Card key={`${d.curriculumId}-${d.grade}`} className="p-3 text-sm">
                <div className="font-medium">
                  {d.curriculumName} — Grade {d.grade}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Saved {new Date(d.savedAt).toLocaleDateString()} ·{" "}
                  {(d.sizeBytes / 1024).toFixed(0)} KB
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <Card className="p-3">
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center text-white mb-2"
        style={{ backgroundColor: color }}
      >
        <Icon size={16} />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </Card>
  );
}

function SubjectIcon({ slug }: { slug: string }) {
  // Lazy icon import to avoid bundling all icons at top
  const icons: Record<string, any> = {
    mathematics: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 7V4H6v3" />
        <path d="M12 4v16" />
        <path d="M9 20h6" />
      </svg>
    ),
    "english-language": () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    sciences: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 3h6M10 3v6L5 18a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
      </svg>
    ),
    "social-studies": () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" />
      </svg>
    ),
    computing: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  };
  const C = icons[slug] ?? icons.mathematics;
  return <C />;
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
