import Link from "next/link";
import { UtensilsCrossed, Mail, Phone, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Demo", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "System Status", href: "#" },
    { label: "API Docs", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-white mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A7A5A]">
                <UtensilsCrossed className="w-4 h-4 text-white" />
              </span>
              FoodFlow
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Powering restaurants across Bangladesh with online ordering, smart menu management, and secure payments.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0A7A5A] shrink-0" />
                <span>Gulshan-1, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0A7A5A] shrink-0" />
                <span>+880 1712-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0A7A5A] shrink-0" />
                <span>hello@foodflow.com.bd</span>
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-white mb-4 text-sm">{section}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} FoodFlow. All rights reserved. Made with ❤️ in Bangladesh.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
