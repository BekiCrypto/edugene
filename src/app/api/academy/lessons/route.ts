import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/lessons?subjectId=...&grade=...
// Returns lessons for a given subject and grade, with quizzes
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");
  const grade = searchParams.get("grade");

  if (!subjectId) {
    return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
  }

  const where: any = { subjectId };
  if (grade) where.grade = Number(grade);

  const lessons = await db.lesson.findMany({
    where,
    orderBy: { order: "asc" },
    include: {
      quizzes: {
        include: { questions: true },
      },
    },
  });

  // Parse JSON-string fields for client convenience
  const parsed = lessons.map((l) => ({
    ...l,
    keyTerms: safeParse(l.keyTerms) ?? [],
    examples: safeParse(l.examples) ?? [],
    quizzes: l.quizzes.map((q) => ({
      ...q,
      questions: q.questions.map((qq) => ({
        ...qq,
        options: safeParse(qq.options) ?? [],
      })),
    })),
  }));

  return NextResponse.json({ lessons: parsed });
}

function safeParse(s: string | null | undefined): any {
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
