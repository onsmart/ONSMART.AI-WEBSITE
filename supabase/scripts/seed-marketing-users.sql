-- ============================================
-- Criar/atualizar acessos (usuários) da área de marketing
-- Rode no SQL Editor do Supabase
-- ============================================

-- Habilita funções de criptografia (bcrypt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insere ou atualiza usuários (senha em texto; o hash é gerado aqui)
-- Troque o e-mail e a senha conforme precisar

INSERT INTO marketing_users (email, password_hash, name)
VALUES
  (
    'marketing@onsmart.com.br',
    crypt('senha123', gen_salt('bf', 10)),
    'Marketing Admin'
  )
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  updated_at = now();

-- Opcional: segundo usuário para teste
-- Descomente e edite se quiser mais de um acesso

/*
INSERT INTO marketing_users (email, password_hash, name)
VALUES
  (
    'outro@onsmart.com.br',
    crypt('outrasenha', gen_salt('bf', 10)),
    'Outro Usuário'
  )
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  updated_at = now();
*/

-- Conferir usuários criados
SELECT id, email, name, created_at FROM marketing_users ORDER BY created_at;
