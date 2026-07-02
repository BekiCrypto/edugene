import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateStreak } from "@/lib/gamification";

export const dynamic = "force-dynamic";

// GET /api/academy/streak — returns (and refreshes) the user's streak
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ streak: null });
  }

  let streak = await db.streak.findUnique({ where: { userId: session.user.id } });
  if (!streak) {
    streak = await db.streak.create({ data: { userId: session.user.id } });
  }

  return NextResponse.json({
    streak: {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastActiveDate: streak.lastActiveDate,
      totalActiveDays: streak.totalActiveDays,
      weekGoal: streak.weekGoal,
    },
  });
}

// POST /api/academy/streak — touch the streak (called on activity)
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ streak: null });
  }
  const result = await updateStreak(session.user.id);
  return NextResponse.json({ streak: result });
}
