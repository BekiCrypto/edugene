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

export function QuizView() {
  const { curriculumId, grade, subjectId, lessonId, setView, studentKey } =
    useAcademy();
  const [quiz, setQuiz] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    if (!lessonId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      // Try offline bundle
      if (curriculumId && grade && subjectId) {
        const bundle = await offlineStore.getBundle(curriculumId, grade);
        if (bundle) {
          const subj = bundle.subjects.find((s: any) => s.subject.id === subjectId);
          const lesson = subj?.lessons.find((l: any) => l.id === lessonId);
          if (lesson?.quizzes?.[0]) {
            setQuiz(lesson.quizzes[0]);
            setAnswers(new Array(lesson.quizzes[0].questions.length).fill(-1));
            setStartTime(Date.now());
            setLoading(false);
            return;
          }
        }
      }
      try {
        const r = await fetch(`/api/academy/quiz?lessonId=${lessonId}`);
        const d = await r.json();
        if (d.quiz) {
          setQuiz(d.quiz);
          setAnswers(new Array(d.quiz.questions.length).fill(-1));
          setStartTime(Date.now());
        }
      } catch {}
      setLoading(false);
    })();
  }, [lessonId, curriculumId, grade, subjectId]);

  // Timer
  useEffect(() => {
    if (submitted || !quiz) return;
    const id = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startTime, submitted, quiz]);

  const score = useMemo(() => {
    if (!quiz) return 0;
    let correct = 0;
    quiz.questions.forEach((q: any, i: number) => {
      if (answers[i] === q.answerIdx) correct++;
    });
    return Math.round((correct / quiz.questions.length) * 100);
  }, [quiz, answers]);

  // Compute values safely (quiz may be null during loading)
  const q = quiz?.questions?.[current];
  const total = quiz?.questions?.length ?? 0;
  const timeLimitSec = quiz ? quiz.timeLimit * 60 : 0;
  const remainingSec = Math.max(0, timeLimitSec - elapsedSec);
  const timeUp = remainingSec === 0 && !submitted && quiz !== null && timeLimitSec > 0;

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
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="h-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">No quiz found.</p>
          <Button onClick={() => setView("lessons")}>Back to lessons</Button>
        </Card>
      </div>
    );
  }

  function handleSubmit() {
    setSubmitted(true);
    setShowExplanations(true);
    // Record progress
    fetch("/api/academy/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentKey,
        itemId: quiz.id,
        itemType: "quiz",
        status: "completed",
        scorePercent: score,
        timeSpentMin: Math.max(1, Math.round(elapsedSec / 60)),
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.progress) {
          useAcademy.getState().upsertProgress({
            itemId: quiz.id,
            itemType: "quiz",
            status: d.progress.status,
            scorePercent: d.progress.scorePercent,
            bestScore: d.progress.bestScore,
            attempts: d.progress.attempts,
          });
        }
      })
      .catch(() => {});
    if (score >= 80) {
      toast.success(`Great work! ${score}%`);
    } else if (score >= 50) {
      toast(`Quiz complete: ${score}%`);
    } else {
      toast.error(`Quiz complete: ${score}% — review the material and try again.`);
    }
    // Check for new achievements
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
    setAnswers(new Array(total).fill(-1));
    setCurrent(0);
    setSubmitted(false);
    setShowExplanations(false);
    setStartTime(Date.now());
    setElapsedSec(0);
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <button
        onClick={() => setView("lesson")}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
      >
        <ChevronLeft size={14} /> Back to lesson
      </button>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">{quiz.title}</h1>
          <Badge variant={remainingSec < 60 ? "destructive" : "secondary"} className="gap-1">
            <Clock size={12} />
            {Math.floor(remainingSec / 60)}:{String(remainingSec % 60).padStart(2, "0")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{quiz.description}</p>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Progress value={((current + 1) / total) * 100} className="flex-1" />
        <span className="text-xs text-muted-foreground">
          {current + 1} / {total}
        </span>
      </div>

      <Card className="p-5 mb-4">
        <div className="text-sm text-muted-foreground mb-2">
          Question {current + 1}
        </div>
        <div className="font-medium mb-4">{q.prompt}</div>
        <div className="space-y-2">
          {safeParse(q.options).map((opt: string, i: number) => {
            const isSelected = answers[current] === i;
            const isCorrect = i === q.answerIdx;
            const showResult = submitted;
            return (
              <button
                key={i}
                disabled={submitted}
                onClick={() => {
                  const next = [...answers];
                  next[current] = i;
                  setAnswers(next);
                }}
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
                {showResult && isCorrect && (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle size={16} className="text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {showExplanations && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md">
            <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-1">
              <AlertCircle size={12} /> Explanation
            </div>
            <div className="text-sm">{q.explanation}</div>
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
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={answers.some((a) => a === -1)}
            >
              Submit quiz
            </Button>
          )}
        </div>
      ) : (
        <Card className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border-teal-200 dark:border-teal-900">
          <div className="flex items-center gap-3 mb-3">
            <Trophy size={24} className="text-amber-500" />
            <div>
              <div className="text-2xl font-bold">{score}%</div>
              <div className="text-xs text-muted-foreground">
                {answers.filter((a, i) => a === quiz.questions[i].answerIdx).length} of {total} correct
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Button size="sm" variant="outline" onClick={reset}>
              <RotateCcw size={14} className="mr-1" /> Try again
            </Button>
            <Button size="sm" onClick={() => setView("lesson")}>
              Back to lesson
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto"
              onClick={() => setView("lessons")}
            >
              More lessons <ChevronRight size={14} />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
