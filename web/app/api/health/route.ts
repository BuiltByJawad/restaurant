import { ok, fail } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return ok({ status: "healthy", database: "connected" });
  } catch (error) {
    return fail("Database health check failed", 500, error instanceof Error ? error.message : error);
  }
}