"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  ChevronRight,
  Filter,
  MoreVertical,
  Flame,
  Leaf,
  Clock,
  LayoutGrid,
  List
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardTopbar } from "@/components/dashboard/sidebar";
import { 
  MENU_CATEGORIES, 
  MENU_ITEMS 
} from "@/lib/dummy-data";
import { formatCurrency, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FormField, 
  Input, 
  Textarea, 
  SelectField 
} from "@/components/ui/form-field";
import { menuItemSchema, MenuItemFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [items, setItems] = useState(MENU_ITEMS);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultVariants: {
      isAvailable: true,
      isBestseller: false,
      isVeg: false,
      spiceLevel: "none",
      preparationTime: 15
    }
  });

  const toggleAvailability = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const filteredItems = items.filter(item => item.categoryId === activeCategory);

  const onSubmit = (data: MenuItemFormData) => {
    console.log("Adding item:", data);
    // In a real app, this would be a server action or API call
    setShowAddForm(false);
    reset();
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <DashboardTopbar 
        title="Menu Management" 
        subtitle="Manage your items, categories, and availability" 
      />

      <main className="px-6 py-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Menu Section */}
          <div className="flex-1 space-y-6">
            {/* Header & Categories */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {MENU_CATEGORIES.map((cat) => (
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
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full",
                        activeCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      )}>
                        {cat.itemCount}
                      </span>
                    </button>
                  ))}
                  <button className="flex items-center gap-1.5 text-xs text-[#0A7A5A] font-bold px-3 py-2 rounded-lg border border-dashed border-emerald-200 hover:bg-emerald-50 transition-colors">
                    <Plus size={14} /> Add Category
                  </button>
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
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7A5A]/20 transition-all"
                  />
                </div>
                <Button variant="outline" className="h-10 border-slate-200 text-slate-600 gap-2">
                  <Filter size={18} /> Filters
                </Button>
              </div>
            </div>

            {/* Items Display */}
            <div className={cn(
              "grid gap-4",
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
            )}>
              {filteredItems.map((item) => (
                <div key={item.id} className={cn(
                  "bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex",
                  viewMode === "grid" ? "flex-col" : "flex-row items-center p-3"
                )}>
                  <div className={cn(
                    "bg-slate-50 flex items-center justify-center shrink-0",
                    viewMode === "grid" ? "h-32 text-5xl" : "h-16 w-16 text-2xl rounded-lg"
                  )}>
                    {item.emoji}
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 leading-tight">{item.name}</h3>
                      <div className="flex items-center gap-1">
                        {item.isBestseller && (
                          <Badge variant="warning" className="text-[10px] px-1.5 py-0 h-4">Bestseller</Badge>
                        )}
                        {item.isVeg && (
                          <Leaf size={14} className="text-emerald-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#0A7A5A]">{formatCurrency(item.price)}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase text-slate-400">Available</span>
                          <Switch 
                            checked={item.isAvailable} 
                            onCheckedChange={() => toggleAvailability(item.id)}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                        <div className="h-4 w-[1px] bg-slate-200 mx-1" />
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-[#0A7A5A] transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Panel for Add/Edit */}
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
                    <Textarea {...register("description")} placeholder="Describe the item, ingredients, etc." rows={3} />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Price (৳)" error={errors.price?.message}>
                      <Input type="number" {...register("price", { valueAsNumber: true })} placeholder="350" />
                    </FormField>
                    <FormField label="Category" error={errors.categoryId?.message}>
                      <SelectField {...register("categoryId")}>
                        {MENU_CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
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
                      </SelectField>
                    </FormField>
                    <FormField label="Prep Time (min)" error={errors.preparationTime?.message}>
                      <Input type="number" {...register("preparationTime", { valueAsNumber: true })} placeholder="15" />
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
                      <input type="checkbox" {...register("isVeg")} className="h-4 w-4 rounded border-slate-300 text-[#0A7A5A] focus:ring-[#0A7A5A]" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Flame size={18} className="text-amber-500" />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Bestseller</p>
                          <p className="text-[10px] text-slate-500">Show a bestseller badge</p>
                        </div>
                      </div>
                      <input type="checkbox" {...register("isBestseller")} className="h-4 w-4 rounded border-slate-300 text-[#0A7A5A] focus:ring-[#0A7A5A]" />
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
                    >
                      Save Item
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
