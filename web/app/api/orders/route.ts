import { z } from "zod";
import { createGuestOrder, getRestaurantOrders } from "@/lib/backend";
import { fail, ok, parseJson } from "@/lib/api-utils";

const createOrderSchema = z.object({
  restaurantSlug: z.string().min(1),
  customerName: z.string().min(2),
  customerPhone: z.string().min(8),
  customerEmail: z.string().email().optional().or(z.literal("")),
  deliveryAddress: z.string().min(5),
  deliveryArea: z.string().min(2),
  deliveryCity: z.string().default("Dhaka"),
  paymentMethod: z.enum(["sslcommerz", "bkash", "nagad", "rocket", "cod"]),
  notes: z.string().optional(),
  items: z.array(z.object({ menuItemId: z.string(), quantity: z.number().int().positive() })).min(1),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("restaurantSlug") ?? undefined;
  const orders = await getRestaurantOrders(slug);
  return ok(orders);
}

export async function POST(request: Request) {
  const parsed = await parseJson(request, createOrderSchema);
  if (parsed.error) return fail("Invalid order payload", 422, parsed.error);

  try {
    const order = await createGuestOrder(parsed.data);
    return ok(order, { status: 201 });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Could not create order", 400);
  }
}