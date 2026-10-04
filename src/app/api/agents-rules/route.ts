import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function extractRulesOnly(fullText: string): string {
  const marker = "# Proje Kuralları (Developer Rules)";
  const index = fullText.indexOf(marker);
  if (index !== -1) {
    return fullText.slice(index).trim();
  }
  return fullText.trim();
}

export async function GET() {
  try {
    const agentsPath = path.join(process.cwd(), "AGENTS.md");
    const content = await fs.readFile(agentsPath, "utf-8");
    const rulesOnly = extractRulesOnly(content);

    return NextResponse.json({
      success: true,
      fullContent: content,
      rulesOnly: rulesOnly,
    });
  } catch (error) {
    console.error("Error reading AGENTS.md:", error);
    return NextResponse.json(
      { success: false, error: "AGENTS.md okunamadı" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullContent, rulesOnly } = body;
    const agentsPath = path.join(process.cwd(), "AGENTS.md");

    let textToWrite = fullContent;

    // If only rulesOnly was provided without fullContent, preserve Next.js banner if present
    if (!textToWrite && rulesOnly) {
      let existing = "";
      try {
        existing = await fs.readFile(agentsPath, "utf-8");
      } catch {
        // ignore
      }

      const endBannerMarker = "<!-- END:nextjs-agent-rules -->";
      const bannerIndex = existing.indexOf(endBannerMarker);

      if (bannerIndex !== -1) {
        const header = existing.slice(0, bannerIndex + endBannerMarker.length);
        textToWrite = `${header}\n\n${rulesOnly.trim()}\n`;
      } else {
        textToWrite = `${rulesOnly.trim()}\n`;
      }
    }

    if (!textToWrite) {
      return NextResponse.json(
        { success: false, error: "Kaydedilecek içerik bulunamadı" },
        { status: 400 }
      );
    }

    await fs.writeFile(agentsPath, textToWrite, "utf-8");

    const updatedRulesOnly = extractRulesOnly(textToWrite);

    return NextResponse.json({
      success: true,
      fullContent: textToWrite,
      rulesOnly: updatedRulesOnly,
    });
  } catch (error) {
    console.error("Error writing AGENTS.md:", error);
    return NextResponse.json(
      { success: false, error: "AGENTS.md dosyasına yazılamadı" },
      { status: 500 }
    );
  }
}
