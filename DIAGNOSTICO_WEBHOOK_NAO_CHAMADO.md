# 🔍 Diagnóstico: Webhook Não Está Sendo Chamado

## ❌ Sintoma
- Sonia não responde no WhatsApp
- **NÃO aparecem logs na Vercel** (isso é crítico!)
- Mensagem de fallback sendo enviada

## 🔍 Possíveis Causas

### 1. Webhook Não Configurado na Evolution API
O webhook pode não estar configurado ou estar com URL incorreta.

### 2. Evolution API Não Consegue Acessar a URL
A Evolution API pode não conseguir acessar `https://onsmart.ai/api/whatsapp/webhook`.

### 3. Webhook Está Configurado Mas Não Está Sendo Disparado
A instância pode não estar enviando eventos para o webhook.

---

## ✅ Passos de Diagnóstico

### Passo 1: Verificar se o Endpoint Está Acessível

Teste manualmente o endpoint:

```bash
curl -X POST https://onsmart.ai/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Resultado esperado:**
- Se retornar JSON, o endpoint está acessível
- Se retornar erro de conexão, há problema de rede/firewall

### Passo 2: Verificar Webhook na Evolution API

No servidor da Evolution API, verifique se o webhook está configurado:

```bash
# Listar instâncias
curl -X GET "https://SUA_EVOLUTION_API_URL/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API" | jq '.[] | select(.instance.instanceName == "sonia-whatsapp-v3")'

# Verificar webhook da instância
curl -X GET "https://SUA_EVOLUTION_API_URL/webhook/find/sonia-whatsapp-v3" \
  -H "apikey: SUA_CHAVE_API"
```

**O que verificar:**
- ✅ Webhook está configurado
- ✅ URL está correta: `https://onsmart.ai/api/whatsapp/webhook`
- ✅ Eventos estão habilitados (MESSAGES_UPSERT, etc)

### Passo 3: Configurar/Atualizar Webhook

Se o webhook não estiver configurado, configure:

```bash
curl -X POST "https://SUA_EVOLUTION_API_URL/webhook/set/sonia-whatsapp-v3" \
  -H "apikey: SUA_CHAVE_API" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://onsmart.ai/api/whatsapp/webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "MESSAGES_DELETE",
      "SEND_MESSAGE",
      "CONTACTS_UPDATE",
      "CONTACTS_UPSERT",
      "PRESENCE_UPDATE",
      "CHATS_UPDATE",
      "CHATS_UPSERT",
      "CHATS_DELETE",
      "GROUPS_UPSERT",
      "GROUP_UPDATE",
      "GROUP_PARTICIPANTS_UPDATE",
      "CONNECTION_UPDATE",
      "CALL_UPSERT",
      "CALL_UPDATE",
      "LABELS_EDIT",
      "LABELS_ASSOCIATION",
      "LABELS_DELETE"
    ]
  }'
```

### Passo 4: Verificar Logs da Evolution API

No servidor, verifique os logs da Evolution API:

```bash
docker logs evoapicloud -f | grep -i webhook
```

**O que procurar:**
- Tentativas de chamar o webhook
- Erros de conexão
- Timeouts
- Erros 404, 500, etc

### Passo 5: Testar Webhook Manualmente

Envie um evento de teste para o webhook:

```bash
curl -X POST https://onsmart.ai/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "MESSAGES_UPSERT",
    "instance": "sonia-whatsapp-v3",
    "data": [{
      "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": false,
        "id": "test123"
      },
      "message": {
        "conversation": "teste"
      },
      "messageType": "conversation",
      "messageTimestamp": 1234567890
    }]
  }'
```

**Resultado esperado:**
- Deve aparecer logs na Vercel
- Deve retornar JSON com `success: true`

---

## 🚨 Problemas Comuns

### Problema 1: Webhook Não Está Configurado
**Solução:** Configure o webhook usando o comando do Passo 3.

### Problema 2: URL do Webhook Está Incorreta
**Solução:** Verifique se a URL está correta:
- ✅ `https://onsmart.ai/api/whatsapp/webhook`
- ❌ `http://onsmart.ai/api/whatsapp/webhook` (sem HTTPS)
- ❌ `https://onsmart-website.vercel.app/api/whatsapp/webhook` (pode não funcionar)

### Problema 3: Evolution API Não Consegue Acessar a URL
**Solução:** 
- Verifique se há firewall bloqueando
- Verifique se o Cloudflare Tunnel está funcionando (se aplicável)
- Teste a URL manualmente com curl

### Problema 4: Instância Não Está Conectada
**Solução:**
- Verifique se a instância está conectada ao WhatsApp
- Escaneie o QR Code novamente se necessário

### Problema 5: Eventos Não Estão Habilitados
**Solução:**
- Verifique se `MESSAGES_UPSERT` está na lista de eventos
- Reconfigure o webhook com todos os eventos necessários

---

## 📝 Checklist

- [ ] Endpoint `/api/whatsapp/webhook` está acessível (teste com curl)
- [ ] Webhook está configurado na Evolution API
- [ ] URL do webhook está correta: `https://onsmart.ai/api/whatsapp/webhook`
- [ ] Eventos estão habilitados (especialmente `MESSAGES_UPSERT`)
- [ ] Instância está conectada ao WhatsApp
- [ ] Logs da Evolution API mostram tentativas de chamar o webhook
- [ ] Teste manual do webhook retorna sucesso e aparece nos logs da Vercel

---

## 🔧 Próximos Passos

1. **Teste o endpoint manualmente** (Passo 1)
2. **Verifique a configuração do webhook** (Passo 2)
3. **Configure/atualize o webhook se necessário** (Passo 3)
4. **Verifique os logs da Evolution API** (Passo 4)
5. **Teste enviando um evento manual** (Passo 5)

Se após seguir todos os passos ainda não aparecerem logs na Vercel, o problema está na comunicação entre a Evolution API e a Vercel (firewall, DNS, etc).

