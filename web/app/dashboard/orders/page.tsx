"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { formatCurrency, formatDateTime, timeAgo } from "@/lib/utils";
import { OrderStatusBadge, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore, useAuthHasHydrated, DEFAULT_SLUG } from "@/store/auth";
import { toast } from "sonner";

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "preparing", label: "Preparing" },
  { id: "ready", label: "Ready" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const NEXT_STATUS: Record<string, string> = {
  pending: "CONFIRMED",
  preparing: "READY",
  ready: "OUT_FOR_DELIVERY",
  out_for_delivery: "DELIVERED",
};

const NEXT_LABEL: Record<string, string> = {
  pending: "Accept",
  preparing: "Mark Ready",
  ready: "Out for Delivery",
  out_for_delivery: "Mark Delivered",
};

export default function OrdersPage() {
  const hydrated = useAuthHasHydrated();
  const restaurantSlug = useAuthStore((s) => s.restaurantSlug) ?? DEFAULT_SLUG;

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!hydrated) return;
    fetch(`/api/orders?restaurantSlug=${restaurantSlug}`)
      .then((r) => r.json())
      .then((json) => setOrders(json.data ?? []))
      .finally(() => setLoading(false));
  }, [hydrated, restaurantSlug]);

  const filtered = orders.filter((o) => {
    const matchesTab = activeTab === "all" || o.status === activeTab;
    const matchesSearch =
      !searchTerm ||
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  const tabCounts: Record<string, number> = {};
  for (const tab of STATUS_TABS) {
    if (tab.id !== "all") tabCounts[tab.id] = orders.filter((o) => o.status === tab.id).length;
  }

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? json.data : o)));
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateFromDropdown = async (orderId: string) => {
    const newStatus = selectedStatus[orderId];
    if (!newStatus) return;
    await updateStatus(orderId, newStatus);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar title="Orders" subtitle="Manage and track all incoming orders" />

      <main className="px-6 py-6 space-y-6">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                    activeTab === tab.id
                      ? "bg-[#0A7A5A] text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-50"
                  )}
                >
                  {tab.label}
                  {tab.id !== "all" && tabCounts[tab.id] > 0 && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                        activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {tabCounts[tab.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <Button variant="outline" className="h-10 border-slate-200 text-slate-600 gap-2">
              <Download size={16} /> Export
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search orders, customers, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20 focus:border-[#0A7A5A] transition-all"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none appearance-none">
                  <option>All time</option>
                  <option>Last 7 days</option>
                  <option>Today</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
              <Button variant="outline" className="h-10 border-slate-200 text-slate-600 px-3">
                <Filter size={18} />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 flex flex-col items-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-2 border-[#0A7A5A] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading orders...</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-slate-400 uppercase tracking-wider border-b border-slate-50">
                    <th className="px-5 py-4 font-semibold">Order Details</th>
                    <th className="px-5 py-4 font-semibold">Items</th>
                    <th className="px-5 py-4 font-semibold text-right">Total</th>
                    <th className="px-5 py-4 font-semibold">Payment</th>
                    <th className="px-5 py-4 font-semibold text-center">Status</th>
                    <th className="px-5 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((order) => (
                    <>
                      <tr
                        key={order.id}
                        className={cn(
                          "group transition-colors cursor-pointer",
                          expandedOrder === order.id ? "bg-emerald-50/30" : "hover:bg-slate-50/50"
                        )}
                        onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      >
                        <td className="px-5 py-4">
                          <p className="font-bold text-slate-900">{order.orderNumber}</p>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                            <span className="font-medium text-slate-700">{order.customerName}</span>
                            <span>•</span>
                            <span>{timeAgo(order.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-600 truncate max-w-[200px]">
                            {order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(", ")}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <p className="font-bold text-slate-900">{formatCurrency(order.total)}</p>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium uppercase text-slate-500">{order.paymentMethod}</span>
                            <span
                              className={cn(
                                "text-[10px] font-bold uppercase",
                                order.paymentStatus === "paid" ? "text-emerald-600" : "text-amber-600"
                              )}
                            >
                              {order.paymentStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                              <MoreHorizontal size={18} />
                            </Button>
                            {expandedOrder === order.id ? (
                              <ChevronUp size={18} className="text-slate-400" />
                            ) : (
                              <ChevronDown size={18} className="text-slate-400" />
                            )}
                          </div>
                        </td>
                      </tr>
                      {expandedOrder === order.id && (
                        <tr key={`${order.id}-expand`}>
                          <td colSpan={6} className="px-5 py-6 bg-slate-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Customer Info
                                  </h4>
                                  <p className="font-semibold text-slate-900">{order.customerName}</p>
                                  <p className="text-sm text-slate-600 flex items-center gap-1.5 mt-1">
                                    <Phone size={14} className="text-[#0A7A5A]" /> {order.customerPhone}
                                  </p>
                                  <p className="text-sm text-slate-600 mt-2">{order.customerAddress}</p>
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Order Timeline
                                  </h4>
                                  <div className="space-y-3">
                                    <div className="flex gap-3">
                                      <div className="relative">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1" />
                                        <div className="absolute top-3.5 left-1 w-[1px] h-4 bg-slate-200" />
                                      </div>
                                      <div className="text-xs">
                                        <p className="font-semibold text-slate-900">Order Placed</p>
                                        <p className="text-slate-500">{formatDateTime(order.createdAt)}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-3">
                                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200 mt-1" />
                                      <div className="text-xs text-slate-400">
                                        <p className="font-semibold">Estimated Delivery</p>
                                        <p>{formatDateTime(order.estimatedDelivery)}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="md:col-span-2 space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Items</h4>
                                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                  <table className="w-full text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                      <tr>
                                        <th className="px-4 py-2 text-left font-semibold text-slate-700">Item</th>
                                        <th className="px-4 py-2 text-center font-semibold text-slate-700">Qty</th>
                                        <th className="px-4 py-2 text-right font-semibold text-slate-700">Price</th>
                                        <th className="px-4 py-2 text-right font-semibold text-slate-700">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {order.items.map((item: any, idx: number) => (
                                        <tr key={idx}>
                                          <td className="px-4 py-2 text-slate-900 font-medium">{item.name}</td>
                                          <td className="px-4 py-2 text-center text-slate-600">{item.quantity}</td>
                                          <td className="px-4 py-2 text-right text-slate-600">
                                            {formatCurrency(item.price)}
                                          </td>
                                          <td className="px-4 py-2 text-right text-slate-900 font-medium">
                                            {formatCurrency(item.total)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot className="bg-slate-50/80">
                                      <tr>
                                        <td colSpan={3} className="px-4 py-2 text-right text-slate-500 font-medium">
                                          Subtotal
                                        </td>
                                        <td className="px-4 py-2 text-right text-slate-900 font-bold">
                                          {formatCurrency(order.subtotal)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan={3} className="px-4 py-2 text-right text-slate-500 font-medium">
                                          Delivery Fee
                                        </td>
                                        <td className="px-4 py-2 text-right text-slate-900 font-bold">
                                          {formatCurrency(order.deliveryFee)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={3}
                                          className="px-4 py-2 text-right text-slate-500 font-medium border-t border-slate-200"
                                        >
                                          Total
                                        </td>
                                        <td className="px-4 py-2 text-right text-[#0A7A5A] font-black text-lg border-t border-slate-200">
                                          {formatCurrency(order.total)}
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                                <div className="flex items-center justify-between gap-4 pt-2">
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="text-xs border-slate-200 gap-1.5">
                                      <Phone size={14} /> Call Customer
                                    </Button>
                                  </div>
                                  <div className="flex gap-2">
                                    {NEXT_STATUS[order.status] ? (
                                      <Button
                                        size="sm"
                                        className="bg-[#0A7A5A] hover:bg-[#0f6048] text-white"
                                        disabled={updatingId === order.id}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          updateStatus(order.id, NEXT_STATUS[order.status]);
                                        }}
                                      >
                                        {updatingId === order.id ? "Updating..." : NEXT_LABEL[order.status]}
                                      </Button>
                                    ) : (
                                      <div className="flex gap-2">
                                        <select
                                          className="text-xs font-semibold py-1.5 pl-3 pr-8 rounded-lg border border-slate-200 bg-white focus:outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors"
                                          value={selectedStatus[order.id] ?? ""}
                                          onChange={(e) =>
                                            setSelectedStatus((prev) => ({ ...prev, [order.id]: e.target.value }))
                                          }
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <option value="">Change Status</option>
                                          <option value="CONFIRMED">Confirm Order</option>
                                          <option value="PREPARING">Start Preparing</option>
                                          <option value="READY">Mark as Ready</option>
                                          <option value="DELIVERED">Mark Delivered</option>
                                          <option value="CANCELLED">Cancel Order</option>
                                        </select>
                                        <Button
                                          size="sm"
                                          className="bg-[#0A7A5A] hover:bg-[#0f6048] text-white"
                                          disabled={!selectedStatus[order.id] || updatingId === order.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleUpdateFromDropdown(order.id);
                                          }}
                                        >
                                          Update Status
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No orders found</h3>
              <p className="text-slate-500 text-sm max-w-xs mt-1">
                {searchTerm
                  ? "No orders match your search. Try a different term."
                  : "No orders in this category yet."}
              </p>
              <Button
                variant="outline"
                className="mt-6 border-slate-200 text-slate-600"
                onClick={() => {
                  setActiveTab("all");
                  setSearchTerm("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
