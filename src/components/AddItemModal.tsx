"use client";

import { useState } from "react";
import {
  SkillItem,
  SocialPromptItem,
  VehicleModelItem,
  WrapStyleItem,
} from "@/types";
import { X, Plus, Terminal, Share2, Car, Palette } from "lucide-react";

interface AddItemModalProps {
  isOpen: boolean;
  initialType?: "skill" | "prompt" | "car" | "wrap";
  onClose: () => void;
  onAddSkill: (skill: SkillItem) => void;
  onAddPrompt: (prompt: SocialPromptItem) => void;
  onAddCar: (car: VehicleModelItem) => void;
  onAddWrap: (wrap: WrapStyleItem) => void;
}

export default function AddItemModal({
  isOpen,
  initialType = "skill",
  onClose,
  onAddSkill,
  onAddPrompt,
  onAddCar,
  onAddWrap,
}: AddItemModalProps) {
  const [itemType, setItemType] = useState<"skill" | "prompt" | "car" | "wrap">(
    initialType
  );

  // Skill Form State
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState<any>("agent");
  const [skillDesc, setSkillDesc] = useState("");
  const [skillCmd, setSkillCmd] = useState("");
  const [skillExample, setSkillExample] = useState("");
  const [skillTags, setSkillTags] = useState("");

  // Prompt Form State
  const [promptTitle, setPromptTitle] = useState("");
  const [promptChannel, setPromptChannel] = useState<any>("araba");
  const [promptText, setPromptText] = useState("");
  const [promptModel, setPromptModel] = useState<any>("Omni 1.1");
  const [promptRatio, setPromptRatio] = useState<any>("9:16");
  const [promptTip, setPromptTip] = useState("");
  const [promptTags, setPromptTags] = useState("");

  // Car Form State
  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carCategory, setCarCategory] = useState<any>("Supercar");
  const [carGen, setCarGen] = useState("");
  const [carSnippet, setCarSnippet] = useState("");
  const [carTags, setCarTags] = useState("");

  // Wrap Form State
  const [wrapName, setWrapName] = useState("");
  const [wrapFinish, setWrapFinish] = useState<any>("Satin");
  const [wrapColor, setWrapColor] = useState("#8b5cf6");
  const [wrapDesc, setWrapDesc] = useState("");
  const [wrapSnippet, setWrapSnippet] = useState("");
  const [wrapCars, setWrapCars] = useState("Porsche GT3 RS, BMW M4");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (itemType === "skill") {
      if (!skillName.trim() || !skillCmd.trim()) return;
      onAddSkill({
        id: `skill-custom-${Date.now()}`,
        name: skillName,
        category: skillCategory,
        description: skillDesc || "Özel eklenen yapay zeka skilli.",
        installCommand: skillCmd,
        usageExample: skillExample || skillCmd,
        tags: skillTags.split(",").map((t) => t.trim()).filter(Boolean),
        isCustom: true,
      });
    } else if (itemType === "prompt") {
      if (!promptTitle.trim() || !promptText.trim()) return;
      onAddPrompt({
        id: `prompt-custom-${Date.now()}`,
        title: promptTitle,
        channel: promptChannel,
        channelName:
          promptChannel === "araba"
            ? "Otomobil & Hypercar"
            : promptChannel === "cyberpunk"
            ? "Cyberpunk & Tech"
            : promptChannel === "luxury"
            ? "Lüks & Mimari"
            : "Özel Kanal",
        prompt: promptText,
        targetModel: promptModel,
        aspectRatio: promptRatio,
        engagementTip: promptTip,
        tags: promptTags.split(",").map((t) => t.trim()).filter(Boolean),
        isCustom: true,
      });
    } else if (itemType === "car") {
      if (!carBrand.trim() || !carModel.trim()) return;
      onAddCar({
        id: `car-custom-${Date.now()}`,
        brand: carBrand,
        model: carModel,
        category: carCategory,
        yearOrGen: carGen || "Özel Model",
        bodyStyle: "Spor Otomobil",
        promptSnippet: carSnippet || `${carBrand} ${carModel} high performance vehicle`,
        tags: carTags.split(",").map((t) => t.trim()).filter(Boolean),
        isCustom: true,
      });
    } else if (itemType === "wrap") {
      if (!wrapName.trim()) return;
      onAddWrap({
        id: `wrap-custom-${Date.now()}`,
        name: wrapName,
        finishType: wrapFinish,
        description: wrapDesc || "Özel folyo kaplama çeşidi.",
        colorPreview: wrapColor,
        promptSnippet: wrapSnippet || `wrapped in ${wrapName} finish`,
        recommendedCars: wrapCars.split(",").map((c) => c.trim()).filter(Boolean),
        isCustom: true,
      });
    }

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="w-full max-w-2xl rounded-2xl glass-panel-elevated border border-white/20 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>YENİ İÇERİK EKLEME PANELİ</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Kendi AI skillerinizi, sosyal medya promptlarınızı veya araç/kaplama verilerinizi ekleyin.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Pencereyi kapat"
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Type Selector Tabs */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: "skill", label: "AI Skilli", icon: Terminal },
            { key: "prompt", label: "Prompt", icon: Share2 },
            { key: "car", label: "Araç Modeli", icon: Car },
            { key: "wrap", label: "Kaplama", icon: Palette },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = itemType === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setItemType(t.key as any)}
                aria-pressed={isActive}
                className={`py-2 px-2 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-1.5 border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  isActive
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    : "glass-pill text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* SKILL FORM */}
          {itemType === "skill" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="skill-name-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Skill Adı *
                </label>
                <input
                  type="text"
                  id="skill-name-input"
                  name="skill-name"
                  required
                  autoComplete="off"
                  placeholder="Örn: Midjourney Batch Automator"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="skill-category-select" className="text-xs font-mono text-zinc-300 block mb-1">
                    Kategori
                  </label>
                  <select
                    id="skill-category-select"
                    name="skill-category"
                    value={skillCategory}
                    onChange={(e) => setSkillCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  >
                    <option value="agent">Agentic AI</option>
                    <option value="terminal">Terminal / CLI</option>
                    <option value="design">Tasarım & UI</option>
                    <option value="automation">Otomasyon & Medya</option>
                    <option value="dev">Geliştirici & Kod</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="skill-tags-input" className="text-xs font-mono text-zinc-300 block mb-1">
                    Etiketler (virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    id="skill-tags-input"
                    name="skill-tags"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Flux, CLI, Python"
                    value={skillTags}
                    onChange={(e) => setSkillTags(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="skill-cmd-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Terminal Kurulum Komutu *
                </label>
                <input
                  type="text"
                  id="skill-cmd-input"
                  name="skill-cmd"
                  required
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="npx skills add my-custom-skill"
                  value={skillCmd}
                  onChange={(e) => setSkillCmd(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs font-mono text-cyan-300"
                />
              </div>

              <div>
                <label htmlFor="skill-desc-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Açıklama & Ne İşe Yarar?
                </label>
                <textarea
                  id="skill-desc-input"
                  name="skill-desc"
                  rows={2}
                  placeholder="Bu skill'in temel görevi…"
                  value={skillDesc}
                  onChange={(e) => setSkillDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                />
              </div>

              <div>
                <label htmlFor="skill-example-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Örnek Asistan Kullanım İstemi
                </label>
                <input
                  type="text"
                  id="skill-example-input"
                  name="skill-example"
                  autoComplete="off"
                  placeholder='agy "Otomatik araç görsellerini oluştur"'
                  value={skillExample}
                  onChange={(e) => setSkillExample(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs font-mono text-zinc-300"
                />
              </div>
            </div>
          )}

          {/* PROMPT FORM */}
          {itemType === "prompt" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="prompt-title-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Prompt Başlığı *
                </label>
                <input
                  type="text"
                  id="prompt-title-input"
                  name="prompt-title"
                  required
                  autoComplete="off"
                  placeholder="Örn: Gece Yağmurunda Tokyo GT3 RS"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="prompt-channel-select" className="text-xs font-mono text-zinc-300 block mb-1">
                    Sayfa / Kanal
                  </label>
                  <select
                    id="prompt-channel-select"
                    name="prompt-channel"
                    value={promptChannel}
                    onChange={(e) => setPromptChannel(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  >
                    <option value="araba">🏎️ Araba Sayfası</option>
                    <option value="cyberpunk">🤖 Cyberpunk</option>
                    <option value="luxury">🏙️ Lüks Yaşam</option>
                    <option value="portrait">📸 Portre & Moda</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="prompt-model-select" className="text-xs font-mono text-zinc-300 block mb-1">
                    Hedef Model
                  </label>
                  <select
                    id="prompt-model-select"
                    name="prompt-model"
                    value={promptModel}
                    onChange={(e) => setPromptModel(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  >
                    <option value="Omni 1.1">Omni 1.1</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="prompt-ratio-select" className="text-xs font-mono text-zinc-300 block mb-1">
                    Format (En/Boy)
                  </label>
                  <select
                    id="prompt-ratio-select"
                    name="prompt-ratio"
                    value={promptRatio}
                    onChange={(e) => setPromptRatio(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  >
                    <option value="9:16">9:16 (Reels/TikTok)</option>
                    <option value="16:9">16:9 (Yatay)</option>
                    <option value="1:1">1:1 (Kare)</option>
                    <option value="4:5">4:5 (Instagram Post)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="prompt-text-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Yapay Zeka Prompt Metni *
                </label>
                <textarea
                  id="prompt-text-input"
                  name="prompt-text"
                  rows={4}
                  required
                  placeholder="Cinematic rolling shot of a custom sports car in rain…"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs font-mono text-zinc-200"
                />
              </div>

              <div>
                <label htmlFor="prompt-tip-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Viral / Etkileşim İpucu
                </label>
                <input
                  type="text"
                  id="prompt-tip-input"
                  name="prompt-tip"
                  autoComplete="off"
                  placeholder="Reels kapağına 'Siyah mı Mor mu?' anketi koyun…"
                  value={promptTip}
                  onChange={(e) => setPromptTip(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-amber-200/90"
                />
              </div>
            </div>
          )}

          {/* CAR FORM */}
          {itemType === "car" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="car-brand-input" className="text-xs font-mono text-zinc-300 block mb-1">
                    Marka *
                  </label>
                  <input
                    type="text"
                    id="car-brand-input"
                    name="car-brand"
                    required
                    autoComplete="off"
                    placeholder="Porsche, BMW, Ferrari…"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  />
                </div>
                <div>
                  <label htmlFor="car-model-input" className="text-xs font-mono text-zinc-300 block mb-1">
                    Model *
                  </label>
                  <input
                    type="text"
                    id="car-model-input"
                    name="car-model"
                    required
                    autoComplete="off"
                    placeholder="911 GT3 RS, M4 Competition…"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="car-category-select" className="text-xs font-mono text-zinc-300 block mb-1">
                    Kategori
                  </label>
                  <select
                    id="car-category-select"
                    name="car-category"
                    value={carCategory}
                    onChange={(e) => setCarCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  >
                    <option value="Süper Spor & Pist Odaklı">Süper Spor & Pist Odaklı</option>
                    <option value="Lüks & Performans SUV">Lüks & Performans SUV</option>
                    <option value="Ultra Lüks GT & Prestij Sedan">Ultra Lüks GT & Prestij Sedan</option>
                    <option value="Agresif Sokak & Pist Sedan / Coupe">Agresif Sokak & Pist Sedan / Coupe</option>
                    <option value="Yeni Nesil Hiper & Süper Otomobiller">Yeni Nesil Hiper & Süper Otomobiller</option>
                    <option value="Vahşi & Uzay Gemisi Tasarımlar">Vahşi & Uzay Gemisi Tasarımlar</option>
                    <option value="Widebody Canavarlar">Widebody Canavarlar</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="car-gen-input" className="text-xs font-mono text-zinc-300 block mb-1">
                    Yıl veya Kasa Kodu
                  </label>
                  <input
                    type="text"
                    id="car-gen-input"
                    name="car-gen"
                    autoComplete="off"
                    placeholder="992 Kasa (2024)"
                    value={carGen}
                    onChange={(e) => setCarGen(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="car-snippet-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Yapay Zeka Prompt Snippet&apos;ı
                </label>
                <textarea
                  id="car-snippet-input"
                  name="car-snippet"
                  rows={3}
                  placeholder="2024 Porsche 911 GT3 RS with swan-neck active carbon rear wing…"
                  value={carSnippet}
                  onChange={(e) => setCarSnippet(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs font-mono text-zinc-200"
                />
              </div>
            </div>
          )}

          {/* WRAP FORM */}
          {itemType === "wrap" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="wrap-name-input" className="text-xs font-mono text-zinc-300 block mb-1">
                    Kaplama / Folyo Adı *
                  </label>
                  <input
                    type="text"
                    id="wrap-name-input"
                    name="wrap-name"
                    required
                    autoComplete="off"
                    placeholder="Örn: Satin Midnight Purple"
                    value={wrapName}
                    onChange={(e) => setWrapName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  />
                </div>
                <div>
                  <label htmlFor="wrap-finish-select" className="text-xs font-mono text-zinc-300 block mb-1">
                    Yüzey Bitişi (Finish)
                  </label>
                  <select
                    id="wrap-finish-select"
                    name="wrap-finish"
                    value={wrapFinish}
                    onChange={(e) => setWrapFinish(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  >
                    <option value="Satin">Satin</option>
                    <option value="Matte">Matte</option>
                    <option value="Liquid Metal / Chrome">Liquid Metal / Chrome</option>
                    <option value="Chameleon Iridescent">Chameleon Iridescent</option>
                    <option value="Heritage Livery">Heritage Livery</option>
                    <option value="Forged Carbon">Forged Carbon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="wrap-color-input" className="text-xs font-mono text-zinc-300 block mb-1">
                    Renk Önizlemesi (Hex)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id="wrap-color-picker"
                      name="wrap-color-picker"
                      aria-label="Kaplama renk seçici"
                      value={wrapColor}
                      onChange={(e) => setWrapColor(e.target.value)}
                      className="w-10 h-10 rounded border border-white/20 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      id="wrap-color-input"
                      name="wrap-color"
                      autoComplete="off"
                      spellCheck={false}
                      value={wrapColor}
                      onChange={(e) => setWrapColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg glass-input text-xs font-mono text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="wrap-cars-input" className="text-xs font-mono text-zinc-300 block mb-1">
                    Önerilen Araç Modelleri
                  </label>
                  <input
                    type="text"
                    id="wrap-cars-input"
                    name="wrap-cars"
                    autoComplete="off"
                    placeholder="Porsche GT3 RS, BMW M4"
                    value={wrapCars}
                    onChange={(e) => setWrapCars(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="wrap-snippet-input" className="text-xs font-mono text-zinc-300 block mb-1">
                  Yapay Zeka Kaplama Prompt Kalıbı
                </label>
                <textarea
                  id="wrap-snippet-input"
                  name="wrap-snippet"
                  rows={2}
                  placeholder="wrapped in premium Satin Midnight Purple vinyl finish…"
                  value={wrapSnippet}
                  onChange={(e) => setWrapSnippet(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg glass-input text-xs font-mono text-zinc-200"
                />
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              KAYDET VE ARŞİVE EKLE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
