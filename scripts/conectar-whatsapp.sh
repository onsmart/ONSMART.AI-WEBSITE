#!/bin/bash

# Script para conectar instância do WhatsApp e gerar QR Code
# Uso: ./conectar-whatsapp.sh [nome-da-instancia]

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Configurações
INSTANCE_NAME="${1:-sonia-whatsapp}"
EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  Conectar WhatsApp - Gerar QR Code${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

# 1. Verificar status atual
echo -e "${BLUE}📊 Verificando status atual...${NC}"
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

INSTANCE_DATA=$(echo "$STATUS_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\")" 2>/dev/null)

if [ -z "$INSTANCE_DATA" ] || [ "$INSTANCE_DATA" == "null" ]; then
    echo -e "${RED}❌ Instância '$INSTANCE_NAME' não encontrada!${NC}"
    echo ""
    echo -e "${YELLOW}💡 Criando instância...${NC}"
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
    
    echo -e "${GREEN}✅ Instância criada!${NC}"
    sleep 3
else
    CURRENT_STATUS=$(echo "$INSTANCE_DATA" | jq -r '.instance.status')
    echo -e "${GREEN}✅ Status atual: $CURRENT_STATUS${NC}"
fi

echo ""

# 2. Conectar instância (muda status de "close" para "connecting" ou "qrcode")
echo -e "${BLUE}🔗 Conectando instância...${NC}"
CONNECT_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" \
    -H "apikey: $EVOLUTION_API_KEY")

# Verificar se há erro
if echo "$CONNECT_RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
    echo -e "${RED}❌ Erro ao conectar:${NC}"
    echo "$CONNECT_RESPONSE" | jq '.'
    exit 1
fi

echo -e "${GREEN}✅ Instância conectada!${NC}"
echo ""

# 3. Verificar novo status
echo -e "${BLUE}📊 Verificando novo status...${NC}"
sleep 2
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

NEW_STATUS=$(echo "$STATUS_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\") | .instance.status" 2>/dev/null)
echo -e "${GREEN}✅ Novo status: $NEW_STATUS${NC}"
echo ""

# 4. Obter QR Code
echo -e "${BLUE}📱 Obtendo QR Code...${NC}"
QR_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" \
    -H "apikey: $EVOLUTION_API_KEY")

QR_BASE64=$(echo "$QR_RESPONSE" | jq -r '.qrcode.base64' 2>/dev/null)

if [ "$QR_BASE64" == "null" ] || [ -z "$QR_BASE64" ]; then
    echo -e "${YELLOW}⚠️  QR Code ainda não disponível.${NC}"
    echo -e "${YELLOW}💡 Aguarde alguns segundos e execute novamente:${NC}"
    echo "   curl -X GET \"$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME\" -H \"apikey: $EVOLUTION_API_KEY\" | jq -r '.qrcode.base64' | sed 's/data:image\\/png;base64,//' | base64 -d > qrcode.png"
    echo ""
    echo -e "${BLUE}📄 Resposta atual:${NC}"
    echo "$QR_RESPONSE" | jq '.'
    exit 1
fi

# Remover prefixo se existir
QR_BASE64=$(echo "$QR_BASE64" | sed 's/data:image\/png;base64,//')

# 5. Salvar QR Code
echo -e "${BLUE}💾 Salvando QR Code...${NC}"
echo "$QR_BASE64" | base64 -d > "qrcode-${INSTANCE_NAME}.png" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ QR Code salvo em: qrcode-${INSTANCE_NAME}.png${NC}"
    echo ""
    echo -e "${GREEN}📱 Próximos passos:${NC}"
    echo "  1. Transfira o arquivo qrcode-${INSTANCE_NAME}.png para seu computador"
    echo "  2. Abra o WhatsApp no celular"
    echo "  3. Vá em Configurações > Aparelhos conectados > Conectar um aparelho"
    echo "  4. Escaneie o QR Code"
    echo ""
    echo -e "${BLUE}💡 Para transferir o arquivo:${NC}"
    echo "  scp servidoronsmart@seu-servidor:~/qrcode-${INSTANCE_NAME}.png ./"
    echo ""
else
    echo -e "${RED}❌ Erro ao salvar QR Code${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Concluído!${NC}"

