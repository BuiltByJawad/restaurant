import React, { useState } from "react";
import { Star, Clock, Info, Search, MapPin, Phone, Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// Types
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  color: string;
  popular?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Beef Biryani",
    description: "Aromatic basmati rice cooked with tender beef pieces, secret spices, and potatoes.",
    price: 350,
    emoji: "🍲",
    color: "bg-orange-100 text-orange-600",
    popular: true,
  },
  {
    id: "m2",
    name: "Chicken Tikka Masala",
    description: "Roasted marinated chicken chunks in a spiced curry sauce.",
    price: 280,
    emoji: "🍛",
    color: "bg-red-100 text-red-600",
    popular: true,
  },
  {
    id: "m3",
    name: "Mutton Kebab",
    description: "Minced mutton blended with aromatic spices and grilled to perfection.",
    price: 220,
    emoji: "🍢",
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: "m4",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils and kidney beans with butter and cream.",
    price: 180,
    emoji: "🥣",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "m5",
    name: "Mango Lassi",
    description: "Creamy yogurt-based drink with sweet alphonso mangoes.",
    price: 120,
    emoji: "🥭",
    color: "bg-yellow-50 text-yellow-500",
  },
  {
    id: "m6",
    name: "Gulab Jamun",
    description: "Deep-fried milk solids soaked in light sugar syrup flavored with cardamom.",
    price: 80,
    emoji: "🧆",
    color: "bg-orange-50 text-orange-500",
  },
];

const CATEGORIES = ["Popular", "Biryani", "Kebab", "Curry", "Drinks", "Desserts"];

export function Storefront() {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [quantities, setQuantities] = useState<Record<string, number>>({ m1: 2 }); // Pre-fill one item to show +/-

  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const totalItems = Object.values(quantities).reduce((acc, q) => acc + q, 0);
  const totalPrice = Object.entries(quantities).reduce((acc, [id, q]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return acc + (item ? item.price * q : 0);
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans relative">
      {/* Header / Hero */}
      <header className="relative bg-neutral-900 text-white pb-6">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-900 mix-blend-multiply" />
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent blur-2xl" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12">
          <div className="flex justify-between items-start mb-6">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <ChevronRight className="rotate-180 w-6 h-6" />
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-100 rounded-2xl shadow-xl border-4 border-white flex items-center justify-center text-4xl shadow-orange-900/20 shrink-0">
              🥘
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dhaka Biryani House</h1>
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-none shrink-0">Open</Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-neutral-300 text-sm md:text-base">
                <div className="flex items-center gap-1 font-medium text-white bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span>4.8</span>
                  <span className="text-neutral-400 font-normal">(500+)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>30-45 min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-orange-400" />
                  <span>Min. order ৳299</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Category Nav */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex p-4 gap-2">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "secondary"}
                  className={`rounded-full px-6 transition-all ${
                    activeCategory === cat 
                      ? "bg-neutral-900 text-white shadow-md hover:bg-neutral-800" 
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 pb-32">
        <h2 className="text-2xl font-bold mb-6 text-neutral-900 tracking-tight">{activeCategory}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {MENU_ITEMS.map((item) => {
            const quantity = quantities[item.id] || 0;
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
                <div className="p-4 flex gap-4 h-full">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-neutral-900 leading-tight">{item.name}</h3>
                        {item.popular && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-[10px] px-1.5 py-0 h-5">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-neutral-500 line-clamp-2 mt-1 mb-3">{item.description}</p>
                    </div>
                    <div className="font-semibold text-neutral-900 mt-auto">
                      ৳{item.price}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-between gap-3 w-28 shrink-0">
                    <div className={`w-full aspect-square rounded-xl ${item.color} flex items-center justify-center text-4xl shadow-inner group-hover:scale-[1.02] transition-transform`}>
                      {item.emoji}
                    </div>
                    
                    <div className="h-9 w-full flex items-center justify-center">
                      {quantity > 0 ? (
                        <div className="flex items-center justify-between w-full bg-neutral-100 rounded-lg p-1 border border-neutral-200">
                          <button 
                            onClick={() => handleDecrement(item.id)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                          <button 
                            onClick={() => handleIncrement(item.id)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-neutral-700 hover:bg-neutral-50"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleIncrement(item.id)}
                          variant="outline" 
                          size="sm" 
                          className="w-full rounded-lg text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-200 text-neutral-500">
          <h4 className="font-bold text-neutral-900 mb-4">Restaurant Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-neutral-900">Address</p>
                <p>123 Food Street, Gulshan-1</p>
                <p>Dhaka 1212, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-neutral-900">Opening Hours</p>
                <p>Mon-Sun: 11:00 AM - 11:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-2">
              <Phone className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-neutral-900">Contact</p>
                <p>+880 1234 567890</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 bg-gradient-to-t from-white via-white to-transparent pt-12">
          <div className="max-w-5xl mx-auto flex justify-end">
            <div className="w-full md:w-[360px] bg-neutral-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between animate-in slide-in-from-bottom-4 fade-in duration-300">
              <div className="flex flex-col">
                <span className="text-neutral-400 text-sm">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
                <span className="font-bold text-lg">৳{totalPrice}</span>
              </div>
              <Button className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl px-6 font-semibold">
                View Cart <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
