"use client";

import { useState } from "react";
import { SocialPromptItem, ChannelCategory } from "@/types";
import CopyButton from "./CopyButton";
import {
  Share2,
  Sparkles,
  Search,
  SlidersHorizontal,
  Flame,
  Layers,
  Car,
  Bot,
  Building2,
  Camera,
  Play,
  Check,
} from "lucide-react";

interface PromptsTabProps {
  prompts: SocialPromptItem[];
  onTriggerToast: (msg: string) => void;
  onOpenAddModal: () => void;
}

export default function PromptsTab({
  prompts,
  onTriggerToast,
  onOpenAddModal,
}: PromptsTabProps) {
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const channels: { key: string; label: string; icon: any }[] = [
    { key: "all", label: "Tüm Sayfalar", icon: Layers },
    { key: "araba", label: "🏎️ Araba Sayfası", icon: Car },
    { key: "cyberpunk", label: "🤖 Cyberpunk & Tech", icon: Bot },
    { key: "luxury", label: "🏙️ Lüks & Mimari", icon: Building2 },
    { key: "portrait", label: "📸 Portre & Moda", icon: Camera },
  ];

  const models = ["all", "Midjourney v6.1", "Flux.1 Dev", "Flux.1 Schnell", "SDXL"];

  const filteredPrompts = prompts.filter((item) => {
    const matchesChannel =
      selectedChannel === "all" || item.channel === selectedChannel;
    const matchesModel =
      selectedModel === "all" || item.targetModel === selectedModel;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesChannel && matchesModel && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-xl border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>MULTI_CHANNEL_PROMPTS // VAULT</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Sosyal Medya AI Sayfaları Prompt Kütüphanesi
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-2xl">
            Yönettiğiniz araba, konsept, lüks ve portre hesapları için optimize edilmiş, denenmiş yüksek etkileşimli hazır promptlar.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 rounded-lg font-mono text-xs font-bold bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/50 text-violet-200 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <span>+ YENİ PROMPT EKLE</span>
        </button>
      </div>

      {/* Filter Bars */}
      <div className="space-y-3">
        {/* Channel Selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {channels.map((chan) => {
            const Icon = chan.icon;
            const isActive = selectedChannel === chan.key;
            return (
              <button
                key={chan.key}
                onClick={() => setSelectedChannel(chan.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-violet-500/20 border border-violet-500/40 text-violet-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                    : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-violet-400" : "text-zinc-400"}`} />
                <span>{chan.label}</span>
              </button>
            );
          })}
        </div>

        {/* Model Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-mono text-zinc-500 whitespace-nowrap flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Model:
            </span>
            {models.map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  selectedModel === model
                    ? "bg-white/20 text-white border border-white/30"
                    : "bg-white/[0.04] text-zinc-400 hover:text-zinc-200 border border-white/5"
                }`}
              >
                {model === "all" ? "Tümü" : model}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input
              type="text"
              id="prompts-search-input"
              name="search-prompts"
              aria-label="Prompt veya etiket ara"
              placeholder="Prompt veya etiket ara…"
              autoComplete="off"
              spellCheck={false}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs font-mono glass-input text-zinc-200 placeholder:text-zinc-500 focus:border-violet-500/50"
            />
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredPrompts.map((item) => (
          <div
            key={item.id}
            className="rounded-xl glass-panel p-5 border border-white/[0.08] hover:border-violet-500/40 transition-all duration-200 space-y-4 hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)]"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-violet-500/15 text-violet-300 border border-violet-500/30">
                  {item.channelName}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {item.targetModel}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                  Oran: {item.aspectRatio}
                </span>
                {item.isCustom && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    KULLANICI_ÖZEL
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <CopyButton
                  textToCopy={item.prompt}
                  label="Tüm Promptu Kopyala"
                  size="md"
                  className="bg-violet-500/15 hover:bg-violet-500/25 border-violet-500/30 text-violet-200 hover:text-white"
                  onCopied={() =>
                    onTriggerToast(`"${item.title}" promptu panoya kopyalandı! 🚀`)
                  }
                />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-white tracking-wide">
              {item.title}
            </h3>

            {/* Prompt Box */}
            <div className="space-y-1.5">
              <div className="p-3.5 rounded-lg bg-[#090b10] border border-white/10 font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto select-all">
                {item.prompt}
              </div>
            </div>

            {/* Negative Prompt if exists */}
            {item.negativePrompt && (
              <div className="p-2.5 rounded bg-red-950/20 border border-red-500/20 text-xs font-mono text-red-300/80">
                <span className="text-red-400 font-bold">Negative Prompt: </span>
                <span>{item.negativePrompt}</span>
              </div>
            )}

            {/* Engagement / Viral Tip */}
            {item.engagementTip && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 font-mono">[VIRAL İPUCU]: </span>
                  <span>{item.engagementTip}</span>
                </div>
              </div>
            )}

            {/* Tags footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              {item.parameters && (
                <div className="text-[11px] font-mono text-zinc-500">
                  Parametreler: <code className="text-zinc-400">{item.parameters}</code>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredPrompts.length === 0 && (
          <div className="p-12 text-center rounded-xl glass-panel border border-white/10 space-y-3">
            <Search className="w-8 h-8 text-zinc-500 mx-auto" />
            <p className="text-sm text-zinc-300 font-mono">
              Filtrelere uygun sosyal medya promptu bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedChannel("all");
                setSelectedModel("all");
              }}
              className="text-xs font-mono text-violet-400 hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
