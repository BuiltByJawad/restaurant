import { ok } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const subscriptions = await prisma.subscription.findMany({
    include: { restaurant: true, plan: true, payments: true },
    orderBy: { createdAt: "desc" },
  });

  return ok(
    subscriptions.map((subscription) => ({
      id: subscription.id,
      restaurantId: subscription.restaurantId,
      restaurantName: subscription.restaurant.name,
      planId: subscription.planId.toLowerCase(),
      status: subscription.status.toLowerCase(),
      interval: subscription.interval.toLowerCase(),
      amount: subscription.amount,
      currency: subscription.currency,
      currentPeriodEnd: subscription.currentPeriodEnd.toISOString(),
      payments: subscription.payments,
    })),
  );
}