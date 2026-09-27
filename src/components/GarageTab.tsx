"use client";

import { useState } from "react";
import { VehicleModelItem, WrapStyleItem } from "@/types";
import CopyButton from "./CopyButton";
import {
  Car,
  Palette,
  Sparkles,
  Search,
  ExternalLink,
  Flame,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";

interface GarageTabProps {
  vehicles: VehicleModelItem[];
  wraps: WrapStyleItem[];
  onTriggerToast: (msg: string) => void;
  onOpenAddModal: (type?: "car" | "wrap") => void;
  onSelectForStudio: (car?: VehicleModelItem, wrap?: WrapStyleItem) => void;
}

export default function GarageTab({
  vehicles,
  wraps,
  onTriggerToast,
  onOpenAddModal,
  onSelectForStudio,
}: GarageTabProps) {
  const [subTab, setSubTab] = useState<"cars" | "wraps">("cars");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const carCategories = [
    "all",
    "Hypercar",
    "Supercar",
    "JDM Legend",
    "Super SUV",
    "Cyberpunk Concept",
  ];

  const wrapFinishes = [
    "all",
    "Satin",
    "Matte",
    "Liquid Metal / Chrome",
    "Chameleon Iridescent",
    "Heritage Livery",
    "Forged Carbon",
  ];

  const filteredVehicles = vehicles.filter((v) => {
    const matchesCat =
      selectedCategory === "all" || v.category === selectedCategory;
    const matchesSearch =
      v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const filteredWraps = wraps.filter((w) => {
    const matchesCat =
      selectedCategory === "all" || w.finishType === selectedCategory;
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.finishType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
            <Car className="w-3.5 h-3.5" />
            <span>AUTOMOTIVE_VAULT // GARAŞ & KAPLAMA</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Araç Modelleri & Özel Kaplama (Wrap) Arşivi
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-2xl">
            Sosyal medya paylaşımlarında kullandığınız özel araç serileri, ikonik kasa kodları ve yapay zekanın kusursuz anladığı kaplama prompt kalıpları.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAddModal(subTab === "cars" ? "car" : "wrap")}
            className="px-4 py-2 rounded-lg font-mono text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-200 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-2 cursor-pointer"
          >
            <span>+ YENİ {subTab === "cars" ? "ARAÇ" : "KAPLAMA"} EKLE</span>
          </button>
        </div>
      </div>

      {/* Sub-tab Switcher (Cars vs Wraps) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-black/40 border border-white/10">
          <button
            onClick={() => {
              setSubTab("cars");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              subTab === "cars"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Car className="w-4 h-4" />
            <span>ARAÇ MODELLERİ ({vehicles.length})</span>
          </button>

          <button
            onClick={() => {
              setSubTab("wraps");
              setSelectedCategory("all");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              subTab === "wraps"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>KAPLAMA & LIVERY ÇEŞİTLERİ ({wraps.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            type="text"
            id="garage-search-input"
            name="search-garage"
            aria-label={subTab === "cars" ? "Araç veya marka ara" : "Kaplama adı ara"}
            placeholder={
              subTab === "cars" ? "Araç veya marka ara…" : "Kaplama adı ara…"
            }
            autoComplete="off"
            spellCheck={false}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200 placeholder:text-zinc-500 focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(subTab === "cars" ? carCategories : wrapFinishes).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-white/20 text-white border border-white/30"
                : "glass-pill text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {cat === "all" ? "Tümü" : cat}
          </button>
        ))}
      </div>

      {/* CARS LIST VIEW */}
      {subTab === "cars" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredVehicles.map((car) => (
            <div
              key={car.id}
              className="rounded-xl glass-panel p-5 border border-white/[0.08] hover:border-amber-500/40 transition-all duration-200 space-y-4 hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      {car.brand}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {car.model}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {car.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {car.yearOrGen}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-sans text-zinc-300">
                  <span className="text-zinc-500 font-mono">Gövde Tipi: </span>
                  {car.bodyStyle}
                </div>

                {/* Prompt Snippet Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Yapay Zeka Prompt Kalıbı:
                    </span>
                    <CopyButton
                      textToCopy={car.promptSnippet}
                      label="Kalıbı Kopyala"
                      size="sm"
                      onCopied={() =>
                        onTriggerToast(`${car.brand} ${car.model} prompt kalıbı kopyalandı!`)
                      }
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-[#090b10] border border-white/10 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto select-all">
                    {car.promptSnippet}
                  </div>
                </div>
              </div>

              {/* Action and Tags */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {car.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectForStudio(car, undefined)}
                  className="w-full py-2 rounded-lg font-mono text-xs font-semibold bg-white/[0.04] hover:bg-amber-500/20 text-zinc-300 hover:text-amber-200 border border-white/10 hover:border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>PROMPT STÜDYOSUNA AKTAR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredVehicles.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-xl glass-panel border border-white/10 space-y-3">
              <Car className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-sm text-zinc-300 font-mono">
                Aramanıza uygun araç modeli bulunamadı.
              </p>
            </div>
          )}
        </div>
      )}

      {/* WRAPS & LIVERY LIST VIEW */}
      {subTab === "wraps" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredWraps.map((wrap) => (
            <div
              key={wrap.id}
              className="rounded-xl glass-panel p-5 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-200 space-y-4 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)] flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header with color swatch preview */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-white/20 shadow-inner flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: wrap.secondaryColor
                          ? `linear-gradient(135deg, ${wrap.colorPreview}, ${wrap.secondaryColor})`
                          : wrap.colorPreview,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/20" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide">
                        {wrap.name}
                      </h3>
                      <span className="text-xs font-mono text-cyan-300 font-medium">
                        {wrap.finishType}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    ÖZEL FOLYO
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {wrap.description}
                </p>

                {/* Recommended cars chips */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs">
                  <span className="text-[11px] font-mono text-zinc-500">
                    Önerilen Araçlar:
                  </span>
                  {wrap.recommendedCars.map((rc) => (
                    <span
                      key={rc}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-200 border border-cyan-500/20"
                    >
                      {rc}
                    </span>
                  ))}
                </div>

                {/* Prompt Snippet Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Palette className="w-3 h-3 text-cyan-400" />
                      Kaplama Prompt Kalıbı:
                    </span>
                    <CopyButton
                      textToCopy={wrap.promptSnippet}
                      label="Kaplamayı Kopyala"
                      size="sm"
                      onCopied={() =>
                        onTriggerToast(`"${wrap.name}" kaplama kalıbı kopyalandı!`)
                      }
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-[#090b10] border border-white/10 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto select-all">
                    {wrap.promptSnippet}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/5">
                <button
                  onClick={() => onSelectForStudio(undefined, wrap)}
                  className="w-full py-2 rounded-lg font-mono text-xs font-semibold bg-white/[0.04] hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>KAPLAMAYI STÜDYODA DENE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredWraps.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-xl glass-panel border border-white/10 space-y-3">
              <Palette className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-sm text-zinc-300 font-mono">
                Aramanıza uygun kaplama çeşidi bulunamadı.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
