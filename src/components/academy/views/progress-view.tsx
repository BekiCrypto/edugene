"use client";

import { useEffect, useState } from "react";
import { useAcademy } from "@/lib/academy-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  TrendingUp,
  BookOpen,
  FileText,
  Flame,
  Star,
  Compass,
  CheckCircle,
  Target,
} from "lucide-react";

const ACHIEVEMENT_ICONS: Record<string, any> = {
  "first-lesson": BookOpen,
  "five-lessons": Flame,
  "first-quiz": CheckCircle,
  "quiz-master": Award,
  "first-exam": FileText,
  "high-scorer": Star,
  explorer: Compass,
};

const ALL_ACHIEVEMENTS = [
  { code: "first-lesson", title: "First Steps", description: "Opened your first lesson.", icon: "first-lesson" },
  { code: "five-lessons", title: "Getting Warmer", description: "Started 5 lessons.", icon: "five-lessons" },
  { code: "first-quiz", title: "Quiz Rookie", description: "Completed your first quiz.", icon: "first-quiz" },
  { code: "quiz-master", title: "Quiz Master", description: "Completed 10 quizzes.", icon: "quiz-master" },
  { code: "first-exam", title: "Exam Debut", description: "Sat your first sample exam.", icon: "first-exam" },
  { code: "high-scorer", title: "High Scorer", description: "Scored 90% or above on any quiz or exam.", icon: "high-scorer" },
  { code: "explorer", title: "Subject Explorer", description: "Visited 3 different subjects.", icon: "explorer" },
];

export function ProgressView() {
  const { progress, achievements, studentKey, setStudentKey, setView } = useAcademy();
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const lessons = Object.values(progress).filter((p) => p.itemType === "lesson");
    const quizzes = Object.values(progress).filter((p) => p.itemType === "quiz");
    const exams = Object.values(progress).filter((p) => p.itemType === "exam");
    const completed = Object.values(progress).filter((p) => p.status === "completed");
    const bestScore = Object.values(progress).reduce(
      (max, p) => Math.max(max, p.bestScore ?? 0),
      0
    );
    const avgQuizScore =
      quizzes.length > 0
        ? Math.round(
            quizzes.reduce((s, p) => s + (p.bestScore ?? 0), 0) / quizzes.length
          )
        : 0;
    setStats({
      lessons: lessons.length,
      quizzes: quizzes.length,
      exams: exams.length,
      completed: completed.length,
      bestScore,
      avgQuizScore,
    });
  }, [progress]);

  const unlockedCodes = new Set(achievements.map((a) => a.code));

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <TrendingUp size={20} /> Your Progress
        </h1>
        <p className="text-sm text-muted-foreground">
          Track every lesson, quiz, and exam you complete. Achievements unlock
          automatically as you study.
        </p>
      </div>

      {/* Student key */}
      <Card className="p-4 mb-4 bg-muted/30">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-sm font-medium">Your student ID:</div>
          <code className="text-xs bg-background px-2 py-1 rounded border border-border">
            {studentKey}
          </code>
          <Button
            size="sm"
            variant="outline"
            className="ml-auto"
            onClick={() => {
              const k = prompt("Enter a new student ID (e.g. your name):", studentKey);
              if (k && k.trim()) setStudentKey(k.trim());
            }}
          >
            Change ID
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          This ID is stored locally. Use the same ID across devices to share progress
          (progress is saved on the server).
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <StatTile icon={BookOpen} label="Lessons visited" value={stats.lessons ?? 0} color="#0ea5e9" />
        <StatTile icon={CheckCircle} label="Completed" value={stats.completed ?? 0} color="#16a34a" />
        <StatTile icon={FileText} label="Quizzes taken" value={stats.quizzes ?? 0} color="#f97316" />
        <StatTile icon={Award} label="Exams attempted" value={stats.exams ?? 0} color="#a855f7" />
        <StatTile icon={Star} label="Best score" value={stats.bestScore ? `${stats.bestScore}%` : "—"} color="#dc2626" />
        <StatTile icon={Target} label="Avg quiz score" value={stats.avgQuizScore ? `${stats.avgQuizScore}%` : "—"} color="#0d9488" />
      </div>

      {/* Progress bars */}
      {stats.quizzes > 0 && (
        <Card className="p-4 mb-4">
          <div className="text-sm font-medium mb-3">Completion rate</div>
          <div className="space-y-3">
            <ProgressBar
              label="Quizzes completed"
              value={stats.quizzes}
              max={Math.max(10, stats.quizzes)}
              color="#f97316"
            />
            <ProgressBar
              label="Exams attempted"
              value={stats.exams}
              max={Math.max(5, stats.exams)}
              color="#a855f7"
            />
            <ProgressBar
              label="Lessons started"
              value={stats.lessons}
              max={Math.max(20, stats.lessons)}
              color="#0ea5e9"
            />
          </div>
        </Card>
      )}

      {/* Achievements */}
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Award size={18} /> Achievements ({achievements.length}/{ALL_ACHIEVEMENTS.length})
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {ALL_ACHIEVEMENTS.map((def) => {
          const unlocked = unlockedCodes.has(def.code);
          const Icon = ACHIEVEMENT_ICONS[def.icon] ?? Award;
          const ach = achievements.find((a) => a.code === def.code);
          return (
            <Card
              key={def.code}
              className={`p-4 transition-all ${
                unlocked
                  ? "border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30"
                  : "opacity-60 bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    unlocked
                      ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{def.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {def.description}
                  </div>
                  {unlocked && ach && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Unlocked {new Date(ach.unlockedAt).toLocaleDateString()}
                    </Badge>
                  )}
                  {!unlocked && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      Locked
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent activity */}
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <TrendingUp size={18} /> Recent activity
      </h2>
      {Object.values(progress).length === 0 ? (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          No activity yet.{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => setView("subjects")}>
            Start your first lesson
          </Button>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {Object.values(progress)
              .sort((a, b) => (b.attempts ?? 0) - (a.attempts ?? 0))
              .slice(0, 20)
              .map((p, i) => {
                const Icon =
                  p.itemType === "lesson"
                    ? BookOpen
                    : p.itemType === "quiz"
                    ? CheckCircle
                    : FileText;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 text-sm">
                    <Icon size={16} className="text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium capitalize">{p.itemType}</div>
                      <div className="text-xs text-muted-foreground font-mono truncate">
                        {p.itemId}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {p.status.replace("-", " ")}
                    </Badge>
                    {p.bestScore != null && (
                      <Badge variant="secondary" className="text-xs">
                        {p.bestScore}%
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      ×{p.attempts}
                    </span>
                  </div>
                );
              })}
          </div>
        </Card>
      )}
    </div>
  );
}

function StatTile({
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

function ProgressBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="text-muted-foreground">
          {value} / {max}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
