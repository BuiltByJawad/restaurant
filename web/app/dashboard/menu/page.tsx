"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Flame,
  Leaf,
  LayoutGrid,
  List,
  Filter,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField, Input, Textarea, SelectField } from "@/components/ui/form-field";
import { menuItemSchema, MenuItemFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useAuthStore, useAuthHasHydrated, DEFAULT_SLUG } from "@/store/auth";
import { toast } from "sonner";

export default function MenuPage() {
  const hydrated = useAuthHasHydrated();
  const restaurantSlug = useAuthStore((s) => s.restaurantSlug) ?? DEFAULT_SLUG;

  const [categories, setCategories] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      isAvailable: true,
      isBestseller: false,
      isVeg: false,
      spiceLevel: "none",
      preparationTime: 15,
    },
  });

  useEffect(() => {
    if (!hydrated) return;
    fetch(`/api/restaurants/${restaurantSlug}/menu`)
      .then((r) => r.json())
      .then((json) => {
        setCategories(json.data?.categories ?? []);
        setItems(json.data?.items ?? []);
        if (json.data?.categories?.length > 0) setActiveCategory(json.data.categories[0].id);
      })
      .finally(() => setLoading(false));
  }, [hydrated, restaurantSlug]);

  const toggleAvailability = async (item: any) => {
    setTogglingId(item.id);
    try {
      const res = await fetch(`/api/restaurants/${restaurantSlug}/menu/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !item.isAvailable }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i)));
    } catch {
      toast.error("Failed to update availability");
    } finally {
      setTogglingId(null);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this menu item?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/restaurants/${restaurantSlug}/menu/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete item");
    } finally {
      setDeletingId(null);
    }
  };

  const onSubmit = async (data: MenuItemFormData) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/restaurants/${restaurantSlug}/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          categoryId: data.categoryId || activeCategory,
          spiceLevel: data.spiceLevel?.toUpperCase() ?? "NONE",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setItems((prev) => [...prev, json.data]);
      toast.success("Menu item added!");
      setShowAddForm(false);
      reset();
    } catch {
      toast.error("Failed to add item");
    } finally {
      setSaving(false);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.categoryId === activeCategory &&
      (!searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar title="Menu Management" subtitle="Manage your items, categories, and availability" />

      <main className="px-6 py-6 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#0A7A5A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-6">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                          "whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                          activeCategory === cat.id
                            ? "bg-[#0A7A5A] text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        <span>{cat.emoji}</span>
                        {cat.name}
                        <span
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-full",
                            activeCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                          )}
                        >
                          {items.filter((i) => i.categoryId === cat.id).length}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex p-1 bg-slate-100 rounded-lg">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                          "p-1.5 rounded-md transition-colors",
                          viewMode === "grid" ? "bg-white text-[#0A7A5A] shadow-sm" : "text-slate-400"
                        )}
                      >
                        <LayoutGrid size={18} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={cn(
                          "p-1.5 rounded-md transition-colors",
                          viewMode === "list" ? "bg-white text-[#0A7A5A] shadow-sm" : "text-slate-400"
                        )}
                      >
                        <List size={18} />
                      </button>
                    </div>
                    <Button
                      onClick={() => setShowAddForm(true)}
                      className="bg-[#0A7A5A] hover:bg-[#0f6048] text-white gap-2"
                    >
                      <Plus size={18} /> Add New Item
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20 transition-all"
                    />
                  </div>
                  <Button variant="outline" className="h-10 border-slate-200 text-slate-600 gap-2">
                    <Filter size={18} /> Filters
                  </Button>
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-16 flex flex-col items-center text-center">
                  <p className="text-slate-400 text-sm">No items in this category yet.</p>
                  <Button
                    className="mt-4 bg-[#0A7A5A] hover:bg-[#0f6048] text-white gap-2"
                    onClick={() => setShowAddForm(true)}
                  >
                    <Plus size={18} /> Add First Item
                  </Button>
                </div>
              ) : (
                <div
                  className={cn(
                    "grid gap-4",
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  )}
                >
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex",
                        viewMode === "grid" ? "flex-col" : "flex-row items-center p-3"
                      )}
                    >
                      <div
                        className={cn(
                          "bg-slate-50 flex items-center justify-center shrink-0",
                          viewMode === "grid" ? "h-32 text-5xl" : "h-16 w-16 text-2xl rounded-lg"
                        )}
                      >
                        {item.emoji}
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
                          <div className="flex items-center gap-1">
                            {item.isBestseller && (
                              <Badge variant="warning" className="text-[10px] px-1.5 py-0 h-4">
                                Bestseller
                              </Badge>
                            )}
                            {item.isVeg && <Leaf size={14} className="text-emerald-500" />}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-[#0A7A5A]">{formatCurrency(item.price)}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase text-slate-400">Available</span>
                              <Switch
                                checked={item.isAvailable}
                                onCheckedChange={() => toggleAvailability(item)}
                                disabled={togglingId === item.id}
                                className="data-[state=checked]:bg-emerald-500"
                              />
                            </div>
                            <div className="h-4 w-[1px] bg-slate-200 mx-1" />
                            <div className="flex items-center gap-1">
                              <button
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                onClick={() => deleteItem(item.id)}
                                disabled={deletingId === item.id}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {showAddForm && (
              <div className="w-full lg:w-[400px] shrink-0">
                <div className="bg-white rounded-xl border border-slate-100 shadow-lg sticky top-6 overflow-hidden">
                  <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
                    <h2 className="font-bold">Add New Item</h2>
                    <button onClick={() => setShowAddForm(false)} className="hover:text-slate-300 transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                    <FormField label="Item Name" error={errors.name?.message}>
                      <Input {...register("name")} placeholder="e.g. Special Chicken Biryani" />
                    </FormField>

                    <FormField label="Description" error={errors.description?.message}>
                      <Textarea
                        {...register("description")}
                        placeholder="Describe the item, ingredients, etc."
                        rows={3}
                      />
                    </FormField>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Price (৳)" error={errors.price?.message}>
                        <Input type="number" {...register("price", { valueAsNumber: true })} placeholder="350" />
                      </FormField>
                      <FormField label="Category" error={errors.categoryId?.message}>
                        <SelectField {...register("categoryId")}>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </SelectField>
                      </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Spice Level" error={errors.spiceLevel?.message}>
                        <SelectField {...register("spiceLevel")}>
                          <option value="none">None</option>
                          <option value="mild">Mild</option>
                          <option value="medium">Medium</option>
                          <option value="hot">Hot</option>
                          <option value="extra_hot">Extra Hot</option>
                        </SelectField>
                      </FormField>
                      <FormField label="Prep Time (min)" error={errors.preparationTime?.message}>
                        <Input
                          type="number"
                          {...register("preparationTime", { valueAsNumber: true })}
                          placeholder="15"
                        />
                      </FormField>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Leaf size={18} className="text-emerald-500" />
                          <div>
                            <p className="text-sm font-bold text-slate-900">Vegetarian</p>
                            <p className="text-[10px] text-slate-500">Is this a meat-free item?</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          {...register("isVeg")}
                          className="h-4 w-4 rounded border-slate-300 text-[#0A7A5A] focus:ring-[#0A7A5A]"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <Flame size={18} className="text-amber-500" />
                          <div>
                            <p className="text-sm font-bold text-slate-900">Bestseller</p>
                            <p className="text-[10px] text-slate-500">Show a bestseller badge</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          {...register("isBestseller")}
                          className="h-4 w-4 rounded border-slate-300 text-[#0A7A5A] focus:ring-[#0A7A5A]"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-slate-200"
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-[#0A7A5A] hover:bg-[#0f6048] text-white"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Item"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
