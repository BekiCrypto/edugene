import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface Identity {
  userId: string | null;
  studentKey: string;
  isAuthenticated: boolean;
}

/**
 * Resolve the current identity from session (NextAuth).
 * Falls back to a studentKey passed by the client for anonymous use.
 */
export async function getIdentityFromRequest(
  studentKeyHeader?: string | null
): Promise<Identity> {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    return {
      userId: session.user.id,
      studentKey: `user:${session.user.id}`,
      isAuthenticated: true,
    };
  }
  return {
    userId: null,
    studentKey: studentKeyHeader || "student-anon",
    isAuthenticated: false,
  };
}
