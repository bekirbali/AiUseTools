import { SkillItem } from "@/types";

export const AGENTS_MD_RAW = `<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in \`node_modules/next/dist/docs/\` (resolved from this file's directory; in monorepos the \`next\` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by \`next dev\` — verify at \`node_modules/next/dist/server/lib/generate-agent-files.js\`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Proje Kuralları (Developer Rules)

1. **Net Soru Cümlesi Kuralı (Strict):**
   Kullanıcı net bir soru cümlesi sorduğunda (durum tespiti, bilgi veya inceleme sorusu):
   - **KESİNLİKLE hiçbir kod değişikliği, dosya düzenlemesi veya otonom işlem yapma.**
   - Sadece ve sadece sorulan sorunun doğrudan cevabını ver.
   - Değişiklik veya aksiyon gerekiyorsa, bunu önce kullanıcıya söyle ve açık onay iste.
2. **Görsel & Ergonomi Zorunlu Denetim Kuralı (Visual & UX Audit):**
   Arayüzde (UI) yapılan her değişiklik sonrasında sadece "kod çalıştı mı / tıklandı mı" kontrolü YETMEZDİR. Aşağıdaki 4 maddeye göre eleştirel gözle bakılmalıdır:
   - **Sekme & Buton Kompaktlığı:** Sekmeler, filtreler ve butonlar asla uzun cümle/açıklama içeremez. En fazla 1-3 kelimelik net, kısa etiketler olmalıdır (Örn: "Akan Materyalli & Çatlak Zırhlı..." yerine doğrudan "Akan Detay").
   - **Görsel Kalabalık ve Taşma (Clutter / Overflow):** Ekranı gereksiz yere dolduran, yatayda kaymaya zorlayan veya hantal duran başlık/metin yoğunluğu varsa derhal sadeleştirilmelidir.
   - **İnsan Gözüyle Ön İnceleme:** Ekran görüntüsü alındığında alt ajan sadece teknik başarıya değil; "Bu sayfa göze şık ve düzenli geliyor mu, yoksa kaba mı duruyor?" sorusuna dürüst yanıt vermelidir.
   - **Gereksiz İnisiyatif Yasağı:** Kullanıcı sadece tespit veya geri bildirim yaptığında ("böyle kalsın", "neyse" dediğinde) açık talimat gelmedikçe kod düzenlemesi başlatılamaz.
`;

export const AGENTS_RULES_ONLY = `# Proje Kuralları (Developer Rules)

1. **Net Soru Cümlesi Kuralı (Strict):**
   Kullanıcı net bir soru cümlesi sorduğunda (durum tespiti, bilgi veya inceleme sorusu):
   - **KESİNLİKLE hiçbir kod değişikliği, dosya düzenlemesi veya otonom işlem yapma.**
   - Sadece ve sadece sorulan sorunun doğrudan cevabını ver.
   - Değişiklik veya aksiyon gerekiyorsa, bunu önce kullanıcıya söyle ve açık onay iste.
2. **Görsel & Ergonomi Zorunlu Denetim Kuralı (Visual & UX Audit):**
   Arayüzde (UI) yapılan her değişiklik sonrasında sadece "kod çalıştı mı / tıklandı mı" kontrolü YETMEZDİR. Aşağıdaki 4 maddeye göre eleştirel gözle bakılmalıdır:
   - **Sekme & Buton Kompaktlığı:** Sekmeler, filtreler ve butonlar asla uzun cümle/açıklama içeremez. En fazla 1-3 kelimelik net, kısa etiketler olmalıdır (Örn: "Akan Materyalli & Çatlak Zırhlı..." yerine doğrudan "Akan Detay").
   - **Görsel Kalabalık ve Taşma (Clutter / Overflow):** Ekranı gereksiz yere dolduran, yatayda kaymaya zorlayan veya hantal duran başlık/metin yoğunluğu varsa derhal sadeleştirilmelidir.
   - **İnsan Gözüyle Ön İnceleme:** Ekran görüntüsü alındığında alt ajan sadece teknik başarıya değil; "Bu sayfa göze şık ve düzenli geliyor mu, yoksa kaba mı duruyor?" sorusuna dürüst yanıt vermelidir.
   - **Gereksiz İnisiyatif Yasağı:** Kullanıcı sadece tespit veya geri bildirim yaptığında ("böyle kalsın", "neyse" dediğinde) açık talimat gelmedikçe kod düzenlemesi başlatılamaz.
`;

export const initialSkills: SkillItem[] = [
  {
    id: "skill-agents-md",
    name: "AGENTS.md (Proje & Ajan Kuralları)",
    category: "rules",
    description: "Yapay zeka kodlama ajanları (Antigravity, Cursor, Claude Code) için soru protokolü, otonom kod engeli ve UI/UX görsel denetim direktifleri. Yeni projelere doğrudan kopyalayıp ekleyin.",
    installCommand: "touch AGENTS.md",
    usageExample: "Projenin kök dizininde AGENTS.md dosyası oluşturup içeriği yapıştırın. Yapay zeka asistanı kuralları otomatik okur.",
    tags: ["AGENTS.md", "Proje Kuralları", "Antigravity", "Cursor", "Strict Rules", "Next.js"],
    docs: "Net soru kuralı, görsel ve ergonomi UI denetimi, buton kompaktlığı ve gereksiz inisiyatif yasağını içerir.",
    fullContent: AGENTS_MD_RAW,
    rulesOnly: AGENTS_RULES_ONLY,
  },
  {
    id: "skill-1",
    name: "Design Guidelines (web-design-guidelines)",
    category: "design",
    description: "Web arayüzlerini ve UI bileşenlerini modern tasarım prensipleri ve erişilebilirlik (WCAG) standartlarına göre denetler.",
    installCommand: 'npx skills add vercel-labs/agent-skills --skill "web-design-guidelines"',
    usageExample: "agy \"Review my current page layout against modern web design guidelines and check contrast\"",
    tags: ["Design Guidelines", "UI/UX", "Audit", "Accessibility"],
    docs: "Arayüzün font hiyerarşisi, renk kontrast oranları, touch-target boyutları ve gereksiz görsel karmaşayı tespit eder.",
  },
  {
    id: "skill-2",
    name: "Taste Skill (design-taste-frontend)",
    category: "design",
    description: "Şablonik ve yapay zeka jenerikliği kokmayan, gerçek tasarım sistemlerine uygun, anti-slop premium ön yüz kodları üretir.",
    installCommand: 'npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"',
    usageExample: "agy \"Design a luxury automotive showcase landing page using strict anti-slop guidelines\"",
    tags: ["Taste Skill", "Design System", "Anti-Slop", "Tailwind"],
    docs: "Jenerik 'AI moru' butonlar yerine özel HSL paletleri, mikro-animasyonlar ve tipografik denge kuralları işletir.",
  },
  {
    id: "skill-image-to-code",
    name: "Image to Code (image-to-code)",
    category: "design",
    description: "Referans arayüz görsellerini, mockup'ları ve tasarım referanslarını doğrudan temiz ve modern kod bloklarına (HTML/Tailwind/React) dönüştürür.",
    installCommand: 'npx skills add https://github.com/Leonxlnx/taste-skill --skill "image-to-code"',
    usageExample: 'agy "Convert this car showcase screenshot into a Next.js Tailwind component using image-to-code"',
    tags: ["Image to Code", "Taste Skill", "Frontend", "OCR", "Component"],
    docs: "Görseldeki tipografi oranlarını, padding/margin hiyerarşisini ve cam efektlerini piksel hassasiyetinde CSS bileşenlerine çevirir.",
  },
  {
    id: "skill-3",
    name: "Antigravity Agentic Guide",
    category: "agent",
    description: "Antigravity CLI ve Agentic Coding ekosisteminin tüm slash komutları, subagent mimarisi ve kurallarını yönetir.",
    installCommand: "npx skills add antigravity-guide",
    usageExample: "agy \"Explain how subagent transcripts and background tasks interact with the workspace\"",
    tags: ["CLI", "Agentic", "Customization", "Workflow"],
    docs: "Rules, skills, subagents ve MCP sunucuları arasındaki entegrasyon protokollerini ve log sistemini açıklar.",
  },
  {
    id: "skill-4",
    name: "Chrome DevTools & Headless Browser Subagent",
    category: "automation",
    description: "Web sayfalarını tarayıcıda açar, DOM okur, ekran görüntüsü alır ve web etkileşimlerini otomatik video olarak kaydeder.",
    installCommand: "pnpm dlx @modelcontextprotocol/server-puppeteer",
    usageExample: "browser_subagent --url \"https://instagram.com\" --task \"Capture feed layout and check responsiveness\"",
    tags: ["Browser", "Testing", "Puppeteer", "Screenshots"],
    docs: "Otomatik WebP video kaydı ve DOM denetimi sağlar. Headless tarayıcıda görsel regresyon testleri çalıştırır.",
  },
  {
    id: "skill-5",
    name: "Flux.1 / Midjourney Prompt Optimizer",
    category: "terminal",
    description: "Ham fikirleri Midjourney v6.1 ve Flux.1 Dev modelleri için kusursuz fotogerçekçi kamera ve ışık parametrelerine çevirir.",
    installCommand: "npx ai-prompt-engineer --target flux-dev,midjourney-v6.1",
    usageExample: "prompt-gen --subject \"Porsche GT3 RS in Tokyo rain\" --style \"editorial cinematography\" --ar 9:16",
    tags: ["Image Gen", "Flux.1", "Midjourney", "Camera Lens"],
    docs: "Sensör tipi (Hasselblad, ARRI Alexa), diyafram (f/1.8), ISO ve ışık kurulumlarını (rim light, volumetric fog) otomatik optimize eder.",
  },
  {
    id: "skill-6",
    name: "Social Media Batch Poster CLI",
    category: "automation",
    description: "Üretilen araba ve konsept görsellerini Instagram Reels, TikTok ve YouTube Shorts için zamanlar ve metadata ekler.",
    installCommand: "npx social-agent-cli --setup-accounts instagram,tiktok",
    usageExample: "social-cli publish --media ./render.png --caption \"Satin Midnight Purple GT3 RS in Tokyo 🏎️🔥\" --tags \"#hypercar #carwrap\"",
    tags: ["Social Media", "Reels", "TikTok", "Auto-Publish"],
    docs: "Başlık, hashtag grupları ve video formatı dönüştürme işlemlerini terminalden tek komutla yönetir.",
  },
  {
    id: "skill-7",
    name: "Real-ESRGAN / AI 4K Upscaler Tool",
    category: "terminal",
    description: "Yapay zeka ile üretilen araç render'larını 4K / 8K çözünürlüğe detayı kaybetmeden yükseltir.",
    installCommand: "pip install realesrgan-ncnn-vulkan-python",
    usageExample: "python -m realesrgan --input ./car_concept.png --output ./car_4k.png --scale 4",
    tags: ["Upscale", "4K", "Post-Processing", "Texture"],
    docs: "Özellikle araç kaplama dokuları, karbon fiber örgüleri ve far yansımalarındaki yapaylıkları düzeltir.",
  },
  {
    id: "skill-8",
    name: "Security & Secret Leak Auditor",
    category: "dev",
    description: "Kod tabanında ve prompt arşivinde yanlışlıkla kalan API anahtarlarını ve gizli tokenları kontrol eder.",
    installCommand: "npx gitleaks detect --verbose",
    usageExample: "gitleaks detect --source . --report-path leaks.json",
    tags: ["Security", "API Keys", "Git", "Compliance"],
    docs: "OpenAI, Replicate, Fal.ai veya Midjourney API key sızıntılarını önler.",
  }
];
