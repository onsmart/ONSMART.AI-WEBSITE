#!/bin/bash

# Script para descobrir o endpoint correto de webhook na Evolution API

EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
INSTANCE_NAME="${INSTANCE_NAME:-sonia-whatsapp}"

echo "🔍 Descobrindo endpoints de webhook disponíveis..."
echo ""

# 1. Verificar informações da instância
echo "1. Informações da instância:"
INSTANCE_INFO=$(curl -s -X GET "${EVOLUTION_API_URL}/instance/fetchInstances" -H "apikey: ${EVOLUTION_API_KEY}")
echo "$INSTANCE_INFO" | jq '.' 2>/dev/null || echo "$INSTANCE_INFO"
echo ""

# 2. Tentar atualizar a instância com webhook (método alternativo)
echo "2. Tentando atualizar instância com webhook..."
WEBHOOK_URL="https://www.onsmart.ai/api/evolution-webhook"

# Método: PUT /instance/update/{instanceName}
echo "Tentando: PUT /instance/update/${INSTANCE_NAME}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "${EVOLUTION_API_URL}/instance/update/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"webhook\": {
      \"url\": \"${WEBHOOK_URL}\",
      \"webhook_by_events\": true,
      \"webhook_base64\": false,
      \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
    }
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo "✅ SUCESSO!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""

# 3. Tentar criar/atualizar instância com webhook no body
echo "3. Tentando criar instância com webhook..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/instance/create" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"instanceName\": \"${INSTANCE_NAME}\",
    \"qrcode\": true,
    \"integration\": \"WHATSAPP-BAILEYS\",
    \"webhook\": {
      \"url\": \"${WEBHOOK_URL}\",
      \"webhook_by_events\": true,
      \"webhook_base64\": false,
      \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
    }
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo "✅ SUCESSO!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""

# 4. Tentar endpoint de webhook específico do Baileys
echo "4. Tentando endpoint específico do Baileys..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/webhook/whatsapp/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"url\": \"${WEBHOOK_URL}\",
    \"webhook_by_events\": true,
    \"webhook_base64\": false,
    \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo "✅ SUCESSO!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""

# 5. Listar todos os endpoints disponíveis (se a API suportar)
echo "5. Tentando listar rotas disponíveis..."
curl -s -X GET "${EVOLUTION_API_URL}/" -H "apikey: ${EVOLUTION_API_KEY}" | head -50
echo ""

echo "❌ Nenhum método funcionou!"
echo ""
echo "💡 Próximos passos:"
echo "1. Verifique a documentação da sua versão da Evolution API"
echo "2. Consulte: https://doc.evolution-api.com/"
echo "3. Verifique se o webhook pode ser configurado via interface web (se disponível)"
echo "4. Tente configurar manualmente editando o arquivo de configuração da instância"

