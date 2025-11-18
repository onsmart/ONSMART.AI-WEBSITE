#!/bin/bash

# Script para extrair QR Code da resposta da Evolution API
# Uso: ./scripts/extrair-qrcode.sh

echo "Cole a resposta JSON completa aqui (Ctrl+Shift+V e depois Enter duas vezes):"
read -r response

# Tentar extrair base64
base64_string=$(echo "$response" | grep -o '"base64":"[^"]*' | cut -d'"' -f4)

if [ -z "$base64_string" ]; then
    # Tentar outro formato
    base64_string=$(echo "$response" | jq -r '.base64 // .qrcode.base64 // empty' 2>/dev/null)
fi

if [ -z "$base64_string" ]; then
    echo "❌ Não foi encontrado campo 'base64' na resposta"
    exit 1
fi

# Remover prefixo "data:image/png;base64," se existir
base64_string=$(echo "$base64_string" | sed 's/^data:image\/png;base64,//')

# Converter base64 para PNG
echo "$base64_string" | base64 -d > qrcode.png

if [ $? -eq 0 ]; then
    echo "✅ QR Code salvo em: qrcode.png"
    echo "📱 Abra o arquivo para escanear com o WhatsApp"
    
    # Tentar abrir automaticamente (Linux/Mac)
    if command -v xdg-open &> /dev/null; then
        xdg-open qrcode.png
    elif command -v open &> /dev/null; then
        open qrcode.png
    fi
else
    echo "❌ Erro ao converter base64"
    exit 1
fi


