import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 * Instantiated lazily so importing this module never throws while
 * DATABASE_URL is unset (demo mode) — the error surfaces on first query.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}
