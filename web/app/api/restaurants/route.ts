import { z } from "zod";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { mapRestaurant } from "@/lib/backend";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const restaurantSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  address: z.string().min(5),
  area: z.string().min(2),
  city: z.string().default("Dhaka"),
  cuisineTypes: z.array(z.string()).default([]),
  ownerName: z.string().min(2),
  ownerEmail: z.string().email(),
  plan: z.enum(["STARTER", "PRO", "ENTERPRISE"]).default("STARTER"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const restaurants = await prisma.restaurant.findMany({
    where: status ? { status: status.toUpperCase() as any } : undefined,
    include: {
      owner: true,
      subscription: true,
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return ok(restaurants.map(mapRestaurant));
}

export async function POST(request: Request) {
  const parsed = await parseJson(request, restaurantSchema);
  if (parsed.error) return fail("Invalid restaurant payload", 422, parsed.error);
  const data = parsed.data;
  const slug = slugify(data.name);

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        slug,
        name: data.name,
        description: data.description,
        phone: data.phone,
        email: data.email,
        address: data.address,
        area: data.area,
        city: data.city,
        division: `${data.city} Division`,
        cuisineTypes: data.cuisineTypes,
        status: "PENDING_APPROVAL",
        owner: {
          create: {
            email: data.ownerEmail,
            fullName: data.ownerName,
            passwordHash: "pending-invite",
            role: "RESTAURANT_ADMIN",
          },
        },
        subscription: {
          create: {
            planId: data.plan,
            status: "TRIALING",
            interval: "MONTHLY",
            amount: data.plan === "STARTER" ? 999 : data.plan === "PRO" ? 2499 : 0,
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 3600000),
            trialEnd: new Date(Date.now() + 14 * 24 * 3600000),
          },
        },
        paymentConfig: { create: {} },
      },
      include: {
        owner: true,
        subscription: true,
        _count: { select: { orders: true } },
      },
    });

    return ok(mapRestaurant(restaurant), { status: 201 });
  } catch (error) {
    return fail("Could not create restaurant", 400, error instanceof Error ? error.message : error);
  }
}