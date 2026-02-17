"use client";

import { Search, Bell } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex items-center gap-4 px-6 py-4">
      <div className="glass-input flex items-center gap-3 px-4 py-2.5 flex-1 max-w-xl">
        <span className="flex items-center justify-center pointer-events-none">
          <Search className="w-4 h-4 text-white/40 shrink-0" />
        </span>
        <input
          type="text"
          placeholder="Neural Search"
          className="bg-transparent border-none outline-none text-sm text-white/90 placeholder:text-white/30 w-full"
        />
      </div>

      <div className="flex-1" />

      <button
        type="button"
        className="relative p-2 rounded-full hover:bg-white/5 transition-colors"
      >
        <Bell className="w-5 h-5 text-white/50" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-400 rounded-full" />
      </button>

      <div className="flex items-center gap-3 pl-3 border-l border-white/10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-xs font-bold text-white">
          AD
        </div>
        <div className="hidden sm:block">
          <p className="text-[10px] text-white/40 uppercase tracking-wider leading-none">
            Manager
          </p>
          <p className="text-sm font-medium text-white/90 leading-tight">
            Alex D.
          </p>
        </div>
      </div>
    </header>
  );
}
