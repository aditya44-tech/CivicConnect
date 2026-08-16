import { NextResponse } from "next/server";
import { createComplaint } from "@/lib/queries";
import { getSessionUser } from "@/lib/auth";
import { CATEGORIES } from "@/lib/data";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to submit a report." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const category = String(body.category ?? "");
    const address = String(body.address ?? "").trim() || "Shirpur, Maharashtra";
    const latitude = typeof body.latitude === "number" ? body.latitude : null;
    const longitude = typeof body.longitude === "number" ? body.longitude : null;
    const image = typeof body.image === "string" && body.image ? body.image : null;

    if (!title || title.length < 5) {
      return NextResponse.json({ error: "Please add a short title for the issue." }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "Please describe the issue in a little more detail." }, { status: 400 });
    }
    if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
      return NextResponse.json({ error: "Please pick a category." }, { status: 400 });
    }

    const complaint = await createComplaint({
      title,
      description,
      category,
      address,
      latitude,
      longitude,
      image,
      authorId: user.id,
    });
    return NextResponse.json({ complaint }, { status: 201 });
  } catch (err) {
    console.error("create complaint error", err);
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
