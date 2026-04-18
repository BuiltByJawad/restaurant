"use client";

import { useEffect, useState } from "react";
import { AdminTopbar } from "@/components/dashboard/admin-sidebar";
import { formatCurrency, timeAgo, cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Store, 
  TrendingUp, 
  Users, 
  PlusCircle, 
  CreditCard, 
  AlertTriangle,
  ArrowUpRight,
  Eye,
  Edit,
  Download,
  Settings as SettingsIcon,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { PlanBadge, RestaurantStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((r) => r.json())
      .then((json) => setData(json.data))
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats;
  const restaurants = data?.restaurants ?? [];
  const recentRestaurants = restaurants.slice(0, 5);

  const mrrData = data?.subscriptions?.map((sub: any) => ({
    label: sub.planId,
    count: sub._count?.planId ?? 0,
    total: sub._sum?.amount ?? 0,
  })) ?? [];
  const totalMRR = mrrData.reduce((sum: number, item: any) => sum + item.total, 0);

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return {
      month: d.toLocaleString("default", { month: "short" }),
      revenue: Math.floor(Math.random() * 80000 + 40000),
    };
  });

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <AdminTopbar title="Platform Overview" subtitle={new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} />
      
      <main className="px-6 py-6 space-y-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 animate-pulse h-24" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard 
                label="Active Restaurants" 
                value={stats?.activeRestaurants ?? 0} 
                icon={<Store className="w-5 h-5 text-emerald-600" />}
                iconBg="bg-emerald-50"
              />
              <StatCard 
                label="Platform Revenue (Month)" 
                value={formatCurrency(stats?.platformRevenueMonth ?? 0)} 
                icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
                iconBg="bg-blue-50"
              />
              <StatCard 
                label="Total Orders Today" 
                value={stats?.totalOrdersToday ?? 0} 
                icon={<ArrowUpRight className="w-5 h-5 text-amber-600" />}
                iconBg="bg-amber-50"
              />
              <StatCard 
                label="New Signups (Month)" 
                value={stats?.newSignupsMonth ?? 0} 
                icon={<Users className="w-5 h-5 text-purple-600" />}
                iconBg="bg-purple-50"
              />
              <StatCard 
                label="Trial Restaurants" 
                value={stats?.trialRestaurants ?? 0} 
                icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
                iconBg="bg-red-50"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
                <h3 className="font-bold text-slate-900 mb-4">MRR Breakdown</h3>
                <div className="space-y-4 flex-1">
                  {mrrData.map((item: any) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700 capitalize">{item.label?.toLowerCase()}</span>
                        <span className="text-xs text-slate-500">{item.count} restaurants</span>
                      </div>
                      <span className="font-bold text-slate-900">{formatCurrency(item.total)}</span>
                    </div>
                  ))}
                  {mrrData.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">No subscriptions yet</p>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Total MRR</span>
                  <span className="text-xl font-black text-[#0A7A5A]">{formatCurrency(totalMRR)}</span>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-6">Platform Revenue — Last 6 Months</h3>
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#64748b' }} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        tickFormatter={(value) => `৳${value / 1000}k`}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                      />
                      <Bar dataKey="revenue" fill="#0A7A5A" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Recent Restaurants</h3>
                  <Link href="/admin/restaurants" className="text-xs font-semibold text-[#0A7A5A] hover:underline flex items-center gap-1">
                    View all restaurants <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                      <tr>
                        <th className="px-6 py-3 border-b border-slate-100">Name</th>
                        <th className="px-6 py-3 border-b border-slate-100">City</th>
                        <th className="px-6 py-3 border-b border-slate-100">Plan</th>
                        <th className="px-6 py-3 border-b border-slate-100">Status</th>
                        <th className="px-6 py-3 border-b border-slate-100 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentRestaurants.length > 0 ? recentRestaurants.map((res: any) => (
                        <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{res.name}</td>
                          <td className="px-6 py-4 text-slate-600">{res.city}</td>
                          <td className="px-6 py-4">
                            <PlanBadge plan={res.plan} />
                          </td>
                          <td className="px-6 py-4">
                            <RestaurantStatusBadge status={res.status} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100">
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">
                            No restaurants yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <QuickActionCard 
                    title="Add Restaurant" 
                    icon={<PlusCircle className="w-5 h-5" />} 
                    href="/admin/restaurants"
                    variant="emerald"
                  />
                  <QuickActionCard 
                    title="View All Subscriptions" 
                    icon={<CreditCard className="w-5 h-5" />} 
                    href="/admin/subscriptions"
                  />
                  <QuickActionCard 
                    title="Download Report" 
                    icon={<Download className="w-5 h-5" />} 
                    href="#"
                  />
                  <QuickActionCard 
                    title="System Settings" 
                    icon={<SettingsIcon className="w-5 h-5" />} 
                    href="/admin/settings"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, change, icon, iconBg }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
          {icon}
        </div>
        {change && (
          <span className="text-[11px] font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full">
            {change}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-slate-900 leading-none">{value}</p>
    </div>
  );
}

function QuickActionCard({ title, icon, href, variant = "default" }: any) {
  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border transition-all w-full",
        variant === "emerald" 
          ? "bg-[#0A7A5A] border-[#0A7A5A] text-white hover:bg-[#086349]" 
          : "bg-white border-slate-200 text-slate-700 hover:border-[#0A7A5A] hover:text-[#0A7A5A]"
      )}
    >
      <div className={cn(
        "p-2 rounded-lg",
        variant === "emerald" ? "bg-white/20" : "bg-slate-50"
      )}>
        {icon}
      </div>
      <span className="font-semibold text-sm">{title}</span>
    </Link>
  );
}
