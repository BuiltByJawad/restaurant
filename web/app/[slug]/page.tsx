import { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESTAURANTS, MENU_ITEMS, MENU_CATEGORIES } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Star, Clock, ShoppingBag, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CategoryTabs } from "@/components/customer/category-tabs";
import { MenuItemCard, FloatingCartBar } from "@/components/customer/storefront-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);
  if (!restaurant) return { title: "Restaurant Not Found" };

  return {
    title: `${restaurant.name} | FoodFlow`,
    description: restaurant.description,
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = RESTAURANTS.find((r) => r.slug === slug);

  if (!restaurant) {
    notFound();
  }

  const categories = MENU_CATEGORIES.filter((c) => c.restaurantId === restaurant.id).sort((a, b) => a.order - b.order);
  const items = MENU_ITEMS.filter((i) => i.restaurantId === restaurant.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Restaurant Header Banner */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-[#0A7A5A] to-[#064E3B] flex items-end">
        <div className="container mx-auto px-4 pb-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={restaurant.isOpen ? "green-solid" : "secondary"} className="uppercase tracking-wider">
                  {restaurant.isOpen ? "Open Now" : "Closed"}
                </Badge>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{restaurant.rating}</span>
                  <span className="text-white/70 font-normal">({restaurant.reviewCount}+ reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90 text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Min. Order {formatCurrency(restaurant.minimumOrder)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{restaurant.area}, {restaurant.city}</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
               {/* Could add restaurant logo here if available */}
            </div>
          </div>
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Sticky Category Tabs */}
      <CategoryTabs categories={categories} />

      {/* Menu Sections */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((category) => {
            const categoryItems = items.filter((item) => item.categoryId === category.id);
            if (categoryItems.length === 0) return null;

            return (
              <section key={category.id} id={`category-${category.id}`} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.emoji}</span>
                  <h2 className="text-2xl font-bold text-slate-900">{category.name}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} restaurant={restaurant} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Bar */}
      <FloatingCartBar restaurantSlug={restaurant.slug} />
    </div>
  );
}
