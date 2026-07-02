/**
 * EduGene Gamification Engine
 * XP, levels, badges, streaks, daily quests.
 * All server-side logic lives here; called from API routes.
 */

import { db } from "@/lib/db";

// =========================================================
// LEVELS — XP curve (each level needs more XP than the last)
// =========================================================

export interface LevelInfo {
  level: number;
  title: string;
  xpForLevel: number;     // total XP to reach this level
  xpForNext: number;      // total XP to reach next level
  xpIntoLevel: number;    // XP gained since reaching this level
  xpRemaining: number;    // XP needed to next level
  progressPct: number;    // 0-100
}

const LEVEL_TITLES = [
  "Seed", "Sprout", "Sapling", "Bud", "Bloom",
  "Sapling Scholar", "Junior Explorer", "Explorer", "Senior Explorer", "Ranger",
  "Junior Scholar", "Scholar", "Senior Scholar", "Academic", "Honors Student",
  "Junior Master", "Master", "Senior Master", "Sage", "EduGene Legend",
];

export function getLevelInfo(totalXp: number): LevelInfo {
  // XP curve: level n requires 100 * n * (n+1) / 2 total
  // L1: 0, L2: 100, L3: 300, L4: 600, L5: 1000, L10: 5500, L20: 21000
  const xpForLevelFn = (n: number) => (n <= 1 ? 0 : 100 * (n - 1) * n / 2);
  let level = 1;
  while (totalXp >= xpForLevelFn(level + 1)) level++;
  const xpIntoLevel = totalXp - xpForLevelFn(level);
  const xpRemaining = xpForLevelFn(level + 1) - totalXp;
  const progressPct = Math.round(
    (xpIntoLevel / (xpForLevelFn(level + 1) - xpForLevelFn(level))) * 100
  );
  return {
    level,
    title: LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)],
    xpForLevel: xpForLevelFn(level),
    xpForNext: xpForLevelFn(level + 1),
    xpIntoLevel,
    xpRemaining,
    progressPct: Math.min(100, Math.max(0, progressPct)),
  };
}

function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return 100 * (level - 1) * level / 2;
}

// =========================================================
// XP REWARDS — per activity
// =========================================================

export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  LESSON_READ: 20,
  QUIZ_PASS: 80,         // >= 50%
  QUIZ_PERFECT: 150,     // 100%
  QUIZ_BONUS_PER_CORRECT: 10,
  EXAM_PASS: 200,
  EXAM_DISTINCTION: 400, // >= 85%
  FLASHCARD_REVIEW: 5,
  FLASHCARD_DECK_COMPLETE: 30,
  DAILY_QUEST: 100,
  STREAK_DAY: 25,
  STREAK_WEEK: 200,
  NOTE_CREATED: 10,
  MINDMAP_VIEWED: 15,
  ACHIEVEMENT_BASE: 50,
} as const;

// =========================================================
// STREAKS
// =========================================================

export async function updateStreak(userId: string): Promise<{
  currentStreak: number;
  longestStreak: number;
  streakExtended: boolean;
  streakReset: boolean;
  weeklyBonusAwarded: boolean;
}> {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let streak = await db.streak.findUnique({ where: { userId } });
  if (!streak) {
    streak = await db.streak.create({ data: { userId } });
  }

  let streakExtended = false;
  let streakReset = false;
  let weeklyBonusAwarded = false;

  if (streak.lastActiveDate === todayStr) {
    // already counted today
  } else if (streak.lastActiveDate === yesterdayStr) {
    const newStreak = streak.currentStreak + 1;
    streak = await db.streak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(streak.longestStreak, newStreak),
        lastActiveDate: todayStr,
        totalActiveDays: streak.totalActiveDays + 1,
      },
    });
    streakExtended = true;
  } else {
    // streak broken (or first ever)
    streak = await db.streak.update({
      where: { userId },
      data: {
        currentStreak: 1,
        lastActiveDate: todayStr,
        totalActiveDays: streak.totalActiveDays + 1,
      },
    });
    streakReset = streak.totalActiveDays > 1;
  }

  // Weekly bonus: every 7 days streak
  if (streakExtended && streak.currentStreak > 0 && streak.currentStreak % 7 === 0) {
    weeklyBonusAwarded = true;
  }

  return {
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    streakExtended,
    streakReset,
    weeklyBonusAwarded,
  };
}

// =========================================================
// DAILY QUESTS
// =========================================================

export const QUEST_TEMPLATES = [
  { type: "complete-lessons", title: "Complete 2 lessons", description: "Finish any 2 lessons today", target: 2, xpReward: 100 },
  { type: "earn-xp", title: "Earn 200 XP", description: "Earn at least 200 XP today", target: 200, xpReward: 80 },
  { type: "take-quiz", title: "Take 1 quiz", description: "Complete any quiz", target: 1, xpReward: 60 },
  { type: "study-time", title: "Study 30 minutes", description: "Spend 30 min learning", target: 30, xpReward: 70 },
  { type: "review-flashcards", title: "Review 10 flashcards", description: "Review 10 SRS cards", target: 10, xpReward: 50 },
] as const;

export async function ensureDailyQuests(userId: string): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const existing = await db.dailyQuest.findMany({
    where: { userId, date: today },
  });
  if (existing.length > 0) return;

  // Pick 3 random quests (deterministic per day for variety)
  const seed = parseInt(today.replace(/-/g, "")) + userId.length;
  const shuffled = [...QUEST_TEMPLATES].sort((a, b) => {
    const ha = (seed * 9301 + a.type.length * 49297) % 233280;
    const hb = (seed * 9301 + b.type.length * 49297) % 233280;
    return ha - hb;
  });
  const picked = shuffled.slice(0, 3);

  await db.dailyQuest.createMany({
    data: picked.map((q) => ({
      userId,
      date: today,
      type: q.type,
      title: q.title,
      description: q.description,
      target: q.target,
      xpReward: q.xpReward,
    })),
  });
}

export async function progressQuest(
  userId: string,
  type: string,
  increment: number
): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const quests = await db.dailyQuest.findMany({
    where: { userId, date: today, type, completed: false },
  });
  for (const q of quests) {
    const newProgress = Math.min(q.target, q.progress + increment);
    const completed = newProgress >= q.target;
    await db.dailyQuest.update({
      where: { id: q.id },
      data: {
        progress: newProgress,
        completed,
        completedAt: completed ? new Date() : null,
      },
    });
  }
}

// =========================================================
// BADGES — auto-unlock based on conditions
// =========================================================

export const BADGE_DEFINITIONS = [
  { code: "first-lesson", title: "First Steps", description: "Completed your first lesson", icon: "BookOpen", tier: "bronze", xpReward: 50 },
  { code: "ten-lessons", title: "Bookworm", description: "Completed 10 lessons", icon: "Library", tier: "bronze", xpReward: 100 },
  { code: "fifty-lessons", title: "Scholar", description: "Completed 50 lessons", icon: "GraduationCap", tier: "silver", xpReward: 250 },
  { code: "hundred-lessons", title: "Centurion", description: "Completed 100 lessons", icon: "Award", tier: "gold", xpReward: 500 },
  { code: "first-quiz", title: "Quiz Rookie", description: "Took your first quiz", icon: "FileText", tier: "bronze", xpReward: 50 },
  { code: "quiz-master", title: "Quiz Master", description: "Scored 100% on 5 quizzes", icon: "Star", tier: "silver", xpReward: 200 },
  { code: "first-exam", title: "Exam Ready", description: "Completed a sample exam", icon: "ClipboardCheck", tier: "bronze", xpReward: 80 },
  { code: "exam-distinction", title: "Distinction", description: "Scored 85%+ on an exam", icon: "Trophy", tier: "gold", xpReward: 400 },
  { code: "streak-3", title: "On Fire", description: "3-day streak", icon: "Flame", tier: "bronze", xpReward: 75 },
  { code: "streak-7", title: "Week Warrior", description: "7-day streak", icon: "Flame", tier: "silver", xpReward: 150 },
  { code: "streak-30", title: "Unstoppable", description: "30-day streak", icon: "Flame", tier: "platinum", xpReward: 600 },
  { code: "flashcard-master", title: "Card Shark", description: "Reviewed 100 flashcards", icon: "Layers", tier: "silver", xpReward: 200 },
  { code: "note-taker", title: "Note Taker", description: "Created 10 notes", icon: "StickyNote", tier: "bronze", xpReward: 60 },
  { code: "mind-mapper", title: "Mind Mapper", description: "Viewed 5 mind maps", icon: "Brain", tier: "bronze", xpReward: 60 },
  { code: "early-bird", title: "Early Bird", description: "Studied before 8am", icon: "Sunrise", tier: "bronze", xpReward: 50 },
  { code: "night-owl", title: "Night Owl", description: "Studied after 10pm", icon: "Moon", tier: "bronze", xpReward: 50 },
  { code: "level-5", title: "Rising Star", description: "Reached level 5", icon: "TrendingUp", tier: "silver", xpReward: 200 },
  { code: "level-10", title: "Veteran", description: "Reached level 10", icon: "Crown", tier: "gold", xpReward: 500 },
] as const;

export async function checkAndAwardBadges(
  userId: string,
  stats: {
    lessonsCompleted: number;
    quizzesTaken: number;
    perfectQuizzes: number;
    examsTaken: number;
    examBestScore: number;
    currentStreak: number;
    flashcardsReviewed: number;
    notesCreated: number;
    mindMapsViewed: number;
    totalXp: number;
    hourOfDay?: number;
  }
): Promise<typeof BADGE_DEFINITIONS[number][]> {
  const newlyUnlocked: any[] = [];
  const existing = await db.userBadge.findMany({
    where: { userId },
    select: { code: true },
  });
  const have = new Set(existing.map((b) => b.code));

  const conditions: Record<string, boolean> = {
    "first-lesson": stats.lessonsCompleted >= 1,
    "ten-lessons": stats.lessonsCompleted >= 10,
    "fifty-lessons": stats.lessonsCompleted >= 50,
    "hundred-lessons": stats.lessonsCompleted >= 100,
    "first-quiz": stats.quizzesTaken >= 1,
    "quiz-master": stats.perfectQuizzes >= 5,
    "first-exam": stats.examsTaken >= 1,
    "exam-distinction": stats.examBestScore >= 85,
    "streak-3": stats.currentStreak >= 3,
    "streak-7": stats.currentStreak >= 7,
    "streak-30": stats.currentStreak >= 30,
    "flashcard-master": stats.flashcardsReviewed >= 100,
    "note-taker": stats.notesCreated >= 10,
    "mind-mapper": stats.mindMapsViewed >= 5,
    "early-bird": stats.hourOfDay !== undefined && stats.hourOfDay < 8,
    "night-owl": stats.hourOfDay !== undefined && stats.hourOfDay >= 22,
    "level-5": getLevelInfo(stats.totalXp).level >= 5,
    "level-10": getLevelInfo(stats.totalXp).level >= 10,
  };

  for (const def of BADGE_DEFINITIONS) {
    if (have.has(def.code)) continue;
    if (conditions[def.code]) {
      await db.userBadge.create({
        data: {
          userId,
          code: def.code,
          title: def.title,
          description: def.description,
          icon: def.icon,
          tier: def.tier,
          xpReward: def.xpReward,
        },
      });
      newlyUnlocked.push(def);
    }
  }
  return newlyUnlocked;
}

// =========================================================
// ACHIEVEMENTS — legacy compatibility (studentKey-based)
// =========================================================

export const ACHIEVEMENT_DEFS = [
  { code: "first-lesson", title: "First Steps", description: "Opened your first lesson", icon: "BookOpen" },
  { code: "first-quiz", title: "Quiz Time", description: "Completed your first quiz", icon: "FileText" },
  { code: "quiz-master", title: "Quiz Master", description: "Scored 100% on a quiz", icon: "Star" },
  { code: "first-exam", title: "Exam Ready", description: "Completed a sample exam", icon: "Award" },
  { code: "exam-master", title: "Exam Master", description: "Scored 80%+ on an exam", icon: "Trophy" },
  { code: "streak-7", title: "Week Warrior", description: "7-day streak", icon: "Flame" },
  { code: "scholar", title: "Scholar", description: "Completed 10 lessons", icon: "GraduationCap" },
] as const;
