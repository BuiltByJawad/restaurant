import { ok } from "@/lib/api-utils";
import { DEFAULT_RESTAURANT_SLUG, getRestaurantBySlug } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("restaurantSlug") ?? DEFAULT_RESTAURANT_SLUG;

  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return ok({ weekly: [], monthly: [], topItems: [], hourly: [], stats: {} });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [allOrders, orderItems] = await Promise.all([
    prisma.order.findMany({
      where: {
        restaurantId: restaurant.id,
        createdAt: { gte: thirtyDaysAgo },
      },
      select: { total: true, createdAt: true, status: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.orderItem.findMany({
      where: {
        order: {
          restaurantId: restaurant.id,
          createdAt: { gte: thirtyDaysAgo },
        },
      },
      select: { name: true, quantity: true, totalPrice: true },
    }),
  ]);

  const deliveredOrders = allOrders.filter((o) => o.status !== "CANCELLED" && o.status !== "REFUNDED");

  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = deliveredOrders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const thirtyDaysRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
  const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);
  const recentRevenue = deliveredOrders.filter((o) => o.createdAt >= fifteenDaysAgo).reduce((sum, o) => sum + o.total, 0);
  const olderRevenue = thirtyDaysRevenue - recentRevenue;
  const revenueGrowth = olderRevenue > 0 ? Math.round(((recentRevenue - olderRevenue) / olderRevenue) * 100) : 0;

  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyMap = new Map<string, { day: string; revenue: number; orders: number; date: string }>();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    weeklyMap.set(key, { day: DAY_NAMES[d.getDay()], revenue: 0, orders: 0, date: key });
  }
  for (const order of deliveredOrders) {
    if (order.createdAt >= sevenDaysAgo) {
      const key = order.createdAt.toISOString().slice(0, 10);
      const entry = weeklyMap.get(key);
      if (entry) {
        entry.revenue += order.total;
        entry.orders += 1;
      }
    }
  }
  const weekly = Array.from(weeklyMap.values());

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyMap = new Map<string, { month: string; revenue: number; orders: number }>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyMap.set(key, { month: MONTH_NAMES[d.getMonth()], revenue: 0, orders: 0 });
  }
  for (const order of allOrders) {
    const key = `${order.createdAt.getFullYear()}-${String(order.createdAt.getMonth() + 1).padStart(2, "0")}`;
    const entry = monthlyMap.get(key);
    if (entry && order.status !== "CANCELLED") {
      entry.revenue += order.total;
      entry.orders += 1;
    }
  }
  const monthly = Array.from(monthlyMap.values());

  const itemMap = new Map<string, { name: string; sold: number; revenue: number }>();
  for (const item of orderItems) {
    const existing = itemMap.get(item.name);
    if (existing) {
      existing.sold += item.quantity;
      existing.revenue += item.totalPrice;
    } else {
      itemMap.set(item.name, { name: item.name, sold: item.quantity, revenue: item.totalPrice });
    }
  }
  const topItems = Array.from(itemMap.values())
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5)
    .map((item) => ({ ...item, growth: "+—" }));

  const hourlyMap = new Map<number, { hour: string; orders: number }>();
  for (let h = 10; h <= 22; h++) {
    const label = h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`;
    hourlyMap.set(h, { hour: label, orders: 0 });
  }
  for (const order of deliveredOrders) {
    if (order.createdAt >= sevenDaysAgo) {
      const h = order.createdAt.getHours();
      const entry = hourlyMap.get(h);
      if (entry) entry.orders += 1;
    }
  }
  const hourly = Array.from(hourlyMap.values());

  return ok({
    stats: {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      revenueGrowth,
    },
    weekly,
    monthly,
    topItems,
    hourly,
  });
}
