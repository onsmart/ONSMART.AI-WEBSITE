# Deploy e login da Área de Marketing (404 no deploy)

Se o login da **Área de Marketing** retorna **404** ou a mensagem *"Unexpected token 'T', 'The page c'... is not valid JSON"* em produção, as requisições para `/api/trpc/*` **não estão chegando ao servidor Node** que contém a API.

## O que precisa estar no ar

1. **Frontend (SPA)** – pasta `dist/` (gerada por `npm run build`).
2. **Backend (Node)** – o arquivo `server.js` deve estar rodando e atendendo as rotas `/api/*` (incluindo `/api/trpc`).

Ou seja: em produção não basta servir só os arquivos estáticos. O **mesmo domínio** (ou o que recebe as chamadas do front) precisa ter o **Node rodando** e respondendo em `/api/trpc`.

## Como conferir no deploy

1. **Health da API**  
   Abra no navegador:
   - `https://SEU_DOMINIO/api/health`  
   Se a resposta for **JSON** com `"status":"OK"` e `"trpcLoaded":true`, o Node está no ar e o tRPC está carregado.  
   Se der 404 ou uma **página HTML** (ex.: “The page could not be found”), as requisições `/api/*` **não** estão indo para o Node.

2. **Resposta em JSON**  
   O servidor deste projeto sempre responde em **JSON** em rotas `/api/*`.  
   Se você vê HTML (por exemplo texto começando com “The page c...”), quem está respondendo é **outro** servidor (hospedagem estática, proxy ou outra aplicação).

## Ajustes comuns no deploy

### 1. Build e start

No servidor de produção, o processo deve:

- Rodar **build do front e do server**:
  - `npm run build`        → gera `dist/`
  - `npm run build:server`  → gera `dist-server/`
- Subir o app Node:
  - `node server.js`  
  ou usar o script que já faz isso:
  - `npm start` (ele roda `build` + `build:server` e depois `node server.js`).

Se no deploy só rodar `npm run build` e servir a pasta `dist/`, a API **não** existirá e `/api/trpc` dará 404.

### 2. Proxy reverso (Nginx, Apache, etc.)

Se há um proxy na frente do Node:

- As requisições para **`/api/*`** (e em especial **`/api/trpc`** e **`/api/trpc/*`**) precisam ser **encaminhadas para o processo Node** (por exemplo `http://127.0.0.1:3001` ou a porta que o `server.js` usa).
- O proxy não deve devolver 404 para `/api/*`; ele deve repassar para o Node.

### 3. Deploy na Vercel (plano gratuito / serverless)

O projeto **tem backend** (login do marketing, tRPC, envio de e-mail, etc.), mas na Vercel você **não** sobe um servidor Node contínuo: a Vercel usa apenas **frontend estático** e **serverless functions**.

Para o login do marketing funcionar na Vercel, o tRPC foi adaptado para rodar como **Serverless Function**:

- **Arquivo:** `api/trpc/[[...trpc]].js`  
  Essa função atende todas as requisições para `/api/trpc/*` (incluindo `marketing.auth.login`).

**O que fazer no projeto Vercel:**

1. **Build**
   - No painel da Vercel: **Settings → General → Build & Development Settings**.
   - Em **Build Command** use (qualquer uma das duas):
     - `npm run build:vercel` **ou**
     - `npm run build && npm run build:server`
   - Se aparecer *Missing script: "build:vercel"*, use a segunda opção (não depende do script no package.json).
   - Assim o deploy gera `dist/` (front) e `dist-server/` (usado pela função tRPC).

2. **Variáveis de ambiente**
   - Configure no painel da Vercel as mesmas variáveis que o backend usa (ex.: no `.env` local):
     - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (marketing + storage)
     - `RESEND_API_KEY`, `RESEND_SENDER_EMAIL` (e-mail)
     - Outras que você usa (OpenAI, etc.).
   - Sem isso, a função tRPC pode falhar (login, conteúdo, envio de PDF, etc.).

3. **Output**
   - **Output Directory** = `dist` (Vite).
   - Não é necessário configurar “start” ou “run”: a Vercel serve o estático e invoca as funções em `api/` automaticamente.

Depois do deploy, teste:

- `https://SEU_DOMINIO/api/trpc/marketing.public.list` (GET com query) ou o login em **Área de Marketing**.  
Se der 503 com mensagem “Backend não disponível” / “TRPC_NOT_LOADED”, o build não gerou `dist-server` ou a Build Command não está usando `npm run build:vercel`.

### 4. Outras hospedagens só estáticas (Netlify, etc.)

- **Opção A:** Usar um plano/serviço que rode **Node** e usar `npm start` (ou `node server.js`).
- **Opção B:** Manter o front na hospedagem estática e colocar o backend em **outro serviço** (outro domínio ou subdomínio) que rode Node. Aí é preciso:
  - Configurar a variável **`VITE_API_URL`** no build do frontend com a URL base desse backend (ex.: `https://api.onsmart.ai`).
  - No `src/trpc.ts`, `getBaseUrl()` usa `import.meta.env.VITE_API_URL` no SSR/build, então o cliente deve chamar esse backend. Garanta que o build do front use essa env.

### 5. Variável de ambiente no build (front em um host, API em outro)

Se a API fica em outro domínio:

- No **build** do frontend, defina por exemplo:
  - `VITE_API_URL=https://api.onsmart.ai`
- Assim o cliente tRPC usa essa base e as chamadas vão para o servidor Node correto.

## Resumo

- **404 ou HTML em `/api/trpc`** = requisição não está chegando ao Node que roda `server.js`.
- **Solução:** garantir que o deploy rode **Node** com `server.js`, que o build inclua **`npm run build:server`** e que **toda** rota **`/api/*`** seja atendida por esse processo (ou por um proxy que encaminhe para ele).
- Use **`GET /api/health`** para validar se o Node e o tRPC estão respondendo no domínio em que você faz o login.
