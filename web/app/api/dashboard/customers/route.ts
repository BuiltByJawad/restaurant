import { ok } from "@/lib/api-utils";
import { DEFAULT_RESTAURANT_SLUG, getRestaurantBySlug } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("restaurantSlug") ?? DEFAULT_RESTAURANT_SLUG;

  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) return ok({ customers: [], total: 0 });

  const orders = await prisma.order.findMany({
    where: { restaurantId: restaurant.id },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      customerPhone: true,
      customerEmail: true,
      deliveryAddress: true,
      deliveryArea: true,
      deliveryCity: true,
      total: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const customerMap = new Map<
    string,
    {
      id: string;
      name: string;
      phone: string;
      email: string;
      address: string;
      area: string;
      city: string;
      totalOrders: number;
      totalSpent: number;
      lastOrderDate: string;
      recentOrders: Array<{ orderNumber: string; total: number; status: string; createdAt: string }>;
    }
  >();

  for (const order of orders) {
    const key = order.customerPhone;
    const existing = customerMap.get(key);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += order.total;
      if (order.createdAt.toISOString() > existing.lastOrderDate) {
        existing.lastOrderDate = order.createdAt.toISOString();
      }
      if (existing.recentOrders.length < 5) {
        existing.recentOrders.push({
          orderNumber: order.orderNumber,
          total: order.total,
          status: order.status.toLowerCase(),
          createdAt: order.createdAt.toISOString(),
        });
      }
    } else {
      customerMap.set(key, {
        id: order.customerPhone,
        name: order.customerName,
        phone: order.customerPhone,
        email: order.customerEmail ?? "",
        address: order.deliveryAddress,
        area: order.deliveryArea,
        city: order.deliveryCity,
        totalOrders: 1,
        totalSpent: order.total,
        lastOrderDate: order.createdAt.toISOString(),
        recentOrders: [
          {
            orderNumber: order.orderNumber,
            total: order.total,
            status: order.status.toLowerCase(),
            createdAt: order.createdAt.toISOString(),
          },
        ],
      });
    }
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => b.totalSpent - a.totalSpent
  );

  const newThisMonth = customers.filter((c) => {
    const d = new Date(c.lastOrderDate);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const repeatCustomers = customers.filter((c) => c.totalOrders > 1).length;
  const repeatRate = customers.length > 0 ? Math.round((repeatCustomers / customers.length) * 100) : 0;
  const topCustomer = customers[0]?.name ?? "—";

  return ok({
    customers,
    total: customers.length,
    newThisMonth,
    repeatRate,
    topCustomer,
  });
}
