#!/bin/bash

# Script para gerar QR Code do WhatsApp
# Uso: ./gerar-qrcode.sh [nome-da-instancia]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
INSTANCE_NAME="${1:-sonia-whatsapp}"
EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  Gerador de QR Code - WhatsApp${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

# Verificar se jq está instalado
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq não está instalado. Instalando...${NC}"
    sudo apt-get update && sudo apt-get install -y jq
fi

echo -e "${BLUE}📋 Configurações:${NC}"
echo "  Instância: $INSTANCE_NAME"
echo "  API URL: $EVOLUTION_API_URL"
echo ""

# 1. Verificar status da instância
echo -e "${BLUE}🔍 Verificando status da instância...${NC}"
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

INSTANCE_STATUS=$(echo "$STATUS_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\") | .instance.status" 2>/dev/null || echo "null")

if [ "$INSTANCE_STATUS" == "null" ] || [ -z "$INSTANCE_STATUS" ]; then
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
    sleep 2
fi

echo -e "${GREEN}✅ Status da instância: $INSTANCE_STATUS${NC}"
echo ""

# 2. Conectar instância e obter QR Code
echo -e "${BLUE}🔗 Conectando instância e obtendo QR Code...${NC}"
QR_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" \
    -H "apikey: $EVOLUTION_API_KEY")

# Verificar se há erro
if echo "$QR_RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
    echo -e "${RED}❌ Erro ao obter QR Code:${NC}"
    echo "$QR_RESPONSE" | jq '.'
    exit 1
fi

# Extrair QR Code base64
QR_BASE64=$(echo "$QR_RESPONSE" | jq -r '.qrcode.base64' 2>/dev/null)

if [ "$QR_BASE64" == "null" ] || [ -z "$QR_BASE64" ]; then
    echo -e "${YELLOW}⚠️  QR Code não disponível na resposta.${NC}"
    echo ""
    echo -e "${BLUE}📄 Resposta completa:${NC}"
    echo "$QR_RESPONSE" | jq '.'
    exit 1
fi

# Remover prefixo data:image/png;base64, se existir
QR_BASE64=$(echo "$QR_BASE64" | sed 's/data:image\/png;base64,//')

# 3. Salvar QR Code como imagem
echo -e "${BLUE}💾 Salvando QR Code...${NC}"
echo "$QR_BASE64" | base64 -d > "qrcode-${INSTANCE_NAME}.png" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ QR Code salvo em: qrcode-${INSTANCE_NAME}.png${NC}"
    echo ""
    
    # Tentar abrir a imagem (se estiver em ambiente gráfico)
    if command -v xdg-open &> /dev/null; then
        echo -e "${BLUE}🖼️  Tentando abrir a imagem...${NC}"
        xdg-open "qrcode-${INSTANCE_NAME}.png" 2>/dev/null || true
    elif command -v open &> /dev/null; then
        echo -e "${BLUE}🖼️  Tentando abrir a imagem...${NC}"
        open "qrcode-${INSTANCE_NAME}.png" 2>/dev/null || true
    fi
    
    echo ""
    echo -e "${GREEN}📱 Instruções:${NC}"
    echo "  1. Abra o arquivo qrcode-${INSTANCE_NAME}.png"
    echo "  2. Abra o WhatsApp no seu celular"
    echo "  3. Vá em Configurações > Aparelhos conectados > Conectar um aparelho"
    echo "  4. Escaneie o QR Code"
    echo ""
else
    echo -e "${RED}❌ Erro ao salvar QR Code${NC}"
    echo ""
    echo -e "${YELLOW}💡 QR Code base64 (copie e cole em um decodificador online):${NC}"
    echo "$QR_BASE64" | head -c 100
    echo "..."
    exit 1
fi

echo -e "${GREEN}✅ Concluído!${NC}"

