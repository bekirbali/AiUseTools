import { SocialPromptItem } from "@/types";

export const initialPrompts: SocialPromptItem[] = [
  {
    id: "prompt-car-1",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "Yağmurlu Tokyo'da Porsche GT3 RS (Satin Midnight Purple)",
    prompt: "Cinematic 9:16 vertical action shot of a 2024 Porsche 911 GT3 RS with custom Satin Midnight Purple liquid vinyl wrap and exposed forged carbon fiber aero wing. Parked on wet asphalt in Shinjuku Tokyo at night. Glowing neon reflections of violet and cyan on the wet asphalt. Water droplets beaded on the deep purple metallic hood. Shot on ARRI Alexa Mini, 50mm anamorphic lens, shallow depth of field, raytraced reflections, ultra-photorealistic, 8k resolution, editorial automotive magazine cover --ar 9:16 --v 6.1 --style raw",
    negativePrompt: "cartoon, low resolution, blurry, distorted body lines, missing headlights, oversaturated fake reflections",
    targetModel: "Midjourney v6.1",
    aspectRatio: "9:16",
    parameters: "--ar 9:16 --v 6.1 --style raw --q 2",
    tags: ["Porsche", "Tokyo Night", "Midnight Purple", "Reels", "Wet Asphalt"],
    engagementTip: "Reels / TikTok için arka plana Phonk veya Synthwave koyarak 'Wrap or Paint?' anketi ile paylaşın. Etkileşimi 3x artırır."
  },
  {
    id: "prompt-car-2",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "Alplerde Viraj Alan BMW M4 Competition (Nardo Grey)",
    prompt: "Aggressive rolling camera tracking shot of a 2024 BMW M4 Competition G82 in matte Nardo Grey finish with M Performance carbon front canards and ceramic yellow DRLs. Speeding through a serpentine Swiss Alps mountain pass with dramatic mist and early morning sunrise breaking through clouds. Motion blur on the custom forged wheels and asphalt, perfectly sharp car body. Shot on Sony FX3 with 35mm GM lens, dynamic gimbal movement, photorealistic automotive commercial grade --ar 9:16 --v 6.1",
    negativePrompt: "static wheels, unreal engine slop, plastic texture, fake smoke, 3d render look",
    targetModel: "Flux.1 Dev",
    aspectRatio: "9:16",
    parameters: "--ar 9:16 --guidance 3.5",
    tags: ["BMW M4", "Nardo Grey", "Swiss Alps", "Rolling Shot", "Morning Sun"],
    engagementTip: "Videoda egzoz sesi ('Cold start vs Downshift') temalı bir ses efektiyle birleştirin."
  },
  {
    id: "prompt-car-3",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "Gün Batımı Otoyolunda Nissan Skyline GT-R R34 (Chameleon Wrap)",
    prompt: "Low-angle rear three-quarter shot of an iconic Nissan Skyline GT-R R34 V-Spec II with a chameleon iridescent wrap shifting between deep emerald green and bronze. Huge titanium burnt exhaust tip idling with faint heat distortion wave. Driving along the California Pacific Coast Highway during golden hour. Warm orange sunlight bouncing off the flared fenders, Nismo LMGT4 black bronze wheels. 35mm film grain, Kodachrome color tone, nostalgic JDM aesthetics --ar 16:9 --v 6.1",
    targetModel: "Midjourney v6.1",
    aspectRatio: "16:9",
    parameters: "--ar 16:9 --v 6.1 --stylize 250",
    tags: ["JDM", "Skyline R34", "Chameleon Wrap", "Golden Hour", "PCH"],
    engagementTip: "YouTube Shorts ve Instagram Carousel için 'JDM Legends never die' serisinin ilk karesi olarak ideal."
  },
  {
    id: "prompt-car-4",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "Fütüristik Stüdyoda Lamborghini Revuelto (Matte Stealth Black)",
    prompt: "Ultra-minimalist dark infinity studio showcase of Lamborghini Revuelto in matte stealth radar-absorbent black with neon orange brake calipers and Y-shaped DRL glow. Dramatic rim lighting slicing along the hexagonal carbon body lines. Subtle dry ice fog creeping across the glossy mirror floor reflecting the rear active wing. High-end automotive commercial still, Hasselblad H6D-100c, f/8, crisp macro reflections --ar 9:16 --v 6.1",
    targetModel: "Midjourney v6.1",
    aspectRatio: "9:16",
    parameters: "--ar 9:16 --v 6.1 --no cartoon, 3d render",
    tags: ["Lamborghini", "Stealth Black", "Dark Studio", "V12", "Minimalist"],
    engagementTip: "'Dark Mode On 🦇' başlığıyla Reels kapağı olarak kullanıldığında tıklanma oranı %40 artıyor."
  },
  {
    id: "prompt-cyber-1",
    channel: "cyberpunk",
    channelName: "Cyberpunk & Fütüristik Teknoloji",
    title: "Neo-Tokyo Uçan Siber Taksi ve Yağmurlu Gökyüzü Otoyolu",
    prompt: "Futuristic vertical perspective of a retro-futuristic Cyberpunk flying hover-car navigating between towering holographic skyscrapers in Neo-Seoul 2099. Heavy perpetual acid rain with neon green and magenta billboard glare reflecting in windshield puddles. The pilot visible inside with cybernetic optic implants and illuminated dashboard telemetry. Syd Mead inspired retro-futurism, cinematic lighting, photorealistic, 8k --ar 9:16 --v 6.1",
    targetModel: "Flux.1 Dev",
    aspectRatio: "9:16",
    parameters: "--ar 9:16 --v 6.1",
    tags: ["Cyberpunk", "Hovercar", "Neo Tokyo", "Sci-Fi", "Hologram"],
    engagementTip: "'2099 yılında taksi beklerken...' kurgusuyla müzikli video oluşturun."
  },
  {
    id: "prompt-cyber-2",
    channel: "cyberpunk",
    channelName: "Cyberpunk & Fütüristik Teknoloji",
    title: "Siber-Mekanik Kol ile Sokak Lezzeti Hazırlayan Şef",
    prompt: "Hyper-detailed close-up street vendor in a neon alleyway of Hong Kong cyberpunk future. The chef possesses a polished chrome and matte carbon-fiber prosthetic cybernetic arm with delicate micro-actuators, masterfully stir-frying noodles in a flaming wok. Steam rising into the neon vapor lights, intense amber and cyan color contrast, cinematic depth of field, 85mm portrait, photorealistic skin pores and grease details --ar 9:16 --v 6.1",
    targetModel: "Midjourney v6.1",
    aspectRatio: "9:16",
    parameters: "--ar 9:16 --v 6.1 --style raw",
    tags: ["Cyborg", "Street Food", "Neon", "Cyberpunk", "Cinematic"],
    engagementTip: "Storytelling formatında yapay zeka reel serisi için yüksek kaydetme oranı getirir."
  },
  {
    id: "prompt-lux-1",
    channel: "luxury",
    channelName: "Lüks Yaşam & Mimari Estetik",
    title: "Dubai Skyline Manzaralı Sonsuzluk Havuzlu Penthouse",
    prompt: "Cinematic golden hour architectural photograph of a high-ceiling ultra-luxury modern minimalist penthouse terrace in Dubai. Travertine marble floors leading to a glass-edge cantilever infinity pool reflecting the Burj Khalifa skyline at dusk. Warm recessed architectural LED strip lights, bespoke walnut furniture, olive bonsai tree in concrete planter. Architectural Digest magazine style, Hasselblad 24mm, natural diffused light, ultra-luxurious, calming aesthetic --ar 9:16 --v 6.1",
    targetModel: "Flux.1 Dev",
    aspectRatio: "9:16",
    parameters: "--ar 9:16 --style raw",
    tags: ["Luxury", "Penthouse", "Dubai", "Architecture", "Infinity Pool"],
    engagementTip: "'Böyle bir yerde uyanmak ister miydin?' sorusuyla yüksek yorum etkileşimi sağlar."
  },
  {
    id: "prompt-portrait-1",
    channel: "portrait",
    channelName: "Moda & Ultra-Gerçekçi Portre",
    title: "Yağmurlu Günde Pencere Kenarı Doğal Işık Portresi",
    prompt: "Raw natural light portrait of a stylish woman wearing a brushed oversized charcoal wool coat, standing by a café window covered in rain droplets. Soft diffused overcast natural daylight illuminating realistic skin texture, individual eyelash strands, subtle freckles, no airbrushing. 85mm f/1.4 lens, creamy bokeh, muted Scandinavian film tones, Kodak Portra 400 aesthetic, candid documentary fashion editorial --ar 4:5 --v 6.1 --style raw",
    targetModel: "Midjourney v6.1",
    aspectRatio: "4:5",
    parameters: "--ar 4:5 --v 6.1 --style raw",
    tags: ["Portrait", "Natural Light", "Film Grain", "Kodak Portra", "Editorial"],
    engagementTip: "Instagram ana akış postları için 4:5 oranı ekranda en çok yer kaplayan ve en yüksek CTR alan formattır."
  }
];
