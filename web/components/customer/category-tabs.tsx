"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/lib/dummy-data";

interface CategoryTabsProps {
  categories: MenuCategory[];
}

export function CategoryTabs({ categories }: CategoryTabsProps) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`category-${id}`);
    if (element) {
      const offset = 120; // sticky header + tabs height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const categorySections = categories.map(cat => ({
        id: cat.id,
        element: document.getElementById(`category-${cat.id}`)
      }));

      const scrollPosition = window.scrollY + 130;

      for (let i = categorySections.length - 1; i >= 0; i--) {
        const section = categorySections[i];
        if (section.element && scrollPosition >= section.element.offsetTop) {
          setActiveId(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 py-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeId === category.id
                  ? "bg-[#0A7A5A] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
