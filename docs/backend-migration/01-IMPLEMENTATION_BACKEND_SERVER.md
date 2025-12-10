# IMPLEMENTAÇÃO: Backend da Sonia no Servidor (Docker)

## 1. Análise do Estado Atual do Projeto

### 1.1 Stack Tecnológica Identificada

**Frontend:**
- React 18.3.1 + TypeScript 5.5.3
- Vite 4.5.3 (build tool)
- Tailwind CSS 3.4.11
- React Router DOM 6.26.2
- Hospedado na Vercel (onsmart.ai)

**Backend Atual (Vercel Serverless Functions):**
- Node.js (ES Modules)
- Express 4.18.2 (apenas para server.js local)
- API Routes em `/api/` (serverless functions)
- Serviços em `/api/services/`:
  - `soniaService.js` - Processamento de mensagens da Sonia
  - `evolutionApi.js` - Integração com Evolution API
  - `soniaBrain.js` - Lógica de detecção de idioma e fallback

**Estrutura de Pastas Atual:**
```
ONSMART-WEBSITE/              # Repositório atual (frontend)
├── api/                      # Vercel Serverless Functions
│   ├── openai-proxy.js
│   ├── whatsapp/webhook.js
│   ├── services/
│   │   ├── soniaService.js
│   │   ├── evolutionApi.js
│   │   └── soniaBrain.js
│   └── ...
├── src/                      # Frontend React
│   ├── components/chat/
│   ├── lib/openaiService.ts
│   └── ...
├── server.js                 # Servidor Express local (dev)
└── vercel.json              # Config Vercel
```

### 1.2 Variáveis de Ambiente Identificadas

**Frontend (VITE_*):**
- `VITE_OPENAI_API_URL` - URL do proxy OpenAI
- `VITE_OPENAI_MODEL` - Modelo GPT
- `VITE_CALENDLY_URL` - Link Calendly
- `VITE_ELEVENLABS_AGENT_ID` - Agent ID ElevenLabs

**Backend (process.env):**
- `OPENAI_API_KEY` - Chave API OpenAI
- `OPENAI_MODEL` - Modelo GPT
- `OPENAI_TEMPERATURE` - Temperatura do modelo
- `CALENDLY_URL` - Link Calendly
- `ELEVENLABS_AGENT_ID` - Agent ID ElevenLabs
- `EVOLUTION_API_BASE_URL` - URL da Evolution API
- `EVOLUTION_API_APIKEY` - Chave Evolution API
- `EVOLUTION_API_INSTANCE_ID` - ID da instância

### 1.3 Serviços Docker Existentes no Servidor

- **PostgreSQL** - Banco de dados (já configurado)
- **Redis** - Cache/sessões
- **Evolution API** - Gateway WhatsApp (via Cloudflare Tunnel)

### 1.4 Infraestrutura Existente

- **Nginx** - Reverse proxy já configurado
- **Cloudflare Tunnel** - Túnel permanente para Evolution API
- **Domínio**: onsmart.ai (produção na Vercel)

### 1.5 Portas e Conflitos Potenciais

**Portas já utilizadas (verificar no servidor):**
- PostgreSQL: 5432 (padrão)
- Redis: 6379 (padrão)
- Evolution API: 8080 (via Cloudflare Tunnel)
- Nginx: 80, 443

**Portas sugeridas para novo backend:**
- Backend API: 3001 (interno, não exposto)
- Health check: 3002 (opcional)

## 2. Objetivo da Nova Arquitetura

### 2.1 Visão Geral

**IMPORTANTE:** O backend será um **repositório/projeto completamente separado** do frontend, pois o Vercel é "front-first" e não lida bem com backends complexos. O projeto atual (ONSMART-WEBSITE) permanece na Vercel apenas como frontend puro.

**Estrutura de Repositórios:**
- **ONSMART-WEBSITE** (repositório atual) - Frontend React na Vercel
- **sonia-backend** (NOVO repositório) - Backend standalone no servidor

Migrar o backend da Sonia de Vercel Serverless Functions para um **novo repositório backend standalone** rodando no servidor da empresa via Docker, mantendo o frontend na Vercel e garantindo comunicação segura entre os dois.

### 2.2 Componentes da Arquitetura

**Frontend (Vercel - onsmart.ai) - Repositório: ONSMART-WEBSITE:**
- Site oficial, dashboard, webchat
- **Apenas frontend React** - sem backend
- Remove todas as Serverless Functions relacionadas à Sonia
- Comunica-se com backend no servidor via HTTPS
- Mantém apenas rotas estáticas e outras funcionalidades não relacionadas à Sonia

**Backend (Servidor da Empresa - api.onsmart.ai) - NOVO REPOSITÓRIO: sonia-backend:**
- **Novo repositório Git:** `sonia-backend` ou `onsmart-backend-api`
- **Desenvolvimento:** Local (máquina do desenvolvedor)
- **Deploy:** Servidor da empresa via Docker
- API REST standalone em Node.js/Express
- Container Docker isolado
- Responsável por:
  - Processar mensagens da Sonia (WebChat, VoiceChat, WhatsApp)
  - Gerenciar histórico de conversas (PostgreSQL)
  - Integrar com OpenAI API
  - Integrar com Evolution API (WhatsApp)
  - Integrar com CRM (futuro: HubSpot)
  - Expor endpoints HTTP/HTTPS

### 2.3 Fluxo de Requisições

```
Usuário → Site (Vercel - onsmart.ai)
           ↓
         Frontend React (ONSMART-WEBSITE)
           ↓
         POST https://api.onsmart.ai/sonia/message
           ↓
         Nginx (servidor)
           ↓
         Backend Container (Docker - porta 3001)
           ↓
         Serviços Internos:
           - PostgreSQL (histórico)
           - Redis (cache)
           - OpenAI API (externa)
           - Evolution API (via Cloudflare Tunnel)
```

### 2.4 Estrutura de Repositórios

```
GitHub/Organização:
├── ONSMART-WEBSITE/          # Repositório existente (frontend)
│   ├── src/                  # Frontend React
│   ├── api/                  # Serverless Functions (será limpo)
│   └── ...
│
└── sonia-backend/            # NOVO repositório (backend)
    ├── src/                  # Código fonte do backend
    ├── docker/               # Configurações Docker
    ├── Dockerfile
    ├── docker-compose.yml
    └── ...
```

## 3. Arquitetura-Alvo (Servidor + Docker)

### 3.1 Componentes Docker

**backend-sonia (Novo):**
- Imagem: Node.js 20 LTS (alinhado com versão do projeto)
- Framework: Express 4.18.2 (mesma versão do server.js)
- Porta interna: 3001
- Responsabilidades:
  - API REST para Sonia
  - Processamento de mensagens
  - Gerenciamento de histórico
  - Integrações externas

**db (PostgreSQL - Existente):**
- Reutilizar container existente
- Criar schema específico para Sonia
- Tabelas: conversations, messages, users

**redis (Existente):**
- Reutilizar container existente
- Cache de respostas frequentes
- Sessões de usuário

**reverse-proxy (Nginx - Existente):**
- Configurar novo location para api.onsmart.ai
- Proxy para backend-sonia:3001
- SSL/TLS via Let's Encrypt ou Cloudflare

### 3.2 Estrutura de Pastas do Novo Repositório (sonia-backend)

```
sonia-backend/                # NOVO REPOSITÓRIO
├── src/
│   ├── routes/
│   │   ├── sonia.routes.js
│   │   ├── webhook.routes.js
│   │   └── health.routes.js
│   ├── services/
│   │   ├── sonia.service.js      # Migrado de ONSMART-WEBSITE/api/services/soniaService.js
│   │   ├── openai.service.js
│   │   └── database.service.js
│   ├── models/
│   │   ├── Conversation.js
│   │   └── Message.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── config/
│   │   ├── database.js
│   │   └── redis.js
│   └── app.js
├── docker/
│   ├── docker-compose.yml
│   └── nginx/
│       └── api.onsmart.ai.conf
├── Dockerfile
├── .dockerignore
├── package.json
├── .env.example
└── README.md
```

**IMPORTANTE:** Este repositório será desenvolvido localmente e depois deployado no servidor. O código NÃO fica dentro de ONSMART-WEBSITE.

### 3.3 Compatibilidade com Código Existente

**Reuso de Código:**
- Migrar `ONSMART-WEBSITE/api/services/soniaService.js` → `sonia-backend/src/services/sonia.service.js`
- Migrar `ONSMART-WEBSITE/api/services/soniaBrain.js` → `sonia-backend/src/services/sonia.service.js` (integrar)
- Manter mesma lógica de processamento
- Manter mesmas variáveis de ambiente (quando aplicável)

**Versões:**
- Node.js: 20.x LTS (verificar versão atual do servidor)
- Express: 4.18.2 (mesma do server.js)
- TypeScript: 5.5.3 (se usar TS no backend)
- PostgreSQL driver: pg (latest)

**Convenções:**
- ES Modules (type: "module" no package.json)
- Mesma estrutura de resposta JSON
- Mesmos códigos de status HTTP

## 4. Plano de Deploy no Servidor (Docker + Reverse Proxy)

### 4.1 Pré-requisitos no Servidor

**Sistema Operacional:**
- Ubuntu/Debian (Linux)
- Docker 24.x ou superior
- Docker Compose 2.x ou superior
- Nginx (já instalado)
- Git (para clonar repositório)

**Usuário:**
- Criar usuário não-root: `sonia-backend`
- Adicionar ao grupo docker: `usermod -aG docker sonia-backend`

### 4.2 Processo de Deploy

**Opção 1: Deploy via Git (Recomendado)**
1. Clonar repositório `sonia-backend` no servidor
2. Configurar variáveis de ambiente (.env)
3. Build e start via docker-compose

**Opção 2: Deploy via Docker Registry**
1. Build da imagem localmente
2. Push para Docker Hub/Registry privado
3. Pull e run no servidor

**Estrutura no Servidor:**
```
/opt/sonia-backend/           # Diretório no servidor
├── .env                      # Variáveis de ambiente (não commitado)
├── docker-compose.yml
├── src/                      # Código clonado do repositório
└── logs/                     # Logs do container
```

### 4.3 Estrutura Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend-sonia:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: backend-sonia
    restart: unless-stopped
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - OPENAI_MODEL=${OPENAI_MODEL}
      - EVOLUTION_API_BASE_URL=${EVOLUTION_API_BASE_URL}
      - EVOLUTION_API_APIKEY=${EVOLUTION_API_APIKEY}
      - EVOLUTION_API_INSTANCE_ID=${EVOLUTION_API_INSTANCE_ID}
    networks:
      - sonia-network
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Reutilizar serviços existentes via network externa
  # ou definir aqui se necessário

networks:
  sonia-network:
    driver: bridge
    # Se precisar conectar com containers existentes:
    # external: true
    # name: existing-network-name
```

### 4.4 Configuração Nginx

**docker/nginx/api.onsmart.ai.conf:**
```nginx
server {
    listen 80;
    server_name api.onsmart.ai;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.onsmart.ai;

    # SSL certificates (Let's Encrypt ou Cloudflare)
    ssl_certificate /etc/letsencrypt/live/api.onsmart.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.onsmart.ai/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # CORS (se necessário)
    add_header Access-Control-Allow-Origin "https://onsmart.ai" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;

    # Proxy to backend
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3001/health;
        access_log off;
    }
}
```

### 4.5 DNS e Domínio

**Configuração DNS (Cloudflare ou registrador):**
- Criar registro A ou CNAME: `api.onsmart.ai` → IP do servidor
- Se usar Cloudflare Proxy: ativar proxy (laranja)
- Se não usar proxy: apontar diretamente para IP

**SSL/TLS:**
- Opção 1: Let's Encrypt (Certbot) - recomendado
- Opção 2: Cloudflare SSL (se usar proxy Cloudflare)
- Opção 3: Certificado próprio

### 4.6 Scripts de Deploy

**scripts/deploy.sh (no repositório sonia-backend):**
```bash
#!/bin/bash
# Script de deploy do backend no servidor

cd /opt/sonia-backend

# Pull latest code
git pull origin main

# Build and restart
docker-compose build backend-sonia
docker-compose up -d backend-sonia

# Show logs
docker-compose logs -f backend-sonia
```

## 5. Integração Frontend (Vercel) ↔ Backend (Servidor)

### 5.1 Variáveis de Ambiente no Frontend

**Vercel Environment Variables (Repositório: ONSMART-WEBSITE):**
- Adicionar: `VITE_SONIA_API_URL=https://api.onsmart.ai`
- Manter: `VITE_OPENAI_API_URL` (pode ser removido após migração completa)

**Arquivo: src/lib/apiClient.ts (NOVO no ONSMART-WEBSITE):**
```typescript
const SONIA_API_URL = import.meta.env.VITE_SONIA_API_URL || 'https://api.onsmart.ai';

export const apiClient = {
  sonia: {
    sendMessage: async (message: string, userId: string) => {
      const response = await fetch(`${SONIA_API_URL}/sonia/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, userId })
      });
      return response.json();
    }
  }
};
```

### 5.2 Migração Gradual

**Fase 1: Dual Mode**
- Frontend tenta backend novo primeiro
- Fallback para Vercel Serverless se falhar
- Monitorar logs e erros

**Fase 2: Migração Completa**
- Remover fallback
- Remover código antigo do Vercel (ONSMART-WEBSITE/api/services/soniaService.js)
- Atualizar documentação

### 5.3 Endpoints da API

**POST /sonia/message**
- Recebe: `{ message: string, userId: string, channel?: string, language?: string }`
- Retorna: `{ message: string, conversationId: string }`

**GET /sonia/conversation/:userId**
- Retorna histórico de conversa

**POST /webhook/whatsapp**
- Webhook da Evolution API
- Migrado de `ONSMART-WEBSITE/api/whatsapp/webhook.js`

**GET /health**
- Health check do serviço

## 6. Compatibilidade e Convivência com o Código Existente

### 6.1 Checklist de Verificação

**Antes de implementar:**
- [ ] Verificar portas disponíveis no servidor
- [ ] Verificar se Nginx tem espaço para nova config
- [ ] Verificar se PostgreSQL tem espaço/permissões para novo schema
- [ ] Verificar se Redis está acessível
- [ ] Verificar se Evolution API está acessível via Cloudflare Tunnel
- [ ] Backup do banco de dados existente
- [ ] Documentar endpoints atuais do Vercel
- [ ] Criar novo repositório Git para o backend

### 6.2 Estratégia de Evitar Conflitos

**Nomes de Containers:**
- Usar prefixo: `backend-sonia`
- Não sobrescrever containers existentes

**Portas:**
- Backend: 3001 (interno, não exposto externamente)
- Nginx faz proxy de 443 → 3001

**Rotas API:**
- Novo backend: `/sonia/*`, `/webhook/*`
- Vercel mantém: outras rotas em `/api/*` (não relacionadas à Sonia)

**Variáveis de Ambiente:**
- Prefixar novas: `SONIA_*` ou `BACKEND_*`
- Não sobrescrever existentes

**Repositórios:**
- ONSMART-WEBSITE: apenas frontend
- sonia-backend: apenas backend
- Sem mistura de código

### 6.3 Reuso de Padrões

**Código:**
- Mesma estrutura de resposta JSON
- Mesmos códigos de erro HTTP
- Mesma lógica de processamento de mensagens
- Mesma detecção de idioma

**Dependências:**
- Mesmas versões quando possível
- Mesmo estilo de código (ES Modules)
- Mesmo sistema de logs

## 7. Roadmap de Implementação por Fases

### Fase 1: Análise e Documentação (Semana 1)
- [x] Análise completa do projeto atual
- [x] Documentação da arquitetura proposta
- [ ] Validação com equipe
- [ ] Aprovação do plano
- [ ] Criar repositório Git `sonia-backend`

### Fase 2: Setup Inicial do Backend e Docker (Semana 2)
- [ ] Criar estrutura de pastas no novo repositório `sonia-backend`
- [ ] Criar Dockerfile
- [ ] Criar docker-compose.yml
- [ ] Migrar código de `ONSMART-WEBSITE/api/services/` para `sonia-backend/src/services/`
- [ ] Configurar conexão com PostgreSQL
- [ ] Configurar conexão com Redis
- [ ] Criar modelos de dados (Conversation, Message)
- [ ] Implementar endpoints básicos
- [ ] Testes locais com Docker

### Fase 3: Integração com Frontend (Semana 3)
- [ ] Criar `apiClient.ts` no repositório ONSMART-WEBSITE
- [ ] Atualizar `openaiService.ts` para usar novo backend
- [ ] Configurar variável `VITE_SONIA_API_URL` na Vercel
- [ ] Implementar modo dual (fallback)
- [ ] Testes de integração frontend ↔ backend

### Fase 4: Deploy e Configuração no Servidor (Semana 4)
- [ ] Clonar repositório `sonia-backend` no servidor
- [ ] Configurar variáveis de ambiente no servidor
- [ ] Configurar DNS (api.onsmart.ai)
- [ ] Configurar SSL/TLS (Let's Encrypt)
- [ ] Configurar Nginx (api.onsmart.ai.conf)
- [ ] Deploy do backend no servidor
- [ ] Testes de conectividade
- [ ] Monitoramento e logs

### Fase 5: Migração Completa e Go-Live (Semana 5)
- [ ] Migrar webhook WhatsApp
- [ ] Migrar todas as funcionalidades
- [ ] Remover código antigo do Vercel (ONSMART-WEBSITE/api/services/soniaService.js)
- [ ] Documentação final
- [ ] Treinamento da equipe
- [ ] Go-live

## 8. Riscos e Cuidados

### 8.1 Riscos Técnicos

**Versões:**
- Risco: Incompatibilidade de versões Node.js
- Mitigação: Usar mesma versão LTS (20.x)

**Conflitos de Porta:**
- Risco: Porta 3001 já em uso
- Mitigação: Verificar antes: `netstat -tulpn | grep 3001`

**Banco de Dados:**
- Risco: Schema conflitante
- Mitigação: Criar schema separado: `sonia_backend`

**Nginx:**
- Risco: Config incorreta quebra outros serviços
- Mitigação: Testar em ambiente de staging primeiro

**Repositórios Separados:**
- Risco: Confusão sobre onde está o código
- Mitigação: Documentação clara, README em cada repositório

### 8.2 Riscos de Integração

**Frontend:**
- Risco: Quebra de funcionalidade durante migração
- Mitigação: Modo dual com fallback

**Evolution API:**
- Risco: Perda de conexão WhatsApp
- Mitigação: Manter webhook antigo até validação completa

**OpenAI API:**
- Risco: Rate limiting ou custos
- Mitigação: Implementar cache Redis, monitorar uso

### 8.3 Cuidados com Variáveis de Ambiente

- Nunca commitar `.env` no Git
- Usar `.env.example` como template
- Rotacionar chaves API após migração
- Documentar todas as variáveis necessárias
- Manter variáveis sincronizadas entre repositórios (quando aplicável)

## 9. Próximos Passos

1. **Revisar este documento** com a equipe
2. **Criar novo repositório Git:** `sonia-backend` ou `onsmart-backend-api`
3. **Validar infraestrutura** no servidor (portas, serviços)
4. **Iniciar Fase 2** (Setup inicial do novo repositório)
5. **Configurar ambiente de staging** para testes

## 10. Referências e Documentação

- Documentação Docker: https://docs.docker.com/
- Documentação Nginx: https://nginx.org/en/docs/
- Documentação PostgreSQL: https://www.postgresql.org/docs/
- Documentação Express: https://expressjs.com/
- Documentação Vercel: https://vercel.com/docs

---

**Documento criado em:** 2025-01-28
**Última atualização:** 2025-01-28
**Autor:** Arquitetura de Software
**Status:** Aguardando Aprovação

## Resumo da Estrutura

**Repositórios:**
- `ONSMART-WEBSITE` - Frontend React (Vercel)
- `sonia-backend` - Backend API (Servidor via Docker)

**Deploy:**
- Frontend: Vercel (automático via Git push)
- Backend: Servidor da empresa (manual via docker-compose)

**Comunicação:**
- Frontend → Backend: HTTPS (api.onsmart.ai)
- Backend → Serviços: PostgreSQL, Redis, Evolution API (via Cloudflare Tunnel)




