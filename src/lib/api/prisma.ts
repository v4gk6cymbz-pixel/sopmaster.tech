import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function requireTursoEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`${key} environment variable is required. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env or deployment environment.`);
  return val;
}

const adapter = new PrismaLibSql({
  url: requireTursoEnv("TURSO_DATABASE_URL"),
  authToken: requireTursoEnv("TURSO_AUTH_TOKEN"),
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
