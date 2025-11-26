#!/bin/bash

# Script para obter a URL fixa do túnel Cloudflare

TUNNEL_NAME="${1:-evolution-api-permanent}"

echo "🔍 Buscando URL do túnel: $TUNNEL_NAME"
echo ""

# Método 1: Ver logs do serviço systemd
if systemctl is-active --quiet cloudflared 2>/dev/null; then
    echo "📋 Verificando logs do serviço systemd..."
    URL=$(sudo journalctl -u cloudflared -n 200 2>/dev/null | grep -oP 'https://[^\s]+\.trycloudflare\.com' | head -n1)
    
    if [ -n "$URL" ]; then
        echo "✅ URL encontrada nos logs:"
        echo "   $URL"
        exit 0
    fi
fi

# Método 2: Ver info do túnel
echo "📋 Verificando informações do túnel..."
if command -v cloudflared &> /dev/null; then
    URL=$(cloudflared tunnel info "$TUNNEL_NAME" 2>/dev/null | grep -oP 'https://[^\s]+\.trycloudflare\.com' | head -n1)
    
    if [ -n "$URL" ]; then
        echo "✅ URL encontrada:"
        echo "   $URL"
        exit 0
    fi
fi

# Método 3: Verificar config.yml
CONFIG_FILE="$HOME/.cloudflared/config.yml"
if [ -f "$CONFIG_FILE" ]; then
    echo "📋 Verificando config.yml..."
    HOSTNAME=$(grep -A 1 "ingress:" "$CONFIG_FILE" | grep "hostname:" | awk '{print $2}' | head -n1)
    
    if [ -n "$HOSTNAME" ]; then
        URL="https://$HOSTNAME"
        echo "✅ URL encontrada no config.yml:"
        echo "   $URL"
        echo ""
        echo "⚠️  Nota: Esta é a URL configurada. Verifique se o túnel está rodando."
        exit 0
    fi
fi

echo "❌ Não foi possível encontrar a URL do túnel"
echo ""
echo "Tente:"
echo "  1. Verificar se o serviço está rodando: sudo systemctl status cloudflared"
echo "  2. Ver logs: sudo journalctl -u cloudflared -n 100 | grep -i https"
echo "  3. Verificar config.yml: cat ~/.cloudflared/config.yml"

