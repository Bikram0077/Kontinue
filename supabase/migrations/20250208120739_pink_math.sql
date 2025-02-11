/*
  # Enhance website content table

  1. Changes
    - Add performance indexes
    - Add data validation constraints
    - Update timestamp defaults
    - Add RLS policies
    - Ensure proper content exists

  2. Security
    - Add RLS policies for authenticated users
*/

-- First ensure the unique constraint exists
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'unique_section'
  ) THEN
    ALTER TABLE website_content
    ADD CONSTRAINT unique_section UNIQUE (section);
  END IF;
END $$;

-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_website_content_section ON website_content(section);
CREATE INDEX IF NOT EXISTS idx_website_content_updated_at ON website_content(updated_at);

-- Add validation checks
ALTER TABLE website_content
ADD CONSTRAINT valid_section CHECK (
  section IN ('hero', 'about', 'services', 'contact', 'footer')
),
ADD CONSTRAINT non_empty_title CHECK (
  length(trim(title)) > 0
),
ADD CONSTRAINT non_empty_description CHECK (
  length(trim(description)) > 0
);

-- Ensure proper timestamps
ALTER TABLE website_content
ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

-- Add missing RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to update content" ON website_content;
CREATE POLICY "Allow authenticated users to update content"
ON website_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert content" ON website_content;
CREATE POLICY "Allow authenticated users to insert content"
ON website_content
FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete content" ON website_content;
CREATE POLICY "Allow authenticated users to delete content"
ON website_content
FOR DELETE
TO authenticated
USING (true);

-- Update existing content or insert if not exists
DO $$
DECLARE
  hero_content jsonb := jsonb_build_object(
    'section', 'hero',
    'title', 'Welcome to Kontinue Creations',
    'description', 'Elevating brands through strategic digital marketing, compelling podcast production, and innovative content creation',
    'image_url', 'https://images.unsplash.com/photo-1557804506-669a67965ba0'
  );
  
  about_content jsonb := jsonb_build_object(
    'section', 'about',
    'title', 'About Kontinue Creations',
    'description', 'We are a dynamic digital marketing and content creation agency, specializing in podcast production and strategic brand development. Our mission is to help businesses thrive in the digital age.',
    'image_url', NULL
  );
  
  services_content jsonb := jsonb_build_object(
    'section', 'services',
    'title', 'Our Services',
    'description', 'Comprehensive digital solutions to help your business grow and succeed',
    'image_url', NULL
  );
BEGIN
  -- Update or insert hero section
  IF EXISTS (SELECT 1 FROM website_content WHERE section = 'hero') THEN
    UPDATE website_content
    SET 
      title = hero_content->>'title',
      description = hero_content->>'description',
      image_url = hero_content->>'image_url',
      updated_at = CURRENT_TIMESTAMP
    WHERE section = 'hero';
  ELSE
    INSERT INTO website_content (section, title, description, image_url)
    VALUES (
      hero_content->>'section',
      hero_content->>'title',
      hero_content->>'description',
      hero_content->>'image_url'
    );
  END IF;

  -- Update or insert about section
  IF EXISTS (SELECT 1 FROM website_content WHERE section = 'about') THEN
    UPDATE website_content
    SET 
      title = about_content->>'title',
      description = about_content->>'description',
      image_url = about_content->>'image_url',
      updated_at = CURRENT_TIMESTAMP
    WHERE section = 'about';
  ELSE
    INSERT INTO website_content (section, title, description, image_url)
    VALUES (
      about_content->>'section',
      about_content->>'title',
      about_content->>'description',
      about_content->>'image_url'
    );
  END IF;

  -- Update or insert services section
  IF EXISTS (SELECT 1 FROM website_content WHERE section = 'services') THEN
    UPDATE website_content
    SET 
      title = services_content->>'title',
      description = services_content->>'description',
      image_url = services_content->>'image_url',
      updated_at = CURRENT_TIMESTAMP
    WHERE section = 'services';
  ELSE
    INSERT INTO website_content (section, title, description, image_url)
    VALUES (
      services_content->>'section',
      services_content->>'title',
      services_content->>'description',
      services_content->>'image_url'
    );
  END IF;
END $$;