-- Marketing area: users and content (no cases)
-- Content type: blog_artigos | ferramentas | materiais_gratuitos only

-- marketing_users
CREATE TABLE IF NOT EXISTS marketing_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_marketing_users_email ON marketing_users (email);

-- marketing_contents
CREATE TABLE IF NOT EXISTS marketing_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('blog_artigos', 'ferramentas', 'materiais_gratuitos')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  slug TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  resumo TEXT,
  conteudo TEXT,
  imagem_url TEXT,
  pdf_path TEXT,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_marketing_contents_slug ON marketing_contents (slug);
CREATE INDEX IF NOT EXISTS idx_marketing_contents_type_status ON marketing_contents (type, status);
CREATE INDEX IF NOT EXISTS idx_marketing_contents_updated ON marketing_contents (updated_at DESC);

-- RLS: apenas o backend (service_role) acessa marketing_users; público pode ler conteúdos publicados
ALTER TABLE marketing_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "marketing_users_no_public" ON marketing_users
  FOR ALL USING (false);

CREATE POLICY "marketing_contents_public_read_published" ON marketing_contents
  FOR SELECT USING (status = 'published');

CREATE POLICY "marketing_contents_no_public_write" ON marketing_contents
  FOR ALL USING (false);

-- Storage buckets: create in Supabase Dashboard or via API
-- marketing-pdfs (private, signed URLs)
-- marketing-images (public)
