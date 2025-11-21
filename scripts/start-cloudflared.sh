#!/bin/bash

# Script para iniciar o Cloudflare Tunnel apontando para a Evolution API (porta 8080)
# Este script inicia um túnel temporário (URL muda a cada execução)

set -e

echo "🚀 Iniciando Cloudflare Tunnel..."

# Verificar se cloudflared está instalado
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared não está instalado!"
    echo "   Execute primeiro: ./scripts/install-cloudflared.sh"
    exit 1
fi

# Verificar se a Evolution API está rodando
echo "🔍 Verificando se a Evolution API está rodando na porta 8080..."
if ! curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "⚠️  Aviso: Não foi possível conectar em http://localhost:8080"
    echo "   Certifique-se de que a Evolution API está rodando"
    read -p "Deseja continuar mesmo assim? (s/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

# Porta padrão
PORT=${1:-8080}

echo "📡 Criando túnel para http://localhost:$PORT..."
echo ""
echo "⏳ Aguarde... A URL será exibida abaixo:"
echo ""

# Iniciar túnel
cloudflared tunnel --url http://localhost:$PORT

