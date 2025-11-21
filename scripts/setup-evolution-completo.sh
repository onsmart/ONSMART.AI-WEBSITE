#!/bin/bash

# Script completo para configurar Evolution API + QR Code + Conexão WhatsApp
# Uso: ./setup-evolution-completo.sh [webhook-url]

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Configurações
INSTANCE_NAME="sonia-whatsapp"
EVOLUTION_API_URL="http://localhost:8080"
EVOLUTION_API_KEY="nsinONBASObjsbJBAJJkdopJIPAHUOBAIni"
WEBHOOK_URL="${1:-https://www.onsmart.ai/api/evolution-webhook}"

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Setup Completo: Evolution API + WhatsApp + Sônia${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar dependências
echo -e "${BLUE}📦 Verificando dependências...${NC}"
if ! command_exists docker; then
    echo -e "${RED}❌ Docker não está instalado!${NC}"
    echo -e "${YELLOW}💡 Instale o Docker primeiro:${NC}"
    echo "   curl -fsSL https://get.docker.com -o get-docker.sh"
    echo "   sudo sh get-docker.sh"
    exit 1
fi

if ! command_exists jq; then
    echo -e "${YELLOW}⚠️  jq não está instalado. Instalando...${NC}"
    if command_exists apt-get; then
        sudo apt-get update && sudo apt-get install -y jq
    elif command_exists yum; then
        sudo yum install -y jq
    else
        echo -e "${RED}❌ Não foi possível instalar jq automaticamente.${NC}"
        echo -e "${YELLOW}💡 Instale manualmente: sudo apt-get install jq${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Dependências OK${NC}"
echo ""

# Passo 1: Parar e remover container existente
echo -e "${BLUE}🛑 Parando container existente (se houver)...${NC}"
docker stop evolution_api 2>/dev/null || true
docker rm evolution_api 2>/dev/null || true
echo -e "${GREEN}✅ Container removido${NC}"
echo ""

# Passo 2: Criar e iniciar container
echo -e "${BLUE}🚀 Criando e iniciando container Evolution API...${NC}"
docker run -d \
  --name evolution_api \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY="$EVOLUTION_API_KEY" \
  -e TZ=America/Sao_Paulo \
  -e DOCKER_ENV=true \
  -e SERVER_TYPE=http \
  -e SERVER_PORT=8080 \
  -e SERVER_URL=http://localhost:8080 \
  -e CORS_ORIGIN=* \
  -e CORS_METHODS=POST,GET,PUT,DELETE \
  -e CORS_CREDENTIALS=true \
  -e LOG_LEVEL=ERROR,WARN,DEBUG,INFO,LOG,VERBOSE,DARK,WEBHOOKS \
  -e LOG_COLOR=true \
  -e LOG_BAILEYS=error \
  -e DEL_INSTANCE=false \
  -e DEL_TEMP_INSTANCES=true \
  -e STORE_MESSAGES=true \
  -e STORE_MESSAGE_UP=true \
  -e STORE_CONTACTS=true \
  -e STORE_CHATS=true \
  -e CLEAN_STORE_CLEANING_INTERVAL=7200 \
  -e CLEAN_STORE_MESSAGES=true \
  -e CLEAN_STORE_MESSAGE_UP=true \
  -e CLEAN_STORE_CONTACTS=true \
  -e CLEAN_STORE_CHATS=true \
  -e DATABASE_ENABLED=false \
  -e DATABASE_PROVIDER=CHATGPT \
  -e DATABASE_CONNECTION_URI="" \
  -e DATABASE_CONNECTION_DB_PREFIX_NAME=evolution \
  -e DATABASE_SAVE_DATA_INSTANCE=false \
  -e DATABASE_SAVE_DATA_NEW_MESSAGE=false \
  -e DATABASE_SAVE_MESSAGE_UPDATE=false \
  -e DATABASE_SAVE_DATA_CONTACTS=false \
  -e DATABASE_SAVE_DATA_CHATS=false \
  -e RABBITMQ_ENABLED=false \
  atendai/evolution-api:v1.8.2

echo -e "${GREEN}✅ Container criado${NC}"
echo ""

# Passo 3: Aguardar API inicializar
echo -e "${BLUE}⏳ Aguardando Evolution API inicializar (20 segundos)...${NC}"
sleep 20

# Verificar se API está respondendo
echo -e "${BLUE}🔍 Verificando se API está respondendo...${NC}"
MAX_RETRIES=5
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
        -H "apikey: $EVOLUTION_API_KEY" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ API está respondendo${NC}"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            echo -e "${YELLOW}⏳ Aguardando mais 5 segundos... ($RETRY_COUNT/$MAX_RETRIES)${NC}"
            sleep 5
        else
            echo -e "${RED}❌ API não está respondendo após $MAX_RETRIES tentativas${NC}"
            echo -e "${YELLOW}💡 Verifique os logs: docker logs evolution_api${NC}"
            exit 1
        fi
    fi
done

echo ""

# Passo 4: Verificar se instância já existe
echo -e "${BLUE}📊 Verificando instância existente...${NC}"
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

INSTANCE_EXISTS=$(echo "$STATUS_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\")" 2>/dev/null)

if [ -n "$INSTANCE_EXISTS" ] && [ "$INSTANCE_EXISTS" != "null" ]; then
    CURRENT_STATUS=$(echo "$INSTANCE_EXISTS" | jq -r '.instance.status')
    echo -e "${GREEN}✅ Instância '$INSTANCE_NAME' já existe (status: $CURRENT_STATUS)${NC}"
    
    if [ "$CURRENT_STATUS" == "open" ]; then
        echo -e "${GREEN}🎉 WhatsApp já está conectado!${NC}"
        echo ""
        echo -e "${YELLOW}💡 Se quiser reconectar, delete a instância primeiro:${NC}"
        echo "   curl -X DELETE \"$EVOLUTION_API_URL/instance/delete/$INSTANCE_NAME\" -H \"apikey: $EVOLUTION_API_KEY\""
        exit 0
    fi
else
    # Passo 5: Criar instância
    echo -e "${BLUE}📦 Criando instância '$INSTANCE_NAME'...${NC}"
    CREATE_RESPONSE=$(curl -s -X POST "$EVOLUTION_API_URL/instance/create" \
        -H "apikey: $EVOLUTION_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"instanceName\": \"$INSTANCE_NAME\",
            \"qrcode\": true,
            \"integration\": \"WHATSAPP-BAILEYS\"
        }")
    
    if echo "$CREATE_RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
        echo -e "${RED}❌ Erro ao criar instância:${NC}"
        echo "$CREATE_RESPONSE" | jq '.'
        exit 1
    fi
    
    echo -e "${GREEN}✅ Instância criada${NC}"
    sleep 3
fi

echo ""

# Passo 6: Configurar webhook
echo -e "${BLUE}🔗 Configurando webhook...${NC}"
echo -e "${YELLOW}   URL: $WEBHOOK_URL${NC}"

WEBHOOK_RESPONSE=$(curl -s -X PUT "$EVOLUTION_API_URL/webhook/set/$INSTANCE_NAME" \
    -H "apikey: $EVOLUTION_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
        \"url\": \"$WEBHOOK_URL\",
        \"webhook_by_events\": true,
        \"webhook_base64\": false,
        \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
    }")

if echo "$WEBHOOK_RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
    echo -e "${RED}❌ Erro ao configurar webhook:${NC}"
    echo "$WEBHOOK_RESPONSE" | jq '.'
    exit 1
fi

echo -e "${GREEN}✅ Webhook configurado${NC}"
echo ""

# Passo 7: Conectar instância
echo -e "${BLUE}🔗 Conectando instância...${NC}"
CONNECT_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" \
    -H "apikey: $EVOLUTION_API_KEY")

if echo "$CONNECT_RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
    echo -e "${RED}❌ Erro ao conectar:${NC}"
    echo "$CONNECT_RESPONSE" | jq '.'
    exit 1
fi

echo -e "${GREEN}✅ Instância conectada${NC}"
echo ""

# Passo 8: Aguardar QR Code estar disponível
echo -e "${BLUE}⏳ Aguardando QR Code estar disponível...${NC}"
sleep 5

# Passo 9: Obter QR Code
echo -e "${BLUE}📱 Obtendo QR Code...${NC}"
QR_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" \
    -H "apikey: $EVOLUTION_API_KEY")

QR_BASE64=$(echo "$QR_RESPONSE" | jq -r '.qrcode.base64' 2>/dev/null)

if [ "$QR_BASE64" == "null" ] || [ -z "$QR_BASE64" ]; then
    echo -e "${YELLOW}⚠️  QR Code ainda não disponível${NC}"
    echo -e "${YELLOW}💡 Aguarde alguns segundos e execute:${NC}"
    echo "   curl -X GET \"$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME\" -H \"apikey: $EVOLUTION_API_KEY\" | jq -r '.qrcode.base64' | sed 's/data:image\\/png;base64,//' | base64 -d > qrcode.png"
    exit 1
fi

# Remover prefixo se existir
QR_BASE64=$(echo "$QR_BASE64" | sed 's/data:image\/png;base64,//')

# Salvar QR Code
QR_FILE="qrcode-${INSTANCE_NAME}.png"
echo "$QR_BASE64" | base64 -d > "$QR_FILE" 2>/dev/null

if [ $? -eq 0 ] && [ -f "$QR_FILE" ]; then
    echo -e "${GREEN}✅ QR Code salvo em: $QR_FILE${NC}"
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  ✅ Setup Completo!${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${BLUE}📱 Próximos passos:${NC}"
    echo ""
    echo -e "1. ${YELLOW}Transfira o QR Code para seu computador:${NC}"
    echo "   scp $(whoami)@$(hostname):~/$QR_FILE ./"
    echo ""
    echo -e "2. ${YELLOW}OU use o chat da Sônia:${NC}"
    echo "   - Acesse: https://www.onsmart.ai"
    echo "   - Abra o chat da Sônia"
    echo "   - Clique no ícone do WhatsApp"
    echo "   - Escaneie o QR Code"
    echo ""
    echo -e "3. ${YELLOW}Verificar status:${NC}"
    echo "   curl -X GET \"$EVOLUTION_API_URL/instance/fetchInstances\" -H \"apikey: $EVOLUTION_API_KEY\" | jq '.[] | select(.instance.instanceName == \"$INSTANCE_NAME\") | .instance.status'"
    echo ""
    echo -e "${GREEN}🎉 Pronto! Escaneie o QR Code para conectar o WhatsApp!${NC}"
else
    echo -e "${RED}❌ Erro ao salvar QR Code${NC}"
    exit 1
fi

