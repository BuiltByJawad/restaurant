"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  TrendingUp,
  Phone,
  MapPin,
  ShoppingBag,
  Star,
} from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore, useAuthHasHydrated, DEFAULT_SLUG } from "@/store/auth";

export default function CustomersPage() {
  const hydrated = useAuthHasHydrated();
  const restaurantSlug = useAuthStore((s) => s.restaurantSlug) ?? DEFAULT_SLUG;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"orders" | "spent" | "recent">("orders");

  useEffect(() => {
    if (!hydrated) return;
    fetch(`/api/dashboard/customers?restaurantSlug=${restaurantSlug}`)
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .finally(() => setLoading(false));
  }, [hydrated, restaurantSlug]);

  const customers = data?.customers ?? [];

  const filtered = customers
    .filter(
      (c: any) =>
        !searchTerm ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        (c.area ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (sortBy === "orders") return b.totalOrders - a.totalOrders;
      if (sortBy === "spent") return b.totalSpent - a.totalSpent;
      return new Date(b.lastOrderAt).getTime() - new Date(a.lastOrderAt).getTime();
    });

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar title="Customers" subtitle="Customer insights and order history" />

      <main className="px-6 py-6 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#0A7A5A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Total Customers", value: data?.total ?? 0, icon: Users, color: "bg-blue-50 text-blue-600" },
                { label: "New This Month", value: data?.newThisMonth ?? 0, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600" },
                { label: "Repeat Rate", value: `${data?.repeatRate ?? 0}%`, icon: Star, color: "bg-amber-50 text-amber-600" },
                { label: "Top Customer", value: data?.topCustomer?.name ?? "—", icon: Star, color: "bg-purple-50 text-purple-600" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                  <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 truncate">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name, phone, or area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
                  {(["orders", "spent", "recent"] as const).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                        sortBy === sort ? "bg-[#0A7A5A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {sort === "recent" ? "Recent" : sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-100">
                        <th className="px-5 py-3 font-bold">Customer</th>
                        <th className="px-5 py-3 font-bold">Contact</th>
                        <th className="px-5 py-3 font-bold text-center">Orders</th>
                        <th className="px-5 py-3 font-bold text-right">Total Spent</th>
                        <th className="px-5 py-3 font-bold text-right">Last Order</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filtered.map((customer: any) => (
                        <tr key={customer.phone} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#0A7A5A]/10 rounded-full flex items-center justify-center text-lg font-bold text-[#0A7A5A] shrink-0">
                                {customer.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm">{customer.name}</p>
                                {customer.area && (
                                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MapPin size={10} /> {customer.area}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-sm text-slate-600 flex items-center gap-1.5">
                              <Phone size={14} className="text-slate-400" />
                              {customer.phone}
                            </p>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <ShoppingBag size={14} className="text-slate-400" />
                              <span className="text-sm font-bold text-slate-900">{customer.totalOrders}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="font-bold text-slate-900 text-sm">{formatCurrency(customer.totalSpent)}</span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <span className="text-sm text-slate-500">{timeAgo(customer.lastOrderAt)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <Users size={40} className="text-slate-300 mb-3" />
                  <h3 className="text-lg font-bold text-slate-900">No customers found</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    {searchTerm ? "Try a different search term." : "Customers will appear as orders come in."}
                  </p>
                  {searchTerm && (
                    <Button variant="outline" className="mt-4 border-slate-200" onClick={() => setSearchTerm("")}>
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
