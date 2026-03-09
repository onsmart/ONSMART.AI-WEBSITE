# Configuração do Supabase para a Área de Marketing

Passo a passo para criar o projeto, tabelas e buckets no Supabase e preencher o `.env`.

---

## 1. Criar projeto no Supabase (se ainda não tiver)

1. Acesse [supabase.com](https://supabase.com) e faça login.
2. **New project** → escolha organização, nome do projeto (ex: `onsmart-website`) e senha do banco (guarde essa senha).
3. Aguarde o provisionamento (1–2 min).

---

## 2. Obter URL e chaves (variáveis de ambiente)

1. No projeto, vá em **Project Settings** (ícone de engrenagem) → **API**.
2. Anote:
   - **Project URL** → será `SUPABASE_URL`
   - **Project API keys**:
     - **anon public** → não use no backend do marketing (só para frontend público, se precisar).
     - **service_role** (secret) → será `SUPABASE_SERVICE_ROLE_KEY`.  
       ⚠️ **Nunca** exponha essa chave no frontend; use só no servidor (Node/Express).

No seu `.env` na raiz do projeto, adicione ou ajuste:

```env
# Obrigatório para o backend (marketing + seed)
SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Substitua pela **Project URL** e pela chave **service_role** do seu projeto.

---

## 3. Criar tabelas e políticas (SQL)

1. No Supabase, abra **SQL Editor**.
2. Clique em **New query**.
3. Cole o SQL abaixo (é o mesmo do arquivo `supabase/migrations/20260101000000_marketing.sql`).
4. Clique em **Run** (ou Ctrl+Enter).

```sql
-- ============================================
-- Área de Marketing: usuários e conteúdos
-- Tipos de conteúdo: blog_artigos | ferramentas | materiais_gratuitos
-- ============================================

-- Tabela de usuários do painel de marketing
CREATE TABLE IF NOT EXISTS marketing_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_marketing_users_email ON marketing_users (email);

-- Tabela de conteúdos (blog, ferramentas, materiais)
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

-- Ninguém (anon/authenticated) pode acessar marketing_users; o backend usa service_role e ignora RLS
CREATE POLICY "marketing_users_no_public" ON marketing_users
  FOR ALL USING (false);

-- Público pode apenas ler conteúdos publicados
CREATE POLICY "marketing_contents_public_read_published" ON marketing_contents
  FOR SELECT USING (status = 'published');

-- Inserir/atualizar/excluir só via backend (service_role)
CREATE POLICY "marketing_contents_no_public_write" ON marketing_contents
  FOR ALL USING (false);
```

Se der erro de “policy already exists”, você pode dropar e recriar (opcional):

```sql
-- Só use se precisar recriar as políticas
DROP POLICY IF EXISTS "marketing_users_no_public" ON marketing_users;
DROP POLICY IF EXISTS "marketing_contents_public_read_published" ON marketing_contents;
DROP POLICY IF EXISTS "marketing_contents_no_public_write" ON marketing_contents;
-- Depois rode novamente os CREATE POLICY do bloco acima
```

---

## 4. Criar buckets de Storage (PDFs e imagens)

1. No menu lateral, vá em **Storage**.
2. **New bucket**:
   - **Name:** `marketing-pdfs`
   - **Public bucket:** **Off** (privado; o backend gera signed URLs para PDFs).
   - **Create bucket**.
3. **New bucket** de novo:
   - **Name:** `marketing-images`
   - **Public bucket:** **On** (imagens acessíveis por URL pública).
   - **Create bucket**.

(Opcional) Se quiser restringir quem sobe arquivos, em **Policies** de cada bucket você pode criar políticas; para o backend usando **service_role** não é obrigatório, pois a service role ignora RLS do Storage.

---

## 5. Variáveis de ambiente completas (marketing)

No `.env` na raiz do projeto, deixe pelo menos assim para o marketing funcionar:

```env
# --- Supabase (obrigatório) ---
SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# --- JWT do marketing (obrigatório) ---
JWT_SECRET=uma-frase-secreta-com-pelo-menos-32-caracteres

# --- Resend para e-mail (obrigatório se for enviar material por e-mail) ---
RESEND_API_KEY=re_xxxx
RESEND_SENDER_EMAIL=marketing@seudominio.com

# --- Opcional: seed ao subir o server ---
MARKETING_SEED_ON_STARTUP=true
MARKETING_SEED_EMAIL=marketing@onsmart.com.br
MARKETING_SEED_PASSWORD=senha123

# --- Opcional: backfill de artigos estáticos para marketing_contents ---
# Em produção: ao subir o server, sincroniza os artigos da planilha do Google Sheets (mesma do deploy) para marketing_contents. Em desenvolvimento o sync não roda para não afetar a produção.
MARKETING_BACKFILL_FROM_SITE=true

# Opcional: ID da planilha (padrão é a usada no site)
# A planilha deve ter: coluna A = Título, B = Imagem (URL), C = Link (ex. LinkedIn), D = Descrição
# MARKETING_GOOGLE_SHEET_ID=1GPgJ2wETkmEjZtJAxs1s8i2wnjjBdNSiykv-Hn-sbJ4
```

**Desenvolvimento vs produção**

- O sync da planilha **só roda em produção** (`NODE_ENV=production`). Em dev o servidor não popula a tabela, para não alterar os dados do deploy.
- Para que alterações feitas **no ambiente de desenvolvimento** não afetem o site em produção, use um **projeto Supabase separado** no `.env` quando rodar localmente (crie um projeto “dev” ou “staging” no Supabase e use a URL e a chave `service_role` desse projeto no `.env` de dev). Assim o painel de marketing em dev edita apenas o banco de dev.

- Troque `JWT_SECRET` por um segredo forte (mín. 32 caracteres).
- Troque `RESEND_*` pelos valores do [Resend](https://resend.com) se for usar envio de e-mail.

---

## 6. Conferir se deu certo

1. **Tabelas:** Em **Table Editor** devem aparecer `marketing_users` e `marketing_contents`.
2. **Storage:** Em **Storage** devem existir os buckets `marketing-pdfs` e `marketing-images`.
3. **App:** Rode `npm run build:server` e depois `npm run dev:full`. No log do server deve aparecer algo como:
   - `[marketing] Seed user ready: marketing@onsmart.com.br` (se `MARKETING_SEED_ON_STARTUP=true`).
   - Em **produção** com `MARKETING_BACKFILL_FROM_SITE=true`: `[marketing] Sync from sheet: X novos, Y atualizados.` (os artigos da planilha entram na tabela). Em desenvolvimento o sync não roda.
4. Acesse `/marketing/login` e entre com o e-mail e senha do seed (ex.: `marketing@onsmart.com.br` / `senha123`).

---

## 7. Usar Supabase CLI (opcional)

Se quiser aplicar a migração por linha de comando:

```bash
# Instalar CLI: npm install -g supabase
supabase login
supabase link --project-ref SEU_PROJECT_REF
supabase db push
```

O `supabase db push` aplica as migrações da pasta `supabase/migrations/`. O **Project ref** está na URL do projeto: `https://SEU_PROJECT_REF.supabase.co`.

---

## Resumo rápido

| Onde | O que fazer |
|------|-----------------------------|
| **Supabase Dashboard → API** | Copiar Project URL e service_role key para `.env` |
| **Supabase Dashboard → SQL Editor** | Colar e executar o SQL das tabelas e políticas acima |
| **Supabase Dashboard → Storage** | Criar buckets `marketing-pdfs` (privado) e `marketing-images` (público) |
| **Arquivo .env** | Preencher `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, e opcionalmente Resend e seed |

Depois disso, o backend e o login da área de marketing passam a usar o Supabase corretamente.
