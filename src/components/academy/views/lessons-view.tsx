"use client";

import { useEffect, useState, useCallback } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  ChevronRight,
  CheckCircle,
  Circle,
  PlayCircle,
  AlertCircle,
  Search,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function LessonsView({ searchQuery }: { searchQuery?: string }) {
  const {
    curriculumId,
    grade,
    subjectId,
    setSubject,
    setLesson,
    setView,
    progress,
  } = useAcademy();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offlineBundle, setOfflineBundle] = useState<any | null>(null);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  // Load subjects list for the picker
  useEffect(() => {
    if (!curriculumId) return;
    fetch(`/api/academy/subjects?curriculumId=${curriculumId}${grade ? `&grade=${grade}` : ""}`)
      .then((r) => r.json())
      .then((d) => setSubjects(d.subjects || []))
      .catch(() => {});
  }, [curriculumId, grade]);

  // Search across all lessons
  useEffect(() => {
    if (searchQuery && searchQuery.trim().length >= 2) {
      const url = `/api/academy/search?q=${encodeURIComponent(searchQuery)}${curriculumId ? `&curriculumId=${curriculumId}` : ""}`;
      fetch(url)
        .then((r) => r.json())
        .then((d) => setSearchResults(d.results || []))
        .catch(() => setSearchResults([]));
    } else {
      setSearchResults(null);
    }
  }, [searchQuery, curriculumId]);

  // Load lessons for selected subject + grade (try offline first)
  const loadLessons = useCallback(async () => {
    if (!subjectId || !grade) {
      setLessons([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    // Try offline bundle
    if (curriculumId) {
      const bundle = await offlineStore.getBundle(curriculumId, grade);
      if (bundle) {
        setOfflineBundle(bundle);
        const subj = bundle.subjects.find((s: any) => s.subject.id === subjectId);
        if (subj) {
          setLessons(subj.lessons);
          setLoading(false);
          return;
        }
      }
    }

    // Fallback to network
    setOfflineBundle(null);
    fetch(`/api/academy/lessons?subjectId=${subjectId}&grade=${grade}`)
      .then((r) => r.json())
      .then((d) => setLessons(d.lessons || []))
      .catch(() => setLessons([]))
      .finally(() => setLoading(false));
  }, [subjectId, grade, curriculumId]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  // Search results view
  if (searchResults) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <h1 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Search size={18} /> Search: "{searchQuery}"
        </h1>
        {searchResults.length === 0 ? (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            No lessons match your search.
          </Card>
        ) : (
          <div className="space-y-2">
            {searchResults.map((r) => (
              <Card
                key={r.id}
                className="p-3 cursor-pointer hover:shadow-md"
                onClick={() => {
                  setSubject(r.subjectId);
                  setLesson(r.id);
                  setView("lesson");
                }}
              >
                <div className="flex items-start gap-3">
                  <BookOpen size={18} className="text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {r.summary}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {r.subjectName} · Grade {r.grade}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!curriculumId || !grade) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <AlertCircle className="mx-auto mb-3 text-muted-foreground" />
          <h2 className="text-lg font-semibold mb-2">Pick a curriculum and grade</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Head to Home and select what you're studying.
          </p>
          <Button onClick={() => setView("home")}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Lessons</h1>
        <p className="text-sm text-muted-foreground">
          Grade {grade} · {offlineBundle ? "(offline cache)" : ""}
        </p>
      </div>

      {/* Subject picker */}
      <div className="mb-4 flex flex-wrap gap-2">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => setSubject(s.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              subjectId === s.id
                ? "bg-teal-500 text-white border-teal-500"
                : "bg-card border-border hover:border-teal-400"
            )}
          >
            {s.name}
          </button>
        ))}
      </div>

      {!subjectId && (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          Pick a subject above to see its lessons.
        </Card>
      )}

      {loading && (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {!loading && lessons.length > 0 && (
        <div className="space-y-2">
          {lessons.map((l) => {
            const prog = progress[`lesson:${l.id}`];
            const status = prog?.status ?? "not-started";
            return (
              <Card
                key={l.id}
                className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-teal-400"
                onClick={() => {
                  setLesson(l.id);
                  setView("lesson");
                  trackVisit(l.id, "lesson");
                }}
              >
                <div className="flex items-start gap-3">
                  <StatusIcon status={status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Lesson {l.order}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs capitalize"
                      >
                        {l.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                        <Clock size={12} /> {l.durationMin} min
                      </span>
                    </div>
                    <div className="font-semibold mt-1">{l.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {l.summary}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      {l.quizzes?.[0] && (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <FileText size={10} /> Quiz: {l.quizzes[0].questions.length} Qs
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLesson(l.id);
                          setView("lesson");
                          trackVisit(l.id, "lesson");
                        }}
                      >
                        Open <ChevronRight size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && subjectId && lessons.length === 0 && (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          No lessons for this subject at Grade {grade}. Try another subject or grade.
        </Card>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "completed")
    return <CheckCircle size={20} className="text-emerald-500 mt-0.5 shrink-0" />;
  if (status === "in-progress")
    return <PlayCircle size={20} className="text-amber-500 mt-0.5 shrink-0" />;
  return <Circle size={20} className="text-muted-foreground mt-0.5 shrink-0" />;
}

async function trackVisit(itemId: string, itemType: "lesson" | "quiz" | "exam") {
  const sk = useAcademy.getState().studentKey;
  try {
    const r = await fetch("/api/academy/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentKey: sk,
        itemId,
        itemType,
        status: "in-progress",
      }),
    });
    const d = await r.json();
    if (d.progress) {
      useAcademy.getState().upsertProgress({
        itemId,
        itemType,
        status: d.progress.status,
        scorePercent: d.progress.scorePercent,
        bestScore: d.progress.bestScore,
        attempts: d.progress.attempts,
      });
    }
  } catch {}
}
