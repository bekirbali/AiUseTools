-- =======================================================
-- AI STUDIO & AUTOMOTIVE VAULT - DATABASE SCHEMA
-- Supabase SQL Editor'a yapıştırıp RUN butonuna basın!
-- =======================================================

-- 1. AI SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    install_command TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    is_custom BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SOCIAL MEDIA PROMPTS TABLE
CREATE TABLE IF NOT EXISTS public.prompts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    tab_title TEXT,
    prompt TEXT NOT NULL,
    target_model TEXT DEFAULT 'Omni 1.1',
    channel TEXT NOT NULL,
    aspect_ratio TEXT DEFAULT '9:16',
    parameters TEXT,
    negative_prompt TEXT,
    tips TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    presets_title TEXT,
    presets JSONB DEFAULT '[]'::jsonb,
    is_custom BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id TEXT PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    category TEXT NOT NULL,
    year_or_gen TEXT,
    prompt_snippet TEXT NOT NULL,
    body_style TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    is_custom BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WRAPS TABLE
CREATE TABLE IF NOT EXISTS public.wraps (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    finish_type TEXT NOT NULL,
    description TEXT,
    color_preview TEXT,
    secondary_color TEXT,
    prompt_snippet TEXT NOT NULL,
    recommended_cars JSONB DEFAULT '[]'::jsonb,
    is_custom BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Ayarları: Herkes okuyabilir ve yeni veri ekleyebilir
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wraps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public insert on skills" ON public.skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on skills" ON public.skills FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on skills" ON public.skills FOR DELETE USING (true);

CREATE POLICY "Allow public read on prompts" ON public.prompts FOR SELECT USING (true);
CREATE POLICY "Allow public insert on prompts" ON public.prompts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on prompts" ON public.prompts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on prompts" ON public.prompts FOR DELETE USING (true);

CREATE POLICY "Allow public read on vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public insert on vehicles" ON public.vehicles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on vehicles" ON public.vehicles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on vehicles" ON public.vehicles FOR DELETE USING (true);

CREATE POLICY "Allow public read on wraps" ON public.wraps FOR SELECT USING (true);
CREATE POLICY "Allow public insert on wraps" ON public.wraps FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on wraps" ON public.wraps FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on wraps" ON public.wraps FOR DELETE USING (true);
