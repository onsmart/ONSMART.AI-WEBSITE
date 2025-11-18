# 📝 Passo a Passo Rápido - Deploy e Teste

## ⚠️ IMPORTANTE: URL Pública Necessária

O Vercel **NÃO consegue acessar IPs locais** (192.168.x.x). Você precisa de uma **URL pública** para a Evolution API.

**Solução rápida:** Use ngrok no servidor onde está o Docker:
```bash
ngrok http 8080
```
Copie a URL gerada (ex: `https://abc123.ngrok.io`)

---

## 🔧 Passo 1: Configurar Variáveis no Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione estas variáveis (uma por uma):

### Variáveis Obrigatórias:

| Nome | Valor | Ambientes |
|------|-------|-----------|
| `EVOLUTION_API_URL` | `https://abc123.ngrok.io` (URL do ngrok) | ✅ Production, Preview, Development |
| `EVOLUTION_API_KEY` | `sua-api-key` | ✅ Production, Preview, Development |
| `EVOLUTION_INSTANCE_NAME` | `sonia` | ✅ Production, Preview, Development |
| `OPENAI_API_KEY` | `sk-...` | ✅ Production, Preview, Development |

### Variáveis Opcionais (Frontend):

| Nome | Valor | Ambientes |
|------|-------|-----------|
| `VITE_SONIA_PHONE` | `551150931836` | ✅ Production, Preview, Development |

**⚠️ NÃO adicione `EVOLUTION_API_KEY` no frontend!**

---

## 🚀 Passo 2: Fazer Deploy

```bash
git add .
git commit -m "feat: integração Evolution API"
git push origin main
```

O Vercel fará deploy automaticamente.

---

## 🔗 Passo 3: Configurar Webhook

Após o deploy, execute (substitua pelos seus valores):

```bash
curl -X PUT "http://192.168.15.31:8080/webhook/set/sonia" \
  -H "apikey: SUA-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://SEU-PROJETO.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": ["MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE"]
  }'
```

**Substitua:**
- `SUA-API-KEY` pela sua API key da Evolution API
- `SEU-PROJETO.vercel.app` pela URL do seu projeto no Vercel

---

## ✅ Passo 4: Testar

1. **Verificar conexão:**
   - Acesse: `https://seu-projeto.vercel.app/admin`
   - Vá na aba **WhatsApp**
   - Verifique se está **Conectado**

2. **Enviar mensagem:**
   - WhatsApp: **55 11 5093-1836**
   - Envie: "Olá, Sonia!"

3. **Verificar resposta:**
   - A Sonia deve responder automaticamente

4. **Ver logs:**
   - Vercel Dashboard → Deployments → Functions → evolution-webhook

---

## 🔍 Verificar se Está Funcionando

### Teste 1: Webhook está acessível?
```bash
curl https://seu-projeto.vercel.app/api/evolution-webhook
```
Deve retornar: `{"status":"ok"}`

### Teste 2: Webhook configurado na Evolution API?
```bash
curl -X GET "http://192.168.15.31:8080/webhook/find/sonia" \
  -H "apikey: SUA-API-KEY"
```

### Teste 3: Instância conectada?
```bash
curl -X GET "http://192.168.15.31:8080/instance/fetchInstances" \
  -H "apikey: SUA-API-KEY"
```

---

## 🐛 Problemas Comuns

### ❌ "Evolution API não configurada"
- Verifique se as variáveis estão no Vercel
- Faça um novo deploy após adicionar variáveis

### ❌ "Connection refused"
- O Vercel não acessa IPs locais
- Use ngrok ou URL pública

### ❌ Webhook não recebe mensagens
- Verifique se a URL do webhook está correta
- Verifique os logs do Vercel
- Teste o webhook manualmente

---

## 📋 Checklist

Antes de testar:
- [ ] Variáveis configuradas no Vercel
- [ ] URL pública para Evolution API (ngrok ou domínio)
- [ ] Deploy realizado
- [ ] Webhook configurado na Evolution API
- [ ] Instância conectada (status: "open")

---

**Pronto!** Agora é só testar enviando uma mensagem para o WhatsApp da Sonia.


