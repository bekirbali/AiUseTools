"use client";

import { useState } from "react";
import { SkillItem } from "@/types";
import CopyButton from "./CopyButton";
import {
  Terminal,
  Sparkles,
  Search,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Bot,
  FileText,
  Eye,
  EyeOff,
  ShieldCheck,
  FolderTree,
  CheckCircle2,
  ExternalLink,
  Pencil,
} from "lucide-react";

interface SkillsTabProps {
  skills: SkillItem[];
  onTriggerToast: (msg: string) => void;
  onOpenAddModal: () => void;
  onEditSkill?: (skill: SkillItem) => void;
}

export default function SkillsTab({
  skills,
  onTriggerToast,
  onOpenAddModal,
  onEditSkill,
}: SkillsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPreview, setExpandedPreview] = useState(true);
  const [previewSubMode, setPreviewSubMode] = useState<"full" | "rules">("full");

  const categories: { key: string; label: string; icon: any }[] = [
    { key: "all", label: "Tüm Skiller", icon: Layers },
    { key: "rules", label: "Proje Kuralları", icon: FileText },
    { key: "agent", label: "Agentic AI", icon: Bot },
    { key: "terminal", label: "Terminal / CLI", icon: Terminal },
    { key: "design", label: "Tasarım & UI", icon: Sparkles },
    { key: "automation", label: "Otomasyon", icon: Cpu },
    { key: "dev", label: "Geliştirici", icon: Code2 },
  ];

  const filteredSkills = skills.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory ||
      (selectedCategory === "agent" && item.category === "rules");
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.installCommand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.fullContent && item.fullContent.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Quick Setup Guide Banner */}
      <div className="relative overflow-hidden rounded-xl glass-panel-elevated p-6 border border-cyan-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                <Terminal className="w-3.5 h-3.5" />
                <span>TERMINAL_QUICKSTART // REHBER</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Yapay Zeka Skilleri Nasıl Eklenir ve Nasıl Kullanılır?
              </h2>
            </div>
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 rounded-lg font-mono text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-200 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span>+ YENİ SKİLL EKLE</span>
            </button>
          </div>

          <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
            Yapay zeka asistanınıza veya terminal kodlama ajanlarınıza (Antigravity, Cursor, Claude Code vb.) özel yetenekler kazandırmak için aşağıdaki komutları terminalinizde çalıştırabilir veya proje kurallarını doğrudan kopyalayabilirsiniz.
          </p>

          {/* 3 Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold">[ADIM 01]</span>
                <Terminal className="w-4 h-4 text-cyan-400/60" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-100">Skilli Terminale Ekle</h4>
              <p className="text-xs text-zinc-400">
                Kartlardaki <code className="text-cyan-300">npx skills add ...</code> komutunu kopyalayıp projenizin terminalinde çalıştırın.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">[ADIM 02]</span>
                <FileText className="w-4 h-4 text-emerald-400/60" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-100">AGENTS.md Kurallarını Ekle</h4>
              <p className="text-xs text-zinc-400">
                Aşağıdaki <code className="text-emerald-300">AGENTS.md</code> dosyasını tek tıkla kopyalayıp projenizin kök dizinine yapıştırın.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-violet-400 font-bold">[ADIM 03]</span>
                <Bot className="w-4 h-4 text-violet-400/60" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-100">Otonom & Güvenli Geliştirme</h4>
              <p className="text-xs text-zinc-400">
                Asistan kurallara ve yüklü skill yönergelerine göre sapma yapmadan disiplinli şekilde çalışır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  isActive
                    ? "glass-pill-active text-cyan-200"
                    : "glass-pill text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-zinc-400"}`} aria-hidden="true" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full xl:w-80 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            type="text"
            id="skills-search-input"
            name="skills-search"
            aria-label="Skill veya komut ara"
            placeholder="Skill, kural veya komut ara…"
            autoComplete="off"
            spellCheck={false}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200 placeholder:text-zinc-500 focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSkills.map((skill) => {
          // Dedicated Card for AGENTS.md / Full File content items
          if (skill.fullContent) {
            const activeTextToCopy =
              previewSubMode === "full" ? skill.fullContent : skill.rulesOnly || skill.fullContent;

            return (
              <div
                key={skill.id}
                className="md:col-span-2 relative rounded-2xl glass-panel-elevated p-6 border border-emerald-500/35 hover:border-emerald-400/50 transition-all duration-200 shadow-[0_4px_35px_rgba(16,185,129,0.08)] space-y-5"
              >
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.07] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                {/* Header & Badges */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        PROJE KURALI // AGENTS.MD
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        <FolderTree className="w-3 h-3 text-cyan-400" />
                        KÖK DİZİN
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/30">
                        ANTIGRAVITY / CURSOR / CLAUDE
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-400" />
                      <span>{skill.name}</span>
                    </h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                    <CopyButton
                      textToCopy={skill.fullContent}
                      label="Dosyayı Kopyala"
                      size="md"
                      className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/50 text-emerald-200"
                      onCopied={() =>
                        onTriggerToast(
                          "AGENTS.md içeriği panoya kopyalandı! Yeni projenizin kök dizinine yapıştırabilirsiniz."
                        )
                      }
                    />

                    {skill.rulesOnly && (
                      <CopyButton
                        textToCopy={skill.rulesOnly}
                        label="Yalnız Kurallar"
                        size="md"
                        className="bg-cyan-500/15 hover:bg-cyan-500/25 border-cyan-500/40 text-cyan-200"
                        onCopied={() =>
                          onTriggerToast(
                            "Proje kuralları (# Proje Kuralları) panoya kopyalandı!"
                          )
                        }
                      />
                    )}

                    {onEditSkill && (
                      <button
                        type="button"
                        onClick={() => onEditSkill(skill)}
                        className="px-3.5 py-1.5 rounded text-xs font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      >
                        <Pencil className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Düzenle</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setExpandedPreview(!expandedPreview)}
                      className="px-3.5 py-1.5 rounded text-xs font-mono font-medium border border-white/10 hover:border-white/20 bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {expandedPreview ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Gizle</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Önizle</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed relative z-10">
                  {skill.description}
                </p>

                {/* 4 Strict Rule Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 relative z-10">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/20 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono font-bold text-emerald-300 block">Kural 1</span>
                      <p className="text-[11px] text-zinc-300 leading-tight">Net soruda otonom kod düzenleme yasağı</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-500/20 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono font-bold text-cyan-300 block">Kural 2</span>
                      <p className="text-[11px] text-zinc-300 leading-tight">Görsel & ergonomi zorunlu UX denetimi</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-violet-500/20 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono font-bold text-violet-300 block">Kural 3</span>
                      <p className="text-[11px] text-zinc-300 leading-tight">Sekme & butonlarda 1-3 kelime kompaktlığı</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/40 border border-amber-500/20 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono font-bold text-amber-300 block">Kural 4</span>
                      <p className="text-[11px] text-zinc-300 leading-tight">Kullanıcı onayı olmadan gereksiz inisiyatif yasağı</p>
                    </div>
                  </div>
                </div>

                {/* Collapsible Full Markdown Code Box */}
                {expandedPreview && (
                  <div className="space-y-2 pt-2 relative z-10 animate-in fade-in duration-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-black/60 rounded-t-lg border-x border-t border-emerald-500/30 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>AGENTS.md Dosya İçeriği:</span>
                        </span>
                        <div className="flex items-center gap-1 bg-white/[0.05] p-0.5 rounded border border-white/10 text-[10px]">
                          <button
                            type="button"
                            onClick={() => setPreviewSubMode("full")}
                            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                              previewSubMode === "full"
                                ? "bg-emerald-500/20 text-emerald-300 font-bold"
                                : "text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            Tam Dosya (Next.js + Kurallar)
                          </button>
                          {skill.rulesOnly && (
                            <button
                              type="button"
                              onClick={() => setPreviewSubMode("rules")}
                              className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                                previewSubMode === "rules"
                                ? "bg-cyan-500/20 text-cyan-300 font-bold"
                                : "text-zinc-400 hover:text-zinc-200"
                              }`}
                            >
                              Yalnızca Kurallar
                            </button>
                          )}
                        </div>
                      </div>

                      <CopyButton
                        textToCopy={activeTextToCopy}
                        label="Kopyala"
                        size="sm"
                        onCopied={() =>
                          onTriggerToast("Görüntülenen kural metni panoya kopyalandı!")
                        }
                      />
                    </div>

                    <div className="p-4 rounded-b-lg bg-[#07090e] border border-emerald-500/30 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[380px] shadow-inner">
                      <pre className="whitespace-pre select-all leading-relaxed font-mono">
                        {activeTextToCopy}
                      </pre>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-emerald-300">
                      <span className="flex items-center gap-2">
                        <FolderTree className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Yeni Projede Kullanım: Kök dizinde <strong className="text-white">AGENTS.md</strong> dosyası açıp kopyaladığınız metni yapıştırın.</span>
                      </span>
                      <CopyButton
                        textToCopy="touch AGENTS.md"
                        label="touch AGENTS.md"
                        size="sm"
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border-emerald-500/40 shrink-0"
                        onCopied={() => onTriggerToast("'touch AGENTS.md' komutu kopyalandı!")}
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-violet-950/20 border border-violet-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-violet-300">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                        <span>Hazır UI Tasarım Sistemleri: Projenize uygun bir stil seçip <strong className="text-white">DESIGN.md</strong> olarak ekleyebilirsiniz.</span>
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href="https://github.com/VoltAgent/awesome-design-md/tree/main/design-md"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 border border-violet-500/40 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
                          <span>Dizaynları İncele</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5 relative z-10">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          }

          // Regular Skill Card
          const isDesignCard = !!skill.externalUrl;

          return (
            <div
              key={skill.id}
              className={`group relative rounded-xl glass-panel p-5 border transition-all duration-200 flex flex-col justify-between ${
                isDesignCard
                  ? "border-violet-500/30 hover:border-violet-500/60 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] bg-gradient-to-br from-violet-950/10 to-transparent"
                  : "border-white/[0.08] hover:border-cyan-500/40 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]"
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                        isDesignCard
                          ? "bg-violet-500/15 text-violet-300 border-violet-500/30"
                          : "bg-white/[0.06] text-zinc-300 border-white/10"
                      }`}>
                        {skill.category}
                      </span>
                      {skill.isCustom && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          ÖZEL
                        </span>
                      )}
                      {skill.externalUrl && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-pink-500/15 text-pink-300 border border-pink-500/30">
                          GITHUB ARŞİVİ
                        </span>
                      )}
                    </div>
                    <h3 className={`text-base font-bold transition-colors ${
                      isDesignCard ? "text-white group-hover:text-violet-300" : "text-white group-hover:text-cyan-300"
                    }`}>
                      {skill.name}
                    </h3>
                  </div>

                  {onEditSkill && (
                    <button
                      type="button"
                      onClick={() => onEditSkill(skill)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer shrink-0"
                      title="Skilli Düzenle"
                      aria-label={`${skill.name} skillini düzenle`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {skill.description}
                </p>

                {skill.docs && (
                  <div className="p-2.5 rounded bg-black/30 border border-white/5 text-[11px] text-zinc-400 font-sans flex items-start gap-2">
                    <BookOpen className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      isDesignCard ? "text-violet-400" : "text-cyan-400"
                    }`} />
                    <span>{skill.docs}</span>
                  </div>
                )}

                {/* Install Command Snippet / External Link */}
                {skill.externalUrl ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5 text-violet-300">
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        Tasarım Şablonları Bağlantısı:
                      </span>
                      <CopyButton
                        textToCopy={skill.externalUrl}
                        label="Linki Kopyala"
                        size="sm"
                        onCopied={() =>
                          onTriggerToast("Awesome DESIGN.md linki panoya kopyalandı!")
                        }
                      />
                    </div>
                    <div className="p-3 rounded-lg bg-[#0d0b14] border border-violet-500/30 flex items-center justify-between gap-3">
                      <code suppressHydrationWarning className="font-mono text-xs text-violet-300 truncate select-all">
                        {skill.externalUrl}
                      </code>
                      <a
                        href={skill.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded bg-violet-500/25 hover:bg-violet-500/35 text-violet-200 border border-violet-500/50 transition-colors shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
                        <span>Dizaynları İncele</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Terminal className="w-3 h-3 text-cyan-400" />
                        Kurulum Komutu:
                      </span>
                      <CopyButton
                        textToCopy={skill.installCommand}
                        label="Kodu Kopyala"
                        size="sm"
                        onCopied={() =>
                          onTriggerToast(`${skill.name} kurulum komutu panoya kopyalandı!`)
                        }
                      />
                    </div>
                    <div className="p-3 rounded-lg bg-[#090b10] border border-cyan-500/20 font-mono text-xs text-cyan-300 overflow-x-auto flex items-center justify-between">
                      <code suppressHydrationWarning className="whitespace-pre select-all text-cyan-200">
                        $ {skill.installCommand}
                      </code>
                    </div>
                  </div>
                )}

                {/* Usage Example */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Bot className="w-3 h-3 text-violet-400" />
                      Kullanım Örneği:
                    </span>
                    <CopyButton
                      textToCopy={skill.usageExample}
                      label="İstemi Kopyala"
                      size="sm"
                      onCopied={() =>
                        onTriggerToast(`${skill.name} kullanım komutu panoya kopyalandı!`)
                      }
                    />
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-zinc-300 overflow-x-auto">
                    <code suppressHydrationWarning className="whitespace-pre-wrap select-all">
                      {skill.usageExample}
                    </code>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-2 border-t border-white/5">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {filteredSkills.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-xl glass-panel border border-white/10 space-y-3">
            <Search className="w-8 h-8 text-zinc-500 mx-auto" />
            <p className="text-sm text-zinc-300 font-mono">
              Aramanıza uygun yapay zeka skilli veya kural bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
