"use client";

import React from "react";
import { Crown } from "lucide-react";

interface NavbarProps {
  currentTab: "practice" | "progress" | "premium" | "settings";
  onTabChange: (tab: "practice" | "progress" | "premium" | "settings") => void;
  streakCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  streakCount = 3,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#fcfbf6]/90 border-b border-[#dde5b6] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Editorial Title */}
        <div
          onClick={() => onTabChange("practice")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#adc178] to-[#dde5b6] flex items-center justify-center text-[#15120f] font-serif-editorial text-lg font-bold shadow-xs border border-[#adc178]/50 group-hover:scale-105 transition-transform">
            O
          </div>
          <div className="flex flex-col">
            <span className="font-serif-editorial text-xl font-bold tracking-tight text-[#15120f] leading-none">
              Orata
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#6c584c]">
              Speaking Studio
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange("practice")}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              currentTab === "practice"
                ? "bg-[#adc178] text-[#15120f] shadow-xs font-semibold"
                : "text-[#6c584c] hover:text-[#15120f] hover:bg-[#f0ead2]/60"
            }`}
          >
            Practice
          </button>

          <button
            onClick={() => onTabChange("progress")}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              currentTab === "progress"
                ? "bg-[#adc178] text-[#15120f] shadow-xs font-semibold"
                : "text-[#6c584c] hover:text-[#15120f] hover:bg-[#f0ead2]/60"
            }`}
          >
            Progress
          </button>

          <button
            onClick={() => onTabChange("premium")}
            className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === "premium"
                ? "bg-[#a98467] text-[#fcfbf6] shadow-xs font-semibold"
                : "text-[#a98467] hover:bg-[#f0ead2]/60"
            }`}
          >
            <Crown size={14} className="text-[#a98467]" />
            <span>Studio+</span>
          </button>

          <button
            onClick={() => onTabChange("settings")}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              currentTab === "settings"
                ? "bg-[#adc178] text-[#15120f] shadow-xs font-semibold"
                : "text-[#6c584c] hover:text-[#15120f] hover:bg-[#f0ead2]/60"
            }`}
          >
            Settings
          </button>
        </nav>

        {/* Daily Streak Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0ead2] border border-[#dde5b6] text-xs font-medium text-[#40352e]">
          <span className="w-2 h-2 rounded-full bg-[#a98467] animate-pulse" />
          <span>{streakCount} Day Streak</span>
        </div>
      </div>
    </header>
  );
};
