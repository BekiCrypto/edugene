"use client";

import { useEffect, useState } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlertCircle, BookOpen } from "lucide-react";

export function SubjectsView() {
  const { curriculumId, grade, setSubject, setView } = useAcademy();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offlineBundle, setOfflineBundle] = useState<any | null>(null);

  useEffect(() => {
    if (!curriculumId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    // Try offline first
    if (grade) {
      offlineStore.getBundle(curriculumId, grade).then((b) => {
        if (b) {
          setOfflineBundle(b);
          setSubjects(b.subjects.map((s: any) => s.subject));
          setLoading(false);
        }
      });
    }
    // Online fetch
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

  if (!curriculumId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <AlertCircle className="mx-auto mb-3 text-muted-foreground" />
          <h2 className="text-lg font-semibold mb-2">Pick a curriculum first</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Go to Home and choose a curriculum and grade to see available subjects.
          </p>
          <Button onClick={() => setView("home")}>Go to Home</Button>
        </Card>
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
