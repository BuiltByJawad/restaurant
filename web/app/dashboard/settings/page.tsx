"use client";

import { useState } from "react";
import { 
  Building2, 
  CreditCard, 
  Clock, 
  Bell, 
  AlertTriangle,
  Save,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  MapPin,
  Mail,
  Phone,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { 
  RESTAURANTS, 
  AREAS 
} from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { 
  FormField, 
  Input, 
  Textarea, 
  SelectField 
} from "@/components/ui/form-field";
import { 
  restaurantSettingsSchema, 
  RestaurantSettingsFormData 
} from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("info");
  const restaurant = RESTAURANTS[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<RestaurantSettingsFormData>({
    resolver: zodResolver(restaurantSettingsSchema),
    defaultValues: {
      name: restaurant.name,
      description: restaurant.description,
      phone: "01712345678", // Fixed for form validation (the dummy data has hyphens)
      address: restaurant.address,
      area: restaurant.area,
      city: restaurant.city,
      minimumOrder: restaurant.minimumOrder,
      deliveryFee: restaurant.deliveryFee,
      estimatedDeliveryMin: 30,
      estimatedDeliveryMax: 45
    }
  });

  const onSave = (data: RestaurantSettingsFormData) => {
    console.log("Saving settings:", data);
    toast.success("Settings updated successfully!");
  };

  const TABS = [
    { id: "info", label: "Restaurant Info", icon: Building2 },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "hours", label: "Hours", icon: Clock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar 
        title="Settings" 
        subtitle="Configure your restaurant profile and preferences" 
      />

      <main className="px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Settings Navigation */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-white text-[#0A7A5A] shadow-sm border border-slate-100"
                      : "text-slate-500 hover:bg-white/50"
                  )}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? "text-[#0A7A5A]" : "text-slate-400"} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Settings Content */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {activeTab === "info" && (
              <form onSubmit={handleSubmit(onSave)} className="p-6 lg:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">General Information</h3>
                  <p className="text-sm text-slate-500">Update your restaurant's basic details and contact info.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <FormField label="Restaurant Name" error={errors.name?.message}>
                      <Input {...register("name")} />
                    </FormField>
                  </div>
                  <div className="md:col-span-2">
                    <FormField label="Description" error={errors.description?.message}>
                      <Textarea {...register("description")} rows={4} />
                    </FormField>
                  </div>
                  <FormField label="Phone Number" error={errors.phone?.message}>
                    <Input {...register("phone")} placeholder="017XXXXXXXX" />
                  </FormField>
                  <FormField label="City" error={errors.city?.message}>
                    <SelectField {...register("city")}>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                    </SelectField>
                  </FormField>
                  <div className="md:col-span-2">
                    <FormField label="Address" error={errors.address?.message}>
                      <Input {...register("address")} />
                    </FormField>
                  </div>
                  <FormField label="Area" error={errors.area?.message}>
                    <SelectField {...register("area")}>
                      <option value="Dhanmondi">Dhanmondi</option>
                      <option value="Gulshan">Gulshan</option>
                      <option value="Banani">Banani</option>
                      <option value="Uttara">Uttara</option>
                      <option value="Mirpur">Mirpur</option>
                    </SelectField>
                  </FormField>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Order Settings</h3>
                  <p className="text-sm text-slate-500">Configure delivery fees, minimum orders, and times.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Minimum Order (৳)" error={errors.minimumOrder?.message}>
                    <Input type="number" {...register("minimumOrder", { valueAsNumber: true })} />
                  </FormField>
                  <FormField label="Delivery Fee (৳)" error={errors.deliveryFee?.message}>
                    <Input type="number" {...register("deliveryFee", { valueAsNumber: true })} />
                  </FormField>
                  <FormField label="Min Prep Time (min)" error={errors.estimatedDeliveryMin?.message}>
                    <Input type="number" {...register("estimatedDeliveryMin", { valueAsNumber: true })} />
                  </FormField>
                  <FormField label="Max Prep Time (min)" error={errors.estimatedDeliveryMax?.message}>
                    <Input type="number" {...register("estimatedDeliveryMax", { valueAsNumber: true })} />
                  </FormField>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-[#0A7A5A] hover:bg-[#0f6048] text-white px-8 h-12 rounded-xl font-bold flex items-center gap-2"
                    disabled={!isDirty}
                  >
                    <Save size={18} /> Save Changes
                  </Button>
                </div>
              </form>
            )}

            {activeTab === "payment" && (
              <div className="p-6 lg:p-8 space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Payment Integration</h3>
                    <p className="text-sm text-slate-500">Manage how you receive payments from customers.</p>
                  </div>
                  <Badge variant="success" className="gap-1.5 px-3 py-1">
                    <CheckCircle2 size={14} /> Connected
                  </Badge>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <Smartphone className="text-emerald-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">SSLCommerz Global</h4>
                    <p className="text-xs text-slate-600">Your primary payment gateway for cards and mobile banking.</p>
                  </div>
                  <Button variant="outline" className="border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50">
                    Configure
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#0A7A5A]" /> API Credentials
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Store ID</label>
                      <Input value="foodflow_dhaka_biryani_prod" readOnly className="bg-slate-50 font-mono text-xs" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Store Password</label>
                      <Input value="••••••••••••••••" readOnly className="bg-slate-50 font-mono text-xs" />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-900">Accepted Payment Methods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "bkash", name: "bKash", icon: "/images/bkash.png" },
                      { id: "nagad", name: "Nagad", icon: "/images/nagad.png" },
                      { id: "rocket", name: "Rocket", icon: "/images/rocket.png" },
                      { id: "cod", name: "Cash on Delivery", isCod: true },
                    ].map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded border border-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-400">
                            {method.id === 'cod' ? '৳' : method.name[0]}
                          </div>
                          <span className="text-sm font-bold text-slate-800">{method.name}</span>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-[#0A7A5A]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hours" && (
              <div className="p-6 lg:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Business Hours</h3>
                  <p className="text-sm text-slate-500">Set your restaurant's opening and closing times for each day.</p>
                </div>

                <div className="space-y-3">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/10 transition-colors gap-4">
                      <div className="flex items-center gap-3 min-w-[120px]">
                        <Switch defaultChecked={day !== "Friday"} className="data-[state=checked]:bg-[#0A7A5A]" />
                        <span className="font-bold text-slate-800">{day}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Open</span>
                          <Input type="time" defaultValue="10:00" className="w-32 h-9 text-xs" />
                        </div>
                        <span className="text-slate-300">—</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">Close</span>
                          <Input type="time" defaultValue="23:00" className="w-32 h-9 text-xs" />
                        </div>
                      </div>
                      <Badge variant={day === "Friday" ? "secondary" : "default"} className="hidden md:inline-flex">
                        {day === "Friday" ? "Closed" : "Open"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="bg-[#0A7A5A] hover:bg-[#0f6048] text-white gap-2">
                    <Save size={18} /> Save Schedule
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-6 lg:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Notification Preferences</h3>
                  <p className="text-sm text-slate-500">Choose how and when you want to be notified.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "New Order Sound", desc: "Play a sound when a new order arrives", icon: Bell },
                    { title: "Email Notifications", desc: "Receive order summaries via email", icon: Mail },
                    { title: "Low Stock Alerts", desc: "Notify when an item is running low", icon: AlertTriangle },
                    { title: "Daily Reports", desc: "Get a performance report every morning", icon: TrendingUp },
                    { title: "Customer Reviews", desc: "Notification for new feedback", icon: Smartphone },
                  ].map((notif, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-400">
                        <notif.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                          <Switch defaultChecked={i < 3} className="data-[state=checked]:bg-[#0A7A5A]" />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="p-6 lg:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-1">Danger Zone</h3>
                  <p className="text-sm text-slate-500">Irreversible actions for your restaurant account.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-2xl border border-red-100 bg-red-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900">Pause Storefront</h4>
                      <p className="text-sm text-slate-600">Temporarily stop taking orders. Your menu will still be visible.</p>
                    </div>
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 bg-white">
                      Pause Store
                    </Button>
                  </div>

                  <div className="p-6 rounded-2xl border border-red-100 bg-red-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900">Delete Restaurant</h4>
                      <p className="text-sm text-slate-600">Permanently delete your restaurant data and all related information.</p>
                    </div>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
