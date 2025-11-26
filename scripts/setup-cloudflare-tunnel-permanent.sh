#!/bin/bash

# Script completo para configurar túnel permanente do Cloudflare
# Execute com o usuário que rodará o serviço (não precisa ser root, exceto para criar serviço systemd)

set -e

echo "🚀 Configurando Túnel Permanente do Cloudflare"
echo "================================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Variáveis
TUNNEL_NAME="evolution-api-permanent"
SERVICE_PORT="8080"
CLOUDFLARED_DIR="$HOME/.cloudflared"
CONFIG_FILE="$CLOUDFLARED_DIR/config.yml"
SERVICE_FILE="/etc/systemd/system/cloudflared.service"

# Função para imprimir mensagens
print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar se cloudflared está instalado
print_info "Verificando se cloudflared está instalado..."
if ! command -v cloudflared &> /dev/null; then
    print_error "cloudflared não está instalado!"
    echo "Execute primeiro: ./scripts/install-cloudflared.sh"
    exit 1
fi

CLOUDFLARED_VERSION=$(cloudflared --version | head -n1)
print_success "cloudflared encontrado: $CLOUDFLARED_VERSION"
echo ""

# Fase 1: Verificar/Resolver Login
print_info "Fase 1: Verificando autenticação do Cloudflare..."
echo ""

CERT_FILE="$CLOUDFLARED_DIR/cert.pem"

if [ -f "$CERT_FILE" ]; then
    print_success "Arquivo de certificado encontrado: $CERT_FILE"
    print_info "Login já foi realizado anteriormente"
else
    print_warning "Arquivo de certificado não encontrado"
    print_info "Tentando fazer login..."
    echo ""
    echo "Siga estes passos:"
    echo "1. O comando abaixo abrirá uma URL no navegador"
    echo "2. Faça login na sua conta Cloudflare"
    echo "3. Autorize o acesso"
    echo "4. Volte ao terminal e pressione Enter"
    echo ""
    read -p "Pressione Enter para continuar com o login..."
    
    if cloudflared tunnel login 2>&1 | tee /tmp/cloudflared-login.log; then
        if [ -f "$CERT_FILE" ]; then
            print_success "Login realizado com sucesso!"
        else
            print_warning "Login pode ter sido concluído, mas cert.pem não foi encontrado"
            print_info "Verificando se login foi bem-sucedido de outra forma..."
        fi
    else
        print_error "Erro ao fazer login"
        echo ""
        print_info "Alternativa: Use o dashboard web do Cloudflare"
        echo "1. Acesse: https://one.dash.cloudflare.com/"
        echo "2. Vá em: Zero Trust > Access > Tunnels"
        echo "3. Crie um túnel via interface web"
        echo "4. Copie o token e use: cloudflared tunnel create $TUNNEL_NAME --token <token>"
        echo ""
        read -p "Deseja continuar mesmo assim? (s/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Ss]$ ]]; then
            exit 1
        fi
    fi
fi

echo ""

# Fase 2: Criar Túnel Nomeado
print_info "Fase 2: Criando túnel nomeado permanente..."
echo ""

# Verificar se túnel já existe
if cloudflared tunnel list 2>/dev/null | grep -q "$TUNNEL_NAME"; then
    print_warning "Túnel '$TUNNEL_NAME' já existe!"
    read -p "Deseja usar o túnel existente? (S/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        print_info "Removendo túnel existente..."
        cloudflared tunnel delete "$TUNNEL_NAME" || true
        print_info "Criando novo túnel..."
        cloudflared tunnel create "$TUNNEL_NAME"
    else
        print_info "Usando túnel existente"
    fi
else
    print_info "Criando túnel '$TUNNEL_NAME'..."
    if cloudflared tunnel create "$TUNNEL_NAME"; then
        print_success "Túnel criado com sucesso!"
    else
        print_error "Erro ao criar túnel"
        exit 1
    fi
fi

# Obter tunnel ID
TUNNEL_ID=$(cloudflared tunnel list | grep "$TUNNEL_NAME" | awk '{print $1}' | head -n1)
if [ -z "$TUNNEL_ID" ]; then
    print_error "Não foi possível obter o ID do túnel"
    exit 1
fi

print_success "Túnel ID: $TUNNEL_ID"
echo ""

# Fase 3: Configurar config.yml
print_info "Fase 3: Configurando arquivo config.yml..."
echo ""

# Criar diretório se não existir
mkdir -p "$CLOUDFLARED_DIR"

# Verificar se arquivo de credenciais existe
CREDENTIALS_FILE="$CLOUDFLARED_DIR/$TUNNEL_ID.json"
if [ ! -f "$CREDENTIALS_FILE" ]; then
    print_error "Arquivo de credenciais não encontrado: $CREDENTIALS_FILE"
    print_info "Tentando localizar arquivo de credenciais..."
    CREDENTIALS_FILE=$(find "$CLOUDFLARED_DIR" -name "*.json" | head -n1)
    if [ -z "$CREDENTIALS_FILE" ]; then
        print_error "Nenhum arquivo de credenciais encontrado"
        exit 1
    fi
    print_warning "Usando arquivo encontrado: $CREDENTIALS_FILE"
fi

print_success "Arquivo de credenciais: $CREDENTIALS_FILE"

# Obter caminho absoluto
CREDENTIALS_FILE_ABS=$(readlink -f "$CREDENTIALS_FILE" 2>/dev/null || realpath "$CREDENTIALS_FILE" 2>/dev/null || echo "$CREDENTIALS_FILE")

# Criar/atualizar config.yml
print_info "Criando arquivo de configuração: $CONFIG_FILE"

# Escolher hostname (pode ser customizado)
HOSTNAME="evolution-api-onsmart.trycloudflare.com"

cat > "$CONFIG_FILE" << EOF
tunnel: $TUNNEL_ID
credentials-file: $CREDENTIALS_FILE_ABS

ingress:
  - hostname: $HOSTNAME
    service: http://localhost:$SERVICE_PORT
  - service: http_status:404
EOF

print_success "Arquivo config.yml criado/atualizado"
echo "Conteúdo do arquivo:"
cat "$CONFIG_FILE"
echo ""

# Fase 4: Testar Túnel Manualmente
print_info "Fase 4: Testando túnel manualmente..."
echo ""
print_warning "IMPORTANTE: O túnel será iniciado em modo de teste"
print_info "Pressione Ctrl+C para parar o teste e continuar com a configuração do serviço"
echo ""
read -p "Pressione Enter para iniciar o teste (ou Ctrl+C para pular)..."
echo ""

# Iniciar túnel em background para teste rápido
print_info "Iniciando túnel para teste..."
timeout 10 cloudflared tunnel run "$TUNNEL_NAME" 2>&1 | tee /tmp/cloudflared-test.log &
TUNNEL_PID=$!

sleep 5

# Verificar se processo ainda está rodando
if kill -0 $TUNNEL_PID 2>/dev/null; then
    print_success "Túnel iniciou com sucesso!"
    kill $TUNNEL_PID 2>/dev/null || true
    wait $TUNNEL_PID 2>/dev/null || true
else
    print_warning "Túnel pode ter terminado rapidamente (normal em teste)"
fi

# Verificar logs para URL
if grep -q "https://" /tmp/cloudflared-test.log 2>/dev/null; then
    TUNNEL_URL=$(grep -oP 'https://[^\s]+\.trycloudflare\.com' /tmp/cloudflared-test.log | head -n1)
    if [ -n "$TUNNEL_URL" ]; then
        print_success "URL do túnel encontrada: $TUNNEL_URL"
        echo "$TUNNEL_URL" > /tmp/cloudflare-tunnel-url.txt
    fi
fi

echo ""

# Fase 5: Configurar Serviço systemd
print_info "Fase 5: Configurando serviço systemd..."
echo ""

# Verificar se está executando como root para criar serviço
if [ "$EUID" -ne 0 ]; then
    print_warning "Este script precisa ser executado com sudo para criar o serviço systemd"
    echo ""
    print_info "Criando script auxiliar para ser executado com sudo..."
    
    cat > /tmp/create-cloudflared-service.sh << 'SERVICESCRIPT'
#!/bin/bash
# Script auxiliar para criar serviço systemd (executar com sudo)

TUNNEL_NAME="$1"
USER="$2"
CLOUDFLARED_PATH="$3"

if [ -z "$TUNNEL_NAME" ] || [ -z "$USER" ] || [ -z "$CLOUDFLARED_PATH" ]; then
    echo "Uso: $0 <tunnel-name> <user> <cloudflared-path>"
    exit 1
fi

SERVICE_FILE="/etc/systemd/system/cloudflared.service"
USER_HOME=$(eval echo ~$USER)

cat > "$SERVICE_FILE" << EOF
[Unit]
Description=Cloudflare Tunnel para Evolution API
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$USER_HOME
ExecStart=$CLOUDFLARED_PATH tunnel run $TUNNEL_NAME
Restart=on-failure
RestartSec=5s
Environment="HOME=$USER_HOME"

[Install]
WantedBy=multi-user.target
EOF

echo "✅ Arquivo de serviço criado: $SERVICE_FILE"
SERVICESCRIPT

    chmod +x /tmp/create-cloudflared-service.sh
    
    CURRENT_USER=$(whoami)
    CLOUDFLARED_PATH=$(which cloudflared)
    
    print_info "Execute o seguinte comando com sudo:"
    echo ""
    echo "  sudo /tmp/create-cloudflared-service.sh $TUNNEL_NAME $CURRENT_USER $CLOUDFLARED_PATH"
    echo ""
    read -p "Deseja executar agora? (S/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        sudo /tmp/create-cloudflared-service.sh "$TUNNEL_NAME" "$CURRENT_USER" "$CLOUDFLARED_PATH"
        print_success "Serviço criado!"
    else
        print_warning "Serviço não foi criado. Execute manualmente depois."
    fi
else
    # Executando como root
    CURRENT_USER=${SUDO_USER:-$(logname 2>/dev/null || echo "root")}
    USER_HOME=$(eval echo ~$CURRENT_USER)
    CLOUDFLARED_PATH=$(which cloudflared)
    
    cat > "$SERVICE_FILE" << EOF
[Unit]
Description=Cloudflare Tunnel para Evolution API
After=network.target

[Service]
Type=simple
User=$CURRENT_USER
WorkingDirectory=$USER_HOME
ExecStart=$CLOUDFLARED_PATH tunnel run $TUNNEL_NAME
Restart=on-failure
RestartSec=5s
Environment="HOME=$USER_HOME"

[Install]
WantedBy=multi-user.target
EOF

    print_success "Arquivo de serviço criado: $SERVICE_FILE"
fi

echo ""

# Recarregar systemd e habilitar serviço
if [ -f "$SERVICE_FILE" ]; then
    print_info "Recarregando systemd..."
    sudo systemctl daemon-reload
    
    print_info "Habilitando serviço para iniciar automaticamente..."
    sudo systemctl enable cloudflared
    
    print_info "Iniciando serviço..."
    sudo systemctl start cloudflared
    
    sleep 3
    
    if sudo systemctl is-active --quiet cloudflared; then
        print_success "Serviço iniciado com sucesso!"
    else
        print_error "Serviço não está rodando"
        print_info "Verifique os logs: sudo journalctl -u cloudflared -n 50"
    fi
fi

echo ""

# Fase 6: Obter URL Fixa
print_info "Fase 6: Obtendo URL fixa do túnel..."
echo ""

sleep 2

# Tentar obter URL dos logs
TUNNEL_URL=$(sudo journalctl -u cloudflared -n 100 2>/dev/null | grep -oP 'https://[^\s]+\.trycloudflare\.com' | head -n1)

if [ -z "$TUNNEL_URL" ]; then
    # Tentar via info do túnel
    TUNNEL_URL=$(cloudflared tunnel info "$TUNNEL_NAME" 2>/dev/null | grep -oP 'https://[^\s]+\.trycloudflare\.com' | head -n1)
fi

if [ -n "$TUNNEL_URL" ]; then
    print_success "URL fixa do túnel: $TUNNEL_URL"
    echo "$TUNNEL_URL" > /tmp/cloudflare-tunnel-url.txt
    echo ""
    print_info "IMPORTANTE: Anote esta URL!"
    echo "  $TUNNEL_URL"
    echo ""
else
    print_warning "Não foi possível obter a URL automaticamente"
    print_info "Verifique os logs: sudo journalctl -u cloudflared -n 100 | grep -i https"
fi

echo ""

# Resumo
print_success "Configuração concluída!"
echo ""
echo "================================================"
echo "📋 RESUMO DA CONFIGURAÇÃO"
echo "================================================"
echo "Túnel nomeado: $TUNNEL_NAME"
echo "Túnel ID: $TUNNEL_ID"
echo "Arquivo de config: $CONFIG_FILE"
echo "Arquivo de credenciais: $CREDENTIALS_FILE_ABS"
if [ -n "$TUNNEL_URL" ]; then
    echo "URL fixa: $TUNNEL_URL"
fi
echo ""
echo "📝 PRÓXIMOS PASSOS:"
echo "1. Se obteve a URL, atualize EVOLUTION_API_BASE_URL na Vercel"
echo "2. Atualize o webhook na Evolution API com a nova URL"
echo "3. Teste enviando uma mensagem no WhatsApp"
echo ""
echo "🔧 COMANDOS ÚTEIS:"
echo "  Ver status: sudo systemctl status cloudflared"
echo "  Ver logs: sudo journalctl -u cloudflared -f"
echo "  Reiniciar: sudo systemctl restart cloudflared"
echo "  Parar: sudo systemctl stop cloudflared"
echo ""

