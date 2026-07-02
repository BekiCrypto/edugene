import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { XP_REWARDS, progressQuest } from "@/lib/gamification";

export const dynamic = "force-dynamic";

// GET /api/academy/flashcards — list decks + due cards
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ decks: [], dueCards: [] });
  }

  const { searchParams } = new URL(req.url);
  const deckId = searchParams.get("deckId");
  const dueOnly = searchParams.get("due") === "1";

  if (deckId) {
    const deck = await db.flashcardDeck.findUnique({
      where: { id: deckId },
      include: { cards: { orderBy: { dueDate: "asc" } } },
    });
    if (!deck || deck.userId !== session.user.id) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }
    const now = new Date();
    const dueCards = dueOnly
      ? deck.cards.filter((c) => c.dueDate <= now)
      : deck.cards;
    return NextResponse.json({ deck, dueCards });
  }

  const decks = await db.flashcardDeck.findMany({
    where: { userId: session.user.id },
    include: {
      _count: { select: { cards: true } },
      cards: {
        where: { dueDate: { lte: new Date() } },
        select: { id: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  const allDue = await db.flashcard.findMany({
    where: {
      deck: { userId: session.user.id },
      dueDate: { lte: new Date() },
    },
    include: { deck: { select: { title: true, id: true } } },
    take: 50,
  });

  return NextResponse.json({
    decks: decks.map((d) => ({
      ...d,
      dueCount: d.cards.length,
      cards: undefined,
    })),
    dueCards: allDue,
  });
}

// POST /api/academy/flashcards — create a deck or add cards
// Body: { action: "create-deck" | "add-card" | "review", ... }
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { action } = body;

  if (action === "create-deck") {
    const deck = await db.flashcardDeck.create({
      data: {
        userId: session.user.id,
        lessonId: body.lessonId || null,
        title: body.title || "Untitled Deck",
        description: body.description || null,
      },
    });
    if (Array.isArray(body.cards)) {
      await db.flashcard.createMany({
        data: body.cards.slice(0, 50).map((c: any) => ({
          deckId: deck.id,
          front: String(c.front || ""),
          back: String(c.back || ""),
          hint: c.hint ? String(c.hint) : null,
        })),
      });
    }
    return NextResponse.json({ deck });
  }

  if (action === "add-card") {
    const card = await db.flashcard.create({
      data: {
        deckId: body.deckId,
        front: body.front,
        back: body.back,
        hint: body.hint || null,
      },
    });
    return NextResponse.json({ card });
  }

  if (action === "review") {
    // Spaced Repetition System (SM-2 algorithm)
    // Body: { cardId, quality } where quality: 0=again, 1=hard, 2=good, 3=easy
    const { cardId, quality } = body;
    const card = await db.flashcard.findUnique({
      where: { id: cardId },
      include: { deck: true },
    });
    if (!card || card.deck.userId !== session.user.id) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    let { easeFactor, interval, repetitions } = card;
    const q = Math.max(0, Math.min(3, Number(quality) || 0));

    // SM-2 adaptation
    if (q < 2) {
      // Failed — reset
      repetitions = 0;
      interval = 1;
    } else {
      repetitions += 1;
      if (repetitions === 1) interval = 1;
      else if (repetitions === 2) interval = 3;
      else interval = Math.round(interval * easeFactor);
    }
    // Update ease factor (clamp 1.3 to 2.8)
    easeFactor = Math.max(1.3, Math.min(2.8, easeFactor + (0.1 - (3 - q) * (0.08 + (3 - q) * 0.02))));

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);

    const updated = await db.flashcard.update({
      where: { id: cardId },
      data: {
        easeFactor,
        interval,
        repetitions,
        dueDate,
        lastReviewed: new Date(),
      },
    });

    // Award XP for review
    await db.studentProgress.upsert({
      where: {
        studentKey_itemId_itemType: {
          studentKey: `user:${session.user.id}`,
          itemId: card.deckId,
          itemType: "flashcard",
        },
      },
      create: {
        userId: session.user.id,
        studentKey: `user:${session.user.id}`,
        itemId: card.deckId,
        itemType: "flashcard",
        status: "in-progress",
        attempts: 1,
        xpEarned: XP_REWARDS.FLASHCARD_REVIEW,
      },
      update: {
        attempts: { increment: 1 },
        xpEarned: { increment: XP_REWARDS.FLASHCARD_REVIEW },
      },
    });

    await progressQuest(session.user.id, "review-flashcards", 1);

    return NextResponse.json({ card: updated, xpEarned: XP_REWARDS.FLASHCARD_REVIEW });
  }

  if (action === "delete-deck") {
    await db.flashcardDeck.deleteMany({
      where: { id: body.deckId, userId: session.user.id },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
