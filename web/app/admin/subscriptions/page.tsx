"use client";

import { AdminTopbar } from "@/components/dashboard/admin-sidebar";
import { RESTAURANTS, PRICING_PLANS } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  AlertCircle,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ChevronRight,
  Download,
  MoreVertical,
  Calendar
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from "recharts";
import { PlanBadge, RestaurantStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminSubscriptionsPage() {
  const mrr = 69960;
  const arr = mrr * 12;

  const pieData = [
    { name: "Starter", value: 30, color: "#94a3b8" },
    { name: "Pro", value: 10, color: "#0A7A5A" },
    { name: "Enterprise", value: 2, color: "#F59E0B" },
  ];

  const upcomingRenewals = [
    { name: "Dhaka Biryani House", date: "2026-04-15", amount: 2499, plan: "pro" },
    { name: "Sylhet Spice Garden", date: "2026-04-18", amount: 15000, plan: "enterprise" },
    { name: "Chittagong Sea Kitchen", date: "2026-04-20", amount: 999, plan: "starter" },
  ];

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <AdminTopbar title="Subscriptions" subtitle="Manage plans, billing, and subscription status" />
      
      <main className="px-6 py-6 space-y-6">
        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RevenueCard 
            label="Monthly Recurring Revenue (MRR)" 
            value={formatCurrency(mrr)} 
            change="+12% from last month"
            icon={<CreditCard className="w-5 h-5 text-emerald-600" />}
            iconBg="bg-emerald-50"
          />
          <RevenueCard 
            label="Annual Recurring Revenue (ARR)" 
            value={formatCurrency(arr)} 
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
            iconBg="bg-blue-50"
          />
          <RevenueCard 
            label="MRR Growth" 
            value="+18%" 
            icon={<ArrowUpRight className="w-5 h-5 text-amber-600" />}
            iconBg="bg-amber-50"
          />
          <RevenueCard 
            label="Churn Rate" 
            value="2.1%" 
            icon={<AlertCircle className="w-5 h-5 text-red-600" />}
            iconBg="bg-red-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Distribution Donut */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-slate-400" /> Plan Distribution
            </h3>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{item.name}</span>
                  <span className="font-bold text-slate-900">{item.value} restaurants</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Renewals */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Upcoming Renewals (Next 7 Days)
            </h3>
            <div className="space-y-4">
              {upcomingRenewals.map((renewal, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-[#0A7A5A]">
                      {renewal.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{renewal.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <PlanBadge plan={renewal.plan} />
                        <span className="text-[11px] text-slate-500">Next billing: {formatDate(renewal.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{formatCurrency(renewal.amount)}</p>
                    <button className="text-[11px] font-semibold text-[#0A7A5A] hover:underline">View Invoice</button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 border-slate-200 text-slate-600 hover:bg-slate-50">
              View Renewal Calendar <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Active Subscriptions</h3>
            <Button variant="outline" size="sm" className="h-9 border-slate-200 text-slate-600">
              <Download className="w-4 h-4 mr-2" /> Export List
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-100">Restaurant</th>
                  <th className="px-6 py-4 border-b border-slate-100">Plan</th>
                  <th className="px-6 py-4 border-b border-slate-100">Status</th>
                  <th className="px-6 py-4 border-b border-slate-100">Monthly Amount</th>
                  <th className="px-6 py-4 border-b border-slate-100">Next Billing</th>
                  <th className="px-6 py-4 border-b border-slate-100">Payment Method</th>
                  <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RESTAURANTS.map((res) => {
                  const plan = PRICING_PLANS.find(p => p.id === res.plan);
                  const amount = res.plan === 'enterprise' ? 15000 : (plan?.price || 0);
                  return (
                    <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{res.name}</td>
                      <td className="px-6 py-4">
                        <PlanBadge plan={res.plan} />
                      </td>
                      <td className="px-6 py-4">
                        <RestaurantStatusBadge status={res.status} />
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(amount)}</td>
                      <td className="px-6 py-4 text-slate-600">{formatDate("2026-05-12")}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <CreditCard className="w-3.5 h-3.5" /> Card •••• 4242
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="text-xs font-bold text-[#0A7A5A] hover:underline">Upgrade</button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function RevenueCard({ label, value, change, icon, iconBg }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconBg)}>
          {icon}
        </div>
        {change && (
          <span className="text-[10px] font-bold text-emerald-600">
            {change}
          </span>
        )}
      </div>
      <p className="text-[11px] font-medium text-slate-500 mb-1 leading-none">{label}</p>
      <p className="text-lg font-black text-slate-900">{value}</p>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
