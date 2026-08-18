/**
 * Seed script — populates the database with the demo data that previously
 * lived in lib/data.ts so the UI looks identical after the backend swap.
 *
 * Run with:  npx prisma db seed
 */
import { PrismaClient, Role } from "@prisma/client";

import { complaints, type Status } from "../lib/data";

const prisma = new PrismaClient();

// Relative comment times in the mock ("2h", "1d", "3d") → Date offsets
function offsetFor(time: string): Date {
  const match = time.match(/(\d+)([hdwm])/);
  if (!match) return new Date(Date.now() - 60 * 60 * 1000);
  const n = parseInt(match[1], 10);
  const unit = match[2];
  const ms =
    unit === "h" ? n * 60 * 60 * 1000
    : unit === "d" ? n * 24 * 60 * 60 * 1000
    : unit === "w" ? n * 7 * 24 * 60 * 60 * 1000
    : n * 30 * 24 * 60 * 60 * 1000;
  return new Date(Date.now() - ms);
}

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}

async function main() {
  console.log("🌱 Seeding database…");

  // ── Users ─────────────────────────────────────────────────────────────
  const authors = new Set<string>();
  for (const c of complaints) authors.add(c.author);
  for (const c of complaints) for (const cm of c.comments) authors.add(cm.author);

  // A citizen account named "You" owns the isMine complaints in the seed data
  const users: Record<string, string> = {}; // name → userId
  for (const name of authors) {
    const user = await prisma.user.upsert({
      where: { email: `${slug(name)}@example.com` },
      update: {},
      create: {
        name,
        email: `${slug(name)}@example.com`,
        password: "password123",
        role: Role.CITIZEN,
      },
    });
    users[name] = user.id;
  }

  const admin = await prisma.user.upsert({
    where: { email: "admin@riverside.gov" },
    update: {},
    create: {
      name: "City Admin",
      email: "admin@riverside.gov",
      password: "admin123",
      role: Role.ADMIN,
    },
  });
  users["City Admin"] = admin.id;

  console.log(`   ${Object.keys(users).length} users`);

  // ── Complaints ────────────────────────────────────────────────────────
  for (const c of complaints) {
    const authorId = users[c.author];
    if (!authorId) continue;

    const created = new Date(c.createdAt); // "Aug 3, 2026" parses in V8
    const complaint = await prisma.complaint.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        title: c.title,
        description: c.description,
        category: c.category,
        status: c.status as Status,
        image: c.image,
        address: c.address,
        latitude: c.latitude ?? null,
        longitude: c.longitude ?? null,
        createdAt: created,
        authorId,
      },
    });

    // Comments
    for (const comment of c.comments) {
      const commentAuthorId = users[comment.author];
      if (!commentAuthorId) continue;
      await prisma.comment.create({
        data: {
          body: comment.body,
          createdAt: offsetFor(comment.time),
          complaintId: complaint.id,
          authorId: commentAuthorId,
        },
      });
    }
  }

  console.log(`   ${complaints.length} complaints`);
  console.log("✅ Seed complete.");
  console.log("   Citizen login:  you@example.com  /  password123");
  console.log("   Admin login:    admin@riverside.gov  /  admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
