#!/bin/bash

# Script alternativo para configurar webhook - tenta métodos diferentes

EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
INSTANCE_NAME="${INSTANCE_NAME:-sonia-whatsapp}"
WEBHOOK_URL="${WEBHOOK_URL:-https://www.onsmart.ai/api/evolution-webhook}"

echo "🔗 Configurando Webhook (Métodos Alternativos)"
echo "URL: $WEBHOOK_URL"
echo ""

# Método 1: Deletar e recriar instância com webhook
echo "📋 Método 1: Recriar instância com webhook..."
echo ""

# Deletar instância existente
echo "1.1. Deletando instância existente..."
DELETE_RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE "${EVOLUTION_API_URL}/instance/delete/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}")

DELETE_CODE=$(echo "$DELETE_RESPONSE" | tail -n1)
echo "Status: HTTP $DELETE_CODE"
sleep 2

# Criar nova instância com webhook
echo ""
echo "1.2. Criando instância com webhook..."
CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${EVOLUTION_API_URL}/instance/create" \
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

CREATE_CODE=$(echo "$CREATE_RESPONSE" | tail -n1)
CREATE_BODY=$(echo "$CREATE_RESPONSE" | sed '$d')

if [ "$CREATE_CODE" = "200" ] || [ "$CREATE_CODE" = "201" ]; then
  echo "✅ Instância criada com webhook!"
  echo "$CREATE_BODY" | jq '.' 2>/dev/null || echo "$CREATE_BODY"
  echo ""
  echo "🎉 Webhook configurado! Verifique o status:"
  echo "curl -X GET \"${EVOLUTION_API_URL}/instance/fetchInstances\" -H \"apikey: ${EVOLUTION_API_KEY}\""
  exit 0
else
  echo "❌ Falhou (HTTP $CREATE_CODE)"
  echo "$CREATE_BODY"
fi

echo ""
echo ""

# Método 2: Tentar atualizar instância existente
echo "📋 Método 2: Atualizar instância existente..."
echo ""

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
  echo "✅ SUCESSO! Webhook configurado!"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  exit 0
else
  echo "❌ Falhou (HTTP $HTTP_CODE)"
  echo "$BODY"
fi

echo ""
echo ""

# Método 3: Verificar se há interface web
echo "📋 Método 3: Verificando interface web..."
echo ""

# Tentar acessar interface web (se disponível)
WEB_INTERFACE=$(curl -s -o /dev/null -w "%{http_code}" "${EVOLUTION_API_URL}/" 2>/dev/null)
if [ "$WEB_INTERFACE" = "200" ]; then
  echo "✅ Interface web disponível em: ${EVOLUTION_API_URL}"
  echo "💡 Tente configurar o webhook pela interface web"
else
  echo "❌ Interface web não disponível"
fi

echo ""
echo ""

# Método 4: Verificar arquivo de configuração
echo "📋 Método 4: Informações sobre configuração manual..."
echo ""
echo "Se nenhum método funcionou, você pode precisar:"
echo "1. Verificar a documentação da sua versão da Evolution API"
echo "2. Configurar o webhook via arquivo de configuração"
echo "3. Verificar se há variáveis de ambiente para webhook"
echo ""
echo "Para verificar a versão da API:"
echo "curl -X GET \"${EVOLUTION_API_URL}/\" -H \"apikey: ${EVOLUTION_API_KEY}\""
echo ""
echo "Para verificar status da instância:"
echo "curl -X GET \"${EVOLUTION_API_URL}/instance/fetchInstances\" -H \"apikey: ${EVOLUTION_API_KEY}\" | jq '.[] | select(.instance.instanceName == \"${INSTANCE_NAME}\")'"

