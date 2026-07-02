import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/mindmap?subjectId=...&grade=...
// Returns mind maps for a given subject and grade
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");
  const grade = searchParams.get("grade");

  if (!subjectId) {
    return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
  }

  const where: any = { subjectId };
  if (grade) where.grade = Number(grade);

  const mindMaps = await db.mindMap.findMany({
    where,
    orderBy: { title: "asc" },
  });

  // Parse JSON fields for client convenience
  const parsed = mindMaps.map((m) => ({
    ...m,
    nodes: JSON.parse(m.nodesJson),
    edges: JSON.parse(m.edgesJson),
  }));

  return NextResponse.json({ mindMaps: parsed });
}
