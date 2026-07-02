import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getIdentityFromRequest } from "@/lib/identity";
import {
  XP_REWARDS,
  updateStreak,
  ensureDailyQuests,
  progressQuest,
  checkAndAwardBadges,
  getLevelInfo,
} from "@/lib/gamification";

export const dynamic = "force-dynamic";

// GET /api/academy/progress?studentKey=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentKey = searchParams.get("studentKey");

  if (!studentKey) {
    return NextResponse.json({ error: "studentKey is required" }, { status: 400 });
  }

  const progress = await db.studentProgress.findMany({
    where: { studentKey },
  });

  // Sum total XP
  const totalXp = progress.reduce((sum, p) => sum + (p.xpEarned || 0), 0);

  return NextResponse.json({
    progress,
    totalXp,
    level: getLevelInfo(totalXp),
  });
}

// POST /api/academy/progress
// Body: { studentKey, itemId, itemType, status, scorePercent?, timeSpentMin?, activityType? }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { studentKey, itemId, itemType, status, scorePercent, timeSpentMin, activityType } = body;

  if (!studentKey || !itemId || !itemType) {
    return NextResponse.json(
      { error: "studentKey, itemId, itemType are required" },
      { status: 400 }
    );
  }

  const identity = await getIdentityFromRequest(studentKey);

  const existing = await db.studentProgress.findUnique({
    where: {
      studentKey_itemId_itemType: { studentKey, itemId, itemType },
    },
  });

  const bestScore =
    scorePercent != null
      ? Math.max(existing?.bestScore ?? 0, scorePercent)
      : existing?.bestScore ?? null;

  const attempts = (existing?.attempts ?? 0) + 1;

  // Calculate XP earned for this update
  let xpEarned = 0;
  const newlyCompleted = status === "completed" && existing?.status !== "completed";

  if (newlyCompleted) {
    if (itemType === "lesson") xpEarned += XP_REWARDS.LESSON_COMPLETE;
    if (itemType === "quiz") {
      xpEarned += XP_REWARDS.QUIZ_PASS;
      if (scorePercent === 100) xpEarned += XP_REWARDS.QUIZ_PERFECT - XP_REWARDS.QUIZ_PASS;
    }
    if (itemType === "exam") {
      xpEarned += XP_REWARDS.EXAM_PASS;
      if ((scorePercent || 0) >= 85) xpEarned += XP_REWARDS.EXAM_DISTINCTION - XP_REWARDS.EXAM_PASS;
    }
  } else if (status === "in-progress" && itemType === "lesson") {
    xpEarned += XP_REWARDS.LESSON_READ;
  }
  // Quiz bonus per correct answer (passed in body)
  if (body.correctCount && itemType === "quiz") {
    xpEarned += body.correctCount * XP_REWARDS.QUIZ_BONUS_PER_CORRECT;
  }

  const record = await db.studentProgress.upsert({
    where: {
      studentKey_itemId_itemType: { studentKey, itemId, itemType },
    },
    create: {
      studentKey,
      userId: identity.userId,
      itemId,
      itemType,
      status: status ?? "in-progress",
      scorePercent: scorePercent ?? null,
      bestScore: bestScore ?? null,
      attempts,
      timeSpentMin: timeSpentMin ?? 0,
      xpEarned,
      lastVisitedAt: new Date(),
    },
    update: {
      userId: identity.userId ?? existing?.userId,
      status: status ?? existing?.status ?? "in-progress",
      scorePercent: scorePercent ?? existing?.scorePercent ?? null,
      bestScore,
      attempts,
      timeSpentMin: (existing?.timeSpentMin ?? 0) + (timeSpentMin ?? 0),
      xpEarned: (existing?.xpEarned ?? 0) + xpEarned,
      lastVisitedAt: new Date(),
    },
  });

  // Update streak (only if authenticated)
  let streakInfo = null;
  if (identity.isAuthenticated && identity.userId) {
    streakInfo = await updateStreak(identity.userId);
    await ensureDailyQuests(identity.userId);

    // Progress daily quests
    if (newlyCompleted && itemType === "lesson") {
      await progressQuest(identity.userId, "complete-lessons", 1);
    }
    if (itemType === "quiz" && status === "completed") {
      await progressQuest(identity.userId, "take-quiz", 1);
    }
    if (xpEarned > 0) {
      await progressQuest(identity.userId, "earn-xp", xpEarned);
    }
    if (timeSpentMin) {
      await progressQuest(identity.userId, "study-time", timeSpentMin);
    }

    // Check badges
    const allProgress = await db.studentProgress.findMany({
      where: { studentKey },
    });
    const lessonsCompleted = allProgress.filter(
      (p) => p.itemType === "lesson" && p.status === "completed"
    ).length;
    const quizzesTaken = allProgress.filter((p) => p.itemType === "quiz").length;
    const perfectQuizzes = allProgress.filter(
      (p) => p.itemType === "quiz" && (p.bestScore || 0) === 100
    ).length;
    const examsTaken = allProgress.filter((p) => p.itemType === "exam").length;
    const examBestScore = Math.max(
      0,
      ...allProgress.filter((p) => p.itemType === "exam").map((p) => p.bestScore || 0)
    );
    const totalXp = allProgress.reduce((s, p) => s + (p.xpEarned || 0), 0);
    const hourOfDay = new Date().getHours();

    await checkAndAwardBadges(identity.userId, {
      lessonsCompleted,
      quizzesTaken,
      perfectQuizzes,
      examsTaken,
      examBestScore,
      currentStreak: streakInfo.currentStreak,
      flashcardsReviewed: 0, // updated by flashcard API
      notesCreated: 0, // updated by notes API
      mindMapsViewed: 0, // updated by mindmap API
      totalXp,
      hourOfDay,
    });
  }

  return NextResponse.json({
    progress: record,
    xpEarned,
    streak: streakInfo,
  });
}
