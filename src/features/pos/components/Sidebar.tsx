"use client";

import { type ReactNode } from "react";
import {
  PlusCircle,
  Shirt,
  Footprints,
  Watch,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Category } from "../store";

export interface NavItem {
  icon: ReactNode;
  label: string;
  category: Category;
}

export interface SidebarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: <PlusCircle className="w-5 h-5" />, label: "New", category: "all" },
  {
    icon: <Shirt className="w-5 h-5" />,
    label: "Apparel",
    category: "apparel",
  },
  {
    icon: <Footprints className="w-5 h-5" />,
    label: "Footwear",
    category: "footwear",
  },
  {
    icon: <Watch className="w-5 h-5" />,
    label: "Accessories",
    category: "accessories",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Clienteling",
    category: "all",
  },
];

export function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="glass-sidebar w-20 flex flex-col items-center py-6 gap-1 shrink-0">
      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center mb-6">
        <span className="text-white font-bold text-sm italic tracking-tight">
          N
        </span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            activeCategory === item.category && item.label !== "Clienteling";

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onCategoryChange(item.category)}
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5",
              )}
            >
              {item.icon}
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
      >
        <Settings className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-wide">Settings</span>
      </button>
    </aside>
  );
}
