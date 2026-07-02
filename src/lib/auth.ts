import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

/**
 * NextAuth configuration for EduGene.
 *
 * - Google OAuth is enabled when GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET are set.
 * - A "Guest" credentials provider is always available as a fallback so the app
 *   is fully functional in development / demo environments without OAuth setup.
 * - On first sign-in, a User row is created with role "student".
 * - An initial Streak row is created for streak tracking.
 */

const hasGoogle =
  !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

const providers: any[] = [];

if (hasGoogle) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

// Always-available guest provider — creates/looks-up a local student account
providers.push(
  CredentialsProvider({
    id: "guest",
    name: "Guest Student",
    credentials: {
      name: { label: "Nickname", type: "text", placeholder: "Alex" },
      grade: { label: "Grade", type: "number" },
    },
    async authorize(credentials) {
      const name = (credentials?.name || "Guest Student").trim();
      const grade = Number(credentials?.grade) || 5;
      const ageBand = gradeToAgeBand(grade);
      // Use a deterministic email-like key for guest so re-login is stable
      const guestEmail = `guest+${name.toLowerCase().replace(/\s+/g, "-")}@edugene.local`;

      let user = await db.user.findUnique({ where: { email: guestEmail } });
      if (!user) {
        user = await db.user.create({
          data: {
            name,
            email: guestEmail,
            role: "student",
            gradeLevel: grade,
            ageBand,
          },
        });
        await db.streak.create({ data: { userId: user.id } });
      } else {
        // Update grade/ageBand if changed
        if (user.gradeLevel !== grade || user.ageBand !== ageBand) {
          user = await db.user.update({
            where: { id: user.id },
            data: { gradeLevel: grade, ageBand, name },
          });
        }
      }
      return {
        id: user.id,
        name: user.name || name,
        email: user.email || guestEmail,
        image: user.image,
        role: user.role,
        gradeLevel: user.gradeLevel,
        ageBand: user.ageBand,
      } as any;
    },
  })
);

// Demo accounts for parents/teachers (always available)
providers.push(
  CredentialsProvider({
    id: "demo",
    name: "Demo Accounts",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.toLowerCase().trim();
      // Demo: parent@edugene.local / teacher@edugene.local with any password
      if (email === "parent@edugene.local") {
        let user = await db.user.findUnique({ where: { email } });
        if (!user) {
          user = await db.user.create({
            data: { name: "Demo Parent", email, role: "parent", ageBand: "scholars" },
          });
          await db.streak.create({ data: { userId: user.id } });
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          ageBand: user.ageBand,
        } as any;
      }
      if (email === "teacher@edugene.local") {
        let user = await db.user.findUnique({ where: { email } });
        if (!user) {
          user = await db.user.create({
            data: { name: "Demo Teacher", email, role: "teacher", ageBand: "scholars" },
          });
          await db.streak.create({ data: { userId: user.id } });
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          ageBand: user.ageBand,
        } as any;
      }
      return null;
    },
  })
);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "student";
        token.gradeLevel = (user as any).gradeLevel;
        token.ageBand = (user as any).ageBand;
      }
      // For Google OAuth users, load role/grade from DB if not in token
      if (token.sub && !token.role) {
        const dbUser = await db.user.findUnique({
          where: { id: token.sub },
          select: { role: true, gradeLevel: true, ageBand: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.gradeLevel = dbUser.gradeLevel;
          token.ageBand = dbUser.ageBand;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id || token.sub;
        (session.user as any).role = token.role || "student";
        (session.user as any).gradeLevel = token.gradeLevel;
        (session.user as any).ageBand = token.ageBand;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  events: {
    async createUser({ user }) {
      // Create streak record for new users
      if (user.id) {
        await db.streak.create({ data: { userId: user.id } }).catch(() => {});
      }
    },
  },
};

export function gradeToAgeBand(grade: number | null | undefined): string {
  if (!grade || grade < 1) return "sprouts";
  if (grade <= 3) return "sprouts";
  if (grade <= 6) return "explorers";
  if (grade <= 9) return "scholars";
  return "masters";
}
