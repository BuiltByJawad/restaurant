"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, UtensilsCrossed } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-slate-900">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A7A5A]">
            <UtensilsCrossed className="w-4.5 h-4.5 text-white" />
          </span>
          <span>FoodFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-[#0A7A5A] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild size="sm">
            <Link href="/auth/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/register">Start Free Trial</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-600 hover:text-[#0A7A5A]"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 space-y-2">
            <Button variant="outline" asChild className="w-full" size="sm">
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild className="w-full" size="sm">
              <Link href="/auth/register">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
