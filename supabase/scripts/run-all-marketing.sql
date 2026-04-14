-- ============================================
-- MARKETING: TUDO PARA RODAR NO SQL EDITOR DO SUPABASE
-- Copie e cole este arquivo inteiro no SQL Editor e execute.
-- ============================================

-- ---------- 1. Tabelas iniciais ----------
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

-- RLS
ALTER TABLE marketing_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_contents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "marketing_users_no_public" ON marketing_users;
CREATE POLICY "marketing_users_no_public" ON marketing_users
  FOR ALL USING (false);

DROP POLICY IF EXISTS "marketing_contents_public_read_published" ON marketing_contents;
CREATE POLICY "marketing_contents_public_read_published" ON marketing_contents
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "marketing_contents_no_public_write" ON marketing_contents;
CREATE POLICY "marketing_contents_no_public_write" ON marketing_contents
  FOR ALL USING (false);


-- ---------- 2. Colunas post_source e external_url ----------
ALTER TABLE marketing_contents
  ADD COLUMN IF NOT EXISTS post_source TEXT NOT NULL DEFAULT 'site' CHECK (post_source IN ('site', 'linkedin')),
  ADD COLUMN IF NOT EXISTS external_url TEXT;

COMMENT ON COLUMN marketing_contents.post_source IS 'site = content on site; linkedin = card links to external_url';
COMMENT ON COLUMN marketing_contents.external_url IS 'When post_source=linkedin, URL to open (e.g. LinkedIn post)';


-- ---------- 3. Tipo "cases" + trigger updated_at + índice status ----------
ALTER TABLE marketing_contents DROP CONSTRAINT IF EXISTS marketing_contents_type_check;
ALTER TABLE marketing_contents ADD CONSTRAINT marketing_contents_type_check
  CHECK (type IN ('blog_artigos', 'ferramentas', 'materiais_gratuitos', 'cases'));

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

CREATE INDEX IF NOT EXISTS idx_marketing_contents_status ON marketing_contents (status);


-- ---------- 4. Usuários marketing ----------
-- Credenciais: crie no Supabase (SQL Editor) ou use seed local com MARKETING_SEED_USERS_JSON no .env.
-- Ver supabase/scripts/seed-marketing-users.sql (modelo com INSERT comentado).

-- ---------- 5. Conferir ----------
SELECT id, email, name, created_at FROM marketing_users ORDER BY created_at;
