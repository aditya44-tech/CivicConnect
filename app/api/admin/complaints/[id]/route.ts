import { NextResponse } from "next/server";
import { updateComplaintStatus, getComplaintById } from "@/lib/queries";
import { getSessionUser } from "@/lib/auth";
import type { Status } from "@/lib/data";

const STATUSES: Status[] = ["Pending", "Ongoing", "Resolved"];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admins only." }, { status: 403 });
  }

  const { id } = await params;
  const complaint = await getComplaintById(id);
  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
  }

  try {
    const body = await request.json();
    const status = String(body.status ?? "") as Status;
    if (!STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    await updateComplaintStatus(id, status);
    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error("update status error", err);
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
