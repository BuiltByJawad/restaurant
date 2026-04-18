"use client";
import { 
  Play, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShoppingBag, 
  LayoutDashboard, 
  CreditCard, 
  Menu as MenuIcon, 
  BarChart3, 
  Store,
  UserPlus,
  Settings,
  ArrowRight
} from "lucide-react";
import { LandingNavbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PRICING_PLANS, TESTIMONIALS, FAQS } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

// --- Components ---

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:bg-[#0A7A5A] transition-colors">
      <Icon className="w-6 h-6 text-[#0A7A5A] group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const PricingCard = ({ plan, isYearly }: { plan: any, isYearly: boolean }) => {
  const price = isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.price;
  
  return (
    <div className={cn(
      "relative p-8 rounded-2xl border transition-all duration-300",
      plan.popular 
        ? "bg-white border-[#0A7A5A] shadow-xl scale-105 z-10" 
        : "bg-white border-slate-100 shadow-sm hover:shadow-md"
    )}>
      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F59E0B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
        <p className="text-slate-500 text-sm h-10">{plan.description}</p>
      </div>
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900">
            {plan.price === 0 ? "Custom" : `৳${new Intl.NumberFormat("en-BD").format(price)}`}
          </span>
          {plan.price !== 0 && (
            <span className="text-slate-500 font-medium">/mo</span>
          )}
        </div>
        {isYearly && plan.price !== 0 && (
          <p className="text-emerald-600 text-xs font-medium mt-1">Billed annually (2 months free)</p>
        )}
      </div>
      <Button 
        variant={plan.popular ? "default" : "outline"} 
        className="w-full mb-8"
        asChild
      >
        <Link href={plan.price === 0 ? "/contact" : "/auth/register"}>
          {plan.cta}
        </Link>
      </Button>
      <div className="space-y-4">
        <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">What's included:</p>
        <ul className="space-y-3">
          {plan.features.map((feature: string) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
              <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {plan.notIncluded?.map((feature: string) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-slate-400">
              <Check className="w-4 h-4 text-slate-200 mt-0.5 shrink-0" />
              <span className="line-through">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const FAQItem = ({ faq }: { faq: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between gap-4 text-left hover:text-[#0A7A5A] transition-colors"
      >
        <span className="font-semibold text-slate-900">{faq.question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
      </button>
      {isOpen && (
        <div className="pb-6 text-slate-600 leading-relaxed text-sm">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

// --- Page Component ---

export default function LandingPageContent() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A7A5A] to-[#064e3b] -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_50%)] -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Now serving 50+ restaurants
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                  Power Your Restaurant's <span className="text-[#F59E0B]">Online Presence</span> in Bangladesh
                </h1>
                <p className="text-lg md:text-xl text-emerald-50/80 mb-10 leading-relaxed max-w-xl">
                  Accept orders, manage your menu, and grow your restaurant with Bangladesh's most complete restaurant platform. SSLCommerz, bKash, and Nagad payments built-in.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                  <Button size="xl" className="w-full sm:w-auto bg-white text-[#0A7A5A] hover:bg-emerald-50" asChild>
                    <Link href="/auth/register">Start 14-Day Free Trial</Link>
                  </Button>
                  <Button variant="outline" size="xl" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Watch 2-min Demo
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-emerald-100/60">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> No credit card required</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> 14-day free trial</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Cancel anytime</span>
                </div>
              </div>

              <div className="relative">
                {/* Hero Mockup */}
                <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden aspect-[4/3] group">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 flex items-center px-4 gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="p-4 pt-12 h-full">
                    <div className="grid grid-cols-12 gap-4 h-full">
                      <div className="col-span-3 space-y-3">
                        <div className="h-4 w-full bg-slate-700/50 rounded" />
                        <div className="h-4 w-3/4 bg-slate-700/50 rounded" />
                        <div className="h-4 w-5/6 bg-slate-700/50 rounded" />
                        <div className="pt-4 space-y-2">
                          <div className="h-8 w-full bg-[#0A7A5A]/30 border border-[#0A7A5A]/40 rounded" />
                          <div className="h-8 w-full bg-slate-700/30 rounded" />
                          <div className="h-8 w-full bg-slate-700/30 rounded" />
                        </div>
                      </div>
                      <div className="col-span-9 space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="p-3 bg-slate-800/50 border border-white/5 rounded-xl">
                              <div className="h-2 w-1/2 bg-slate-600 rounded mb-2" />
                              <div className="h-4 w-3/4 bg-white/10 rounded" />
                            </div>
                          ))}
                        </div>
                        <div className="flex-1 bg-slate-800/30 border border-white/5 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="h-4 w-32 bg-slate-600 rounded" />
                            <div className="h-4 w-16 bg-[#0A7A5A]/40 rounded" />
                          </div>
                          <div className="space-y-3">
                            {[1, 2, 3, 4].map(i => (
                              <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-700/50" />
                                <div className="flex-1 space-y-1.5">
                                  <div className="h-2 w-1/3 bg-slate-600 rounded" />
                                  <div className="h-1.5 w-1/4 bg-slate-700 rounded" />
                                </div>
                                <div className="h-2 w-12 bg-emerald-500/40 rounded" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#F59E0B] rounded-full blur-3xl opacity-20 -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-400 rounded-full blur-3xl opacity-20 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-12 border-b border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
              Trusted by restaurants across Bangladesh
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {["Dhaka Biryani House", "Sylhet Spice Garden", "Chittagong Sea Kitchen", "Rajshahi Sweets", "Cox's Bazar Seafood"].map(name => (
                <span key={name} className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-base font-bold text-[#0A7A5A] uppercase tracking-wider mb-4">Features</h2>
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Everything Your Restaurant Needs
              </p>
              <p className="text-lg text-slate-600">
                A complete suite of tools designed specifically for the Bangladeshi market, helping you streamline operations and increase revenue.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={ShoppingBag}
                title="Online Ordering System"
                description="Your own branded storefront where customers can browse your menu and place orders 24/7 without any middleman commissions."
              />
              <FeatureCard 
                icon={LayoutDashboard}
                title="Real-time Order Dashboard"
                description="Never miss an order with live tracking, sound notifications, and one-click status updates for your kitchen and delivery staff."
              />
              <FeatureCard 
                icon={CreditCard}
                title="SSLCommerz Payments"
                description="Securely accept Visa, Mastercard, bKash, Nagad, and Rocket payments directly into your account. Cash on delivery supported too."
              />
              <FeatureCard 
                icon={MenuIcon}
                title="Menu Management"
                description="Easily add or edit unlimited items with photos, categories, and price changes. Manage item availability in real-time."
              />
              <FeatureCard 
                icon={BarChart3}
                title="Customer Analytics"
                description="Deep insights into your business. Track repeat customers, peak order times, total revenue, and your top-selling items."
              />
              <FeatureCard 
                icon={Store}
                title="Multi-branch Support"
                description="Manage multiple locations from a single dashboard. Centralize your inventory, staff, and reporting (Enterprise plan)."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Start in 3 Simple Steps</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Getting your restaurant online shouldn't be complicated. We've made it as easy as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="absolute top-12 left-1/4 right-1/4 h-0.5 bg-emerald-800 hidden md:block" />
              {[
                { step: "01", icon: UserPlus, title: "Sign Up", desc: "Create your account in minutes. No credit card required to start your 14-day free trial." },
                { step: "02", icon: Settings, title: "Set Up Menu", desc: "Upload your items, add photos, and set your prices. Our team can help you if needed." },
                { step: "03", icon: ArrowRight, title: "Start Getting Orders", desc: "Go live and start accepting orders from your customers immediately. It's that simple." }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center mb-8 relative z-10 group-hover:bg-[#0A7A5A] transition-colors duration-500">
                    <item.icon className="w-10 h-10 text-emerald-400 group-hover:text-white transition-colors" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F59E0B] text-slate-900 flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-base font-bold text-[#0A7A5A] uppercase tracking-wider mb-4">Pricing</h2>
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Simple, Transparent Pricing
              </p>
              <p className="text-lg text-slate-600 mb-10">
                Choose the plan that fits your restaurant's needs. No hidden fees, no per-order commissions.
              </p>

              <div className="flex items-center justify-center gap-4">
                <span className={cn("text-sm font-medium", !isYearly ? "text-slate-900" : "text-slate-500")}>Monthly</span>
                <button 
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-14 h-7 rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-300"
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
                    isYearly ? "translate-x-7 bg-[#0A7A5A]" : "translate-x-0"
                  )} />
                </button>
                <div className="flex items-center gap-2">
                  <span className={cn("text-sm font-medium", isYearly ? "text-slate-900" : "text-slate-500")}>Yearly</span>
                  <span className="bg-emerald-100 text-[#0A7A5A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Save 20%</span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {PRICING_PLANS.map((plan) => (
                <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-bold text-[#0A7A5A] uppercase tracking-wider mb-4">Testimonials</h2>
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900">Loved by Restaurant Owners</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col h-full hover:-translate-y-1 transition-transform">
                  <div className="flex gap-1 mb-6 text-[#F59E0B]">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <blockquote className="text-slate-700 leading-relaxed mb-8 flex-grow italic">
                    "{t.text}"
                  </blockquote>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-[#0A7A5A] text-white flex items-center justify-center font-bold text-lg">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-base font-bold text-[#0A7A5A] uppercase tracking-wider mb-4">FAQ</h2>
              <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Frequently Asked Questions</p>
              <p className="text-slate-600">Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-8">
              {FAQS.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#0A7A5A] to-[#064e3b] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
                Ready to grow your restaurant?
              </h2>
              <p className="text-emerald-50/80 text-lg mb-12 max-w-2xl mx-auto">
                Join 50+ successful restaurants in Bangladesh using FoodFlow to power their online ordering business. Start your 14-day free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="xl" className="w-full sm:w-auto bg-white text-[#0A7A5A] hover:bg-emerald-50" asChild>
                  <Link href="/auth/register">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
