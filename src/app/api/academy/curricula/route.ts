import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/academy/curricula — list all curricula with subjects
export async function GET() {
  const curricula = await db.curriculum.findMany({
    include: {
      subjects: {
        orderBy: { name: "asc" },
      },
    },
    orderBy: { name: "asc" },
  });
  return NextResponse.json({ curricula });
}
