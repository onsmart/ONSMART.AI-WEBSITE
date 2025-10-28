@echo off
REM Script de inicialização rápida para desenvolvimento local
REM OnSmart AI - Projeto de Desenvolvimento

echo 🚀 Iniciando configuração do projeto OnSmart AI...

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale o Node.js primeiro.
    pause
    exit /b 1
)

REM Verificar se npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm não encontrado. Por favor, instale o npm primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js e npm encontrados

REM Instalar dependências
echo 📦 Instalando dependências...
npm install

REM Verificar se o arquivo .env existe
if not exist ".env" (
    echo 🔧 Criando arquivo .env...
    npm run setup:env
    echo ⚠️  IMPORTANTE: Edite o arquivo .env com suas chaves de API!
) else (
    echo ✅ Arquivo .env já existe
)

echo.
echo 🎯 Escolha o modo de execução:
echo 1. Frontend apenas (npm run dev) - http://localhost:8080
echo 2. Frontend + Backend (npm run dev:full) - http://localhost:8080 + http://localhost:3001
echo 3. Apenas Backend (npm run server) - http://localhost:3001
echo.
echo 💡 Para desenvolvimento rápido, use: npm run dev
echo 💡 Para testes completos, use: npm run dev:full
echo.
echo 🔍 URLs de acesso:
echo    Frontend: http://localhost:8080
echo    Backend:  http://localhost:3001
echo.
echo 📱 Para testar responsividade:
echo    1. Abra o DevTools (F12)
echo    2. Ative o modo responsivo (Ctrl+Shift+M)
echo    3. Teste diferentes tamanhos de tela
echo.
echo ✨ Projeto configurado com sucesso!
pause
