"use client";

import { Moon, Search, Settings, UserCircle2, PanelLeft } from "lucide-react";

export default function TopBar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <div className="sticky top-0 z-30 border-b border-white/20 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1700px] px-4 lg:px-6 h-16 flex items-center gap-4">
        <button className="btn border-none shadow-none bg-transparent hover:bg-black/5" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <PanelLeft className="h-5 w-5 opacity-70" />
        </button>

        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20" />
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight text-zinc-800">AgentTrip</div>
            <div className="text-[11px] font-medium text-zinc-500">AI Planner</div>
          </div>
        </div>

        <div className="flex-1 flex justify-center max-w-2xl mx-auto">
          <div className="w-full relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              placeholder="Search itineraries..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/5 bg-black/5 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn border-none bg-transparent hover:bg-black/5" aria-label="Settings">
            <Settings className="h-5 w-5 text-zinc-600" />
          </button>
          <button className="btn border-none bg-transparent hover:bg-black/5" aria-label="Profile">
            <div className="h-8 w-8 rounded-full bg-zinc-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Talha" alt="Avatar" className="h-full w-full object-cover" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
