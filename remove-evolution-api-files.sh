#!/bin/bash
# Script para remover arquivos PNG e scripts relacionados ao Evolution API
# Execute: chmod +x remove-evolution-api-files.sh && ./remove-evolution-api-files.sh

echo "🗑️  Removendo arquivos relacionados ao Evolution API..."

# Remover arquivos PNG relacionados a QR Code
echo ""
echo "📸 Removendo arquivos PNG de QR Code..."
PNG_FILES=(
    "qrcode-sonia.png"
    "qrcode.png"
    "qrcode-final.png"
    "qrcode-novo.png"
    "qr.png"
)

for file in "${PNG_FILES[@]}"; do
    if [ -f "$file" ]; then
        rm -f "$file"
        echo "  ✓ Removido: $file"
    fi
done

# Remover scripts relacionados ao Evolution API/WhatsApp
echo ""
echo "📜 Removendo scripts do Evolution API..."
SCRIPT_FILES=(
    "scripts/setup-evolution-completo.sh"
    "scripts/verificar-status-whatsapp.sh"
    "scripts/testar-whatsapp.sh"
    "scripts/diagnosticar-whatsapp.sh"
    "scripts/config-whatsapp.sh"
    "scripts/conectar-whatsapp.sh"
    "scripts/config-whatsapp.ps1"
    "scripts/config-webhook-alternativo.sh"
    "scripts/config-webhook-easy.sh"
    "scripts/config-webhook.ps1"
    "scripts/config-webhook.sh"
    "scripts/configurar-webhook-final.sh"
    "scripts/descobrir-endpoints.sh"
    "scripts/descobrir-webhook-endpoint.sh"
    "scripts/extrair-qrcode.ps1"
    "scripts/extrair-qrcode.sh"
    "scripts/gerar-qrcode.ps1"
    "scripts/gerar-qrcode.sh"
    "scripts/recriar-com-webhook-corrigido.sh"
    "scripts/cloudflared-service.ps1"
    "scripts/cloudflared-service.sh"
    "scripts/install-cloudflared.ps1"
    "scripts/install-cloudflared.sh"
    "scripts/start-cloudflared.ps1"
    "scripts/start-cloudflared.sh"
)

for file in "${SCRIPT_FILES[@]}"; do
    if [ -f "$file" ]; then
        rm -f "$file"
        echo "  ✓ Removido: $file"
    fi
done

# Remover arquivo temporário se existir
if [ -f "extrair-qr-temp.ps1" ]; then
    rm -f "extrair-qr-temp.ps1"
    echo "  ✓ Removido: extrair-qr-temp.ps1"
fi

echo ""
echo "✅ Limpeza concluída!"


