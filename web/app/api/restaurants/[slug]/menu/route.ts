import { z } from "zod";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { getRestaurantBySlug, getRestaurantMenu, mapMenuItem } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

const menuItemSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  emoji: z.string().optional(),
  isVeg: z.boolean().default(false),
  spiceLevel: z.enum(["NONE", "MILD", "MEDIUM", "HOT", "EXTRA_HOT"]).default("NONE"),
  preparationTime: z.number().int().positive().default(15),
  tags: z.array(z.string()).default([]),
});

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const menu = await getRestaurantMenu(slug);
  if (!menu) return fail("Restaurant not found", 404);
  return ok(menu);
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = await parseJson(request, menuItemSchema);
  if (parsed.error) return fail("Invalid menu item payload", 422, parsed.error);
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) return fail("Restaurant not found", 404);

  const item = await prisma.menuItem.create({
    data: {
      restaurantId: restaurant.id,
      categoryId: parsed.data.categoryId,
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      emoji: parsed.data.emoji,
      isVeg: parsed.data.isVeg,
      spiceLevel: parsed.data.spiceLevel,
      preparationTime: parsed.data.preparationTime,
      tags: parsed.data.tags,
      allergens: [],
    },
  });

  return ok(mapMenuItem(item), { status: 201 });
}