#!/bin/bash

# Script de Configuração WhatsApp Evolution API
# Substitua as variáveis abaixo pelos seus valores

# ============================================
# CONFIGURAÇÕES - ALTERE AQUI
# ============================================
EVOLUTION_API_URL="SUA_URL_API"           # Exemplo: http://localhost:8080
EVOLUTION_API_KEY="SUA_CHAVE_API"         # Exemplo: abc123xyz456
INSTANCE_NAME="SEU_NOME_INSTANCIA"        # Exemplo: sonia
VERCEL_URL="SEU_PROJETO.vercel.app"       # Exemplo: onsmart-website.vercel.app

# ============================================
# CORES PARA OUTPUT
# ============================================
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================
# FUNÇÕES
# ============================================

print_header() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}========================================${NC}"
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

# ============================================
# VALIDAÇÃO
# ============================================

if [ "$EVOLUTION_API_URL" == "SUA_URL_API" ] || [ "$EVOLUTION_API_KEY" == "SUA_CHAVE_API" ] || [ "$INSTANCE_NAME" == "SEU_NOME_INSTANCIA" ]; then
    print_error "Por favor, configure as variáveis no início do script!"
    exit 1
fi

# ============================================
# MENU
# ============================================

show_menu() {
    echo ""
    print_header "Menu de Configuração WhatsApp"
    echo "1. Verificar conexão com a API"
    echo "2. Listar instâncias existentes"
    echo "3. Criar nova instância"
    echo "4. Obter QR Code"
    echo "5. Verificar status da instância"
    echo "6. Reiniciar instância"
    echo "7. Configurar webhook"
    echo "8. Fazer logout"
    echo "9. Deletar instância"
    echo "0. Sair"
    echo ""
    read -p "Escolha uma opção: " option
}

# ============================================
# OPÇÕES
# ============================================

check_connection() {
    print_header "Verificando Conexão"
    response=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    if [ $? -eq 0 ]; then
        print_success "Conexão estabelecida!"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
    else
        print_error "Falha na conexão"
    fi
}

list_instances() {
    print_header "Listando Instâncias"
    response=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    if [ $? -eq 0 ]; then
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
    else
        print_error "Erro ao listar instâncias"
    fi
}

create_instance() {
    print_header "Criando Instância: $INSTANCE_NAME"
    response=$(curl -s -X POST "$EVOLUTION_API_URL/instance/create" \
        -H "apikey: $EVOLUTION_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"instanceName\": \"$INSTANCE_NAME\",
            \"qrcode\": true,
            \"integration\": \"WHATSAPP-BAILEYS\"
        }")
    
    if [ $? -eq 0 ]; then
        print_success "Instância criada!"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
    else
        print_error "Erro ao criar instância"
    fi
}

get_qrcode() {
    print_header "Obtendo QR Code"
    response=$(curl -s -X GET "$EVOLUTION_API_URL/instance/connect/$INSTANCE_NAME" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    if [ $? -eq 0 ]; then
        qrcode=$(echo "$response" | jq -r '.qrcode.base64' 2>/dev/null)
        if [ "$qrcode" != "null" ] && [ -n "$qrcode" ]; then
            print_success "QR Code obtido!"
            echo ""
            echo "Salvando QR Code em qrcode.png..."
            echo "$qrcode" | base64 -d > qrcode.png 2>/dev/null
            if [ $? -eq 0 ]; then
                print_success "QR Code salvo em qrcode.png"
                echo "Abra o arquivo para escanear com o WhatsApp"
            else
                print_warning "Não foi possível salvar a imagem, mas o base64 está na resposta:"
                echo "$response" | jq '.' 2>/dev/null || echo "$response"
            fi
        else
            print_warning "QR Code não disponível. Resposta:"
            echo "$response" | jq '.' 2>/dev/null || echo "$response"
        fi
    else
        print_error "Erro ao obter QR Code"
    fi
}

check_status() {
    print_header "Verificando Status: $INSTANCE_NAME"
    response=$(curl -s -X GET "$EVOLUTION_API_URL/instance/fetchInstances" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    if [ $? -eq 0 ]; then
        status=$(echo "$response" | jq -r ".[] | select(.instanceName == \"$INSTANCE_NAME\") | .instance.status" 2>/dev/null)
        if [ -n "$status" ]; then
            case $status in
                "open")
                    print_success "Status: CONECTADO ✅"
                    ;;
                "qrcode")
                    print_warning "Status: AGUARDANDO QR CODE ⏳"
                    ;;
                "close")
                    print_error "Status: DESCONECTADO ❌"
                    ;;
                "connecting")
                    print_warning "Status: CONECTANDO 🔄"
                    ;;
                *)
                    echo "Status: $status"
                    ;;
            esac
            echo ""
            echo "$response" | jq ".[] | select(.instanceName == \"$INSTANCE_NAME\")" 2>/dev/null || echo "$response"
        else
            print_warning "Instância não encontrada"
        fi
    else
        print_error "Erro ao verificar status"
    fi
}

restart_instance() {
    print_header "Reiniciando Instância: $INSTANCE_NAME"
    response=$(curl -s -X PUT "$EVOLUTION_API_URL/instance/restart/$INSTANCE_NAME" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    if [ $? -eq 0 ]; then
        print_success "Instância reiniciada!"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
    else
        print_error "Erro ao reiniciar instância"
    fi
}

setup_webhook() {
    if [ "$VERCEL_URL" == "SEU_PROJETO.vercel.app" ]; then
        print_error "Configure VERCEL_URL no início do script!"
        return
    fi
    
    print_header "Configurando Webhook"
    response=$(curl -s -X PUT "$EVOLUTION_API_URL/webhook/set/$INSTANCE_NAME" \
        -H "apikey: $EVOLUTION_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"url\": \"https://$VERCEL_URL/api/evolution-webhook\",
            \"webhook_by_events\": true,
            \"webhook_base64\": false,
            \"events\": [\"MESSAGES_UPSERT\", \"MESSAGES_UPDATE\", \"CONNECTION_UPDATE\"]
        }")
    
    if [ $? -eq 0 ]; then
        print_success "Webhook configurado!"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
    else
        print_error "Erro ao configurar webhook"
    fi
}

logout_instance() {
    print_warning "Tem certeza que deseja fazer logout? (s/N)"
    read -r confirm
    if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
        echo "Cancelado"
        return
    fi
    
    print_header "Fazendo Logout: $INSTANCE_NAME"
    response=$(curl -s -X DELETE "$EVOLUTION_API_URL/instance/logout/$INSTANCE_NAME" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    if [ $? -eq 0 ]; then
        print_success "Logout realizado!"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
    else
        print_error "Erro ao fazer logout"
    fi
}

delete_instance() {
    print_error "⚠️  ATENÇÃO: Esta ação não pode ser desfeita!"
    print_warning "Tem certeza que deseja deletar a instância? (s/N)"
    read -r confirm
    if [ "$confirm" != "s" ] && [ "$confirm" != "S" ]; then
        echo "Cancelado"
        return
    fi
    
    print_header "Deletando Instância: $INSTANCE_NAME"
    response=$(curl -s -X DELETE "$EVOLUTION_API_URL/instance/delete/$INSTANCE_NAME" \
        -H "apikey: $EVOLUTION_API_KEY")
    
    if [ $? -eq 0 ]; then
        print_success "Instância deletada!"
        echo "$response" | jq '.' 2>/dev/null || echo "$response"
    else
        print_error "Erro ao deletar instância"
    fi
}

# ============================================
# LOOP PRINCIPAL
# ============================================

while true; do
    show_menu
    case $option in
        1) check_connection ;;
        2) list_instances ;;
        3) create_instance ;;
        4) get_qrcode ;;
        5) check_status ;;
        6) restart_instance ;;
        7) setup_webhook ;;
        8) logout_instance ;;
        9) delete_instance ;;
        0) 
            print_success "Saindo..."
            exit 0
            ;;
        *)
            print_error "Opção inválida"
            ;;
    esac
    echo ""
    read -p "Pressione Enter para continuar..."
done

