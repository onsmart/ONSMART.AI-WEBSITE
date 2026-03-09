# Área de Marketing

Área em `/marketing` com login próprio (JWT + cookies httpOnly), painel protegido e CRUD de conteúdos (blog/artigos, ferramentas, materiais gratuitos), com upload de PDF/imagem e envio de material por e-mail (Resend).

## Stack

- **Frontend:** React + TypeScript, React Router, tRPC (React Query), credenciais para cookies
- **Backend:** Express, tRPC (Express adapter), `marketingProcedure` para rotas protegidas
- **Auth:** JWT (jose), cookies `marketing_access` e `marketing_refresh`, bcryptjs
- **Banco:** Supabase (Postgres) – tabelas `marketing_users` e `marketing_contents` (service role só no backend)
- **Storage:** Supabase Storage – buckets `marketing-pdfs` e `marketing-images`
- **E-mail:** Resend (envio com link do PDF); opcional: Mailchimp/HubSpot

## Tipos de conteúdo

Apenas: `blog_artigos` | `ferramentas` | `materiais_gratuitos` (sem cases).

## Rotas

- `/marketing/login` – login (e-mail + senha)
- `/marketing` – painel (protegido): abas Blog/Artigos, Ferramentas, Materiais Gratuitos
- `/marketing/content/new?type=...` – novo conteúdo
- `/marketing/content/:id` – editar conteúdo

## Configuração

1. **Variáveis de ambiente** (copie de `env.marketing.example` para `.env`):
   - Obrigatórias: `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_SENDER_EMAIL`
   - Opcionais: `MARKETING_JWT_TTL_MINUTES`, `MARKETING_REFRESH_TTL_DAYS`, `MARKETING_BACKFILL_FROM_SITE`

2. **Supabase**
   - Rodar a migração em `supabase/migrations/20260101000000_marketing.sql`
   - Criar buckets no Storage: `marketing-pdfs` (privado) e `marketing-images` (público)

3. **Build do server e primeiro usuário**
   - Opção A (automática ao subir o app): no `.env` defina `MARKETING_SEED_ON_STARTUP=true`, `MARKETING_SEED_EMAIL` e `MARKETING_SEED_PASSWORD`. Ao rodar `npm run dev:full` (ou `npm run server`), o seed roda na subida e o usuário fica disponível para login.
   - Opção B (manual, uma vez): `npm run build:server` e depois `MARKETING_SEED_EMAIL=... MARKETING_SEED_PASSWORD=... npm run seed:marketing`.

4. **Subir o app**
   - Dev: `npm run dev` (frontend) e `npm run server` (backend). O proxy do Vite envia `/api` para o server.
   - Produção: `npm run build && npm run build:server && npm start`

## Conteúdos existentes (backfill)

Com `MARKETING_BACKFILL_FROM_SITE=true`, ao iniciar o server é executado o backfill dos artigos estáticos (lista em `server/marketing/backfill.ts`) para `marketing_contents`. Esses itens passam a aparecer no painel para edição.

## Leitura pública (site)

Os procedures públicos são:

- `trpc.marketing.public.list` – lista apenas publicados (filtro opcional por tipo, paginação)
- `trpc.marketing.public.getBySlug` – um item por slug (publicado); se tiver PDF, retorna `pdfSignedUrl`

Para a camada pública do site passar a ler daqui:

- Trocar as páginas de blog/conteúdo para usar o client tRPC (`trpc.marketing.public.list` e `trpc.marketing.public.getBySlug`) em vez de `blogData`/Sheets.
- Manter fallback para os dados atuais até a migração completa.

## Envio de material por e-mail (leads)

- Procedure público: `marketing.content.sendPdfByEmail` (slug, nome, e-mail, telefone opcional).
- Envia e-mail via Resend com link assinado do PDF.
- Opcional: integrar Mailchimp/HubSpot no mesmo fluxo para sincronizar leads.

## Estrutura de arquivos (principal)

- **Server:** `server/marketing/` (types, db, jwt, storage, sanitize, router, backfill), `server/_core/` (context, trpc), `server/routers.ts`, `server/index.ts`
- **Frontend:** `src/trpc.ts`, `src/contexts/MarketingAuthContext.tsx`, `src/components/marketing/MarketingProtectedRoute.tsx`, `src/pages/marketing/` (MarketingApp, MarketingLogin, MarketingDashboard, MarketingContentEdit)
