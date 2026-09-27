"use client";

import { useState } from "react";
import { VehicleModelItem, WrapStyleItem } from "@/types";
import { initialCarGroups, CarGroup } from "@/data/carGroups";
import { initialWrapGroups, WrapGroup } from "@/data/wrapGroups";
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
    { value: "all", label: "Tümü" },
    { value: "Süper Spor & Pist Odaklı", label: "Süper Spor" },
    { value: "Lüks & Performans SUV", label: "Lüks SUV" },
    { value: "Ultra Lüks Grand Tourer & Prestij Sedan", label: "Ultra Lüks GT" },
    { value: "Agresif Sokak & Pist Sedan / Coupe", label: "Sokak & Pist" },
    { value: "Yeni Nesil Hiper & Süper Otomobiller (Algoritma Mıknatısları)", label: "Hiper Otomobil" },
    { value: "Vahşi / \"Uzay Gemisi\" Tasarımlar (Kaydırmayı Anında Durduranlar)", label: "Uzay Tasarım" },
    { value: "Günlük/Agresif \"Widebody\" Canavarlar (Geniş Kitlelerin Favorisi)", label: "Widebody" },
  ];

  const wrapCategories = [
    { value: "all", label: "Tümü" },
    { value: "Kristalize, Mineral & Heykelsi Dokular", label: "Kristal & Mineral" },
    { value: "Biyomimetik, Egzotik & Organik Yüzeyler", label: "Biyomimetik & Egzotik" },
    { value: "Fütüristik Kompozit & Akışkan Metaller", label: "Fütüristik Metal" },
    { value: "Optik & Kinetik Cam/Prizma Katmanları", label: "Optik & Prizma" },
    { value: "Mat, Saten & Frozen Fabrika Renkleri (OEM+ Lüks)", label: "OEM+ Lüks" },
    { value: "Gerçek Karbon Fiber & Kompozit Çeşitleri", label: "Karbon Fiber" },
    { value: "Derin Yansımalı Sıvı Metal & Kromlar (Inozetek / Hexis)", label: "Sıvı Krom" },
    { value: "Sedef, Bukalemun & İpeksi Geçişler (Gerçekçi)", label: "Sedef & Bukalemun" },
    { value: "Bespoke İç / Dış Detay Dokuları", label: "Bespoke Detay" },
    { value: "Fütüristik Kaplamalar (Cyber & Neon)", label: "Cyber & Neon" },
    { value: "Fantastik Kaplamalar (Mitik & Kozmik)", label: "Mitik & Kozmik" },
  ];

  // Group-based filtering for cars
  const filteredCarGroups = initialCarGroups
    .map((group) => {
      const matchesCategory =
        selectedCategory === "all" || group.title === selectedCategory;

      if (!matchesCategory) return null;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return group;

      const titleMatches = group.title.toLowerCase().includes(q);
      const matchingCars = group.cars.filter((car) =>
        car.toLowerCase().includes(q)
      );

      if (titleMatches) return group;
      if (matchingCars.length > 0) return { ...group, cars: matchingCars };
      return null;
    })
    .filter(Boolean) as CarGroup[];

  const totalCarsCount = initialCarGroups.reduce(
    (acc, g) => acc + g.cars.length,
    0
  );

  // Group-based filtering for wraps
  const filteredWrapGroups = initialWrapGroups
    .map((group) => {
      const matchesCategory =
        selectedCategory === "all" || group.title === selectedCategory;

      if (!matchesCategory) return null;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return group;

      const titleMatches = group.title.toLowerCase().includes(q);
      const matchingWraps = group.wraps.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          (w.desc && w.desc.toLowerCase().includes(q))
      );

      if (titleMatches) return group;
      if (matchingWraps.length > 0) return { ...group, wraps: matchingWraps };
      return null;
    })
    .filter(Boolean) as WrapGroup[];

  const totalWrapsCount = initialWrapGroups.reduce(
    (acc, g) => acc + g.wraps.length,
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
            <Car className="w-3.5 h-3.5" />
            <span>AUTOMOTIVE_VAULT // GARAJ & KAPLAMA</span>
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
            <span>ARAÇ GRUPLARI ({initialCarGroups.length} Grup // {totalCarsCount} Model)</span>
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
            <span>KAPLAMA GRUPLARI ({initialWrapGroups.length} Grup // {totalWrapsCount} Çeşit)</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            type="text"
            id="garage-search-input"
            name="search-garage"
            aria-label={subTab === "cars" ? "Araç veya grup ara" : "Kaplama adı ara"}
            placeholder={
              subTab === "cars" ? "Araç veya grup ara…" : "Kaplama adı veya doku ara…"
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
      <div className="flex flex-wrap items-center gap-2">
        {(subTab === "cars" ? carCategories : wrapCategories).map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat.value
                ? "bg-white/20 text-white border border-white/30"
                : "glass-pill text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* CARS GROUP CARDS VIEW */}
      {subTab === "cars" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCarGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl glass-panel p-6 border border-white/[0.08] hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-[0_8px_30px_rgba(245,158,11,0.09)]"
            >
              <div className="space-y-3.5">
                {/* Group Header */}
                <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {group.badge}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white tracking-wide mt-2">
                      {group.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white/[0.06] text-zinc-300 border border-white/10 shrink-0">
                    {group.cars.length} Araç
                  </span>
                </div>

                {/* Cars Collective List - Clean, easily selectable with mouse cursor */}
                <div className="p-4 rounded-xl bg-[#090b10]/95 border border-white/[0.06] select-text">
                  <div className="space-y-1.5 select-text font-mono text-sm leading-relaxed text-zinc-100">
                    {group.cars.map((carName, idx) => (
                      <div
                        key={idx}
                        className="py-1.5 px-3 rounded-lg hover:bg-white/[0.06] hover:text-amber-300 transition-colors select-text cursor-text flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70 shrink-0 select-none" />
                        <span className="select-text font-medium text-zinc-200 hover:text-white">
                          {carName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredCarGroups.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-xl glass-panel border border-white/10 space-y-3">
              <Car className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-sm text-zinc-300 font-mono">
                Aramanıza uygun araç grubu bulunamadı.
              </p>
            </div>
          )}
        </div>
      )}

      {/* WRAPS GROUP CARDS VIEW */}
      {subTab === "wraps" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWrapGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl glass-panel p-6 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-[0_8px_30px_rgba(6,182,212,0.09)]"
            >
              <div className="space-y-3.5">
                {/* Group Header */}
                <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {group.badge}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white tracking-wide mt-2">
                      {group.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white/[0.06] text-zinc-300 border border-white/10 shrink-0">
                    {group.wraps.length} Kaplama
                  </span>
                </div>

                {/* Wraps Collective List - Clean, selectable with mouse cursor */}
                <div className="p-4 rounded-xl bg-[#090b10]/95 border border-white/[0.06] select-text">
                  <div className="space-y-2 select-text font-mono text-sm leading-relaxed text-zinc-100">
                    {group.wraps.map((wrap, idx) => (
                      <div
                        key={idx}
                        className="py-1.5 px-3 rounded-lg hover:bg-white/[0.06] transition-colors select-text cursor-text flex flex-col gap-0.5"
                      >
                        <div className="flex items-start gap-2 select-text">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shrink-0 mt-1.5 select-none" />
                          <span className="select-text font-medium text-zinc-100 hover:text-cyan-300 transition-colors">
                            {wrap.title}
                          </span>
                        </div>
                        {wrap.desc && (
                          <div className="pl-3.5 text-xs text-zinc-400 select-text font-sans leading-normal">
                            {wrap.desc}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredWrapGroups.length === 0 && (
            <div className="col-span-full p-12 text-center rounded-xl glass-panel border border-white/10 space-y-3">
              <Palette className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-sm text-zinc-300 font-mono">
                Aramanıza uygun kaplama grubu bulunamadı.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
