import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  CheckCircle2,
  Utensils,
  BarChart3,
  CreditCard,
  PlayCircle,
  ArrowRight,
  Menu,
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Utensils className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">FoodFlow</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">Features</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">Log in</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col items-start gap-6 max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
                Now available across Bangladesh
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                Power Your Restaurant in <span className="text-primary">Bangladesh</span>
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl leading-relaxed">
                Accept orders online, manage your menu, track payments — all in one place. Built specifically for the modern South Asian food business.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base border-2">
                  <PlayCircle className="mr-2 h-5 w-5 text-secondary" /> Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p>Trusted by 500+ restaurants in Dhaka</p>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl border bg-background/50 p-2 shadow-2xl backdrop-blur-sm">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                  <div className="flex items-center border-b px-4 py-3 bg-muted/30">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto flex h-6 w-1/2 items-center justify-center rounded-md bg-background px-3 text-xs text-muted-foreground shadow-sm">
                      foodflow.com.bd/dashboard
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 grid gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">Today's Sales</h3>
                        <p className="text-sm text-muted-foreground">Thursday, Oct 24</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">৳ 45,200</div>
                        <div className="text-sm text-green-600 flex items-center justify-end gap-1">
                          <ArrowRight className="h-3 w-3 -rotate-45" /> +12% from yesterday
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4 bg-muted/10">
                        <div className="text-sm text-muted-foreground mb-1">New Orders</div>
                        <div className="text-xl font-bold">142</div>
                      </div>
                      <div className="rounded-lg border p-4 bg-muted/10">
                        <div className="text-sm text-muted-foreground mb-1">Avg. Order Value</div>
                        <div className="text-xl font-bold">৳ 318</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Recent Orders</h4>
                      {[
                        { id: "#1042", items: "Chicken Biryani, Borhani", amount: "৳ 850", status: "Preparing" },
                        { id: "#1041", items: "Beef Tehari, Coke", amount: "৳ 450", status: "Ready" },
                        { id: "#1040", items: "Kacchi Platter x2", amount: "৳ 1200", status: "Delivered" },
                      ].map((order, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {order.id}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{order.items}</p>
                              <p className="text-xs text-muted-foreground">{order.amount}</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            order.status === 'Preparing' ? 'bg-secondary/20 text-secondary-foreground' :
                            order.status === 'Ready' ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y bg-muted/30 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-6">Trusted by top restaurants across the country</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {["Dhaka Biryani House", "Sylhet Spice Garden", "Chittagong Sea Kitchen", "Rajshahi Sweets"].map((name, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-foreground/10 flex items-center justify-center">
                  <Utensils className="h-4 w-4 text-foreground/50" />
                </div>
                <span className="font-bold text-lg tracking-tight text-foreground/80">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Everything you need to run your restaurant</h2>
            <p className="text-lg text-muted-foreground">Stop juggling multiple tools. FoodFlow brings your menu, orders, and payments into one powerful platform.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Utensils className="h-6 w-6 text-primary" />,
                title: "Online Ordering System",
                desc: "Get your own branded ordering website. Accept orders directly from customers without paying 30% commissions to food delivery apps."
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-secondary" />,
                title: "Real-time Dashboard",
                desc: "Track sales, popular items, and customer trends in real-time. Make data-driven decisions to grow your restaurant's revenue."
              },
              {
                icon: <CreditCard className="h-6 w-6 text-primary" />,
                title: "SSLCommerz Payments",
                desc: "Integrated with Bangladesh's top payment gateway. Accept bKash, Nagad, cards, and direct bank transfers seamlessly."
              }
            ].map((feature, i) => (
              <Card key={i} className="border-2 hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground mb-8">Choose the perfect plan for your restaurant's size and needs.</p>
            
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm ${!isAnnual ? 'font-bold' : 'text-muted-foreground'}`}>Monthly</span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={`text-sm ${isAnnual ? 'font-bold' : 'text-muted-foreground'}`}>
                Yearly <span className="text-primary text-xs ml-1 font-bold">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {/* Starter */}
            <Card className="border-2">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="text-sm text-muted-foreground mt-1">For new or small restaurants</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">৳{isAnnual ? '799' : '999'}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <Button className="w-full mb-6" variant="outline">Start Free Trial</Button>
                <div className="space-y-3">
                  {['Up to 500 orders/mo', 'Basic menu management', 'Email support', 'Standard reporting'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="border-2 border-primary shadow-xl relative scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                Most Popular
              </div>
              <CardContent className="pt-8 pb-8 px-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-primary">Pro</h3>
                  <p className="text-sm text-muted-foreground mt-1">For growing food businesses</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">৳{isAnnual ? '1999' : '2499'}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <Button className="w-full mb-6 bg-primary hover:bg-primary/90">Get Started</Button>
                <div className="space-y-3">
                  {['Unlimited orders', 'Advanced menu with modifiers', 'bKash/Nagad integration', 'Priority WhatsApp support', 'Custom domain mapping'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="border-2">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-sm text-muted-foreground mt-1">For restaurant chains</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">Custom</span>
                </div>
                <Button className="w-full mb-6" variant="outline">Contact Sales</Button>
                <div className="space-y-3">
                  {['Multiple locations', 'API access', 'Dedicated account manager', 'Custom integrations', 'White-labeling options'].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Loved by local restaurant owners</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "FoodFlow completely changed how we handle our weekend rush. No more missed phone calls or mixed up orders. Our delivery revenue went up by 40% in just two months.",
                author: "Rahim Uddin",
                role: "Owner, Dhaka Biryani House",
                rating: 5
              },
              {
                quote: "The integration with local payment gateways is flawless. Customers love that they can pay easily with bKash, and we love the detailed reporting at the end of the day.",
                author: "Tania Rahman",
                role: "Manager, Sylhet Spice Garden",
                rating: 5
              }
            ].map((t, i) => (
              <Card key={i} className="bg-muted/30 border-none shadow-none">
                <CardContent className="pt-8 px-8">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-lg italic mb-8 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{t.author}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-primary"></div>
        <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-background rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold sm:text-4xl mb-4">Ready to grow your restaurant?</h2>
                <p className="text-muted-foreground mb-6">Join hundreds of restaurants in Bangladesh using FoodFlow to streamline their operations.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> No setup fees</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> 14-day free trial</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Cancel anytime</li>
                </ul>
              </div>
              
              <div className="bg-muted/20 p-6 rounded-2xl border">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant">Restaurant Name</Label>
                    <Input id="restaurant" placeholder="Dhaka Biryani House" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+880..." />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-2 h-12 text-base" size="lg">
                    Start Your Free Trial
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 md:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                  <Utensils className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-primary">FoodFlow</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                The all-in-one restaurant management platform built for Bangladesh.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Hardware</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5" />
                  <span>Level 4, House 12, Road 4<br/>Banani, Dhaka 1213</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+880 1711 000000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@foodflow.com.bd</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} FoodFlow Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
