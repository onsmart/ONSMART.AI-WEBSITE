# Prompt 1: Problemas e contexto (use para gerar o Prompt 2 com soluções)

## Objetivo

Preciso que **tudo** no projeto seja funcional via **serverless** na Vercel. Já existe outro projeto com a mesma área `/marketing` e **100% de aproveitamento via serverless**, funcionando normal; este projeto deve ficar alinhado a esse comportamento.

A partir deste texto, gere um **segundo prompt** (Prompt 2) que eu possa enviar depois, contendo **as respostas e soluções** para os problemas abaixo. O Prompt 2 deve ser redigido de forma que, ao ser usado (por um assistente ou por mim), permita **aplicar as correções diretamente no código** — ou seja, deve descrever de forma clara e acionável o que fazer em cada ponto.

---

## Contexto técnico do projeto

- **Frontend:** React (Vite), React Router, tRPC React Client, TanStack Query.
- **Backend em produção:** apenas **Vercel Serverless Functions** (pasta `api/`). Não há servidor Node/Express rodando na Vercel.
- **Backend local:** Express em `server.js` (roda com `npm run dev:one`); monta tRPC em `/api/trpc`, rotas REST em `/api/*`, e serve o build estático.
- **Área de marketing:** rotas sob `/marketing/*` (login, dashboard, edição de conteúdo). Autenticação via tRPC (`marketing.auth.login`, `marketing.auth.me`), cookies httpOnly (`marketing_access`, `marketing_refresh`), JWT (jose), Supabase para usuários.
- **tRPC na Vercel:** handler em `api/trpc/[...trpc].js` que importa o middleware do `dist-server` e normaliza `req.url` / `req.path` para o adapter Express do tRPC.

---

## Problema 1: Funcionalidade apenas no Express (não serverless)

Na Vercel, **não** existem serverless functions para:

1. **Rotas Docker** (em `server.js`):
   - `GET /api/docker/status`
   - `GET /api/docker/containers`
   - `GET /api/docker/system`
   - `GET /api/docker/ollama`
   - `POST /api/docker/containers/:containerName/:action` (start/stop/restart)
   - `GET /api/docker/containers/:containerName/logs`  
   Essas rotas dependem de `child_process` e Docker no host; na Vercel não há Docker. O frontend chama `/api/docker/*` em produção (ex.: `dockerMonitoringService`), resultando em **404**. O serviço já trata erro e retorna `false`/`[]`, então a UI não quebra, mas a experiência é “Docker indisponível” ou chamadas falhando.

2. **Health check:**
   - `GET /health`
   - `GET /api/health`  
   Existem só no Express. Na Vercel não há endpoint de health para monitoramento/uptime.

**Pergunta para o Prompt 2:** Como deixar tudo “funcional via serverless” nesses pontos? Por exemplo: criar stubs em `api/` que respondam JSON (ex.: Docker não disponível neste ambiente; health 200 OK) e garantir que o frontend não dependa de comportamento que só existe no Express. Incluir no Prompt 2 os arquivos/códigos exatos a criar ou alterar (paths e trechos relevantes).

---

## Problema 2: Login na área de marketing — ter que logar duas vezes

Na área `/marketing`, o usuário **precisa fazer login duas vezes** para conseguir entrar. Após o primeiro login bem-sucedido, em algum momento ainda é redirecionado de volta para a tela de login e precisa autenticar de novo.

**Fluxo atual resumido:**

- `MarketingAuthProvider` envolve as rotas em `MarketingApp.tsx`.
- Na montagem, roda `trpc.marketing.auth.me.useQuery(undefined, { retry: false, staleTime: 60_000 })`.
- Se `user` for null (não autenticado), `MarketingProtectedRoute` redireciona para `/marketing/login?redirect=...` via `window.location.href`.
- Na página de login, ao submeter o formulário: chama `login(email, password)` (mutation tRPC `marketing.auth.login`), que no servidor define cookies httpOnly (`marketing_access`, `marketing_refresh`). Em seguida há `setData(undefined, data.user)` no cliente e um delay de 600 ms, depois `window.location.assign(redirect)` para forçar reload e “gravar” os cookies antes de carregar `/marketing`.
- Após o reload, a árvore monta de novo, `auth.me` roda novamente (com `credentials: 'include'` no cliente tRPC).

**Hipóteses para o “duas vezes”:**

- Cookies não estarem sendo enviados no primeiro request após o redirect (SameSite, Secure, Domain no Set-Cookie no ambiente Vercel).
- `auth.me` ser chamado antes dos cookies estarem disponíveis no navegador após o redirect, resultando em 401 e novo redirect para login.
- Race entre múltiplos consumidores de `user` (ex.: `MarketingProtectedRoute` e outro componente) fazendo uma decisão de “não logado” antes do cache do React Query / cookies estarem atualizados.
- Algo no handler serverless do tRPC ou no adapter (ex.: leitura de `req.headers.cookie`) não recebendo o cookie na primeira requisição após o login.

**Pergunta para o Prompt 2:** Incluir no Prompt 2 um diagnóstico claro e as alterações concretas (front e/ou back) para que **um único login** seja suficiente. Se no outro projeto com 100% serverless o login funciona com um único passo, descrever o que deve ser replicado ou ajustado (cookies, redirect, uso de `setData`/invalidate, ou troca de `window.location` por navegação SPA, etc.) para este projeto.

---

## O que já está em serverless (referência)

Para não duplicar trabalho no Prompt 2, o que **já** está coberto por funções na pasta `api/`:

- `api/trpc/[...trpc].js` — tRPC (marketing auth + content).
- `api/openai-proxy.js` — proxy OpenAI (chat).
- `api/openai-format-html.js` — formatação de texto em HTML com IA.
- `api/elevenlabs-widget.js` e `api/elevenlabs/webhook.js`.
- `api/whatsapp/webhook.js` e `api/whatsapp/webhook/connection-update.js`.
- `api/calendly-polling.js`.
- `api/services/soniaBrain.js`, `api/services/soniaService.js`, `api/services/evolutionApi.js`.

---

## Formato esperado do Prompt 2

O segundo prompt (gerado a partir deste) deve:

1. Ser **autocontido**: quem for executar não precisa reler este documento para aplicar as mudanças.
2. Listar **cada problema** (Docker/health; login duas vezes) e, para cada um:
   - **Causa** (resumida).
   - **Solução** (o que fazer).
   - **Arquivos a criar/alterar** (paths e, se possível, trechos ou instruções passo a passo).
3. Incluir **ajustes de cookies/redirect** necessários para o login único (e, se aplicável, referência ao que o outro projeto faz).
4. Ser redigido como **instruções para um assistente de código** aplicar as alterações no repositório (ex.: “Criar arquivo `api/health.js` com …”, “Em `MarketingLogin.tsx`, alterar … para …”).

Gere, então, o **Prompt 2** com as respostas e soluções, pronto para ser colado e usado em uma próxima etapa.
