# Script de Configuração WhatsApp Evolution API (PowerShell)
# Substitua as variáveis abaixo pelos seus valores

# ============================================
# CONFIGURAÇÕES - ALTERE AQUI
# ============================================
$EVOLUTION_API_URL = "SUA_URL_API"           # Exemplo: http://localhost:8080
$EVOLUTION_API_KEY = "SUA_CHAVE_API"         # Exemplo: abc123xyz456
$INSTANCE_NAME = "SEU_NOME_INSTANCIA"        # Exemplo: sonia
$VERCEL_URL = "SEU_PROJETO.vercel.app"       # Exemplo: onsmart-website.vercel.app

# ============================================
# FUNÇÕES
# ============================================

function Print-Header {
    param([string]$Message)
    Write-Host "========================================" -ForegroundColor Green
    Write-Host $Message -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
}

function Print-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Print-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Print-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# ============================================
# VALIDAÇÃO
# ============================================

if ($EVOLUTION_API_URL -eq "SUA_URL_API" -or $EVOLUTION_API_KEY -eq "SUA_CHAVE_API" -or $INSTANCE_NAME -eq "SEU_NOME_INSTANCIA") {
    Print-Error "Por favor, configure as variáveis no início do script!"
    exit 1
}

# ============================================
# MENU
# ============================================

function Show-Menu {
    Write-Host ""
    Print-Header "Menu de Configuração WhatsApp"
    Write-Host "1. Verificar conexão com a API"
    Write-Host "2. Listar instâncias existentes"
    Write-Host "3. Criar nova instância"
    Write-Host "4. Obter QR Code"
    Write-Host "5. Verificar status da instância"
    Write-Host "6. Reiniciar instância"
    Write-Host "7. Configurar webhook"
    Write-Host "8. Fazer logout"
    Write-Host "9. Deletar instância"
    Write-Host "0. Sair"
    Write-Host ""
}

# ============================================
# OPÇÕES
# ============================================

function Check-Connection {
    Print-Header "Verificando Conexão"
    try {
        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/fetchInstances" `
            -Method Get `
            -Headers @{"apikey" = $EVOLUTION_API_KEY}
        Print-Success "Conexão estabelecida!"
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Print-Error "Falha na conexão: $($_.Exception.Message)"
    }
}

function List-Instances {
    Print-Header "Listando Instâncias"
    try {
        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/fetchInstances" `
            -Method Get `
            -Headers @{"apikey" = $EVOLUTION_API_KEY}
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Print-Error "Erro ao listar instâncias: $($_.Exception.Message)"
    }
}

function Create-Instance {
    Print-Header "Criando Instância: $INSTANCE_NAME"
    try {
        $body = @{
            instanceName = $INSTANCE_NAME
            qrcode = $true
            integration = "WHATSAPP-BAILEYS"
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/create" `
            -Method Post `
            -Headers @{
                "apikey" = $EVOLUTION_API_KEY
                "Content-Type" = "application/json"
            } `
            -Body $body
        Print-Success "Instância criada!"
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Print-Error "Erro ao criar instância: $($_.Exception.Message)"
    }
}

function Get-QRCode {
    Print-Header "Obtendo QR Code"
    try {
        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" `
            -Method Get `
            -Headers @{"apikey" = $EVOLUTION_API_KEY}
        
        if ($response.qrcode.base64) {
            Print-Success "QR Code obtido!"
            Write-Host ""
            Write-Host "Salvando QR Code em qrcode.png..."
            
            $bytes = [Convert]::FromBase64String($response.qrcode.base64)
            [System.IO.File]::WriteAllBytes("qrcode.png", $bytes)
            
            Print-Success "QR Code salvo em qrcode.png"
            Write-Host "Abra o arquivo para escanear com o WhatsApp"
        }
        else {
            Print-Warning "QR Code não disponível. Resposta:"
            $response | ConvertTo-Json -Depth 10
        }
    }
    catch {
        Print-Error "Erro ao obter QR Code: $($_.Exception.Message)"
    }
}

function Check-Status {
    Print-Header "Verificando Status: $INSTANCE_NAME"
    try {
        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/fetchInstances" `
            -Method Get `
            -Headers @{"apikey" = $EVOLUTION_API_KEY}
        
        $instance = $response | Where-Object { $_.instanceName -eq $INSTANCE_NAME -or $_.instance.instanceName -eq $INSTANCE_NAME }
        
        if ($instance) {
            $status = if ($instance.instance) { $instance.instance.status } else { $instance.status }
            
            switch ($status) {
                "open" { Print-Success "Status: CONECTADO ✅" }
                "qrcode" { Print-Warning "Status: AGUARDANDO QR CODE ⏳" }
                "close" { Print-Error "Status: DESCONECTADO ❌" }
                "connecting" { Print-Warning "Status: CONECTANDO 🔄" }
                default { Write-Host "Status: $status" }
            }
            Write-Host ""
            $instance | ConvertTo-Json -Depth 10
        }
        else {
            Print-Warning "Instância não encontrada"
        }
    }
    catch {
        Print-Error "Erro ao verificar status: $($_.Exception.Message)"
    }
}

function Restart-Instance {
    Print-Header "Reiniciando Instância: $INSTANCE_NAME"
    try {
        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/restart/$INSTANCE_NAME" `
            -Method Put `
            -Headers @{"apikey" = $EVOLUTION_API_KEY}
        Print-Success "Instância reiniciada!"
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Print-Error "Erro ao reiniciar instância: $($_.Exception.Message)"
    }
}

function Setup-Webhook {
    if ($VERCEL_URL -eq "SEU_PROJETO.vercel.app") {
        Print-Error "Configure VERCEL_URL no início do script!"
        return
    }
    
    Print-Header "Configurando Webhook"
    try {
        $body = @{
            url = "https://$VERCEL_URL/api/evolution-webhook"
            webhook_by_events = $true
            webhook_base64 = $false
            events = @("MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE")
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/webhook/set/$INSTANCE_NAME" `
            -Method Put `
            -Headers @{
                "apikey" = $EVOLUTION_API_KEY
                "Content-Type" = "application/json"
            } `
            -Body $body
        Print-Success "Webhook configurado!"
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Print-Error "Erro ao configurar webhook: $($_.Exception.Message)"
    }
}

function Logout-Instance {
    $confirm = Read-Host "Tem certeza que deseja fazer logout? (s/N)"
    if ($confirm -ne "s" -and $confirm -ne "S") {
        Write-Host "Cancelado"
        return
    }
    
    Print-Header "Fazendo Logout: $INSTANCE_NAME"
    try {
        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/logout/$INSTANCE_NAME" `
            -Method Delete `
            -Headers @{"apikey" = $EVOLUTION_API_KEY}
        Print-Success "Logout realizado!"
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Print-Error "Erro ao fazer logout: $($_.Exception.Message)"
    }
}

function Delete-Instance {
    Print-Error "⚠️  ATENÇÃO: Esta ação não pode ser desfeita!"
    $confirm = Read-Host "Tem certeza que deseja deletar a instância? (s/N)"
    if ($confirm -ne "s" -and $confirm -ne "S") {
        Write-Host "Cancelado"
        return
    }
    
    Print-Header "Deletando Instância: $INSTANCE_NAME"
    try {
        $response = Invoke-RestMethod -Uri "$EVOLUTION_API_URL/instance/delete/$INSTANCE_NAME" `
            -Method Delete `
            -Headers @{"apikey" = $EVOLUTION_API_KEY}
        Print-Success "Instância deletada!"
        $response | ConvertTo-Json -Depth 10
    }
    catch {
        Print-Error "Erro ao deletar instância: $($_.Exception.Message)"
    }
}

# ============================================
# LOOP PRINCIPAL
# ============================================

while ($true) {
    Show-Menu
    $option = Read-Host "Escolha uma opção"
    
    switch ($option) {
        "1" { Check-Connection }
        "2" { List-Instances }
        "3" { Create-Instance }
        "4" { Get-QRCode }
        "5" { Check-Status }
        "6" { Restart-Instance }
        "7" { Setup-Webhook }
        "8" { Logout-Instance }
        "9" { Delete-Instance }
        "0" { 
            Print-Success "Saindo..."
            exit 0
        }
        default {
            Print-Error "Opção inválida"
        }
    }
    Write-Host ""
    Read-Host "Pressione Enter para continuar"
}

