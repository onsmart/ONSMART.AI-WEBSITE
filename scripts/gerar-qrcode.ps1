# Script para gerar QR Code do WhatsApp
# Uso: .\scripts\gerar-qrcode.ps1 [nome-da-instancia]

param(
    [string]$InstanceName = "sonia-whatsapp"
)

# Configurações
$EVOLUTION_API_URL = if ($env:EVOLUTION_API_URL) { $env:EVOLUTION_API_URL } else { "http://localhost:8080" }
$EVOLUTION_API_KEY = if ($env:EVOLUTION_API_KEY) { $env:EVOLUTION_API_KEY } else { "nsinONBASObjsbJBAJJkdopJIPAHUOBAIni" }

Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Gerador de QR Code - WhatsApp" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 Configurações:" -ForegroundColor Cyan
Write-Host "  Instância: $InstanceName"
Write-Host "  API URL: $EVOLUTION_API_URL"
Write-Host ""

# 1. Verificar status da instância
Write-Host "🔍 Verificando status da instância..." -ForegroundColor Cyan
try {
    $statusResponse = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/fetchInstances" `
        -Method Get `
        -Headers @{"apikey" = $EVOLUTION_API_KEY}
    
    $instanceData = $statusResponse | Where-Object { $_.instance.instanceName -eq $InstanceName }
    
    if (-not $instanceData) {
        Write-Host "❌ Instância '$InstanceName' não encontrada!" -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Criando instância..." -ForegroundColor Yellow
        
        $createBody = @{
            instanceName = $InstanceName
            qrcode = $true
            integration = "WHATSAPP-BAILEYS"
        } | ConvertTo-Json
        
        $createResponse = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/create" `
            -Method Post `
            -Headers @{
                "apikey" = $EVOLUTION_API_KEY
                "Content-Type" = "application/json"
            } `
            -Body $createBody
        
        Write-Host "✅ Instância criada!" -ForegroundColor Green
        Start-Sleep -Seconds 2
        $instanceStatus = "created"
    } else {
        $instanceStatus = $instanceData.instance.status
        Write-Host "✅ Status da instância: $instanceStatus" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Erro ao verificar status: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# 2. Conectar instância e obter QR Code
Write-Host "🔗 Conectando instância e obtendo QR Code..." -ForegroundColor Cyan
try {
    $qrResponse = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/connect/$InstanceName" `
        -Method Get `
        -Headers @{"apikey" = $EVOLUTION_API_KEY}
    
    # Verificar se há erro
    if ($qrResponse.error) {
        Write-Host "❌ Erro ao obter QR Code:" -ForegroundColor Red
        $qrResponse | ConvertTo-Json -Depth 10
        exit 1
    }
    
    # Extrair QR Code base64
    $qrBase64 = $null
    if ($qrResponse.qrcode.base64) {
        $qrBase64 = $qrResponse.qrcode.base64
    } elseif ($qrResponse.base64) {
        $qrBase64 = $qrResponse.base64
    }
    
    if (-not $qrBase64) {
        Write-Host "⚠️  QR Code não disponível na resposta." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📄 Resposta completa:" -ForegroundColor Cyan
        $qrResponse | ConvertTo-Json -Depth 10
        exit 1
    }
    
    # Remover prefixo data:image/png;base64, se existir
    $qrBase64 = $qrBase64 -replace '^data:image/png;base64,', ''
    
    # 3. Salvar QR Code como imagem
    Write-Host "💾 Salvando QR Code..." -ForegroundColor Cyan
    $bytes = [Convert]::FromBase64String($qrBase64)
    $outputPath = "qrcode-$InstanceName.png"
    [System.IO.File]::WriteAllBytes($outputPath, $bytes)
    
    Write-Host "✅ QR Code salvo em: $outputPath" -ForegroundColor Green
    Write-Host ""
    
    # Tentar abrir a imagem
    Write-Host "🖼️  Abrindo a imagem..." -ForegroundColor Cyan
    Start-Process $outputPath
    
    Write-Host ""
    Write-Host "📱 Instruções:" -ForegroundColor Green
    Write-Host "  1. O QR Code foi aberto automaticamente"
    Write-Host "  2. Abra o WhatsApp no seu celular"
    Write-Host "  3. Vá em Configurações > Aparelhos conectados > Conectar um aparelho"
    Write-Host "  4. Escaneie o QR Code"
    Write-Host ""
    
    Write-Host "✅ Concluído!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Erro ao obter QR Code: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "📄 Detalhes do erro:" -ForegroundColor Yellow
    $_.Exception | Format-List -Force
    exit 1
}

