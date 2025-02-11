/*
  # Fix Duplicate Sections and Database Constraints

  1. Changes
    - Remove duplicate entries
    - Ensure unique sections
    - Fix content relationships

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity
*/

-- First, remove any duplicate entries keeping only the most recently updated row for each section
DELETE FROM website_content a USING (
  SELECT section, MAX(updated_at) as max_updated
  FROM website_content
  GROUP BY section
  HAVING COUNT(*) > 1
) b
WHERE a.section = b.section
AND a.updated_at < b.max_updated;

-- Drop the existing unique constraint if it exists
ALTER TABLE website_content
DROP CONSTRAINT IF EXISTS unique_section;

-- Add the unique constraint back
ALTER TABLE website_content
ADD CONSTRAINT unique_section UNIQUE (section);

-- Ensure proper content exists without duplicates
DO $$
BEGIN
  -- Update hero section if it exists, otherwise insert
  INSERT INTO website_content (section, title, description, image_url)
  VALUES (
    'hero',
    'Welcome to Kontinue Creations',
    'Elevating brands through strategic digital marketing, compelling podcast production, and innovative content creation',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0'
  )
  ON CONFLICT (section) 
  DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    updated_at = CURRENT_TIMESTAMP;
END $$;