import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      gradeLevel?: number | null;
      ageBand?: string | null;
    };
  }
  interface User {
    role?: string;
    gradeLevel?: number | null;
    ageBand?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    gradeLevel?: number | null;
    ageBand?: string | null;
  }
}
