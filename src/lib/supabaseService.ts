import { supabase } from "./supabase";
import { SkillItem, SocialPromptItem, VehicleModelItem, WrapStyleItem } from "@/types";
import { initialSkills } from "@/data/initialSkills";
import { initialPrompts } from "@/data/initialPrompts";
import { initialVehicles } from "@/data/initialVehicles";
import { initialWraps } from "@/data/initialWraps";

// ==========================================
// 1. SKILLS SERVICES
// ==========================================
export async function getSkills(): Promise<SkillItem[]> {
  try {
    const { data, error } = await supabase.from("skills").select("*").order("created_at", { ascending: true });
    if (error || !data || data.length === 0) {
      if (data && data.length === 0) {
        await seedSkills();
      }
      return initialSkills;
    }
    const dbItems: SkillItem[] = data.map((d) => {
      const matchInit = initialSkills.find((init) => init.id === d.id);
      return {
        id: d.id,
        name: d.name,
        description: d.description,
        category: d.category,
        installCommand: d.install_command,
        usageExample: d.usage_example || matchInit?.usageExample || d.install_command,
        tags: d.tags || [],
        docs: d.docs || matchInit?.docs,
        fullContent: matchInit?.fullContent,
        rulesOnly: matchInit?.rulesOnly,
        externalUrl: matchInit?.externalUrl,
        isCustom: d.is_custom ?? false,
      };
    });
    // Ensure all built-in initial skills (like AGENTS.md) are present
    const missingInitials = initialSkills.filter((init) => !data.some((d) => d.id === init.id));
    return [...missingInitials, ...dbItems];
  } catch (err) {
    console.error("Supabase getSkills error:", err);
    return initialSkills;
  }
}

export async function addSkill(skill: SkillItem): Promise<boolean> {
  try {
    const { error } = await supabase.from("skills").insert({
      id: skill.id,
      name: skill.name,
      description: skill.description,
      category: skill.category,
      install_command: skill.installCommand,
      tags: skill.tags,
      is_custom: true,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase addSkill error:", err);
    return false;
  }
}

export async function updateSkill(skill: SkillItem): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("skills")
      .update({
        name: skill.name,
        description: skill.description,
        category: skill.category,
        install_command: skill.installCommand,
        usage_example: skill.usageExample,
        tags: skill.tags,
        docs: skill.docs,
      })
      .eq("id", skill.id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase updateSkill error:", err);
    return false;
  }
}

export async function deleteSkill(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase deleteSkill error:", err);
    return false;
  }
}

async function seedSkills() {
  try {
    const payload = initialSkills.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      category: s.category,
      install_command: s.installCommand,
      tags: s.tags,
      is_custom: false,
    }));
    await supabase.from("skills").insert(payload);
  } catch (e) {
    console.error("Failed to seed skills:", e);
  }
}

// ==========================================
// 2. PROMPTS SERVICES
// ==========================================
export async function getPrompts(): Promise<SocialPromptItem[]> {
  try {
    const { data, error } = await supabase.from("prompts").select("*").order("created_at", { ascending: true });
    if (error || !data || data.length === 0) {
      if (data && data.length === 0) {
        await seedPrompts();
      }
      return initialPrompts;
    }
    return data.map((d) => {
      const matchInit = initialPrompts.find((init) => init.id === d.id);
      return {
        id: d.id,
        title: d.title,
        tabTitle: d.tab_title,
        prompt: d.prompt,
        channel: d.channel,
        channelName: d.channel_name || matchInit?.channelName || d.channel,
        targetModel: d.target_model || "Omni 1.1",
        aspectRatio: d.aspect_ratio || "9:16",
        parameters: d.parameters,
        negativePrompt: d.negative_prompt,
        engagementTip: d.engagement_tip || matchInit?.engagementTip,
        tags: d.tags || [],
        presetsTitle: d.presets_title,
        presets: d.presets || [],
        isCustom: d.is_custom ?? false,
      };
    });
  } catch (err) {
    console.error("Supabase getPrompts error:", err);
    return initialPrompts;
  }
}

export async function addPrompt(item: SocialPromptItem): Promise<boolean> {
  try {
    const { error } = await supabase.from("prompts").insert({
      id: item.id,
      title: item.title,
      tab_title: item.tabTitle,
      prompt: item.prompt,
      target_model: item.targetModel || "Omni 1.1",
      channel: item.channel,
      aspect_ratio: item.aspectRatio || "9:16",
      parameters: item.parameters,
      negative_prompt: item.negativePrompt,
      tags: item.tags,
      presets_title: item.presetsTitle,
      presets: item.presets,
      is_custom: true,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase addPrompt error:", err);
    return false;
  }
}

export async function updatePrompt(item: SocialPromptItem): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("prompts")
      .update({
        title: item.title,
        tab_title: item.tabTitle,
        prompt: item.prompt,
        target_model: item.targetModel,
        channel: item.channel,
        aspect_ratio: item.aspectRatio,
        parameters: item.parameters,
        negative_prompt: item.negativePrompt,
        tags: item.tags,
        presets_title: item.presetsTitle,
        presets: item.presets,
      })
      .eq("id", item.id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase updatePrompt error:", err);
    return false;
  }
}

export async function deletePrompt(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase deletePrompt error:", err);
    return false;
  }
}

async function seedPrompts() {
  try {
    const payload = initialPrompts.map((p) => ({
      id: p.id,
      title: p.title,
      tab_title: p.tabTitle,
      prompt: p.prompt,
      target_model: p.targetModel || "Omni 1.1",
      channel: p.channel,
      aspect_ratio: p.aspectRatio || "9:16",
      parameters: p.parameters,
      negative_prompt: p.negativePrompt,
      tags: p.tags,
      presets_title: p.presetsTitle,
      presets: p.presets,
      is_custom: false,
    }));
    await supabase.from("prompts").insert(payload);
  } catch (e) {
    console.error("Failed to seed prompts:", e);
  }
}

// ==========================================
// 3. VEHICLES SERVICES
// ==========================================
export async function getVehicles(): Promise<VehicleModelItem[]> {
  try {
    const { data, error } = await supabase.from("vehicles").select("*").order("created_at", { ascending: true });
    if (error || !data || data.length === 0) {
      if (data && data.length === 0) {
        await seedVehicles();
      }
      return initialVehicles;
    }
    return data.map((d) => ({
      id: d.id,
      brand: d.brand,
      model: d.model,
      category: d.category,
      yearOrGen: d.year_or_gen,
      promptSnippet: d.prompt_snippet,
      bodyStyle: d.body_style,
      tags: d.tags || [],
      isCustom: d.is_custom ?? false,
    }));
  } catch (err) {
    console.error("Supabase getVehicles error:", err);
    return initialVehicles;
  }
}

export async function addVehicle(item: VehicleModelItem): Promise<boolean> {
  try {
    const { error } = await supabase.from("vehicles").insert({
      id: item.id,
      brand: item.brand,
      model: item.model,
      category: item.category,
      year_or_gen: item.yearOrGen,
      prompt_snippet: item.promptSnippet,
      body_style: item.bodyStyle,
      tags: item.tags,
      is_custom: true,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase addVehicle error:", err);
    return false;
  }
}

async function seedVehicles() {
  try {
    const payload = initialVehicles.map((v) => ({
      id: v.id,
      brand: v.brand,
      model: v.model,
      category: v.category,
      year_or_gen: v.yearOrGen,
      prompt_snippet: v.promptSnippet,
      body_style: v.bodyStyle,
      tags: v.tags,
      is_custom: false,
    }));
    await supabase.from("vehicles").insert(payload);
  } catch (e) {
    console.error("Failed to seed vehicles:", e);
  }
}

// ==========================================
// 4. WRAPS SERVICES
// ==========================================
export async function getWraps(): Promise<WrapStyleItem[]> {
  try {
    const { data, error } = await supabase.from("wraps").select("*").order("created_at", { ascending: true });
    if (error || !data || data.length === 0) {
      if (data && data.length === 0) {
        await seedWraps();
      }
      return initialWraps;
    }
    return data.map((d) => ({
      id: d.id,
      name: d.name,
      finishType: d.finish_type,
      description: d.description,
      colorPreview: d.color_preview,
      secondaryColor: d.secondary_color,
      promptSnippet: d.prompt_snippet,
      recommendedCars: d.recommended_cars || [],
      isCustom: d.is_custom ?? false,
    }));
  } catch (err) {
    console.error("Supabase getWraps error:", err);
    return initialWraps;
  }
}

export async function addWrap(item: WrapStyleItem): Promise<boolean> {
  try {
    const { error } = await supabase.from("wraps").insert({
      id: item.id,
      name: item.name,
      finish_type: item.finishType,
      description: item.description,
      color_preview: item.colorPreview,
      secondary_color: item.secondaryColor,
      prompt_snippet: item.promptSnippet,
      recommended_cars: item.recommendedCars,
      is_custom: true,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Supabase addWrap error:", err);
    return false;
  }
}

async function seedWraps() {
  try {
    const payload = initialWraps.map((w) => ({
      id: w.id,
      name: w.name,
      finish_type: w.finishType,
      description: w.description,
      color_preview: w.colorPreview,
      secondary_color: w.secondaryColor,
      prompt_snippet: w.promptSnippet,
      recommended_cars: w.recommendedCars,
      is_custom: false,
    }));
    await supabase.from("wraps").insert(payload);
  } catch (e) {
    console.error("Failed to seed wraps:", e);
  }
}
