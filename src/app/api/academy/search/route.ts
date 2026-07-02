import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/search?q=...&curriculumId=...
// Searches lessons and exams by title/summary
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const curriculumId = searchParams.get("curriculumId");

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const subjectWhere: any = {};
  if (curriculumId) subjectWhere.curriculumId = curriculumId;

  const subjects = await db.subject.findMany({
    where: subjectWhere,
    select: { id: true, name: true, slug: true, curriculumId: true },
  });
  const subjectIds = subjects.map((s) => s.id);
  const subjectMap = new Map(subjects.map((s) => [s.id, s]));

  const lessons = await db.lesson.findMany({
    where: {
      subjectId: { in: subjectIds },
      OR: [
        { title: { contains: q } },
        { summary: { contains: q } },
      ],
    },
    take: 50,
  });

  const results = lessons.map((l) => ({
    type: "lesson" as const,
    id: l.id,
    title: l.title,
    summary: l.summary,
    grade: l.grade,
    subjectId: l.subjectId,
    subjectName: subjectMap.get(l.subjectId)?.name ?? "",
  }));

  return NextResponse.json({ results });
}
