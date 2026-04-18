"use client";

import { 
  BarChart3, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Calendar,
  Download,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
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
  PieChart,
  Pie
} from "recharts";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { 
  MONTHLY_REVENUE, 
  WEEKLY_REVENUE,
  MENU_ITEMS 
} from "@/lib/dummy-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const TOP_ITEMS = [
  { name: "Beef Kacchi Biryani", sold: 482, revenue: 183160, growth: "+12%" },
  { name: "Chicken Tikka", sold: 345, revenue: 110400, growth: "+8%" },
  { name: "Mango Lassi", sold: 298, revenue: 25330, growth: "+15%" },
  { name: "Butter Naan", sold: 256, revenue: 10240, growth: "-2%" },
  { name: "Chicken Bhuna", sold: 184, revenue: 44160, growth: "+5%" },
];

const HOURLY_DATA = [
  { hour: "11am", orders: 12 },
  { hour: "12pm", orders: 45 },
  { hour: "1pm", orders: 58 },
  { hour: "2pm", orders: 32 },
  { hour: "3pm", orders: 15 },
  { hour: "4pm", orders: 18 },
  { hour: "5pm", orders: 28 },
  { hour: "6pm", orders: 62 },
  { hour: "7pm", orders: 84 },
  { hour: "8pm", orders: 95 },
  { hour: "9pm", orders: 78 },
  { hour: "10pm", orders: 42 },
];

export default function AnalyticsPage() {
  const metrics = [
    {
      label: "Total Revenue",
      value: "৳4,82,500",
      change: "+15.4%",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      label: "Total Orders",
      value: "1,482",
      change: "+12.2%",
      isPositive: true,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600"
    },
    {
      label: "Avg Order Value",
      value: "৳325",
      change: "-2.4%",
      isPositive: false,
      icon: BarChart3,
      color: "bg-amber-50 text-amber-600"
    },
    {
      label: "Return Customers",
      value: "38.5%",
      change: "+4.1%",
      isPositive: true,
      icon: Users,
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar 
        title="Analytics" 
        subtitle="Revenue and order insights for your restaurant" 
      />

      <main className="px-6 py-6 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm w-fit">
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-[#0A7A5A] text-white shadow-sm transition-all">
              Last 7 days
            </button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all">
              Last 30 days
            </button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all">
              Last 90 days
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

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-2.5 rounded-xl`}>
                  <metric.icon size={22} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${metric.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
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
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Revenue Trends</h2>
                <p className="text-sm text-slate-500">Monthly breakdown for 2025</p>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(value) => `৳${value/1000}k`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-100 p-3 shadow-lg rounded-lg">
                            <p className="font-bold text-slate-900 text-sm mb-1">{label}</p>
                            <p className="text-sm text-emerald-600 font-bold">Revenue: {formatCurrency(payload[0].value as number)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#0A7A5A" 
                    radius={[6, 6, 0, 0]} 
                    barSize={45}
                  >
                    {MONTHLY_REVENUE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === MONTHLY_REVENUE.length - 1 ? '#0A7A5A' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Activity Line Chart */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Weekly Performance</h2>
                <p className="text-sm text-slate-500">Order volume over the last 7 days</p>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={WEEKLY_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-100 p-3 shadow-lg rounded-lg">
                            <p className="font-bold text-slate-900 text-sm mb-1">{label}</p>
                            <p className="text-sm text-blue-600 font-bold">Orders: {payload[0].value}</p>
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
                    dot={{ fill: '#0A7A5A', strokeWidth: 2, r: 4, stroke: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Menu Items */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-50">
              <h2 className="font-bold text-slate-900">Top Performing Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="px-6 py-3 font-bold">Menu Item</th>
                    <th className="px-6 py-3 font-bold text-center">Qty Sold</th>
                    <th className="px-6 py-3 font-bold text-right">Revenue</th>
                    <th className="px-6 py-3 font-bold text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TOP_ITEMS.map((item, i) => (
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
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "text-xs font-bold px-2 py-0.5 rounded-full",
                          item.growth.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>
                          {item.growth}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hourly Distribution */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <h2 className="font-bold text-slate-900 mb-6">Peak Ordering Hours</h2>
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={HOURLY_DATA}>
                  <XAxis 
                    dataKey="hour" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white border border-slate-100 p-2 shadow-lg rounded-lg">
                            <p className="text-xs font-bold text-slate-900">{label}: {payload[0].value} orders</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="orders" fill="#e2e8f0" radius={[2, 2, 0, 0]}>
                    {HOURLY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.orders > 70 ? '#0A7A5A' : '#cbd5e1'} />
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
      </main>
    </div>
  );
}
