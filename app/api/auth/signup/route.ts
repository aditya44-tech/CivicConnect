import { NextResponse } from "next/server";

import { Role } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { isDemoMode } from "@/lib/queries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }
    if (isDemoMode()) {
      return NextResponse.json(
        {
          error:
            "DATABASE_URL is not configured — add your Neon connection string to .env to enable signups.",
        },
        { status: 503 }
      );
    }

    const existing = await getPrisma().user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const user = await getPrisma().user.create({
      data: {
        name,
        email,
        password: password,
        role: Role.CITIZEN,
      },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("signup error", err);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
