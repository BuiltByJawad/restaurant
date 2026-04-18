"use client";

import { useEffect, useState } from "react";
import { AdminTopbar } from "@/components/dashboard/admin-sidebar";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  CreditCard, 
  TrendingUp, 
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default function AdminSubscriptionsPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [subStats, setSubStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/restaurants").then((r) => r.json()),
      fetch("/api/admin/overview").then((r) => r.json()),
    ]).then(([resJson, overviewJson]) => {
      setRestaurants(resJson.data ?? []);
      setSubStats(overviewJson.data?.subscriptions ?? []);
    }).finally(() => setLoading(false));
  }, []);

  const mrr = subStats.reduce((sum: number, s: any) => sum + (s._sum?.amount ?? 0), 0);
  const arr = mrr * 12;

  const PLAN_COLORS: Record<string, string> = {
    STARTER: "#94a3b8",
    PRO: "#0A7A5A",
    ENTERPRISE: "#F59E0B",
  };

  const pieData = subStats.map((s: any) => ({
    name: s.planId ? s.planId.charAt(0) + s.planId.slice(1).toLowerCase() : "Unknown",
    value: s._count?.planId ?? 0,
    color: PLAN_COLORS[s.planId] ?? "#cbd5e1",
  }));

  const upcomingRenewals = restaurants.slice(0, 3).map((r: any) => ({
    name: r.name,
    plan: r.plan,
    amount: r.plan === "enterprise" ? 0 : r.plan === "pro" ? 2499 : 999,
    date: new Date(Date.now() + Math.random() * 7 * 24 * 3600000).toISOString(),
  }));

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <AdminTopbar title="Subscriptions" subtitle="Manage plans, billing, and subscription status" />
      
      <main className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RevenueCard 
            label="Monthly Recurring Revenue (MRR)" 
            value={formatCurrency(mrr)} 
            change={loading ? "..." : undefined}
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
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-slate-400" /> Plan Distribution
            </h3>
            {pieData.length > 0 ? (
              <>
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
                        {pieData.map((entry: any, index: number) => (
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
                  {pieData.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{item.name}</span>
                      <span className="font-bold text-slate-900">{item.value} restaurants</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">
                No subscription data available yet
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" /> Upcoming Renewals (Next 7 Days)
            </h3>
            {loading ? (
              <div className="py-8 text-center text-slate-400 text-sm">Loading...</div>
            ) : upcomingRenewals.length > 0 ? (
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
                      <p className="font-bold text-slate-900">{renewal.amount > 0 ? formatCurrency(renewal.amount) : "Custom"}</p>
                      <button className="text-[11px] font-semibold text-[#0A7A5A] hover:underline">View Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">No upcoming renewals</div>
            )}
            <Button variant="outline" className="w-full mt-6 border-slate-200 text-slate-600 hover:bg-slate-50">
              View Renewal Calendar <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

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
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-slate-400">Loading subscriptions...</td>
                  </tr>
                ) : restaurants.length > 0 ? restaurants.map((res) => {
                  const amount = res.plan === 'enterprise' ? 0 : res.plan === 'pro' ? 2499 : 999;
                  return (
                    <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{res.name}</td>
                      <td className="px-6 py-4">
                        <PlanBadge plan={res.plan} />
                      </td>
                      <td className="px-6 py-4">
                        <RestaurantStatusBadge status={res.status} />
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{amount > 0 ? formatCurrency(amount) : "Custom"}</td>
                      <td className="px-6 py-4 text-slate-600">{formatDate(new Date(Date.now() + 30 * 24 * 3600000).toISOString())}</td>
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
                }) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-slate-400">No subscriptions yet</td>
                  </tr>
                )}
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
          <span className="text-[10px] font-bold text-emerald-600">{change}</span>
        )}
      </div>
      <p className="text-[11px] font-medium text-slate-500 mb-1 leading-none">{label}</p>
      <p className="text-lg font-black text-slate-900">{value}</p>
    </div>
  );
}
