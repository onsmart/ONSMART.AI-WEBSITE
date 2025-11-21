#!/bin/bash

# Script para testar a integração WhatsApp
# Execute no servidor

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
WEBHOOK_URL="${WEBHOOK_URL:-https://onsmart-website-kmressbou-on-smart-admins-projects.vercel.app/api/evolution-webhook}"

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}  Teste de Integração WhatsApp${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""

# 1. Verificar status
echo -e "${BLUE}🔍 1. Verificando status da instância...${NC}"
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

INSTANCE_DATA=$(echo "$STATUS_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\")" 2>/dev/null)

if [ -z "$INSTANCE_DATA" ] || [ "$INSTANCE_DATA" == "null" ]; then
    echo -e "${RED}❌ Instância '$INSTANCE_NAME' não encontrada!${NC}"
    exit 1
fi

STATUS=$(echo "$INSTANCE_DATA" | jq -r '.instance.status')
PHONE=$(echo "$INSTANCE_DATA" | jq -r '.instance.phone // "N/A"')

if [ "$STATUS" != "open" ]; then
    echo -e "${RED}❌ Instância não está conectada! Status: $STATUS${NC}"
    echo -e "${YELLOW}💡 Execute: ./conectar-whatsapp.sh${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Status: $STATUS${NC}"
echo -e "${GREEN}✅ Número: $PHONE${NC}"
echo ""

# 2. Verificar webhook
echo -e "${BLUE}🔗 2. Verificando webhook...${NC}"
WEBHOOK_CONFIG=$(echo "$INSTANCE_DATA" | jq -r '.instance.webhook // .webhook // "N/A"')

if [ "$WEBHOOK_CONFIG" == "N/A" ] || [ -z "$WEBHOOK_CONFIG" ] || [ "$WEBHOOK_CONFIG" == "null" ]; then
    echo -e "${YELLOW}⚠️  Webhook não configurado!${NC}"
    echo -e "${YELLOW}💡 Configurando webhook...${NC}"
    
    # Tentar configurar webhook
    WEBHOOK_RESPONSE=$(curl -s -X PUT "$EVOLUTION_API_URL/webhook/set/$INSTANCE_NAME" \
        -H "apikey: $EVOLUTION_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"url\": \"$WEBHOOK_URL\",
            \"webhook_by_events\": true,
            \"webhook_base64\": false,
            \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
        }" 2>/dev/null)
    
    if echo "$WEBHOOK_RESPONSE" | jq -e '.error' > /dev/null 2>&1; then
        echo -e "${RED}❌ Erro ao configurar webhook:${NC}"
        echo "$WEBHOOK_RESPONSE" | jq '.'
        echo ""
        echo -e "${YELLOW}💡 Configure manualmente usando:${NC}"
        echo "   curl -X PUT \"$EVOLUTION_API_URL/webhook/set/$INSTANCE_NAME\" \\"
        echo "     -H \"apikey: $EVOLUTION_API_KEY\" \\"
        echo "     -H \"Content-Type: application/json\" \\"
        echo "     -d '{\"url\": \"$WEBHOOK_URL\"}'"
    else
        echo -e "${GREEN}✅ Webhook configurado!${NC}"
    fi
else
    echo -e "${GREEN}✅ Webhook configurado: $WEBHOOK_CONFIG${NC}"
fi
echo ""

# 3. Testar webhook do Vercel
echo -e "${BLUE}🌐 3. Testando webhook do Vercel...${NC}"
WEBHOOK_TEST=$(curl -s -X GET "$WEBHOOK_URL" 2>/dev/null || echo "ERROR")

if [ "$WEBHOOK_TEST" == "ERROR" ]; then
    echo -e "${RED}❌ Webhook do Vercel não está acessível!${NC}"
    echo -e "${YELLOW}💡 Verifique se a URL está correta: $WEBHOOK_URL${NC}"
else
    echo -e "${GREEN}✅ Webhook acessível: $WEBHOOK_TEST${NC}"
fi
echo ""

# 4. Resumo
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Tudo pronto para testar!${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}📱 Número do WhatsApp:${NC} $PHONE"
echo ""
echo -e "${BLUE}📝 Próximos passos:${NC}"
echo "  1. Abra o WhatsApp no seu celular"
echo "  2. Envie uma mensagem para: $PHONE"
echo "  3. Exemplo: 'Olá, Sonia!'"
echo ""
echo -e "${BLUE}📊 Para ver os logs:${NC}"
echo "  https://vercel.com/on-smart-admins-projects/onsmart-website"
echo "  → Deployments → deployment mais recente"
echo "  → Functions → evolution-webhook"
echo ""
echo -e "${GREEN}🎉 Boa sorte com o teste!${NC}"

