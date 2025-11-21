#!/bin/bash

# Script para configurar Cloudflare Tunnel como serviço do sistema (systemd)
# Execute com sudo

set -e

echo "⚙️  Configurando Cloudflare Tunnel como serviço do sistema..."

# Verificar se está executando como root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Este script precisa ser executado com sudo!"
    echo "   Execute: sudo ./scripts/cloudflared-service.sh"
    exit 1
fi

# Verificar se cloudflared está instalado
if ! command -v cloudflared &> /dev/null; then
    echo "❌ cloudflared não está instalado!"
    echo "   Execute primeiro: ./scripts/install-cloudflared.sh"
    exit 1
fi

# Verificar se o túnel existe
TUNNEL_NAME=${1:-evolution-api}
echo "🔍 Verificando túnel: $TUNNEL_NAME"

if ! cloudflared tunnel list 2>/dev/null | grep -q "$TUNNEL_NAME"; then
    echo "⚠️  Túnel '$TUNNEL_NAME' não encontrado!"
    echo "   Criando túnel..."
    cloudflared tunnel create "$TUNNEL_NAME"
fi

# Verificar se o arquivo de configuração existe
CONFIG_DIR="$HOME/.cloudflared"
CONFIG_FILE="$CONFIG_DIR/config.yml"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "⚠️  Arquivo de configuração não encontrado: $CONFIG_FILE"
    echo "   Criando configuração básica..."
    
    mkdir -p "$CONFIG_DIR"
    cat > "$CONFIG_FILE" << EOF
tunnel: $TUNNEL_NAME
credentials-file: $CONFIG_DIR/$TUNNEL_NAME.json

ingress:
  - hostname: $TUNNEL_NAME.trycloudflare.com
    service: http://localhost:8080
  - service: http_status:404
EOF
    echo "✅ Arquivo de configuração criado: $CONFIG_FILE"
    echo "   Você pode editá-lo se necessário"
fi

# Criar arquivo de serviço systemd
SERVICE_FILE="/etc/systemd/system/cloudflared.service"

echo "📝 Criando arquivo de serviço..."

# Obter caminho do cloudflared
CLOUDFLARED_PATH=$(which cloudflared)

# Obter usuário atual (não root)
if [ -n "$SUDO_USER" ]; then
    SERVICE_USER="$SUDO_USER"
else
    SERVICE_USER=$(logname 2>/dev/null || echo "root")
fi

# Obter diretório home do usuário
SERVICE_HOME=$(eval echo ~$SERVICE_USER)

cat > "$SERVICE_FILE" << EOF
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=$SERVICE_USER
WorkingDirectory=$SERVICE_HOME
ExecStart=$CLOUDFLARED_PATH tunnel run $TUNNEL_NAME
Restart=on-failure
RestartSec=5s
Environment="HOME=$SERVICE_HOME"

[Install]
WantedBy=multi-user.target
EOF

echo "✅ Arquivo de serviço criado: $SERVICE_FILE"

# Recarregar systemd
echo "🔄 Recarregando systemd..."
systemctl daemon-reload

# Habilitar serviço
echo "🔧 Habilitando serviço para iniciar automaticamente..."
systemctl enable cloudflared

# Iniciar serviço
echo "🚀 Iniciando serviço..."
systemctl start cloudflared

# Aguardar um pouco
sleep 2

# Verificar status
if systemctl is-active --quiet cloudflared; then
    echo "✅ Serviço iniciado com sucesso!"
    echo ""
    echo "📊 Status do serviço:"
    systemctl status cloudflared --no-pager -l
    echo ""
    echo "📝 Comandos úteis:"
    echo "   Ver status: sudo systemctl status cloudflared"
    echo "   Ver logs: sudo journalctl -u cloudflared -f"
    echo "   Reiniciar: sudo systemctl restart cloudflared"
    echo "   Parar: sudo systemctl stop cloudflared"
    echo ""
    echo "🔍 Para obter a URL do túnel, verifique os logs:"
    echo "   sudo journalctl -u cloudflared -n 50 | grep -i url"
else
    echo "❌ Erro ao iniciar o serviço"
    echo "   Verifique os logs: sudo journalctl -u cloudflared -n 50"
    exit 1
fi

