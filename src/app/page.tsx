"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SkillsTab from "@/components/SkillsTab";
import PromptsTab from "@/components/PromptsTab";
import GarageTab from "@/components/GarageTab";
import PromptStudioTab from "@/components/PromptStudioTab";
import ChatAiTab from "@/components/ChatAiTab";
import AddItemModal from "@/components/AddItemModal";
import Toast from "@/components/Toast";

import { initialSkills } from "@/data/initialSkills";
import { initialPrompts } from "@/data/initialPrompts";
import { initialVehicles } from "@/data/initialVehicles";
import { initialWraps } from "@/data/initialWraps";
import { environmentPresets, cameraAnglePresets } from "@/data/presets";

import {
  SkillItem,
  SocialPromptItem,
  VehicleModelItem,
  WrapStyleItem,
} from "@/types";

import {
  Terminal,
  Share2,
  Car,
  Wand2,
  Bot,
  Sparkles,
  ArrowUpRight,
  Database,
  RefreshCw,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "skills" | "prompts" | "garage" | "studio" | "chat"
  >("skills");

  // Domain States
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [prompts, setPrompts] = useState<SocialPromptItem[]>(initialPrompts);
  const [vehicles, setVehicles] = useState<VehicleModelItem[]>(initialVehicles);
  const [wraps, setWraps] = useState<WrapStyleItem[]>(initialWraps);

  // Studio pre-selection states
  const [studioCarId, setStudioCarId] = useState<string>("");
  const [studioWrapId, setStudioWrapId] = useState<string>("");

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalInitialType, setAddModalInitialType] = useState<
    "skill" | "prompt" | "car" | "wrap"
  >("skill");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedSkills = localStorage.getItem("ai_studio_skills");
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills) as SkillItem[];
        const updatedInitials = initialSkills.map((init) => {
          const match = parsed.find((s) => s.id === init.id);
          return match
            ? {
                ...match,
                installCommand: init.installCommand,
                name: init.name,
                description: init.description,
              }
            : init;
        });
        const customSkills = parsed.filter(
          (s) => s.isCustom && !updatedInitials.some((u) => u.id === s.id)
        );
        setSkills([...updatedInitials, ...customSkills]);
      } else {
        setSkills(initialSkills);
      }

      const savedPrompts = localStorage.getItem("ai_studio_prompts");
      if (savedPrompts) setPrompts(JSON.parse(savedPrompts));

      const savedVehicles = localStorage.getItem("ai_studio_vehicles");
      if (savedVehicles) setVehicles(JSON.parse(savedVehicles));

      const savedWraps = localStorage.getItem("ai_studio_wraps");
      if (savedWraps) setWraps(JSON.parse(savedWraps));
    } catch (e) {
      console.error("Failed to load local storage data", e);
    }
  }, []);

  // Save to localStorage when state changes
  const saveSkills = (newSkills: SkillItem[]) => {
    setSkills(newSkills);
    try {
      localStorage.setItem("ai_studio_skills", JSON.stringify(newSkills));
    } catch (e) {
      console.error(e);
    }
  };

  const savePrompts = (newPrompts: SocialPromptItem[]) => {
    setPrompts(newPrompts);
    try {
      localStorage.setItem("ai_studio_prompts", JSON.stringify(newPrompts));
    } catch (e) {
      console.error(e);
    }
  };

  const saveVehicles = (newVehicles: VehicleModelItem[]) => {
    setVehicles(newVehicles);
    try {
      localStorage.setItem("ai_studio_vehicles", JSON.stringify(newVehicles));
    } catch (e) {
      console.error(e);
    }
  };

  const saveWraps = (newWraps: WrapStyleItem[]) => {
    setWraps(newWraps);
    try {
      localStorage.setItem("ai_studio_wraps", JSON.stringify(newWraps));
    } catch (e) {
      console.error(e);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Add Item Handlers
  const handleAddSkill = (newSkill: SkillItem) => {
    const updated = [newSkill, ...skills];
    saveSkills(updated);
    triggerToast(`Yeni skill "${newSkill.name}" başarıyla eklendi!`);
  };

  const handleAddPrompt = (newPrompt: SocialPromptItem) => {
    const updated = [newPrompt, ...prompts];
    savePrompts(updated);
    triggerToast(`Yeni prompt "${newPrompt.title}" arşive eklendi!`);
  };

  const handleAddCar = (newCar: VehicleModelItem) => {
    const updated = [newCar, ...vehicles];
    saveVehicles(updated);
    triggerToast(`Yeni araç modeli "${newCar.brand} ${newCar.model}" eklendi!`);
  };

  const handleAddWrap = (newWrap: WrapStyleItem) => {
    const updated = [newWrap, ...wraps];
    saveWraps(updated);
    triggerToast(`Yeni kaplama çeşidi "${newWrap.name}" eklendi!`);
  };

  // Garage -> Studio Bridge
  const handleSelectForStudio = (
    car?: VehicleModelItem,
    wrap?: WrapStyleItem
  ) => {
    if (car) setStudioCarId(car.id);
    if (wrap) setStudioWrapId(wrap.id);
    setActiveTab("studio");
    triggerToast(
      `${car ? car.brand + " " + car.model : wrap?.name} stüdyoya aktarıldı! 🎨`
    );
  };

  // Reset data to defaults
  const handleResetDefaults = () => {
    if (confirm("Tüm verileri varsayılana sıfırlamak istediğinize emin misiniz?")) {
      localStorage.removeItem("ai_studio_skills");
      localStorage.removeItem("ai_studio_prompts");
      localStorage.removeItem("ai_studio_vehicles");
      localStorage.removeItem("ai_studio_wraps");
      setSkills(initialSkills);
      setPrompts(initialPrompts);
      setVehicles(initialVehicles);
      setWraps(initialWraps);
      triggerToast("Tüm veriler fabrika ayarlarına döndürüldü.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080c] flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Ambient Glows & Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.07] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-violet-600/[0.06] rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-amber-500/[0.05] rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddModal={() => {
          setAddModalInitialType("skill");
          setIsAddModalOpen(true);
        }}
        totalSkillsCount={skills.length}
        totalPromptsCount={prompts.length}
        totalCarsCount={vehicles.length}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner / Status Overview */}
        <div className="relative rounded-2xl p-6 sm:p-8 glass-panel border border-white/[0.08] overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium glass-pill text-cyan-300 border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>AI_WORKSPACE // ASİSTAN & KÜTÜPHANE MERKEZİ</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans text-balance">
                Yapay Zeka Operasyon & Otomotiv Arşivi
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                Agentic AI skillerinizi tek tıkla kopyalayın, sosyal medya sayfalarınızın promptlarını yönetin, özel araç ve kaplama (wrap) kombinasyonlarını sentezleyin ve akıllı asistan ile yeni fikirler keşfedin.
              </p>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("skills")}
                aria-label={`AI Skilleri sekmesine git, toplam ${skills.length} kayıtlı skill`}
                className="p-3 rounded-xl bg-black/30 border border-cyan-500/20 text-center cursor-pointer hover:border-cyan-500/50 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none transition-colors"
              >
                <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
                  {skills.length}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  AI Skilleri
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("prompts")}
                aria-label={`Sosyal Medya Promptları sekmesine git, toplam ${prompts.length} kayıtlı prompt`}
                className="p-3 rounded-xl bg-black/30 border border-violet-500/20 text-center cursor-pointer hover:border-violet-500/50 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none transition-colors"
              >
                <div className="text-xl font-bold font-mono text-violet-400 tabular-nums">
                  {prompts.length}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  Sayfa Promptu
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("garage")}
                aria-label={`Araç & Kaplama Garajı sekmesine git, toplam ${vehicles.length + wraps.length} kayıt`}
                className="p-3 rounded-xl bg-black/30 border border-amber-500/20 text-center cursor-pointer hover:border-amber-500/50 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none transition-colors"
              >
                <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                  {vehicles.length + wraps.length}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  Araç & Kaplama
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === "skills" && (
          <SkillsTab
            skills={skills}
            onTriggerToast={triggerToast}
            onOpenAddModal={() => {
              setAddModalInitialType("skill");
              setIsAddModalOpen(true);
            }}
          />
        )}

        {activeTab === "prompts" && (
          <PromptsTab
            prompts={prompts}
            onTriggerToast={triggerToast}
            onOpenAddModal={() => {
              setAddModalInitialType("prompt");
              setIsAddModalOpen(true);
            }}
          />
        )}

        {activeTab === "garage" && (
          <GarageTab
            vehicles={vehicles}
            wraps={wraps}
            onTriggerToast={triggerToast}
            onOpenAddModal={(type) => {
              setAddModalInitialType(type || "car");
              setIsAddModalOpen(true);
            }}
            onSelectForStudio={handleSelectForStudio}
          />
        )}

        {activeTab === "studio" && (
          <PromptStudioTab
            vehicles={vehicles}
            wraps={wraps}
            environments={environmentPresets}
            cameraAngles={cameraAnglePresets}
            selectedVehicleId={studioCarId}
            selectedWrapId={studioWrapId}
            onTriggerToast={triggerToast}
            onSavePromptToVault={handleAddPrompt}
          />
        )}

        {activeTab === "chat" && (
          <ChatAiTab
            vehicles={vehicles}
            wraps={wraps}
            skills={skills}
            prompts={prompts}
            onTriggerToast={triggerToast}
            onNavigateToStudio={(carId, wrapId) => {
              setStudioCarId(carId);
              setStudioWrapId(wrapId);
              setActiveTab("studio");
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full glass-panel border-t border-white/[0.08] py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span>[AI_STUDIO // OPS]</span>
            <span>•</span>
            <span>Terminal-Native & Glassmorphic UI</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
              title="Varsayılan verilere dön"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Verileri Sıfırla</span>
            </button>
            <span>•</span>
            <span className="text-zinc-400">
              Designed for Next.js 16 & Tailwind v4
            </span>
          </div>
        </div>
      </footer>

      {/* Modal & Toast */}
      <AddItemModal
        isOpen={isAddModalOpen}
        initialType={addModalInitialType}
        onClose={() => setIsAddModalOpen(false)}
        onAddSkill={handleAddSkill}
        onAddPrompt={handleAddPrompt}
        onAddCar={handleAddCar}
        onAddWrap={handleAddWrap}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
