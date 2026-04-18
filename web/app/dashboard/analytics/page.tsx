"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Users,
  Calendar,
  Download,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore, useAuthHasHydrated, DEFAULT_SLUG } from "@/store/auth";

export default function AnalyticsPage() {
  const hydrated = useAuthHasHydrated();
  const restaurantSlug = useAuthStore((s) => s.restaurantSlug) ?? DEFAULT_SLUG;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    fetch(`/api/dashboard/analytics?restaurantSlug=${restaurantSlug}`)
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .finally(() => setLoading(false));
  }, [hydrated, restaurantSlug]);

  const metrics = data
    ? [
        {
          label: "Total Revenue (30d)",
          value: formatCurrency(data.stats.totalRevenue),
          change: `${data.stats.revenueGrowth >= 0 ? "+" : ""}${data.stats.revenueGrowth}%`,
          isPositive: data.stats.revenueGrowth >= 0,
          icon: TrendingUp,
          color: "bg-emerald-50 text-emerald-600",
        },
        {
          label: "Total Orders (30d)",
          value: data.stats.totalOrders.toLocaleString(),
          change: "Last 30 days",
          isPositive: true,
          icon: ShoppingBag,
          color: "bg-blue-50 text-blue-600",
        },
        {
          label: "Avg Order Value",
          value: formatCurrency(data.stats.avgOrderValue),
          change: "Per order",
          isPositive: true,
          icon: BarChart3,
          color: "bg-amber-50 text-amber-600",
        },
        {
          label: "Menu Items Tracked",
          value: (data.topItems?.length ?? 0).toString(),
          change: "In analytics",
          isPositive: true,
          icon: Users,
          color: "bg-purple-50 text-purple-600",
        },
      ]
    : [];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar title="Analytics" subtitle="Revenue and order insights for your restaurant" />

      <main className="px-6 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm w-fit">
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-[#0A7A5A] text-white shadow-sm transition-all">
              Last 30 days
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 text-slate-600 gap-2 bg-white">
              <Calendar size={18} />
              <span>Custom Range</span>
              <ChevronDown size={14} />
            </Button>
            <Button variant="outline" className="border-slate-200 text-slate-600 gap-2 bg-white">
              <Download size={18} /> Export
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm animate-pulse h-28" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${metric.color} p-2.5 rounded-xl`}>
                      <metric.icon size={22} />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-bold ${
                        metric.isPositive ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {metric.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {metric.change}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{metric.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{metric.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900">Monthly Revenue Trends</h2>
                  <p className="text-sm text-slate-500">Last 6 months breakdown</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.monthly ?? []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        tickFormatter={(value) => `৳${value / 1000}k`}
                      />
                      <Tooltip
                        cursor={{ fill: "#f8fafc" }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white border border-slate-100 p-3 shadow-lg rounded-lg">
                                <p className="font-bold text-slate-900 text-sm mb-1">{label}</p>
                                <p className="text-sm text-emerald-600 font-bold">
                                  Revenue: {formatCurrency(payload[0].value as number)}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="revenue" fill="#0A7A5A" radius={[6, 6, 0, 0]} barSize={45}>
                        {(data?.monthly ?? []).map((_: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index === (data?.monthly?.length ?? 0) - 1 ? "#0A7A5A" : "#e2e8f0"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900">Weekly Performance</h2>
                  <p className="text-sm text-slate-500">Order volume over last 7 days</p>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data?.weekly ?? []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748b" }}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white border border-slate-100 p-3 shadow-lg rounded-lg">
                                <p className="font-bold text-slate-900 text-sm mb-1">{label}</p>
                                <p className="text-sm text-blue-600 font-bold">Orders: {payload[0].value}</p>
                                <p className="text-sm text-emerald-600 font-bold">
                                  Revenue: {formatCurrency((payload[0].payload as any).revenue)}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#0A7A5A"
                        strokeWidth={3}
                        dot={{ fill: "#0A7A5A", strokeWidth: 2, r: 4, stroke: "#fff" }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-50">
                  <h2 className="font-bold text-slate-900">Top Performing Items</h2>
                </div>
                {data?.topItems?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-50/50">
                          <th className="px-6 py-3 font-bold">Menu Item</th>
                          <th className="px-6 py-3 font-bold text-center">Qty Sold</th>
                          <th className="px-6 py-3 font-bold text-right">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {data.topItems.map((item: any, i: number) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm text-slate-600 font-medium">{item.sold}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-bold text-slate-900">{formatCurrency(item.revenue)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400 text-sm">
                    No order data yet. Items will appear here as orders come in.
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col">
                <h2 className="font-bold text-slate-900 mb-6">Peak Ordering Hours</h2>
                <div className="flex-1 min-h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.hourly ?? []}>
                      <XAxis
                        dataKey="hour"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                      />
                      <Tooltip
                        cursor={{ fill: "#f8fafc" }}
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white border border-slate-100 p-2 shadow-lg rounded-lg">
                                <p className="text-xs font-bold text-slate-900">
                                  {label}: {payload[0].value} orders
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="orders" fill="#e2e8f0" radius={[2, 2, 0, 0]}>
                        {(data?.hourly ?? []).map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.orders > Math.max(...(data?.hourly?.map((h: any) => h.orders) ?? [0])) * 0.7 ? "#0A7A5A" : "#cbd5e1"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Morning</span>
                    <span>Lunch</span>
                    <span>Evening</span>
                    <span>Dinner</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
