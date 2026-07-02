"use client";

import { useEffect, useState } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  ChevronRight,
  AlertCircle,
  Award,
  CheckCircle2,
} from "lucide-react";

export function ExamsView() {
  const { curriculumId, grade, subjectId, setSubject, setExam, setView, progress } =
    useAcademy();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
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
      setExams([]);
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
            setExams(subj.exams);
            setLoading(false);
            return;
          }
        }
      }
      setOfflineBundle(null);
      fetch(`/api/academy/exam?subjectId=${subjectId}&grade=${grade}`)
        .then((r) => r.json())
        .then((d) => setExams(d.exams || []))
        .catch(() => setExams([]))
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
        <h1 className="text-2xl font-bold mb-1">Sample Exams</h1>
        <p className="text-sm text-muted-foreground">
          Full exam-style papers with timers and mark schemes.
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
          Pick a subject above to see sample exams.
        </Card>
      )}

      {loading && (
        <div className="space-y-2 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {!loading && exams.length > 0 && (
        <div className="space-y-2">
          {exams.map((ex) => {
            const prog = progress[`exam:${ex.id}`];
            return (
              <Card
                key={ex.id}
                className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-teal-400"
                onClick={() => {
                  setExam(ex.id);
                  setView("exam");
                }}
              >
                <div className="flex items-start gap-3">
                  <FileText size={20} className="text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{ex.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {ex.description}
                    </div>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">{ex.paperCode}</Badge>
                      <Badge variant="outline" className="text-xs gap-1">
                        <Clock size={10} /> {ex.durationMin} min
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ex.totalMarks} marks
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ex.questions.length} questions
                      </Badge>
                      {prog?.bestScore != null && (
                        <Badge variant="secondary" className="text-xs gap-1">
                          <Award size={10} /> Best: {prog.bestScore}%
                        </Badge>
                      )}
                      {prog?.status === "completed" && (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-auto h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExam(ex.id);
                          setView("exam");
                        }}
                      >
                        Start <ChevronRight size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && subjectId && exams.length === 0 && (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          No sample exams for this subject at Grade {grade}.
        </Card>
      )}
    </div>
  );
}
