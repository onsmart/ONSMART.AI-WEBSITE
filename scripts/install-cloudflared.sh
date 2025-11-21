#!/bin/bash

# Script de instalação do Cloudflare Tunnel (cloudflared) para Linux/Mac
# Este script instala o cloudflared no sistema

set -e

echo "🚀 Instalando Cloudflare Tunnel (cloudflared)..."

# Detectar sistema operacional
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
else
    echo "❌ Sistema operacional não suportado: $OSTYPE"
    exit 1
fi

# Detectar arquitetura
ARCH=$(uname -m)
if [[ "$ARCH" == "x86_64" ]]; then
    ARCH="amd64"
elif [[ "$ARCH" == "aarch64" ]] || [[ "$ARCH" == "arm64" ]]; then
    ARCH="arm64"
else
    echo "❌ Arquitetura não suportada: $ARCH"
    exit 1
fi

echo "📦 Sistema detectado: $OS ($ARCH)"

# Verificar se já está instalado
if command -v cloudflared &> /dev/null; then
    CURRENT_VERSION=$(cloudflared --version | head -n1)
    echo "✅ cloudflared já está instalado: $CURRENT_VERSION"
    read -p "Deseja reinstalar? (s/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Instalação cancelada."
        exit 0
    fi
fi

# Baixar última versão
echo "📥 Baixando cloudflared..."

if [[ "$OS" == "linux" ]]; then
    DOWNLOAD_URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-${ARCH}"
    INSTALL_PATH="/usr/local/bin/cloudflared"
elif [[ "$OS" == "macos" ]]; then
    DOWNLOAD_URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-${ARCH}"
    INSTALL_PATH="/usr/local/bin/cloudflared"
fi

# Criar arquivo temporário
TEMP_FILE=$(mktemp)

# Baixar
if command -v curl &> /dev/null; then
    curl -L -o "$TEMP_FILE" "$DOWNLOAD_URL"
elif command -v wget &> /dev/null; then
    wget -O "$TEMP_FILE" "$DOWNLOAD_URL"
else
    echo "❌ É necessário ter curl ou wget instalado"
    exit 1
fi

# Tornar executável
chmod +x "$TEMP_FILE"

# Mover para local de instalação
echo "📦 Instalando em $INSTALL_PATH..."
sudo mv "$TEMP_FILE" "$INSTALL_PATH"

# Verificar instalação
if cloudflared --version &> /dev/null; then
    VERSION=$(cloudflared --version | head -n1)
    echo "✅ cloudflared instalado com sucesso!"
    echo "   Versão: $VERSION"
    echo "   Localização: $INSTALL_PATH"
    echo ""
    echo "🎯 Próximos passos:"
    echo "   1. Criar túnel: cloudflared tunnel create evolution-api"
    echo "   2. Configurar: editar ~/.cloudflared/config.yml"
    echo "   3. Iniciar: cloudflared tunnel run evolution-api"
    echo "   4. Ou usar o script: ./scripts/start-cloudflared.sh"
else
    echo "❌ Erro na instalação"
    exit 1
fi

