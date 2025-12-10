# Guia Prático: Criação do Repositório Backend Separado

Este documento complementa o `01-IMPLEMENTATION_BACKEND_SERVER.md` com instruções práticas para criar o novo repositório backend.

## Passo 1: Criar Novo Repositório Git

### 1.1 No GitHub/GitLab

1. Criar novo repositório: `sonia-backend` ou `onsmart-backend-api`
2. Descrição: "Backend API standalone da Sonia - Servidor Docker"
3. Visibilidade: Privado (recomendado)
4. **NÃO** inicializar com README, .gitignore ou licença (vamos criar manualmente)

### 1.2 Clonar e Configurar Localmente

```bash
# Criar diretório para o novo projeto
mkdir sonia-backend
cd sonia-backend

# Inicializar Git
git init
git remote add origin https://github.com/onsmart/sonia-backend.git

# Criar branch main
git checkout -b main
```

## Passo 2: Estrutura Inicial do Projeto

### 2.1 Criar Estrutura de Pastas

```bash
mkdir -p src/{routes,services,models,middleware,config}
mkdir -p docker/nginx
mkdir -p logs
touch .gitignore
touch .env.example
touch Dockerfile
touch docker-compose.yml
touch package.json
touch README.md
```

### 2.2 Estrutura Final

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

## Passo 3: Arquivos Base

### 3.1 package.json

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

### 3.2 .gitignore

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

### 3.3 .env.example

```env
# Server
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@postgres:5432/sonia_db
DB_HOST=postgres
DB_PORT=5432
DB_NAME=sonia_db
DB_USER=sonia_user
DB_PASSWORD=your_password

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
EVOLUTION_API_INSTANCE_ID=your_instance_id

# Calendly
CALENDLY_URL=https://calendly.com/seu-usuario/30min

# ElevenLabs (opcional)
ELEVENLABS_AGENT_ID=agent_...
```

### 3.4 Dockerfile

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

### 3.5 docker-compose.yml

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
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Nota: db e redis devem ser conectados via network externa
  # ou definidos aqui se não existirem

networks:
  sonia-network:
    driver: bridge
    # Se precisar conectar com containers existentes:
    # external: true
    # name: existing-network-name
```

## Passo 4: Migrar Código do ONSMART-WEBSITE

### 4.1 Arquivos a Migrar

**De `ONSMART-WEBSITE/api/services/`:**
- `soniaService.js` → `sonia-backend/src/services/sonia.service.js`
- `soniaBrain.js` → Integrar em `sonia-backend/src/services/sonia.service.js`
- `evolutionApi.js` → `sonia-backend/src/services/evolution.service.js`

**De `ONSMART-WEBSITE/api/whatsapp/`:**
- `webhook.js` → `sonia-backend/src/routes/webhook.routes.js`

### 4.2 Comandos para Copiar

```bash
# No diretório ONSMART-WEBSITE
cd /path/to/ONSMART-WEBSITE

# Copiar serviços
cp api/services/soniaService.js ../sonia-backend/src/services/sonia.service.js
cp api/services/soniaBrain.js ../sonia-backend/src/services/sonia.brain.js
cp api/services/evolutionApi.js ../sonia-backend/src/services/evolution.service.js

# Copiar webhook
cp api/whatsapp/webhook.js ../sonia-backend/src/routes/webhook.routes.js
```

### 4.3 Adaptações Necessárias

1. **Converter para ES Modules** (se necessário)
2. **Ajustar imports** para estrutura do novo projeto
3. **Adicionar tratamento de erros** adequado
4. **Integrar com PostgreSQL** (substituir Map em memória)
5. **Adicionar logs** estruturados

## Passo 5: Criar Arquivos Base do Backend

### 5.1 src/app.js

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

### 5.2 src/routes/health.routes.js

```javascript
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
```

## Passo 6: Configurar Conexões

### 6.1 src/config/database.js

```javascript
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
```

### 6.2 src/config/redis.js

```javascript
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

export default client;
```

## Passo 7: Primeiro Commit

```bash
# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "feat: initial backend structure

- Setup Express server
- Docker configuration
- Basic routes and services structure
- Database and Redis connections"

# Push para repositório
git push -u origin main
```

## Passo 8: Testar Localmente

### 8.1 Com Docker Compose

```bash
# Build e start
docker-compose up --build

# Ver logs
docker-compose logs -f backend-sonia

# Testar health check
curl http://localhost:3001/health
```

### 8.2 Sem Docker (desenvolvimento)

```bash
# Instalar dependências
npm install

# Configurar .env
cp .env.example .env
# Editar .env com valores corretos

# Rodar
npm run dev
```

## Passo 9: Próximos Passos

1. ✅ Estrutura criada
2. ⏳ Migrar código de `soniaService.js`
3. ⏳ Criar modelos de banco de dados
4. ⏳ Implementar endpoints completos
5. ⏳ Testes
6. ⏳ Deploy no servidor

## Notas Importantes

- **Nunca commitar** arquivos `.env` ou `node_modules/`
- **Sempre usar** `.env.example` como template
- **Documentar** todas as variáveis de ambiente
- **Manter** mesma estrutura de resposta JSON do projeto original
- **Testar** localmente antes de fazer deploy

---

**Este guia deve ser usado em conjunto com `01-IMPLEMENTATION_BACKEND_SERVER.md`**


