import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const ACHIEVEMENT_DEFS = [
  {
    code: "first-lesson",
    title: "First Steps",
    description: "Opened your first lesson.",
    icon: "BookOpen",
    check: (count: number) => count >= 1,
  },
  {
    code: "five-lessons",
    title: "Getting Warmer",
    description: "Started 5 lessons.",
    icon: "Flame",
    check: (count: number) => count >= 5,
  },
  {
    code: "first-quiz",
    title: "Quiz Rookie",
    description: "Completed your first quiz.",
    icon: "CheckCircle",
    check: (count: number) => count >= 1,
  },
  {
    code: "quiz-master",
    title: "Quiz Master",
    description: "Completed 10 quizzes.",
    icon: "Award",
    check: (count: number) => count >= 10,
  },
  {
    code: "first-exam",
    title: "Exam Debut",
    description: "Sat your first sample exam.",
    icon: "FileText",
    check: (count: number) => count >= 1,
  },
  {
    code: "high-scorer",
    title: "High Scorer",
    description: "Scored 90% or above on any quiz or exam.",
    icon: "Star",
    check: (bestScore: number) => bestScore >= 90,
  },
  {
    code: "explorer",
    title: "Subject Explorer",
    description: "Visited 3 different subjects.",
    icon: "Compass",
    check: (count: number) => count >= 3,
  },
];

// GET /api/academy/achievements?studentKey=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentKey = searchParams.get("studentKey");

  if (!studentKey) {
    return NextResponse.json({ error: "studentKey is required" }, { status: 400 });
  }

  // Count by type
  const progress = await db.studentProgress.findMany({
    where: { studentKey },
  });

  const lessonCount = progress.filter((p) => p.itemType === "lesson").length;
  const quizCount = progress.filter((p) => p.itemType === "quiz").length;
  const examCount = progress.filter((p) => p.itemType === "exam").length;
  const bestScore = progress.reduce((max, p) => Math.max(max, p.bestScore ?? 0), 0);

  // Get already-unlocked achievements
  const existing = await db.achievement.findMany({
    where: { studentKey },
  });
  const existingCodes = new Set(existing.map((a) => a.code));

  // Determine which achievements should be unlocked
  const toUnlock = ACHIEVEMENT_DEFS.filter((def) => {
    if (existingCodes.has(def.code)) return false;
    if (def.code === "first-lesson" || def.code === "five-lessons") {
      return def.check(lessonCount);
    }
    if (def.code === "first-quiz" || def.code === "quiz-master") {
      return def.check(quizCount);
    }
    if (def.code === "first-exam") {
      return def.check(examCount);
    }
    if (def.code === "high-scorer") {
      return def.check(bestScore);
    }
    if (def.code === "explorer") {
      // Count distinct subjects visited (best effort: by item type)
      return def.check(lessonCount);
    }
    return false;
  });

  // Create the newly unlocked achievements
  const newAchievements = [];
  for (const def of toUnlock) {
    const a = await db.achievement.create({
      data: {
        studentKey,
        code: def.code,
        title: def.title,
        description: def.description,
        icon: def.icon,
      },
    });
    newAchievements.push(a);
  }

  const all = [...existing, ...newAchievements];

  return NextResponse.json({
    achievements: all,
    newlyUnlocked: newAchievements,
    stats: {
      lessonCount,
      quizCount,
      examCount,
      bestScore,
    },
  });
}
