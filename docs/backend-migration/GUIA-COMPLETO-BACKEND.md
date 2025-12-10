# GUIA COMPLETO: Implementação do Backend Sonia até Deploy no Servidor

Este documento contém **TUDO** que é necessário para implementar o backend da Sonia desde o estado atual até a conexão no servidor da empresa.

---

## 📋 INSTRUÇÕES INICIAIS

**PRIMEIRO:** Analise o estado atual do projeto seguindo a seção "ANÁLISE DO ESTADO ATUAL" abaixo. Depois, siga as fases sequencialmente até completar o deploy no servidor.

---

## 🔍 ANÁLISE DO ESTADO ATUAL

### Passo 1: Verificar Estrutura de Pastas

Analise e liste o que existe no projeto:

**Estrutura esperada:**
```
sonia-backend/
├── src/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── database/
│   └── app.js
├── docker/
│   └── nginx/
├── logs/
├── .gitignore
├── .env.example
├── .env (não deve estar no git)
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

**Verificar:**
- [ ] Pasta `src/` existe?
- [ ] Subpastas `routes/`, `services/`, `models/`, `config/`, `middleware/` existem?
- [ ] Pasta `src/database/` existe?
- [ ] Arquivo `src/app.js` existe?
- [ ] Arquivos `Dockerfile` e `docker-compose.yml` existem?
- [ ] Arquivo `package.json` existe?

### Passo 2: Verificar Arquivos de Configuração

**Verificar:**
- [ ] `package.json` - está configurado com `"type": "module"`?
- [ ] `.gitignore` - está configurado corretamente?
- [ ] `.env.example` - existe e tem todas as variáveis?
- [ ] `.env` - existe? (não deve estar no git)
- [ ] `Dockerfile` - está criado e configurado?
- [ ] `docker-compose.yml` - está criado e configurado?

### Passo 3: Verificar Código Implementado

**Rotas:**
- [ ] `src/routes/health.routes.js` existe?
- [ ] `src/routes/sonia.routes.js` existe?
- [ ] `src/routes/webhook.routes.js` existe?

**Serviços:**
- [ ] `src/services/soniaService.js` existe?
- [ ] `src/services/evolution.service.js` existe?
- [ ] `src/services/soniaBrain.js` existe? (opcional)

**Modelos:**
- [ ] `src/models/Conversation.js` existe?
- [ ] `src/models/Message.js` existe?

**Configurações:**
- [ ] `src/config/database.js` existe?
- [ ] `src/config/redis.js` existe?

**Aplicação:**
- [ ] `src/app.js` existe e está configurado?

**Database:**
- [ ] `src/database/schema.sql` existe?

### Passo 4: Verificar Funcionalidades

**Testar localmente (se possível):**
- [ ] Aplicação inicia sem erros?
- [ ] Health check funciona: `curl http://localhost:3001/health`?
- [ ] Conexão com PostgreSQL funciona?
- [ ] Conexão com Redis funciona? (se usado)

### Passo 5: Documentar Estado Atual

**Criar um resumo:**
```
✅ O QUE JÁ FOI FEITO:
- [Listar arquivos e funcionalidades implementadas]

⏳ O QUE FALTA FAZER:
- [Listar o que precisa ser criado/implementado]
```

---

## 📝 CHECKLIST COMPLETO DE IMPLEMENTAÇÃO

Use este checklist para acompanhar o progresso. Marque cada item conforme for completando.

### FASE 1: Estrutura Base do Projeto

#### 1.1 Estrutura de Pastas
- [ ] Criar pasta `src/` com subpastas:
  - [ ] `src/routes/`
  - [ ] `src/services/`
  - [ ] `src/models/`
  - [ ] `src/middleware/`
  - [ ] `src/config/`
  - [ ] `src/database/`
- [ ] Criar pasta `docker/nginx/`
- [ ] Criar pasta `logs/`

#### 1.2 Arquivos Base
- [ ] Criar `package.json` com:
  - [ ] `"type": "module"` (ES Modules)
  - [ ] Dependências: express, cors, dotenv, pg, redis
  - [ ] Scripts: start, dev
  - [ ] Engines: node >=20.0.0
- [ ] Criar `.gitignore`
- [ ] Criar `.env.example`
- [ ] Criar `Dockerfile`
- [ ] Criar `docker-compose.yml`
- [ ] Criar `README.md`

### FASE 2: Configurações

#### 2.1 Configuração do Banco de Dados
- [ ] Criar `src/config/database.js` com Pool PostgreSQL
- [ ] Criar `src/database/schema.sql` com:
  - [ ] Tabela `conversations`
  - [ ] Tabela `messages`
  - [ ] Índices para performance
- [ ] Executar schema SQL no PostgreSQL
- [ ] Verificar conexão com banco

#### 2.2 Configuração do Redis
- [ ] Criar `src/config/redis.js` com cliente Redis
- [ ] Implementar funções de cache (opcional)
- [ ] Verificar conexão com Redis

#### 2.3 Variáveis de Ambiente
- [ ] Criar `.env` baseado em `.env.example`
- [ ] Configurar todas as variáveis:
  - [ ] Database (host, port, name, user, password)
  - [ ] Redis (host, port, url)
  - [ ] OpenAI (API key, model, temperature)
  - [ ] Evolution API (base URL, API key, instance ID)
  - [ ] Calendly URL
  - [ ] ElevenLabs Agent ID (opcional)
  - [ ] CORS origins

### FASE 3: Aplicação Principal

#### 3.1 Servidor Express
- [ ] Criar `src/app.js` com:
  - [ ] Import do Express
  - [ ] Configuração de CORS
  - [ ] Middleware de JSON parsing
  - [ ] Middleware de logging
  - [ ] Registro de rotas
  - [ ] Error handling middleware
  - [ ] Inicialização do servidor
  - [ ] Inicialização do Redis (se usado)

#### 3.2 Rotas
- [ ] Criar `src/routes/health.routes.js`:
  - [ ] GET `/health` - Health check
- [ ] Criar `src/routes/sonia.routes.js`:
  - [ ] POST `/sonia/message` - Processa mensagem
  - [ ] GET `/sonia/conversation/:userId` - Obtém histórico
  - [ ] DELETE `/sonia/conversation/:userId` - Reseta conversa
- [ ] Criar `src/routes/webhook.routes.js`:
  - [ ] POST `/webhook/whatsapp` - Webhook Evolution API

### FASE 4: Serviços

#### 4.1 Serviço Evolution API
- [ ] Criar `src/services/evolution.service.js`:
  - [ ] Função `sendWhatsAppMessage(to, text)`
  - [ ] Normalização de números
  - [ ] Tratamento de erros
  - [ ] Logs estruturados

#### 4.2 Serviço Sonia
- [ ] Criar `src/services/soniaService.js`:
  - [ ] Função `processSoniaMessage(userId, message, options)`
  - [ ] Integração com PostgreSQL (histórico)
  - [ ] Integração com OpenAI API
  - [ ] Detecção de idioma
  - [ ] Gerenciamento de contexto
  - [ ] Tratamento de erros
  - [ ] Logs estruturados

#### 4.3 Serviço Sonia Brain (Opcional)
- [ ] Criar `src/services/soniaBrain.js`:
  - [ ] Lógica de detecção de idioma
  - [ ] Fallback de idioma
  - [ ] Funções auxiliares

### FASE 5: Modelos de Dados

#### 5.1 Modelo Conversation
- [ ] Criar `src/models/Conversation.js`:
  - [ ] `findOrCreate(userId)` - Cria ou obtém conversa
  - [ ] `findByUserId(userId)` - Busca por userId
  - [ ] `deleteByUserId(userId)` - Deleta conversa e mensagens
  - [ ] `updateTimestamp(conversationId)` - Atualiza timestamp

#### 5.2 Modelo Message
- [ ] Criar `src/models/Message.js`:
  - [ ] `create(conversationId, role, content)` - Cria mensagem
  - [ ] `findByUserId(userId)` - Obtém todas as mensagens
  - [ ] `getHistoryForOpenAI(userId, limit)` - Obtém histórico formatado
  - [ ] `deleteOldMessages(userId, daysOld)` - Limpa mensagens antigas

### FASE 6: Docker

#### 6.1 Dockerfile
- [ ] Criar `Dockerfile`:
  - [ ] Base: node:20-alpine
  - [ ] Workdir: /app
  - [ ] Copy package files
  - [ ] Install dependencies
  - [ ] Copy source code
  - [ ] Create logs directory
  - [ ] Expose port 3001
  - [ ] Health check
  - [ ] CMD para iniciar aplicação

#### 6.2 Docker Compose
- [ ] Criar `docker-compose.yml`:
  - [ ] Service backend-sonia
  - [ ] Build context
  - [ ] Port mapping (3001:3001)
  - [ ] Environment variables
  - [ ] Env file (.env)
  - [ ] Networks
  - [ ] Depends on (db, redis - se necessário)
  - [ ] Volumes (logs)
  - [ ] Health check
  - [ ] Restart policy

### FASE 7: Testes Locais

#### 7.1 Preparação
- [ ] Criar arquivo `.env` com valores de desenvolvimento
- [ ] Verificar que PostgreSQL está acessível
- [ ] Verificar que Redis está acessível (ou desabilitar temporariamente)
- [ ] Executar schema SQL no PostgreSQL

#### 7.2 Testes com Docker
- [ ] Build da imagem: `docker-compose build`
- [ ] Start do container: `docker-compose up -d`
- [ ] Verificar logs: `docker-compose logs -f backend-sonia`
- [ ] Verificar status: `docker-compose ps`

#### 7.3 Testes de Endpoints
- [ ] Health check: `curl http://localhost:3001/health`
- [ ] POST /sonia/message: Enviar mensagem de teste
- [ ] GET /sonia/conversation/:userId: Verificar histórico
- [ ] DELETE /sonia/conversation/:userId: Resetar conversa
- [ ] POST /webhook/whatsapp: Testar webhook

#### 7.4 Validações
- [ ] Mensagens são salvas no PostgreSQL
- [ ] Histórico é recuperado corretamente
- [ ] Respostas da Sonia são geradas
- [ ] Webhook processa mensagens corretamente
- [ ] Logs não mostram erros críticos

### FASE 8: Preparação do Servidor

#### 8.1 Verificações no Servidor
- [ ] Docker instalado: `docker --version`
- [ ] Docker Compose instalado: `docker-compose --version`
- [ ] Porta 3001 disponível: `netstat -tulpn | grep 3001`
- [ ] PostgreSQL acessível: `psql -h 192.168.15.31 -U postgres -c "SELECT 1"`
- [ ] Redis acessível (se usado): `redis-cli -h <host> -p <port> ping`
- [ ] Nginx instalado: `nginx -v`

#### 8.2 Criar Usuário (Opcional)
- [ ] Criar usuário: `sudo useradd -m -s /bin/bash sonia-backend`
- [ ] Adicionar ao grupo docker: `sudo usermod -aG docker sonia-backend`
- [ ] Verificar permissões

#### 8.3 Preparar Diretório
- [ ] Criar diretório: `sudo mkdir -p /opt/sonia-backend`
- [ ] Definir permissões: `sudo chown -R sonia-backend:sonia-backend /opt/sonia-backend`

### FASE 9: Deploy no Servidor

#### 9.1 Clonar Repositório
- [ ] Clonar repositório no servidor:
  ```bash
  cd /opt
  sudo git clone <url-do-repositorio> sonia-backend
  sudo chown -R sonia-backend:sonia-backend sonia-backend
  ```
- [ ] Verificar que código foi clonado corretamente

#### 9.2 Configurar Ambiente
- [ ] Criar arquivo `.env` no servidor com valores de produção
- [ ] Verificar que todas as variáveis estão configuradas
- [ ] Verificar que `.env` não está no git (está no .gitignore)

#### 9.3 Executar Schema SQL
- [ ] Conectar ao PostgreSQL no servidor
- [ ] Criar database `sonia_db` se não existir
- [ ] Executar `src/database/schema.sql`
- [ ] Verificar que tabelas foram criadas

#### 9.4 Build e Start
- [ ] Navegar para diretório: `cd /opt/sonia-backend`
- [ ] Build da imagem: `docker-compose build`
- [ ] Start do container: `docker-compose up -d`
- [ ] Verificar logs: `docker-compose logs -f backend-sonia`
- [ ] Verificar status: `docker-compose ps`
- [ ] Testar health check: `curl http://localhost:3001/health`

### FASE 10: Configuração Nginx

#### 10.1 Criar Configuração
- [ ] Criar arquivo: `/etc/nginx/sites-available/api.onsmart.ai`
- [ ] Configurar server block:
  - [ ] Listen 80 (redirect para HTTPS)
  - [ ] Listen 443 ssl http2
  - [ ] Server name: api.onsmart.ai
  - [ ] SSL certificates (Let's Encrypt)
  - [ ] Security headers
  - [ ] CORS headers
  - [ ] Proxy para localhost:3001
  - [ ] Timeouts configurados
  - [ ] Health check endpoint

#### 10.2 Habilitar Site
- [ ] Criar symlink: `sudo ln -s /etc/nginx/sites-available/api.onsmart.ai /etc/nginx/sites-enabled/`
- [ ] Testar configuração: `sudo nginx -t`
- [ ] Recarregar Nginx: `sudo systemctl reload nginx`

### FASE 11: Configuração SSL/TLS

#### 11.1 Let's Encrypt (Opção 1)
- [ ] Instalar Certbot: `sudo apt install certbot python3-certbot-nginx`
- [ ] Obter certificado: `sudo certbot --nginx -d api.onsmart.ai`
- [ ] Verificar renovação automática: `sudo certbot renew --dry-run`

#### 11.2 Cloudflare SSL (Opção 2 - se usar Cloudflare Proxy)
- [ ] Ativar Cloudflare Proxy (laranja) no DNS
- [ ] Configurar SSL/TLS para "Full (strict)" no Cloudflare
- [ ] Certificado será gerenciado automaticamente

#### 11.3 Validação
- [ ] Testar HTTPS: `curl https://api.onsmart.ai/health`
- [ ] Verificar certificado no navegador
- [ ] Sem avisos de segurança

### FASE 12: Configuração DNS

#### 12.1 Criar Registro DNS
- [ ] No Cloudflare (ou registrador):
  - [ ] Criar registro A: `api.onsmart.ai` → IP do servidor
  - [ ] OU criar CNAME: `api.onsmart.ai` → `onsmart.ai` (se usar Cloudflare Proxy)
- [ ] Aguardar propagação DNS (pode levar alguns minutos)

#### 12.2 Verificar DNS
- [ ] Verificar resolução: `dig api.onsmart.ai` ou `nslookup api.onsmart.ai`
- [ ] Verificar que aponta para IP correto do servidor

### FASE 13: Auto-start do Container

#### 13.1 Verificar Docker Compose
- [ ] Verificar que `docker-compose.yml` tem `restart: unless-stopped`
- [ ] Testar reinicialização: `sudo reboot` (ou reiniciar container)

#### 13.2 Systemd Service (Opcional)
- [ ] Criar service: `/etc/systemd/system/sonia-backend.service`
- [ ] Configurar para iniciar com Docker Compose
- [ ] Habilitar serviço: `sudo systemctl enable sonia-backend`
- [ ] Testar: `sudo systemctl start sonia-backend`

### FASE 14: Testes Finais

#### 14.1 Testes de Conectividade
- [ ] Health check externo: `curl https://api.onsmart.ai/health`
- [ ] POST /sonia/message externo
- [ ] GET /sonia/conversation/:userId externo
- [ ] POST /webhook/whatsapp externo

#### 14.2 Testes de Integração
- [ ] Testar webhook da Evolution API
- [ ] Enviar mensagem via WhatsApp
- [ ] Verificar que resposta é enviada
- [ ] Verificar que mensagens são salvas no banco

#### 14.3 Monitoramento
- [ ] Verificar logs: `docker-compose logs -f backend-sonia`
- [ ] Monitorar recursos: `docker stats backend-sonia`
- [ ] Verificar uso de memória e CPU
- [ ] Verificar conexões com banco

---

## 📚 CÓDIGOS E CONFIGURAÇÕES NECESSÁRIOS

### package.json
```json
{
  "name": "sonia-backend",
  "version": "1.0.0",
  "description": "Backend API standalone da Sonia",
  "type": "module",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "node --watch src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["sonia", "api", "backend"],
  "author": "OnSmart",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "redis": "^4.6.10"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### .gitignore
```
# Dependencies
node_modules/
package-lock.json

# Environment
.env
.env.local
.env.production

# Logs
logs/
*.log
npm-debug.log*

# Docker
.dockerignore

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

### .env.example
```env
# Server
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@192.168.15.31:5432/sonia_db
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
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7

# Evolution API
EVOLUTION_API_BASE_URL=https://evolution.onsmart.ai
EVOLUTION_API_APIKEY=your_api_key
EVOLUTION_API_INSTANCE_ID=sonia-whatsapp-v3

# Calendly
CALENDLY_URL=https://calendly.com/ricardo-palomar-onsmartai/30min/

# ElevenLabs (opcional)
ELEVENLABS_AGENT_ID=agent_3101k6n2s7qhebtbrpdpheng869h

# CORS
ALLOWED_ORIGINS=https://onsmart.ai
```

### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "src/app.js"]
```

### docker-compose.yml
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
    env_file:
      - .env
    networks:
      - sonia-network
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

networks:
  sonia-network:
    driver: bridge
```

### src/database/schema.sql
```sql
-- Criar tabela de conversas
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Nginx Configuration (/etc/nginx/sites-available/api.onsmart.ai)
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

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/api.onsmart.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.onsmart.ai/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # CORS
    add_header Access-Control-Allow-Origin "https://onsmart.ai" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;

    # Handle preflight requests
    if ($request_method = 'OPTIONS') {
        return 204;
    }

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

---

## 🔧 COMANDOS ÚTEIS

### Docker
```bash
# Build
docker-compose build

# Start
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f backend-sonia

# Status
docker-compose ps

# Restart
docker-compose restart backend-sonia

# Executar comando no container
docker-compose exec backend-sonia sh
```

### PostgreSQL
```bash
# Conectar
psql -h 192.168.15.31 -U postgres -d sonia_db

# Executar schema
psql -h 192.168.15.31 -U postgres -d sonia_db -f src/database/schema.sql

# Verificar tabelas
psql -h 192.168.15.31 -U postgres -d sonia_db -c "\dt"

# Verificar estrutura
psql -h 192.168.15.31 -U postgres -d sonia_db -c "\d conversations"
```

### Nginx
```bash
# Testar configuração
sudo nginx -t

# Recarregar
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# Status
sudo systemctl status nginx
```

### SSL/TLS
```bash
# Obter certificado
sudo certbot --nginx -d api.onsmart.ai

# Renovar certificado
sudo certbot renew

# Testar renovação
sudo certbot renew --dry-run
```

### Testes
```bash
# Health check
curl http://localhost:3001/health
curl https://api.onsmart.ai/health

# Testar mensagem
curl -X POST http://localhost:3001/sonia/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Olá", "userId": "test-123"}'

# Testar histórico
curl http://localhost:3001/sonia/conversation/test-123

# Testar webhook
curl -X POST http://localhost:3001/webhook/whatsapp \
  -H "Content-Type: application/json" \
  -d '{"event": "messages.upsert", "data": {...}}'
```

---

## ⚠️ TROUBLESHOOTING

### Container não inicia
- Verificar logs: `docker-compose logs backend-sonia`
- Verificar variáveis de ambiente no `.env`
- Verificar se porta 3001 está disponível
- Verificar conexão com PostgreSQL

### Erro de conexão com PostgreSQL
- Verificar se PostgreSQL está rodando
- Verificar credenciais no `.env`
- Verificar se database existe
- Verificar firewall/network

### Erro 502 Bad Gateway no Nginx
- Verificar se container está rodando: `docker-compose ps`
- Verificar se backend responde: `curl http://localhost:3001/health`
- Verificar configuração do Nginx
- Verificar logs do Nginx: `sudo tail -f /var/log/nginx/error.log`

### SSL não funciona
- Verificar se certificado foi gerado: `sudo certbot certificates`
- Verificar configuração do Nginx
- Verificar DNS está apontando corretamente
- Verificar se porta 443 está aberta no firewall

### Webhook não recebe mensagens
- Verificar se webhook está configurado na Evolution API
- Verificar logs do backend
- Verificar se URL do webhook está acessível externamente
- Testar webhook manualmente com curl

---

## ✅ CHECKLIST FINAL

Antes de considerar o deploy completo, verifique:

- [ ] Banco de dados configurado e funcionando
- [ ] Container rodando e saudável
- [ ] Health check responde corretamente
- [ ] Nginx configurado e funcionando
- [ ] SSL/TLS configurado e válido
- [ ] DNS configurado e propagado
- [ ] Backend acessível via `https://api.onsmart.ai`
- [ ] Todos os endpoints funcionando
- [ ] Webhook recebendo mensagens
- [ ] Mensagens sendo salvas no banco
- [ ] Logs não mostram erros críticos
- [ ] Auto-start configurado
- [ ] Monitoramento básico funcionando

---

## 📞 PRÓXIMOS PASSOS APÓS DEPLOY

1. **Integrar com Frontend:**
   - Atualizar `ONSMART-WEBSITE` para usar `https://api.onsmart.ai`
   - Adicionar variável `VITE_SONIA_API_URL` na Vercel
   - Testar integração completa

2. **Atualizar Webhook Evolution API:**
   - Configurar webhook para apontar para `https://api.onsmart.ai/webhook/whatsapp`
   - Testar recebimento de mensagens

3. **Monitoramento:**
   - Configurar alertas (opcional)
   - Monitorar logs regularmente
   - Monitorar uso de recursos

4. **Documentação:**
   - Atualizar README do repositório
   - Documentar endpoints da API
   - Documentar processo de deploy

---

**Use este guia completo para implementar o backend da Sonia desde o estado atual até a conexão no servidor da empresa.**



