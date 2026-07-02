import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { XP_REWARDS } from "@/lib/gamification";

export const dynamic = "force-dynamic";

// GET /api/academy/notes?lessonId=...
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ notes: [] });
  }
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  const notes = await db.note.findMany({
    where: { userId: session.user.id, ...(lessonId ? { lessonId } : {}) },
    orderBy: [{ pinned: "desc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ notes });
}

// POST /api/academy/notes
// Body: { action: "create" | "update" | "delete" | "pin", ... }
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const body = await req.json();
  const { action } = body;

  if (action === "create") {
    const note = await db.note.create({
      data: {
        userId: session.user.id,
        lessonId: body.lessonId || null,
        title: body.title || "Untitled note",
        content: body.content || "",
        color: body.color || "default",
        tags: JSON.stringify(body.tags || []),
      },
    });
    // Award XP for note creation
    await db.studentProgress.upsert({
      where: {
        studentKey_itemId_itemType: {
          studentKey: `user:${session.user.id}`,
          itemId: note.id,
          itemType: "lesson-note",
        },
      },
      create: {
        userId: session.user.id,
        studentKey: `user:${session.user.id}`,
        itemId: note.id,
        itemType: "lesson-note",
        status: "completed",
        attempts: 1,
        xpEarned: XP_REWARDS.NOTE_CREATED,
      },
      update: {},
    });
    return NextResponse.json({ note });
  }

  if (action === "update") {
    const note = await db.note.update({
      where: { id: body.id, userId: session.user.id },
      data: {
        title: body.title,
        content: body.content,
        color: body.color,
        tags: JSON.stringify(body.tags || []),
      },
    });
    return NextResponse.json({ note });
  }

  if (action === "pin") {
    const note = await db.note.update({
      where: { id: body.id, userId: session.user.id },
      data: { pinned: !!body.pinned },
    });
    return NextResponse.json({ note });
  }

  if (action === "delete") {
    await db.note.delete({
      where: { id: body.id, userId: session.user.id },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
