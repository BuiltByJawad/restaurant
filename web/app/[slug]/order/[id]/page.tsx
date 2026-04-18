import { Metadata } from "next";
import { DASHBOARD_ORDERS, RESTAURANTS } from "@/lib/dummy-data";
import { formatCurrency, formatTime } from "@/lib/utils";
import { 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  Home, 
  MessageCircle, 
  Phone, 
  RotateCcw,
  ArrowLeft,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order ${id} Tracking | FoodFlow`,
  };
}

export default async function OrderTrackingPage({ params }: Props) {
  const { slug, id } = await params;
  const restaurant = RESTAURANTS.find(r => r.slug === slug);
  const order = DASHBOARD_ORDERS[0]; // Using as dummy data

  const statusSteps = [
    { key: "pending", label: "Placed", icon: CheckCircle2, time: "12:30 PM" },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle2, time: "12:32 PM" },
    { key: "preparing", label: "Preparing", icon: ChefHat, time: "12:35 PM" },
    { key: "out_for_delivery", label: "Out for delivery", icon: Bike, time: "12:55 PM" },
    { key: "delivered", label: "Delivered", icon: Home, time: "01:15 PM" },
  ];

  const currentStatusIndex = 2; // Mocking "Preparing" status

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href={`/${slug}`} className="text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Track Order</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Status Illustration & Main Info */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
            <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="w-12 h-12 text-[#0A7A5A] animate-pulse" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">We're preparing your food!</h2>
            <p className="text-slate-500 mb-6">Order ID: <span className="font-bold text-slate-900">{id}</span></p>
            
            <div className="bg-slate-50 rounded-xl p-4 inline-flex flex-col items-center">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Estimated Delivery</p>
              <p className="text-3xl font-black text-[#0A7A5A]">25-35 MIN</p>
            </div>
          </div>

          {/* Visual Progress Stepper */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-8">Order Status</h3>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100" />
              <div 
                className="absolute left-6 top-0 w-0.5 bg-[#0A7A5A] transition-all duration-1000" 
                style={{ height: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
              />

              <div className="space-y-8 relative">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;
                  const StepIcon = step.icon;

                  return (
                    <div key={step.key} className="flex items-start gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors shrink-0",
                        isCompleted ? "bg-[#0A7A5A] text-white" : "bg-slate-100 text-slate-400"
                      )}>
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={cn(
                              "font-bold leading-none",
                              isCompleted ? "text-slate-900" : "text-slate-400"
                            )}>
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-[#0A7A5A] font-medium mt-1">Our chef is cooking your meal with love</p>
                            )}
                          </div>
                          {isCompleted && (
                            <p className="text-xs text-slate-500">{step.time}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-slate-200 h-64 rounded-2xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://api.dicebear.com/7.x/shapes/svg?seed=map')] opacity-20 bg-repeat" />
            <div className="z-10 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-500 animate-bounce" />
              <span className="font-bold text-slate-900">📍 Tracking your delivery...</span>
            </div>
          </div>

          {/* Order Details Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Items Ordered</h3>
              <Badge variant="outline">{order.items.length} items</Badge>
            </div>
            <div className="p-6 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-600"><span className="font-bold text-slate-900">{item.quantity}x</span> {item.name}</span>
                  <span className="font-medium text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total Amount Paid</span>
                <span className="font-extrabold text-[#0A7A5A]">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Help & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button variant="outline" className="flex-1 h-12 gap-2">
              <Phone className="h-4 w-4" />
              Contact Restaurant
            </Button>
            <Button variant="outline" className="flex-1 h-12 gap-2">
              <MessageCircle className="h-4 w-4" />
              Need Help?
            </Button>
            <Link href={`/${slug}`} className="flex-1">
              <Button variant="amber" className="w-full h-12 gap-2">
                <RotateCcw className="h-4 w-4" />
                Order Again
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
