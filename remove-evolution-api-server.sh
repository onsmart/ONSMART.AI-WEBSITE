#!/bin/bash
# Script para remover arquivos PNG e scripts relacionados ao Evolution API no servidor Linux
# Execute: bash remove-evolution-api-server.sh

echo "🗑️  Removendo arquivos relacionados ao Evolution API no servidor..."

# Navegar para o diretório do projeto (ajuste o caminho conforme necessário)
# cd /caminho/para/seu/projeto

# Remover arquivos PNG relacionados a QR Code
echo ""
echo "📸 Removendo arquivos PNG de QR Code..."
rm -f qrcode-sonia.png
rm -f qrcode.png
rm -f qrcode-final.png
rm -f qrcode-novo.png
rm -f qr.png
echo "  ✓ PNGs removidos"

# Remover scripts relacionados ao Evolution API/WhatsApp
echo ""
echo "📜 Removendo scripts do Evolution API..."
rm -f scripts/setup-evolution-completo.sh
rm -f scripts/verificar-status-whatsapp.sh
rm -f scripts/testar-whatsapp.sh
rm -f scripts/diagnosticar-whatsapp.sh
rm -f scripts/config-whatsapp.sh
rm -f scripts/conectar-whatsapp.sh
rm -f scripts/config-whatsapp.ps1
rm -f scripts/config-webhook-alternativo.sh
rm -f scripts/config-webhook-easy.sh
rm -f scripts/config-webhook.ps1
rm -f scripts/config-webhook.sh
rm -f scripts/configurar-webhook-final.sh
rm -f scripts/descobrir-endpoints.sh
rm -f scripts/descobrir-webhook-endpoint.sh
rm -f scripts/extrair-qrcode.ps1
rm -f scripts/extrair-qrcode.sh
rm -f scripts/gerar-qrcode.ps1
rm -f scripts/gerar-qrcode.sh
rm -f scripts/recriar-com-webhook-corrigido.sh
rm -f scripts/cloudflared-service.ps1
rm -f scripts/cloudflared-service.sh
rm -f scripts/install-cloudflared.ps1
rm -f scripts/install-cloudflared.sh
rm -f scripts/start-cloudflared.ps1
rm -f scripts/start-cloudflared.sh
echo "  ✓ Scripts removidos"

# Remover arquivo temporário se existir
rm -f extrair-qr-temp.ps1

# Remover arquivos de API se existirem
echo ""
echo "🔌 Removendo arquivos de API..."
rm -f api/evolution-api.js
rm -f api/evolution-webhook.js
echo "  ✓ Arquivos de API removidos"

# Remover serviços se existirem
echo ""
echo "⚙️  Removendo serviços..."
rm -f src/services/evolutionApiService.ts
rm -f src/services/whatsappApiService.ts
rm -f src/services/whatsappAgentService.ts
rm -f src/services/realTimeWhatsappService.ts
echo "  ✓ Serviços removidos"

# Remover componentes se existirem
echo ""
echo "🧩 Removendo componentes..."
rm -f src/components/chat/WhatsAppTab.tsx
rm -f src/components/admin/EvolutionApiConfig.tsx
echo "  ✓ Componentes removidos"

# Remover hooks se existirem
echo ""
echo "🪝 Removendo hooks..."
rm -f src/hooks/useWhatsAppService.ts
rm -f src/hooks/useRealTimeAgents.ts
echo "  ✓ Hooks removidos"

# Remover contextos se existirem
echo ""
echo "📦 Removendo contextos..."
rm -f src/contexts/WhatsAppQRContext.tsx
echo "  ✓ Contextos removidos"

# Remover páginas se existirem
echo ""
echo "📄 Removendo páginas..."
rm -f src/pages/WhatsappAgents.tsx
echo "  ✓ Páginas removidas"

# Remover componentes whatsapp-agents se existirem
echo ""
echo "🗂️  Removendo componentes whatsapp-agents..."
rm -rf src/components/whatsapp-agents/
echo "  ✓ Pasta whatsapp-agents removida"

echo ""
echo "✅ Limpeza concluída no servidor!"


