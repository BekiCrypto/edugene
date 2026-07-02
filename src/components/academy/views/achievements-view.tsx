"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, Flame, Star, Zap, Crown, Award, Lock, Loader2,
  TrendingUp, Target, Calendar, BookOpen, Library, GraduationCap,
  FileText, ClipboardCheck, Layers, StickyNote, Brain, Sunrise,
  Moon, Compass, CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAcademy } from "@/lib/academy-store";
import { Mascot } from "@/components/academy/mascot";
import { getLevelInfo } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import type { AgeBand } from "@/lib/age-bands";

interface BadgeDef {
  code: string;
  title: string;
  description: string;
  icon: string;
  tier: string;
  xpReward: number;
}

interface BadgeItem extends BadgeDef {
  unlockedAt: string;
}

const TIER_STYLES = {
  bronze: "from-amber-100 to-amber-200 dark:from-amber-950/50 dark:to-amber-900/50 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800",
  silver: "from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-700/50 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700",
  gold: "from-yellow-100 to-yellow-300 dark:from-yellow-950/50 dark:to-yellow-800/50 text-yellow-700 dark:text-yellow-400 border-yellow-400 dark:border-yellow-800",
  platinum: "from-violet-100 to-fuchsia-200 dark:from-violet-950/50 dark:to-fuchsia-900/50 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-800",
};

const ICONS: Record<string, any> = {
  BookOpen, Library, GraduationCap, Award, FileText, Star, ClipboardCheck,
  Trophy, Flame, Layers, StickyNote, Brain, Sunrise, Moon, TrendingUp, Crown,
  Compass, CheckCircle, Target, Calendar, Zap,
};

export function AchievementsView() {
  const { user, totalXp, achievements, badges, setTotalXp, setBadges } = useAcademy();
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState<{ currentStreak: number; longestStreak: number } | null>(null);

  const ageBand = (user?.ageBand as AgeBand) || "scholars";

  useEffect(() => {
    Promise.all([
      fetch("/api/academy/badges").then((r) => r.json()),
      fetch("/api/academy/streak").then((r) => r.json()),
      fetch("/api/academy/dashboard").then((r) => r.json()).catch(() => null),
    ]).then(([b, s, d]) => {
      setBadges(b.unlocked || []);
      setStreak(s.streak);
      // Use dashboard totalXp (includes all XP from progress) if available
      const xp = d?.totalXp ?? (b.unlocked || []).reduce((sum: number, badge: BadgeItem) => sum + (badge.xpReward || 0), 0);
      setTotalXp(xp);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [setBadges, setTotalXp]);

  const levelInfo = getLevelInfo(totalXp);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl flex items-center justify-center min-h-[40vh]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const unlockedBadges: BadgeItem[] = badges as any;
  const lockedBadges: BadgeDef[] = (unlockedBadges.length === 0 ? [] : []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="text-amber-500" size={24} />
          <h1 className="text-2xl font-bold">Achievements</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Every lesson, quiz, and review earns XP. Climb the levels and unlock badges!
        </p>
      </div>

      {/* Level progress */}
      <Card className="p-6 bg-gradient-to-br from-brand-soft/50 to-card border-brand/20">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-brand flex items-center justify-center text-brand-foreground shrink-0">
            <div className="text-center">
              <div className="text-2xl font-bold leading-none">{levelInfo.level}</div>
              <div className="text-xs opacity-80">LVL</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-semibold text-lg">{levelInfo.title}</span>
              <span className="text-sm text-muted-foreground">{totalXp.toLocaleString()} XP</span>
            </div>
            <Progress value={levelInfo.progressPct} className="h-2.5 mb-1" />
            <div className="text-xs text-muted-foreground">
              {levelInfo.xpRemaining} XP until Level {levelInfo.level + 1}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4 text-center">
          <Flame size={24} className="mx-auto mb-1 text-streak" style={{ color: "var(--streak)" }} />
          <div className="text-2xl font-bold">{streak?.currentStreak || 0}</div>
          <div className="text-xs text-muted-foreground">Current streak</div>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp size={24} className="mx-auto mb-1 text-amber-500" />
          <div className="text-2xl font-bold">{streak?.longestStreak || 0}</div>
          <div className="text-xs text-muted-foreground">Longest streak</div>
        </Card>
        <Card className="p-4 text-center">
          <Trophy size={24} className="mx-auto mb-1 text-amber-500" />
          <div className="text-2xl font-bold">{unlockedBadges.length}</div>
          <div className="text-xs text-muted-foreground">Badges</div>
        </Card>
        <Card className="p-4 text-center">
          <Zap size={24} className="mx-auto mb-1" style={{ color: "var(--xp)" }} />
          <div className="text-2xl font-bold">{totalXp.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total XP</div>
        </Card>
      </div>

      {/* Badges grid */}
      <div>
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Award size={18} /> Badges
        </h2>
        {unlockedBadges.length === 0 ? (
          <Mascot
            band={ageBand}
            size="md"
            message="No badges yet — complete lessons and quizzes to start unlocking them!"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {unlockedBadges.map((badge, i) => {
              const Icon = ICONS[badge.icon] || Award;
              const tierStyle = TIER_STYLES[badge.tier as keyof typeof TIER_STYLES] || TIER_STYLES.bronze;
              return (
                <motion.div
                  key={badge.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={cn("p-4 text-center bg-gradient-to-br border-2", tierStyle)}>
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/60 dark:bg-black/30 flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <div className="font-semibold text-sm">{badge.title}</div>
                    <div className="text-xs opacity-80 mt-0.5 leading-tight">{badge.description}</div>
                    <div className="text-xs font-medium mt-2 opacity-90">+{badge.xpReward} XP</div>
                    <div className="text-xs opacity-60 mt-1">
                      {new Date(badge.unlockedAt).toLocaleDateString()}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Legacy achievements */}
      {achievements.length > 0 && (
        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Star size={18} /> Recent Achievements
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {achievements.map((a) => {
              const Icon = ICONS[a.icon] || Award;
              return (
                <Card key={a.code} className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-soft flex items-center justify-center">
                    <Icon size={18} className="text-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{a.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.description}</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Level titles preview */}
      <Card className="p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Crown size={16} /> Level Titles
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {["Seed", "Sprout", "Sapling", "Bloom", "Explorer", "Scholar", "Master", "Sage", "EduGene Legend"].map((t, i) => (
            <Badge
              key={t}
              variant={i + 1 <= levelInfo.level ? "default" : "outline"}
              className={cn(i + 1 <= levelInfo.level && "bg-brand")}
            >
              L{i + 1}: {t}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Earn XP from lessons (50), quizzes (80+), exams (200+), flashcard reviews (5 each),
          notes (10), and daily quests (50–100). Reach Level 20 to become an EduGene Legend!
        </p>
      </Card>
    </div>
  );
}
