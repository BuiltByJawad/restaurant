import { NextResponse } from "next/server";
import { z } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, details }, { status });
}

export async function parseJson<T>(request: Request, schema: z.ZodSchema<T>) {
  const json = await request.json().catch(() => null);
  const result = schema.safeParse(json);
  if (!result.success) {
    return { data: null, error: result.error.flatten() };
  }
  return { data: result.data, error: null };
}

export function getRequestIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null
  );
}