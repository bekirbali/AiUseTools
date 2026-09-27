export interface WrapItemEntry {
  title: string;
  desc?: string;
}

export interface WrapGroup {
  id: string;
  title: string;
  badge: string;
  wraps: WrapItemEntry[];
}

export const initialWrapGroups: WrapGroup[] = [
  // ==========================================
  // 1. Kristalize, Mineral & Heykelsi Dokular
  // ==========================================
  {
    id: "wrap-group-crystal",
    title: "Kristalize, Mineral & Heykelsi Dokular",
    badge: "Kristal & Mineral",
    wraps: [
      {
        title: "Raw Chiseled White Carrara Marble with 24K Liquid Gold Kintsugi Inlays",
        desc: "Yontulmuş mat beyaz mermer dokusu ve panel kıvrımlarından sızan parlak sıvı altın dolgular."
      },
      {
        title: "Cracked Volcanic Basalt with Smoldering Amber Magma Veins",
        desc: "Soğumuş siyah lav/bazalt taşı, derin çatlaklardan hafifçe parıldayan közlenmiş kehribar ışıltısı."
      },
      {
        title: "Rough-Cut Deep Emerald Geode with Exposed Crystalline Cavities",
        desc: "Pürüzlü koyu zümrüt dış yüzey, hava girişlerinde ve hatlarda açığa çıkan sivri zümrüt kristalleri."
      },
      {
        title: "Translucent Frosted Ice with Suspended Metallic Flakes",
        desc: "Yarı saydam buz görünümü, alt katmanlarında asılı duran mikro gümüş/alüminyum parçacıkları."
      },
      {
        title: "Polished Royal Lapis Lazuli with Flecks of Pyrite",
        desc: "Derin kobalt mavisi cilalı taş dokusu, üzerinde altın rengi pirit mineral benekleri."
      }
    ]
  },

  // ==========================================
  // 2. Biyomimetik, Egzotik & Organik Yüzeyler
  // ==========================================
  {
    id: "wrap-group-biomimetic",
    title: "Biyomimetik, Egzotik & Organik Yüzeyler",
    badge: "Biyomimetik & Egzotik",
    wraps: [
      {
        title: "Iridescent Dragon-Scale Armor Plating with Color-Shifting Sheen",
        desc: "Işık açısına göre zümrütten yakut kırmızısına dönen, katmanlı mikro pul zırh kaplama."
      },
      {
        title: "Deep Matte Stingray Leather (Shagreen) with Pearled Micro-Beads",
        desc: "Işığı tamamen yutan mat vatoz derisi dokusu, yüzeyinde inci gibi parıldayan mikro boncuk pürüzleri."
      },
      {
        title: "Charred Shou Sugi Ban Wood Grain with Liquid Silver Resin",
        desc: "Yanık siyah Japon ahşap damarları, aradaki boşlukları dolduran sıvı ayna parlaklığında gümüş reçine."
      },
      {
        title: "Micro-Pleated Matte Silk Velvet with Liquid Chrome Seams",
        desc: "Işığı emen derin pileli mat kadife kumaş, panel birleşimlerinde akan cıva kıvamında sıvı krom çizgiler."
      },
      {
        title: "Faceted Beetle Wing Chitin with Metallic Oil-Slick Specularity",
        desc: "Yanardöner metalik yağ lekesi yansımalarına sahip sert, böcek kabuğu benzeri biyolojik zırh yüzeyi."
      }
    ]
  },

  // ==========================================
  // 3. Fütüristik Kompozit & Akışkan Metaller
  // ==========================================
  {
    id: "wrap-group-futuristic-composite",
    title: "Fütüristik Kompozit & Akışkan Metaller",
    badge: "Kompozit & Akışkan",
    wraps: [
      {
        title: "Damascus Forged Carbon with Rose Gold Leaf Flakes",
        desc: "Dalgalı Şam çeliği desenine sahip koyu dövme karbon lifleri, içine gömülmüş pembe altın varaklar."
      },
      {
        title: "Mirror-Polished Liquid Mercury with High-Tension Fluidity",
        desc: "Aracın kıvrımlarını kusursuz ayna yansımalarıyla saran, yüzey gerilimi yüksek sıvı cıva kaplama."
      },
      {
        title: "Matte Anodized Bismuth Crystal with Geometric Rainbow Stepped Edges",
        desc: "Basamaklı geometrik prizma desenleri barındıran, kenarları gökkuşağı renginde kırılarak parlayan bizmut minerali dokusu."
      },
      {
        title: "Black Aerogel with Subsurface Luminescent Cyan Glow",
        desc: "Dünyanın en karanlık mat malzemesi, gövde çizgilerinin altından derinden yayılan hafif turkuaz iç aydınlatma."
      },
      {
        title: "Brushed Aerospace Titanium with Heat-Treated Blue and Purple Patina",
        desc: "Egzotik egzoz borularındaki gibi ısıdan maviye ve mora dönmüş havacılık sınıfı fırçalanmış titanyum."
      }
    ]
  },

  // ==========================================
  // 4. Optik & Kinetik Cam/Prizma Katmanları
  // ==========================================
  {
    id: "wrap-group-optical-prism",
    title: "Optik & Kinetik Cam/Prizma Katmanları",
    badge: "Optik & Prizma",
    wraps: [
      {
        title: "Dichroic Prismatic Glass Plating with Shifting Holographic Hues",
        desc: "Aracın gövde panellerini saran, çevre ışığına göre pembe-camgöbeği arasında değişen dikroik prizmatik cam."
      },
      {
        title: "Smoked Translucent Quartz Showing Internal Gilded Mechanical Skeleton",
        desc: "Gövde kıvrımlarında hafifçe iç mekaniği ve altın kaplama detayları hissettiren füme yarı saydam kuvars."
      },
      {
        title: "Satin Matte Liquid Champagne with Deep Pearl Luster",
        desc: "Ne aşırı parlak ne mat olan, ipeksi akışkan şampanya rengi lüks sedef katmanı."
      },
      {
        title: "Layered Damascus Steel with Acid-Etched Deep Topography",
        desc: "Asitle derinleştirilmiş katman çizgileri parmakla hissedilebilecek netlikte olan ham dövme kılıç çeliği."
      },
      {
        title: "Crystalline Smoked Amethyst with High Specular Highlights",
        desc: "Yüksek kontrastlı stüdyo ışığı altında içten hafif mor kırılmalar veren cilalı füme ametist taşı."
      }
    ]
  },

  // ==========================================
  // 5. Mat, Saten & Frozen Fabrika Renkleri (OEM+ Lüks)
  // ==========================================
  {
    id: "wrap-group-oem-plus",
    title: "Mat, Saten & Frozen Fabrika Renkleri (OEM+ Lüks)",
    badge: "OEM+ Lüks",
    wraps: [
      {
        title: "Frozen Pure Metallic Silver (Saten Metalik Gümüş)",
        desc: "BMW Individual ve Porsche Exclusive tarzı, ışığı yumuşak yayan, çizgileri keskinleştiren saten sıvı metal görünümü."
      },
      {
        title: "Satin British Racing Green with Gold Flakes",
        desc: "Koyu İngiliz yarış yeşili, ışık vurduğunda mikro altın sedefleri parıldayan yarı mat kaplama."
      },
      {
        title: "Matte Stealth Nardo Grey",
        desc: "Endüstriyel, parlaklığı sıfırlanmış, karbon parçaları ve jantları en çok öne çıkaran popüler süper spor tonu."
      },
      {
        title: "Frozen Deep Navy Blue Metallic",
        desc: "Gece ışıklarında siyaha yakın, spot altında derin lacivert parlayan saten lüks kaplama."
      },
      {
        title: "Satin Chalk / Crayon White",
        desc: "Porselen benzeri, ne tam beyaz ne gri olan pürüzsüz tebeşir beyazı saten finiş."
      }
    ]
  },

  // ==========================================
  // 6. Gerçek Karbon Fiber & Kompozit Çeşitleri
  // ==========================================
  {
    id: "wrap-group-carbon-fiber",
    title: "Gerçek Karbon Fiber & Kompozit Çeşitleri",
    badge: "Karbon Fiber",
    wraps: [
      {
        title: "Gloss Forged Carbon Fiber (Parlak Dövme Karbon)",
        desc: "Mermersi rastgele kompozit parçacıklara sahip, vernikli süper spor kaplama (Mansory / Lamborghini tarzı)."
      },
      {
        title: "Matte Twill 3K Weave Carbon Fiber",
        desc: "Klasik çapraz örgü desenli, ışık yansıtmayan saf yarış tipi mat karbon dokusu."
      },
      {
        title: "Blue-Tinted Gloss Carbon Fiber",
        desc: "Şeffaf verniğinin içine koyu mavi pigment karıştırılmış, karbon desenini alttan gösteren özel kaplama."
      }
    ]
  },

  // ==========================================
  // 7. Derin Yansımalı Sıvı Metal & Kromlar
  // ==========================================
  {
    id: "wrap-group-liquid-metal",
    title: "Derin Yansımalı Sıvı Metal & Kromlar (Inozetek / Hexis)",
    badge: "Sıvı Metal & Krom",
    wraps: [
      {
        title: "High-Gloss Liquid Champagne Gold",
        desc: "Göz almayan, asil ve açık sarı-gümüş arası ayna gibi pürüzsüz sıvı şampanya metalik."
      },
      {
        title: "Smoked Black Chrome / Dark Mirror",
        desc: "Standart gümüş krom yerine, çevreyi karartılmış ayna gibi yansıtan füme siyah krom kaplama."
      },
      {
        title: "Liquid Copper / Rose Bronze",
        desc: "Sıcak bronz ve bakır tonlarında, gün batımında turuncuya çalan yüksek parlaklıkta metalik film."
      },
      {
        title: "Ultra-Gloss Gunmetal Metallic PPF",
        desc: "Derin vernik katmanına sahip, mikro çizikleri kendi kendine onaran kurşuni antrasit koruma filmi."
      }
    ]
  },

  // ==========================================
  // 8. Sedef, Bukalemun & İpeksi Geçişler
  // ==========================================
  {
    id: "wrap-group-pearl-chameleon",
    title: "Sedef, Bukalemun & İpeksi Geçişler (Gerçekçi)",
    badge: "Sedef & Bukalemun",
    wraps: [
      {
        title: "Pearl Ghost White (Hayalet Sedefli Beyaz)",
        desc: "Normalde parlak sedef beyaz duran, açı değiştikçe çok hafif altın-mavi ışıltılar veren lüks kaplama."
      },
      {
        title: "Midnight Purple IV (Renk Değiştiren Gece Moru)",
        desc: "Nissan Skyline mirasından gelen, karanlıkta siyah, ışık altında patlayan koyu mor-bordo geçişi."
      },
      {
        title: "Velvet Emerald Chromaflair",
        desc: "Koyu zümrüt yeşilinden koyu petrol mavisine dönen, göz yormayan rafine sedefli boya."
      },
      {
        title: "Satin Liquid Gunpowder",
        desc: "Barut grisi taban üzerinde ipeksi bir kayganlık hissi veren yarı mat lüks finiş."
      }
    ]
  },

  // ==========================================
  // 9. Bespoke İç / Dış Detay Dokuları
  // ==========================================
  {
    id: "wrap-group-bespoke",
    title: "Bespoke İç / Dış Detay Dokuları",
    badge: "Bespoke Detay",
    wraps: [
      {
        title: "Diamond-Quilted Matte PPF (Hafif Baklava Dokulu Mat Film)",
        desc: "Aracın gövde panellerinde sadece belirli açılardan seçilen çok ince mikro gofraj/baklava deseni."
      },
      {
        title: "Brushed Dark Aluminium (Fırçalanmış Koyu Alüminyum)",
        desc: "Üzerinde yatay fırça izleri bulunan, metalik dokusu elle hissedilecekmiş gibi duran sert kaplama."
      },
      {
        title: "Piano Black with Fine Gold Pinstriping",
        desc: "Derin ayna siyah gövde, kıvrım ve marşpiyel hatlarını takip eden ultra ince 1 mm'lik altın çizgiler."
      }
    ]
  },

  // ==========================================
  // 10. FÜTÜRİSTİK KAPLAMALAR
  // ==========================================
  {
    id: "wrap-group-futuristic",
    title: "Fütüristik Kaplamalar (Cyber & Neon)",
    badge: "Fütüristik",
    wraps: [
      { title: "Holographic Liquid Mercury", desc: "Holografik Sıvı Civa" },
      { title: "Brushed Titanium Gold with Neon Circuit Lines", desc: "Titanium & Devre Kartı" },
      { title: "Iridescent Deep Space Nebula", desc: "Uzay / Nebula Bukalemunu" },
      { title: "Brushed Black Steel with Liquid Magma Accents", desc: "Karanlık Çelik & İçten Yanan Damarlar" },
      { title: "Cyber-Glass Translucent Carbon", desc: "Şeffaf / Fütüristik Cam Karbon" },
      { title: "Liquid Mercury Chrome with Gold Flakes", desc: "Sıvı Cıva Krom & Altın Parçacıklar" },
      { title: "Matte Obsidian with Bioluminescent Cyber Teal Trim", desc: "Obsidiyen & Siber Turkuaz" },
      { title: "Frosted Rose Quartz Crystal", desc: "Buzlu Pembe Kuvars / Kristal Kaplama" },
      { title: "Midnight Aurora Chromaflair", desc: "Kuzey Işıkları Bukalemunu" },
      { title: "Carbon Armor with Brushed Bronze Flaws", desc: "Zırh Karbon & Fırçalanmış Bronz" },
      { title: "Liquid Amethyst Mirror", desc: "Ayna Moru / Ametist Sıvı Metal" },
      { title: "Matte Cyber Steel with Red Laser Pinstriping", desc: "Siber Çelik & Kırmızı Lazer Çizgiler" },
      { title: "Pearl Ghost White with Floating Carbon Flakes", desc: "Hayalet Sedef & Yüzen Karbon Parçacıkları" },
      { title: "Carbon Liquid Gold", desc: "Dövme Altın Karbon Kompozit" },
      { title: "Smoke-Tinted Liquid Platinum", desc: "Füme Sıvı Platin" }
    ]
  },

  // ==========================================
  // 11. FANTASTİK KAPLAMALAR
  // ==========================================
  {
    id: "wrap-group-fantastic",
    title: "Fantastik Kaplamalar (Mitik & Kozmik)",
    badge: "Fantastik & Mitik",
    wraps: [
      {
        title: "Molten Gold Core with Cracked Volcanic Basalt Armor",
        desc: "Çatlamış Volkanik Bazalt Zırhlı ve Erimiş Altın Çekirdekli Kaplama"
      },
      {
        title: "Cybernetic Titanium Exoskeleton with Glowing Hexagonal Power Cells",
        desc: "Parlayan Altıgen Güç Hücrelerine Sahip Siber Titanyum Dış İskelet"
      },
      {
        title: "Chameleon Scarab Beetle Shell with Shifting Emerald and Violet Chitin",
        desc: "Zümrüt Yeşili ve Menekşe Moru Arasında Değişen Bukalemun Skarabe (Bokböceği) Kabuğu"
      },
      {
        title: "Frosted Glacial Ice with Internal Sub-Zero Crystalline Fracture Lines",
        desc: "İçinde Sıfırın Altında Kristal Kırık Çizgileri Bulunan Buzlu Buzul"
      },
      {
        title: "Translucent Amber Resin Enclosing Suspended Gold Dust and Raw Carbon Twill",
        desc: "İçinde Asılı Altın Tozu ve Ham Karbon Örgüsü Barındıran Yarı Şeffaf Kehribar Reçinesi"
      },
      {
        title: "Bioluminescent Deep-Sea Abyssal Scales with Pulsing Cyan Veins",
        desc: "Titreşen Camgöbeği Damarlara Sahip, Karanlıkta Parlayan (Biyolüminesans) Derin Deniz Pulları"
      },
      {
        title: "Solar Flare Iridescent Matte Void-Black Damascus Steel with Flowing Acid-Etched Runes",
        desc: "Üzerinde Asitle Kazınmış Akıcı Rünler Bulunan, Güneş Patlaması Yanardönerliğine Sahip Mat Hiçlik-Siyahı Şam (Damascus) Çeliği"
      },
      {
        title: "Biomorphic Chitin Exoskeleton with Bioluminescent Micro-Veins",
        desc: "Karanlıkta Parlayan Mikro Damarlara Sahip Biyomorfik Kitin Dış İskelet"
      },
      {
        title: "Crystalline Obsidian Shards Inset with Molten Magma Seams",
        desc: "Erimiş Magma Çatlaklarıyla Birleştirilmiş Kristal Obsidyen Parçaları"
      },
      {
        title: "Brushed Anodized Titanium with Prismatic Rainbow Heat-Tarnish",
        desc: "Prizmatik Gökkuşağı Renginde Isı Yanığı Etkisine Sahip Fırçalanmış Eloksallı Titanyum"
      },
      {
        title: "Hexagonal Carbon-Nanotube Weave with Embedded Holographic Film",
        desc: "İçine Gömülü Holografik Film Bulunan Altıgen Karbon-Nanotüp Örgü"
      },
      {
        title: "Pearlescent Ivory Ceramic Plating with Gold Kintsugi Inlays",
        desc: "Altın Kintsugi (Kırık Tamiri) Çizgileriyle Süslenmiş Sedefli Fildişi Seramik Kaplama"
      },
      {
        title: "Translucent Amber Resin Encasing Suspended Gold Leaf and Micro-Fractures",
        desc: "İçinde Asılı Altın Varaklar ve Mikro Çatlaklar Barındıran Yarı Şeffaf Kehribar Reçinesi"
      },
      {
        title: "Polished Meteorite Nickel-Iron Alloy with Etched Widmanstätten Patterns",
        desc: "Üzerinde Widmanstätten (Göktaşı) Desenleri Kazınmış Parlak Göktaşı Nikel-Demir Alaşımı"
      },
      {
        title: "Frosted Glacial Cryo-Glass with Internal Geometric Fractures and Cyan Core",
        desc: "Camgöbeği Çekirdeğe ve İçsel Geometrik Çatlaklara Sahip Buzlu Kriyojenik Cam"
      },
      {
        title: "Weathered Verdigris Patina Bronze with Polished Brass Filigree Edges",
        desc: "Kenarları Parlatılmış Pirinç Telkari İşlemeli, Yıpranmış Yeşil Patinalı Bronz"
      },
      {
        title: "Fluid Mercury Chromium with Ripple-Effect Nanotech Coating",
        desc: "Su Dalgalanması Etkisi Veren Nanoteknoloji Kaplamalı Akışkan Cıva Kromu"
      },
      {
        title: "Cellular Bio-Lapis Lazuli with Veins of Raw Pyrite Inclusions",
        desc: "Ham Pirit Damarlarına Sahip Hücresel Lapis Lazuli (Lacivert Taşı)"
      }
    ]
  }
];
