import { z } from "zod";
import { DEFAULT_RESTAURANT_SLUG, getRestaurantBySlug, mapRestaurant } from "@/lib/backend";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

const settingsSchema = z.object({
  restaurantSlug: z.string().default(DEFAULT_RESTAURANT_SLUG),
  name: z.string().min(2).optional(),
  phone: z.string().min(8).optional(),
  email: z.string().email().optional(),
  address: z.string().min(5).optional(),
  area: z.string().min(2).optional(),
  isOpen: z.boolean().optional(),
  acceptsOrders: z.boolean().optional(),
  minimumOrder: z.number().nonnegative().optional(),
  deliveryFee: z.number().nonnegative().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("restaurantSlug") ?? DEFAULT_RESTAURANT_SLUG;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) return fail("Restaurant not found", 404);
  return ok(mapRestaurant(restaurant));
}

export async function PUT(request: Request) {
  const parsed = await parseJson(request, settingsSchema);
  if (parsed.error) return fail("Invalid settings update", 422, parsed.error);
  const { restaurantSlug, ...data } = parsed.data;

  const restaurant = await prisma.restaurant.update({
    where: { slug: restaurantSlug },
    data,
    include: {
      owner: true,
      subscription: true,
      _count: { select: { orders: true } },
    },
  });

  return ok(mapRestaurant(restaurant));
}