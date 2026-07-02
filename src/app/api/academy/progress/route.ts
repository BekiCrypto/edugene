import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/progress?studentKey=...
// Returns all progress records for the given student
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentKey = searchParams.get("studentKey");

  if (!studentKey) {
    return NextResponse.json({ error: "studentKey is required" }, { status: 400 });
  }

  const progress = await db.studentProgress.findMany({
    where: { studentKey },
  });

  return NextResponse.json({ progress });
}

// POST /api/academy/progress
// Body: { studentKey, itemId, itemType, status, scorePercent?, timeSpentMin? }
// Creates or updates a progress record
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { studentKey, itemId, itemType, status, scorePercent, timeSpentMin } = body;

  if (!studentKey || !itemId || !itemType) {
    return NextResponse.json(
      { error: "studentKey, itemId, itemType are required" },
      { status: 400 }
    );
  }

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

  const record = await db.studentProgress.upsert({
    where: {
      studentKey_itemId_itemType: { studentKey, itemId, itemType },
    },
    create: {
      studentKey,
      itemId,
      itemType,
      status: status ?? "in-progress",
      scorePercent: scorePercent ?? null,
      bestScore: bestScore ?? null,
      attempts,
      timeSpentMin: timeSpentMin ?? 0,
      lastVisitedAt: new Date(),
    },
    update: {
      status: status ?? existing?.status ?? "in-progress",
      scorePercent: scorePercent ?? existing?.scorePercent ?? null,
      bestScore,
      attempts,
      timeSpentMin: (existing?.timeSpentMin ?? 0) + (timeSpentMin ?? 0),
      lastVisitedAt: new Date(),
    },
  });

  return NextResponse.json({ progress: record });
}
