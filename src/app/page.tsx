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
import { initialCarGroups } from "@/data/carGroups";
import { initialWrapGroups } from "@/data/wrapGroups";
import { environmentPresets, cameraAnglePresets } from "@/data/presets";
import {
  getSkills,
  addSkill,
  getPrompts,
  addPrompt,
  getVehicles,
  addVehicle,
  getWraps,
  addWrap,
} from "@/lib/supabaseService";

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

  const totalGarageCars = initialCarGroups.reduce((acc, g) => acc + g.cars.length, 0);
  const totalGarageWraps = initialWrapGroups.reduce((acc, g) => acc + g.wraps.length, 0);
  const totalGarageCount = totalGarageCars + totalGarageWraps;

  // Studio pre-selection states
  const [studioCarId, setStudioCarId] = useState<string>("");
  const [studioWrapId, setStudioWrapId] = useState<string>("");

  // Prompts sub-mode & caption pre-fill states
  const [promptsMode, setPromptsMode] = useState<"prompts" | "captions">("prompts");
  const [promptsVehicle, setPromptsVehicle] = useState<string>("");
  const [promptsMaterial, setPromptsMaterial] = useState<string>("");

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalInitialType, setAddModalInitialType] = useState<
    "skill" | "prompt" | "car" | "wrap"
  >("skill");

  // Hydration state guard
  const [isMounted, setIsMounted] = useState(false);

  // Load from Supabase on mount (with fallback to localStorage/initial)
  useEffect(() => {
    setIsMounted(true);

    async function loadDataFromDatabase() {
      try {
        const [dbSkills, dbPrompts, dbVehicles, dbWraps] = await Promise.all([
          getSkills(),
          getPrompts(),
          getVehicles(),
          getWraps(),
        ]);

        if (dbSkills && dbSkills.length > 0) setSkills(dbSkills);
        if (dbPrompts && dbPrompts.length > 0) setPrompts(dbPrompts);
        if (dbVehicles && dbVehicles.length > 0) setVehicles(dbVehicles);
        if (dbWraps && dbWraps.length > 0) setWraps(dbWraps);
      } catch (e) {
        console.error("Failed to load data from Supabase, using defaults", e);
      }
    }

    loadDataFromDatabase();
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
      localStorage.setItem("ai_studio_prompts_v3", JSON.stringify(newPrompts));
    } catch (e) {
      console.error(e);
    }
  };

  const saveVehicles = (newVehicles: VehicleModelItem[]) => {
    setVehicles(newVehicles);
    try {
      localStorage.setItem("ai_studio_vehicles_v2", JSON.stringify(newVehicles));
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

  // Add Item Handlers (Save to Supabase & State)
  const handleAddSkill = async (newSkill: SkillItem) => {
    setSkills((prev) => [newSkill, ...prev]);
    saveSkills([newSkill, ...skills]);
    triggerToast(`Yeni skill "${newSkill.name}" kaydediliyor...`);
    const success = await addSkill(newSkill);
    if (success) {
      triggerToast(`"${newSkill.name}" başarıyla Supabase'e kaydedildi! ⚡`);
    }
  };

  const handleAddPrompt = async (newPrompt: SocialPromptItem) => {
    setPrompts((prev) => [newPrompt, ...prev]);
    savePrompts([newPrompt, ...prompts]);
    triggerToast(`Yeni prompt "${newPrompt.title}" kaydediliyor...`);
    const success = await addPrompt(newPrompt);
    if (success) {
      triggerToast(`"${newPrompt.title}" başarıyla Supabase'e kaydedildi! ⚡`);
    }
  };

  const handleAddCar = async (newCar: VehicleModelItem) => {
    setVehicles((prev) => [newCar, ...prev]);
    saveVehicles([newCar, ...vehicles]);
    triggerToast(`Yeni araç modeli "${newCar.brand} ${newCar.model}" kaydediliyor...`);
    const success = await addVehicle(newCar);
    if (success) {
      triggerToast(`"${newCar.brand} ${newCar.model}" başarıyla Supabase'e kaydedildi! ⚡`);
    }
  };

  const handleAddWrap = async (newWrap: WrapStyleItem) => {
    setWraps((prev) => [newWrap, ...prev]);
    saveWraps([newWrap, ...wraps]);
    triggerToast(`Yeni kaplama çeşidi "${newWrap.name}" kaydediliyor...`);
    const success = await addWrap(newWrap);
    if (success) {
      triggerToast(`"${newWrap.name}" başarıyla Supabase'e kaydedildi! ⚡`);
    }
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
      localStorage.removeItem("ai_studio_prompts_v2");
      localStorage.removeItem("ai_studio_prompts_v3");
      localStorage.removeItem("ai_studio_prompts_v4");
      localStorage.removeItem("ai_studio_prompts_v5");
      localStorage.removeItem("ai_studio_prompts_v6");
      localStorage.removeItem("ai_studio_prompts_v7");
      localStorage.removeItem("ai_studio_prompts_v8");
      localStorage.removeItem("ai_studio_vehicles");
      localStorage.removeItem("ai_studio_vehicles_v2");
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
        totalCarsCount={totalGarageCount}
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
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
                onClick={() => {
                  setPromptsMode("prompts");
                  setActiveTab("prompts");
                }}
                aria-label={`Sosyal Medya Video Promptları sekmesine git, toplam ${prompts.length} kayıtlı prompt`}
                className="p-3 rounded-xl bg-black/30 border border-violet-500/20 text-center cursor-pointer hover:border-violet-500/50 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none transition-colors"
              >
                <div className="text-xl font-bold font-mono text-violet-400 tabular-nums">
                  {prompts.length}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  Video Promptu
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPromptsMode("captions");
                  setActiveTab("prompts");
                }}
                aria-label={`Açıklama Şablonları sekmesine git, Instagram, TikTok ve YouTube şablonları`}
                className="p-3 rounded-xl bg-black/30 border border-pink-500/20 text-center cursor-pointer hover:border-pink-500/50 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:outline-none transition-colors"
              >
                <div className="text-xl font-bold font-mono text-pink-400 tabular-nums">
                  3
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  Açıklama Şablonu
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("garage")}
                aria-label={`Araç & Kaplama Garajı sekmesine git, toplam ${totalGarageCount} kayıt`}
                className="p-3 rounded-xl bg-black/30 border border-amber-500/20 text-center cursor-pointer hover:border-amber-500/50 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none transition-colors"
              >
                <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                  {totalGarageCount}
                </div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  Araç & Kaplama
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        {isMounted ? (
          <>
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
                initialMode={promptsMode}
                initialVehicle={promptsVehicle}
                initialMaterial={promptsMaterial}
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
                onNavigateToCaptions={(v, m) => {
                  setPromptsVehicle(v);
                  setPromptsMaterial(m);
                  setPromptsMode("captions");
                  setActiveTab("prompts");
                  triggerToast(`"${v}" için Açıklama Şablonları hazırlandı! 📱✨`);
                }}
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
          </>
        ) : (
          <div className="p-16 text-center text-zinc-500 font-mono text-xs flex items-center justify-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span>Yapay zeka arşivi yükleniyor...</span>
          </div>
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
