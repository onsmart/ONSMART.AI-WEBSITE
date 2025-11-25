# Configurar Webhook e Testar Sonia no WhatsApp

**Instância:** `sonia-whatsapp-v3`  
**Versão:** Evolution API v2.3.6  
**Status:** ✅ Conectada e enviando mensagens

---

## 📋 Checklist de Configuração

- [ ] **Passo 1:** Verificar/Configurar Variáveis de Ambiente na Vercel
- [ ] **Passo 2:** Fazer Deploy na Vercel (se necessário)
- [ ] **Passo 3:** Configurar Webhook na Evolution API
- [ ] **Passo 4:** Testar Fluxo Completo
- [ ] **Passo 5:** Verificar Logs e Ajustar (se necessário)

---

## 🔧 Passo 1: Verificar/Configurar Variáveis de Ambiente na Vercel

**Acesse o painel da Vercel e configure as variáveis:**

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Adicione/verifique as seguintes variáveis:

```
EVOLUTION_API_BASE_URL=https://kick-repair-tobacco-flows.trycloudflare.com
EVOLUTION_API_APIKEY=LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs=
EVOLUTION_API_INSTANCE_ID=sonia-whatsapp-v3
```

**⚠️ IMPORTANTE:**
- `EVOLUTION_API_BASE_URL`: Use a URL do Cloudflare Tunnel (ou URL permanente se tiver)
- `EVOLUTION_API_INSTANCE_ID`: Nome da instância (`sonia-whatsapp-v3`)
- Após adicionar, faça um novo deploy para aplicar as variáveis

---

## 🚀 Passo 2: Fazer Deploy na Vercel (se necessário)

**Se ainda não fez deploy ou precisa atualizar:**

```bash
# No diretório do projeto
git add .
git commit -m "feat: adicionar webhook WhatsApp e integração Sonia"
git push

# OU fazer deploy direto via Vercel CLI
vercel --prod
```

**OU via interface da Vercel:**
- Acesse o projeto na Vercel
- Clique em "Deployments"
- Faça um novo deploy se necessário

**Verificar se o endpoint está acessível:**

```bash
# Testar se o endpoint está respondendo
curl -X POST https://onsmart-website.vercel.app/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Resultado esperado:** Resposta HTTP (mesmo que erro 400/405, significa que o endpoint existe)

---

## 🔗 Passo 3: Configurar Webhook na Evolution API

**Na VPS, execute os seguintes comandos:**

```bash
# Definir variáveis
export EVOLUTION_API_KEY="LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs="
export INSTANCE_NAME="sonia-whatsapp-v3"
export BASE_URL="http://localhost:8080"  # OU URL do Cloudflare Tunnel
export WEBHOOK_URL="https://onsmart-website.vercel.app/api/whatsapp/webhook"

# Configurar webhook (Método 1 - formato correto para v2.3.6)
curl -X POST "${BASE_URL}/webhook/set/${INSTANCE_NAME}" \
  -H "Content-Type: application/json" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -d "{
    \"webhook\": {
      \"url\": \"${WEBHOOK_URL}\",
      \"enabled\": true,
      \"webhook_by_events\": true,
      \"webhook_base64\": false,
      \"events\": [\"MESSAGES_UPSERT\"]
    }
  }"
```

**OU tentar método alternativo (se o primeiro não funcionar):**

```bash
# Método 2
curl -X PUT "${BASE_URL}/instance/${INSTANCE_NAME}/webhook/set" \
  -H "Content-Type: application/json" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -d "{
    \"url\": \"${WEBHOOK_URL}\",
    \"webhook_by_events\": true,
    \"webhook_base64\": false,
    \"events\": [\"MESSAGES_UPSERT\"]
  }"
```

**Verificar se o webhook foi configurado:**

```bash
# Ver configuração do webhook
curl -X GET "${BASE_URL}/webhook/find/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .
```

**✅ Resultado esperado:**
- Resposta mostra a URL do webhook configurada
- Status `200` ou `201`

---

## 🧪 Passo 4: Testar Fluxo Completo

### 4.1: Preparar Monitoramento

**Em um terminal, monitorar logs da Evolution API:**

```bash
# Na VPS
docker logs -f evolution-api | grep -i "webhook\|message\|sonia-whatsapp-v3"
```

**Em outro terminal, monitorar logs da Vercel:**

- Acesse: https://vercel.com/seu-projeto/logs
- OU use Vercel CLI: `vercel logs --follow`

### 4.2: Enviar Mensagem de Teste

**Do celular, envie uma mensagem para o número conectado (`551150931836`):**

1. Abra o WhatsApp no celular
2. Envie uma mensagem para você mesmo (ou para o número conectado)
3. Exemplo: "Olá, esta é uma mensagem de teste para a Sonia"

### 4.3: Verificar Fluxo

**O que deve acontecer:**

1. ✅ **Evolution API recebe a mensagem**
   - Verificar nos logs: `docker logs evolution-api | grep -i "message"`

2. ✅ **Evolution API envia para o webhook**
   - Verificar nos logs: `docker logs evolution-api | grep -i "webhook"`

3. ✅ **Vercel recebe o webhook**
   - Verificar nos logs da Vercel
   - Verificar se o endpoint `/api/whatsapp/webhook` foi chamado

4. ✅ **Sonia processa a mensagem**
   - Verificar nos logs da Vercel se `generateSoniaReplyFromSingleMessage()` foi executado

5. ✅ **Resposta é enviada**
   - Verificar nos logs da Vercel se `sendWhatsAppMessage()` foi executado
   - Verificar no celular se a resposta chegou

---

## 📊 Passo 5: Verificar Logs e Ajustar (se necessário)

### Verificar Logs da Evolution API:

```bash
# Ver últimos logs
docker logs evolution-api --tail 100 | grep -i "webhook\|message\|error"
```

**O que procurar:**
- ✅ Mensagens de sucesso ao enviar para webhook
- ❌ Erros de conexão com webhook
- ❌ Erros ao processar mensagens

### Verificar Logs da Vercel:

**Acesse os logs no painel da Vercel ou via CLI:**

```bash
vercel logs --follow
```

**O que procurar:**
- ✅ Requisições POST para `/api/whatsapp/webhook`
- ✅ Logs de processamento da mensagem
- ✅ Logs de envio da resposta
- ❌ Erros de processamento

### Troubleshooting Comum:

**Problema: Webhook não está sendo chamado**

```bash
# Verificar se webhook está configurado
curl -X GET "${BASE_URL}/webhook/find/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .

# Testar webhook manualmente (simular evento)
curl -X POST "${WEBHOOK_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "MESSAGES_UPSERT",
    "instance": "sonia-whatsapp-v3",
    "data": {
      "key": {
        "remoteJid": "551150931836@s.whatsapp.net",
        "fromMe": false
      },
      "message": {
        "conversation": "Teste manual"
      },
      "messageType": "conversation"
    }
  }'
```

**Problema: Erro ao processar mensagem no webhook**

- Verificar estrutura do payload recebido
- Ajustar `api/whatsapp/webhook.js` conforme necessário
- Verificar se as variáveis de ambiente estão corretas

**Problema: Resposta não é enviada**

- Verificar se `EVOLUTION_API_INSTANCE_ID` está correto na Vercel
- Verificar se `sendWhatsAppMessage()` está sendo chamado
- Verificar logs de erro na Vercel

---

## 📝 Formulário de Teste

**Preencha após testar:**

```
Data/Hora: _____/_____/_____  _____:_____

PASSO 1 - Variáveis de Ambiente:
[ ] EVOLUTION_API_BASE_URL configurada
[ ] EVOLUTION_API_APIKEY configurada
[ ] EVOLUTION_API_INSTANCE_ID configurada
[ ] Deploy feito após configurar variáveis

PASSO 2 - Deploy:
[ ] Deploy realizado na Vercel
[ ] Endpoint /api/whatsapp/webhook acessível

PASSO 3 - Webhook:
[ ] Webhook configurado na Evolution API
[ ] URL do webhook: _________________
[ ] Eventos configurados: MESSAGES_UPSERT

PASSO 4 - Teste:
[ ] Mensagem enviada do celular: SIM / NÃO
[ ] Webhook recebeu a mensagem: SIM / NÃO
[ ] Sonia processou a mensagem: SIM / NÃO
[ ] Resposta foi enviada: SIM / NÃO
[ ] Resposta chegou no celular: SIM / NÃO

PASSO 5 - Logs:
[ ] Logs da Evolution API verificados
[ ] Logs da Vercel verificados
[ ] Erros encontrados: SIM / NÃO
[ ] Se sim, erros: _________________

CONCLUSÃO:
[ ] Tudo funcionando → Sonia conversando via WhatsApp! 🎉
[ ] Algum problema → Documentar e corrigir

OBSERVAÇÕES:
_________________________________________________
_________________________________________________
```

---

## ✅ Próximos Passos Após Configuração

**Se tudo estiver funcionando:**

1. ✅ **Testar diferentes tipos de mensagens:**
   - Perguntas simples
   - Mensagens em diferentes idiomas
   - Mensagens longas

2. ✅ **Monitorar performance:**
   - Tempo de resposta
   - Taxa de sucesso
   - Erros ocasionais

3. ✅ **Configurar URL permanente:**
   - Substituir Cloudflare Tunnel temporário por URL fixa
   - Atualizar `EVOLUTION_API_BASE_URL` na Vercel

4. ✅ **Documentar processo completo:**
   - Atualizar `STATUS-INTEGRACAO-WHATSAPP-25-11-2025.md`
   - Documentar qualquer ajuste necessário

---

**Última Atualização:** 25/11/2025  
**Status:** ⏳ Aguardando Configuração

