"use client";

import { AdminTopbar } from "@/components/dashboard/admin-sidebar";
import { 
  PLATFORM_STATS, 
  RESTAURANTS, 
  MONTHLY_REVENUE, 
  PLATFORM_ACTIVITY,
  PRICING_PLANS
} from "@/lib/dummy-data";
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
  UserPlus
} from "lucide-react";
import Link from "next/link";
import { PlanBadge, RestaurantStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminOverviewPage() {
  const recentRestaurants = RESTAURANTS.slice(0, 5);

  const mrrData = [
    { label: "Starter", count: 30, price: 999, total: 29970 },
    { label: "Pro", count: 10, price: 2499, total: 24990 },
    { label: "Enterprise", count: 2, price: "custom", total: 15000 },
  ];
  const totalMRR = 69960;

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <AdminTopbar title="Platform Overview" subtitle="April 2026" />
      
      <main className="px-6 py-6 space-y-6">
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard 
            label="Active Restaurants" 
            value={PLATFORM_STATS.activeRestaurants} 
            change="↑3 this month"
            icon={<Store className="w-5 h-5 text-emerald-600" />}
            iconBg="bg-emerald-50"
          />
          <StatCard 
            label="Platform Revenue (April)" 
            value={formatCurrency(PLATFORM_STATS.platformRevenueMonth)} 
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
            iconBg="bg-blue-50"
          />
          <StatCard 
            label="Total Orders Today" 
            value={PLATFORM_STATS.totalOrdersToday} 
            change="↑8%"
            icon={<ArrowUpRight className="w-5 h-5 text-amber-600" />}
            iconBg="bg-amber-50"
          />
          <StatCard 
            label="New Signups (month)" 
            value={PLATFORM_STATS.newSignupsMonth} 
            icon={<Users className="w-5 h-5 text-purple-600" />}
            iconBg="bg-purple-50"
          />
          <StatCard 
            label="Churn" 
            value={`${PLATFORM_STATS.churnMonth} restaurant`} 
            icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
            iconBg="bg-red-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* MRR Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
            <h3 className="font-bold text-slate-900 mb-4">MRR Breakdown</h3>
            <div className="space-y-4 flex-1">
              {mrrData.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-xs text-slate-500">
                      {item.count} × {typeof item.price === 'number' ? formatCurrency(item.price) : item.price}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-900">Total MRR</span>
              <span className="text-xl font-black text-[#0A7A5A]">{formatCurrency(totalMRR)}</span>
            </div>
          </div>

          {/* Platform Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Platform Revenue — Last 6 Months</h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_REVENUE}>
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
          {/* Recent Restaurants */}
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
                    <th className="px-6 py-3 border-b border-slate-100">Revenue</th>
                    <th className="px-6 py-3 border-b border-slate-100">Status</th>
                    <th className="px-6 py-3 border-b border-slate-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentRestaurants.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{res.name}</td>
                      <td className="px-6 py-4 text-slate-600">{res.city}</td>
                      <td className="px-6 py-4">
                        <PlanBadge plan={res.plan} />
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-medium">{formatCurrency(res.monthlyRevenue)}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Activity Feed</h3>
            <div className="space-y-6">
              {PLATFORM_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className={cn(
                    "w-9 h-9 rounded-full shrink-0 flex items-center justify-center",
                    activity.type === 'upgrade' ? "bg-green-50 text-green-600" :
                    activity.type === 'signup' ? "bg-blue-50 text-blue-600" :
                    activity.type === 'payment' ? "bg-emerald-50 text-emerald-600" :
                    "bg-amber-50 text-amber-600"
                  )}>
                    {renderActivityIcon(activity.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{activity.message}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{timeAgo(activity.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        "flex items-center gap-3 p-4 rounded-xl border transition-all",
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

function renderActivityIcon(iconName: string) {
  switch (iconName) {
    case 'trending-up': return <TrendingUp className="w-4.5 h-4.5" />;
    case 'user-plus': return <UserPlus className="w-4.5 h-4.5" />;
    case 'credit-card': return <CreditCard className="w-4.5 h-4.5" />;
    case 'alert-triangle': return <AlertTriangle className="w-4.5 h-4.5" />;
    default: return <PlusCircle className="w-4.5 h-4.5" />;
  }
}
