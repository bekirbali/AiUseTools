export type SkillCategory =
  | "agent"
  | "rules"
  | "dev"
  | "terminal"
  | "design"
  | "automation"
  | "custom";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  installCommand: string;
  usageExample: string;
  tags: string[];
  docs?: string;
  fullContent?: string;
  rulesOnly?: string;
  isCustom?: boolean;
}

export type ChannelCategory =
  | "araba"
  | "cyberpunk"
  | "luxury"
  | "portrait"
  | "custom";

export interface SocialPromptItem {
  id: string;
  channel: ChannelCategory;
  channelName: string;
  title: string;
  prompt: string;
  negativePrompt?: string;
  targetModel: "Omni 1.1" | "Midjourney v6.1" | "Flux.1 Dev" | "Flux.1 Schnell" | "SDXL" | "Claude / ChatGPT" | string;
  aspectRatio: "9:16" | "16:9" | "1:1" | "4:5";
  parameters?: string;
  tags: string[];
  engagementTip?: string;
  presets?: { label: string; text: string; note?: string }[];
  presetsTitle?: string;
  tabTitle?: string;
  isCustom?: boolean;
}

export type VehicleCategory =
  | "Süper Spor & Pist Odaklı"
  | "Lüks & Performans SUV"
  | "Ultra Lüks GT & Prestij Sedan"
  | "Agresif Sokak & Pist Sedan / Coupe"
  | "Yeni Nesil Hiper & Süper Otomobiller"
  | "Vahşi & Uzay Gemisi Tasarımlar"
  | "Widebody Canavarlar"
  | string;

export interface VehicleModelItem {
  id: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  yearOrGen: string;
  promptSnippet: string;
  bodyStyle: string;
  tags: string[];
  isCustom?: boolean;
}

export interface WrapStyleItem {
  id: string;
  name: string;
  finishType: "Satin" | "Matte" | "Liquid Metal / Chrome" | "Chameleon Iridescent" | "Heritage Livery" | "Forged Carbon";
  description: string;
  colorPreview: string;
  secondaryColor?: string;
  promptSnippet: string;
  recommendedCars: string[];
  isCustom?: boolean;
}

export interface EnvironmentPreset {
  id: string;
  name: string;
  timeOfDay: string;
  promptSnippet: string;
  iconName: string;
}

export interface CameraAnglePreset {
  id: string;
  name: string;
  promptSnippet: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  quickAction?: {
    type: "copy" | "fill-studio" | "view-skill";
    label: string;
    payload: string;
  };
}
