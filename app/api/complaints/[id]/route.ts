import { NextResponse } from "next/server";
import { deleteComplaint, getComplaintById } from "@/lib/queries";
import { getSessionUser } from "@/lib/auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Please log in to delete." }, { status: 401 });
  }

  const { id } = await params;
  const complaint = await getComplaintById(id);
  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
  }

  // The author can delete their own report; admins can delete any report.
  const isOwner = complaint.authorId === user.id;
  const isAdmin = user.role === "ADMIN";
  if (!isOwner && !isAdmin) {
    return NextResponse.json(
      { error: "You can only delete your own reports." },
      { status: 403 }
    );
  }

  try {
    await deleteComplaint(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("delete complaint error", err);
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
