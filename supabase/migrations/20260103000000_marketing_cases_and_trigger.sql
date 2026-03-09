-- Add 'cases' to marketing_contents type; trigger for updated_at; index on status
-- Run after 20260101000000_marketing.sql and 20260102000000_marketing_post_source.sql

-- Drop existing CHECK and add new one including 'cases'
ALTER TABLE marketing_contents DROP CONSTRAINT IF EXISTS marketing_contents_type_check;
ALTER TABLE marketing_contents ADD CONSTRAINT marketing_contents_type_check
  CHECK (type IN ('blog_artigos', 'ferramentas', 'materiais_gratuitos', 'cases'));

-- Trigger to set updated_at on UPDATE
CREATE OR REPLACE FUNCTION set_marketing_contents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_marketing_contents_updated_at ON marketing_contents;
CREATE TRIGGER trigger_marketing_contents_updated_at
  BEFORE UPDATE ON marketing_contents
  FOR EACH ROW
  EXECUTE PROCEDURE set_marketing_contents_updated_at();

-- Index on status (for public list filtered by status = 'published')
CREATE INDEX IF NOT EXISTS idx_marketing_contents_status ON marketing_contents (status);
