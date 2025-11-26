#!/bin/bash

# Script para corrigir a URL do webhook na Evolution API

EVOLUTION_API_URL="https://acer-contemporary-poor-scout.trycloudflare.com"
EVOLUTION_API_KEY="LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs="
INSTANCE_ID="sonia-whatsapp-v3"
WEBHOOK_URL="https://onsmart.ai/api/whatsapp/webhook"

echo "🔧 Atualizando webhook para: $WEBHOOK_URL"

curl -X POST "$EVOLUTION_API_URL/webhook/set/$INSTANCE_ID" \
  -H "apikey: $EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook": {
      "url": "'"$WEBHOOK_URL"'",
      "enabled": true,
      "webhook_by_events": true,
      "webhook_base64": false,
      "events": [
        "MESSAGES_UPSERT"
      ]
    }
  }'

echo ""
echo "✅ Webhook atualizado!"
echo ""
echo "Verifique se foi atualizado:"
echo "curl -X GET \"$EVOLUTION_API_URL/webhook/find/$INSTANCE_ID\" -H \"apikey: $EVOLUTION_API_KEY\""

