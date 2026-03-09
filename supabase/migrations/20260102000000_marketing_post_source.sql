-- Add post type for blog articles: content on site vs link to LinkedIn (or other external URL)
ALTER TABLE marketing_contents
  ADD COLUMN IF NOT EXISTS post_source TEXT NOT NULL DEFAULT 'site' CHECK (post_source IN ('site', 'linkedin')),
  ADD COLUMN IF NOT EXISTS external_url TEXT;

COMMENT ON COLUMN marketing_contents.post_source IS 'site = content on site; linkedin = card links to external_url';
COMMENT ON COLUMN marketing_contents.external_url IS 'When post_source=linkedin, URL to open (e.g. LinkedIn post)';
