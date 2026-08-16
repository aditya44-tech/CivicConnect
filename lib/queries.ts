import { complaints as mockComplaints, type Comment, type Complaint, type Status } from "@/lib/data";
import { getPrisma } from "@/lib/prisma";
import { toCommentUI, toComplaintUI } from "@/lib/mappers";

/**
 * Demo mode: when DATABASE_URL isn't configured, pages fall back to the
 * static mock data so the UI stays browsable. The moment a real Neon URL is
 * added to .env, every read and write goes to Postgres.
 */
export function isDemoMode(): boolean {
  const url = process.env.DATABASE_URL;
  return !url || url.startsWith("postgresql://USER:PASSWORD");
}

const db = () => getPrisma();

/** Error shown when a write is attempted without a configured database. */
function demoModeError(what: string): Error {
  return new Error(
    `DATABASE_URL is not configured — add your Neon connection string to .env to enable ${what}.`
  );
}

export interface ComplaintFilters {
  category?: string;
  status?: Status | "All";
  query?: string;
}

function matches(filters: ComplaintFilters, c: Complaint): boolean {
  if (filters.category && filters.category !== "All" && c.category !== filters.category) return false;
  if (filters.status && filters.status !== "All" && c.status !== filters.status) return false;
  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (q && !`${c.title} ${c.address} ${c.category}`.toLowerCase().includes(q)) return false;
  }
  return true;
}

/** Sorted newest-first. */
export async function getComplaints(
  filters: ComplaintFilters = {}
): Promise<Complaint[]> {
  if (isDemoMode()) {
    return mockComplaints
      .filter((c) => matches(filters, c))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  const rows = await db().complaint.findMany({
    where: {
      ...(filters.category && filters.category !== "All"
        ? { category: filters.category }
        : {}),
      ...(filters.status && filters.status !== "All"
        ? { status: filters.status }
        : {}),
      ...(filters.query
        ? {
            OR: [
              { title: { contains: filters.query, mode: "insensitive" } },
              { address: { contains: filters.query, mode: "insensitive" } },
              { category: { contains: filters.query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { author: true, comments: { include: { author: true } } },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((r) => toComplaintUI(r));
}

export async function getComplaintById(id: string): Promise<Complaint | null> {
  if (isDemoMode()) {
    return mockComplaints.find((c) => c.id === id) ?? null;
  }

  const row = await db().complaint.findUnique({
    where: { id },
    include: { author: true, comments: { include: { author: true } } },
  });
  return row ? toComplaintUI(row) : null;
}

/** Complaints filed by the signed-in user, newest first. */
export async function getComplaintsByAuthor(
  authorId: string
): Promise<Complaint[]> {
  if (isDemoMode()) {
    return mockComplaints
      .filter((c) => c.isMine)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  const rows = await db().complaint.findMany({
    where: { authorId },
    include: { author: true, comments: { include: { author: true } } },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((r) => toComplaintUI(r, { mine: true }));
}

export interface AdminStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  categories: { category: string; count: number }[];
  recent: Complaint[];
  topUpvoted: Complaint[];
}

/** Aggregate stats for the admin dashboard + analytics pages. */
export async function getAdminStats(): Promise<AdminStats> {
  if (isDemoMode()) {
    const pending = mockComplaints.filter((c) => c.status === "Pending").length;
    const inProgress = mockComplaints.filter((c) => c.status === "Ongoing").length;
    const resolved = mockComplaints.filter((c) => c.status === "Resolved").length;
    const cats = new Map<string, number>();
    for (const c of mockComplaints) cats.set(c.category, (cats.get(c.category) ?? 0) + 1);
    return {
      total: mockComplaints.length,
      pending,
      inProgress,
      resolved,
      categories: [...cats.entries()].map(([category, count]) => ({ category, count })),
      recent: [...mockComplaints]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
      topUpvoted: [...mockComplaints]
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, 5),
    };
  }

  const [total, pending, inProgress, resolved, grouped, recentRows, topRows] =
    await Promise.all([
      db().complaint.count(),
      db().complaint.count({ where: { status: "Pending" } }),
      db().complaint.count({ where: { status: "Ongoing" } }),
      db().complaint.count({ where: { status: "Resolved" } }),
      db().complaint.groupBy({ by: ["category"], _count: true }),
      db().complaint.findMany({
        include: { author: true, comments: { include: { author: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db().complaint.findMany({
        include: { author: true, comments: { include: { author: true } } },
        orderBy: { upvoteCount: "desc" },
        take: 5,
      }),
    ]);

  return {
    total,
    pending,
    inProgress,
    resolved,
    categories: grouped.map((g) => ({ category: g.category, count: g._count })),
    recent: recentRows.map((r) => toComplaintUI(r)),
    topUpvoted: topRows.map((r) => toComplaintUI(r)),
  };
}

export async function createComplaint(data: {
  title: string;
  description: string;
  category: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  image?: string | null;
  authorId: string;
}): Promise<Complaint> {
  if (isDemoMode()) {
    throw demoModeError("submissions");
  }
  const row = await db().complaint.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      address: data.address,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      image: data.image ?? null,
      authorId: data.authorId,
    },
    include: { author: true, comments: { include: { author: true } } },
  });
  return toComplaintUI(row);
}

/** Toggle an upvote; keeps the denormalized count in sync. Returns new count + state. */
export async function toggleUpvote(
  complaintId: string,
  userId: string
): Promise<{ count: number; upvoted: boolean }> {
  if (isDemoMode()) {
    throw demoModeError("upvoting");
  }
  const existing = await db().upvote.findUnique({
    where: { userId_complaintId: { userId, complaintId } },
  });

  const count = await db().$transaction(async (tx) => {
    if (existing) {
      await tx.upvote.delete({ where: { id: existing.id } });
    } else {
      await tx.upvote.create({ data: { userId, complaintId } });
    }
    const complaint = await tx.complaint.update({
      where: { id: complaintId },
      data: { upvoteCount: { increment: existing ? -1 : 1 } },
      select: { upvoteCount: true },
    });
    return complaint.upvoteCount;
  });

  return { count, upvoted: !existing };
}

export async function addComment(
  complaintId: string,
  authorId: string,
  body: string
): Promise<Comment> {
  if (isDemoMode()) {
    throw demoModeError("comments");
  }
  const row = await db().comment.create({
    data: { complaintId, authorId, body },
    include: { author: true },
  });
  return toCommentUI(row);
}

export async function updateComplaintStatus(
  complaintId: string,
  status: Status
): Promise<void> {
  if (isDemoMode()) {
    throw demoModeError("status updates");
  }
  await db().complaint.update({
    where: { id: complaintId },
    data: { status },
  });
}

/**
 * Deletes a complaint. Comments and upvotes cascade automatically
 * (onDelete: Cascade in the schema).
 */
export async function deleteComplaint(id: string): Promise<void> {
  if (isDemoMode()) {
    throw demoModeError("deleting complaints");
  }
  await db().complaint.delete({ where: { id } });
}
