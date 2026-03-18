# 🚀 Onsmart.AI – Site Oficial

Site institucional e comercial da **Onsmart.AI** — React, TypeScript, Vite e backend Node (tRPC + Express). Inclui área de marketing com login, CRUD de conteúdos, chat com a assistente Sonia (texto e voz), diagnóstico de IA e integrações (Supabase, Resend, ElevenLabs, WhatsApp).

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e execução](#-instalação-e-execução)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Scripts disponíveis](#-scripts-disponíveis)
- [Documentação](#-documentação)
- [Deploy](#-deploy)
- [Boas práticas e versionamento](#-boas-práticas-e-versionamento)

---

## 🛠 Tecnologias

| Camada | Stack |
|--------|--------|
| **Frontend** | React 18, TypeScript, Vite 4, React Router 6, Tailwind CSS, Radix UI, i18next (pt/en/es) |
| **Estado & API** | TanStack React Query, tRPC 11, Supabase (client) |
| **Backend** | Node.js, Express, tRPC (server), tRPC Serverless (Vercel) |
| **Auth (marketing)** | JWT (jose), cookies HttpOnly, bcryptjs |
| **Banco** | Supabase (PostgreSQL + Storage) |
| **E-mail** | Resend; opcional: Mailchimp, HubSpot |
| **Outros** | ElevenLabs (voz), DOMPurify, Service Worker (PWA), Lighthouse |

---

## 📁 Estrutura do projeto

```
├── api/                    # Serverless functions (Vercel)
│   ├── trpc/               # Handler tRPC (marketing)
│   ├── openai-proxy.js     # Proxy da API OpenAI
│   ├── elevenlabs-widget.js
│   ├── whatsapp/           # Webhooks WhatsApp
│   └── services/           # Sonia, Evolution API
├── public/                 # Assets estáticos e Service Worker
├── server/                 # Backend Express + tRPC (TypeScript)
│   ├── marketing/          # Auth, router, storage, sanitize
│   └── _core/              # Contexto tRPC
├── src/
│   ├── components/         # UI, páginas, blog, contato, marketing
│   ├── contexts/           # MarketingAuthContext
│   ├── hooks/              # Service Worker, CSP, prefetch
│   ├── locales/            # i18n (pt, en, es)
│   ├── pages/              # Rotas (Index, Contato, Blog, etc.)
│   ├── lib/                # OpenAI, ElevenLabs, prompts
│   ├── utils/              # analytics, sanitizeHtml
│   └── App.tsx, main.tsx
├── docs/                   # Documentação técnica
├── supabase/               # Migrations e scripts SQL
├── server.js               # Entrada do servidor Express
├── vite.config.ts
├── vercel.json             # Rewrites e headers (Vercel)
└── env.marketing.example   # Template de variáveis (marketing)
```

---

## ✅ Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** 9+
- Conta **Supabase** (banco e storage para a área de marketing)
- Conta **Vercel** (deploy; opcional para dev local)

---

## 🏃 Instalação e execução

### 1. Clonar e instalar dependências

```bash
git clone https://github.com/onsmart/onsmart-website.git
cd onsmart-website
npm install
```

### 2. Variáveis de ambiente

Copie o exemplo da área de marketing e preencha no `.env`:

```bash
cp env.marketing.example .env
# Edite .env com JWT_SECRET, SUPABASE_*, RESEND_*, etc.
```

Veja a seção [Variáveis de ambiente](#-variáveis-de-ambiente) e o arquivo [docs/COMO-INICIAR.md](docs/COMO-INICIAR.md) para o passo a passo completo (Supabase, migrações, seed).

### 3. Rodar em desenvolvimento

| Comando | Descrição |
|--------|-----------|
| **`npm run dev`** | Apenas frontend (Vite) em `http://localhost:3000`. APIs devem estar em outra porta (ex.: server na 3001). |
| **`npm run server`** | Apenas backend Express (servindo `dist/` e rotas `/api/*`). Requer `npm run build` antes para ter o front. |
| **`npm run dev:one`** | **Recomendado:** build do server + Vite e Express em paralelo. Front em `http://localhost:3000` (ou 3002 se 3000/3001 estiverem em uso), API em `http://localhost:3001`. |

Se a porta 3001 estiver em uso, o servidor tenta 3003, 3004 ou 3005 e exibe um aviso no console.

### 4. Build para produção

```bash
npm run build          # Frontend → dist/
npm run build:server   # Backend TS → dist-server/
# Ou de uma vez:
npm run build:vercel   # build + build:server
```

### 5. Preview local da build

```bash
npm run build && npm run build:server
npm run server
# Acesse http://localhost:3001
```

---

## 🔐 Variáveis de ambiente

Principais variáveis (detalhes em [env.marketing.example](env.marketing.example) e [MARKETING_README.md](MARKETING_README.md)):

| Variável | Obrigatória | Uso |
|----------|-------------|-----|
| `JWT_SECRET` | Sim (marketing) | Assinatura dos tokens de login |
| `SUPABASE_URL` | Sim (marketing) | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim (marketing) | Acesso server-side ao Supabase |
| `RESEND_API_KEY` | Sim (marketing) | Envio de e-mails (Resend) |
| `RESEND_SENDER_EMAIL` | Sim (marketing) | Remetente dos e-mails |
| `OPENAI_API_KEY` | Para chat Sonia | Chave da API OpenAI (usada no proxy) |
| `VITE_*` | Conforme necessidade | Variáveis expostas ao frontend (ex.: `VITE_SUPABASE_ANON_KEY`, `VITE_CALENDLY_URL`) |

Para a área de marketing, seed automático e backfill, veja [MARKETING_README.md](MARKETING_README.md).

---

## 📜 Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Sobe o Vite (frontend) |
| `npm run server` | Sobe o Express (backend) |
| `npm run dev:one` | Build do server + Vite e Express em paralelo |
| `npm run build` | Build do frontend (Vite) |
| `npm run build:server` | Compila o backend TypeScript |
| `npm run build:vercel` | `build` + `build:server` (para deploy Vercel) |
| `npm run start` | Build completo + sobe o servidor (produção) |
| `npm run preview` | Preview da build do Vite |
| `npm run lint` | ESLint no projeto |
| `npm run seed:marketing` | Cria/atualiza usuário inicial da área de marketing |
| `npm run lighthouse` | Lighthouse em https://onsmart.ai (relatório em `lighthouse-report.html`) |
| `npm run lighthouse:view` | Lighthouse e abre o relatório no navegador |
| `npm run test:site` | Testes do site |
| `npm run test:services` | Testes dos serviços (Supabase, Resend, etc.) |

---

## 📚 Documentação

| Documento | Conteúdo |
|-----------|----------|
| [docs/COMO-INICIAR.md](docs/COMO-INICIAR.md) | Passo a passo para desenvolvimento local (env, Supabase, rodar front e backend) |
| [DEPLOY.md](DEPLOY.md) | Deploy, health da API, Vercel (build, variáveis, serverless tRPC) |
| [MARKETING_README.md](MARKETING_README.md) | Área de marketing: stack, rotas, configuração, seed, backfill, envio de e-mail |
| [env.marketing.example](env.marketing.example) | Template de variáveis para marketing |
| [docs/GUIA-COMPLETO-BACKEND.md](docs/GUIA-COMPLETO-BACKEND.md) | Visão geral do backend e integrações |
| [docs/backend-migration/](docs/backend-migration/) | Migração e checklist do backend |
| [docs/COMANDOS-CLOUDFLARE-TUNNEL.md](docs/COMANDOS-CLOUDFLARE-TUNNEL.md) | Comandos para tunnel (ex.: WhatsApp) |

---

## 🌐 Deploy

- **Produção:** Site oficial em **https://onsmart.ai**, deploy contínuo via **GitHub + Vercel**.
- **Build na Vercel:** use `npm run build:vercel` (ou `npm run build && npm run build:server`). O **Output Directory** deve ser `dist`. As rotas `/api/*` são atendidas pelas serverless functions em `api/`.
- **Variáveis:** configure no painel da Vercel todas as env necessárias (JWT, Supabase, Resend, OpenAI, etc.). Veja [DEPLOY.md](DEPLOY.md).
- **Rollback:** na Vercel → projeto → Deploys → escolher a versão e **Redeploy**.

Conta e time: **[Vercel – onsmart](https://vercel.com/onsmart)**.

---

## 🔸 Boas práticas e versionamento

- Use **branches** por feature (`feature/nome-da-feature`) e integre via **Pull Requests** na `main`.
- Commits claros e descritivos (ex.: `fix: corrigir carregamento de imagens na home`).
- Evite push direto na `main` sem revisão.
- Antes do deploy, rode localmente `npm run build` e `npm run dev` (ou `npm run dev:one`) para validar.

### Configuração Git (recomendada para o time)

```bash
git config --global user.name onsmart-admin
git config --global user.email maicon.nunes@onsmart.com.br
```

---

## 📄 Licença

Projeto privado – Onsmart.AI / On Smart Tech.
