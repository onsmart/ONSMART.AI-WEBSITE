# 🚀 Guia Completo - Deploy e Teste da Evolution API no Vercel

Este guia explica como configurar e testar a integração da Sonia com WhatsApp **apenas em produção (Vercel)**, mantendo as variáveis sensíveis seguras no backend.

## 📋 Pré-requisitos

1. ✅ Código já implementado (webhook, serviços, etc)
2. ✅ Conta no Vercel
3. ✅ Evolution API rodando no Docker do servidor
4. ✅ URL pública para acessar a Evolution API (não pode ser IP local)

## ⚠️ IMPORTANTE: URL Pública Necessária

O Vercel **NÃO consegue acessar IPs locais** (192.168.x.x). Você precisa de uma URL pública para a Evolution API.

### Opções:

1. **Usar ngrok** (para testes rápidos):
   ```bash
   ngrok http 8080
   ```
   Use a URL gerada (ex: `https://abc123.ngrok.io`)

2. **Configurar domínio** apontando para o servidor
3. **Usar um serviço de hospedagem** com IP público

## 🔧 Passo 1: Configurar Variáveis no Vercel

### 1.1 Acesse o Painel do Vercel

1. Vá para: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**

### 1.2 Adicione as Variáveis

Adicione as seguintes variáveis (uma por uma):

#### Variáveis do Backend (Serverless Functions):

| Nome | Valor | Ambiente |
|------|-------|----------|
| `EVOLUTION_API_URL` | `https://sua-url-publica.com` ou `https://abc123.ngrok.io` | **Production, Preview, Development** |
| `EVOLUTION_API_KEY` | `sua-api-key-da-evolution` | **Production, Preview, Development** |
| `EVOLUTION_INSTANCE_NAME` | `sonia` | **Production, Preview, Development** |
| `OPENAI_API_KEY` | `sk-...` (sua chave OpenAI) | **Production, Preview, Development** |
| `OPENAI_MODEL` | `gpt-4o-mini` | **Production, Preview, Development** |
| `OPENAI_TEMPERATURE` | `0.7` | **Production, Preview, Development** |

#### Variáveis do Frontend (Opcional - apenas se quiser configurar no frontend):

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_EVOLUTION_API_URL` | `https://sua-url-publica.com` | **Production, Preview, Development** |
| `VITE_EVOLUTION_INSTANCE_NAME` | `sonia` | **Production, Preview, Development** |
| `VITE_SONIA_PHONE` | `551150931836` | **Production, Preview, Development** |

**⚠️ IMPORTANTE:**
- `EVOLUTION_API_KEY` e `OPENAI_API_KEY` são **SENSÍVEIS** - nunca as coloque no frontend
- Use apenas variáveis `VITE_*` para o frontend (e apenas URLs, nunca keys)

### 1.3 Verificar Variáveis

Após adicionar, você deve ver todas as variáveis listadas. Certifique-se de que:
- ✅ Todas estão marcadas para **Production**
- ✅ `EVOLUTION_API_KEY` e `OPENAI_API_KEY` **NÃO** têm prefixo `VITE_`

## 🚀 Passo 2: Fazer Deploy

### 2.1 Commit e Push

```bash
git add .
git commit -m "feat: integração Evolution API com Sonia"
git push origin main
```

### 2.2 Deploy Automático

O Vercel fará deploy automaticamente quando você fizer push. Ou:

1. Vá para o painel do Vercel
2. Clique em **Deployments**
3. Clique em **Redeploy** (se necessário)

### 2.3 Aguardar Deploy

Aguarde o deploy terminar. Você verá:
- ✅ Build successful
- ✅ Deployment ready

## 🔗 Passo 3: Configurar Webhook na Evolution API

### 3.1 Obter URL do Webhook

A URL do webhook será:
```
https://seu-projeto.vercel.app/api/evolution-webhook
```

**Exemplo:**
```
https://onsmart-website.vercel.app/api/evolution-webhook
```

### 3.2 Configurar na Evolution API

Execute este comando (substitua pelos seus valores):

```bash
curl -X PUT "http://192.168.15.31:8080/webhook/set/sonia" \
  -H "apikey: SUA-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://seu-projeto.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "CONNECTION_UPDATE"
    ]
  }'
```

**Substitua:**
- `SUA-API-KEY` pela sua API key da Evolution API
- `https://seu-projeto.vercel.app` pela URL do seu projeto no Vercel

### 3.3 Verificar Webhook Configurado

```bash
curl -X GET "http://192.168.15.31:8080/webhook/find/sonia" \
  -H "apikey: SUA-API-KEY"
```

Deve retornar a configuração do webhook.

## ✅ Passo 4: Testar a Integração

### 4.1 Verificar Status da Instância

1. Acesse: `https://seu-projeto.vercel.app/admin`
2. Vá na aba **WhatsApp**
3. Verifique se a instância está **Conectada** (status: "open")

### 4.2 Enviar Mensagem de Teste

1. Abra o WhatsApp no seu celular
2. Envie uma mensagem para: **55 11 5093-1836**
3. Mensagem: "Olá, Sonia!"

### 4.3 Verificar Resposta

A Sonia deve responder automaticamente em alguns segundos.

### 4.4 Verificar Logs

1. Vá para o Vercel Dashboard
2. Clique em **Deployments**
3. Clique no deployment mais recente
4. Vá em **Functions** → **evolution-webhook**
5. Veja os logs em tempo real

## 🔍 Passo 5: Troubleshooting

### Problema: Webhook não recebe mensagens

**Solução:**
1. Verifique se a URL do webhook está correta
2. Verifique se o webhook está configurado na Evolution API
3. Verifique os logs do Vercel
4. Teste o webhook manualmente:
   ```bash
   curl -X GET "https://seu-projeto.vercel.app/api/evolution-webhook"
   ```
   Deve retornar: `{"status":"ok"}`

### Problema: "Evolution API não configurada"

**Solução:**
1. Verifique se `EVOLUTION_API_URL` está configurada no Vercel
2. Verifique se `EVOLUTION_API_KEY` está configurada no Vercel
3. Faça um novo deploy após adicionar as variáveis

### Problema: "OpenAI API error"

**Solução:**
1. Verifique se `OPENAI_API_KEY` está configurada no Vercel
2. Verifique se a chave está correta
3. Verifique se tem créditos na conta OpenAI

### Problema: Sonia não responde

**Solução:**
1. Verifique os logs do webhook no Vercel
2. Verifique se a instância está conectada (status: "open")
3. Verifique se o webhook está recebendo as mensagens
4. Teste enviando uma mensagem e veja os logs em tempo real

### Problema: "Connection refused" ou "Network error"

**Solução:**
- O Vercel não consegue acessar IPs locais
- Você **DEVE** usar uma URL pública para `EVOLUTION_API_URL`
- Use ngrok ou configure um domínio público

## 📝 Checklist Final

Antes de testar, verifique:

- [ ] Variáveis configuradas no Vercel
- [ ] Deploy realizado com sucesso
- [ ] URL pública para Evolution API (não IP local)
- [ ] Webhook configurado na Evolution API
- [ ] Instância do WhatsApp conectada (status: "open")
- [ ] OpenAI API Key configurada e válida

## 🎯 Fluxo Completo

```
1. Usuário envia mensagem → WhatsApp
2. WhatsApp → Evolution API (Docker servidor)
3. Evolution API → Webhook Vercel (https://seu-projeto.vercel.app/api/evolution-webhook)
4. Webhook Vercel → Processa com Sonia (OpenAI)
5. Sonia gera resposta → Webhook Vercel
6. Webhook Vercel → Evolution API
7. Evolution API → Envia resposta → WhatsApp
8. Usuário recebe resposta da Sonia
```

## 🔐 Segurança

✅ **Correto:**
- Variáveis sensíveis (`EVOLUTION_API_KEY`, `OPENAI_API_KEY`) apenas no backend
- URLs públicas para comunicação
- Webhook protegido (apenas Evolution API pode chamar)

❌ **Nunca faça:**
- Expor API keys no frontend
- Usar IPs locais em produção
- Commitar variáveis sensíveis no código

## 📞 Próximos Passos

Após tudo funcionando:

1. ✅ Teste com várias mensagens
2. ✅ Ajuste o prompt da Sonia se necessário
3. ✅ Configure filtros (ignorar grupos, etc)
4. ✅ Monitore os logs regularmente

---

**Dúvidas?** Verifique os logs do Vercel ou entre em contato com o suporte.


