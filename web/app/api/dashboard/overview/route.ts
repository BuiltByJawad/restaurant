import { DEFAULT_RESTAURANT_SLUG, getDashboardOverview } from "@/lib/backend";
import { ok } from "@/lib/api-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("restaurantSlug") ?? DEFAULT_RESTAURANT_SLUG;
  return ok(await getDashboardOverview(slug));
}