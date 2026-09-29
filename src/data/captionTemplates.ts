export interface CaptionPlatformData {
  platformId: "instagram" | "tiktok" | "youtube";
  platformName: string;
  badgeColor: string;
  iconName: string;
  tips: {
    tr: string;
    en: string;
  };
  templates: {
    tr: {
      caption: string;
      debateVariation?: string;
      hookText?: string;
      hookTip?: string;
      title?: string;
      titleVariations?: string[];
      description?: string;
      pinnedComment?: string;
      hashtags: string[];
    };
    en: {
      caption: string;
      debateVariation?: string;
      hookText?: string;
      hookTip?: string;
      title?: string;
      titleVariations?: string[];
      description?: string;
      pinnedComment?: string;
      hashtags: string[];
    };
  };
}

export const captionTemplates: CaptionPlatformData[] = [
  // ==========================================
  // 1. INSTAGRAM
  // ==========================================
  {
    platformId: "instagram",
    platformName: "Instagram",
    badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/25",
    iconName: "Instagram",
    tips: {
      tr: "Instagram'da başlık yok, ilk satır başlık gibi çalışır. İlk satır arama ve keşfet algoritması için her şeydir.",
      en: "Instagram has no title; the first line acts as the headline and is vital for Search and Explore reach."
    },
    templates: {
      tr: {
        caption: `Bu kaplama GERÇEK DEĞİL [MATERYAL] 🤯👇\n\n[ARAÇ] x [MATERYAL]\n\nSence olmuş mu? Kaça patlar?\n\nKaydet → ustana / arkadaşına at\nSıradaki ne olsun? Yoruma yaz\n\n#carwrap #wrapaesthetic #conceptcar #[ARAÇ_MARKASI]`,
        debateVariation: `Sanayide bunu 500 bine yapıyorlarmış...\n\n[ARAÇ] - [MATERYAL] kaplama\n\nDeğer mi? Yorumlarda kavga başlayacak 👇`,
        hookText: `[MATERYAL] [ARAÇ]`,
        hookTip: "Reels kapak görseline büyük ve okunaklı yazılacak metin.",
        hashtags: ["#carwrap", "#wrapaesthetic", "#conceptcar", "#[ARAÇ_MARKASI]", "#supercars", "#reels"]
      },
      en: {
        caption: `This is not real [MATERIAL] 🤯👇\n\n[CAR] fully wrapped in a [MATERIAL]\n\nWhat would it cost?\n\nSave→ Share with your friends\nWhat should be next?\n\n#carwrap #wrapaesthetic #[CAR_BRAND]`,
        debateVariation: `They said they do this for $50k in the shop...\n\n[CAR] - [MATERIAL] wrap\n\nWorth it or not? Let the fight start 👇`,
        hookText: `[MATERIAL] [CAR]`,
        hookTip: "Cover text overlay for Instagram Reels.",
        hashtags: ["#carwrap", "#wrapaesthetic", "#[CAR_BRAND]", "#conceptcar", "#supercars"]
      }
    }
  },

  // ==========================================
  // 2. TIKTOK
  // ==========================================
  {
    platformId: "tiktok",
    platformName: "TikTok",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
    iconName: "Music2",
    tips: {
      tr: "TikTok'ta ilk 2 saniyedeki ekran yazısı + açıklama + ses kritiktir. Açıklamayı kısa tutun.",
      en: "On TikTok, the first 2 seconds on-screen hook + short caption + trending audio drive retention."
    },
    templates: {
      tr: {
        caption: `POV: [ARAÇ] [MATERYAL] kaplatıyorsun ✨\n\nGerçek mi AI mı? #carwrap #cartok #fyp #[ARAÇ_MARKASI]`,
        debateVariation: `Bu kaplama kaça patlar? 💸 [ARAÇ] x [MATERYAL] #carwrap #arabakapla`,
        hookText: `Bu [ARAÇ] GERÇEK DEĞİL`,
        hookTip: "Videonun tam 1. saniyesine ekle. Bu metin TikTok'ta %40 daha fazla izletir çünkü insanlar 'ne demek gerçek değil?' diyerek videoda kalır.",
        hashtags: ["#carwrap", "#cartok", "#fyp", "#[ARAÇ_MARKASI]", "#arabakapla", "#viraltiktok"]
      },
      en: {
        caption: `POV: your [CAR] is [MATERIAL] 😳 ✨\n\nReal or AI? #carwrap #[CAR_BRAND]`,
        debateVariation: `How much would this wrap cost? 💸 [CAR] x [MATERIAL] #carwrap #carsoftiktok`,
        hookText: `This [CAR] is NOT REAL`,
        hookTip: "Add on-screen in the first second. Boosts retention by 40% because viewers freeze to verify.",
        hashtags: ["#carwrap", "#[CAR_BRAND]", "#cartok", "#fyp", "#viral"]
      }
    }
  },

  // ==========================================
  // 3. YOUTUBE
  // ==========================================
  {
    platformId: "youtube",
    platformName: "YouTube",
    badgeColor: "text-red-400 bg-red-500/10 border-red-500/25",
    iconName: "Youtube",
    tips: {
      tr: "YouTube başlıkları 60 karakteri geçmemelidir. Açıklamada Omni 1.1 model atfı yer almalıdır.",
      en: "Keep titles under 60 characters for mobile display. Disclose Google Flow - Omni 1.1 AI in description."
    },
    templates: {
      tr: {
        title: `Bu [ARAÇ] tamamen [MATERYAL] - Gerçek mi? 🤯`,
        titleVariations: [
          `Bu [ARAÇ] [MATERYAL] kaplansa kaça patlar?`,
          `[ARAÇ] x [MATERYAL] - Olmuş mu? 👇`
        ],
        description: `Bu [ARAÇ] tamamen [MATERYAL] ile kaplandı. Gerçek olsaydı trafiğe çıkar mıydı?\n\nBu video Google Flow - Omni 1.1 ile AI konsept olarak üretildi.\n\nSıradaki araba ne olsun? Yoruma yaz, en çok isteneni yapacağım.\n\n#[ARAÇ_MARKASI] #carwrap #aiart #concept #shorts`,
        pinnedComment: `Gerçek kaplama mı yoksa AI mı? Tahminleri alalım 👇 Sıradaki ne olsun?`,
        caption: `Bu [ARAÇ] tamamen [MATERYAL] - Gerçek mi? 🤯`,
        hookText: `[MATERYAL] [ARAÇ]`,
        hookTip: "Shorts kapak ve video başlangıç kancası.",
        hashtags: ["#[ARAÇ_MARKASI]", "#carwrap", "#aiart", "#concept", "#shorts", "#automotive"]
      },
      en: {
        title: `This [CAR] is [MATERIAL] - Real or AI? 😳`,
        titleVariations: [
          `This [CAR] wrapped in [MATERIAL] - How much?`,
          `[CAR] x [MATERIAL] - Did we ruin it? 👇`
        ],
        description: `Is this [CAR] wrapped with [MATERIAL] Real or AI\n\nThis video was generated with Google Flow - Omni 1.1 as an AI concept wrap design.\n\nWhat car should I do next? Comment below.\n\n#[CAR_BRAND] #carwrap #aiart #conceptcar #shorts`,
        pinnedComment: `Real wrap or AI? Guess below 👇 What should I wrap next?`,
        caption: `This [CAR] is [MATERIAL] - Real or AI? 😳`,
        hookText: `[MATERIAL] [CAR]`,
        hookTip: "Shorts thumbnail and opening hook phrase.",
        hashtags: ["#[CAR_BRAND]", "#carwrap", "#aiart", "#conceptcar", "#shorts", "#supercars"]
      }
    }
  }
];
