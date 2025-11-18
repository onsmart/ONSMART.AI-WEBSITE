# Script para extrair QR Code da resposta da Evolution API
# Uso: .\scripts\extrair-qrcode.ps1

param(
    [string]$Response = ""
)

if ([string]::IsNullOrEmpty($Response)) {
    Write-Host "Cole a resposta JSON completa aqui (Ctrl+V e depois Enter duas vezes):" -ForegroundColor Yellow
    $Response = Read-Host
}

try {
    # Tentar parsear como JSON
    $json = $Response | ConvertFrom-Json
    
    # Verificar se tem base64
    if ($json.base64) {
        $base64String = $json.base64
    }
    elseif ($json.qrcode.base64) {
        $base64String = $json.qrcode.base64
    }
    else {
        Write-Host "❌ Não foi encontrado campo 'base64' na resposta" -ForegroundColor Red
        exit 1
    }
    
    # Remover prefixo "data:image/png;base64," se existir
    if ($base64String -match "^data:image/png;base64,(.+)$") {
        $base64String = $matches[1]
    }
    
    # Converter base64 para bytes
    $bytes = [Convert]::FromBase64String($base64String)
    
    # Salvar como PNG
    $outputFile = "qrcode.png"
    [System.IO.File]::WriteAllBytes($outputFile, $bytes)
    
    Write-Host "✅ QR Code salvo em: $outputFile" -ForegroundColor Green
    Write-Host "📱 Abra o arquivo para escanear com o WhatsApp" -ForegroundColor Cyan
    
    # Tentar abrir automaticamente (Windows)
    if (Test-Path $outputFile) {
        Start-Process $outputFile
    }
}
catch {
    Write-Host "❌ Erro ao processar: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Dica: Certifique-se de colar a resposta JSON completa" -ForegroundColor Yellow
}

