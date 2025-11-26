#!/bin/bash

# Script para testar se o túnel Cloudflare está funcionando

TUNNEL_NAME="${1:-evolution-api-permanent}"
TEST_URL="${2}"

echo "🧪 Testando túnel Cloudflare: $TUNNEL_NAME"
echo ""

# Se URL não foi fornecida, tentar obter
if [ -z "$TEST_URL" ]; then
    echo "🔍 Obtendo URL do túnel..."
    TEST_URL=$(./scripts/get-cloudflare-tunnel-url.sh "$TUNNEL_NAME" 2>/dev/null | grep -oP 'https://[^\s]+\.trycloudflare\.com' | head -n1)
    
    if [ -z "$TEST_URL" ]; then
        echo "❌ Não foi possível obter a URL do túnel"
        echo "   Forneça a URL manualmente: $0 $TUNNEL_NAME https://sua-url.trycloudflare.com"
        exit 1
    fi
fi

echo "📡 URL do túnel: $TEST_URL"
echo ""

# Teste 1: Verificar se o túnel está acessível
echo "1️⃣  Testando conectividade básica..."
if curl -s --max-time 10 "$TEST_URL" > /dev/null 2>&1; then
    echo "   ✅ Túnel está acessível"
else
    echo "   ❌ Túnel não está acessível"
    echo "   Verifique se o serviço está rodando: sudo systemctl status cloudflared"
    exit 1
fi

# Teste 2: Verificar se Evolution API está respondendo
echo ""
echo "2️⃣  Testando endpoint da Evolution API..."

# Tentar endpoint comum
if curl -s --max-time 10 "$TEST_URL/health" > /dev/null 2>&1; then
    echo "   ✅ Endpoint /health respondeu"
elif curl -s --max-time 10 "$TEST_URL/" > /dev/null 2>&1; then
    echo "   ✅ Endpoint raiz respondeu"
else
    echo "   ⚠️  Endpoints comuns não responderam (pode ser normal)"
fi

# Teste 3: Verificar se porta local está acessível
echo ""
echo "3️⃣  Verificando serviço local (localhost:8080)..."
if curl -s --max-time 5 "http://localhost:8080" > /dev/null 2>&1; then
    echo "   ✅ Evolution API está rodando localmente"
else
    echo "   ⚠️  Evolution API não está acessível em localhost:8080"
    echo "   Verifique se a Evolution API está rodando"
fi

echo ""
echo "✅ Testes concluídos!"
echo ""
echo "📝 Para testar endpoint específico da Evolution API:"
echo "   curl -X GET \"$TEST_URL/instance/fetchInstances\" \\"
echo "     -H \"apikey: SUA_CHAVE_API\""

