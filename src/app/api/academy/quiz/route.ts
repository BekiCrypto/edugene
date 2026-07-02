import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/quiz?lessonId=...
// Returns the quiz for a given lesson (with questions)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  if (!lessonId) {
    return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
  }

  const quiz = await db.quiz.findFirst({
    where: { lessonId },
    include: { questions: true },
  });

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  // Parse options JSON strings into arrays for client convenience
  const quizWithParsedOptions = {
    ...quiz,
    questions: quiz.questions.map((q) => ({
      ...q,
      options: safeParse(q.options) ?? [],
    })),
  };

  return NextResponse.json({ quiz: quizWithParsedOptions });
}

function safeParse(s: string | null): any {
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
