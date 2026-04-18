"use client";

import { 
  ShoppingBag, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  ArrowUpRight,
  Plus,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { 
  WEEKLY_REVENUE, 
  DASHBOARD_ORDERS, 
  MENU_ITEMS 
} from "@/lib/dummy-data";
import { formatCurrency, formatTime } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const liveOrders = DASHBOARD_ORDERS.filter(order => 
    ["pending", "preparing", "ready"].includes(order.status)
  ).slice(0, 3);

  const bestsellers = MENU_ITEMS.filter(item => item.isBestseller).slice(0, 3);

  const stats = [
    {
      label: "Today's Orders",
      value: "34",
      change: "+12%",
      trend: "up",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Revenue Today",
      value: formatCurrency(8450),
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Pending Orders",
      value: "3",
      change: "Action needed",
      trend: "neutral",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      label: "Avg Order Value",
      value: formatCurrency(248),
      change: "+3%",
      trend: "up",
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar 
        title="Good morning, Rahim! 👋" 
        subtitle="Here's what's happening with your restaurant today." 
      />

      <main className="px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                  <stat.icon size={20} />
                </div>
                <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                  stat.trend === 'neutral' ? 'bg-amber-50 text-amber-600' : 
                  'bg-slate-50 text-slate-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Live Orders</h2>
              <Link href="/dashboard/orders" className="text-sm text-[#0A7A5A] font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-50">
                    <th className="px-5 py-3 font-semibold">Order#</th>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Items</th>
                    <th className="px-5 py-3 font-semibold">Total</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Time</th>
                    <th className="px-5 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {liveOrders.map((order) => (
                    <tr key={order.id} className="text-sm hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-900">{order.orderNumber}</td>
                      <td className="px-5 py-4 text-slate-600">{order.customerName}</td>
                      <td className="px-5 py-4 text-slate-600">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">{formatCurrency(order.total)}</td>
                      <td className="px-5 py-4">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-4 text-slate-500">{formatTime(order.createdAt)}</td>
                      <td className="px-5 py-4 text-right">
                        {order.status === 'pending' && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-3 text-xs">
                            Accept
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button size="sm" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 h-8 px-3 text-xs">
                            Mark Ready
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Items */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col">
            <div className="px-5 py-4 border-b border-slate-50">
              <h2 className="font-bold text-slate-900">Popular Items</h2>
            </div>
            <div className="p-5 space-y-4">
              {bestsellers.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-2xl border border-slate-100">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500">24 sold this week</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 text-sm">{formatCurrency(item.price * 24)}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Revenue</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs font-medium border-slate-200 text-slate-600" asChild>
                <Link href="/dashboard/menu">View Menu Analysis</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-slate-900">This Week's Revenue</h2>
                <p className="text-2xl font-bold text-slate-900 mt-1">{formatCurrency(WEEKLY_REVENUE.reduce((acc, curr) => acc + curr.revenue, 0))}</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#0A7A5A]"></span>
                  <span className="text-xs text-slate-500 font-medium">Revenue</span>
                </div>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                    tickFormatter={(value) => `৳${value/1000}k`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-100 p-3 shadow-lg rounded-lg">
                            <p className="font-bold text-slate-900 text-sm mb-1">{label}</p>
                            <p className="text-xs text-emerald-600 font-semibold">Revenue: {formatCurrency(payload[0].value as number)}</p>
                            <p className="text-xs text-slate-500">Orders: {payload[0].payload.orders}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#0A7A5A" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
              <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3">
                <Button className="w-full bg-[#0A7A5A] hover:bg-[#0f6048] text-white flex items-center justify-between px-4" asChild>
                  <Link href="/dashboard/menu?action=add">
                    <span className="flex items-center gap-2"><Plus size={18} /> Add Menu Item</span>
                    <ChevronRight size={16} />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-between px-4" asChild>
                  <Link href="/dashboard/orders">
                    <span className="flex items-center gap-2"><ShoppingBag size={18} /> View All Orders</span>
                    <ChevronRight size={16} />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full border-slate-200 text-[#0A7A5A] hover:bg-slate-50 flex items-center justify-between px-4" asChild>
                  <Link href="/dhaka-biryani-house" target="_blank">
                    <span className="flex items-center gap-2"><ExternalLink size={18} /> Share My Store</span>
                    <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-[#0A7A5A] rounded-xl p-5 text-white">
              <h3 className="font-bold mb-1 flex items-center gap-2">
                Grow your business <ArrowUpRight size={18} />
              </h3>
              <p className="text-xs text-emerald-100 mb-4">Upgrade to Pro to unlock advanced analytics and marketing tools.</p>
              <Button className="w-full bg-white text-[#0A7A5A] hover:bg-emerald-50 text-xs font-bold h-9">
                View Plans
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
