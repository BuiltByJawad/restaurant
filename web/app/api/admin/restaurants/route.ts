import { ok } from "@/lib/api-utils";
import { mapRestaurant } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();
  const restaurants = await prisma.restaurant.findMany({
    include: {
      owner: true,
      subscription: true,
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const mapped = restaurants.map(mapRestaurant);
  return ok(q ? mapped.filter((restaurant) => restaurant.name.toLowerCase().includes(q)) : mapped);
}