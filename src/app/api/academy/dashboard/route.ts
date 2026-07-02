import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLevelInfo, BADGE_DEFINITIONS } from "@/lib/gamification";

export const dynamic = "force-dynamic";

// GET /api/academy/dashboard — aggregated stats for student dashboard
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;

  const [progress, badges, streak, quests, notes, decks, studySessions] = await Promise.all([
    db.studentProgress.findMany({ where: { userId } }),
    db.userBadge.findMany({ where: { userId } }),
    db.streak.findUnique({ where: { userId } }),
    db.dailyQuest.findMany({
      where: { userId, date: new Date().toISOString().slice(0, 10) },
    }),
    db.note.count({ where: { userId } }),
    db.flashcardDeck.findMany({
      where: { userId },
      include: { _count: { select: { cards: true } } },
    }),
    db.studySession.findMany({
      where: { userId },
      orderBy: { startedAt: "desc" },
      take: 30,
    }),
  ]);

  const totalXp = progress.reduce((s, p) => s + (p.xpEarned || 0), 0);
  const levelInfo = getLevelInfo(totalXp);

  const lessonsCompleted = progress.filter(
    (p) => p.itemType === "lesson" && p.status === "completed"
  ).length;
  const lessonsStarted = progress.filter((p) => p.itemType === "lesson").length;
  const quizzesTaken = progress.filter((p) => p.itemType === "quiz").length;
  const perfectQuizzes = progress.filter(
    (p) => p.itemType === "quiz" && (p.bestScore || 0) === 100
  ).length;
  const examsTaken = progress.filter((p) => p.itemType === "exam").length;
  const examBestScore = Math.max(
    0,
    ...progress.filter((p) => p.itemType === "exam").map((p) => p.bestScore || 0)
  );
  const avgQuizScore = quizzesTaken > 0
    ? Math.round(
        progress
          .filter((p) => p.itemType === "quiz")
          .reduce((s, p) => s + (p.bestScore || 0), 0) / quizzesTaken
      )
    : 0;

  // Subject breakdown — group by itemType to find weak areas
  // We use the lesson's subject via itemId lookup (best-effort)
  const lessonIds = progress
    .filter((p) => p.itemType === "lesson" || p.itemType === "quiz")
    .map((p) => p.itemId);
  const lessons = await db.lesson.findMany({
    where: { id: { in: lessonIds } },
    select: { id: true, subjectId: true, subject: { select: { name: true, color: true } } },
  });
  const lessonSubjectMap = new Map(lessons.map((l) => [l.id, l.subject]));

  const subjectStats: Record<string, { name: string; color: string; completed: number; totalXp: number; avgScore: number; scoreSum: number; scoreCount: number }> = {};
  for (const p of progress) {
    const lesson = lessonSubjectMap.get(p.itemId);
    if (!lesson) continue;
    const key = lesson.name;
    if (!subjectStats[key]) {
      subjectStats[key] = { name: lesson.name, color: lesson.color, completed: 0, totalXp: 0, avgScore: 0, scoreSum: 0, scoreCount: 0 };
    }
    if (p.itemType === "lesson" && p.status === "completed") subjectStats[key].completed++;
    subjectStats[key].totalXp += p.xpEarned || 0;
    if (p.bestScore != null) {
      subjectStats[key].scoreSum += p.bestScore;
      subjectStats[key].scoreCount++;
    }
  }
  for (const k of Object.keys(subjectStats)) {
    const s = subjectStats[k];
    s.avgScore = s.scoreCount > 0 ? Math.round(s.scoreSum / s.scoreCount) : 0;
  }

  // Weak area: subject with lowest avgScore (min 1 quiz taken)
  const subjectArr = Object.values(subjectStats).filter((s) => s.scoreCount > 0);
  const weakArea = subjectArr.length > 0
    ? subjectArr.reduce((min, s) => (s.avgScore < min.avgScore ? s : min))
    : null;

  // Weekly study time (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekSessions = studySessions.filter((s) => s.startedAt >= weekAgo);
  const weekMinutes = weekSessions.reduce((s, x) => s + x.durationMin, 0);

  // Activity sparkline — minutes per day, last 14 days
  const activity: { date: string; minutes: number; xp: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().slice(0, 10);
    const dayS = studySessions.filter((s) => s.startedAt.toISOString().slice(0, 10) === dStr);
    activity.push({
      date: dStr,
      minutes: dayS.reduce((sum, x) => sum + x.durationMin, 0),
      xp: dayS.reduce((sum, x) => sum + x.xpEarned, 0),
    });
  }

  return NextResponse.json({
    level: levelInfo,
    totalXp,
    streak: streak
      ? {
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
          totalActiveDays: streak.totalActiveDays,
        }
      : null,
    stats: {
      lessonsCompleted,
      lessonsStarted,
      quizzesTaken,
      perfectQuizzes,
      examsTaken,
      examBestScore,
      avgQuizScore,
      notesCreated: notes,
      flashcardDecks: decks.length,
      flashcardCount: decks.reduce((s, d) => s + (d._count?.cards || 0), 0),
      weekMinutes,
    },
    subjects: subjectArr,
    weakArea,
    dailyQuests: quests,
    badges: {
      unlocked: badges,
      total: BADGE_DEFINITIONS.length,
    },
    activity,
    upcomingReviews: 0, // SRS due cards — filled by flashcards API
  });
}
