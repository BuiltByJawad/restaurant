import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = await parseJson(request, loginSchema);
  if (parsed.error) return fail("Invalid login payload", 422, parsed.error);

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    include: { restaurant: true },
  });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return fail("Invalid email or password", 401);
  }

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || "foodflow-dev-secret", { expiresIn: "7d" });

  return ok({
    token,
    user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
    restaurantSlug: user.restaurant?.slug ?? null,
  });
}