"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, MenuSquare, Users,
  BarChart3, Settings, UtensilsCrossed, LogOut,
  ChevronRight, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag, badge: 3 },
  { href: "/dashboard/menu", label: "Menu", icon: MenuSquare },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  restaurantName?: string;
  ownerName?: string;
  plan?: string;
}

export function DashboardSidebar({
  restaurantName = "Dhaka Biryani House",
  ownerName = "Mohammad Rahim",
  plan = "pro",
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 flex flex-col z-30">
      <div className="px-5 py-5 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-sm mb-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0A7A5A]">
            <UtensilsCrossed className="w-3.5 h-3.5 text-white" />
          </span>
          FoodFlow
        </Link>
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0A7A5A] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {restaurantName.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{restaurantName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn(
                "inline-flex items-center rounded-full px-1.5 py-0 text-[10px] font-semibold",
                plan === "pro" && "bg-[#0A7A5A]/20 text-[#4ade80]",
                plan === "starter" && "bg-slate-700 text-slate-400",
                plan === "enterprise" && "bg-amber-900/30 text-amber-400",
              )}>
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </span>
              <Link href="/" className="text-slate-500 hover:text-white text-[10px] transition-colors">
                View store →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                active
                  ? "bg-[#0A7A5A] text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  active ? "bg-white/20 text-white" : "bg-red-500 text-white"
                )}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-semibold shrink-0">
            {ownerName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{ownerName}</p>
            <p className="text-slate-500 text-[10px]">Restaurant Owner</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  );
}

export function DashboardTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <Link href="/dhaka-biryani-house" target="_blank" className="hidden sm:flex items-center gap-1.5 text-sm text-[#0A7A5A] font-medium hover:text-[#0f6048] transition-colors">
          View store <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
