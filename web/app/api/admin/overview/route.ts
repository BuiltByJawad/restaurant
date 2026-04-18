import { ok } from "@/lib/api-utils";
import { mapRestaurant } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [restaurants, orders, subscriptions] = await Promise.all([
    prisma.restaurant.findMany({
      include: {
        owner: true,
        subscription: true,
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.findMany({ select: { total: true, createdAt: true } }),
    prisma.subscription.groupBy({ by: ["planId"], _count: { planId: true }, _sum: { amount: true } }),
  ]);

  const now = new Date();
  const month = now.getMonth();
  const monthlyOrders = orders.filter((order) => order.createdAt.getMonth() === month);

  return ok({
    stats: {
      totalRestaurants: restaurants.length,
      activeRestaurants: restaurants.filter((restaurant) => restaurant.status === "ACTIVE").length,
      trialRestaurants: restaurants.filter((restaurant) => restaurant.status === "TRIAL").length,
      totalOrdersToday: orders.filter((order) => order.createdAt.toDateString() === now.toDateString()).length,
      platformRevenueMonth: monthlyOrders.reduce((sum, order) => sum + order.total, 0),
      newSignupsMonth: restaurants.filter((restaurant) => restaurant.createdAt.getMonth() === month).length,
    },
    restaurants: restaurants.map(mapRestaurant),
    subscriptions,
  });
}