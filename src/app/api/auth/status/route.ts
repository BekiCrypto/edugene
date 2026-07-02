import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { gradeToAgeBand } from "@/lib/age-bands";

export const dynamic = "force-dynamic";

// GET /api/auth/status — returns current session info
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({
      authenticated: false,
      user: null,
      googleEnabled: !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET,
    });
  }

  const ageBand = (session.user as any).ageBand
    || gradeToAgeBand((session.user as any).gradeLevel);

  return NextResponse.json({
    authenticated: true,
    user: {
      id: (session.user as any).id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      role: (session.user as any).role || "student",
      gradeLevel: (session.user as any).gradeLevel || null,
      ageBand,
    },
    googleEnabled: !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET,
  });
}
