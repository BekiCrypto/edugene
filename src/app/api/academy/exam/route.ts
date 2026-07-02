import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/exam?subjectId=...&grade=...
// Returns sample exams for a given subject and grade
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");
  const grade = searchParams.get("grade");

  if (!subjectId) {
    return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
  }

  const where: any = { subjectId };
  if (grade) where.gradeLevel = Number(grade);

  const exams = await db.sampleExam.findMany({
    where,
    orderBy: { title: "asc" },
    include: { questions: { orderBy: { number: "asc" } } },
  });

  // Parse options JSON for MCQs
  const parsed = exams.map((e) => ({
    ...e,
    questions: e.questions.map((q) => ({
      ...q,
      options: q.options ? safeParse(q.options) ?? null : null,
    })),
  }));

  return NextResponse.json({ exams: parsed });
}

function safeParse(s: string | null): any {
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
