# Script para remover arquivos PNG e scripts relacionados ao Evolution API
# Execute: .\remove-evolution-api-files.ps1

Write-Host "🗑️  Removendo arquivos relacionados ao Evolution API..." -ForegroundColor Yellow

# Remover arquivos PNG relacionados a QR Code
Write-Host "`n📸 Removendo arquivos PNG de QR Code..." -ForegroundColor Cyan
$pngFiles = @(
    "qrcode-sonia.png",
    "qrcode.png",
    "qrcode-final.png",
    "qrcode-novo.png",
    "qr.png"
)

foreach ($file in $pngFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removido: $file" -ForegroundColor Green
    }
}

# Remover scripts relacionados ao Evolution API/WhatsApp
Write-Host "`n📜 Removendo scripts do Evolution API..." -ForegroundColor Cyan
$scriptFiles = @(
    "scripts\setup-evolution-completo.sh",
    "scripts\verificar-status-whatsapp.sh",
    "scripts\testar-whatsapp.sh",
    "scripts\diagnosticar-whatsapp.sh",
    "scripts\config-whatsapp.sh",
    "scripts\conectar-whatsapp.sh",
    "scripts\config-whatsapp.ps1",
    "scripts\config-webhook-alternativo.sh",
    "scripts\config-webhook-easy.sh",
    "scripts\config-webhook.ps1",
    "scripts\config-webhook.sh",
    "scripts\configurar-webhook-final.sh",
    "scripts\descobrir-endpoints.sh",
    "scripts\descobrir-webhook-endpoint.sh",
    "scripts\extrair-qrcode.ps1",
    "scripts\extrair-qrcode.sh",
    "scripts\gerar-qrcode.ps1",
    "scripts\gerar-qrcode.sh",
    "scripts\recriar-com-webhook-corrigido.sh",
    "scripts\cloudflared-service.ps1",
    "scripts\cloudflared-service.sh",
    "scripts\install-cloudflared.ps1",
    "scripts\install-cloudflared.sh",
    "scripts\start-cloudflared.ps1",
    "scripts\start-cloudflared.sh"
)

foreach ($file in $scriptFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✓ Removido: $file" -ForegroundColor Green
    }
}

# Remover arquivo temporário se existir
if (Test-Path "extrair-qr-temp.ps1") {
    Remove-Item "extrair-qr-temp.ps1" -Force
    Write-Host "  ✓ Removido: extrair-qr-temp.ps1" -ForegroundColor Green
}

Write-Host "`n✅ Limpeza concluída!" -ForegroundColor Green


