"use client";

import { useState } from "react";
import { captionTemplates, CaptionPlatformData } from "@/data/captionTemplates";
import CopyButton from "./CopyButton";
import {
  Share2,
  Sparkles,
  RotateCcw,
  Check,
  Lightbulb,
  Tag,
  MessageSquare,
  HelpCircle,
  FileText,
  Sliders,
  Flame,
} from "lucide-react";

// Platform Brand SVGs
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface CaptionTemplatesTabProps {
  onTriggerToast: (msg: string) => void;
  initialVehicle?: string;
  initialMaterial?: string;
}

export default function CaptionTemplatesTab({
  onTriggerToast,
  initialVehicle = "",
  initialMaterial = "",
}: CaptionTemplatesTabProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"instagram" | "tiktok" | "youtube">("instagram");
  const [selectedLang, setSelectedLang] = useState<"tr" | "en">("tr");

  // Dynamic placeholders
  const [vehicle, setVehicle] = useState(initialVehicle || "Porsche 911 GT3 RS");
  const [material, setMaterial] = useState(initialMaterial || "24K Sıvı Altın Kintsugi");
  const [brand, setBrand] = useState("Porsche");

  // Quick preset samples
  const samplePresets = [
    { v: "BMW M4 Competition (G82)", m: "Biomorphic Chitin Exoskeleton with Bioluminescent Micro-Veins", b: "bmwm4competition" },
    { v: "Porsche 911 GT3 RS", m: "24K Sıvı Altın Kintsugi Mermer", b: "Porsche" },
    { v: "Lamborghini Revuelto", m: "Yanardöner Ejderha Pulu", b: "Lamborghini" },
    { v: "Bugatti Tourbillon", m: "Sıvı Cıva Krom Zırh", b: "Bugatti" },
  ];

  const handleApplyPreset = (preset: { v: string; m: string; b: string }) => {
    setVehicle(preset.v);
    setMaterial(preset.m);
    setBrand(preset.b);
    onTriggerToast(`"${preset.v}" şablonlara uygulandı! ✨`);
  };

  const handleClearVariables = () => {
    setVehicle("");
    setMaterial("");
    setBrand("");
    onTriggerToast("Değişkenler temizlendi. [ARAÇ] ve [MATERYAL] şablon halleriyle kopyalanabilir.");
  };

  // Replace placeholders in string
  const renderText = (rawText?: string) => {
    if (!rawText) return "";
    let res = rawText;
    const vText = vehicle.trim() ? vehicle.trim() : (selectedLang === "tr" ? "[ARAÇ]" : "[CAR]");
    const mText = material.trim() ? material.trim() : (selectedLang === "tr" ? "[MATERYAL]" : "[MATERIAL]");
    const bText = brand.trim() ? brand.trim() : (selectedLang === "tr" ? "[ARAÇ_MARKASI]" : "[CAR_BRAND]");

    // Replace both TR and EN tokens
    res = res
      .replace(/\[ARAÇ\]/g, vText)
      .replace(/\[CAR\]/g, vText)
      .replace(/\[MATERYAL\]/g, mText)
      .replace(/\[MATERIAL\]/g, mText)
      .replace(/\[ARAÇ_MARKASI\]/g, bText)
      .replace(/\[ARAÇ MARKASI\]/g, bText)
      .replace(/\[CAR_BRAND\]/g, bText)
      .replace(/\[CAR BRAND\]/g, bText);

    return res;
  };

  // Find active platform data
  const currentPlatformData = captionTemplates.find((p) => p.platformId === selectedPlatform) || captionTemplates[0];
  const activeTemplate = currentPlatformData.templates[selectedLang];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Platform & Language Selector Bar */}
      <div className="glass-panel p-5 rounded-xl border border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Platform Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedPlatform("instagram")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all cursor-pointer ${
                selectedPlatform === "instagram"
                  ? "bg-pink-500/20 text-pink-300 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.25)]"
                  : "glass-pill text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlatform("tiktok")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all cursor-pointer ${
                selectedPlatform === "tiktok"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                  : "glass-pill text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <TikTokIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>TikTok</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlatform("youtube")}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-all cursor-pointer ${
                selectedPlatform === "youtube"
                  ? "bg-red-500/20 text-red-300 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                  : "glass-pill text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <YoutubeIcon className="w-3.5 h-3.5 text-red-400" />
              <span>YouTube</span>
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] font-mono text-zinc-500 mr-1">Dil:</span>
            <button
              type="button"
              onClick={() => setSelectedLang("tr")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedLang === "tr"
                  ? "bg-white/20 text-white border border-white/30"
                  : "glass-pill text-zinc-400 hover:text-zinc-200"
              }`}
            >
              🇹🇷 Türkçe
            </button>
            <button
              type="button"
              onClick={() => setSelectedLang("en")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedLang === "en"
                  ? "bg-white/20 text-white border border-white/30"
                  : "glass-pill text-zinc-400 hover:text-zinc-200"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Live Variable Injector Inputs */}
        <div className="pt-3 border-t border-white/[0.08] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Canlı Değişken Doldurucu:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono text-zinc-500">Hazır Kombinasyon:</span>
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2 py-0.5 rounded text-[10px] font-mono glass-pill text-zinc-400 hover:text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer"
                >
                  {preset.v.split(" ")[0]} x {preset.m.split(" ")[0]}
                </button>
              ))}
              {(vehicle || material || brand) && (
                <button
                  type="button"
                  onClick={handleClearVariables}
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer flex items-center gap-1 ml-1"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Temizle
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label htmlFor="caption-vehicle-input" className="block text-[10px] font-mono text-zinc-400 mb-1">
                [ARAÇ MODELİ]
              </label>
              <input
                type="text"
                id="caption-vehicle-input"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Örn: Porsche 911 GT3 RS"
                className="w-full px-3 py-1.5 rounded-lg text-xs font-mono glass-input text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label htmlFor="caption-material-input" className="block text-[10px] font-mono text-zinc-400 mb-1">
                [MATERYAL / KAPLAMA]
              </label>
              <input
                type="text"
                id="caption-material-input"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Örn: 24K Sıvı Altın Kintsugi"
                className="w-full px-3 py-1.5 rounded-lg text-xs font-mono glass-input text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label htmlFor="caption-brand-input" className="block text-[10px] font-mono text-zinc-400 mb-1">
                [MARKA] (Hashtag için)
              </label>
              <input
                type="text"
                id="caption-brand-input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Örn: Porsche"
                className="w-full px-3 py-1.5 rounded-lg text-xs font-mono glass-input text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Algorithm Pro-Tip Banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="text-xs font-mono font-bold text-amber-300">
            {currentPlatformData.platformName} Algoritma & Etkileşim Taktikleri:
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            {currentPlatformData.tips[selectedLang]}
          </p>
        </div>
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: Ana Gönderi Metni (Caption) veya YouTube Başlığı */}
        <div className="rounded-xl glass-panel p-5 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  {selectedPlatform === "youtube" ? "Shorts Başlığı" : "Ana Açıklama"}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                {selectedPlatform === "instagram" ? "Reels & Post" : selectedPlatform === "tiktok" ? "TikTok Açıklama" : "Shorts Title"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] select-text">
              <pre className="font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                {renderText(selectedPlatform === "youtube" ? (activeTemplate.title || activeTemplate.caption) : activeTemplate.caption)}
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono text-zinc-500">
              {renderText(selectedPlatform === "youtube" ? (activeTemplate.title || activeTemplate.caption) : activeTemplate.caption).length} karakter
            </span>
            <CopyButton
              textToCopy={renderText(selectedPlatform === "youtube" ? (activeTemplate.title || activeTemplate.caption) : activeTemplate.caption)}
              label={selectedPlatform === "youtube" ? "Başlığı Kopyala" : "Açıklamayı Kopyala"}
              size="sm"
              className="bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 text-cyan-200"
              onCopied={() => onTriggerToast(`${currentPlatformData.platformName} ${selectedPlatform === "youtube" ? "başlığı" : "açıklaması"} kopyalandı! 📋`)}
            />
          </div>
        </div>

        {/* Card 1.5: YouTube Özel Açıklama (Description) */}
        {selectedPlatform === "youtube" && activeTemplate.description && (
          <div className="rounded-xl glass-panel p-5 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-400" />
                  <h3 className="text-sm font-bold text-white font-mono">
                    Shorts Açıklaması
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-red-400/80 uppercase">
                  Description
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] select-text">
                <pre className="font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                  {renderText(activeTemplate.description)}
                </pre>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-500">
                {renderText(activeTemplate.description).length} karakter
              </span>
              <CopyButton
                textToCopy={renderText(activeTemplate.description)}
                label="Açıklamayı Kopyala"
                size="sm"
                className="bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-red-200"
                onCopied={() => onTriggerToast("YouTube açıklaması kopyalandı! 📋")}
              />
            </div>
          </div>
        )}

        {/* Card 2: Tartışma / Merak Varyasyonu (Debate Variation) */}
        <div className="rounded-xl glass-panel p-5 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  {selectedPlatform === "youtube" ? "Başlık Varyasyonları" : "Yorum & Tartışma Varyasyonu"}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 uppercase">
                Yüksek Etkileşim
              </span>
            </div>

            {selectedPlatform === "youtube" && activeTemplate.titleVariations ? (
              <div className="space-y-2">
                {activeTemplate.titleVariations.map((titleVar, idx) => {
                  const renderedTitle = renderText(titleVar);
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#090b10] border border-white/[0.06] flex items-center justify-between gap-3"
                    >
                      <span className="font-mono text-xs text-zinc-200 select-text flex-1">
                        {renderedTitle}
                      </span>
                      <CopyButton
                        textToCopy={renderedTitle}
                        label="Kopyala"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 border-white/20 text-zinc-300"
                        onCopied={() => onTriggerToast("Başlık kopyalandı!")}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] select-text">
                <pre className="font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed select-text font-sans">
                  {renderText(activeTemplate.debateVariation)}
                </pre>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono text-zinc-500">
              {selectedPlatform === "youtube" ? "Shorts için ideal" : "Yorumlarda kavgayı ve izlenmeyi başlatır"}
            </span>
            {activeTemplate.debateVariation && (
              <CopyButton
                textToCopy={renderText(activeTemplate.debateVariation)}
                label="Varyasyonu Kopyala"
                size="sm"
                className="bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/50 text-amber-200"
                onCopied={() => onTriggerToast("Varyasyon kopyalandı! 🔥")}
              />
            )}
          </div>
        </div>

        {/* Card 3: Kapak & Ekran Üstü Metin (On-Screen Hook / Cover Text) */}
        <div className="rounded-xl glass-panel p-5 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  {selectedPlatform === "tiktok" ? "1. Saniye Ekran Metni (Hook)" : "Kapak Yazısı (Cover Text)"}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase">
                {selectedPlatform === "tiktok" ? "%40 İzlenme Artışı" : "Reels / Shorts Kapağı"}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] space-y-2">
              <div className="text-sm font-bold text-violet-300 font-mono select-text">
                {renderText(activeTemplate.hookText)}
              </div>
              {activeTemplate.hookTip && (
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  💡 {activeTemplate.hookTip}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono text-zinc-500">
              Videonun ilk karesine ekleyin
            </span>
            <CopyButton
              textToCopy={renderText(activeTemplate.hookText)}
              label="Kapak Metnini Kopyala"
              size="sm"
              className="bg-violet-500/20 hover:bg-violet-500/30 border-violet-500/50 text-violet-200"
              onCopied={() => onTriggerToast("Kapak metni kopyalandı! 🎯")}
            />
          </div>
        </div>

        {/* Card 4: Etiketler (Hashtags) */}
        <div className="rounded-xl glass-panel p-5 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Etiketler (Hashtags)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                {activeTemplate.hashtags.length} Etiket
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] flex flex-wrap gap-1.5 select-text">
              {activeTemplate.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.05] text-zinc-300 border border-white/10 select-text"
                >
                  {renderText(tag)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-mono text-zinc-500">
              Tüm etiketleri tek tıkla al
            </span>
            <CopyButton
              textToCopy={activeTemplate.hashtags.map((t) => renderText(t)).join(" ")}
              label="Tüm Etiketleri Kopyala"
              size="sm"
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/50 text-emerald-200"
              onCopied={() => onTriggerToast("Etiketler kopyalandı! 🏷️")}
            />
          </div>
        </div>

        {/* Card 5 (YouTube Only): Sabitlenmiş Yorum */}
        {selectedPlatform === "youtube" && activeTemplate.pinnedComment && (
          <div className="rounded-xl glass-panel p-5 border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-all lg:col-span-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white font-mono">
                    Sabitlenmiş Yorum (Pinned Comment)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-sky-400">
                  Algoritma Yorum Kancası
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.06] select-text">
                <p className="font-mono text-xs text-zinc-200 leading-relaxed select-text font-sans">
                  {renderText(activeTemplate.pinnedComment)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-500">
                Videonun altına hemen ilk yorumu atıp sabitleyin
              </span>
              <CopyButton
                textToCopy={renderText(activeTemplate.pinnedComment)}
                label="Sabit Yorumu Kopyala"
                size="sm"
                className="bg-sky-500/20 hover:bg-sky-500/30 border-sky-500/50 text-sky-200"
                onCopied={() => onTriggerToast("Sabitlenmiş yorum kopyalandı! 💬")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
