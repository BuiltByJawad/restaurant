"use client";

import { useState } from "react";
import { 
  Search, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  UserPlus, 
  Download,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  X,
  History
} from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { CUSTOMERS, DASHBOARD_ORDERS } from "@/lib/dummy-data";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  const customerData = selectedCustomer ? CUSTOMERS.find(c => c.id === selectedCustomer) : null;
  const customerOrders = selectedCustomer ? DASHBOARD_ORDERS.filter(o => o.customerId === selectedCustomer) : [];

  const stats = [
    { label: "Total Customers", value: CUSTOMERS.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "New This Month", value: "24", icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Repeat Rate", value: "64%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Top Customer", value: "Rahim Sheikh", icon: ShoppingBag, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 relative overflow-hidden">
      <DashboardTopbar 
        title="Customers" 
        subtitle="Your customer base and ordering history" 
      />

      <main className="px-6 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search customers by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-slate-200 text-slate-600 gap-2 h-10">
                <Filter size={18} /> Sort by: Recent
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-600 h-10">
                <Download size={18} />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="px-6 py-3 font-bold">Customer Name</th>
                  <th className="px-6 py-3 font-bold">Phone Number</th>
                  <th className="px-6 py-3 font-bold text-center">Total Orders</th>
                  <th className="px-6 py-3 font-bold text-right">Total Spent</th>
                  <th className="px-6 py-3 font-bold">Last Order</th>
                  <th className="px-6 py-3 font-bold">Area</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCustomers.map((customer) => (
                  <tr 
                    key={customer.id} 
                    className={cn(
                      "hover:bg-slate-50/50 transition-colors cursor-pointer group",
                      selectedCustomer === customer.id && "bg-emerald-50/30"
                    )}
                    onClick={() => setSelectedCustomer(customer.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                          {getInitials(customer.name)}
                        </div>
                        <p className="font-bold text-slate-900 text-sm group-hover:text-[#0A7A5A] transition-colors">{customer.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{customer.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-slate-900 font-medium">{customer.totalOrders}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-slate-900">{formatCurrency(customer.totalSpent)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-500">{formatDate(customer.lastOrderDate)}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {customer.area}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Customer Detail Side Panel */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedCustomer(null)} />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Customer Profile</h2>
              <button onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Customer Info Card */}
              {customerData && (
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#0A7A5A] flex items-center justify-center text-white text-2xl font-black">
                      {getInitials(customerData.name)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{customerData.name}</h3>
                      <p className="text-sm text-[#0A7A5A] font-medium">Customer ID: {customerData.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone size={10} /> Phone
                      </p>
                      <p className="text-sm font-semibold text-slate-900">{customerData.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail size={10} /> Email
                      </p>
                      <p className="text-sm font-semibold text-slate-900">{customerData.email}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin size={10} /> Address
                      </p>
                      <p className="text-sm font-semibold text-slate-900">{customerData.address}, {customerData.area}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Engagement Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                  <p className="text-xs text-slate-500 font-medium mb-1">Total Orders</p>
                  <p className="text-2xl font-black text-[#0A7A5A]">{customerData?.totalOrders}</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                  <p className="text-xs text-slate-500 font-medium mb-1">Total Spent</p>
                  <p className="text-2xl font-black text-slate-900">{formatCurrency(customerData?.totalSpent || 0)}</p>
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <History size={18} className="text-[#0A7A5A]" /> Order History
                </h4>
                <div className="space-y-3">
                  {customerOrders.length > 0 ? (
                    customerOrders.map((order) => (
                      <div key={order.id} className="p-4 rounded-xl border border-slate-100 hover:border-emerald-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-sm text-slate-900">{order.orderNumber}</p>
                          <span className="text-xs font-bold text-[#0A7A5A]">{formatCurrency(order.total)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">{order.status}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-slate-400">
                      <p className="text-sm">No recent orders found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex gap-3">
              <Button className="flex-1 bg-[#0A7A5A] hover:bg-[#0f6048] text-white">
                Send Notification
              </Button>
              <Button variant="outline" className="flex-1 border-slate-200">
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
