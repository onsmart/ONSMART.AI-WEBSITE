# 📱 Guia Passo a Passo - Configuração WhatsApp Evolution API

## 📋 Informações Necessárias

Antes de começar, você precisa ter:
- ✅ **Nome da Instância**: `SEU_NOME_INSTANCIA` (ex: `sonia`, `onsmart`, etc)
- ✅ **URL da API**: `SUA_URL_API` (ex: `http://localhost:8080` ou `https://api.exemplo.com`)
- ✅ **Chave API**: `SUA_CHAVE_API` (ex: `abc123xyz456`)

---

## 🔧 PASSO 1: Configurar Variáveis de Ambiente (Desenvolvimento Local)

### 1.1 Criar arquivo `.env.local` na raiz do projeto

```bash
# No terminal, na raiz do projeto:
touch .env.local
```

### 1.2 Adicionar as variáveis no arquivo `.env.local`

Abra o arquivo `.env.local` e adicione (substitua pelos seus valores):

```env
# Evolution API - Backend (usado pelo server.js e API routes)
EVOLUTION_API_URL=SUA_URL_API
EVOLUTION_API_KEY=SUA_CHAVE_API
EVOLUTION_INSTANCE_NAME=SEU_NOME_INSTANCIA

# Evolution API - Frontend (opcional, apenas se quiser configurar no frontend)
VITE_EVOLUTION_API_URL=SUA_URL_API
VITE_EVOLUTION_INSTANCE_NAME=SEU_NOME_INSTANCIA

# Exemplo:
# EVOLUTION_API_URL=http://localhost:8080
# EVOLUTION_API_KEY=abc123xyz456
# EVOLUTION_INSTANCE_NAME=sonia
# VITE_EVOLUTION_API_URL=http://localhost:8080
# VITE_EVOLUTION_INSTANCE_NAME=sonia
```

**⚠️ IMPORTANTE:** 
- NÃO adicione `VITE_EVOLUTION_API_KEY` no frontend (segurança)
- A API key fica apenas no backend

---

## 🌐 PASSO 2: Configurar Variáveis no Vercel (Produção)

### 2.1 Acessar o Painel do Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**

### 2.2 Adicionar Variáveis (uma por uma)

Clique em **Add New** e adicione cada variável:

#### Variável 1:
- **Name**: `EVOLUTION_API_URL`
- **Value**: `SUA_URL_API`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### Variável 2:
- **Name**: `EVOLUTION_API_KEY`
- **Value**: `SUA_CHAVE_API`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### Variável 3:
- **Name**: `EVOLUTION_INSTANCE_NAME`
- **Value**: `SEU_NOME_INSTANCIA`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### Variável 4 (Opcional - Frontend):
- **Name**: `VITE_EVOLUTION_API_URL`
- **Value**: `SUA_URL_API`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### Variável 5 (Opcional - Frontend):
- **Name**: `VITE_EVOLUTION_INSTANCE_NAME`
- **Value**: `SEU_NOME_INSTANCIA`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

---

## 🧪 PASSO 3: Testar Conexão com a Evolution API

### 3.1 Verificar se a API está acessível

```bash
# Teste básico de conectividade
curl -X GET "SUA_URL_API/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API"
```

**Substitua:**
- `SUA_URL_API` pela sua URL
- `SUA_CHAVE_API` pela sua chave API

**Exemplo:**
```bash
curl -X GET "http://localhost:8080/instance/fetchInstances" \
  -H "apikey: abc123xyz456"
```

### 3.2 Verificar instâncias existentes

```bash
curl -X GET "SUA_URL_API/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API" \
  -H "Content-Type: application/json"
```

---

## 🚀 PASSO 4: Criar Instância do WhatsApp

### 4.1 Criar nova instância

```bash
curl -X POST "SUA_URL_API/instance/create" \
  -H "apikey: SUA_CHAVE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "SEU_NOME_INSTANCIA",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

**Substitua:**
- `SUA_URL_API` pela sua URL
- `SUA_CHAVE_API` pela sua chave API
- `SEU_NOME_INSTANCIA` pelo nome da instância

**Exemplo:**
```bash
curl -X POST "http://localhost:8080/instance/create" \
  -H "apikey: abc123xyz456" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "sonia",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

### 4.2 Obter QR Code para conexão

```bash
curl -X GET "SUA_URL_API/instance/connect/SEU_NOME_INSTANCIA" \
  -H "apikey: SUA_CHAVE_API"
```

**Substitua:**
- `SUA_URL_API` pela sua URL
- `SUA_CHAVE_API` pela sua chave API
- `SEU_NOME_INSTANCIA` pelo nome da instância

**Exemplo:**
```bash
curl -X GET "http://localhost:8080/instance/connect/sonia" \
  -H "apikey: abc123xyz456"
```

A resposta conterá o QR Code em base64. Você pode:
- Usar a interface Admin do site (Admin → WhatsApp → Obter QR Code)
- Ou converter o base64 para imagem

---

## 📊 PASSO 5: Verificar Status da Instância

### 5.1 Verificar status atual

```bash
curl -X GET "SUA_URL_API/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API" | grep -A 10 "SEU_NOME_INSTANCIA"
```

**Substitua:**
- `SUA_URL_API` pela sua URL
- `SUA_CHAVE_API` pela sua chave API
- `SEU_NOME_INSTANCIA` pelo nome da instância

**Exemplo:**
```bash
curl -X GET "http://localhost:8080/instance/fetchInstances" \
  -H "apikey: abc123xyz456" | grep -A 10 "sonia"
```

### 5.2 Status esperado

- `"status": "open"` → ✅ Conectado e funcionando
- `"status": "qrcode"` → ⏳ Aguardando escanear QR Code
- `"status": "close"` → ❌ Desconectado
- `"status": "connecting"` → 🔄 Conectando

---

## 🔗 PASSO 6: Configurar Webhook (Opcional)

### 6.1 Configurar webhook para receber mensagens

```bash
curl -X PUT "SUA_URL_API/webhook/set/SEU_NOME_INSTANCIA" \
  -H "apikey: SUA_CHAVE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://SEU_PROJETO.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": ["MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE"]
  }'
```

**Substitua:**
- `SUA_URL_API` pela sua URL
- `SUA_CHAVE_API` pela sua chave API
- `SEU_NOME_INSTANCIA` pelo nome da instância
- `SEU_PROJETO.vercel.app` pela URL do seu projeto no Vercel

**Exemplo:**
```bash
curl -X PUT "http://localhost:8080/webhook/set/sonia" \
  -H "apikey: abc123xyz456" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://onsmart-website.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": ["MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE"]
  }'
```

---

## 🧹 PASSO 7: Comandos de Manutenção

### 7.1 Reiniciar instância

```bash
curl -X PUT "SUA_URL_API/instance/restart/SEU_NOME_INSTANCIA" \
  -H "apikey: SUA_CHAVE_API"
```

### 7.2 Fazer logout (desconectar)

```bash
curl -X DELETE "SUA_URL_API/instance/logout/SEU_NOME_INSTANCIA" \
  -H "apikey: SUA_CHAVE_API"
```

### 7.3 Deletar instância

```bash
curl -X DELETE "SUA_URL_API/instance/delete/SEU_NOME_INSTANCIA" \
  -H "apikey: SUA_CHAVE_API"
```

**⚠️ CUIDADO:** Deletar a instância remove todas as configurações. Você precisará criar novamente e escanear o QR Code.

---

## 🎯 PASSO 8: Configurar via Interface Admin (Recomendado)

### 8.1 Acessar a interface

1. Inicie o servidor local:
   ```bash
   npm run dev:full
   ```

2. Acesse: http://localhost:5173/admin

3. Vá na aba **WhatsApp**

### 8.2 Configurar

1. Preencha:
   - **URL da API**: `SUA_URL_API`
   - **Nome da Instância**: `SEU_NOME_INSTANCIA`

2. Clique em **Salvar Configuração**

3. Clique em **Criar Instância** ou **Obter QR Code**

4. Escaneie o QR Code com o WhatsApp

5. Aguarde o status mudar para **"Conectado"** ✅

### 8.3 Ativar Reconexão Automática

- A reconexão automática já vem ativada por padrão
- O sistema verificará a conexão a cada 30 segundos
- Se desconectar, tentará reconectar automaticamente

---

## 📝 Resumo Rápido - Comandos Essenciais

```bash
# 1. Criar instância
curl -X POST "SUA_URL_API/instance/create" \
  -H "apikey: SUA_CHAVE_API" \
  -H "Content-Type: application/json" \
  -d '{"instanceName": "SEU_NOME_INSTANCIA", "qrcode": true, "integration": "WHATSAPP-BAILEYS"}'

# 2. Obter QR Code
curl -X GET "SUA_URL_API/instance/connect/SEU_NOME_INSTANCIA" \
  -H "apikey: SUA_CHAVE_API"

# 3. Verificar status
curl -X GET "SUA_URL_API/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API"

# 4. Reiniciar (se necessário)
curl -X PUT "SUA_URL_API/instance/restart/SEU_NOME_INSTANCIA" \
  -H "apikey: SUA_CHAVE_API"
```

---

## ❓ Troubleshooting

### Problema: "Evolution API não configurada"

**Solução:**
- Verifique se as variáveis estão no `.env.local` (local) ou no Vercel (produção)
- Reinicie o servidor após adicionar variáveis

### Problema: QR Code não aparece

**Solução:**
- Verifique se a instância foi criada: `curl -X GET "SUA_URL_API/instance/fetchInstances" -H "apikey: SUA_CHAVE_API"`
- Tente obter o QR Code novamente
- Verifique se a Evolution API está rodando

### Problema: Status sempre "close"

**Solução:**
- Verifique se escaneou o QR Code corretamente
- Tente reiniciar a instância
- Verifique os logs da Evolution API

### Problema: Não recebe mensagens

**Solução:**
- Verifique se o webhook está configurado
- Verifique se a URL do webhook está acessível publicamente
- Verifique os logs do Vercel

---

## ✅ Checklist Final

- [ ] Variáveis configuradas no `.env.local` (desenvolvimento)
- [ ] Variáveis configuradas no Vercel (produção)
- [ ] Instância criada
- [ ] QR Code escaneado
- [ ] Status = "open" (conectado)
- [ ] Webhook configurado (opcional)
- [ ] Reconexão automática ativada
- [ ] Teste enviando uma mensagem

---

**🎉 Pronto! Seu WhatsApp está configurado e conectado!**


