/*
  # Add initial website content

  1. Content
    - Add hero section content
    - Add about section content
    - Add services section content
    - Add site settings

  2. Notes
    - Initial content matches current website content
    - All sections have required fields populated
*/

-- Insert hero section content
INSERT INTO website_content (section, title, description, image_url) VALUES
('hero', 'Welcome to Kontinue Creations', 'Elevating brands through strategic digital marketing, compelling podcast production, and innovative content creation', 'https://images.unsplash.com/photo-1557804506-669a67965ba0')
ON CONFLICT (id) DO NOTHING;

-- Insert about section content
INSERT INTO website_content (section, title, description) VALUES
('about', 'About Kontinue Creations', 'We are a dynamic digital marketing and content creation agency, specializing in podcast production and strategic brand development. Our mission is to help businesses thrive in the digital age.')
ON CONFLICT (id) DO NOTHING;

-- Insert services section content
INSERT INTO website_content (section, title, description) VALUES
('services', 'Our Services', 'Comprehensive digital solutions to help your business grow and succeed')
ON CONFLICT (id) DO NOTHING;

-- Insert initial site settings if not exists
INSERT INTO site_settings (site_title, contact_email, youtube_url, facebook_url) VALUES
('Kontinue Creations', 'kontinuecreations@gmail.com', 'https://www.youtube.com/@Program_Host_Kontinue_Creation', 'https://www.facebook.com/profile.php?id=61567340320817')
ON CONFLICT (id) DO NOTHING;