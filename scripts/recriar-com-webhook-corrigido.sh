#!/bin/bash

# Script corrigido para recriar instância com webhook
# O webhook deve ser uma string (URL), não um objeto

EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
INSTANCE_NAME="${INSTANCE_NAME:-sonia-whatsapp}"
WEBHOOK_URL="${WEBHOOK_URL:-https://www.onsmart.ai/api/evolution-webhook}"

echo "🗑️  Deletando instância existente..."
curl -s -X DELETE "${EVOLUTION_API_URL}/instance/delete/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}"

sleep 2

echo ""
echo "🆕 Criando instância com webhook (formato string)..."
echo ""

# Tentar formato 1: webhook como string simples
echo "Tentando formato 1: webhook como string..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/instance/create" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"instanceName\": \"${INSTANCE_NAME}\",
    \"qrcode\": true,
    \"integration\": \"WHATSAPP-BAILEYS\",
    \"webhook\": \"${WEBHOOK_URL}\"
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo "✅ SUCESSO! Instância criada com webhook!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  echo ""
  echo "🎉 Verifique o status:"
  echo "curl -X GET \"${EVOLUTION_API_URL}/instance/fetchInstances\" -H \"apikey: ${EVOLUTION_API_KEY}\" | jq '.[] | select(.instance.instanceName == \"${INSTANCE_NAME}\")'"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""
echo ""

# Tentar formato 2: webhookUrl (nome alternativo)
echo "Tentando formato 2: webhookUrl..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/instance/create" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"instanceName\": \"${INSTANCE_NAME}\",
    \"qrcode\": true,
    \"integration\": \"WHATSAPP-BAILEYS\",
    \"webhookUrl\": \"${WEBHOOK_URL}\"
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo "✅ SUCESSO! Instância criada com webhook!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  echo ""
  echo "🎉 Verifique o status:"
  echo "curl -X GET \"${EVOLUTION_API_URL}/instance/fetchInstances\" -H \"apikey: ${EVOLUTION_API_KEY}\" | jq '.[] | select(.instance.instanceName == \"${INSTANCE_NAME}\")'"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""
echo ""

# Tentar formato 3: criar sem webhook primeiro, depois configurar
echo "Tentando formato 3: criar instância sem webhook..."
CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/instance/create" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"instanceName\": \"${INSTANCE_NAME}\",
    \"qrcode\": true,
    \"integration\": \"WHATSAPP-BAILEYS\"
  }")

CREATE_CODE=$(echo "$CREATE_RESPONSE" | tail -n1)
CREATE_BODY=$(echo "$CREATE_RESPONSE" | sed '$d')

if [ "$CREATE_CODE" = "200" ] || [ "$CREATE_CODE" = "201" ]; then
  echo "✅ Instância criada! Agora tentando configurar webhook..."
  echo "$CREATE_BODY" | jq '.' 2>/dev/null || echo "$CREATE_BODY"
  echo ""
  
  # Aguardar um pouco
  sleep 2
  
  # Tentar configurar webhook depois (métodos alternativos)
  echo "Tentando configurar webhook após criação..."
  
  # Método A: webhook como query parameter
  echo "Método A: webhook via query parameter..."
  WEBHOOK_RESPONSE=$(curl -s -w "\n%{http_code}" -X PUT "${EVOLUTION_API_URL}/instance/update/${INSTANCE_NAME}?webhook=${WEBHOOK_URL}" \
    -H "apikey: ${EVOLUTION_API_KEY}")
  
  WEBHOOK_CODE=$(echo "$WEBHOOK_RESPONSE" | tail -n1)
  if [ "$WEBHOOK_CODE" = "200" ] || [ "$WEBHOOK_CODE" = "201" ]; then
    echo "✅ Webhook configurado!"
    exit 0
  fi
fi

echo ""
echo "❌ Nenhum método funcionou!"
echo ""
echo "💡 Próximos passos:"
echo "1. A instância foi criada, mas o webhook precisa ser configurado manualmente"
echo "2. Verifique a documentação da sua versão da Evolution API"
echo "3. Tente configurar via interface web (se disponível)"
echo "4. Verifique se há variáveis de ambiente para webhook no Docker"

