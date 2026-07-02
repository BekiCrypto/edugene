"use client";

import { useEffect, useState } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlertCircle, BookOpen, Library } from "lucide-react";
import { Mascot } from "@/components/academy/mascot";
import { gradeToAgeBand, AGE_BANDS } from "@/lib/age-bands";

export function SubjectsView() {
  const { curriculumId, grade, setCurriculum, setGrade, setSubject, setView } = useAcademy();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offlineBundle, setOfflineBundle] = useState<any | null>(null);
  const [curricula, setCurricula] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/academy/curricula")
      .then((r) => r.json())
      .then((d) => setCurricula(d.curricula || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!curriculumId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    if (grade) {
      offlineStore.getBundle(curriculumId, grade).then((b) => {
        if (b) {
          setOfflineBundle(b);
          setSubjects(b.subjects.map((s: any) => s.subject));
          setLoading(false);
        }
      });
    }
    const url = grade
      ? `/api/academy/subjects?curriculumId=${curriculumId}&grade=${grade}`
      : `/api/academy/subjects?curriculumId=${curriculumId}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d.subjects) {
          setSubjects(d.subjects);
          setOfflineBundle(null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [curriculumId, grade]);

  // Inline curriculum + grade picker
  if (!curriculumId) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Choose your curriculum</h1>
          <p className="text-sm text-muted-foreground">
            Pick a curriculum and grade to see available subjects and lessons.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {curricula.map((c) => (
            <button
              key={c.id}
              onClick={() => setCurriculum(c.id)}
              className="text-left p-4 rounded-xl border border-border hover:border-brand/40 hover:bg-brand-soft/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                <span className="font-semibold text-sm">{c.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">{c.publisher} · {c.region}</div>
              <div className="text-xs text-muted-foreground mt-1">Grades {c.grades}</div>
            </button>
          ))}
        </div>
        {curricula.length === 0 && (
          <div className="animate-pulse text-sm text-muted-foreground text-center py-8">Loading curricula…</div>
        )}
      </div>
    );
  }

  // Grade picker if curriculum selected but no grade
  const currentCurriculum = curricula.find((c) => c.id === curriculumId);
  if (curriculumId && !grade) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button
          onClick={() => setCurriculum(null)}
          className="text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          ← Change curriculum
        </button>
        <h1 className="text-2xl font-bold mb-1">{currentCurriculum?.name}</h1>
        <p className="text-sm text-muted-foreground mb-4">Pick your grade to start learning.</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => {
            const band = gradeToAgeBand(g);
            const mascot = AGE_BANDS[band as keyof typeof AGE_BANDS];
            return (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className="p-4 rounded-xl border border-border hover:border-brand hover:bg-brand-soft/30 transition-all text-center"
              >
                <div className="text-2xl mb-1">{mascot.mascotEmoji}</div>
                <div className="font-bold text-lg">{g}</div>
                <div className="text-xs text-muted-foreground">{mascot.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Subjects</h1>
        <p className="text-sm text-muted-foreground">
          {grade ? `Grade ${grade} · ` : ""}Tap a subject to see its lessons, exams,
          and mind maps.
        </p>
        {offlineBundle && (
          <Badge variant="secondary" className="mt-2">
            Reading from offline cache (saved {new Date(offlineBundle.generatedAt).toLocaleDateString()})
          </Badge>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {subjects.map((s) => (
          <Card
            key={s.id}
            className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-teal-400"
            onClick={() => {
              setSubject(s.id);
              setView("lessons");
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: s.color }}
              >
                <BookOpen size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-3 mt-1">
                  {s.description}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Grades {s.grades}
                  </Badge>
                  <ChevronRight size={14} className="text-muted-foreground ml-auto" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {subjects.length === 0 && (
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            No subjects found for this selection.
          </p>
        </Card>
      )}
    </div>
  );
}
