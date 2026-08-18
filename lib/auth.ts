import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import { isDemoMode } from "@/lib/queries";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (isDemoMode()) {
          throw new Error(
            "DATABASE_URL is not configured — add your Neon connection string to .env to enable login."
          );
        }
        const user = await getPrisma().user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });
        if (!user) return null;
        if (credentials.password !== user.password) return null;
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: "CITIZEN" | "ADMIN" }).role ?? "CITIZEN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "CITIZEN" | "ADMIN") ?? "CITIZEN";
      }
      return session;
    },
  },
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "CITIZEN" | "ADMIN";
};

/** Reads the session in server components / route handlers. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  const user = session?.user as SessionUser | undefined;
  return user ?? null;
}

/** Redirects to /login when there is no session. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/** Redirects to /admin-login when the session isn't an admin. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") redirect("/admin-login");
  return user;
}
