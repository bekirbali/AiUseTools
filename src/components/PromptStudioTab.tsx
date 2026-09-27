"use client";

import { useState, useId } from "react";
import {
  VehicleModelItem,
  WrapStyleItem,
  EnvironmentPreset,
  CameraAnglePreset,
  SocialPromptItem,
} from "@/types";
import CopyButton from "./CopyButton";
import {
  Sparkles,
  Car,
  Palette,
  Camera,
  Sun,
  Dices,
  Sliders,
  Check,
  BookmarkPlus,
  Layers,
  Wand2,
} from "lucide-react";

interface PromptStudioTabProps {
  vehicles: VehicleModelItem[];
  wraps: WrapStyleItem[];
  environments: EnvironmentPreset[];
  cameraAngles: CameraAnglePreset[];
  selectedVehicleId?: string;
  selectedWrapId?: string;
  onTriggerToast: (msg: string) => void;
  onSavePromptToVault: (newPrompt: SocialPromptItem) => void;
}

export default function PromptStudioTab({
  vehicles,
  wraps,
  environments,
  cameraAngles,
  selectedVehicleId,
  selectedWrapId,
  onTriggerToast,
  onSavePromptToVault,
}: PromptStudioTabProps) {
  const [currentCarId, setCurrentCarId] = useState(
    selectedVehicleId || vehicles[0]?.id || ""
  );
  const [currentWrapId, setCurrentWrapId] = useState(
    selectedWrapId || wraps[0]?.id || ""
  );
  const [currentEnvId, setCurrentEnvId] = useState(environments[0]?.id || "");
  const [currentAngleId, setCurrentAngleId] = useState(
    cameraAngles[0]?.id || ""
  );

  // Modifiers
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9" | "1:1">("9:16");
  const [targetEngine, setTargetEngine] = useState<"Midjourney v6.1" | "Flux.1 Dev">("Midjourney v6.1");
  const [includeRainDroplets, setIncludeRainDroplets] = useState(true);
  const [includeMotionBlur, setIncludeMotionBlur] = useState(false);
  const [includeFilmGrain, setIncludeFilmGrain] = useState(true);
  const [includeCarbonAero, setIncludeCarbonAero] = useState(true);

  const selectedCar = vehicles.find((v) => v.id === currentCarId) || vehicles[0];
  const selectedWrap = wraps.find((w) => w.id === currentWrapId) || wraps[0];
  const selectedEnv = environments.find((e) => e.id === currentEnvId) || environments[0];
  const selectedAngle = cameraAngles.find((a) => a.id === currentAngleId) || cameraAngles[0];

  // Randomizer
  const handleRandomize = () => {
    const randomCar = vehicles[Math.floor(Math.random() * vehicles.length)];
    const randomWrap = wraps[Math.floor(Math.random() * wraps.length)];
    const randomEnv = environments[Math.floor(Math.random() * environments.length)];
    const randomAngle = cameraAngles[Math.floor(Math.random() * cameraAngles.length)];

    setCurrentCarId(randomCar.id);
    setCurrentWrapId(randomWrap.id);
    setCurrentEnvId(randomEnv.id);
    setCurrentAngleId(randomAngle.id);
    onTriggerToast(`Rastgele kombinasyon oluşturuldu: ${randomCar.brand} + ${randomWrap.name} 🎲`);
  };

  // Build the prompt dynamically
  const buildPrompt = () => {
    const parts: string[] = [];

    // Shot type & Angle
    if (selectedAngle) {
      parts.push(`Cinematic ultra-realistic automotive photograph, ${selectedAngle.promptSnippet}`);
    }

    // Car & Wrap
    if (selectedCar && selectedWrap) {
      parts.push(`featuring a ${selectedCar.promptSnippet}, ${selectedWrap.promptSnippet}`);
    }

    // Environment & Lighting
    if (selectedEnv) {
      parts.push(selectedEnv.promptSnippet);
    }

    // Modifiers
    const modifiers: string[] = [];
    if (includeRainDroplets) modifiers.push("crisp water droplets beaded on the curved bodywork");
    if (includeMotionBlur) modifiers.push("dynamic shutter motion blur on rims and road surface");
    if (includeCarbonAero) modifiers.push("exposed gloss twill carbon fiber aerodynamic splitters and mirrors");
    if (includeFilmGrain) modifiers.push("shot on 35mm Hasselblad medium format, Kodachrome film grain texture, natural specular falloff");

    if (modifiers.length > 0) {
      parts.push(modifiers.join(", "));
    }

    // Engine specific tails
    if (targetEngine === "Midjourney v6.1") {
      parts.push(`--ar ${aspectRatio} --v 6.1 --style raw --q 2`);
    } else {
      parts.push(`ultra-detailed, 8k resolution, raytracing reflections, photorealistic render [Format: ${aspectRatio}]`);
    }

    return parts.join(". ");
  };

  const generatedPrompt = buildPrompt();

  const handleSaveToVault = () => {
    const newPrompt: SocialPromptItem = {
      id: `prompt-custom-${Date.now()}`,
      channel: "araba",
      channelName: "Otomobil & Hypercar (Reels / TikTok)",
      title: `${selectedCar.brand} ${selectedCar.model} - ${selectedWrap.name}`,
      prompt: generatedPrompt,
      targetModel: targetEngine,
      aspectRatio: aspectRatio,
      parameters: targetEngine === "Midjourney v6.1" ? `--ar ${aspectRatio} --v 6.1 --style raw` : `--ar ${aspectRatio}`,
      tags: [selectedCar.brand, selectedWrap.name, selectedEnv.name.split(" ")[0]],
      engagementTip: "Stüdyoda özel üretilen kombinasyon.",
      isCustom: true,
    };
    onSavePromptToVault(newPrompt);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Studio Header */}
      <div className="glass-panel p-6 rounded-xl border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-2">
            <Wand2 className="w-3.5 h-3.5" />
            <span>INSTANT_PROMPT_STUDIO // GENERATOR</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Prompt Stüdyosu: Akıllı Araç & Kaplama Sentezleyici
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-2xl">
            Aracınızı, özel kaplama çeşidini, çekim açısını ve ortamı seçin; yapay zeka için en kusursuz fotogerçekçi prompt anında üretilsin.
          </p>
        </div>

        <button
          onClick={handleRandomize}
          className="px-4 py-2.5 rounded-lg font-mono text-xs font-bold bg-white/[0.06] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-emerald-200 transition-all flex items-center gap-2 shadow-lg cursor-pointer self-start md:self-auto"
        >
          <Dices className="w-4 h-4 text-emerald-400 animate-spin-hover" />
          <span>RASTGELE EFSANE KOMBİNASYON 🎲</span>
        </button>
      </div>

      {/* Main Studio Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Vehicle Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-semibold text-zinc-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Car className="w-3.5 h-3.5" /> [1] ARAÇ MODELİ SEÇİMİ:
              </span>
              <span className="text-[11px] text-zinc-500">{selectedCar?.brand} {selectedCar?.model}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {vehicles.map((car) => {
                const isSelected = car.id === currentCarId;
                return (
                  <button
                    key={car.id}
                    onClick={() => setCurrentCarId(car.id)}
                    className={`p-2.5 rounded-lg text-left transition-all text-xs font-mono border cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="text-[10px] text-zinc-500 truncate">{car.brand}</div>
                    <div className="font-bold truncate text-white">{car.model}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Wrap Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-semibold text-zinc-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Palette className="w-3.5 h-3.5" /> [2] KAPLAMA (WRAP / LIVERY) SEÇİMİ:
              </span>
              <span className="text-[11px] text-zinc-500">{selectedWrap?.name}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {wraps.map((wrap) => {
                const isSelected = wrap.id === currentWrapId;
                return (
                  <button
                    key={wrap.id}
                    onClick={() => setCurrentWrapId(wrap.id)}
                    className={`p-2.5 rounded-lg text-left transition-all text-xs font-mono border flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                        : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/30"
                      style={{
                        background: wrap.secondaryColor
                          ? `linear-gradient(135deg, ${wrap.colorPreview}, ${wrap.secondaryColor})`
                          : wrap.colorPreview,
                      }}
                    />
                    <div className="truncate font-semibold text-zinc-200">{wrap.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Environment Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-semibold text-zinc-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-violet-300">
                <Sun className="w-3.5 h-3.5" /> [3] ÇEVRE & IŞIKLANDIRMA:
              </span>
              <span className="text-[11px] text-zinc-500">{selectedEnv?.timeOfDay}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {environments.map((env) => {
                const isSelected = env.id === currentEnvId;
                return (
                  <button
                    key={env.id}
                    onClick={() => setCurrentEnvId(env.id)}
                    className={`p-3 rounded-lg text-left transition-all text-xs font-mono border cursor-pointer ${
                      isSelected
                        ? "bg-violet-500/15 border-violet-500/50 text-violet-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                        : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="font-bold text-white">{env.name}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{env.timeOfDay}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Camera Angle */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-semibold text-zinc-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Camera className="w-3.5 h-3.5" /> [4] KAMERA AÇISI & KOMPOZİSYON:
              </span>
              <span className="text-[11px] text-zinc-500">{selectedAngle?.name}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cameraAngles.map((cam) => {
                const isSelected = cam.id === currentAngleId;
                return (
                  <button
                    key={cam.id}
                    onClick={() => setCurrentAngleId(cam.id)}
                    className={`p-2.5 rounded-lg text-left transition-all text-xs font-mono border cursor-pointer ${
                      isSelected
                        ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="font-bold text-zinc-200">{cam.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Output & Modifiers */}
        <div className="lg:col-span-5 space-y-6">
          {/* Format & Engine settings */}
          <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-4">
            <h4 className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>RENDER AYARLARI & PARAMETRELER</span>
            </h4>

            {/* Target AI Engine */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400">Hedef Model:</span>
              <div className="grid grid-cols-2 gap-2">
                {(["Midjourney v6.1", "Flux.1 Dev"] as const).map((eng) => (
                  <button
                    key={eng}
                    onClick={() => setTargetEngine(eng)}
                    className={`py-1.5 px-3 rounded text-xs font-mono font-medium border cursor-pointer ${
                      targetEngine === eng
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                        : "glass-pill text-zinc-400 hover:text-white"
                    }`}
                  >
                    {eng}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400">En/Boy Oranı (Sosyal Medya Formatı):</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "9:16", label: "9:16 (Reels/Shorts)" },
                  { key: "16:9", label: "16:9 (Yatay/YT)" },
                  { key: "1:1", label: "1:1 (Kare Post)" },
                ].map((ar) => (
                  <button
                    key={ar.key}
                    onClick={() => setAspectRatio(ar.key as any)}
                    className={`py-1.5 px-2 rounded text-[11px] font-mono font-medium border cursor-pointer ${
                      aspectRatio === ar.key
                        ? "bg-violet-500/20 border-violet-500/50 text-violet-200"
                        : "glass-pill text-zinc-400 hover:text-white"
                    }`}
                  >
                    {ar.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[11px] font-mono text-zinc-400 block">
                Sinematik Fotogerçekçilik Detayları:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2 rounded bg-black/30 border border-white/5 cursor-pointer text-xs font-mono text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    checked={includeRainDroplets}
                    onChange={(e) => setIncludeRainDroplets(e.target.checked)}
                    className="rounded border-zinc-600 accent-cyan-500"
                  />
                  <span>Su Damlacıkları</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-black/30 border border-white/5 cursor-pointer text-xs font-mono text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    checked={includeMotionBlur}
                    onChange={(e) => setIncludeMotionBlur(e.target.checked)}
                    className="rounded border-zinc-600 accent-cyan-500"
                  />
                  <span>Tekerlek Hareketi</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-black/30 border border-white/5 cursor-pointer text-xs font-mono text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    checked={includeCarbonAero}
                    onChange={(e) => setIncludeCarbonAero(e.target.checked)}
                    className="rounded border-zinc-600 accent-cyan-500"
                  />
                  <span>Karbon Fiber Aero</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded bg-black/30 border border-white/5 cursor-pointer text-xs font-mono text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    checked={includeFilmGrain}
                    onChange={(e) => setIncludeFilmGrain(e.target.checked)}
                    className="rounded border-zinc-600 accent-cyan-500"
                  />
                  <span>35mm Film Greni</span>
                </label>
              </div>
            </div>
          </div>

          {/* Generated Prompt Output Box */}
          <div className="rounded-xl glass-panel-elevated p-5 border border-cyan-500/30 space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CANLI ÜRETİLEN PROMPT ÇIKTISI</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {generatedPrompt.length} karakter
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#07090e] border border-cyan-500/20 font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto max-h-56 select-all">
              {generatedPrompt}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <CopyButton
                textToCopy={generatedPrompt}
                label="Promptu Kopyala"
                size="md"
                className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 text-cyan-200 py-2.5 text-xs font-bold"
                onCopied={() =>
                  onTriggerToast("Sentezlenen araba promptu panoya kopyalandı! 🚀")
                }
              />

              <button
                onClick={handleSaveToVault}
                className="w-full py-2.5 px-3 rounded font-mono text-xs font-bold bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/50 text-violet-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>ARŞİVE KAYDET</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
