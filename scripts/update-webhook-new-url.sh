#!/bin/bash

# Script para atualizar o webhook da Evolution API com a nova URL do túnel

set -e

TUNNEL_NAME="${1:-evolution-api-permanent}"
INSTANCE_NAME="${2:-sonia-whatsapp-v3}"
WEBHOOK_URL="${3:-https://onsmart.ai/api/whatsapp/webhook}"

echo "🔄 Atualizando webhook da Evolution API"
echo ""

# Obter URL do túnel
echo "🔍 Obtendo URL do túnel..."
EVOLUTION_URL=$(./scripts/get-cloudflare-tunnel-url.sh "$TUNNEL_NAME" 2>/dev/null | grep -oP 'https://[^\s]+\.trycloudflare\.com' | head -n1)

if [ -z "$EVOLUTION_URL" ]; then
    echo "❌ Não foi possível obter a URL do túnel"
    echo "   Forneça manualmente: $0 <tunnel-name> <instance-name> <webhook-url> <evolution-url>"
    exit 1
fi

echo "✅ URL do túnel: $EVOLUTION_URL"
echo ""

# Verificar variáveis de ambiente
if [ -z "$EVOLUTION_API_KEY" ]; then
    echo "⚠️  Variável EVOLUTION_API_KEY não encontrada"
    read -p "Digite a chave da API da Evolution: " EVOLUTION_API_KEY
fi

if [ -z "$EVOLUTION_API_KEY" ]; then
    echo "❌ Chave da API é obrigatória"
    exit 1
fi

echo "📡 Atualizando webhook..."
echo "   Instância: $INSTANCE_NAME"
echo "   Webhook URL: $WEBHOOK_URL"
echo ""

# Atualizar webhook
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$EVOLUTION_URL/webhook/set/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"webhook\": {
      \"url\": \"$WEBHOOK_URL\",
      \"enabled\": true,
      \"webhook_by_events\": true,
      \"webhook_base64\": false,
      \"events\": [\"MESSAGES_UPSERT\"]
    }
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    echo "✅ Webhook atualizado com sucesso!"
    echo ""
    echo "Resposta:"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
    echo "❌ Erro ao atualizar webhook (HTTP $HTTP_CODE)"
    echo ""
    echo "Resposta:"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
    exit 1
fi

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "📝 Próximos passos:"
echo "1. Atualize EVOLUTION_API_BASE_URL na Vercel: $EVOLUTION_URL"
echo "2. Teste enviando uma mensagem no WhatsApp"
echo "3. Verifique os logs da Vercel para confirmar que o webhook está sendo chamado"

