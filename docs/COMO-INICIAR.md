# Como iniciar o projeto (desenvolvimento local)

Siga estes passos para deixar tudo funcionando: frontend, backend e área de marketing.

---

## 1. Variáveis de ambiente

Na raiz do projeto, crie ou edite o arquivo **`.env`** com pelo menos:

```env
# Obrigatório para o servidor e área de marketing
JWT_SECRET=uma-chave-secreta-forte-aqui
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key

# Opcional: login automático do usuário de marketing no startup
MARKETING_SEED_ON_STARTUP=true
MARKETING_SEED_EMAIL=marketing@onsmart.com.br
MARKETING_SEED_PASSWORD=senha123
```

- **JWT_SECRET**: qualquer string longa e aleatória (usada nos tokens de login do painel de marketing).
- **SUPABASE_URL** e **SUPABASE_SERVICE_ROLE_KEY**: no [Dashboard do Supabase](https://supabase.com/dashboard) → seu projeto → **Settings** → **API**.

Em desenvolvimento você pode usar um projeto Supabase separado para não misturar com produção.

---

## 2. Banco de dados (Supabase)

No **SQL Editor** do seu projeto Supabase, execute o script que cria tabelas, RLS, trigger e usuário inicial:

- Arquivo: **`supabase/scripts/run-all-marketing.sql`**

Ou copie o conteúdo desse arquivo, cole no SQL Editor e execute. Isso cria:

- Tabelas `marketing_users` e `marketing_contents`
- Políticas RLS
- Trigger de `updated_at`
- Tipo `cases` e colunas `post_source` / `external_url`
- Usuário inicial (ex.: `marketing@onsmart.com.br` / `senha123` — troque a senha depois)

Sem esse passo, o login e os conteúdos de marketing não funcionam.

---

## 3. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

---

## 4. Compilar o servidor (backend)

O Express usa o código compilado em `dist-server/`. É preciso compilar antes de subir o servidor:

```bash
npm run build:server
```

Faça isso sempre que alterar algo em `server/` (por exemplo rotas, marketing, tRPC).

---

## 5. Subir frontend + backend juntos

**Opção A – Tudo de uma vez (recomendado para o dia a dia):**

```bash
npm run dev:one
```

Esse comando:

1. Compila o servidor (`build:server`)
2. Sobe o Vite (frontend) e o Express (backend) ao mesmo tempo

- **Frontend:** http://localhost:3000  
- **Backend/API:** http://localhost:3001  
- O Vite faz proxy de `/api` para a porta 3001.

**Opção B – Em dois terminais:**

Terminal 1 (backend):

```bash
npm run build:server
npm run server
```

Terminal 2 (frontend):

```bash
npm run dev
```

Acesse o site em http://localhost:3000.

---

## 6. Área de marketing

- **Login:** http://localhost:3000/marketing/login  
- **Painel (após login):** http://localhost:3000/marketing  

Use o e-mail e a senha do usuário criado no passo 2 (ou os que você configurou em `MARKETING_SEED_*` no `.env`).

---

## Resumo rápido

| O que fazer                         | Comando           |
|------------------------------------|-------------------|
| Primeira vez (env + banco + deps)  | 1–3 acima        |
| Desenvolvimento (tudo junto)       | `npm run dev:one`|
| Só frontend                        | `npm run dev`     |
| Só backend (após compilar)         | `npm run server`  |
| Produção (build completo)          | `npm run start`   |

---

## Problemas comuns

- **"Marketing tRPC not loaded"**  
  Rode `npm run build:server` e depois inicie o servidor de novo.

- **Erro 401 no login do marketing**  
  Confira `.env`: `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Confira se o script SQL foi executado no Supabase e se o usuário existe em `marketing_users`.

- **Páginas em branco ou 404 no React Router**  
  Use sempre http://localhost:3000 (frontend). O backend em 3001 só atende `/api` e arquivos estáticos do build.

- **Dados não aparecem no painel**  
  Verifique se as variáveis do Supabase no `.env` apontam para o mesmo projeto onde você rodou o `run-all-marketing.sql`.
