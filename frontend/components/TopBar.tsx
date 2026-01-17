"use client";

import { Moon, Search, Settings, UserCircle2, PanelLeft } from "lucide-react";

export default function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <div className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 h-14 flex items-center gap-3">
        <button className="btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <PanelLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 min-w-[240px]">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-sm" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">AgentTrip AI</div>
            <div className="text-xs text-zinc-500">Plan trips in minutes</div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[560px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              placeholder="Find a past itinerary…"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </button>
          <button className="btn" aria-label="Dark mode">
            <Moon className="h-4 w-4" />
          </button>
          <button className="btn" aria-label="Profile">
            <UserCircle2 className="h-4 w-4" />
            <span className="hidden sm:inline">Talha</span>
          </button>
        </div>
      </div>
    </div>
  );
}
