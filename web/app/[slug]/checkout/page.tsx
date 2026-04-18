"use client";

import { use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations";
import { useCartHasHydrated, useCartStore } from "@/store/cart";
import { formatCurrency, calculateDeliveryFee, calculateTax, cn } from "@/lib/utils";
import { AREAS } from "@/lib/dummy-data";
import { FormField, Input, Textarea, SelectField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck, 
  Headphones, 
  RefreshCcw,
  Clock,
  ChevronRight,
  ShoppingBag
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CheckoutPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const hasHydrated = useCartHasHydrated();
  const { items, restaurantName, subtotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const subTotalAmount = subtotal();
  const deliveryFee = calculateDeliveryFee(subTotalAmount);
  const tax = calculateTax(subTotalAmount);
  const total = subTotalAmount + deliveryFee + tax;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "sslcommerz",
      deliveryType: "asap",
      city: "Dhaka",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const deliveryType = watch("deliveryType");

  useEffect(() => {
    if (hasHydrated && items.length === 0 && !orderSuccess) {
      router.push(`/${params.slug}`);
    }
  }, [hasHydrated, items, orderSuccess, params.slug, router]);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantSlug: params.slug,
          customerName: data.fullName,
          customerPhone: data.phone,
          customerEmail: data.email || undefined,
          deliveryAddress: data.address,
          deliveryArea: data.area,
          deliveryCity: data.city,
          paymentMethod: data.paymentMethod,
          notes: data.notes,
          items: items.map((item) => ({
            menuItemId: item.menuItem.id,
            quantity: item.quantity,
          })),
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Could not place order");
      }

      setOrderSuccess(result.data.orderNumber);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-[#0A7A5A]" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Order Confirmed!</h1>
        <p className="text-slate-600 mb-2">Your order <span className="font-bold text-slate-900">{orderSuccess}</span> has been placed.</p>
        <p className="text-slate-500 mb-8 max-w-md">We've sent a confirmation to your phone. You can track your order status in real-time.</p>
        <Button 
          className="w-full max-w-xs" 
          onClick={() => router.push(`/${params.slug}/order/${orderSuccess}`)}
        >
          Track Order
        </Button>
      </div>
    );
  }

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-sm font-medium text-slate-500">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Checkout Header */}
      <div className="bg-white border-b border-slate-200 py-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
            
            {/* Progress Stepper */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-[#0A7A5A]">
                <div className="w-7 h-7 rounded-full bg-[#0A7A5A] text-white flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm font-semibold">Cart</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 text-[#0A7A5A]">
                <div className="w-7 h-7 rounded-full bg-[#0A7A5A] text-white flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm font-semibold">Delivery Info</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm font-semibold">Payment</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-sm font-semibold">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Delivery Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0A7A5A] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Full Name" error={errors.fullName?.message}>
                    <Input {...register("fullName")} placeholder="e.g. Arif Hossain" error={!!errors.fullName} />
                  </FormField>
                  <FormField label="Phone Number" error={errors.phone?.message}>
                    <Input {...register("phone")} placeholder="01XXXXXXXXX" error={!!errors.phone} />
                  </FormField>
                  <div className="md:col-span-2">
                    <FormField label="Delivery Address" error={errors.address?.message}>
                      <Textarea {...register("address")} placeholder="House, Road, Apartment number..." rows={3} error={!!errors.address} />
                    </FormField>
                  </div>
                  <FormField label="Area/Thana" error={errors.area?.message}>
                    <SelectField {...register("area")} placeholder="Select Area" error={!!errors.area}>
                      {AREAS.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </SelectField>
                  </FormField>
                  <FormField label="City">
                    <Input {...register("city")} disabled value="Dhaka" className="bg-slate-50" />
                  </FormField>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  Delivery Time
                </h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <label className={cn(
                    "flex-1 flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                    deliveryType === "asap" ? "border-[#0A7A5A] bg-emerald-50/30" : "border-slate-100 hover:border-slate-200"
                  )}>
                    <div className="flex items-center gap-3">
                      <input type="radio" value="asap" {...register("deliveryType")} className="w-4 h-4 accent-[#0A7A5A]" />
                      <div>
                        <p className="font-bold text-slate-900">ASAP</p>
                        <p className="text-xs text-slate-500">Estimated 25-35 min</p>
                      </div>
                    </div>
                  </label>
                  <label className={cn(
                    "flex-1 flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                    deliveryType === "scheduled" ? "border-[#0A7A5A] bg-emerald-50/30" : "border-slate-100 hover:border-slate-200"
                  )}>
                    <div className="flex items-center gap-3">
                      <input type="radio" value="scheduled" {...register("deliveryType")} className="w-4 h-4 accent-[#0A7A5A]" />
                      <div>
                        <p className="font-bold text-slate-900">Schedule</p>
                        <p className="text-xs text-slate-500">Pick a later time</p>
                      </div>
                    </div>
                  </label>
                </div>
                {deliveryType === "scheduled" && (
                  <div className="mt-4">
                    <Input type="time" {...register("scheduledTime")} className="max-w-xs" />
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                    paymentMethod === "sslcommerz" ? "border-[#0A7A5A] bg-emerald-50/30" : "border-slate-100 hover:border-slate-200"
                  )}>
                    <div className="flex items-center gap-4">
                      <input type="radio" value="sslcommerz" {...register("paymentMethod")} className="w-4 h-4 accent-[#0A7A5A]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">SSLCommerz Online Payment</p>
                          <Badge variant="info" className="text-[10px] px-1.5 h-4 flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" /> Secure
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">Visa, Mastercard, bKash, Nagad, Rocket</p>
                      </div>
                    </div>
                    <CreditCard className="w-6 h-6 text-slate-400 hidden sm:block" />
                  </label>
                  <label className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all",
                    paymentMethod === "cod" ? "border-[#0A7A5A] bg-emerald-50/30" : "border-slate-100 hover:border-slate-200"
                  )}>
                    <div className="flex items-center gap-4">
                      <input type="radio" value="cod" {...register("paymentMethod")} className="w-4 h-4 accent-[#0A7A5A]" />
                      <div>
                        <p className="font-bold text-slate-900">Cash on Delivery</p>
                        <p className="text-xs text-slate-500">Pay when your order arrives</p>
                      </div>
                    </div>
                    <Wallet className="w-6 h-6 text-slate-400 hidden sm:block" />
                  </label>
                </div>
              </div>

              <div className="hidden lg:block">
                <Button type="submit" size="xl" className="w-full" loading={isSubmitting}>
                  Place Order — {formatCurrency(total)}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50">
                <h2 className="font-bold text-slate-900">Your Order</h2>
                <p className="text-sm text-slate-500">{restaurantName}</p>
              </div>
              
              {/* Items List */}
              <div className="p-6 space-y-4 max-h-[40vh] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-lg">
                        {item.menuItem.emoji}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 leading-tight">
                          {item.menuItem.name} <span className="text-slate-400 font-normal">x{item.quantity}</span>
                        </p>
                        <p className="text-xs text-slate-500">{formatCurrency(item.menuItem.price)} each</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(item.menuItem.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="px-6 py-4 bg-slate-50 flex gap-2">
                <Input placeholder="Promo code" className="bg-white" />
                <Button variant="outline" size="sm">Apply</Button>
              </div>

              {/* Totals */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subTotalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax (5%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-xl font-extrabold text-[#0A7A5A]">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0A7A5A] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none mb-0.5">SSL Secured</p>
                  <p className="text-[10px] text-slate-500">256-bit encryption</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none mb-0.5">24/7 Support</p>
                  <p className="text-[10px] text-slate-500">Dedicated help desk</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <RefreshCcw className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none mb-0.5">Money-back</p>
                  <p className="text-[10px] text-slate-500">100% satisfaction</p>
                </div>
              </div>
            </div>

            <div className="lg:hidden pb-6">
              <Button onClick={handleSubmit(onSubmit)} size="xl" className="w-full" loading={isSubmitting}>
                Place Order — {formatCurrency(total)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
