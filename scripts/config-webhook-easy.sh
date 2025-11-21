#!/bin/bash

# Script simplificado para configurar webhook da Evolution API
# Execute no servidor onde está a Evolution API

# Configurações
EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
INSTANCE_NAME="${INSTANCE_NAME:-sonia-whatsapp}"
WEBHOOK_URL="${WEBHOOK_URL:-https://onsmart-website-kmressbou-on-smart-admins-projects.vercel.app/api/evolution-webhook}"

echo "🔗 Configurando Webhook da Evolution API"
echo "URL da Evolution API: $EVOLUTION_API_URL"
echo "Instância: $INSTANCE_NAME"
echo "Webhook URL: $WEBHOOK_URL"
echo ""

# Primeiro, vamos verificar quais endpoints estão disponíveis
echo "📋 Verificando endpoints disponíveis..."
echo ""

# Tentar descobrir a versão da API
echo "1. Verificando versão da API..."
VERSION_RESPONSE=$(curl -s -X GET "${EVOLUTION_API_URL}/" -H "apikey: ${EVOLUTION_API_KEY}" 2>/dev/null)
echo "$VERSION_RESPONSE" | head -20
echo ""

# Verificar status da instância
echo "2. Verificando status da instância..."
STATUS_RESPONSE=$(curl -s -X GET "${EVOLUTION_API_URL}/instance/fetchInstances" -H "apikey: ${EVOLUTION_API_KEY}" 2>/dev/null)
echo "$STATUS_RESPONSE" | jq '.' 2>/dev/null || echo "$STATUS_RESPONSE"
echo ""

# Tentar diferentes métodos para configurar webhook
echo "3. Tentando configurar webhook..."
echo ""

# Método 1: /webhook/set/{instanceName} (mais comum)
echo "Tentando: PUT /webhook/set/${INSTANCE_NAME}"
RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "${EVOLUTION_API_URL}/webhook/set/${INSTANCE_NAME}" \
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
  echo "✅ SUCESSO! Webhook configurado!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""

# Método 2: /instance/{instanceName}/webhook/set
echo "Tentando: PUT /instance/${INSTANCE_NAME}/webhook/set"
RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "${EVOLUTION_API_URL}/instance/${INSTANCE_NAME}/webhook/set" \
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
  echo "✅ SUCESSO! Webhook configurado!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""

# Método 3: POST /webhook/instance
echo "Tentando: POST /webhook/instance"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/webhook/instance" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"instanceName\": \"${INSTANCE_NAME}\",
    \"url\": \"${WEBHOOK_URL}\",
    \"webhook_by_events\": true,
    \"webhook_base64\": false,
    \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo "✅ SUCESSO! Webhook configurado!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""
echo "❌ Nenhum método funcionou!"
echo ""
echo "💡 Dicas:"
echo "1. Verifique se a instância '${INSTANCE_NAME}' existe"
echo "2. Verifique se a Evolution API está rodando em ${EVOLUTION_API_URL}"
echo "3. Verifique se a API key está correta"
echo "4. Consulte a documentação da sua versão da Evolution API"
echo ""
echo "Para verificar a instância, execute:"
echo "curl -X GET \"${EVOLUTION_API_URL}/instance/fetchInstances\" -H \"apikey: ${EVOLUTION_API_KEY}\""

