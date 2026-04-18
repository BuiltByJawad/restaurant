"use client";

import { useState } from "react";
import { AdminTopbar } from "@/components/dashboard/admin-sidebar";
import { RESTAURANTS, PLATFORM_STATS } from "@/lib/dummy-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  Store, 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  LayoutDashboard, 
  Edit, 
  Lock, 
  Unlock,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  MapPin
} from "lucide-react";
import { PlanBadge, RestaurantStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminRestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  const filteredRestaurants = RESTAURANTS.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         res.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || res.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPlan = planFilter === "All" || res.plan.toLowerCase() === planFilter.toLowerCase();
    const matchesCity = cityFilter === "All" || res.city === cityFilter;
    
    return matchesSearch && matchesStatus && matchesPlan && matchesCity;
  });

  return (
    <div className="flex-1 overflow-auto bg-slate-50">
      <AdminTopbar title="Restaurants" subtitle="Manage all restaurant tenants on the platform" />
      
      <main className="px-6 py-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard label="Total Restaurants" value={PLATFORM_STATS.totalRestaurants} icon={<Store className="w-5 h-5 text-slate-600" />} />
          <SummaryCard label="Active" value={PLATFORM_STATS.activeRestaurants} icon={<div className="w-2 h-2 rounded-full bg-emerald-500" />} />
          <SummaryCard label="Trial" value={PLATFORM_STATS.trialRestaurants} icon={<div className="w-2 h-2 rounded-full bg-amber-500" />} />
          <SummaryCard label="Suspended" value={0} icon={<div className="w-2 h-2 rounded-full bg-red-500" />} />
        </div>

        {/* Filters & Actions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search restaurants, owners..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20 focus:border-[#0A7A5A]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Suspended">Suspended</option>
            </select>

            <select 
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option value="All">All Plans</option>
              <option value="Starter">Starter</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            <select 
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <option value="All">All Cities</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
            </select>
          </div>

          <Button className="bg-[#0A7A5A] hover:bg-[#086349] text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Restaurant
          </Button>
        </div>

        {/* Restaurants Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-100">Restaurant</th>
                  <th className="px-6 py-4 border-b border-slate-100">Owner</th>
                  <th className="px-6 py-4 border-b border-slate-100">City</th>
                  <th className="px-6 py-4 border-b border-slate-100">Plan</th>
                  <th className="px-6 py-4 border-b border-slate-100">Monthly Revenue</th>
                  <th className="px-6 py-4 border-b border-slate-100">Total Orders</th>
                  <th className="px-6 py-4 border-b border-slate-100">Status</th>
                  <th className="px-6 py-4 border-b border-slate-100">Joined</th>
                  <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRestaurants.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{res.name}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {res.area}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{res.ownerName}</td>
                    <td className="px-6 py-4 text-slate-600">{res.city}</td>
                    <td className="px-6 py-4">
                      <PlanBadge plan={res.plan} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{formatCurrency(res.monthlyRevenue)}</td>
                    <td className="px-6 py-4 text-slate-600">{res.totalOrders.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <RestaurantStatusBadge status={res.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(res.joinedDate)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/${res.slug}`} 
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-[#0A7A5A] rounded-md hover:bg-[#0A7A5A]/5"
                          title="View Store"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link 
                          href="/dashboard" 
                          className="p-1.5 text-slate-400 hover:text-[#0A7A5A] rounded-md hover:bg-[#0A7A5A]/5"
                          title="Dashboard"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-1.5 text-slate-400 hover:text-slate-900 rounded-md hover:bg-slate-100"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className={cn(
                            "p-1.5 rounded-md",
                            res.status === 'suspended' 
                              ? "text-emerald-500 hover:bg-emerald-50" 
                              : "text-red-500 hover:bg-red-50"
                          )}
                          title={res.status === 'suspended' ? 'Activate' : 'Suspend'}
                        >
                          {res.status === 'suspended' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">{filteredRestaurants.length}</span> of <span className="font-medium text-slate-900">{RESTAURANTS.length}</span> restaurants
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3.5 py-1.5 border border-[#0A7A5A] bg-[#0A7A5A]/5 text-[#0A7A5A] rounded-lg text-sm font-semibold">1</button>
              <button className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">2</button>
              <button className="px-3.5 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">3</button>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-lg font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
