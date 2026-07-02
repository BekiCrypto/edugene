import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ensureDailyQuests } from "@/lib/gamification";

export const dynamic = "force-dynamic";

// GET /api/academy/quests — returns today's daily quests
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ quests: [] });
  }

  await ensureDailyQuests(session.user.id);
  const today = new Date().toISOString().slice(0, 10);
  const quests = await db.dailyQuest.findMany({
    where: { userId: session.user.id, date: today },
    orderBy: { type: "asc" },
  });

  return NextResponse.json({ quests });
}
