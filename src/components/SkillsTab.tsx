"use client";

import { useState } from "react";
import { SkillItem, SkillCategory } from "@/types";
import CopyButton from "./CopyButton";
import {
  Terminal,
  Sparkles,
  Search,
  BookOpen,
  Filter,
  CheckCircle,
  Code2,
  Cpu,
  Layers,
  Bot,
  ExternalLink,
} from "lucide-react";

interface SkillsTabProps {
  skills: SkillItem[];
  onTriggerToast: (msg: string) => void;
  onOpenAddModal: () => void;
}

export default function SkillsTab({
  skills,
  onTriggerToast,
  onOpenAddModal,
}: SkillsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { key: string; label: string; icon: any }[] = [
    { key: "all", label: "Tüm Skiller", icon: Layers },
    { key: "agent", label: "Agentic AI", icon: Bot },
    { key: "terminal", label: "Terminal / CLI", icon: Terminal },
    { key: "design", label: "Tasarım & UI", icon: Sparkles },
    { key: "automation", label: "Otomasyon & Medya", icon: Cpu },
    { key: "dev", label: "Geliştirici & Kod", icon: Code2 },
  ];

  const filteredSkills = skills.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.installCommand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
            Yapay zeka asistanınıza veya terminal kodlama ajanlarınıza (Antigravity, Cursor, Claude Code vb.) özel yetenekler kazandırmak için aşağıdaki komutları terminalinizde çalıştırmanız yeterlidir.
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
                Aşağıdaki kartlardan ilgili skill&apos;in <code className="text-cyan-300">npx skills add ...</code> komutunu kopyalayıp projenizin terminalinde çalıştırın.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-violet-400 font-bold">[ADIM 02]</span>
                <Cpu className="w-4 h-4 text-violet-400/60" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-100">Kural & Config Otomatik Tanınır</h4>
              <p className="text-xs text-zinc-400">
                Skill dosyası projenizdeki <code className="text-violet-300">.agents/skills/</code> klasörüne yerleşir ve yapay zeka hemen talimatları okumaya başlar.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold">[ADIM 03]</span>
                <Bot className="w-4 h-4 text-emerald-400/60" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-100">Tek Komutla Tetikle</h4>
              <p className="text-xs text-zinc-400">
                Örnek istemi kopyalayıp asistana verin veya doğrudan terminalde çalıştırın. Asistan kurallara göre otonom çalışır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
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
        <div className="relative min-w-[260px] lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            type="text"
            id="skills-search-input"
            name="skills-search"
            aria-label="Skill veya komut ara"
            placeholder="Skill veya komut ara…"
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
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="group relative rounded-xl glass-panel p-5 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.06] text-zinc-300 border border-white/10">
                      {skill.category}
                    </span>
                    {skill.isCustom && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ÖZEL
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {skill.description}
              </p>

              {skill.docs && (
                <div className="p-2.5 rounded bg-black/30 border border-white/5 text-[11px] text-zinc-400 font-sans flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{skill.docs}</span>
                </div>
              )}

              {/* Install Command Snippet */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    Kurulum / Yükleme Komutu:
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
                  <code className="whitespace-pre select-all text-cyan-200">
                    $ {skill.installCommand}
                  </code>
                </div>
              </div>

              {/* Usage Example */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <Bot className="w-3 h-3 text-violet-400" />
                    Asistan Kullanım Örneği:
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
                  <code className="whitespace-pre-wrap select-all">
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
        ))}

        {filteredSkills.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-xl glass-panel border border-white/10 space-y-3">
            <Search className="w-8 h-8 text-zinc-500 mx-auto" />
            <p className="text-sm text-zinc-300 font-mono">
              Aramanıza uygun yapay zeka skilli bulunamadı.
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
