import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/download?curriculumId=...&grade=...
// Returns a single JSON bundle with all content for the given curriculum+grade
// so the client can cache it in IndexedDB for offline use.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const curriculumId = searchParams.get("curriculumId");
  const grade = searchParams.get("grade");

  if (!curriculumId || !grade) {
    return NextResponse.json(
      { error: "curriculumId and grade are required" },
      { status: 400 }
    );
  }

  const gradeNum = Number(grade);

  const curriculum = await db.curriculum.findUnique({
    where: { id: curriculumId },
  });
  if (!curriculum) {
    return NextResponse.json({ error: "Curriculum not found" }, { status: 404 });
  }

  const subjects = await db.subject.findMany({
    where: { curriculumId },
    orderBy: { name: "asc" },
  });

  const subjectSlugs = subjects.filter((s) => gradeInSpec(gradeNum, s.grades));

  const bundle: any = {
    curriculum,
    grade: gradeNum,
    generatedAt: new Date().toISOString(),
    subjects: [],
  };

  for (const subject of subjectSlugs) {
    const lessons = await db.lesson.findMany({
      where: { subjectId: subject.id, grade: gradeNum },
      orderBy: { order: "asc" },
      include: {
        quizzes: { include: { questions: true } },
      },
    });
    const exams = await db.sampleExam.findMany({
      where: { subjectId: subject.id, gradeLevel: gradeNum },
      include: { questions: { orderBy: { number: "asc" } } },
    });
    const mindMaps = await db.mindMap.findMany({
      where: { subjectId: subject.id, grade: gradeNum },
    });

    bundle.subjects.push({
      subject,
      lessons: lessons.map((l) => ({
        ...l,
        keyTerms: safeParse(l.keyTerms),
        examples: safeParse(l.examples),
      })),
      exams,
      mindMaps: mindMaps.map((m) => ({
        ...m,
        nodes: safeParse(m.nodesJson),
        edges: safeParse(m.edgesJson),
      })),
    });
  }

  return NextResponse.json(bundle);
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

function safeParse(s: string | null | undefined): any {
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
