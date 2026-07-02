import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { BADGE_DEFINITIONS } from "@/lib/gamification";

export const dynamic = "force-dynamic";

// GET /api/academy/badges — returns unlocked + locked badges for the user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    // Return all definitions as locked for non-auth
    return NextResponse.json({
      unlocked: [],
      locked: BADGE_DEFINITIONS.map((b) => ({ ...b, unlockedAt: null })),
    });
  }

  const unlocked = await db.userBadge.findMany({
    where: { userId: session.user.id },
    orderBy: { unlockedAt: "desc" },
  });
  const unlockedCodes = new Set(unlocked.map((b) => b.code));
  const locked = BADGE_DEFINITIONS.filter((b) => !unlockedCodes.has(b.code));

  return NextResponse.json({
    unlocked,
    locked: locked.map((b) => ({ ...b, unlockedAt: null })),
  });
}
