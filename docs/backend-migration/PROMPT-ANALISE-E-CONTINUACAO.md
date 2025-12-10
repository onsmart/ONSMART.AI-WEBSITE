# PROMPT: Análise e Continuação da Implementação do Backend

Use este prompt no outro projeto para entender o estado atual e continuar a implementação do backend da Sonia.

---

## CONTEXTO DO PROJETO

Estou implementando a migração do backend da Sonia de Vercel Serverless Functions para um **repositório backend standalone** rodando no servidor via Docker. O frontend permanece na Vercel e se comunica com o backend via HTTPS.

**Arquitetura:**
- **Frontend:** React/TypeScript na Vercel (onsmart.ai)
- **Backend:** Node.js/Express no servidor via Docker (api.onsmart.ai)
- **Comunicação:** Frontend → Backend via HTTPS

---

## INSTRUÇÕES PARA ANÁLISE

**Primeiro, analise o estado atual do projeto:**

1. **Verifique a estrutura de pastas existente:**
   - Existe a pasta `src/` com subpastas `routes/`, `services/`, `models/`, `middleware/`, `config/`?
   - Existe `src/app.js`?
   - Existe `Dockerfile` e `docker-compose.yml`?
   - Existe `package.json` configurado?

2. **Verifique arquivos base criados:**
   - `package.json` - está configurado com ES Modules (`"type": "module"`)?
   - `.gitignore` - está configurado corretamente?
   - `.env.example` - existe e tem todas as variáveis necessárias?
   - `Dockerfile` - está criado e configurado?
   - `docker-compose.yml` - está criado e configurado?

3. **Verifique código migrado:**
   - Existe `src/services/sonia.service.js`? (migrado de `soniaService.js`)
   - Existe `src/services/evolution.service.js`? (migrado de `evolutionApi.js`)
   - Existe `src/routes/webhook.routes.js`? (migrado de `webhook.js`)
   - Existe `src/routes/sonia.routes.js`?
   - Existe `src/routes/health.routes.js`?

4. **Verifique configurações:**
   - Existe `src/config/database.js`? (PostgreSQL)
   - Existe `src/config/redis.js`? (Redis)
   - Existe `src/app.js` com Express configurado?

5. **Verifique modelos de dados:**
   - Existe `src/models/Conversation.js`?
   - Existe `src/models/Message.js`?
   - Existe schema PostgreSQL criado?

---

## O QUE DEVE SER FEITO (Baseado no Guia)

### ✅ PASSO 1: Criar Novo Repositório Git
- [ ] Repositório Git criado (`sonia-backend` ou `onsmart-backend-api`)
- [ ] Repositório clonado localmente
- [ ] Branch `main` criada

### ✅ PASSO 2: Estrutura Inicial do Projeto
- [ ] Estrutura de pastas criada:
  ```
  sonia-backend/
  ├── src/
  │   ├── routes/
  │   ├── services/
  │   ├── models/
  │   ├── middleware/
  │   ├── config/
  │   └── app.js
  ├── docker/
  │   └── nginx/
  ├── logs/
  ├── .gitignore
  ├── .env.example
  ├── Dockerfile
  ├── docker-compose.yml
  ├── package.json
  └── README.md
  ```

### ✅ PASSO 3: Arquivos Base
- [ ] `package.json` criado com:
  - `"type": "module"` (ES Modules)
  - Dependências: express, cors, dotenv, pg, redis
  - Scripts: start, dev
  - Engines: node >=20.0.0
- [ ] `.gitignore` configurado
- [ ] `.env.example` criado com todas as variáveis
- [ ] `Dockerfile` criado (Node.js 20-alpine)
- [ ] `docker-compose.yml` criado

### ⏳ PASSO 4: Migrar Código do ONSMART-WEBSITE
**Arquivos a migrar:**
- [ ] `api/services/soniaService.js` → `src/services/sonia.service.js`
- [ ] `api/services/soniaBrain.js` → Integrar em `src/services/sonia.service.js`
- [ ] `api/services/evolutionApi.js` → `src/services/evolution.service.js`
- [ ] `api/whatsapp/webhook.js` → `src/routes/webhook.routes.js`

**Adaptações necessárias:**
- [ ] Converter para ES Modules (import/export)
- [ ] Ajustar imports para estrutura do novo projeto
- [ ] Adicionar tratamento de erros adequado
- [ ] Integrar com PostgreSQL (substituir Map em memória)
- [ ] Adicionar logs estruturados

### ⏳ PASSO 5: Criar Arquivos Base do Backend
- [ ] `src/app.js` criado com:
  - Express configurado
  - Middleware (CORS, JSON parser, error handling)
  - Rotas: `/sonia`, `/webhook`, `/health`
- [ ] `src/routes/health.routes.js` criado
- [ ] `src/routes/sonia.routes.js` criado com endpoints:
  - POST `/sonia/message`
  - GET `/sonia/conversation/:userId`
  - DELETE `/sonia/conversation/:userId`
- [ ] `src/routes/webhook.routes.js` criado com:
  - POST `/webhook/whatsapp`

### ⏳ PASSO 6: Configurar Conexões
- [ ] `src/config/database.js` criado (PostgreSQL Pool)
- [ ] `src/config/redis.js` criado (Redis Client)
- [ ] Testar conexões

### ⏳ PASSO 7: Modelos de Dados
- [ ] Schema PostgreSQL `sonia_backend` criado
- [ ] Tabela `conversations` criada
- [ ] Tabela `messages` criada
- [ ] `src/models/Conversation.js` criado
- [ ] `src/models/Message.js` criado

### ⏳ PASSO 8: Testar Localmente
- [ ] Testar com Docker Compose: `docker-compose up --build`
- [ ] Testar health check: `curl http://localhost:3001/health`
- [ ] Testar endpoints de mensagem
- [ ] Testar webhook WhatsApp

---

## TAREFA ESPECÍFICA

**Com base na análise do estado atual do projeto:**

1. **Identifique o que JÁ FOI FEITO:**
   - Liste todos os arquivos que já existem
   - Liste todas as funcionalidades já implementadas
   - Liste todas as configurações já feitas

2. **Identifique o que FALTA FAZER:**
   - Liste os passos do guia que ainda não foram completados
   - Liste os arquivos que precisam ser criados
   - Liste as funcionalidades que precisam ser implementadas

3. **Continue a implementação:**
   - Implemente os próximos passos do guia
   - Adapte o código migrado para a nova estrutura
   - Garanta que tudo está funcionando corretamente
   - Teste cada funcionalidade implementada

4. **Documente o progresso:**
   - Atualize este checklist marcando o que foi feito
   - Documente qualquer problema encontrado
   - Documente decisões técnicas tomadas

---

## ESTRUTURA ESPERADA DO CÓDIGO

### src/app.js
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import soniaRoutes from './routes/sonia.routes.js';
import webhookRoutes from './routes/webhook.routes.js';
import healthRoutes from './routes/health.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://onsmart.ai'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/sonia', soniaRoutes);
app.use('/webhook', webhookRoutes);
app.use('/health', healthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend Sonia running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

### Variáveis de Ambiente Necessárias (.env.example)
```env
# Server
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@postgres:5432/sonia_db
DATABASE_HOST=192.168.15.31
DATABASE_PORT=5432
DATABASE_DATABASE=sonia_db
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

# Redis
REDIS_URL=redis://redis:6379
REDIS_HOST=redis
REDIS_PORT=6379

# OpenAI
OPENAI_API_KEY=<OPENAI_API_KEY_REMOVED>
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7

# Evolution API
EVOLUTION_API_BASE_URL=https://evolution.onsmart.ai
EVOLUTION_API_APIKEY=LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs=
EVOLUTION_API_INSTANCE_ID=sonia-whatsapp-v3

# Calendly
CALENDLY_URL=https://calendly.com/ricardo-palomar-onsmartai/30min/

# ElevenLabs (opcional)
ELEVENLABS_AGENT_ID=agent_3101k6n2s7qhebtbrpdpheng869h

# CORS
ALLOWED_ORIGINS=https://onsmart.ai
```

---

## NOTAS IMPORTANTES

- **ES Modules:** Todo o código deve usar `import/export`, não `require/module.exports`
- **PostgreSQL:** Substituir Map em memória por PostgreSQL para histórico de conversas
- **Redis:** Usar para cache de respostas frequentes
- **Error Handling:** Adicionar tratamento de erros adequado em todos os endpoints
- **Logs:** Adicionar logs estruturados para debugging
- **Testes:** Testar cada funcionalidade antes de prosseguir

---

## PRÓXIMOS PASSOS APÓS IMPLEMENTAÇÃO

1. Testar localmente com Docker
2. Configurar deploy no servidor
3. Configurar DNS (api.onsmart.ai)
4. Configurar SSL/TLS
5. Configurar Nginx como reverse proxy
6. Integrar com frontend na Vercel

---

**Use este prompt para analisar o estado atual e continuar a implementação do backend.**

