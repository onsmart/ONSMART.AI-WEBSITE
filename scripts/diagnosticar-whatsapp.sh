#!/bin/bash

# Script de diagnóstico completo para WhatsApp Integration
# Execute no servidor para verificar todos os pontos

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Configurações
INSTANCE_NAME="${1:-sonia-whatsapp}"
EVOLUTION_API_URL="${EVOLUTION_API_URL:-http://localhost:8080}"
EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-nsinONBASObjsbJBAJJkdopJIPAHUOBAIni}"
WEBHOOK_URL="${WEBHOOK_URL:-https://onsmart.ai/api/evolution-webhook}"

echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Diagnóstico Completo - WhatsApp Integration${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

# Contador de erros
ERRORS=0
WARNINGS=0

# Função para verificar resultado
check_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASSOU${NC}"
        return 0
    else
        echo -e "${RED}❌ FALHOU${NC}"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# 1. Verificar Status da Instância
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}1️⃣  VERIFICANDO INSTÂNCIA${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}1.1. Instância existe e está conectada?${NC}"
STATUS_RESPONSE=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
    -H "apikey: $EVOLUTION_API_KEY")

INSTANCE_DATA=$(echo "$STATUS_RESPONSE" | jq -r ".[] | select(.instance.instanceName == \"$INSTANCE_NAME\")" 2>/dev/null || echo "null")

if [ "$INSTANCE_DATA" == "null" ] || [ -z "$INSTANCE_DATA" ]; then
    echo -e "${RED}❌ Instância não encontrada!${NC}"
    ERRORS=$((ERRORS + 1))
else
    STATUS=$(echo "$INSTANCE_DATA" | jq -r '.instance.status' 2>/dev/null || echo "unknown")
    PHONE=$(echo "$INSTANCE_DATA" | jq -r '.instance.phone // "N/A"' 2>/dev/null)
    
    echo -e "${GREEN}✅ Instância encontrada${NC}"
    echo "   Status: $STATUS"
    echo "   Telefone: $PHONE"
    
    if [ "$STATUS" != "open" ]; then
        echo -e "${YELLOW}⚠️  Instância não está conectada (status: $STATUS)${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
fi

echo ""

# 2. Verificar Webhook no Vercel
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}2️⃣  VERIFICANDO WEBHOOK NO VERCEL${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}2.1. Webhook está acessível?${NC}"
echo "   Testando: $WEBHOOK_URL"
WEBHOOK_TEST=$(curl -s -X GET "$WEBHOOK_URL" 2>&1)

if echo "$WEBHOOK_TEST" | grep -q "status.*ok"; then
    echo -e "${GREEN}✅ Webhook acessível${NC}"
    echo "   Resposta: $(echo "$WEBHOOK_TEST" | head -1)"
elif echo "$WEBHOOK_TEST" | grep -qi "authentication\|login\|sign in"; then
    echo -e "${RED}❌ Webhook bloqueado por autenticação!${NC}"
    echo "   A URL retorna página de login"
    ERRORS=$((ERRORS + 1))
elif echo "$WEBHOOK_TEST" | grep -q "404"; then
    echo -e "${RED}❌ Webhook não encontrado (404)${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${YELLOW}⚠️  Resposta inesperada:${NC}"
    echo "$WEBHOOK_TEST" | head -3
    WARNINGS=$((WARNINGS + 1))
fi

echo ""

# 3. Verificar Webhook na Evolution API
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}3️⃣  VERIFICANDO WEBHOOK NA EVOLUTION API${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$INSTANCE_DATA" != "null" ]; then
    echo -e "${YELLOW}3.1. Webhook está configurado na instância?${NC}"
    WEBHOOK_CONFIG=$(echo "$INSTANCE_DATA" | jq -r '.instance.webhook // .webhook // "null"' 2>/dev/null)
    
    if [ "$WEBHOOK_CONFIG" != "null" ] && [ -n "$WEBHOOK_CONFIG" ] && [ "$WEBHOOK_CONFIG" != "" ]; then
        echo -e "${GREEN}✅ Webhook configurado${NC}"
        echo "   URL: $WEBHOOK_CONFIG"
        
        if [ "$WEBHOOK_CONFIG" != "$WEBHOOK_URL" ]; then
            echo -e "${YELLOW}⚠️  URL diferente da esperada!${NC}"
            echo "   Esperado: $WEBHOOK_URL"
            echo "   Configurado: $WEBHOOK_CONFIG"
            WARNINGS=$((WARNINGS + 1))
        fi
    else
        echo -e "${RED}❌ Webhook NÃO está configurado!${NC}"
        echo "   Precisa configurar o webhook na instância"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ Não é possível verificar (instância não encontrada)${NC}"
    ERRORS=$((ERRORS + 1))
fi

echo ""

# 4. Testar Envio de Mensagem
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}4️⃣  TESTANDO ENVIO DE MENSAGEM${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ "$INSTANCE_DATA" != "null" ] && [ "$STATUS" == "open" ]; then
    echo -e "${YELLOW}4.1. Evolution API consegue enviar mensagens?${NC}"
    echo -e "${BLUE}   (Este teste requer um número de teste)${NC}"
    echo -e "${YELLOW}   Pule este teste se não tiver um número para testar${NC}"
    echo ""
    read -p "   Deseja testar envio de mensagem? (s/N): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        read -p "   Digite o número para teste (ex: 5511999999999): " TEST_NUMBER
        
        if [ -n "$TEST_NUMBER" ]; then
            SEND_TEST=$(curl -s -w "\n%{http_code}" -X POST "$EVOLUTION_API_URL/message/sendText/$INSTANCE_NAME" \
                -H "apikey: $EVOLUTION_API_KEY" \
                -H "Content-Type: application/json" \
                -d "{
                    \"number\": \"${TEST_NUMBER}@s.whatsapp.net\",
                    \"text\": \"Teste de diagnóstico\"
                }" 2>&1)
            
            SEND_CODE=$(echo "$SEND_TEST" | tail -n1)
            SEND_BODY=$(echo "$SEND_TEST" | sed '$d')
            
            if [ "$SEND_CODE" == "200" ] || [ "$SEND_CODE" == "201" ]; then
                echo -e "${GREEN}✅ Mensagem enviada com sucesso${NC}"
            else
                echo -e "${RED}❌ Erro ao enviar mensagem (HTTP $SEND_CODE)${NC}"
                echo "$SEND_BODY" | jq '.' 2>/dev/null || echo "$SEND_BODY"
                ERRORS=$((ERRORS + 1))
            fi
        fi
    fi
else
    echo -e "${YELLOW}⚠️  Instância não está conectada, pulando teste${NC}"
fi

echo ""

# 5. Resumo
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 RESUMO DO DIAGNÓSTICO${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Tudo OK!${NC}"
    echo ""
    echo -e "${BLUE}Próximos passos:${NC}"
    echo "  1. Envie uma mensagem pelo WhatsApp"
    echo "  2. Verifique os logs no Vercel:"
    echo "     https://vercel.com/on-smart-admins-projects/onsmart-website"
    echo "     → Deployments → deployment mais recente"
    echo "     → Functions → evolution-webhook"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS aviso(s) encontrado(s)${NC}"
    echo ""
    echo -e "${BLUE}Revisar os avisos acima${NC}"
else
    echo -e "${RED}❌ $ERRORS erro(s) encontrado(s)${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS aviso(s) encontrado(s)${NC}"
    fi
    echo ""
    echo -e "${BLUE}Corrigir os erros acima antes de continuar${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Retornar código de saída baseado em erros
if [ $ERRORS -gt 0 ]; then
    exit 1
else
    exit 0
fi

