# Testes Pós-Conexão - Instância WhatsApp Conectada

**Instância:** `sonia-whatsapp-v3`  
**Status:** ✅ Conectada  
**Versão:** Evolution API v2.3.6  
**Data:** 25/11/2025

---

## 📋 Checklist de Testes

- [ ] **Teste 1:** Monitorar Conexão (5-10 minutos)
- [ ] **Teste 2:** Verificar Status da Instância
- [ ] **Teste 3:** Testar Envio de Mensagem
- [ ] **Teste 4:** Testar Recebimento de Mensagem
- [ ] **Teste 5:** Verificar Webhook (se configurado)
- [ ] **Teste 6:** Testar Resposta Automática da Sonia

---

## ⏱️ Teste 1: Monitorar Conexão (CRÍTICO)

**Objetivo:** Verificar se a conexão permanece estável (o problema anterior era desconexão após 1 minuto).

### Monitorar logs em tempo real:

```bash
# Na VPS, monitorar logs
docker logs -f evolution-api | grep -i "sonia-whatsapp-v3\|connected\|logout\|error\|device_removed"
```

**O que observar:**
- ✅ **Bom sinal:** Nenhuma mensagem de erro ou logout por 5-10 minutos
- ❌ **Problema:** Se aparecer `device_removed` ou `LOGOUT` novamente

**Tempo mínimo de monitoramento:** 5-10 minutos

**Comando alternativo (verificar status via API):**

```bash
# Definir variáveis
export EVOLUTION_API_KEY="LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs="
export INSTANCE_NAME="sonia-whatsapp-v3"
export BASE_URL="http://localhost:8080"  # OU URL do Cloudflare Tunnel

# Verificar status a cada minuto (executar várias vezes)
curl -X GET "${BASE_URL}/instance/fetchInstance/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.connectionStatus'
```

**Resultado esperado:** `"open"` (conectado) por pelo menos 5 minutos consecutivos.

---

## 📊 Teste 2: Verificar Status da Instância

**Verificar informações completas da instância:**

```bash
# Ver status completo
curl -X GET "${BASE_URL}/instance/fetchInstance/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .
```

**O que verificar:**
- ✅ `connectionStatus`: deve ser `"open"` (não `"close"` ou `"connecting"`)
- ✅ `ownerJid`: deve mostrar `"551150931836@s.whatsapp.net"`
- ✅ `profileName`: deve mostrar `"Sonia Onsmart"`
- ✅ `disconnectionReasonCode`: deve ser `null` (não `401`)

---

## 📤 Teste 3: Testar Envio de Mensagem

**Enviar uma mensagem de teste para você mesmo:**

```bash
# Enviar mensagem para o próprio número
curl -X POST "${BASE_URL}/message/sendText/${INSTANCE_NAME}" \
  -H "Content-Type: application/json" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -d '{
    "number": "551150931836",
    "text": "Teste de envio - Evolution API v2.3.6 funcionando! ✅"
  }'
```

**OU usar o endpoint alternativo (conforme documentação v2.3.6):**

```bash
# Tentar formato alternativo
curl -X POST "${BASE_URL}/message/sendText/${INSTANCE_NAME}" \
  -H "Content-Type: application/json" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -d '{
    "phoneNumber": "551150931836",
    "textMessage": {
      "text": "Teste de envio - Evolution API v2.3.6 funcionando! ✅"
    }
  }'
```

**Verificar no celular:**
- ✅ Mensagem chegou no WhatsApp?
- ✅ Mensagem apareceu corretamente?

**Verificar nos logs:**
```bash
docker logs evolution-api --tail 20 | grep -i "send\|message"
```

---

## 📥 Teste 4: Testar Recebimento de Mensagem

**Enviar uma mensagem do celular para o número conectado:**

1. No celular, abra o WhatsApp
2. Envie uma mensagem para o número `551150931836` (ou para você mesmo se estiver testando)
3. Exemplo: "Olá, esta é uma mensagem de teste"

**Verificar nos logs:**
```bash
# Monitorar logs para ver se a mensagem foi recebida
docker logs -f evolution-api | grep -i "message\|upsert\|webhook"
```

**O que observar:**
- ✅ Mensagem aparece nos logs?
- ✅ Webhook foi disparado? (se configurado)

---

## 🔗 Teste 5: Verificar Webhook (se configurado)

**Se você já configurou o webhook na Evolution API:**

```bash
# Verificar configuração do webhook
curl -X GET "${BASE_URL}/webhook/find/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .
```

**Testar se o webhook está recebendo eventos:**

1. Enviar uma mensagem do celular para o número conectado
2. Verificar se o webhook foi chamado:
   - Ver logs da Vercel (se o webhook estiver na Vercel)
   - Ver logs da Evolution API para ver se tentou enviar para o webhook

**Configurar webhook (se ainda não configurou):**

```bash
# Configurar webhook para receber mensagens
curl -X POST "${BASE_URL}/webhook/set/${INSTANCE_NAME}" \
  -H "Content-Type: application/json" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -d '{
    "url": "https://onsmart-website.vercel.app/api/whatsapp/webhook",
    "webhook_by_events": true,
    "events": ["MESSAGES_UPSERT"]
  }'
```

**⚠️ IMPORTANTE:** Ajustar a URL do webhook conforme sua configuração na Vercel.

---

## 🤖 Teste 6: Testar Resposta Automática da Sonia

**Se o webhook estiver configurado e funcionando:**

1. Enviar uma mensagem do celular para o número conectado
2. Verificar se:
   - ✅ Webhook recebeu a mensagem
   - ✅ Sonia processou a mensagem
   - ✅ Resposta foi enviada automaticamente

**Verificar logs da Vercel (se aplicável):**
- Acessar logs do projeto na Vercel
- Verificar se o endpoint `/api/whatsapp/webhook` foi chamado
- Verificar se `soniaBrain.generateSoniaReplyFromSingleMessage()` foi executado
- Verificar se `evolutionApi.sendWhatsAppMessage()` enviou a resposta

---

## 📝 Formulário de Resultados

**Preencha após completar os testes:**

```
Data/Hora: _____/_____/_____  _____:_____

TESTE 1 - Monitoramento:
[ ] Permaneceu conectado por 5+ minutos: SIM / NÃO
[ ] Tempo total conectado: _____ minutos
[ ] Algum erro ou desconexão: SIM / NÃO
[ ] Se desconectou, motivo: _________________

TESTE 2 - Status:
[ ] connectionStatus: "open" / "close" / "connecting"
[ ] ownerJid correto: SIM / NÃO
[ ] profileName correto: SIM / NÃO

TESTE 3 - Envio:
[ ] Mensagem enviada com sucesso: SIM / NÃO
[ ] Mensagem chegou no celular: SIM / NÃO
[ ] Erro (se houver): _________________

TESTE 4 - Recebimento:
[ ] Mensagem recebida nos logs: SIM / NÃO
[ ] Webhook disparado: SIM / NÃO / N/A

TESTE 5 - Webhook:
[ ] Webhook configurado: SIM / NÃO
[ ] Webhook recebendo eventos: SIM / NÃO / N/A
[ ] Erro (se houver): _________________

TESTE 6 - Resposta Automática:
[ ] Resposta automática funcionando: SIM / NÃO / N/A
[ ] Erro (se houver): _________________

CONCLUSÃO:
[ ] Tudo funcionando → Pronto para produção!
[ ] Algum problema → Documentar e corrigir

OBSERVAÇÕES:
_________________________________________________
_________________________________________________
```

---

## ✅ Próximos Passos Após Testes

**Se todos os testes passarem:**

1. ✅ **Atualizar variáveis de ambiente na Vercel:**
   - `EVOLUTION_API_INSTANCE_ID=sonia-whatsapp-v3`
   - `EVOLUTION_API_BASE_URL` (URL do Cloudflare Tunnel ou URL permanente)

2. ✅ **Configurar webhook na Evolution API** (se ainda não configurou)

3. ✅ **Fazer deploy dos endpoints na Vercel** (se ainda não fez)

4. ✅ **Testar fluxo completo:**
   - Enviar mensagem → Webhook recebe → Sonia responde → Mensagem enviada

5. ✅ **Documentar processo completo** para futuras referências

---

## 🔧 Troubleshooting

### Erro ao enviar mensagem
```bash
# Verificar formato do endpoint (pode variar na v2.3.6)
# Consultar documentação: https://doc.evolution-api.com/v2/

# Ver logs detalhados
docker logs evolution-api --tail 50 | grep -i "error\|send"
```

### Webhook não está recebendo eventos
```bash
# Verificar se webhook está configurado
curl -X GET "${BASE_URL}/webhook/find/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .

# Ver logs da Evolution API
docker logs evolution-api | grep -i "webhook"
```

### Instância desconecta novamente
- Verificar logs detalhados
- Comparar com comportamento anterior
- Considerar testar com outro número (FASE 4)

---

**Última Atualização:** 25/11/2025  
**Status:** ⏳ Aguardando Testes

