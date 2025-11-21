# Script para configurar Cloudflare Tunnel como serviço do Windows
# Execute como Administrador

$ErrorActionPreference = "Stop"

Write-Host "⚙️  Configurando Cloudflare Tunnel como serviço do Windows..." -ForegroundColor Cyan

# Verificar se está executando como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "❌ Este script precisa ser executado como Administrador!" -ForegroundColor Red
    Write-Host "   Clique com botão direito e selecione 'Executar como administrador'" -ForegroundColor Yellow
    exit 1
}

# Verificar se cloudflared está instalado
if (-not (Get-Command cloudflared -ErrorAction SilentlyContinue)) {
    Write-Host "❌ cloudflared não está instalado!" -ForegroundColor Red
    Write-Host "   Execute primeiro: .\scripts\install-cloudflared.ps1" -ForegroundColor Yellow
    exit 1
}

# Nome do túnel
$tunnelName = if ($args.Count -gt 0) { $args[0] } else { "evolution-api" }
Write-Host "🔍 Verificando túnel: $tunnelName" -ForegroundColor Cyan

# Verificar se o túnel existe
$tunnelList = cloudflared tunnel list 2>&1
if ($tunnelList -notmatch $tunnelName) {
    Write-Host "⚠️  Túnel '$tunnelName' não encontrado!" -ForegroundColor Yellow
    Write-Host "   Criando túnel..." -ForegroundColor Cyan
    cloudflared tunnel create $tunnelName
}

# Verificar se o arquivo de configuração existe
$configDir = "$env:USERPROFILE\.cloudflared"
$configFile = Join-Path $configDir "config.yml"

if (-not (Test-Path $configFile)) {
    Write-Host "⚠️  Arquivo de configuração não encontrado: $configFile" -ForegroundColor Yellow
    Write-Host "   Criando configuração básica..." -ForegroundColor Cyan
    
    New-Item -ItemType Directory -Force -Path $configDir | Out-Null
    
    $configContent = @"
tunnel: $tunnelName
credentials-file: $configDir\$tunnelName.json

ingress:
  - hostname: $tunnelName.trycloudflare.com
    service: http://localhost:8080
  - service: http_status:404
"@
    
    $configContent | Out-File -FilePath $configFile -Encoding utf8
    Write-Host "✅ Arquivo de configuração criado: $configFile" -ForegroundColor Green
    Write-Host "   Você pode editá-lo se necessário" -ForegroundColor Yellow
}

# Nome do serviço
$serviceName = "CloudflaredTunnel"
$displayName = "Cloudflare Tunnel"
$description = "Cloudflare Tunnel para Evolution API"

# Caminho do cloudflared
$cloudflaredPath = (Get-Command cloudflared).Source

# Verificar se o serviço já existe
$existingService = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if ($existingService) {
    Write-Host "⚠️  Serviço '$serviceName' já existe!" -ForegroundColor Yellow
    $recreate = Read-Host "Deseja recriar? (s/N)"
    if ($recreate -eq "s" -or $recreate -eq "S") {
        Write-Host "🛑 Parando e removendo serviço existente..." -ForegroundColor Cyan
        if ($existingService.Status -eq "Running") {
            Stop-Service -Name $serviceName -Force
        }
        sc.exe delete $serviceName
        Start-Sleep -Seconds 2
    } else {
        Write-Host "Instalação cancelada."
        exit 0
    }
}

# Criar serviço
Write-Host "📝 Criando serviço do Windows..." -ForegroundColor Cyan

$binaryPath = "`"$cloudflaredPath`" tunnel run $tunnelName"

try {
    New-Service -Name $serviceName `
        -BinaryPathName $binaryPath `
        -DisplayName $displayName `
        -Description $description `
        -StartupType Automatic | Out-Null
    
    Write-Host "✅ Serviço criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao criar serviço: $_" -ForegroundColor Red
    exit 1
}

# Iniciar serviço
Write-Host "🚀 Iniciando serviço..." -ForegroundColor Cyan
try {
    Start-Service -Name $serviceName
    Start-Sleep -Seconds 3
    
    $service = Get-Service -Name $serviceName
    if ($service.Status -eq "Running") {
        Write-Host "✅ Serviço iniciado com sucesso!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Status do serviço:" -ForegroundColor Cyan
        Get-Service -Name $serviceName | Format-List
        Write-Host ""
        Write-Host "📝 Comandos úteis:" -ForegroundColor Yellow
        Write-Host "   Ver status: Get-Service CloudflaredTunnel" -ForegroundColor White
        Write-Host "   Ver logs: Get-EventLog -LogName Application -Source CloudflaredTunnel -Newest 20" -ForegroundColor White
        Write-Host "   Reiniciar: Restart-Service CloudflaredTunnel" -ForegroundColor White
        Write-Host "   Parar: Stop-Service CloudflaredTunnel" -ForegroundColor White
        Write-Host ""
        Write-Host "🔍 Para obter a URL do túnel, verifique os logs do Event Viewer" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️  Serviço criado mas não está rodando. Status: $($service.Status)" -ForegroundColor Yellow
        Write-Host "   Verifique os logs do Event Viewer para mais detalhes" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Erro ao iniciar serviço: $_" -ForegroundColor Red
    Write-Host "   Verifique os logs do Event Viewer" -ForegroundColor Yellow
    exit 1
}

