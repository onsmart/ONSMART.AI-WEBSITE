-- Allow post_source = 'youtube' for blog articles (video link; title/thumbnail from oEmbed stored in meta)
ALTER TABLE marketing_contents DROP CONSTRAINT IF EXISTS marketing_contents_post_source_check;
ALTER TABLE marketing_contents ADD CONSTRAINT marketing_contents_post_source_check
  CHECK (post_source IN ('site', 'linkedin', 'youtube'));

COMMENT ON COLUMN marketing_contents.post_source IS 'site = content on site; linkedin = card links to external_url; youtube = card shows video thumbnail/title, links to YouTube';
