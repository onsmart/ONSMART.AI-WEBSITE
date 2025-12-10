# PROMPT: Continuação da Implementação do Backend Sonia

## CONTEXTO

O backend da Sonia está **80% implementado**. A estrutura base, rotas, serviços, modelos e schema SQL já estão criados. Agora preciso completar a implementação executando os próximos passos até o deploy final.

**Status atual:**
- ✅ Estrutura base completa
- ✅ Rotas implementadas
- ✅ Serviços migrados e adaptados
- ✅ Modelos de dados criados
- ✅ Schema SQL criado
- ⏳ Banco de dados precisa ser configurado
- ⏳ Testes locais precisam ser executados
- ⏳ Deploy precisa ser configurado

---

## TAREFA: Completar Implementação e Deploy

### FASE 1: Configuração do Banco de Dados

#### 1.1 Executar Schema SQL no PostgreSQL

**Objetivo:** Criar as tabelas `conversations` e `messages` no PostgreSQL.

**Passos:**
1. Verificar se o arquivo `src/database/schema.sql` existe
2. Conectar ao PostgreSQL usando as credenciais do `.env.example`:
   - Host: `192.168.15.31`
   - Port: `5432`
   - Database: `sonia_db` (ou criar se não existir)
   - User: `postgres`
   - Password: `postgres`
3. Executar o script SQL para criar as tabelas
4. Verificar se as tabelas foram criadas corretamente

**Comandos sugeridos:**
```bash
# Conectar ao PostgreSQL
psql -h 192.168.15.31 -U postgres -d postgres

# Criar database se não existir
CREATE DATABASE sonia_db;

# Conectar ao database
\c sonia_db

# Executar schema
\i src/database/schema.sql

# Verificar tabelas
\dt

# Verificar estrutura das tabelas
\d conversations
\d messages
```

**Validação:**
- [ ] Database `sonia_db` criado
- [ ] Tabela `conversations` criada com colunas: id, user_id, created_at, updated_at
- [ ] Tabela `messages` criada com colunas: id, conversation_id, role, content, created_at
- [ ] Índices criados corretamente

#### 1.2 Verificar Conexão com PostgreSQL

**Objetivo:** Garantir que a aplicação consegue conectar ao banco.

**Passos:**
1. Criar arquivo `.env` baseado em `.env.example` com valores reais
2. Verificar se `src/config/database.js` está configurado corretamente
3. Testar conexão criando um script de teste ou usando o health check

**Script de teste (opcional - criar `test-db.js`):**
```javascript
import dotenv from 'dotenv';
import pool from './src/config/database.js';

dotenv.config();

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexão com PostgreSQL OK:', result.rows[0]);
    
    // Testar se tabelas existem
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📊 Tabelas encontradas:', tables.rows.map(r => r.table_name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao conectar:', error);
    process.exit(1);
  }
}

testConnection();
```

**Validação:**
- [ ] Arquivo `.env` criado com valores corretos
- [ ] Conexão com PostgreSQL funcionando
- [ ] Tabelas acessíveis pela aplicação

---

### FASE 2: Configuração de Variáveis de Ambiente

#### 2.1 Criar Arquivo .env

**Objetivo:** Configurar todas as variáveis de ambiente necessárias.

**Passos:**
1. Copiar `.env.example` para `.env`
2. Preencher com valores reais (já estão no `.env.example` do prompt anterior):
   - Database: `192.168.15.31:5432/sonia_db`
   - OpenAI API Key: (já fornecida)
   - Evolution API: (já fornecida)
   - Redis: (configurar conforme servidor)
   - Calendly: (já fornecido)
   - ElevenLabs: (já fornecido)

**Validação:**
- [ ] Arquivo `.env` criado
- [ ] Todas as variáveis preenchidas
- [ ] `.env` está no `.gitignore` (não será commitado)

#### 2.2 Verificar Acessibilidade das APIs

**Objetivo:** Garantir que todas as APIs externas estão acessíveis.

**Testes:**
```bash
# Testar OpenAI (usar curl ou script)
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"

# Testar Evolution API
curl https://evolution.onsmart.ai/instance/fetchInstances \
  -H "apikey: $EVOLUTION_API_APIKEY"

# Testar Redis (se disponível)
redis-cli -h $REDIS_HOST -p $REDIS_PORT ping
```

**Validação:**
- [ ] OpenAI API acessível
- [ ] Evolution API acessível
- [ ] Redis acessível (ou configurar para usar sem Redis temporariamente)

---

### FASE 3: Testes Locais

#### 3.1 Testar com Docker Compose

**Objetivo:** Garantir que a aplicação roda corretamente em container.

**Passos:**
1. Verificar se `docker-compose.yml` está configurado corretamente
2. Verificar se `Dockerfile` está correto
3. Build e start do container:
   ```bash
   docker-compose up --build
   ```
4. Verificar logs para erros
5. Testar health check

**Validação:**
- [ ] Container builda sem erros
- [ ] Container inicia corretamente
- [ ] Health check responde: `curl http://localhost:3001/health`
- [ ] Logs não mostram erros críticos

#### 3.2 Testar Endpoints

**Objetivo:** Validar que todos os endpoints estão funcionando.

**Testes:**

**1. Health Check:**
```bash
curl http://localhost:3001/health
```
**Esperado:** `{"status":"OK","timestamp":"...","uptime":...,"environment":"..."}`

**2. POST /sonia/message:**
```bash
curl -X POST http://localhost:3001/sonia/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Olá, como você está?",
    "userId": "test-user-123"
  }'
```
**Esperado:** Resposta da Sonia com mensagem processada

**3. GET /sonia/conversation/:userId:**
```bash
curl http://localhost:3001/sonia/conversation/test-user-123
```
**Esperado:** Histórico de conversa em formato JSON

**4. DELETE /sonia/conversation/:userId:**
```bash
curl -X DELETE http://localhost:3001/sonia/conversation/test-user-123
```
**Esperado:** `{"success": true, "message": "Conversation deleted"}`

**5. POST /webhook/whatsapp:**
```bash
curl -X POST http://localhost:3001/webhook/whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "event": "messages.upsert",
    "instance": "sonia-whatsapp-v3",
    "data": {
      "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": false
      },
      "message": {
        "conversation": "Olá"
      },
      "messageType": "conversation"
    }
  }'
```
**Esperado:** `{"success": true, "message": "Message processed successfully"}`

**Validação:**
- [ ] Todos os endpoints respondem corretamente
- [ ] Mensagens são salvas no PostgreSQL
- [ ] Histórico é recuperado corretamente
- [ ] Webhook processa mensagens do WhatsApp

#### 3.3 Verificar Logs e Erros

**Objetivo:** Identificar e corrigir problemas.

**Passos:**
1. Monitorar logs do container: `docker-compose logs -f backend-sonia`
2. Verificar erros no console
3. Testar cenários de erro (mensagens inválidas, APIs offline, etc.)
4. Verificar tratamento de erros

**Validação:**
- [ ] Logs estruturados e informativos
- [ ] Erros são tratados adequadamente
- [ ] Não há vazamento de informações sensíveis nos logs

---

### FASE 4: Ajustes Finais

#### 4.1 Verificar Estrutura do Payload do Webhook

**Objetivo:** Garantir que o webhook está processando corretamente os payloads da Evolution API.

**Passos:**
1. Revisar documentação da Evolution API sobre estrutura de webhooks
2. Comparar com o código em `src/routes/webhook.routes.js`
3. Ajustar se necessário para suportar diferentes tipos de eventos:
   - `messages.upsert` - Nova mensagem recebida
   - `messages.update` - Atualização de mensagem (status, etc.)
   - `connection.update` - Atualização de conexão
   - Outros eventos relevantes

**Validação:**
- [ ] Webhook processa todos os tipos de eventos necessários
- [ ] Extração de dados (número, mensagem, tipo) está correta
- [ ] Respostas são enviadas corretamente via Evolution API

#### 4.2 Otimizações e Melhorias

**Objetivo:** Aplicar melhorias de performance e segurança.

**Verificações:**
- [ ] Rate limiting implementado (se necessário)
- [ ] Validação de entrada em todos os endpoints
- [ ] Sanitização de dados
- [ ] Timeouts configurados para requisições externas
- [ ] Cache Redis funcionando (se implementado)
- [ ] Logs não expõem informações sensíveis

**Validação:**
- [ ] Código otimizado e seguro
- [ ] Performance adequada
- [ ] Sem vulnerabilidades óbvias

---

### FASE 5: Deploy no Servidor

#### 5.1 Preparação do Servidor

**Objetivo:** Preparar o servidor para receber o backend.

**Passos:**
1. Verificar se Docker e Docker Compose estão instalados
2. Verificar portas disponíveis (3001 deve estar livre)
3. Verificar acesso ao PostgreSQL (192.168.15.31:5432)
4. Verificar acesso ao Redis (se usado)
5. Criar usuário para o backend (opcional): `sudo useradd -m -s /bin/bash sonia-backend`
6. Adicionar usuário ao grupo docker: `sudo usermod -aG docker sonia-backend`

**Validação:**
- [ ] Docker instalado e funcionando
- [ ] Porta 3001 disponível
- [ ] PostgreSQL acessível
- [ ] Redis acessível (ou configurado para não usar)

#### 5.2 Clonar Repositório no Servidor

**Passos:**
1. Clonar repositório em `/opt/sonia-backend` (ou diretório apropriado):
   ```bash
   sudo mkdir -p /opt
   cd /opt
   sudo git clone <url-do-repositorio> sonia-backend
   sudo chown -R sonia-backend:sonia-backend sonia-backend
   ```
2. Criar arquivo `.env` no servidor com valores de produção
3. Verificar permissões

**Validação:**
- [ ] Repositório clonado
- [ ] Arquivo `.env` criado com valores de produção
- [ ] Permissões corretas

#### 5.3 Build e Start do Container

**Passos:**
1. Navegar para o diretório: `cd /opt/sonia-backend`
2. Build da imagem: `docker-compose build`
3. Start do container: `docker-compose up -d`
4. Verificar logs: `docker-compose logs -f backend-sonia`
5. Verificar status: `docker-compose ps`

**Validação:**
- [ ] Container builda sem erros
- [ ] Container inicia e fica rodando
- [ ] Health check responde: `curl http://localhost:3001/health`
- [ ] Logs não mostram erros

#### 5.4 Configurar Nginx como Reverse Proxy

**Objetivo:** Expor o backend via HTTPS em `api.onsmart.ai`.

**Passos:**
1. Criar arquivo de configuração do Nginx: `/etc/nginx/sites-available/api.onsmart.ai`
2. Configurar proxy para `http://localhost:3001`
3. Configurar SSL/TLS (Let's Encrypt ou Cloudflare)
4. Testar configuração: `sudo nginx -t`
5. Recarregar Nginx: `sudo systemctl reload nginx`

**Configuração Nginx sugerida:**
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

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # CORS
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

**Validação:**
- [ ] Nginx configurado corretamente
- [ ] SSL/TLS funcionando
- [ ] Backend acessível via `https://api.onsmart.ai`
- [ ] Health check funciona: `curl https://api.onsmart.ai/health`

#### 5.5 Configurar DNS

**Objetivo:** Apontar `api.onsmart.ai` para o servidor.

**Passos:**
1. No Cloudflare (ou registrador de domínio):
   - Criar registro A: `api.onsmart.ai` → IP do servidor
   - OU criar registro CNAME: `api.onsmart.ai` → `onsmart.ai` (se usar Cloudflare Proxy)
2. Aguardar propagação DNS (pode levar alguns minutos)
3. Verificar: `dig api.onsmart.ai` ou `nslookup api.onsmart.ai`

**Validação:**
- [ ] DNS configurado
- [ ] Domínio resolve para IP correto
- [ ] Backend acessível via domínio

#### 5.6 Configurar SSL/TLS

**Objetivo:** Obter certificado SSL para `api.onsmart.ai`.

**Opção 1: Let's Encrypt (Certbot)**
```bash
sudo certbot --nginx -d api.onsmart.ai
```

**Opção 2: Cloudflare SSL (se usar Cloudflare Proxy)**
- Ativar SSL/TLS Full (strict) no Cloudflare
- Certificado será gerenciado automaticamente

**Validação:**
- [ ] Certificado SSL válido
- [ ] HTTPS funcionando
- [ ] Sem avisos de segurança no navegador

#### 5.7 Configurar Auto-start do Container

**Objetivo:** Garantir que o container inicia automaticamente após reinicialização do servidor.

**Passos:**
1. Verificar se `docker-compose.yml` tem `restart: unless-stopped`
2. Criar systemd service (opcional, se necessário):
   ```bash
   sudo nano /etc/systemd/system/sonia-backend.service
   ```
   ```ini
   [Unit]
   Description=Sonia Backend Service
   Requires=docker.service
   After=docker.service

   [Service]
   Type=oneshot
   RemainAfterExit=yes
   WorkingDirectory=/opt/sonia-backend
   ExecStart=/usr/bin/docker-compose up -d
   ExecStop=/usr/bin/docker-compose down
   User=sonia-backend
   Group=sonia-backend

   [Install]
   WantedBy=multi-user.target
   ```
3. Habilitar serviço: `sudo systemctl enable sonia-backend`

**Validação:**
- [ ] Container reinicia automaticamente após reboot
- [ ] Serviço está habilitado

---

### FASE 6: Integração com Frontend

#### 6.1 Atualizar Frontend (ONSMART-WEBSITE)

**Objetivo:** Fazer o frontend se comunicar com o novo backend.

**Passos:**
1. No repositório `ONSMART-WEBSITE`, adicionar variável de ambiente na Vercel:
   - `VITE_SONIA_API_URL=https://api.onsmart.ai`
2. Criar ou atualizar `src/lib/apiClient.ts`:
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
         if (!response.ok) throw new Error('Failed to send message');
         return response.json();
       },
       getConversation: async (userId: string) => {
         const response = await fetch(`${SONIA_API_URL}/sonia/conversation/${userId}`);
         if (!response.ok) throw new Error('Failed to get conversation');
         return response.json();
       },
       resetConversation: async (userId: string) => {
         const response = await fetch(`${SONIA_API_URL}/sonia/conversation/${userId}`, {
           method: 'DELETE'
         });
         if (!response.ok) throw new Error('Failed to reset conversation');
         return response.json();
       }
     }
   };
   ```
3. Atualizar `src/lib/openaiService.ts` para usar `apiClient` ao invés de chamar diretamente o proxy OpenAI
4. Testar integração

**Validação:**
- [ ] Frontend se comunica com backend
- [ ] Mensagens são enviadas e recebidas corretamente
- [ ] Histórico é carregado corretamente
- [ ] Reset de conversa funciona

#### 6.2 Atualizar Webhook da Evolution API

**Objetivo:** Apontar webhook da Evolution API para o novo backend.

**Passos:**
1. Atualizar webhook URL na Evolution API:
   ```bash
   curl -X PUT https://evolution.onsmart.ai/webhook/update/sonia-whatsapp-v3 \
     -H "apikey: $EVOLUTION_API_APIKEY" \
     -H "Content-Type: application/json" \
     -d '{
       "url": "https://api.onsmart.ai/webhook/whatsapp",
       "webhook_by_events": true,
       "events": ["MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE"]
     }'
   ```
2. Verificar se webhook está configurado:
   ```bash
   curl https://evolution.onsmart.ai/webhook/find/sonia-whatsapp-v3 \
     -H "apikey: $EVOLUTION_API_APIKEY"
   ```
3. Testar enviando uma mensagem para o WhatsApp

**Validação:**
- [ ] Webhook atualizado na Evolution API
- [ ] Mensagens do WhatsApp são recebidas no backend
- [ ] Respostas são enviadas corretamente

---

### FASE 7: Testes Finais e Validação

#### 7.1 Testes End-to-End

**Objetivo:** Validar que todo o fluxo está funcionando.

**Testes:**

1. **Webchat no Frontend:**
   - [ ] Enviar mensagem via webchat
   - [ ] Receber resposta da Sonia
   - [ ] Verificar histórico
   - [ ] Resetar conversa

2. **WhatsApp:**
   - [ ] Enviar mensagem para o WhatsApp
   - [ ] Receber resposta da Sonia
   - [ ] Verificar que mensagem foi salva no banco

3. **Múltiplos Usuários:**
   - [ ] Testar com diferentes userIds
   - [ ] Verificar isolamento de conversas

4. **Idiomas:**
   - [ ] Testar em português
   - [ ] Testar em inglês
   - [ ] Testar em espanhol

**Validação:**
- [ ] Todos os fluxos funcionam corretamente
- [ ] Dados são persistidos no PostgreSQL
- [ ] Performance é adequada

#### 7.2 Monitoramento

**Objetivo:** Configurar monitoramento básico.

**Passos:**
1. Verificar logs regularmente: `docker-compose logs -f backend-sonia`
2. Monitorar uso de recursos: `docker stats backend-sonia`
3. Verificar saúde do serviço: `curl https://api.onsmart.ai/health`
4. Configurar alertas (opcional)

**Validação:**
- [ ] Logs são monitorados
- [ ] Performance é monitorada
- [ ] Alertas configurados (se aplicável)

---

## CHECKLIST FINAL

### Configuração
- [ ] Banco de dados configurado e funcionando
- [ ] Variáveis de ambiente configuradas
- [ ] Conexões testadas (PostgreSQL, Redis, APIs)

### Testes Locais
- [ ] Container roda localmente
- [ ] Todos os endpoints funcionam
- [ ] Webhook processa mensagens corretamente

### Deploy
- [ ] Backend deployado no servidor
- [ ] Nginx configurado como reverse proxy
- [ ] SSL/TLS configurado
- [ ] DNS configurado
- [ ] Auto-start configurado

### Integração
- [ ] Frontend integrado com backend
- [ ] Webhook Evolution API atualizado
- [ ] Testes end-to-end passando

### Validação
- [ ] Webchat funcionando
- [ ] WhatsApp funcionando
- [ ] Histórico persistindo
- [ ] Performance adequada

---

## PRÓXIMOS PASSOS APÓS COMPLETAR

1. **Remover código antigo do Vercel:**
   - Remover `api/services/soniaService.js`
   - Remover `api/services/soniaBrain.js`
   - Remover `api/whatsapp/webhook.js` (ou manter como fallback temporário)
   - Remover variáveis de ambiente não utilizadas

2. **Documentação:**
   - Atualizar README do repositório backend
   - Documentar endpoints da API
   - Documentar processo de deploy
   - Documentar troubleshooting

3. **Melhorias Futuras:**
   - Implementar cache Redis para respostas frequentes
   - Adicionar rate limiting
   - Implementar métricas e monitoramento avançado
   - Adicionar testes automatizados

---

## NOTAS IMPORTANTES

- **Backup:** Sempre faça backup do banco de dados antes de mudanças importantes
- **Logs:** Monitore logs regularmente para identificar problemas
- **Segurança:** Nunca commite arquivos `.env` ou credenciais
- **Testes:** Teste sempre em ambiente de staging antes de produção
- **Rollback:** Tenha um plano de rollback caso algo dê errado

---

**Use este prompt para completar a implementação do backend da Sonia do estado atual até o deploy final.**



