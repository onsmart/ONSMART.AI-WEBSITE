# Script PowerShell para configurar webhook da Evolution API
# Uso: .\config-webhook.ps1

# Configurações (ajuste conforme necessário)
$EVOLUTION_API_URL = if ($env:EVOLUTION_API_URL) { $env:EVOLUTION_API_URL } else { "http://192.168.15.31:8080" }
$EVOLUTION_API_KEY = if ($env:EVOLUTION_API_KEY) { $env:EVOLUTION_API_KEY } else { "nsinONBASObjsbJBAJJkdopJIPAHUOBAIni" }
$INSTANCE_NAME = if ($env:INSTANCE_NAME) { $env:INSTANCE_NAME } else { "sonia-whatsapp" }
$WEBHOOK_URL = if ($env:WEBHOOK_URL) { $env:WEBHOOK_URL } else { "https://onsmart-website.vercel.app/api/evolution-webhook" }

Write-Host "🔗 Configurando Webhook da Evolution API" -ForegroundColor Yellow
Write-Host ""

$body = @{
    url = $WEBHOOK_URL
    webhook_by_events = $true
    webhook_base64 = $false
    events = @("MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE")
} | ConvertTo-Json

$headers = @{
    "apikey" = $EVOLUTION_API_KEY
    "Content-Type" = "application/json"
}

# Método 1: /instance/{instanceName}/webhook/set
Write-Host "Tentando Método 1: /instance/$INSTANCE_NAME/webhook/set" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/$INSTANCE_NAME/webhook/set" `
        -Method Put `
        -Headers $headers `
        -Body $body `
        -ErrorAction Stop
    Write-Host "✅ Sucesso! Webhook configurado com Método 1" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
    exit 0
} catch {
    Write-Host "❌ Método 1 falhou: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Método 2: /webhook/set/{instanceName}
Write-Host "Tentando Método 2: /webhook/set/$INSTANCE_NAME" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/webhook/set/$INSTANCE_NAME" `
        -Method Put `
        -Headers $headers `
        -Body $body `
        -ErrorAction Stop
    Write-Host "✅ Sucesso! Webhook configurado com Método 2" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
    exit 0
} catch {
    Write-Host "❌ Método 2 falhou: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Método 3: /webhook/instance (POST)
Write-Host "Tentando Método 3: /webhook/instance (POST)" -ForegroundColor Yellow
$bodyWithInstance = @{
    instanceName = $INSTANCE_NAME
    url = $WEBHOOK_URL
    webhook_by_events = $true
    webhook_base64 = $false
    events = @("MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/webhook/instance" `
        -Method Post `
        -Headers $headers `
        -Body $bodyWithInstance `
        -ErrorAction Stop
    Write-Host "✅ Sucesso! Webhook configurado com Método 3" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
    exit 0
} catch {
    Write-Host "❌ Método 3 falhou: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Método 4: /instance/webhook/set/{instanceName}
Write-Host "Tentando Método 4: /instance/webhook/set/$INSTANCE_NAME" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/webhook/set/$INSTANCE_NAME" `
        -Method Put `
        -Headers $headers `
        -Body $body `
        -ErrorAction Stop
    Write-Host "✅ Sucesso! Webhook configurado com Método 4" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
    exit 0
} catch {
    Write-Host "❌ Método 4 falhou: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "❌ Nenhum método funcionou!" -ForegroundColor Red
Write-Host ""
Write-Host "Possíveis soluções:"
Write-Host "1. Verifique se a Evolution API está rodando"
Write-Host "2. Verifique se a API key está correta"
Write-Host "3. Verifique a versão da Evolution API (pode ter endpoints diferentes)"
Write-Host "4. Consulte a documentação: https://doc.evolution-api.com"
Write-Host ""
Write-Host "Para verificar a versão da API:"
Write-Host "Invoke-RestMethod -Uri `"$EVOLUTION_API_URL/info`" -Headers @{`"apikey`" = `"$EVOLUTION_API_KEY`"}"

exit 1





