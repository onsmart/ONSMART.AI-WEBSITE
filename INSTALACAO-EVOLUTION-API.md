# Guia de Instalação - Evolution API v2.x

Este guia ajuda a instalar a Evolution API v2.x na sua VPS Ubuntu usando Docker.

## Pré-requisitos

- VPS Ubuntu (recomendado: Ubuntu 22.04 LTS)
- Acesso SSH à VPS
- Domínio apontando para o IP da VPS (ex: `evolution.sonia.onsmart.ai`)
- Docker e Docker Compose instalados

---

## ETAPA 1: Verificar/Instalar Docker e Docker Compose

### Verificar se já estão instalados:

```bash
docker --version
docker-compose --version
```

### Se não estiverem instalados, instale:

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependências
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Adicionar repositório oficial do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Adicionar seu usuário ao grupo docker (para não precisar usar sudo)
sudo usermod -aG docker $USER

# Verificar instalação
docker --version
docker compose version
```

**⚠️ IMPORTANTE**: Após adicionar seu usuário ao grupo docker, faça logout e login novamente (ou execute `newgrp docker`).

---

## ETAPA 2: Verificar Versão da Evolution API v2.x

**⚠️ CRÍTICO**: Sempre use a versão v2.x mais recente estável.

### Consultar versão mais recente:

1. Acesse: https://hub.docker.com/r/atendai/evolution-api/tags
2. Procure pela tag mais recente da série v2.x (ex: `v2.3.x`, `v2.4.x`)
3. Ou consulte a documentação oficial: https://doc.evolution-api.com/v2/

**Exemplo de tag**: `atendai/evolution-api:v2.3.0` (ajustar conforme versão mais recente)

---

## ETAPA 3: Criar docker-compose.yml

Crie um diretório para a Evolution API:

```bash
mkdir -p ~/evolution-api
cd ~/evolution-api
```

Crie o arquivo `docker-compose.yml`:

**Como criar o arquivo:**

Você tem algumas opções. A mais simples é usar o editor `nano`:

```bash
nano docker-compose.yml
```

Isso vai abrir o editor nano. Cole o conteúdo abaixo (use `Ctrl+Shift+V` para colar no terminal, ou botão direito → Paste).

⚠️ **Se aparecerem blocos vermelhos no editor**: Isso geralmente indica comentários inline problemáticos. Use a versão limpa do arquivo `docker-compose.yml.example` ou consulte `CORRECAO-DOCKER-COMPOSE.md` para uma versão sem erros.

**Conteúdo do arquivo `docker-compose.yml` (versão com comentários):**

```yaml
version: '3.8'

services:
  evolution-api:
    image: atendai/evolution-api:v2.2.3
    container_name: evolution-api
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      # Autenticação - AUTHENTICATION_API_KEY é a variável interna da Evolution API
      # ${EVOLUTION_API_APIKEY} vem do arquivo .env (padronizado com Vercel)
      - AUTHENTICATION_API_KEY=${EVOLUTION_API_APIKEY}
      
      # Servidor
      - SERVER_TYPE=http
      - SERVER_PORT=8080
      - SERVER_URL=http://localhost:8080
      
      # CORS
      - CORS_ORIGIN=*
      - CORS_METHODS=POST,GET,PUT,DELETE
      - CORS_CREDENTIALS=true
      
      # Logs
      - LOG_LEVEL=ERROR,WARN,DEBUG,INFO
      - LOG_COLOR=true
      
      # Webhook - será configurado após deploy na Vercel
      - WEBHOOK_GLOBAL_URL=https://seu-projeto.vercel.app/api/whatsapp/webhook
      - WEBHOOK_GLOBAL_ENABLED=true
      - WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=true
      - WEBHOOK_GLOBAL_EVENTS=MESSAGES_UPSERT
      
      # Timezone
      - TZ=America/Sao_Paulo
      
      # ⚠️ Se a doc v2 exigir banco de dados (Postgres/Redis), adicionar aqui
      # Exemplo (CONFIRMAR na doc):
      # - DATABASE_ENABLED=true
      # - DATABASE_PROVIDER=postgresql
      # - DATABASE_CONNECTION_URI=postgresql://user:pass@postgres:5432/evolution
      
    volumes:
      - evolution_instances:/evolution/instances
      - evolution_store:/evolution/store
    
    # ⚠️ Se a doc exigir banco, descomentar e configurar:
    # depends_on:
    #   - postgres
    # networks:
    #   - evolution-network

# ⚠️ Se a doc exigir banco, adicionar serviço aqui:
# services:
#   postgres:
#     image: postgres:15
#     environment:
#       POSTGRES_DB: evolution
#       POSTGRES_USER: evolution
#       POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
#     volumes:
#       - postgres_data:/var/lib/postgresql/data
#     networks:
#       - evolution-network

volumes:
  evolution_instances:
  evolution_store:
```

**⚠️ Se aparecerem blocos vermelhos no editor:**

Alguns editores não gostam de comentários inline no YAML. Use esta **versão limpa** (sem comentários inline):

```yaml
version: '3.8'

services:
  evolution-api:
    image: atendai/evolution-api:v2.2.3
    container_name: evolution-api
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - AUTHENTICATION_API_KEY=${EVOLUTION_API_APIKEY}
      - SERVER_TYPE=http
      - SERVER_PORT=8080
      - SERVER_URL=http://localhost:8080
      - CORS_ORIGIN=*
      - CORS_METHODS=POST,GET,PUT,DELETE
      - CORS_CREDENTIALS=true
      - LOG_LEVEL=ERROR,WARN,DEBUG,INFO
      - LOG_COLOR=true
      - WEBHOOK_GLOBAL_URL=https://seu-projeto.vercel.app/api/whatsapp/webhook
      - WEBHOOK_GLOBAL_ENABLED=true
      - WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=true
      - WEBHOOK_GLOBAL_EVENTS=MESSAGES_UPSERT
      - TZ=America/Sao_Paulo
      - DATABASE_ENABLED=true
      - DATABASE_PROVIDER=postgresql
      - DATABASE_CONNECTION_URI=postgresql://postgres:postgres@192.168.15.31:5432/sonia_db
    volumes:
      - evolution_instances:/evolution/instances
      - evolution_store:/evolution/store

volumes:
  evolution_instances:
  evolution_store:
```

**Após colar o conteúdo:**

1. Pressione `Ctrl + O` para salvar (Write Out)
2. Pressione `Enter` para confirmar o nome do arquivo
3. Pressione `Ctrl + X` para sair do editor

**Alternativa - Criar arquivo direto com echo/cat:**

Se preferir, você pode criar o arquivo de outra forma:

```bash
# Opção 1: Usar cat (mais fácil para arquivos grandes)
cat > docker-compose.yml << 'EOF'
# Cole todo o conteúdo YAML aqui
EOF

# Opção 2: Usar vim (se você souber usar)
vim docker-compose.yml
```

**Verificar se o arquivo foi criado:**

```bash
ls -la docker-compose.yml
cat docker-compose.yml  # Ver o conteúdo
```

---

### Criar arquivo .env (opcional, mas recomendado):

```bash
nano .env
```

Adicione **exatamente** assim (IMPORTANTE: nome da variável ANTES do `=`, valor DEPOIS):

```bash
EVOLUTION_API_APIKEY=sua_chave_secreta_aqui_gerar_uma_chave_forte
```

**⚠️ ATENÇÃO - Formato correto:**
- ✅ `EVOLUTION_API_APIKEY=valor_da_chave` (correto)
- ❌ `valor_da_chave` (ERRADO - falta o nome da variável)
- ❌ `EVOLUTION_API_APIKEY = valor` (ERRADO - não use espaços ao redor do `=`)

**Gerar chave segura e criar arquivo automaticamente:**

```bash
# Gerar chave e criar arquivo .env corretamente
echo "EVOLUTION_API_APIKEY=$(openssl rand -base64 32)" > .env

# Verificar se ficou correto
cat .env
```

**Ou gerar manualmente:**

```bash
# Gerar chave
openssl rand -base64 32

# Copiar a chave gerada e colar no arquivo .env após o =
# Formato: EVOLUTION_API_APIKEY=chave_gerada_aqui
```

**Verificar se o arquivo está correto:**

```bash
cat .env
# Deve mostrar: EVOLUTION_API_APIKEY=LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs=
# (com o nome da variável ANTES do =)
```

---

## ETAPA 4: Subir os Containers

```bash
# Subir em background
docker compose up -d

# Verificar se subiu corretamente
docker ps

# Ver logs
docker logs evolution-api -f
```

### Verificar se a API está respondendo:

```bash
# Health check (ajustar endpoint conforme doc v2)
curl http://localhost:8080/health
# ou
curl http://localhost:8080/
```

**⚠️ IMPORTANTE**: Consulte a documentação v2 para o endpoint exato de health check.

---

## ETAPA 5: Configurar Nginx (Proxy Reverso)

### Instalar Nginx:

```bash
sudo apt update
sudo apt install -y nginx
```

### Criar configuração:

```bash
sudo nano /etc/nginx/sites-available/evolution-api
```

Adicione:

```nginx
server {
    listen 80;
    server_name evolution.sonia.onsmart.ai;  # ⚠️ Ajustar para seu domínio

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name evolution.sonia.onsmart.ai;  # ⚠️ Ajustar para seu domínio

    # Certificado SSL (será configurado pelo Certbot)
    ssl_certificate /etc/letsencrypt/live/evolution.sonia.onsmart.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/evolution.sonia.onsmart.ai/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Headers
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Proxy para Evolution API
    location / {
        proxy_pass http://localhost:8080;  # Porta do container
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Habilitar site:

```bash
sudo ln -s /etc/nginx/sites-available/evolution-api /etc/nginx/sites-enabled/
sudo nginx -t  # Testar configuração
sudo systemctl reload nginx
```

---

## ETAPA 6: Configurar SSL com Let's Encrypt

### Instalar Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Obter certificado:

```bash
sudo certbot --nginx -d evolution.sonia.onsmart.ai
```

Siga as instruções do Certbot. O certificado será renovado automaticamente.

### Verificar renovação automática:

```bash
sudo certbot renew --dry-run
```

---

## ETAPA 7: Atualizar docker-compose.yml com URL correta

Após configurar o domínio, atualize o `docker-compose.yml`:

```yaml
- SERVER_URL=https://evolution.sonia.onsmart.ai
```

E reinicie o container:

```bash
docker compose restart
```

---

## ETAPA 8: Criar Instância do WhatsApp

**⚠️ IMPORTANTE**: Consulte a documentação v2 para os endpoints exatos.

### Exemplo (AJUSTAR conforme doc v2):

```bash
# Criar instância
curl -X POST https://evolution.sonia.onsmart.ai/instance/create \
  -H "apikey: sua_chave_api" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "sonia-whatsapp",
    "token": "token_opcional_se_necessario",
    "qrcode": true
  }'
```

### Obter QR Code:

```bash
curl -X GET https://evolution.sonia.onsmart.ai/instance/connect/sonia-whatsapp \
  -H "apikey: sua_chave_api"
```

Escaneie o QR Code com o WhatsApp que será usado pela Sonia.

### Verificar status:

```bash
curl -X GET https://evolution.sonia.onsmart.ai/instance/fetchInstances \
  -H "apikey: sua_chave_api"
```

---

## ETAPA 9: Configurar Webhook

Após o webhook estar funcionando na Vercel, configure na Evolution API:

```bash
curl -X POST https://evolution.sonia.onsmart.ai/webhook/set/sonia-whatsapp \
  -H "apikey: sua_chave_api" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://seu-projeto.vercel.app/api/whatsapp/webhook",
    "webhook_by_events": true,
    "events": ["MESSAGES_UPSERT"]  # ⚠️ Confirmar nome exato na doc v2
  }'
```

---

## Troubleshooting

### Ver logs do container:

```bash
docker logs evolution-api -f
```

### Reiniciar container:

```bash
docker compose restart
```

### Parar e remover tudo:

```bash
docker compose down -v
```

### Verificar portas em uso:

```bash
sudo netstat -tulpn | grep :8080
```

---

## Próximos Passos

1. ✅ Evolution API instalada e rodando
2. ✅ Domínio configurado com SSL
3. ✅ Instância do WhatsApp criada e conectada
4. ⏭️ Atualizar variáveis de ambiente na Vercel
5. ⏭️ Testar webhook com Postman
6. ⏭️ Testar fluxo completo

---

## Referências

- Documentação Evolution API v2: https://doc.evolution-api.com/v2/
- Docker Hub: https://hub.docker.com/r/atendai/evolution-api
- Postman Collection: Consultar na documentação oficial

