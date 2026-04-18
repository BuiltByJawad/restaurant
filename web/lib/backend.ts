import type { MenuItem, Order, Restaurant } from "@/lib/dummy-data";
import { calculateDeliveryFee, calculateTax } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const DEFAULT_RESTAURANT_SLUG = "dhaka-biryani-house";

const statusToApi: Record<string, Order["status"]> = {
  PENDING: "pending",
  CONFIRMED: "pending",
  PREPARING: "preparing",
  READY: "ready",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "cancelled",
};

const paymentMethodToApi: Record<string, Order["paymentMethod"]> = {
  SSLCOMMERZ_CARD: "sslcommerz",
  BKASH: "bkash",
  NAGAD: "nagad",
  ROCKET: "rocket",
  CASH_ON_DELIVERY: "cod",
};

const paymentStatusToApi: Record<string, Order["paymentStatus"]> = {
  PENDING: "pending",
  PROCESSING: "pending",
  COMPLETED: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
  CANCELLED: "failed",
};

export function mapRestaurant(restaurant: any): Restaurant {
  return {
    id: restaurant.id,
    slug: restaurant.slug,
    name: restaurant.name,
    description: restaurant.description ?? "",
    cuisine: restaurant.cuisineTypes ?? [],
    rating: restaurant.averageRating ?? 0,
    reviewCount: restaurant.reviewCount ?? 0,
    deliveryTime: `${restaurant.estimatedDeliveryMin}-${restaurant.estimatedDeliveryMax} min`,
    deliveryFee: restaurant.deliveryFee,
    minimumOrder: restaurant.minimumOrder,
    address: restaurant.address,
    area: restaurant.area,
    city: restaurant.city,
    phone: restaurant.phone,
    isOpen: restaurant.isOpen && restaurant.acceptsOrders,
    coverImage: restaurant.coverImageUrl ?? "",
    logoImage: restaurant.logoUrl ?? "",
    plan: restaurant.subscription?.planId?.toLowerCase?.() ?? "starter",
    monthlyRevenue: restaurant.orders?.reduce?.((sum: number, order: any) => sum + order.total, 0) ?? 0,
    totalOrders: restaurant._count?.orders ?? restaurant.orders?.length ?? 0,
    joinedDate: restaurant.createdAt?.toISOString?.() ?? new Date().toISOString(),
    status: restaurant.status?.toLowerCase?.() ?? "trial",
    ownerId: restaurant.ownerId,
    ownerName: restaurant.owner?.fullName ?? "Restaurant Owner",
  };
}

export function mapMenuCategory(category: any) {
  return {
    id: category.id,
    restaurantId: category.restaurantId,
    name: category.name,
    emoji: category.emoji ?? "🍽️",
    order: category.sortOrder,
    itemCount: category._count?.items ?? category.items?.length ?? 0,
  };
}

export function mapMenuItem(item: any): MenuItem {
  return {
    id: item.id,
    restaurantId: item.restaurantId,
    categoryId: item.categoryId,
    name: item.name,
    description: item.description ?? "",
    price: item.price,
    image: item.imageUrl ?? "",
    emoji: item.emoji ?? "🍽️",
    isAvailable: item.isAvailable,
    isBestseller: item.isBestseller,
    isVeg: item.isVeg,
    spiceLevel: item.spiceLevel?.toLowerCase?.() ?? "none",
    preparationTime: item.preparationTime,
    tags: item.tags ?? [],
  };
}

export function mapOrder(order: any): Order {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    restaurantId: order.restaurantId,
    customerId: order.customerId ?? undefined,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerAddress: order.deliveryAddress,
    items: order.items.map((item: any) => ({
      menuItemId: item.menuItemId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.totalPrice,
    })),
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    tax: order.taxAmount,
    discount: order.discountAmount,
    total: order.total,
    status: statusToApi[order.status] ?? "pending",
    paymentMethod: paymentMethodToApi[order.paymentMethod] ?? "cod",
    paymentStatus: paymentStatusToApi[order.paymentStatus] ?? "pending",
    createdAt: order.createdAt.toISOString(),
    estimatedDelivery: (order.estimatedDeliveryAt ?? order.createdAt).toISOString(),
  };
}

export async function getRestaurantBySlug(slug: string) {
  return prisma.restaurant.findUnique({
    where: { slug },
    include: {
      owner: true,
      subscription: true,
      _count: { select: { orders: true } },
    },
  });
}

export async function getRestaurantMenu(slug: string) {
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) return null;

  const [categories, items] = await Promise.all([
    prisma.menuCategory.findMany({
      where: { restaurantId: restaurant.id, isActive: true },
      include: { _count: { select: { items: true } } },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.menuItem.findMany({
      where: { restaurantId: restaurant.id },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  ]);

  return {
    restaurant: mapRestaurant(restaurant),
    categories: categories.map(mapMenuCategory),
    items: items.map(mapMenuItem),
  };
}

export async function getRestaurantOrders(slug = DEFAULT_RESTAURANT_SLUG) {
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) return [];

  const orders = await prisma.order.findMany({
    where: { restaurantId: restaurant.id },
    include: { items: true, payment: true },
    orderBy: { createdAt: "desc" },
  });

  return orders.map(mapOrder);
}

export async function createGuestOrder(input: {
  restaurantSlug: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryArea: string;
  deliveryCity: string;
  paymentMethod: string;
  notes?: string;
  items: Array<{ menuItemId: string; quantity: number }>;
}) {
  const restaurant = await getRestaurantBySlug(input.restaurantSlug);
  if (!restaurant) throw new Error("Restaurant not found");
  if (!restaurant.acceptsOrders || !restaurant.isOpen) throw new Error("Restaurant is currently closed");

  const menuItems = await prisma.menuItem.findMany({
    where: {
      restaurantId: restaurant.id,
      id: { in: input.items.map((item) => item.menuItemId) },
      isAvailable: true,
    },
  });

  if (menuItems.length !== input.items.length) {
    throw new Error("One or more menu items are unavailable");
  }

  const itemRows = input.items.map((cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.menuItemId);
    if (!menuItem) throw new Error("Menu item not found");
    return {
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: cartItem.quantity,
      totalPrice: menuItem.price * cartItem.quantity,
    };
  });

  const subtotal = itemRows.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const taxAmount = calculateTax(subtotal);
  const total = subtotal + deliveryFee + taxAmount;
  const orderNumber = `FF-${Math.floor(100000 + Math.random() * 900000)}`;
  const method =
    input.paymentMethod === "sslcommerz"
      ? "SSLCOMMERZ_CARD"
      : input.paymentMethod === "bkash"
        ? "BKASH"
        : input.paymentMethod === "nagad"
          ? "NAGAD"
          : input.paymentMethod === "rocket"
            ? "ROCKET"
            : "CASH_ON_DELIVERY";

  const order = await prisma.order.create({
    data: {
      orderNumber,
      restaurantId: restaurant.id,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      deliveryAddress: input.deliveryAddress,
      deliveryArea: input.deliveryArea,
      deliveryCity: input.deliveryCity,
      subtotal,
      deliveryFee,
      taxAmount,
      discountAmount: 0,
      total,
      notes: input.notes,
      paymentMethod: method as any,
      paymentStatus: method === "CASH_ON_DELIVERY" ? "PENDING" : "COMPLETED",
      estimatedDeliveryAt: new Date(Date.now() + restaurant.estimatedDeliveryMax * 60000),
      items: { create: itemRows },
      payment: {
        create: {
          amount: total,
          method: method as any,
          status: method === "CASH_ON_DELIVERY" ? "PENDING" : "COMPLETED",
          completedAt: method === "CASH_ON_DELIVERY" ? undefined : new Date(),
        },
      },
    },
    include: { items: true, payment: true },
  });

  await prisma.menuItem.updateMany({
    where: { id: { in: itemRows.map((item) => item.menuItemId) } },
    data: { totalOrdered: { increment: 1 } },
  });

  return mapOrder(order);
}

export async function getDashboardOverview(slug = DEFAULT_RESTAURANT_SLUG) {
  const [orders, menu] = await Promise.all([getRestaurantOrders(slug), getRestaurantMenu(slug)]);
  const todayOrders = orders.filter((order) => order.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10));
  const activeOrders = orders.filter((order) => ["pending", "preparing", "ready"].includes(order.status));
  const revenueToday = todayOrders.reduce((sum, order) => sum + order.total, 0);
  const deliveredOrders = orders.filter((order) => order.status === "delivered");
  const avgOrderValue = orders.length ? Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length) : 0;

  return {
    restaurant: menu?.restaurant ?? null,
    stats: {
      todayOrders: todayOrders.length,
      revenueToday,
      pendingOrders: activeOrders.length,
      avgOrderValue,
      deliveredOrders: deliveredOrders.length,
    },
    liveOrders: activeOrders.slice(0, 5),
    bestsellers: (menu?.items ?? []).filter((item) => item.isBestseller).slice(0, 5),
  };
}