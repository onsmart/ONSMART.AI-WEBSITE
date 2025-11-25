#!/bin/bash

# Script para configurar webhook da Evolution API
# Uso: ./config-webhook.sh

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurações (ajuste conforme necessário)
EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://192.168.15.31:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
INSTANCE_NAME="${INSTANCE_NAME:-sonia-whatsapp}"
WEBHOOK_URL="${WEBHOOK_URL:-https://onsmart-website.vercel.app/api/evolution-webhook}"

echo -e "${YELLOW}🔗 Configurando Webhook da Evolution API${NC}"
echo ""

# Método 1: /instance/{instanceName}/webhook/set
echo -e "${YELLOW}Tentando Método 1: /instance/${INSTANCE_NAME}/webhook/set${NC}"
response=$(curl -s -w "\n%{http_code}" -X PUT "${EVOLUTION_API_URL}/instance/${INSTANCE_NAME}/webhook/set" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"url\": \"${WEBHOOK_URL}\",
    \"webhook_by_events\": true,
    \"webhook_base64\": false,
    \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
  }")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
  echo -e "${GREEN}✅ Sucesso! Webhook configurado com Método 1${NC}"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
  exit 0
else
  echo -e "${RED}❌ Método 1 falhou (HTTP $http_code)${NC}"
  echo "$body"
fi

echo ""

# Método 2: /webhook/set/{instanceName}
echo -e "${YELLOW}Tentando Método 2: /webhook/set/${INSTANCE_NAME}${NC}"
response=$(curl -s -w "\n%{http_code}" -X PUT "${EVOLUTION_API_URL}/webhook/set/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"url\": \"${WEBHOOK_URL}\",
    \"webhook_by_events\": true,
    \"webhook_base64\": false,
    \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
  }")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
  echo -e "${GREEN}✅ Sucesso! Webhook configurado com Método 2${NC}"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
  exit 0
else
  echo -e "${RED}❌ Método 2 falhou (HTTP $http_code)${NC}"
  echo "$body"
fi

echo ""

# Método 3: /webhook/instance (POST)
echo -e "${YELLOW}Tentando Método 3: /webhook/instance (POST)${NC}"
response=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/webhook/instance" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"instanceName\": \"${INSTANCE_NAME}\",
    \"url\": \"${WEBHOOK_URL}\",
    \"webhook_by_events\": true,
    \"webhook_base64\": false,
    \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
  }")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
  echo -e "${GREEN}✅ Sucesso! Webhook configurado com Método 3${NC}"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
  exit 0
else
  echo -e "${RED}❌ Método 3 falhou (HTTP $http_code)${NC}"
  echo "$body"
fi

echo ""

# Método 4: /instance/webhook/set/{instanceName}
echo -e "${YELLOW}Tentando Método 4: /instance/webhook/set/${INSTANCE_NAME}${NC}"
response=$(curl -s -w "\n%{http_code}" -X PUT "${EVOLUTION_API_URL}/instance/webhook/set/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"url\": \"${WEBHOOK_URL}\",
    \"webhook_by_events\": true,
    \"webhook_base64\": false,
    \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
  }")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
  echo -e "${GREEN}✅ Sucesso! Webhook configurado com Método 4${NC}"
  echo "$body" | jq '.' 2>/dev/null || echo "$body"
  exit 0
else
  echo -e "${RED}❌ Método 4 falhou (HTTP $http_code)${NC}"
  echo "$body"
fi

echo ""
echo -e "${RED}❌ Nenhum método funcionou!${NC}"
echo ""
echo "Possíveis soluções:"
echo "1. Verifique se a Evolution API está rodando"
echo "2. Verifique se a API key está correta"
echo "3. Verifique a versão da Evolution API (pode ter endpoints diferentes)"
echo "4. Consulte a documentação: https://doc.evolution-api.com"
echo ""
echo "Para verificar a versão da API:"
echo "curl -X GET \"${EVOLUTION_API_URL}/info\" -H \"apikey: ${EVOLUTION_API_KEY}\""

exit 1








