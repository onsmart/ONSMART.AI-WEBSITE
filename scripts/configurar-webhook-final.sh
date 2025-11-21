#!/bin/bash

# Script para configurar webhook recriando a instância
# Como o endpoint de webhook não existe, recriamos a instância com webhook

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
WEBHOOK_URL="${WEBHOOK_URL:-https://onsmart.ai/api/evolution-webhook}"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  Configurar Webhook - Recriar Instância${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📋 Configurações:${NC}"
echo "  Instância: $INSTANCE_NAME"
echo "  Webhook URL: $WEBHOOK_URL"
echo ""

# 1. Verificar status atual
echo -e "${BLUE}🔍 Verificando instância atual...${NC}"
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

INSTANCE_EXISTS=$(echo "$STATUS_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\")" 2>/dev/null || echo "null")

if [ "$INSTANCE_EXISTS" != "null" ] && [ -n "$INSTANCE_EXISTS" ]; then
    CURRENT_STATUS=$(echo "$INSTANCE_EXISTS" | jq -r '.instance.status')
    echo -e "${GREEN}✅ Instância encontrada. Status: $CURRENT_STATUS${NC}"
    echo ""
    
    if [ "$CURRENT_STATUS" == "open" ]; then
        echo -e "${YELLOW}⚠️  A instância está conectada (status: open)${NC}"
        echo -e "${YELLOW}💡 Você precisará escanear o QR code novamente após recriar${NC}"
        echo ""
        read -p "Deseja continuar? (s/N): " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Ss]$ ]]; then
            echo -e "${YELLOW}Operação cancelada${NC}"
            exit 0
        fi
    fi
else
    echo -e "${YELLOW}⚠️  Instância não encontrada. Será criada nova.${NC}"
fi

# 2. Deletar instância existente
echo ""
echo -e "${BLUE}🗑️  Deletando instância existente...${NC}"
DELETE_RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE "$EVOLUTION_API_URL/instance/delete/$INSTANCE_NAME" \
    -H "apikey: $EVOLUTION_API_KEY")

DELETE_CODE=$(echo "$DELETE_RESPONSE" | tail -n1)
DELETE_BODY=$(echo "$DELETE_RESPONSE" | sed '$d')

if [ "$DELETE_CODE" == "200" ] || [ "$DELETE_CODE" == "201" ] || [ "$DELETE_CODE" == "404" ]; then
    echo -e "${GREEN}✅ Instância deletada (ou não existia)${NC}"
else
    echo -e "${YELLOW}⚠️  Status HTTP: $DELETE_CODE${NC}"
    echo "$DELETE_BODY" | jq '.' 2>/dev/null || echo "$DELETE_BODY"
fi

sleep 2

# 3. Criar instância com webhook
echo ""
echo -e "${BLUE}🆕 Criando instância com webhook...${NC}"
CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$EVOLUTION_API_URL/instance/create" \
    -H "apikey: $EVOLUTION_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
        \"instanceName\": \"$INSTANCE_NAME\",
        \"qrcode\": true,
        \"integration\": \"WHATSAPP-BAILEYS\",
        \"webhook\": \"$WEBHOOK_URL\"
    }")

CREATE_CODE=$(echo "$CREATE_RESPONSE" | tail -n1)
CREATE_BODY=$(echo "$CREATE_RESPONSE" | sed '$d')

if [ "$CREATE_CODE" == "200" ] || [ "$CREATE_CODE" == "201" ]; then
    echo -e "${GREEN}✅ Instância criada com webhook!${NC}"
    echo "$CREATE_BODY" | jq '.' 2>/dev/null || echo "$CREATE_BODY"
else
    echo -e "${RED}❌ Erro ao criar instância (HTTP $CREATE_CODE)${NC}"
    echo "$CREATE_BODY" | jq '.' 2>/dev/null || echo "$CREATE_BODY"
    exit 1
fi

sleep 3

# 4. Verificar se webhook foi configurado
echo ""
echo -e "${BLUE}🔍 Verificando configuração do webhook...${NC}"
VERIFY_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

INSTANCE_DATA=$(echo "$VERIFY_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\")" 2>/dev/null)

if [ -n "$INSTANCE_DATA" ] && [ "$INSTANCE_DATA" != "null" ]; then
    WEBHOOK_CONFIG=$(echo "$INSTANCE_DATA" | jq -r '.instance.webhook // .webhook // "N/A"')
    STATUS=$(echo "$INSTANCE_DATA" | jq -r '.instance.status')
    
    echo -e "${GREEN}✅ Status da instância: $STATUS${NC}"
    
    if [ "$WEBHOOK_CONFIG" != "N/A" ] && [ "$WEBHOOK_CONFIG" != "null" ] && [ -n "$WEBHOOK_CONFIG" ]; then
        echo -e "${GREEN}✅ Webhook configurado: $WEBHOOK_CONFIG${NC}"
    else
        echo -e "${YELLOW}⚠️  Webhook não aparece na resposta, mas pode estar configurado internamente${NC}"
    fi
else
    echo -e "${RED}❌ Instância não encontrada após criação${NC}"
    exit 1
fi

# 5. Obter QR Code se necessário
if [ "$STATUS" != "open" ]; then
    echo ""
    echo -e "${BLUE}📱 Obtendo QR Code...${NC}"
    QR_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    QR_BASE64=$(echo "$QR_RESPONSE" | jq -r '.qrcode.base64' 2>/dev/null)
    
    if [ "$QR_BASE64" != "null" ] && [ -n "$QR_BASE64" ]; then
        QR_BASE64=$(echo "$QR_BASE64" | sed 's/data:image\/png;base64,//')
        echo "$QR_BASE64" | base64 -d > "qrcode-${INSTANCE_NAME}.png" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ QR Code salvo em: qrcode-${INSTANCE_NAME}.png${NC}"
            echo -e "${BLUE}💡 Transfira o arquivo para seu computador e escaneie com o WhatsApp${NC}"
        fi
    fi
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Configuração concluída!${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📝 Próximos passos:${NC}"
echo "  1. Se necessário, escaneie o QR Code para conectar o WhatsApp"
echo "  2. Envie uma mensagem de teste para o número conectado"
echo "  3. Verifique os logs no Vercel:"
echo "     https://vercel.com/on-smart-admins-projects/onsmart-website"
echo "     → Deployments → deployment mais recente"
echo "     → Functions → evolution-webhook"
echo ""

