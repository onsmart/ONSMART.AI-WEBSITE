#!/bin/bash

# Script para verificar status da instância e obter QR Code

EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
INSTANCE_NAME="${INSTANCE_NAME:-sonia-whatsapp}"

echo "📊 Status da Instância WhatsApp"
echo ""

# Verificar status
STATUS=$(curl -s -X GET "${EVOLUTION_API_URL}/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_API_KEY}" | \
  jq -r ".[] | select(.instance.instanceName == \"${INSTANCE_NAME}\") | .instance.status")

echo "Status: $STATUS"
echo ""

if [ "$STATUS" = "open" ]; then
  echo "✅ WhatsApp está conectado!"
  echo ""
  echo "Para testar, envie uma mensagem para o número conectado."
  echo "A Sonia deve responder automaticamente!"
elif [ "$STATUS" = "qrcode" ] || [ "$STATUS" = "created" ]; then
  echo "📱 QR Code disponível!"
  echo ""
  echo "Para obter o QR Code, execute:"
  echo "curl -X GET \"${EVOLUTION_API_URL}/instance/connect/${INSTANCE_NAME}\" -H \"apikey: ${EVOLUTION_API_KEY}\" | jq -r '.qrcode.base64' | base64 -d > qrcode.png"
  echo ""
  echo "Ou acesse o chat da Sonia no site e clique no ícone do WhatsApp!"
else
  echo "⚠️  Status: $STATUS"
  echo "Verifique os logs da Evolution API"
fi

echo ""
echo "🔗 Webhook configurado:"
curl -s -X GET "${EVOLUTION_API_URL}/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_API_KEY}" | \
  jq -r ".[] | select(.instance.instanceName == \"${INSTANCE_NAME}\") | .webhook.webhook // \"Não configurado\""

