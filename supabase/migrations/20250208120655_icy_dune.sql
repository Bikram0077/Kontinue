/*
  # Final Fix for Duplicate Sections

  1. Changes
    - Clean up any remaining duplicate entries
    - Ensure data integrity
    - Fix content relationships

  2. Security
    - Maintain existing RLS policies
*/

-- First, create a temporary table to store the most recent content
CREATE TEMP TABLE temp_content AS
SELECT DISTINCT ON (section) *
FROM website_content
ORDER BY section, updated_at DESC;

-- Clear the main table
TRUNCATE website_content;

-- Restore the data from our temporary table
INSERT INTO website_content
SELECT * FROM temp_content;

-- Drop temporary table
DROP TABLE temp_content;

-- Ensure we have the correct content
DO $$
BEGIN
  -- Update or insert hero section
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

  -- Update or insert about section
  INSERT INTO website_content (section, title, description)
  VALUES (
    'about',
    'About Kontinue Creations',
    'We are a dynamic digital marketing and content creation agency, specializing in podcast production and strategic brand development. Our mission is to help businesses thrive in the digital age.'
  )
  ON CONFLICT (section) 
  DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;

  -- Update or insert services section
  INSERT INTO website_content (section, title, description)
  VALUES (
    'services',
    'Our Services',
    'Comprehensive digital solutions to help your business grow and succeed'
  )
  ON CONFLICT (section) 
  DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;
END $$;