<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Proje Kuralları (Developer Rules)

1. **Net Soru Cümlesi Kuralı (Strict):**
   Kullanıcı net bir soru cümlesi sorduğunda (durum tespiti, bilgi veya inceleme sorusu):
   - **KESİNLİKLE hiçbir kod değişikliği, dosya düzenlemesi veya otonom işlem yapma.**
   - Sadece ve sadece sorulan sorunun doğrudan cevabını ver.
   - Değişiklik veya aksiyon gerekiyorsa, bunu önce kullanıcıya söyle ve açık onay iste.
2. **Görsel & Ergonomi Denetim Kuralı (Visual & UX Audit):**
   - **Küçük Rötuşlar (Hızlı İşlem):** Font, renk, metin, padding/margin gibi küçük stil ve rötuş işlemlerinde **kesinlikle ekran görüntüsü alma veya ağır tarayıcı denetimi döngüsüne girilmez**. Kod doğrudan, hızlı ve temiz bir şekilde uygulanır.
   - **Büyük Sayfa / Bileşen Tasarımları (Kritik Denetim):** Sıfırdan sayfa tasarımı veya büyük bileşen revizyonlarında aşağıdaki ergonomi prensiplerine uyulur:
     - **Sekme & Buton Kompaktlığı:** Sekmeler, filtreler ve butonlar asla uzun cümle/açıklama içeremez. En fazla 1-3 kelimelik net, kısa etiketler olmalıdır (Örn: "Akan Materyalli & Çatlak Zırhlı..." yerine doğrudan "Akan Detay").
     - **Görsel Kalabalık ve Taşma (Clutter / Overflow):** Ekranı gereksiz yere dolduran, yatayda kaymaya zorlayan veya hantal duran başlık/metin yoğunluğu varsa derhal sadeleştirilmelidir.
     - **İnsan Gözüyle Ön İnceleme:** Büyük revizyonlarda tasarımın göze şık, ferah ve modern gelip gelmediği kontrol edilir.
     - **Gereksiz İnisiyatif Yasağı:** Kullanıcı sadece tespit veya geri bildirim yaptığında ("böyle kalsın", "neyse" dediğinde) açık talimat gelmedikçe kod düzenlemesi başlatılamaz.

3. **Önceden Renk Paleti ve Tasarım Belirleme Kuralı (Color System First):**
   - Hiçbir projeye/sayfaya renkler ve tasarım token'ları önceden merkezi bir yerde tanımlanmadan başlanamaz.
   - Kodlama başlamadan önce: Temel arka plan, kart/yüzey tonları, birincil (primary) marka rengi, vurgu (accent), kenarlık (border) ve metin renkleri `globals.css` (CSS değişkenleri) veya `tailwind.config` / `@theme` içinde merkezi olarak tanımlanmalı ve yapılandırılmalıdır.
   - Bileşenlerde gelişigüzel, sistemsiz inline hex kodları veya rastgele renkler kullanmak yerine bu merkezi palet üzerinden tutarlı şekilde ilerlenmelidir.
