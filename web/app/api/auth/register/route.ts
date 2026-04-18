import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const registerSchema = z.object({
  ownerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(6),
  restaurantName: z.string().min(2),
  restaurantPhone: z.string().min(8),
  address: z.string().min(5),
  area: z.string().min(2),
  city: z.string().default("Dhaka"),
  plan: z.enum(["starter", "pro", "enterprise"]).default("starter"),
});

const planMap = { starter: "STARTER", pro: "PRO", enterprise: "ENTERPRISE" } as const;

export async function POST(request: Request) {
  const parsed = await parseJson(request, registerSchema);
  if (parsed.error) return fail("Invalid registration payload", 422, parsed.error);
  const data = parsed.data;
  const passwordHash = await bcrypt.hash(data.password, 10);
  const slug = slugify(data.restaurantName);

  try {
    const owner = await prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash,
        fullName: data.ownerName,
        role: "RESTAURANT_ADMIN",
        restaurant: {
          create: {
            slug,
            name: data.restaurantName,
            phone: data.restaurantPhone,
            address: data.address,
            area: data.area,
            city: data.city,
            division: `${data.city} Division`,
            cuisineTypes: [],
            status: "TRIAL",
            subscription: {
              create: {
                planId: planMap[data.plan],
                status: "TRIALING",
                interval: "MONTHLY",
                amount: data.plan === "starter" ? 999 : data.plan === "pro" ? 2499 : 0,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 3600000),
                trialEnd: new Date(Date.now() + 14 * 24 * 3600000),
              },
            },
            paymentConfig: { create: {} },
          },
        },
      },
    });

    const token = jwt.sign({ sub: owner.id, role: owner.role }, process.env.JWT_SECRET || "foodflow-dev-secret", { expiresIn: "7d" });
    return ok({ token, user: { id: owner.id, email: owner.email, fullName: owner.fullName, role: owner.role }, restaurantSlug: slug }, { status: 201 });
  } catch (error) {
    return fail("Registration failed", 400, error instanceof Error ? error.message : error);
  }
}