import { z } from "zod";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { getRestaurantBySlug, mapRestaurant } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

const updateRestaurantSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  phone: z.string().min(8).optional(),
  email: z.string().email().optional(),
  address: z.string().min(5).optional(),
  area: z.string().min(2).optional(),
  city: z.string().optional(),
  cuisineTypes: z.array(z.string()).optional(),
  isOpen: z.boolean().optional(),
  acceptsOrders: z.boolean().optional(),
  status: z.enum(["ACTIVE", "TRIAL", "SUSPENDED", "PENDING_APPROVAL", "CLOSED"]).optional(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) return fail("Restaurant not found", 404);
  return ok(mapRestaurant(restaurant));
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = await parseJson(request, updateRestaurantSchema);
  if (parsed.error) return fail("Invalid restaurant update", 422, parsed.error);

  try {
    const restaurant = await prisma.restaurant.update({
      where: { slug },
      data: parsed.data,
      include: {
        owner: true,
        subscription: true,
        _count: { select: { orders: true } },
      },
    });
    return ok(mapRestaurant(restaurant));
  } catch {
    return fail("Restaurant not found", 404);
  }
}