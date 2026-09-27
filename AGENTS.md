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
