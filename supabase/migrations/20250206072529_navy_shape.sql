/*
  # Website Content and Settings Tables

  1. New Tables
    - `website_content`
      - `id` (uuid, primary key)
      - `section` (text) - identifies the website section (e.g., 'hero', 'about', 'services')
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `site_settings`
      - `id` (uuid, primary key)
      - `site_title` (text)
      - `contact_email` (text)
      - `youtube_url` (text)
      - `facebook_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Website Content Table
CREATE TABLE IF NOT EXISTS website_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  title text,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users"
  ON website_content
  FOR ALL
  TO authenticated
  USING (true);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title text,
  contact_email text,
  youtube_url text,
  facebook_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (true);

-- Insert initial website content
INSERT INTO website_content (section, title, description, image_url) VALUES
('hero', 'Welcome to Kontinue Creations', 'Elevating brands through strategic digital marketing, compelling podcast production, and innovative content creation', 'https://images.unsplash.com/photo-1557804506-669a67965ba0'),
('about', 'About Kontinue Creations', 'We are a dynamic digital marketing and content creation agency, specializing in podcast production and strategic brand development. Our mission is to help businesses thrive in the digital age.', NULL),
('services', 'Our Services', 'Comprehensive digital solutions to help your business grow and succeed', NULL);

-- Insert initial site settings
INSERT INTO site_settings (site_title, contact_email, youtube_url, facebook_url) VALUES
('Kontinue Creations', 'kontinuecreations@gmail.com', 'https://www.youtube.com/@Program_Host_Kontinue_Creation', 'https://www.facebook.com/profile.php?id=61567340320817');