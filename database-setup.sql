-- =============================================================================
-- SWARNANDHRA CMS DATABASE SETUP
-- =============================================================================
-- This file contains the complete database schema for the CMS
-- Run this in your Supabase SQL editor to set up the database
--
-- Instructions:
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute
-- =============================================================================

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content jsonb DEFAULT '{}',
  meta_title text,
  meta_description text,
  template text DEFAULT 'default',
  status text DEFAULT 'draft' CHECK (status IN ('published', 'draft', 'archived')),
  parent_id uuid REFERENCES pages(id) ON DELETE SET NULL,
  sort_order integer DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menus table
CREATE TABLE IF NOT EXISTS menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  label text NOT NULL,
  location text DEFAULT 'header',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id uuid REFERENCES menus(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  url text,
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  sort_order integer DEFAULT 0,
  icon text,
  target text DEFAULT '_self',
  css_class text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  content jsonb DEFAULT '{}',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  path text NOT NULL,
  mime_type text NOT NULL,
  size integer DEFAULT 0,
  alt_text text,
  caption text,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb DEFAULT '{}',
  "group" text DEFAULT 'general',
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_pages_parent_id ON pages(parent_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_menu_id ON menu_items(menu_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_parent_id ON menu_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can view all pages" ON pages;
DROP POLICY IF EXISTS "Authenticated users can create pages" ON pages;
DROP POLICY IF EXISTS "Users can update own pages" ON pages;
DROP POLICY IF EXISTS "Users can delete own pages" ON pages;
DROP POLICY IF EXISTS "Public can view menus" ON menus;
DROP POLICY IF EXISTS "Authenticated users can manage menus" ON menus;
DROP POLICY IF EXISTS "Public can view menu items" ON menu_items;
DROP POLICY IF EXISTS "Authenticated users can manage menu items" ON menu_items;
DROP POLICY IF EXISTS "Public can view active sections" ON sections;
DROP POLICY IF EXISTS "Authenticated users can view all sections" ON sections;
DROP POLICY IF EXISTS "Authenticated users can manage sections" ON sections;
DROP POLICY IF EXISTS "Public can view media" ON media;
DROP POLICY IF EXISTS "Authenticated users can upload media" ON media;
DROP POLICY IF EXISTS "Users can update own media" ON media;
DROP POLICY IF EXISTS "Users can delete own media" ON media;
DROP POLICY IF EXISTS "Public can view settings" ON settings;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON settings;

-- RLS Policies for pages
CREATE POLICY "Public can view published pages"
  ON pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all pages"
  ON pages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create pages"
  ON pages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own pages"
  ON pages FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own pages"
  ON pages FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- RLS Policies for menus
CREATE POLICY "Public can view menus"
  ON menus FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage menus"
  ON menus FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for menu_items
CREATE POLICY "Public can view menu items"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage menu items"
  ON menu_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for sections
CREATE POLICY "Public can view active sections"
  ON sections FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all sections"
  ON sections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage sections"
  ON sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for media
CREATE POLICY "Public can view media"
  ON media FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update own media"
  ON media FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete own media"
  ON media FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- RLS Policies for settings
CREATE POLICY "Public can view settings"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage settings"
  ON settings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default data
INSERT INTO menus (name, label, location)
VALUES ('main-menu', 'Main Menu', 'header')
ON CONFLICT (name) DO NOTHING;

INSERT INTO settings (key, value, "group") VALUES
  ('site_name', '{"value": "Swarnandhra College of Engineering and Technology"}', 'general'),
  ('site_tagline', '{"value": "Autonomous - Affiliated to JNTUK, Kakinada, Approved by AICTE"}', 'general'),
  ('site_address', '{"value": "Narsapur, Andhra Pradesh 534280, India"}', 'contact'),
  ('site_logo', '{"value": "/img/logo/swrnlogo.png"}', 'branding')
ON CONFLICT (key) DO NOTHING;

-- Insert sample home page
INSERT INTO pages (title, slug, status, template, content) VALUES
  ('Home', 'home', 'published', 'default', '{}')
ON CONFLICT (slug) DO NOTHING;

-- Insert default menu items
INSERT INTO menu_items (menu_id, label, url, sort_order)
SELECT
  m.id,
  item.label,
  item.url,
  item.sort_order
FROM menus m
CROSS JOIN (
  VALUES
    ('Home', '/', 0),
    ('About', '/about', 1),
    ('Departments', '/departments', 2),
    ('Admissions', '/admissions', 3),
    ('Contact', '/contact', 4)
) AS item(label, url, sort_order)
WHERE m.name = 'main-menu'
AND NOT EXISTS (
  SELECT 1 FROM menu_items mi WHERE mi.menu_id = m.id
);
