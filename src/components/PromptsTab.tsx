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
  FileText,
  Pencil,
} from "lucide-react";
import CaptionTemplatesTab from "./CaptionTemplatesTab";

interface PromptsTabProps {
  prompts: SocialPromptItem[];
  onTriggerToast: (msg: string) => void;
  onOpenAddModal: () => void;
  onEditPrompt?: (item: SocialPromptItem) => void;
  initialMode?: "prompts" | "captions";
  initialVehicle?: string;
  initialMaterial?: string;
}

export default function PromptsTab({
  prompts,
  onTriggerToast,
  onOpenAddModal,
  onEditPrompt,
  initialMode = "prompts",
  initialVehicle = "",
  initialMaterial = "",
}: PromptsTabProps) {
  const [activeMode, setActiveMode] = useState<"prompts" | "captions">(initialMode);
  const [selectedPromptId, setSelectedPromptId] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const models = ["all", "Omni 1.1"];

  const filteredPrompts = prompts.filter((item) => {
    const matchesPromptTab =
      selectedPromptId === "all" || item.id === selectedPromptId;
    const matchesModel =
      selectedModel === "all" || item.targetModel === selectedModel;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPromptTab && matchesModel && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-xl border border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>AI_PROMPTS // VAULT</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Sinematik Video & Görsel Prompt Kütüphanesi
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-2xl">
            Sosyal medya algoritmaları için optimize edilmiş yüksek etkileşimli promptlar. İster tümünü listeleyin, ister sekmelerden tek tek inceleyin.
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 rounded-lg font-mono text-xs font-bold bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/50 text-violet-200 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <span>+ YENİ PROMPT EKLE</span>
        </button>
      </div>

      {/* Mode Switcher: Video Prompts vs Açıklama Şablonları */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveMode("prompts")}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeMode === "prompts"
              ? "bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>VİDEO PROMPTLARI ({prompts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("captions")}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeMode === "captions"
              ? "bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.25)]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>AÇIKLAMA ŞABLONLARI (INSTA, TIKTOK, YT)</span>
        </button>
      </div>

      {activeMode === "captions" ? (
        <CaptionTemplatesTab
          onTriggerToast={onTriggerToast}
          initialVehicle={initialVehicle}
          initialMaterial={initialMaterial}
        />
      ) : (
        <>
          {/* Filter Bars */}
          <div className="space-y-3">
        {/* Per-Prompt Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          {/* Tüm Promptlar Tab */}
          <button
            onClick={() => setSelectedPromptId("all")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${
              selectedPromptId === "all"
                ? "bg-violet-500/20 border border-violet-500/40 text-violet-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08]"
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${selectedPromptId === "all" ? "text-violet-400" : "text-zinc-400"}`} />
            <span>Tüm Sayfalar ({prompts.length})</span>
          </button>

          {/* Individual Prompt Tabs */}
          {prompts.map((p, idx) => {
            const isActive = selectedPromptId === p.id;
            const isMain = p.tags?.includes("Main Prompt");
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPromptId(p.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? isMain
                      ? "bg-amber-500/20 border border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40"
                      : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40"
                    : isMain
                    ? "glass-pill text-amber-300/80 hover:text-amber-200 hover:bg-amber-500/10 border-amber-500/30"
                    : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08]"
                }`}
              >
                <span>{p.tabTitle || `${idx + 1}. ${p.title.slice(0, 24)}...`}</span>
              </button>
            );
          })}
        </div>

        {/* Model Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
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
            className={`rounded-xl glass-panel p-5 border transition-all duration-200 space-y-4 ${
              item.tags.includes("Main Prompt")
                ? "border-amber-500/40 bg-gradient-to-b from-amber-500/[0.04] to-transparent shadow-[0_8px_30px_rgba(245,158,11,0.08)] ring-1 ring-amber-500/20"
                : "border-white/[0.08] hover:border-violet-500/40 hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)]"
            }`}
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2 flex-wrap">
                {item.tags.includes("Main Prompt") && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-gradient-to-r from-amber-500/25 to-yellow-500/20 text-amber-200 border border-amber-400/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    ★ MAIN PROMPT // ANA ŞABLON
                  </span>
                )}
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

                {onEditPrompt && (
                  <button
                    type="button"
                    onClick={() => onEditPrompt(item)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/[0.05] hover:bg-violet-500/20 text-zinc-300 hover:text-violet-200 border border-white/10 hover:border-violet-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Promptu Düzenle"
                    aria-label={`${item.title} promptunu düzenle`}
                  >
                    <Pencil className="w-3.5 h-3.5 text-violet-400" />
                    <span>Düzenle</span>
                  </button>
                )}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-white tracking-wide">
              {item.title}
            </h3>

            {/* Prompt Box */}
            <div className="space-y-1.5">
              <div className="p-3.5 rounded-lg bg-[#090b10] border border-white/10 font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto select-all whitespace-pre-wrap">
                {item.prompt}
              </div>
            </div>

            {/* Presets / Fluid Variants if exists */}
            {item.presets && item.presets.length > 0 && (
              <div className="p-4 rounded-xl bg-black/50 border border-violet-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-violet-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>{(item.presetsTitle || "Seçenekler").toUpperCase()} ({item.presets.length} Çeşit):</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    Doğrudan seçilip kopyalanabilir
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 select-text">
                  {item.presets.map((preset, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2.5 rounded-lg bg-[#090b10] border border-white/5 hover:border-violet-500/40 transition-colors select-text cursor-text"
                    >
                      <div className="text-xs font-mono font-medium text-cyan-200 select-text flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 select-none" />
                        <span className="select-text">{preset.label}</span>
                      </div>
                      {preset.note && (
                        <div className="text-[11px] text-zinc-400 font-sans mt-1 pl-3 select-text leading-tight">
                          {preset.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                setSelectedPromptId("all");
                setSelectedModel("all");
              }}
              className="text-xs font-mono text-violet-400 hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}
