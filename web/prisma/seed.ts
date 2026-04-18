import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  CUSTOMERS,
  DASHBOARD_ORDERS,
  MENU_CATEGORIES,
  MENU_ITEMS,
  PRICING_PLANS,
  RESTAURANTS,
} from "../lib/dummy-data";

const prisma = new PrismaClient();

const demoNow = new Date("2025-05-15T12:00:00.000Z");

const planMap: Record<string, "STARTER" | "PRO" | "ENTERPRISE"> = {
  starter: "STARTER",
  pro: "PRO",
  enterprise: "ENTERPRISE",
};

const statusMap: Record<string, any> = {
  active: "ACTIVE",
  trial: "TRIAL",
  suspended: "SUSPENDED",
};

const orderStatusMap: Record<string, any> = {
  pending: "PENDING",
  preparing: "PREPARING",
  ready: "READY",
  out_for_delivery: "OUT_FOR_DELIVERY",
  delivered: "DELIVERED",
  cancelled: "CANCELLED",
};

const paymentMethodMap: Record<string, any> = {
  sslcommerz: "SSLCOMMERZ_CARD",
  bkash: "BKASH",
  nagad: "NAGAD",
  rocket: "ROCKET",
  cod: "CASH_ON_DELIVERY",
};

const paymentStatusMap: Record<string, any> = {
  paid: "COMPLETED",
  pending: "PENDING",
  failed: "FAILED",
  refunded: "REFUNDED",
};

const spiceMap: Record<string, any> = {
  none: "NONE",
  mild: "MILD",
  medium: "MEDIUM",
  hot: "HOT",
};

async function main() {
  const passwordHash = await bcrypt.hash("foodflow123", 10);

  await prisma.orderItemOption.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItemOption.deleteMany();
  await prisma.menuItemOptionGroup.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.restaurantPaymentConfig.deleteMany();
  await prisma.subscriptionPayment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.restaurantHours.deleteMany();
  await prisma.deliveryZone.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.customerAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.subscriptionPlan.deleteMany();

  for (const plan of PRICING_PLANS) {
    await prisma.subscriptionPlan.create({
      data: {
        id: planMap[plan.id],
        name: plan.name,
        description: plan.description,
        monthlyPrice: plan.price,
        yearlyPrice: plan.yearlyPrice,
        maxMenuItems: plan.id === "starter" ? 50 : plan.id === "pro" ? 250 : -1,
        maxAdminUsers: plan.id === "starter" ? 1 : plan.id === "pro" ? 5 : 20,
        hasCustomDomain: plan.id !== "starter",
        hasAdvancedAnalytics: plan.id !== "starter",
        hasApiAccess: plan.id === "enterprise",
        hasPrioritySupport: plan.id !== "starter",
        hasSlaGuarantee: plan.id === "enterprise",
        sortOrder: plan.id === "starter" ? 1 : plan.id === "pro" ? 2 : 3,
      },
    });
  }

  await prisma.user.create({
    data: {
      id: "admin-1",
      email: "admin@foodflow.com.bd",
      phone: "01900000000",
      passwordHash,
      fullName: "FoodFlow Super Admin",
      role: "SUPER_ADMIN",
      isEmailVerified: true,
      isPhoneVerified: true,
    },
  });

  for (const restaurant of RESTAURANTS) {
    await prisma.user.create({
      data: {
        id: restaurant.ownerId,
        email: `${restaurant.slug}@foodflow.com.bd`,
        phone: `018${restaurant.id.replace(/\D/g, "").padStart(8, "0").slice(0, 8)}`,
        passwordHash,
        fullName: restaurant.ownerName,
        role: "RESTAURANT_ADMIN",
        isEmailVerified: true,
        isPhoneVerified: true,
      },
    });

    await prisma.restaurant.create({
      data: {
        id: restaurant.id,
        slug: restaurant.slug,
        name: restaurant.name,
        description: restaurant.description,
        logoUrl: restaurant.logoImage,
        coverImageUrl: restaurant.coverImage,
        cuisineTypes: restaurant.cuisine,
        phone: restaurant.phone,
        email: `${restaurant.slug}@example.com`,
        address: restaurant.address,
        area: restaurant.area,
        city: restaurant.city,
        division: `${restaurant.city} Division`,
        minimumOrder: restaurant.minimumOrder,
        deliveryFee: restaurant.deliveryFee,
        estimatedDeliveryMin: Number.parseInt(restaurant.deliveryTime.split("-")[0]) || 25,
        estimatedDeliveryMax: Number.parseInt(restaurant.deliveryTime.split("-")[1]) || 45,
        isOpen: restaurant.isOpen,
        acceptsOrders: restaurant.status !== "suspended",
        averageRating: restaurant.rating,
        reviewCount: restaurant.reviewCount,
        status: statusMap[restaurant.status],
        isVerified: restaurant.status === "active",
        ownerId: restaurant.ownerId,
        subscription: {
          create: {
            planId: planMap[restaurant.plan],
            status: restaurant.status === "trial" ? "TRIALING" : "ACTIVE",
            interval: "MONTHLY",
            amount: PRICING_PLANS.find((plan) => plan.id === restaurant.plan)?.price ?? 999,
            currentPeriodStart: demoNow,
            currentPeriodEnd: new Date(demoNow.getTime() + 30 * 24 * 3600000),
            trialEnd: restaurant.status === "trial" ? new Date(demoNow.getTime() + 14 * 24 * 3600000) : null,
          },
        },
        paymentConfig: {
          create: {
            sslcommerzEnabled: true,
            bkashEnabled: true,
            nagadEnabled: true,
            rocketEnabled: true,
            codEnabled: true,
          },
        },
      },
    });
  }

  for (const category of MENU_CATEGORIES) {
    await prisma.menuCategory.create({
      data: {
        id: category.id,
        restaurantId: category.restaurantId,
        name: category.name,
        emoji: category.emoji,
        sortOrder: category.order,
        isActive: true,
      },
    });
  }

  for (const item of MENU_ITEMS) {
    await prisma.menuItem.create({
      data: {
        id: item.id,
        restaurantId: item.restaurantId,
        categoryId: item.categoryId,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.image,
        emoji: item.emoji,
        isAvailable: item.isAvailable,
        isBestseller: item.isBestseller,
        isVeg: item.isVeg,
        spiceLevel: spiceMap[item.spiceLevel],
        preparationTime: item.preparationTime,
        tags: item.tags,
        allergens: [],
      },
    });
  }

  for (const customer of CUSTOMERS) {
    await prisma.user.create({
      data: {
        id: customer.id,
        email: customer.email,
        phone: customer.phone.replace("-", ""),
        passwordHash,
        fullName: customer.name,
        role: "CUSTOMER",
        isEmailVerified: true,
        isPhoneVerified: true,
        addresses: {
          create: {
            label: "Home",
            fullAddress: customer.address,
            area: customer.area,
            city: "Dhaka",
            isDefault: true,
          },
        },
      },
    });
  }

  for (const order of DASHBOARD_ORDERS) {
    await prisma.order.create({
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        restaurantId: order.restaurantId,
        customerId: order.customerId,
        customerName: order.customerName,
        customerPhone: order.customerPhone.replace("-", ""),
        deliveryAddress: order.customerAddress,
        deliveryArea: order.customerAddress.split(",").at(-2)?.trim() ?? "Dhanmondi",
        deliveryCity: "Dhaka",
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        taxAmount: order.tax,
        discountAmount: order.discount,
        total: order.total,
        status: orderStatusMap[order.status],
        paymentMethod: paymentMethodMap[order.paymentMethod],
        paymentStatus: paymentStatusMap[order.paymentStatus],
        estimatedDeliveryAt: new Date(order.estimatedDelivery),
        createdAt: new Date(order.createdAt),
        items: {
          create: order.items.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            totalPrice: item.total,
          })),
        },
        payment: {
          create: {
            amount: order.total,
            method: paymentMethodMap[order.paymentMethod],
            status: paymentStatusMap[order.paymentStatus],
            completedAt: order.paymentStatus === "paid" ? new Date(order.createdAt) : null,
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });