import { z } from "zod";
import { fail, ok, parseJson } from "@/lib/api-utils";
import { mapOrder } from "@/lib/backend";
import { prisma } from "@/lib/prisma";

const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]).optional(),
  paymentStatus: z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED", "REFUNDED", "CANCELLED"]).optional(),
  cancelReason: z.string().optional(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findFirst({
    where: { OR: [{ id }, { orderNumber: id }] },
    include: { items: true, payment: true },
  });
  if (!order) return fail("Order not found", 404);
  return ok(mapOrder(order));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = await parseJson(request, updateOrderSchema);
  if (parsed.error) return fail("Invalid order update", 422, parsed.error);
  const now = new Date();

  const statusDates =
    parsed.data.status === "CONFIRMED"
      ? { confirmedAt: now }
      : parsed.data.status === "READY"
        ? { readyAt: now }
        : parsed.data.status === "OUT_FOR_DELIVERY"
          ? { dispatchedAt: now }
          : parsed.data.status === "DELIVERED"
            ? { deliveredAt: now }
            : parsed.data.status === "CANCELLED"
              ? { cancelledAt: now }
              : {};

  try {
    const order = await prisma.order.update({
      where: { id },
      data: { ...parsed.data, ...statusDates },
      include: { items: true, payment: true },
    });
    return ok(mapOrder(order));
  } catch {
    return fail("Order not found", 404);
  }
}