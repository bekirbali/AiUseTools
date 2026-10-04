"use client";

import { useState, useEffect } from "react";
import { SkillItem, SocialPromptItem } from "@/types";
import {
  X,
  Save,
  Trash2,
  FileText,
  Terminal,
  Share2,
  Sparkles,
  Layers,
  FolderTree,
} from "lucide-react";

export type EditableItem =
  | { type: "skill"; data: SkillItem }
  | { type: "prompt"; data: SocialPromptItem };

interface EditItemModalProps {
  isOpen: boolean;
  item: EditableItem | null;
  onClose: () => void;
  onSaveSkill: (updatedSkill: SkillItem) => Promise<void> | void;
  onDeleteSkill?: (skillId: string) => Promise<void> | void;
  onSavePrompt: (updatedPrompt: SocialPromptItem) => Promise<void> | void;
  onDeletePrompt?: (promptId: string) => Promise<void> | void;
}

export default function EditItemModal({
  isOpen,
  item,
  onClose,
  onSaveSkill,
  onDeleteSkill,
  onSavePrompt,
  onDeletePrompt,
}: EditItemModalProps) {
  // Skill State
  const [skillName, setSkillName] = useState("");
  const [skillCategory, setSkillCategory] = useState<any>("agent");
  const [skillDesc, setSkillDesc] = useState("");
  const [skillCmd, setSkillCmd] = useState("");
  const [skillExample, setSkillExample] = useState("");
  const [skillTags, setSkillTags] = useState("");
  const [skillFullContent, setSkillFullContent] = useState("");
  const [skillRulesOnly, setSkillRulesOnly] = useState("");
  const [agentsEditMode, setAgentsEditMode] = useState<"full" | "rules">("rules");

  // Prompt State
  const [promptTitle, setPromptTitle] = useState("");
  const [promptChannel, setPromptChannel] = useState<any>("araba");
  const [promptText, setPromptText] = useState("");
  const [promptModel, setPromptModel] = useState<any>("Omni 1.1");
  const [promptRatio, setPromptRatio] = useState<any>("9:16");
  const [promptTags, setPromptTags] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state with selected item
  useEffect(() => {
    if (!item) return;

    if (item.type === "skill") {
      const s = item.data;
      setSkillName(s.name || "");
      setSkillCategory(s.category || "agent");
      setSkillDesc(s.description || "");
      setSkillCmd(s.installCommand || "");
      setSkillExample(s.usageExample || "");
      setSkillTags(s.tags?.join(", ") || "");
      setSkillFullContent(s.fullContent || "");
      setSkillRulesOnly(s.rulesOnly || "");
      setAgentsEditMode("rules");
    } else if (item.type === "prompt") {
      const p = item.data;
      setPromptTitle(p.title || "");
      setPromptChannel(p.channel || "araba");
      setPromptText(p.prompt || "");
      setPromptModel(p.targetModel || "Omni 1.1");
      setPromptRatio(p.aspectRatio || "9:16");
      setPromptTags(p.tags?.join(", ") || "");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const isAgentsMd = item.type === "skill" && item.data.id === "skill-agents-md";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (item.type === "skill") {
        let updatedFull = skillFullContent;
        let updatedRules = skillRulesOnly;

        if (isAgentsMd) {
          if (agentsEditMode === "rules") {
            // If editing rules-only, update rules part inside fullContent
            const marker = "# Proje Kuralları (Developer Rules)";
            const bannerEnd = "<!-- END:nextjs-agent-rules -->";
            const bannerIdx = skillFullContent.indexOf(bannerEnd);

            if (bannerIdx !== -1) {
              const banner = skillFullContent.slice(0, bannerIdx + bannerEnd.length);
              updatedFull = `${banner}\n\n${skillRulesOnly.trim()}\n`;
            } else {
              updatedFull = skillRulesOnly.trim();
            }
          } else {
            // Full content mode edited directly
            const marker = "# Proje Kuralları (Developer Rules)";
            const idx = skillFullContent.indexOf(marker);
            updatedRules = idx !== -1 ? skillFullContent.slice(idx).trim() : skillFullContent.trim();
          }
        }

        const updated: SkillItem = {
          ...item.data,
          name: skillName,
          category: skillCategory,
          description: skillDesc,
          installCommand: skillCmd,
          usageExample: skillExample,
          tags: skillTags.split(",").map((t) => t.trim()).filter(Boolean),
          fullContent: isAgentsMd ? updatedFull : item.data.fullContent,
          rulesOnly: isAgentsMd ? updatedRules : item.data.rulesOnly,
        };

        await onSaveSkill(updated);
      } else if (item.type === "prompt") {
        const updated: SocialPromptItem = {
          ...item.data,
          title: promptTitle,
          channel: promptChannel,
          channelName:
            promptChannel === "araba"
              ? "Otomotiv & Car Edits"
              : promptChannel === "cyberpunk"
              ? "Cyberpunk & Neon"
              : promptChannel === "luxury"
              ? "Lüks & Sinematik Yaşam"
              : "Özel Kategori",
          prompt: promptText,
          targetModel: promptModel,
          aspectRatio: promptRatio,
          tags: promptTags.split(",").map((t) => t.trim()).filter(Boolean),
        };

        await onSavePrompt(updated);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bu öğeyi silmek istediğinize emin misiniz?")) return;
    setIsSubmitting(true);
    try {
      if (item.type === "skill" && onDeleteSkill) {
        await onDeleteSkill(item.data.id);
      } else if (item.type === "prompt" && onDeletePrompt) {
        await onDeletePrompt(item.data.id);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl rounded-2xl glass-panel-elevated border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isAgentsMd ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
                  AGENTS.MD CANLI EDİTÖR
                </span>
              ) : item.type === "skill" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  SKİLL DÜZENLE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/40">
                  <Share2 className="w-3.5 h-3.5 text-violet-400" />
                  PROMPT DÜZENLE
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              {isAgentsMd
                ? "AGENTS.md & Proje Kurallarını Düzenle"
                : item.type === "skill"
                ? `Skill: ${item.data.name}`
                : `Prompt: ${item.data.title}`}
            </h2>
            <p className="text-xs text-zinc-400">
              {isAgentsMd
                ? "Değişiklikler projedeki gerçek AGENTS.md dosyasına ve sitedeki önizlemeye doğrudan yazılır."
                : "Bilgileri güncelleyip kaydedebilirsiniz."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-5">
          {/* SPECIAL CASE: AGENTS.md Dedicated Live Editor */}
          {isAgentsMd ? (
            <div className="space-y-4">
              {/* Tab Selector */}
              <div className="flex items-center justify-between gap-3 p-1 rounded-lg bg-black/40 border border-white/5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAgentsEditMode("rules")}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                      agentsEditMode === "rules"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Yalnızca Kurallar (# Proje Kuralları)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgentsEditMode("full")}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                      agentsEditMode === "full"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Tam Dosya (Next.js Bloğu Dahil)
                  </button>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                  Markdown formatı desteklenir
                </span>
              </div>

              {/* Editor Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>
                    {agentsEditMode === "rules"
                      ? "Proje Kuralları İçeriği:"
                      : "AGENTS.md Dosya İçeriği:"}
                  </span>
                  <span className="text-zinc-500">
                    {(agentsEditMode === "rules" ? skillRulesOnly : skillFullContent).length} karakter
                  </span>
                </div>
                <textarea
                  required
                  rows={14}
                  value={agentsEditMode === "rules" ? skillRulesOnly : skillFullContent}
                  onChange={(e) => {
                    if (agentsEditMode === "rules") {
                      setSkillRulesOnly(e.target.value);
                    } else {
                      setSkillFullContent(e.target.value);
                    }
                  }}
                  className="w-full p-4 rounded-xl text-xs font-mono glass-input text-zinc-200 placeholder:text-zinc-600 focus:border-emerald-500/50 leading-relaxed resize-y selection:bg-emerald-500/30"
                  placeholder="# Proje Kuralları (Developer Rules)..."
                  spellCheck={false}
                />
              </div>

              {/* Quick tip */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[11px] font-mono text-emerald-300/90 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Kaydettiğiniz anda hem projenizdeki <code className="text-white">AGENTS.md</code> dosyası güncellenir, hem de asistanınız bu kuralları anında tanır.
                </span>
              </div>
            </div>
          ) : item.type === "skill" ? (
            /* Regular Skill Form */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Skill Adı</label>
                  <input
                    type="text"
                    required
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Kategori</label>
                  <select
                    value={skillCategory}
                    onChange={(e) => setSkillCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200 bg-[#0d1017]"
                  >
                    <option value="agent">Agentic AI</option>
                    <option value="rules">Proje Kuralları</option>
                    <option value="terminal">Terminal / CLI</option>
                    <option value="design">Tasarım & UI</option>
                    <option value="automation">Otomasyon</option>
                    <option value="dev">Geliştirici</option>
                    <option value="custom">Özel</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Açıklama</label>
                <textarea
                  required
                  rows={2}
                  value={skillDesc}
                  onChange={(e) => setSkillDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Kurulum Komutu</label>
                <input
                  type="text"
                  required
                  value={skillCmd}
                  onChange={(e) => setSkillCmd(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                  placeholder="npx skills add ..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Kullanım Örneği</label>
                <textarea
                  rows={3}
                  value={skillExample}
                  onChange={(e) => setSkillExample(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                  placeholder="Örnek komut veya prompt..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={skillTags}
                  onChange={(e) => setSkillTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                  placeholder="agent, cli, ai"
                />
              </div>
            </div>
          ) : (
            /* Prompt Form */
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Prompt Başlığı</label>
                  <input
                    type="text"
                    required
                    value={promptTitle}
                    onChange={(e) => setPromptTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Kanal / Kategori</label>
                  <select
                    value={promptChannel}
                    onChange={(e) => setPromptChannel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200 bg-[#0d1017]"
                  >
                    <option value="araba">Otomotiv & Araba</option>
                    <option value="cyberpunk">Cyberpunk & Neon</option>
                    <option value="luxury">Lüks & Lifestyle</option>
                    <option value="custom">Özel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Hedef Model</label>
                  <input
                    type="text"
                    value={promptModel}
                    onChange={(e) => setPromptModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">En/Boy Oranı</label>
                  <select
                    value={promptRatio}
                    onChange={(e) => setPromptRatio(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200 bg-[#0d1017]"
                  >
                    <option value="9:16">9:16 (Reels/TikTok)</option>
                    <option value="16:9">16:9 (Yatay/YouTube)</option>
                    <option value="1:1">1:1 (Kare/Instagram)</option>
                    <option value="4:5">4:5 (Dikey Portre)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Prompt Metni</label>
                <textarea
                  required
                  rows={5}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200 leading-relaxed"
                  placeholder="Detaylı prompt içeriği..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={promptTags}
                  onChange={(e) => setPromptTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-mono glass-input text-zinc-200"
                />
              </div>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              {/* Delete button only if custom and delete handler provided */}
              {!isAgentsMd &&
                ((item.type === "skill" && item.data.isCustom && onDeleteSkill) ||
                  (item.type === "prompt" && item.data.isCustom && onDeletePrompt)) && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="px-3 py-2 rounded-lg text-xs font-mono font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Sil</span>
                  </button>
                )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                Vazgeç
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50 ${
                  isAgentsMd
                    ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/25"
                    : item.type === "skill"
                    ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/25"
                    : "bg-violet-500 hover:bg-violet-400 text-white shadow-violet-500/25"
                }`}
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Kaydediliyor..." : "Kaydet"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
