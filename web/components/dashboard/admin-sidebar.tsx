"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Store, CreditCard, BarChart3,
  Settings, UtensilsCrossed, LogOut, Users, Bell, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/restaurants", label: "Restaurants", icon: Store },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-950 flex flex-col z-30">
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5 text-white font-bold mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A7A5A]">
            <UtensilsCrossed className="w-4 h-4 text-white" />
          </span>
          <span>FoodFlow</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold mt-1">
          <Shield className="w-3 h-3" />
          SUPER ADMIN
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-[#0A7A5A] text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#0A7A5A] flex items-center justify-center text-white text-xs font-bold shrink-0">SA</div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium">Super Admin</p>
            <p className="text-slate-500 text-[10px]">admin@foodflow.com.bd</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}

export function AdminTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </header>
  );
}
