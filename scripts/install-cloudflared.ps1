# Script de instalação do Cloudflare Tunnel (cloudflared) para Windows
# Execute como Administrador

$ErrorActionPreference = "Stop"

Write-Host "🚀 Instalando Cloudflare Tunnel (cloudflared)..." -ForegroundColor Cyan

# Verificar se está executando como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "❌ Este script precisa ser executado como Administrador!" -ForegroundColor Red
    Write-Host "   Clique com botão direito e selecione 'Executar como administrador'" -ForegroundColor Yellow
    exit 1
}

# Verificar se já está instalado
if (Get-Command cloudflared -ErrorAction SilentlyContinue) {
    $currentVersion = cloudflared --version 2>&1 | Select-Object -First 1
    Write-Host "✅ cloudflared já está instalado: $currentVersion" -ForegroundColor Yellow
    $reinstall = Read-Host "Deseja reinstalar? (s/N)"
    if ($reinstall -ne "s" -and $reinstall -ne "S") {
        Write-Host "Instalação cancelada."
        exit 0
    }
}

# Detectar arquitetura
$arch = "amd64"
if ([Environment]::Is64BitOperatingSystem) {
    $arch = "amd64"
} else {
    $arch = "386"
}

Write-Host "📦 Sistema detectado: Windows ($arch)" -ForegroundColor Cyan

# Diretório de instalação
$installDir = "C:\Program Files\cloudflared"
$installPath = Join-Path $installDir "cloudflared.exe"

# URL de download
$downloadUrl = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-${arch}.exe"

# Criar diretório se não existir
if (-not (Test-Path $installDir)) {
    Write-Host "📁 Criando diretório de instalação..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Path $installDir -Force | Out-Null
}

# Baixar cloudflared
Write-Host "📥 Baixando cloudflared..." -ForegroundColor Cyan
$tempFile = Join-Path $env:TEMP "cloudflared.exe"

try {
    Invoke-WebRequest -Uri $downloadUrl -OutFile $tempFile -UseBasicParsing
    Write-Host "✅ Download concluído" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao baixar: $_" -ForegroundColor Red
    exit 1
}

# Mover para local de instalação
Write-Host "📦 Instalando em $installPath..." -ForegroundColor Cyan
Move-Item -Path $tempFile -Destination $installPath -Force

# Adicionar ao PATH se não estiver
$currentPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine)
if ($currentPath -notlike "*$installDir*") {
    Write-Host "🔧 Adicionando ao PATH..." -ForegroundColor Cyan
    $newPath = $currentPath + ";$installDir"
    [Environment]::SetEnvironmentVariable("Path", $newPath, [EnvironmentVariableTarget]::Machine)
    
    # Atualizar PATH da sessão atual
    $env:Path += ";$installDir"
}

# Verificar instalação
Start-Sleep -Seconds 2
if (Get-Command cloudflared -ErrorAction SilentlyContinue) {
    $version = cloudflared --version 2>&1 | Select-Object -First 1
    Write-Host "✅ cloudflared instalado com sucesso!" -ForegroundColor Green
    Write-Host "   Versão: $version" -ForegroundColor Cyan
    Write-Host "   Localização: $installPath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🎯 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   1. Criar túnel: cloudflared tunnel create evolution-api" -ForegroundColor White
    Write-Host "   2. Configurar: editar `$env:USERPROFILE\.cloudflared\config.yml" -ForegroundColor White
    Write-Host "   3. Iniciar: cloudflared tunnel run evolution-api" -ForegroundColor White
    Write-Host "   4. Ou usar o script: .\scripts\start-cloudflared.ps1" -ForegroundColor White
} else {
    Write-Host "⚠️  cloudflared instalado, mas pode ser necessário reiniciar o terminal" -ForegroundColor Yellow
    Write-Host "   Tente executar: cloudflared --version" -ForegroundColor White
}

