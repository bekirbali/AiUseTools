"use client";

import { useState, useRef, useEffect } from "react";
import {
  VehicleModelItem,
  WrapStyleItem,
  SkillItem,
  SocialPromptItem,
  ChatMessage,
} from "@/types";
import { initialCarGroups } from "@/data/carGroups";
import { initialWrapGroups } from "@/data/wrapGroups";
import CopyButton from "./CopyButton";
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  Terminal,
  Car,
  Lightbulb,
  Wand2,
  Check,
  ChevronRight,
  User,
} from "lucide-react";

interface ChatAiTabProps {
  vehicles: VehicleModelItem[];
  wraps: WrapStyleItem[];
  skills: SkillItem[];
  prompts: SocialPromptItem[];
  onTriggerToast: (msg: string) => void;
  onNavigateToStudio?: (carId: string, wrapId: string) => void;
}

export default function ChatAiTab({
  vehicles,
  wraps,
  skills,
  prompts,
  onTriggerToast,
  onNavigateToStudio,
}: ChatAiTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init-1",
      sender: "assistant",
      text: "Selam! Ben senin yapay zeka operasyon ve içerik asistanınım 🧠✨\n\nSitedeki tüm AI skillerine, terminal komutlarına, sosyal medya promptlarına ve araç-kaplama arşivine tam hakimim. Bana örneğin:\n• **'Bugün hangi arabaya hangi kaplamayı yapalım?'**\n• **'Reels için viral bir araba promptu üret'**\n• **'Tasarım denetimi veya agent skilli nasıl eklerim?'**\ngibi sorular sorabilir, fikir danışabilirsin. Bugün ne üretmek istersin?",
      timestamp: "Şimdi",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Quick suggestion chips
  const quickQuestions = [
    "Bugün hangi arabaya hangi kaplamayı yapalım?",
    "Reels için viral bir araba promptu ver",
    "Yeni bir AI Skill nasıl eklenir ve kullanılır?",
    "Cyberpunk temalı bir konsept promptu üret",
    "BMW M4 için en iyi kaplama ve ortam nedir?",
  ];

  // AI response engine that knows site content deeply
  const generateResponse = (userQuery: string): { text: string; action?: any } => {
    const q = userQuery.toLowerCase();

    // 1. "hangi arabaya hangi kaplama" or "ne yapalım"
    if (
      q.includes("hangi araba") ||
      q.includes("hangi kaplama") ||
      q.includes("bugün hangi") ||
      q.includes("araba öner") ||
      q.includes("kaplama öner") ||
      q.includes("kombinasyon")
    ) {
      // Pick dynamic combination
      const car = vehicles[Math.floor(Math.random() * vehicles.length)];
      const wrap = wraps[Math.floor(Math.random() * wraps.length)];
      const readyPrompt = `Cinematic 9:16 vertical rolling tracking shot of a ${car.promptSnippet}, ${wrap.promptSnippet}. Speeding on rain-slicked asphalt in neon-lit Shinjuku Tokyo at midnight, deep specular reflections, water spray mist, ARRI Alexa Mini, 50mm anamorphic lens, photorealistic 8k --ar 9:16 --v 6.1 --style raw`;

      return {
        text: `Harika bir gün ve efsane bir kombinasyon seçtim senin için! 🔥🏎️\n\n📌 **Araç:** **${car.brand} ${car.model}** (${car.category})\n🎨 **Kaplama:** **${wrap.name}** (${wrap.finishType})\n💡 **Neden Bu Kombinasyon?**: ${wrap.description} Bu kaplama, özellikle gece ışıklandırmasında ve ıslak yansımalarda Instagram Reels / TikTok üzerinde olağanüstü yüksek izlenme ve kaydetme (save rate) alıyor.\n\nİşte Midjourney v6.1 / Flux için kullanabileceğin hazır promptun:\n\n\`\`\`\n${readyPrompt}\n\`\`\`\n\nAşağıdaki butona basarak promptu hemen kopyalayabilirsin!`,
        action: {
          type: "copy",
          label: "Önerilen Promptu Kopyala",
          payload: readyPrompt,
        },
      };
    }

    // 2. Skills question: how to add, which skills
    if (
      q.includes("skill") ||
      q.includes("nasıl eklenir") ||
      q.includes("nasıl kurulur") ||
      q.includes("komut") ||
      q.includes("terminal") ||
      q.includes("nasıl kullan")
    ) {
      const skillList = skills
        .slice(0, 3)
        .map((s) => `• **${s.name}**: \`$ ${s.installCommand}\``)
        .join("\n");

      return {
        text: `Yapay zeka skillerini projene eklemek ve kullanmak çok basittir! 🛠️\n\n**1. Terminal Komutu:** İlgili skill komutunu terminalde çalıştırırsın:\n${skillList}\n\n**2. Nasıl Çalışır?**: Kurulum yapıldığında skill dosyası projenin \`.agents/skills/\` dizinine indirilir. Yapay zeka agent'ı (Antigravity veya Cursor) bu dosyayı hafızasına alır ve ilgili konularda otonom olarak bu kurallara uyar.\n\n**3. Kullanım**: Örneğin tasarım kontrolü yapmak için asistana:\n*\`"Sayfamı web-design-guidelines kuralına göre incele"\`* demen yeterlidir!`,
        action: {
          type: "copy",
          label: "Web Design Skill Komutunu Kopyala",
          payload: "npx skills add web-design-guidelines",
        },
      };
    }

    // 3. Reels / viral question
    if (q.includes("reels") || q.includes("viral") || q.includes("tiktok") || q.includes("keşfet")) {
      const promptItem = prompts.find((p) => p.channel === "araba") || prompts[0];
      return {
        text: `Reels & TikTok için şu an en çok etkileşim alan formül **'High Contrast Rolling Shot' + 'Satin Wrap'** kombinasyonudur. 📈\n\n**Tavsiye Format:** 9:16 dikey en/boy oranı, 3 saniyelik güçlü kanca (hook) ve arkada phonk/bass müzik.\n\n**Önerilen Prompt Başlığı:** ${promptItem.title}\n\n\`\`\`\n${promptItem.prompt}\n\`\`\`\n\n💡 **Viral İpucu:** ${promptItem.engagementTip || "Video kapağına 'Wrap mi Paint mi?' anketi koymayı unutma!"}`,
        action: {
          type: "copy",
          label: "Viral Promptu Kopyala",
          payload: promptItem.prompt,
        },
      };
    }

    // 4. Cyberpunk question
    if (q.includes("cyberpunk") || q.includes("sci-fi") || q.includes("fütüristik") || q.includes("gelecek")) {
      const cyberPrompt = prompts.find((p) => p.channel === "cyberpunk") || prompts[4];
      return {
        text: `Cyberpunk teması için arşivimizdeki en güçlü konsept:\n\n**Başlık:** ${cyberPrompt.title}\n\n\`\`\`\n${cyberPrompt.prompt}\n\`\`\`\n\nNeon ışık kırılmaları ve yağmur damlaları bu görseli benzersiz kılacaktır!`,
        action: {
          type: "copy",
          label: "Cyberpunk Promptu Kopyala",
          payload: cyberPrompt.prompt,
        },
      };
    }

    // 5. BMW specific question
    if (q.includes("bmw") || q.includes("m4")) {
      return {
        text: `BMW M4 Competition G82 için arşivimizdeki en iyi eşleşme: **Nardo Grey Chalk Matte** veya **Satin Midnight Purple**!\n\nÖnerilen sahne: İsviçre Alpleri virajında hareketli çekim (rolling shot) veya fütüristik yeraltı otoparkında sarı CSL DRL farları açık vaziyette.\n\n\`\`\`\nAggressive rolling camera tracking shot of 2024 BMW M4 Competition G82 in matte Nardo Grey finish with M Performance carbon canards, glowing yellow ceramic DRL headlights, serpentine Swiss Alps mountain pass with dramatic morning mist, motion blur on forged wheels --ar 9:16 --v 6.1\n\`\`\``,
        action: {
          type: "copy",
          label: "BMW M4 Promptunu Kopyala",
          payload: "Aggressive rolling camera tracking shot of 2024 BMW M4 Competition G82 in matte Nardo Grey finish with M Performance carbon canards, glowing yellow ceramic DRL headlights, serpentine Swiss Alps mountain pass with dramatic morning mist, motion blur on forged wheels --ar 9:16 --v 6.1",
        },
      };
    }

    // Fallback creative assistant answer
    const totalCars = initialCarGroups.reduce((acc, g) => acc + g.cars.length, 0);
    const totalWraps = initialWrapGroups.reduce((acc, g) => acc + g.wraps.length, 0);
    return {
      text: `Bu konuda sana yardımcı olabilirim! Arşivimizde kayıtlı **${totalCars} araç modeli**, **${totalWraps} özel kaplama çeşidi**, **${skills.length} yapay zeka skilli** ve **${prompts.length} sosyal medya promptu** bulunuyor.\n\nDilersen:\n• Yeni bir araba veya kaplama kombinasyonu oluşturabiliriz,\n• Sosyal medya hesapların için hedef kitleye özel yeni prompt üretebiliriz,\n• Veya terminal kodlarını nasıl otomatize edeceğini konuşabiliriz.\n\nÖzel bir araç veya stil belirtmek ister misin?`,
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Şimdi",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateResponse(query);
      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        text: responseData.text,
        timestamp: "Şimdi",
        quickAction: responseData.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "msg-reset",
        sender: "assistant",
        text: "Sohbet temizlendi. Yeniden başlamaya hazırım! Bugün ne üretmek istersin?",
        timestamp: "Şimdi",
      },
    ]);
    onTriggerToast("Sohbet geçmişi temizlendi.");
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel p-5 rounded-xl border border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <div className="w-full h-full bg-[#090b10] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                Omni-AI Asistanı // Akıl Danışma & Arama
              </h2>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Site içi tüm skilleri, araba modellerini ve kaplamaları bilen yapay zeka asistanı.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          aria-label="Sohbet geçmişini temizle"
          className="p-2 rounded-lg text-zinc-400 hover:text-red-300 hover:bg-red-500/10 border border-white/5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
          title="Sohbeti Temizle"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-xl glass-panel-elevated border border-white/[0.08] p-4 md:p-6 min-h-[480px] max-h-[580px] flex flex-col justify-between">
        <div className="overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-4 space-y-2 text-xs md:text-sm font-sans ${
                    isUser
                      ? "bg-violet-600/30 border border-violet-500/40 text-white rounded-tr-none shadow-[0_4px_20px_rgba(139,92,246,0.2)]"
                      : "bg-[#090b12] border border-white/10 text-zinc-200 rounded-tl-none shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 pb-1 border-b border-white/5 text-[10px] font-mono text-zinc-400">
                    <span className="font-semibold text-zinc-300">
                      {isUser ? "SEN" : "AI ASİSTAN"}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed text-zinc-200 font-sans">
                    {msg.text}
                  </div>

                  {msg.quickAction && (
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-cyan-300">
                        Hızlı Aksiyon:
                      </span>
                      <CopyButton
                        textToCopy={msg.quickAction.payload}
                        label={msg.quickAction.label}
                        size="sm"
                        className="bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 text-cyan-200"
                        onCopied={() =>
                          onTriggerToast("Önerilen içerik panoya kopyalandı! 🚀")
                        }
                      />
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-300 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3 text-xs font-mono text-cyan-400/80 pl-2">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Yapay zeka asistanı düşünüyor ve içeriği tarıyor...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Area: Quick Suggestions + Input */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          {/* Quick chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 shrink-0">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Hızlı Sorular:
            </span>
            {quickQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono glass-pill text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer text-left"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              id="chat-message-input"
              name="chat-message"
              aria-label="Asistana danışın veya mesajınızı yazın"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Asistana danış: 'Bugün hangi arabaya hangi kaplamayı yapalım?'…"
              autoComplete="off"
              className="flex-1 px-4 py-3 rounded-xl glass-input text-xs md:text-sm font-sans text-white placeholder:text-zinc-500 focus:border-cyan-500/50"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              aria-label="Mesajı gönder"
              className="px-5 py-3 rounded-xl font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black transition-colors duration-150 flex items-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            >
              <span>GÖNDER</span>
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
