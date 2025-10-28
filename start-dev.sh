#!/bin/bash

# Script de inicialização rápida para desenvolvimento local
# OnSmart AI - Projeto de Desenvolvimento

echo "🚀 Iniciando configuração do projeto OnSmart AI..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Verificar se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "🔧 Criando arquivo .env..."
    npm run setup:env
    echo "⚠️  IMPORTANTE: Edite o arquivo .env com suas chaves de API!"
else
    echo "✅ Arquivo .env já existe"
fi

echo ""
echo "🎯 Escolha o modo de execução:"
echo "1. Frontend apenas (npm run dev) - http://localhost:8080"
echo "2. Frontend + Backend (npm run dev:full) - http://localhost:8080 + http://localhost:3001"
echo "3. Apenas Backend (npm run server) - http://localhost:3001"
echo ""
echo "💡 Para desenvolvimento rápido, use: npm run dev"
echo "💡 Para testes completos, use: npm run dev:full"
echo ""
echo "🔍 URLs de acesso:"
echo "   Frontend: http://localhost:8080"
echo "   Backend:  http://localhost:3001"
echo ""
echo "📱 Para testar responsividade:"
echo "   1. Abra o DevTools (F12)"
echo "   2. Ative o modo responsivo (Ctrl+Shift+M)"
echo "   3. Teste diferentes tamanhos de tela"
echo ""
echo "✨ Projeto configurado com sucesso!"
