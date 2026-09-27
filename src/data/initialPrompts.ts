import { SocialPromptItem } from "@/types";

export const initialPrompts: SocialPromptItem[] = [
  {
    id: "prompt-main-automotive-cinematic-video",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "Main // \"BU GERÇEK DEĞİL\" Şok Açılışlı Sinematik Video Promptu",
    prompt: `[ARAÇ] = 
[MATERYAL] = 
Tamamı çarpıcı ve özel bir [MATERYAL] ile kaplanmış bir [ARAÇ] içeren, hiper gerçekçi ve sinematik lüks otomobil tanıtım videosu oluştur.
Malzeme aracın tüm dış gövdesini eksiksiz ve kusursuz şekilde kaplamalı; her kıvrımını, panel aralığını ve aerodinamik çizgisini takip etmeli. Yüzey gerçekçi doku derinliği ve fiziksel doğru yansımalara sahip olmalı.
Görsel ve Malzeme Detayları: [MATERYAL] kaplama son derece detaylı, dokunsal, keskin speküler yansımalar ile kesintisiz görünmeli. Dış tasarımı cilalı krom/altın detaylar, agresif özel egzoz, premium özel jantlar ve kristal berraklığında hafif renkli camlarla tamamla.
Mekân: Ultra temiz, karanlık lüks showroom, premium siyah zemin, hafif atmosferik sis, mimari tavan ızgaraları.
Sahne Sıralaması:
1. HOOK - ŞOK AÇILIŞ (0-1.5sn): Videoya aracın en imkansız detayının aşırı yakın makro çekimiyle başla. [MATERYAL] dokusunun en şok edici kısmı. Kamera aniden zoom-in. Hafif kamera sarsıntısı. Ekranda büyük beyaz yazı belirsin: "BU GERÇEK DEĞİL"
2. Malzeme Dokusu Makro: Ultra yakın makro, kamera [MATERYAL] yüzeyi üzerinde yavaşça ilerlesin. Mikro detaylar, speküler yansımalar.
3. Yüksek Açı Üstten: Yavaşça öne doğru hareket, kaput ve tavan çizgisi, tavan ışık ızgaralarının yansıması.
4. Önden Kahraman: Alçak açılı ortalanmış, farlar ve gündüz farları aynı anda yansın.
5. Dinamik Yan Profil: Akıcı orbital hareket, şekillendirilmiş gövde çizgileri, jantlar, çamurluklar.
6. İç Mekân: Varsa gösterge paneli, direksiyon, dijital ekranlar, dış [MATERYAL] ile uyumlu iç trim.
7. Arkadan Kahraman Final: Ortalanmış alçak açılı arka çekim, stop lambaları yanık, difüzör ve egzoz görünür, kamera yavaşça geri çekilsin ve tüm showroom görünsün.
Final: 3 çeyrek açıda sabitle.
KURAL: Araç oranlarında, malzemede, jantlarda, aydınlatmada, ortamda HİÇBİR değişiklik olmamalı. Tam görsel tutarlılık.
Sinematografi: Ultra gerçekçi 8K, ray tracing, hiper detaylı dokular, premium stüdyo aydınlatması, hafif volumetrik sis, sığ alan derinliği, 35mm anamorfik, akıcı stabilize hareketler. 24 FPS, 8 saniye, dikey 9:16. Lüks otomobil reklamı kalitesi.
Ses: Derin motor rumble, kontrollü egzoz patlaması, sinematik whoosh.`,
    negativePrompt: "low resolution, 2d cartoon, changing lighting, deformed proportions, inconsistent textures, shaky amateur video, flat audio",
    targetModel: "Omni 1.1",
    aspectRatio: "9:16",
    parameters: "8K, ray tracing, 35mm anamorfik, 24 FPS, 9:16, 8 saniye, ultra-consistent studio rendering",
    tags: ["Main Prompt", "Viral Hook", "Bu Gerçek Değil", "8K Sinematik", "Lüks Showroom", "Omni 1.1"],
    tabTitle: "main",
    engagementTip: "HOOK (0-1.5sn) sahnesinde 'BU GERÇEK DEĞİL' yazısı ve anlık zoom-in, izleyicide durdurma refleksini (stop-scrolling) tetikler. TikTok ve Instagram algoritmalarında en yüksek tamamlama (completion) ve paylaşım oranı getiren ana şablondur.",
  },
  {
    id: "prompt-flowing-material-video",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "Akan Detay // Çatlak Zırhlı Hiper-Gerçekçi Video Promptu",
    tabTitle: "akan detay",
    prompt: `[ARAÇ] = 
[MATERYAL] = 
[AKAN DETAY] = 

Tamamı çatlak [MATERYAL] ile kaplanmış ve çatlak aralarından [AKAN DETAY] akan bir [ARAÇ] içeren hiper gerçekçi video oluştur.
[MATERYAL] mat-siyah keskin yansımalı, [AKAN DETAY] ise kendi ışığını yayan, gerçekçi ısı dalgalanması ve hafif duman/partikül veren yapıda olmalı.
Görsel Detaylar: [AKAN DETAY] rengine uyumlu kaliperler ve trim.
Mekân: Karanlık showroom, hafif isli zemin.
Sahne Sıralaması:
1. HOOK: Çatlaktan [AKAN DETAY] fışkırma anının makro çekimi, ısı dalgalanması.
2. Malzeme Makro: [MATERYAL] çatlaklarında [AKAN DETAY] akışı.
3. Üstten: Çatlak ağı ve [AKAN DETAY] damarlarının yukarıdan görünümü.
4. Önden Kahraman: Farlar yanık, [AKAN DETAY] turuncu/mavi yansıması [MATERYAL] üzerinde.
5. Yan Profil Orbital: Yan etekte akan [AKAN DETAY].
6. İç Mekân: Karbon koltuklarda [AKAN DETAY] renginde dikiş.
7. Arkadan Final: Egzozdan kıvılcım ve [AKAN DETAY] dumanı.
KURAL: Çatlak deseni ve [AKAN DETAY] akış yönü hiç değişmemeli. 8K, ray tracing, 9:16, 8 saniye.`,
    negativePrompt: "deformed car body, changing crack patterns, low resolution, flat lighting, 2d cartoon, blurry fluid physics",
    targetModel: "Omni 1.1",
    aspectRatio: "9:16",
    parameters: "8K, ray tracing, 9:16, 8 saniye, hyper-realistic fluid dynamics",
    tags: ["Akan Materyal", "Kinetik", "Çatlak Zırh", "Viral Reels", "Showroom", "8K Video"],
    presetsTitle: "Akan Materyal Seçenekleri",
    engagementTip: "HOOK sahnesi (çatlaktan fışkırma) izleyicinin ilk 1 saniyede kaydırmasını engeller. Arka plana derin sub-bass veya motor kükreme efekti ekleyip '[ARAÇ] için Lav mı Altın mı?' anketi açın.",
    presets: [
      {
        label: "1. Kor halinde turuncu lav + hafif duman",
        text: "Kor halinde turuncu lav ve hafif duman",
        note: "Obsidyen konsepti – Reels'ta en çok yorum alan viral yapı."
      },
      {
        label: "2. Erimiş sıvı altın, akarken katılaşan",
        text: "Erimiş sıvı altın, akarken katılaşan parçacıklar",
        note: "Bugatti, Rolls-Royce ve Maybach üzerinde inanılmaz lüks duruyor."
      },
      {
        label: "3. Elektrik mavisi plazma arkları",
        text: "Elektrik mavisi plazma arkları, çatlaklarda şimşek çakan",
        note: "Tesla, Porsche Taycan / GT3 RS için birebir yüksek enerji."
      },
      {
        label: "4. Sıvı krom cıva, aynalı şekilde akan",
        text: "Sıvı krom cıva, aynalı metalik akışkan",
        note: "Cybertruck ve cyberpunk kitlelerin favorisi."
      },
      {
        label: "5. Neon yeşili toksik sıvı, hafif parlayan",
        text: "Neon yeşili toksik biyolüminesans sıvı",
        note: "Agresif BMW M4 / Nissan GT-R Nismo için ideal."
      },
      {
        label: "6. Galaksi nebulası (mor, mavi, yıldız tozlu)",
        text: "Galaksi nebulası, mor ve kobalt mavisi yıldız tozlu akışkan",
        note: "Instagram ve TikTok'ta en çok paylaşılan ve kaydedilen efekt."
      },
      {
        label: "7. Erimiş buz mavisi, buhar ve kırağı çıkaran",
        text: "Erimiş kriyojenik buz mavisi, hafif buhar ve kırağı çıkaran",
        note: "Kış konsepti, Porsche ve Audi RS6'da olağanüstü duruyor."
      },
      {
        label: "8. Kırmızı şarap rengi reçine, yavaş akan",
        text: "Koyu yakut/şarap rengi lüks reçine, viskoz yavaş akış",
        note: "Bordo ve siyah gövdeli GT araçlarında ultra-premium durur."
      },
      {
        label: "9. Erimiş elmas sıvısı - şeffaf ve ışıltılı",
        text: "Erimiş sıvı elmas, şeffaf prizmatik ışıltılı",
        note: "En asil ve saf zenginlik hissi veren konsept."
      },
      {
        label: "10. Sıvı azot - beyaz duman ve buz kristalleri saçan",
        text: "Sıvı azot, yoğun beyaz duman ve dondurucu mikro buz kristalleri",
        note: "Egzoz dumanı ve kıvılcım sahnesiyle birleştiğinde anında viral."
      }
    ]
  },
  {
    id: "prompt-interior-mechanism-video",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "İç Detay // Transparan Panelli İskelet Mekanizma Promptu",
    tabTitle: "iç detay",
    prompt: `[ARAÇ] = 
[MATERYAL] = 
[İÇ DETAY] = 

Tamamı [MATERYAL] ile kaplanmış ve yer yer transparan paneller altından [İÇ DETAY] görünen bir [ARAÇ] içeren, hiper gerçekçi sinematik lüks otomobil tanıtım videosu oluştur.
[MATERYAL] aracın tüm dış gövdesini eksiksiz kaplamalı, her kıvrımı ve panel aralığını takip etmeli. Yüzey gerçekçi doku derinliği, vernikli premium işçilik ve fiziksel doğru yansımalara sahip olmalı. Transparan bölümlerdeki [İÇ DETAY] ultra detaylı, 3 boyutlu ve ışıkla etkileşimli olmalı.
Görsel Detaylar: Cilalı krom/altın detaylar, premium özel jantlar, kristal camlar.
Mekân: Ultra temiz karanlık lüks showroom, siyah zemin, hafif sis, tavan ışık ızgaraları.
Sahne Sıralaması:
1. HOOK: [İÇ DETAY] mekanizmasının [MATERYAL] altında çalışma anının makro çekimi. Hızlı zoom-in.
2. Malzeme Makro: [MATERYAL] yüzeyi üzerinde akıcı makro ilerleyiş, damar ve mikro detaylar.
3. Üstten: Yüksek açıdan öne doğru, kaput ve tavan, tavan ışıklarının yansıması.
4. Önden Kahraman: Alçak açılı, farlar ve gündüz farları yanık, [MATERYAL] üzerinde keskin yansımalar.
5. Yan Profil Orbital: Yan çizgiler, jantlar, transparan bölümde [İÇ DETAY] görünsün.
6. İç Mekân: [MATERYAL] ile uyumlu trimli direksiyon ve konsol.
7. Arkadan Final: Stop lambaları yanık, difüzör, egzozdan kısa alev, kamera geri çekilsin.
Final: 3 çeyrek açıda sabitle.
KURAL: [ARAÇ] oranları, [MATERYAL] damar yönü, [İÇ DETAY] konumu hiç değişmemeli. Tam tutarlılık. 8K, ray tracing, 35mm anamorfik, 24 FPS, 9:16, 8 saniye.`,
    negativePrompt: "deformed car proportions, changing mechanism position, inconsistent texture veins, low quality, 2d cartoon, blurry glass, distorted reflections",
    targetModel: "Omni 1.1",
    aspectRatio: "9:16",
    parameters: "8K, ray tracing, 35mm anamorfik, 24 FPS, 9:16, 8 saniye, mechanical skeleton precision",
    tags: ["İç Mekanizma", "Transparan Panel", "İskelet Saat", "Tourbillon", "Lüks Showroom", "8K Video"],
    presetsTitle: "İç Detay & Mekanizma Seçenekleri",
    engagementTip: "Transparan paneller altındaki mekanik hareketler (özellikle tourbillon veya V12 krank mili) izleyicinin videoyu tekrar tekrar izlemesini (loop rate) tetikler. Yorumlarda 'Mekanik saat mi, saf motor gücü mü?' sorusu yüksek etkileşim sağlar.",
    presets: [
      {
        label: "1. Altın mekanik dişli ve piston sistemi",
        text: "Altın mekanik dişli ve piston sistemi",
        note: "En çok tutan, özellikle Lamborghini ve hiper araçlarda olağanüstü duruyor."
      },
      {
        label: "2. İskelet saat mekanizması - tourbillon",
        text: "İskelet saat mekanizması - tourbillon",
        note: "Lüks saat severler bayılıyor, kaydetme (save rate) tavan yapıyor."
      },
      {
        label: "3. Titanyum V12 motor bloğu, görünür krank",
        text: "Titanyum V12 motor bloğu, görünür krank",
        note: "Kaputun altından motoru transparan gösteren yarış mühendisliği havası."
      },
      {
        label: "4. Siyah karbon fiber iskelet kafes",
        text: "Siyah karbon fiber iskelet kafes",
        note: "Safkan pist ve yarış otomobili hissi."
      },
      {
        label: "5. Beyaz fiber optik damar ağı, nabız gibi yanıp sönen",
        text: "Beyaz fiber optik damar ağı, nabız gibi yanıp sönen",
        note: "Cyberpunk ve yüksek teknoloji meraklıları için birebir."
      },
      {
        label: "6. Mini şehir maketi - gökdelenler ve ışıklar",
        text: "Mini şehir maketi - gökdelenler ve ışıklar",
        note: "Rolls-Royce ve Maybach tavan/kaputunda büyüleyici estetik duruyor."
      },
      {
        label: "7. Bal peteği titanyum yapı, altıgen hücreler",
        text: "Bal peteği titanyum yapı, altıgen hücreler",
        note: "Hafiflik ve premium havacılık-uzay endüstrisi havası."
      },
      {
        label: "8. Devre kartı ve mavi LED çip yolları",
        text: "Devre kartı ve mavi LED çip yolları",
        note: "Fütüristik teknoloji ve yapay zeka temalı görsel kurgular için."
      },
      {
        label: "9. İskelet içinde sıkıştırılmış elmas tozu ve kristaller",
        text: "İskelet içinde sıkıştırılmış elmas tozu ve kristaller",
        note: "Işık vurduğunda prizmatik parıltı ve kristal derinlik saçıyor."
      },
      {
        label: "10. Siyah mermer içinde altın damar, içten aydınlatmalı",
        text: "Siyah mermer içinde altın damar, içten aydınlatmalı",
        note: "En asil ve lüks duran kombinasyonlardan biri."
      }
    ]
  },
  {
    id: "prompt-dynamic-particle-material-video",
    channel: "araba",
    channelName: "Otomobil & Hypercar (Reels / TikTok)",
    title: "Dinamik // Binlerce Parçacıklı 3D Doku Kaplama Promptu",
    tabTitle: "dinamik",
    prompt: `[ARAÇ] = 
[MATERYAL] = 

Tamamı binlerce adet [MATERYAL] ile kaplanmış bir [ARAÇ] içeren hiper gerçekçi sinematik video oluştur.
Her bir [MATERYAL] parçası ayrı ayrı 3D hacimli, keskin speküler yansımalar veren ve gövdeyi kesintisiz kaplayan yapıda olmalı. Panel aralıkları bile [MATERYAL] ile dolu görünmeli.
Görsel Detaylar: Krom veya altın kontrast detaylar.
Mekân: Karanlık lüks showroom, siyah zemin, hafif sis.
Sahne Sıralaması:
1. HOOK: Bir avuç [MATERYAL] parçasının gövdeye düşüp yapışmasının slow-motion makro çekimi.
2. Malzeme Makro: [MATERYAL] dokusu üzerinde ışık gezsin, her parçada ayrı yansıma.
3. Üstten: Binlerce [MATERYAL] üzerinde tavan ışıklarının kırılması.
4. Önden Kahraman: Farlar yanık, [MATERYAL] yüzeyde far yansıması.
5. Yan Profil Orbital: Kapı kolları [MATERYAL] arasından çıksın.
6. İç Mekân: Koltuklarda [MATERYAL] ile uyumlu dikiş detayı.
7. Arkadan Final: Stop lambaları yanık, [MATERYAL] ile kaplı difüzör.
KURAL: [MATERYAL] boyutu, dizilimi ve parlaklığı hiç değişmemeli. 8K, ray tracing, 9:16, 8 saniye.`,
    negativePrompt: "flat textures, low polygon, 2d decals, blurred particles, inconsistent particle count, flickering geometry, low resolution",
    targetModel: "Omni 1.1",
    aspectRatio: "9:16",
    parameters: "8K, ray tracing, 9:16, 8 saniye, macro slow-motion physics, 3D volumetric particles",
    tags: ["Dinamik Materyal", "3D Hacimli", "Parçacık Kaplama", "Slow Motion", "Viral Reels", "8K Video"],
    engagementTip: "HOOK sahnesindeki parçacıkların gövdeye düşüp yapışma anı (slow-motion) izleyiciyi hipnotize eder. Kaplamalar sekmesinden seçeceğiniz kristaller, altın pullar, elmaslar veya karbon mozaikler ile birleştirildiğinde izlenme süresi zirve yapar."
  }
];
