import { NextResponse } from "next/server";
import { addComment, getComplaintById } from "@/lib/queries";
import { getSessionUser } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to comment." }, { status: 401 });
  }

  const { id } = await params;
  const complaint = await getComplaintById(id);
  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const text = String(body.body ?? "").trim();
    if (!text) {
      return NextResponse.json({ error: "Comment cannot be empty." }, { status: 400 });
    }
    const comment = await addComment(id, user.id, text);
    return NextResponse.json({ comment }, { status: 201 });
  } catch (err) {
    console.error("comment error", err);
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
