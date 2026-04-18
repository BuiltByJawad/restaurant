"use client";

import { useCartHasHydrated, useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, ArrowRight } from "lucide-react";
import type { MenuItem, Restaurant } from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  item: MenuItem;
  restaurant: Restaurant;
}

export function MenuItemCard({ item, restaurant }: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const spiceDots = {
    none: 0,
    mild: 1,
    medium: 2,
    hot: 3,
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4 flex gap-4 hover:shadow-md transition-shadow group">
      <div className="relative h-24 w-24 shrink-0 bg-slate-50 rounded-lg flex items-center justify-center text-3xl">
        {item.emoji}
        {item.isBestseller && (
          <Badge variant="amber-solid" className="absolute -top-2 -left-2 text-[10px] px-1.5 py-0">
            Bestseller
          </Badge>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: spiceDots[item.spiceLevel] }).map((_, i) => (
                <span key={i} className="text-[10px]">🌶️</span>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-[#0A7A5A]">{formatCurrency(item.price)}</span>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => addItem(item, restaurant.id, restaurant.slug, restaurant.name)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FloatingCartBar({ restaurantSlug }: { restaurantSlug: string }) {
  const hasHydrated = useCartHasHydrated();
  const { items, subtotal, totalItems } = useCartStore();
  const count = totalItems();

  if (!hasHydrated || count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-50">
      <Link href={`/${restaurantSlug}/checkout`}>
        <div className="bg-[#0A7A5A] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center justify-between hover:bg-[#0f6048] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold">{count} items • {formatCurrency(subtotal())}</p>
              <p className="text-xs text-white/80">Plus delivery fee and tax</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-bold">
            View Cart
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
}
