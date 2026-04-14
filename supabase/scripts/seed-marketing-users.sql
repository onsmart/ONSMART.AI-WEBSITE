-- ============================================
-- Modelo: criar/atualizar usuários da área de marketing
-- Rode no SQL Editor do Supabase (não commite senhas reais neste arquivo).
-- ============================================

-- Habilita bcrypt via pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Copie o bloco abaixo, substitua e-mail, senha e nome, e execute:

-- INSERT INTO marketing_users (email, password_hash, name)
-- VALUES (
--   'seu.email@empresa.com.br',
--   crypt('SUA_SENHA_FORTE', gen_salt('bf', 10)),
--   'Nome para exibição'
-- )
-- ON CONFLICT (email) DO UPDATE SET
--   password_hash = EXCLUDED.password_hash,
--   name = EXCLUDED.name,
--   updated_at = now();

-- Conferir usuários
SELECT id, email, name, created_at FROM marketing_users ORDER BY created_at;
