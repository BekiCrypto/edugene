"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Flame, Trophy, Star, Target, Clock, TrendingUp, BookOpen,
  FileText, Layers, StickyNote, Zap, ChevronRight, Award, Brain,
  Headphones,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAcademy } from "@/lib/academy-store";
import { Mascot } from "@/components/academy/mascot";
import { AGE_BANDS, type AgeBand } from "@/lib/age-bands";
import { cn } from "@/lib/utils";

interface DashboardData {
  level: {
    level: number;
    title: string;
    xpForLevel: number;
    xpForNext: number;
    xpIntoLevel: number;
    xpRemaining: number;
    progressPct: number;
  };
  totalXp: number;
  streak: {
    currentStreak: number;
    longestStreak: number;
    totalActiveDays: number;
  } | null;
  stats: {
    lessonsCompleted: number;
    lessonsStarted: number;
    quizzesTaken: number;
    perfectQuizzes: number;
    examsTaken: number;
    examBestScore: number;
    avgQuizScore: number;
    notesCreated: number;
    flashcardDecks: number;
    flashcardCount: number;
    weekMinutes: number;
  };
  subjects: Array<{ name: string; color: string; completed: number; totalXp: number; avgScore: number }>;
  weakArea: { name: string; avgScore: number } | null;
  dailyQuests: Array<{
    id: string; type: string; title: string; description: string;
    target: number; progress: number; xpReward: number; completed: boolean;
  }>;
  badges: { unlocked: Array<any>; total: number };
  activity: Array<{ date: string; minutes: number; xp: number }>;
}

export function DashboardView() {
  const { user, setView, setSubject, setView: navigate } = useAcademy();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const ageBand = (user?.ageBand as AgeBand) || "scholars";

  useEffect(() => {
    fetch("/api/academy/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <Mascot
          band={ageBand}
          size="lg"
          message="Sign in to see your personalized dashboard with XP, streaks, and analytics!"
        />
      </div>
    );
  }

  const mascot = AGE_BANDS[ageBand];
  const greeting = getGreeting();
  const streakCount = data.streak?.currentStreak || 0;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
      {/* Hero — level + streak + XP */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Card className="p-6 bg-gradient-to-br from-brand via-emerald-600 to-teal-700 text-brand-foreground border-0 overflow-hidden relative animate-gradient">
          {/* Decorative background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 text-8xl animate-float">{mascot.mascotEmoji}</div>
            <div className="absolute -bottom-4 -left-4 text-7xl animate-float-slow">✨</div>
            <div className="absolute top-1/2 right-1/3 text-5xl animate-twinkle">⭐</div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="text-sm font-medium opacity-90">{greeting},</span>
              <span className="text-sm font-bold">{user?.name || "Scholar"}! 🎉</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="flex items-baseline gap-3 mb-4"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                  className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-black shadow-lg"
                >
                  {data.level.level}
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold leading-tight">Level {data.level.level}</h1>
                  <span className="text-sm font-medium opacity-90">{data.level.title}</span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-2 max-w-md">
              <div className="flex justify-between text-xs font-medium">
                <span className="opacity-90">{data.totalXp.toLocaleString()} XP total</span>
                <span className="opacity-90">{data.level.xpRemaining} XP to Level {data.level.level + 1} 🚀</span>
              </div>
              <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.level.progressPct}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="absolute h-full bg-gradient-to-r from-amber-300 to-amber-500 rounded-full progress-shine"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-4 py-2 border border-white/20"
              >
                <Flame size={16} className="animate-flame" style={{ color: "#fbbf24" }} />
                <span className="text-sm font-bold">{streakCount} day streak 🔥</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-4 py-2 border border-white/20"
              >
                <Zap size={16} className="text-amber-300" />
                <span className="text-sm font-bold">{data.totalXp.toLocaleString()} XP ⚡</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-4 py-2 border border-white/20"
              >
                <Trophy size={16} className="text-amber-300" />
                <span className="text-sm font-bold">{data.badges.unlocked.length}/{data.badges.total} badges 🏆</span>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger-children">
        <StatCard
          icon={BookOpen}
          label="Lessons"
          value={data.stats.lessonsCompleted}
          sub={`${data.stats.lessonsStarted} started`}
          color="var(--brand)"
          delay={0.1}
        />
        <StatCard
          icon={FileText}
          label="Quizzes"
          value={data.stats.quizzesTaken}
          sub={`${data.stats.avgQuizScore}% avg`}
          color="var(--xp)"
          delay={0.15}
        />
        <StatCard
          icon={Award}
          label="Exams"
          value={data.stats.examsTaken}
          sub={`Best: ${data.stats.examBestScore}%`}
          color="var(--quest)"
          delay={0.2}
        />
        <StatCard
          icon={Clock}
          label="This Week"
          value={`${Math.floor(data.stats.weekMinutes / 60)}h ${data.stats.weekMinutes % 60}m`}
          sub="study time"
          color="var(--streak)"
          delay={0.25}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2/3 — activity + subjects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity chart */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Last 14 days</h3>
                <p className="text-xs text-muted-foreground">Study minutes per day</p>
              </div>
              <TrendingUp size={18} className="text-muted-foreground" />
            </div>
            <div className="flex items-end gap-1.5 h-32">
              {data.activity.map((a, i) => {
                const maxMin = Math.max(60, ...data.activity.map((x) => x.minutes));
                const h = Math.max(4, (a.minutes / maxMin) * 100);
                return (
                  <div
                    key={i}
                    className="flex-1 group relative"
                    title={`${a.date}: ${a.minutes} min`}
                  >
                    <div
                      className="w-full rounded-t-sm transition-all hover:opacity-80"
                      style={{
                        height: `${h}%`,
                        background: a.minutes > 0 ? "var(--brand)" : "var(--muted)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>14 days ago</span>
              <span>Today</span>
            </div>
          </Card>

          {/* Subject breakdown */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Subject Progress</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("subjects")}>
                Browse all <ChevronRight size={14} />
              </Button>
            </div>
            {data.subjects.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No subject activity yet. Start a lesson to see your progress!
              </p>
            ) : (
              <div className="space-y-3">
                {data.subjects.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: s.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium truncate">{s.name}</span>
                        <span className="text-xs text-muted-foreground">{s.completed} done · {s.avgScore}%</span>
                      </div>
                      <Progress
                        value={Math.min(100, s.completed * 10)}
                        className="h-1.5 mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Weak area */}
          {data.weakArea && (
            <Card className="p-5 border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
                  <Target size={18} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Focus area: {data.weakArea.name}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your average score here is {data.weakArea.avgScore}%. Practice more to improve!
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => navigate("lessons")}
                  >
                    Practice now <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right 1/3 — quests + quick actions + mascot */}
        <div className="space-y-6">
          {/* Daily quests */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star size={18} style={{ color: "var(--quest)" }} />
              <h3 className="font-semibold">Daily Quests</h3>
            </div>
            {data.dailyQuests.length === 0 ? (
              <p className="text-xs text-muted-foreground">No quests yet — sign in to get daily goals!</p>
            ) : (
              <div className="space-y-2.5">
                {data.dailyQuests.map((q) => (
                  <div
                    key={q.id}
                    className={cn(
                      "p-3 rounded-lg border",
                      q.completed
                        ? "bg-brand-soft/50 border-brand/30"
                        : "bg-card border-border"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{q.title}</span>
                      <Badge variant="outline" className="text-xs">
                        +{q.xpReward} XP
                      </Badge>
                    </div>
                    <Progress value={(q.progress / q.target) * 100} className="h-1.5" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {q.progress}/{q.target} {q.completed && "✓"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick actions */}
          <Card className="p-5">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <QuickAction icon={Brain} label="Review flashcards" onClick={() => navigate("flashcards")} />
              <QuickAction icon={Zap} label="Ask AI Tutor" onClick={() => navigate("ai-tutor")} />
              <QuickAction icon={Headphones} label="Listen to a lesson" onClick={() => navigate("audio")} />
              <QuickAction icon={StickyNote} label="My notes" onClick={() => navigate("notes")} />
              <QuickAction icon={Award} label="Achievements" onClick={() => navigate("achievements")} />
            </div>
          </Card>

          {/* Mascot message */}
          <Mascot
            band={ageBand}
            size="md"
            message={
              streakCount > 0
                ? `${streakCount} day streak — keep it up! ${mascot.mascotEmoji}`
                : "Welcome back! Ready to learn something new today?"
            }
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, sub, color, delay = 0,
}: {
  icon: any; label: string; value: string | number; sub: string; color: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4, scale: 1.03 }}
    >
      <Card className="p-4 card-hover relative overflow-hidden">
        {/* Gradient accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: `color-mix(in oklch, ${color} 15%, transparent)` }}
          >
            <Icon size={18} style={{ color }} />
          </motion.div>
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, type: "spring" }}
          className="text-2xl font-bold"
        >
          {value}
        </motion.div>
        <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
      </Card>
    </motion.div>
  );
}

function QuickAction({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ x: 4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm hover:bg-brand-soft/50 transition-colors text-left group"
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        className="w-7 h-7 rounded-lg bg-brand-soft flex items-center justify-center"
      >
        <Icon size={15} className="text-brand" />
      </motion.div>
      <span className="flex-1 font-medium">{label}</span>
      <ChevronRight size={14} className="text-muted-foreground group-hover:text-brand transition-colors" />
    </motion.button>
  );
}

// Missing icon import workaround
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
