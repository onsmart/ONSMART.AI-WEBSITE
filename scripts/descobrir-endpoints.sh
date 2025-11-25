#!/bin/bash

# Script para descobrir endpoints disponíveis da Evolution API
# Uso: ./descobrir-endpoints.sh

EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://192.168.15.31:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
INSTANCE_NAME="${INSTANCE_NAME:-sonia-whatsapp}"

echo "🔍 Descobrindo endpoints disponíveis da Evolution API"
echo ""

# Testar endpoints comuns
echo "1. Testando /instance/fetchInstances (deve funcionar):"
curl -s -X GET "${EVOLUTION_API_URL}/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.' 2>/dev/null || echo "Erro ou resposta não-JSON"
echo ""
echo ""

echo "2. Testando /webhook/find/${INSTANCE_NAME}:"
curl -s -X GET "${EVOLUTION_API_URL}/webhook/find/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.' 2>/dev/null || echo "Erro"
echo ""
echo ""

echo "3. Testando /instance/${INSTANCE_NAME}/webhook/find:"
curl -s -X GET "${EVOLUTION_API_URL}/instance/${INSTANCE_NAME}/webhook/find" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.' 2>/dev/null || echo "Erro"
echo ""
echo ""

echo "4. Testando /webhook/list:"
curl -s -X GET "${EVOLUTION_API_URL}/webhook/list" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.' 2>/dev/null || echo "Erro"
echo ""
echo ""

echo "5. Testando /instance/${INSTANCE_NAME}/webhook/list:"
curl -s -X GET "${EVOLUTION_API_URL}/instance/${INSTANCE_NAME}/webhook/list" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.' 2>/dev/null || echo "Erro"
echo ""
echo ""

echo "6. Testando /webhook/get/${INSTANCE_NAME}:"
curl -s -X GET "${EVOLUTION_API_URL}/webhook/get/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.' 2>/dev/null || echo "Erro"
echo ""
echo ""

echo "✅ Teste concluído!"
echo ""
echo "Se algum endpoint retornou dados, o webhook pode já estar configurado."
echo "Se todos retornaram erro, tente os métodos de configuração abaixo."








