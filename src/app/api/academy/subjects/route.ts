import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/subjects?curriculumId=...&grade=...
// Returns subjects that are available for the given curriculum and grade
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const curriculumId = searchParams.get("curriculumId");
  const grade = searchParams.get("grade");

  if (!curriculumId) {
    return NextResponse.json(
      { error: "curriculumId is required" },
      { status: 400 }
    );
  }

  const subjects = await db.subject.findMany({
    where: { curriculumId },
    orderBy: { name: "asc" },
  });

  // If grade provided, filter by grade availability
  const filtered = grade
    ? subjects.filter((s) => gradeInSpec(Number(grade), s.grades))
    : subjects;

  return NextResponse.json({ subjects: filtered });
}

function gradeInSpec(grade: number, spec: string): boolean {
  for (const part of spec.split(",")) {
    const p = part.trim();
    const m = p.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      if (grade >= a && grade <= b) return true;
    } else if (/^\d+$/.test(p) && parseInt(p, 10) === grade) {
      return true;
    }
  }
  return false;
}
