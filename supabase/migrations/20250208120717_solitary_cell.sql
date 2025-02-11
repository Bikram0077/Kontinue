/*
  # Clean up duplicates and add constraints

  1. Changes
    - Remove duplicate sections while keeping the most recent entries
    - Add unique constraint for sections
    - Add updated_at trigger
    - Ensure correct content exists

  2. Security
    - Add public read access policy
*/

-- First, remove duplicates by keeping only the most recent version of each section
WITH duplicates AS (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY section ORDER BY updated_at DESC) as rn
    FROM website_content
  ) t
  WHERE rn > 1
)
DELETE FROM website_content
WHERE id IN (SELECT id FROM duplicates);

-- Now that we have cleaned up duplicates, we can safely add the unique constraint
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'unique_section'
  ) THEN
    ALTER TABLE website_content
    ADD CONSTRAINT unique_section UNIQUE (section);
  END IF;
END $$;

-- Create or replace the updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop the trigger if it exists and create it again
DROP TRIGGER IF EXISTS update_website_content_updated_at ON website_content;
CREATE TRIGGER update_website_content_updated_at
    BEFORE UPDATE ON website_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add policy for public read access if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Allow public read access'
    AND tablename = 'website_content'
  ) THEN
    CREATE POLICY "Allow public read access"
    ON website_content
    FOR SELECT
    TO public
    USING (true);
  END IF;
END $$;

-- Ensure correct content exists
INSERT INTO website_content (section, title, description, image_url)
VALUES
    ('hero', 'Welcome to Kontinue Creations', 'Elevating brands through strategic digital marketing, compelling podcast production, and innovative content creation', 'https://images.unsplash.com/photo-1557804506-669a67965ba0'),
    ('about', 'About Kontinue Creations', 'We are a dynamic digital marketing and content creation agency, specializing in podcast production and strategic brand development. Our mission is to help businesses thrive in the digital age.', NULL),
    ('services', 'Our Services', 'Comprehensive digital solutions to help your business grow and succeed', NULL)
ON CONFLICT (section) 
DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    updated_at = CURRENT_TIMESTAMP;