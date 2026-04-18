"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  restaurantSlug: string | null;
  setAuth: (token: string, user: AuthUser, restaurantSlug: string | null) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      restaurantSlug: null,
      setAuth: (token, user, restaurantSlug) => set({ token, user, restaurantSlug }),
      clearAuth: () => set({ token: null, user: null, restaurantSlug: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "foodflow-auth",
      skipHydration: true,
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        restaurantSlug: state.restaurantSlug,
      }),
    }
  )
);

export function useAuthHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    if (!useAuthStore.persist) {
      setHasHydrated(true);
      return;
    }
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    if (!useAuthStore.persist.hasHydrated()) {
      useAuthStore.persist.rehydrate();
    } else {
      setHasHydrated(true);
    }
    return unsubscribe;
  }, []);

  return hasHydrated;
}

export const DEFAULT_SLUG = "dhaka-biryani-house";
