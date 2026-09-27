export type SkillCategory =
  | "agent"
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
  targetModel: "Midjourney v6.1" | "Flux.1 Dev" | "Flux.1 Schnell" | "SDXL" | "Claude / ChatGPT";
  aspectRatio: "9:16" | "16:9" | "1:1" | "4:5";
  parameters?: string;
  tags: string[];
  engagementTip?: string;
  isCustom?: boolean;
}

export interface VehicleModelItem {
  id: string;
  brand: string;
  model: string;
  category: "Hypercar" | "Supercar" | "JDM Legend" | "Luxury GT" | "Super SUV" | "Cyberpunk Concept";
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
