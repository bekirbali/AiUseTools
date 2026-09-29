"use client";

import {
  Terminal,
  Share2,
  Car,
  Wand2,
  Bot,
  Plus,
  Sparkles,
  Command,
} from "lucide-react";

interface NavbarProps {
  activeTab: "skills" | "prompts" | "garage" | "studio" | "chat";
  onTabChange: (tab: "skills" | "prompts" | "garage" | "studio" | "chat") => void;
  onOpenAddModal: () => void;
  totalSkillsCount: number;
  totalPromptsCount: number;
  totalCarsCount: number;
}

interface TabItem {
  id: "skills" | "prompts" | "garage" | "studio" | "chat";
  label: string;
  icon: any;
  count?: number;
  badge?: string;
  badgeColor: string;
}

export default function Navbar({
  activeTab,
  onTabChange,
  onOpenAddModal,
  totalSkillsCount,
  totalPromptsCount,
  totalCarsCount,
}: NavbarProps) {
  const tabs: TabItem[] = [
    {
      id: "skills",
      label: "AI Skilleri",
      icon: Terminal,
      count: totalSkillsCount,
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      id: "prompts",
      label: "Promptlar",
      icon: Share2,
      count: totalPromptsCount,
      badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    },
    {
      id: "garage",
      label: "Araç & Kaplama",
      icon: Car,
      count: totalCarsCount,
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "studio",
      label: "Prompt Stüdyosu",
      icon: Wand2,
      badge: "CANLI",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "chat",
      label: "Omni-AI",
      icon: Bot,
      badge: "ONLINE",
      badgeColor: "text-sky-400 bg-sky-500/15 border-sky-500/30",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10 shrink-0 aspect-square rounded-xl bg-[#090b10] border border-cyan-500/30 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:border-cyan-400/60 transition-all cursor-pointer group">
              <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
              <img
                src="/logo.svg"
                alt="AI Studio Logo"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-white">
                  AI<span className="text-cyan-400 ml-1">STUDIO</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-zinc-400 border border-white/10">
                  v2.4
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Ana Gezinme Sekmeleri">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id as any)}
                  aria-pressed={isActive}
                  className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap font-mono font-medium transition-colors duration-150 flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                    isActive
                      ? "bg-white/[0.1] text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? "text-cyan-400" : "text-zinc-400"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-mono tabular-nums border ${tab.badgeColor}`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold border ${tab.badgeColor}`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenAddModal}
              aria-label="Yeni içerik ekle"
              className="px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-200 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">İÇERİK EKLE</span>
              <span className="sm:hidden">EKLE</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Tab Strip */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2.5 border-t border-white/5 scrollbar-none" aria-label="Mobil Gezinme Sekmeleri">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id as any)}
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20"
                    : "glass-pill text-zinc-400 hover:text-white"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-cyan-400" : "text-zinc-400"
                  }`}
                  aria-hidden="true"
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
