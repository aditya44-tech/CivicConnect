import type { Complaint, Comment } from "@/lib/data";
import type { Prisma } from "@prisma/client";

type ComplaintWithRelations = Prisma.ComplaintGetPayload<{
  include: { author: true; comments: { include: { author: true } } };
}>;

/** "Aug 3, 2026" — matches the display style the seed data used */
export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** "just now" / "5h" / "2d" — matches the comment timestamps in the mock data */
export function relativeTime(d: Date): string {
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w`;
  return formatDate(d);
}

export function toCommentUI(
  row: {
    id: string;
    body: string;
    createdAt: Date;
    author: { name: string };
  }
): Comment {
  return {
    author: row.author.name,
    body: row.body,
    time: relativeTime(row.createdAt),
  };
}

export function toComplaintUI(
  row: ComplaintWithRelations,
  opts?: { mine?: boolean }
): Complaint {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    status: row.status as Complaint["status"],
    upvotes: row.upvoteCount,
    image: row.image ?? "/images/c1.jpg",
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    createdAt: formatDate(row.createdAt),
    createdAtISO: row.createdAt.toISOString(),
    author: row.author.name,
    authorId: row.authorId,
    isMine: opts?.mine,
    comments: row.comments
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .map(toCommentUI),
  };
}
