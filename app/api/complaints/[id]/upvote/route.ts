import { NextResponse } from "next/server";
import { toggleUpvote, getComplaintById } from "@/lib/queries";
import { getSessionUser } from "@/lib/auth";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to upvote." }, { status: 401 });
  }

  const { id } = await params;
  const complaint = await getComplaintById(id);
  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
  }

  try {
    const { count, upvoted } = await toggleUpvote(id, user.id);
    return NextResponse.json({ count, upvoted });
  } catch (err) {
    console.error("upvote error", err);
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
