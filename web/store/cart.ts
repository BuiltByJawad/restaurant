import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/lib/dummy-data";

export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
};

type CartState = {
  restaurantId: string | null;
  restaurantSlug: string | null;
  restaurantName: string | null;
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: MenuItem, restaurantId: string, restaurantSlug: string, restaurantName: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  subtotal: () => number;
  totalItems: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      restaurantSlug: null,
      restaurantName: null,
      items: [],
      isOpen: false,

      addItem: (menuItem, restaurantId, restaurantSlug, restaurantName) => {
        const state = get();

        if (state.restaurantId && state.restaurantId !== restaurantId) {
          const confirmed = window.confirm(
            "Your cart has items from another restaurant. Clear cart and add this item?"
          );
          if (!confirmed) return;
          set({ items: [], restaurantId, restaurantSlug, restaurantName });
        }

        const existing = state.items.find((i) => i.menuItem.id === menuItem.id);

        if (existing) {
          set({
            items: state.items.map((i) =>
              i.menuItem.id === menuItem.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            restaurantId,
            restaurantSlug,
            restaurantName,
          });
        } else {
          set({
            items: [...state.items, { menuItem, quantity: 1 }],
            restaurantId,
            restaurantSlug,
            restaurantName,
          });
        }
      },

      removeItem: (menuItemId) => {
        const items = get().items.filter((i) => i.menuItem.id !== menuItemId);
        set({
          items,
          ...(items.length === 0 && {
            restaurantId: null,
            restaurantSlug: null,
            restaurantName: null,
          }),
        });
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItem.id === menuItemId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () =>
        set({ items: [], restaurantId: null, restaurantSlug: null, restaurantName: null }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "foodflow-cart",
      partialize: (state) => ({
        restaurantId: state.restaurantId,
        restaurantSlug: state.restaurantSlug,
        restaurantName: state.restaurantName,
        items: state.items,
      }),
    }
  )
);
