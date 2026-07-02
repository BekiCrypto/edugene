"use client";

import { useEffect, useState, useMemo } from "react";
import { useAcademy } from "@/lib/academy-store";
import { offlineStore } from "@/lib/offline-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trophy,
  RotateCcw,
  ChevronRight,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function safeParse(v: any): any {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") {
    try {
      return JSON.parse(v);
    } catch {
      return [];
    }
  }
  return [];
}

export function ExamView() {
  const { curriculumId, grade, subjectId, examId, setView, studentKey } =
    useAcademy();
  const [exam, setExam] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [essayText, setEssayText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    if (!examId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      if (curriculumId && grade && subjectId) {
        const bundle = await offlineStore.getBundle(curriculumId, grade);
        if (bundle) {
          const subj = bundle.subjects.find((s: any) => s.subject.id === subjectId);
          const ex = subj?.exams.find((e: any) => e.id === examId);
          if (ex) {
            setExam(ex);
            setStartTime(Date.now());
            setLoading(false);
            return;
          }
        }
      }
      try {
        const r = await fetch(`/api/academy/exam?subjectId=${subjectId}&grade=${grade}`);
        const d = await r.json();
        const ex = (d.exams || []).find((e: any) => e.id === examId);
        if (ex) {
          setExam(ex);
          setStartTime(Date.now());
        }
      } catch {}
      setLoading(false);
    })();
  }, [examId, curriculumId, grade, subjectId]);

  useEffect(() => {
    if (submitted || !exam) return;
    const id = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startTime, submitted, exam]);

  const score = useMemo(() => {
    if (!exam) return { percent: 0, marks: 0 };
    let earned = 0;
    exam.questions.forEach((q: any) => {
      if (q.type === "multiple-choice") {
        if (answers[q.number] === q.answerIdx) earned += q.marks;
      } else {
        // Short answer / essay: simple keyword-based auto-mark (rough)
        const userAns = (answers[q.number] ?? "").toLowerCase();
        const modelAns = q.modelAnswer.toLowerCase();
        // Count overlap of key terms
        const modelWords = new Set(
          modelAns.split(/\W+/).filter((w: string) => w.length > 4)
        );
        if (modelWords.size === 0) return;
        let hits = 0;
        modelWords.forEach((w: string) => {
          if (userAns.includes(w)) hits++;
        });
        const ratio = hits / modelWords.size;
        earned += Math.round(q.marks * ratio);
      }
    });
    return {
      percent: Math.round((earned / exam.totalMarks) * 100),
      marks: earned,
    };
  }, [exam, answers]);

  // Compute values safely (exam may be null during loading)
  const q = exam?.questions?.[current];
  const total = exam?.questions?.length ?? 0;
  const timeLimitSec = exam ? exam.durationMin * 60 : 0;
  const remainingSec = Math.max(0, timeLimitSec - elapsedSec);
  const timeUp = remainingSec === 0 && !submitted && exam !== null && timeLimitSec > 0;

  // Auto-submit when time runs out (in an effect, not during render).
  // Must be called BEFORE any early returns to satisfy the Rules of Hooks.
  useEffect(() => {
    if (timeUp && !submitted) {
      handleSubmit();
    }
  }, [timeUp, submitted]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-2/3 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">Exam not found.</p>
          <Button onClick={() => setView("exams")}>Back to exams</Button>
        </Card>
      </div>
    );
  }

  function handleSubmit() {
    setSubmitted(true);
    fetch("/api/academy/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentKey,
        itemId: exam.id,
        itemType: "exam",
        status: "completed",
        scorePercent: score.percent,
        timeSpentMin: Math.max(1, Math.round(elapsedSec / 60)),
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.progress) {
          useAcademy.getState().upsertProgress({
            itemId: exam.id,
            itemType: "exam",
            status: d.progress.status,
            scorePercent: d.progress.scorePercent,
            bestScore: d.progress.bestScore,
            attempts: d.progress.attempts,
          });
        }
      })
      .catch(() => {});
    toast(`Exam submitted: ${score.percent}%`);
    fetch(`/api/academy/achievements?studentKey=${encodeURIComponent(studentKey)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.achievements) useAcademy.getState().setAchievements(d.achievements);
        if (d.newlyUnlocked?.length) {
          for (const a of d.newlyUnlocked) {
            toast.success(`Achievement unlocked: ${a.title}`, {
              description: a.description,
            });
          }
        }
      })
      .catch(() => {});
  }

  function reset() {
    setAnswers({});
    setEssayText("");
    setCurrent(0);
    setSubmitted(false);
    setStartTime(Date.now());
    setElapsedSec(0);
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <button
        onClick={() => setView("exams")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
      >
        <ChevronLeft size={14} /> Back to exams
      </button>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">{exam.title}</h1>
          <Badge variant={remainingSec < 60 ? "destructive" : "secondary"} className="gap-1">
            <Clock size={12} />
            {Math.floor(remainingSec / 60)}:{String(remainingSec % 60).padStart(2, "0")}
          </Badge>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">{exam.paperCode}</Badge>
          <Badge variant="outline">{exam.totalMarks} marks</Badge>
          <Badge variant="outline">{total} questions</Badge>
        </div>
      </div>

      {/* Instructions */}
      <Card className="p-3 mb-4 bg-muted/30">
        <div className="text-xs font-medium text-muted-foreground mb-1">Instructions</div>
        <div className="text-sm text-foreground/90">{exam.instructions}</div>
      </Card>

      <div className="mb-4 flex items-center gap-2">
        <Progress value={((current + 1) / total) * 100} className="flex-1" />
        <span className="text-xs text-muted-foreground">
          Q{current + 1} / {total} · {q.marks} marks
        </span>
      </div>

      <Card className="p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs capitalize">
            {q.type.replace("-", " ")}
          </Badge>
          {q.topicTag && <Badge variant="secondary" className="text-xs">{q.topicTag}</Badge>}
        </div>
        <div className="font-medium mb-4">{q.prompt}</div>

        {q.type === "multiple-choice" && q.options && (
          <div className="space-y-2">
            {safeParse(q.options).map((opt: string, i: number) => {
              const isSelected = answers[q.number] === i;
              const isCorrect = i === q.answerIdx;
              const showResult = submitted;
              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [q.number]: i })}
                  className={cn(
                    "w-full text-left p-3 rounded-md border-2 transition-all flex items-start gap-3",
                    !showResult && isSelected && "border-teal-500 bg-teal-50 dark:bg-teal-950/30",
                    !showResult && !isSelected && "border-border hover:border-teal-300",
                    showResult && isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                    showResult && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    showResult && !isCorrect && !isSelected && "border-border opacity-60"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold shrink-0",
                      !showResult && isSelected && "border-teal-500 bg-teal-500 text-white",
                      !showResult && !isSelected && "border-muted-foreground/40",
                      showResult && isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                      showResult && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="text-sm flex-1">{opt}</div>
                  {showResult && isCorrect && <CheckCircle2 size={16} className="text-emerald-500" />}
                  {showResult && isSelected && !isCorrect && <XCircle size={16} className="text-red-500" />}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "short-answer" && (
          <textarea
            disabled={submitted}
            value={answers[q.number] ?? ""}
            onChange={(e) => setAnswers({ ...answers, [q.number]: e.target.value })}
            placeholder="Write your answer in 2–3 sentences…"
            className="w-full min-h-[100px] p-3 rounded-md border border-border bg-background text-sm"
          />
        )}

        {q.type === "essay" && (
          <textarea
            disabled={submitted}
            value={answers[q.number] ?? ""}
            onChange={(e) => setAnswers({ ...answers, [q.number]: e.target.value })}
            placeholder="Write your essay in full paragraphs…"
            className="w-full min-h-[240px] p-3 rounded-md border border-border bg-background text-sm"
          />
        )}

        {submitted && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md">
            <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-1">
              <AlertCircle size={12} /> Mark scheme ({q.marks} marks)
            </div>
            <div className="text-sm mb-2">
              <span className="font-medium">Model answer:</span> {q.modelAnswer}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">How marks are awarded:</span>{" "}
              {q.explanation}
            </div>
          </div>
        )}
      </Card>

      {!submitted ? (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={current === 0}
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          >
            <ChevronLeft size={14} /> Previous
          </Button>
          {current < total - 1 ? (
            <Button
              size="sm"
              onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            >
              Next <ChevronRight size={14} />
            </Button>
          ) : (
            <Button size="sm" onClick={handleSubmit}>
              Submit exam
            </Button>
          )}
        </div>
      ) : (
        <Card className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border-teal-200 dark:border-teal-900">
          <div className="flex items-center gap-3 mb-3">
            <Trophy size={24} className="text-amber-500" />
            <div>
              <div className="text-2xl font-bold">{score.percent}%</div>
              <div className="text-xs text-muted-foreground">
                {score.marks} of {exam.totalMarks} marks
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            Note: Short-answer and essay questions are auto-marked by keyword overlap
            with the model answer. For high-stakes practice, ask a teacher to review
            your written answers against the mark scheme above.
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw size={14} className="mr-1" /> Retry
            </Button>
            <Button size="sm" onClick={() => setView("exams")}>
              Back to exams
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
