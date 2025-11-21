# Script para iniciar o Cloudflare Tunnel apontando para a Evolution API (porta 8080)
# Este script inicia um túnel temporário (URL muda a cada execução)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando Cloudflare Tunnel..." -ForegroundColor Cyan

# Verificar se cloudflared está instalado
if (-not (Get-Command cloudflared -ErrorAction SilentlyContinue)) {
    Write-Host "❌ cloudflared não está instalado!" -ForegroundColor Red
    Write-Host "   Execute primeiro: .\scripts\install-cloudflared.ps1" -ForegroundColor Yellow
    exit 1
}

# Verificar se a Evolution API está rodando
Write-Host "🔍 Verificando se a Evolution API está rodando na porta 8080..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
} catch {
    Write-Host "⚠️  Aviso: Não foi possível conectar em http://localhost:8080" -ForegroundColor Yellow
    Write-Host "   Certifique-se de que a Evolution API está rodando" -ForegroundColor Yellow
    $continue = Read-Host "Deseja continuar mesmo assim? (s/N)"
    if ($continue -ne "s" -and $continue -ne "S") {
        exit 1
    }
}

# Porta padrão
$port = if ($args.Count -gt 0) { $args[0] } else { 8080 }

Write-Host "📡 Criando túnel para http://localhost:$port..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⏳ Aguarde... A URL será exibida abaixo:" -ForegroundColor Yellow
Write-Host ""

# Iniciar túnel
cloudflared tunnel --url "http://localhost:$port"

