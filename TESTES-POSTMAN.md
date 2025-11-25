# Guia de Testes com Postman

Este guia ajuda a testar o webhook e a integração com a Evolution API usando Postman.

## Pré-requisitos

- Postman instalado
- Evolution API configurada e rodando
- Webhook deployado na Vercel
- Variáveis de ambiente configuradas na Vercel

---

## ETAPA 1: Testar Evolution API (Enviar Mensagem)

### 1.1. Criar Requisição POST

**Método**: `POST`  
**URL**: `https://evolution.sonia.onsmart.ai/message/sendText/sonia-whatsapp`

⚠️ **AJUSTAR** conforme documentação v2:
- URL exata do endpoint
- Nome da instância (`sonia-whatsapp`)

### 1.2. Headers

```
Content-Type: application/json
apikey: sua_chave_api_evolution
```

⚠️ **CONFIRMAR** nome do header de autenticação na doc v2 (pode ser `apikey`, `Authorization`, `X-API-Key`, etc.)

### 1.3. Body (JSON)

```json
{
  "number": "5511999999999",
  "text": "Olá, Sonia! Como você funciona?"
}
```

⚠️ **AJUSTAR** estrutura do payload conforme documentação v2:
- Campo pode ser `number`, `to`, `phoneNumber`
- Campo pode ser `text`, `message`, `textMessage`

### 1.4. Enviar e Verificar

- Status esperado: `200 OK`
- Verificar se a mensagem foi enviada no WhatsApp

---

## ETAPA 2: Testar Webhook (Simular Evento da Evolution API)

### 2.1. Criar Requisição POST

**Método**: `POST`  
**URL**: `https://seu-projeto.vercel.app/api/whatsapp/webhook`

### 2.2. Headers

```
Content-Type: application/json
```

### 2.3. Body (JSON) - Payload de Teste

⚠️ **IMPORTANTE**: Este é um payload ESTIMADO. Você deve copiar um payload REAL da documentação v2 ou de um evento real.

#### Exemplo 1 - Estrutura Estimada (MESSAGES_UPSERT):

```json
{
  "event": "MESSAGES_UPSERT",
  "instance": "sonia-whatsapp",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": false
    },
    "message": {
      "conversation": "Olá, Sonia! Como você funciona?"
    },
    "messageType": "conversation",
    "timestamp": 1234567890
  }
}
```

#### Exemplo 2 - Estrutura Alternativa:

```json
{
  "type": "message",
  "instance": "sonia-whatsapp",
  "from": "5511999999999@s.whatsapp.net",
  "text": "Olá, Sonia! Como você funciona?",
  "timestamp": 1234567890
}
```

### 2.4. Como Obter Payload Real

1. **Opção A**: Consultar documentação v2 sobre estrutura de webhooks
2. **Opção B**: Configurar webhook temporário para logar payloads recebidos
3. **Opção C**: Usar ferramenta de interceptação (ngrok, etc.) para capturar eventos reais

### 2.5. Enviar e Verificar

- Status esperado: `200 OK`
- Resposta esperada:
```json
{
  "success": true,
  "message": "Message processed successfully"
}
```

### 2.6. Verificar Logs na Vercel

1. Acesse: https://vercel.com/dashboard
2. Vá em **Deployments** → Selecione o deployment mais recente
3. Clique em **Functions** → `api/whatsapp/webhook`
4. Verifique os logs para:
   - Payload recebido
   - Mensagem extraída
   - Resposta gerada
   - Erros (se houver)

---

## ETAPA 3: Teste de Fluxo Completo

### 3.1. Enviar Mensagem Real via WhatsApp

1. Envie uma mensagem de texto para o número da Sonia no WhatsApp
2. A Evolution API deve receber a mensagem
3. A Evolution API deve disparar o webhook para a Vercel
4. O webhook deve processar e gerar resposta
5. A resposta deve ser enviada de volta via Evolution API
6. Você deve receber a resposta no WhatsApp

### 3.2. Verificar Cada Etapa

#### Na VPS (logs da Evolution API):
```bash
docker logs evolution-api -f
```

#### Na Vercel (logs do webhook):
- Verificar logs da função serverless

#### No WhatsApp:
- Verificar se a mensagem foi recebida
- Verificar se a resposta foi enviada

---

## ETAPA 4: Testes de Erro

### 4.1. Testar Mensagem Vazia

```json
{
  "event": "MESSAGES_UPSERT",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net"
    },
    "message": {}
  }
}
```

**Esperado**: Erro 400 ou resposta de fallback

### 4.2. Testar Mensagem de Mídia

```json
{
  "event": "MESSAGES_UPSERT",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net"
    },
    "message": {
      "imageMessage": {
        "url": "..."
      }
    },
    "messageType": "image"
  }
}
```

**Esperado**: Resposta padrão pedindo mensagem em texto

### 4.3. Testar Sem Número do Remetente

```json
{
  "event": "MESSAGES_UPSERT",
  "data": {
    "message": {
      "conversation": "Teste"
    }
  }
}
```

**Esperado**: Erro 400

---

## ETAPA 5: Coleção Postman (Opcional)

### 5.1. Criar Coleção

1. No Postman, clique em **New** → **Collection**
2. Nome: "Evolution API - Sonia WhatsApp"

### 5.2. Adicionar Variáveis de Ambiente

1. Clique em **Environments** → **Create Environment**
2. Adicione variáveis:
   - `evolution_base_url`: `https://evolution.sonia.onsmart.ai`
   - `evolution_apikey`: `sua_chave_api`
   - `evolution_instance`: `sonia-whatsapp`
   - `vercel_webhook_url`: `https://seu-projeto.vercel.app/api/whatsapp/webhook`
   - `test_phone`: `5511999999999`

### 5.3. Usar Variáveis nas Requisições

- URL: `{{evolution_base_url}}/message/sendText/{{evolution_instance}}`
- Header: `apikey: {{evolution_apikey}}`
- Body: `{"number": "{{test_phone}}", "text": "Teste"}`

---

## Troubleshooting

### Erro 401 (Unauthorized)
- Verificar se a chave API está correta
- Verificar nome do header de autenticação

### Erro 404 (Not Found)
- Verificar URL do endpoint
- Verificar se a instância existe

### Erro 500 (Internal Server Error)
- Verificar logs na Vercel
- Verificar logs da Evolution API
- Verificar variáveis de ambiente

### Webhook não recebe eventos
- Verificar se o webhook está configurado na Evolution API
- Verificar se o evento está na lista de eventos monitorados
- Verificar se a URL do webhook está acessível publicamente

### Mensagem não é enviada
- Verificar se o número está no formato correto
- Verificar se a instância está conectada
- Verificar logs da Evolution API

---

## Próximos Passos

Após os testes funcionarem:

1. ✅ Webhook recebendo eventos corretamente
2. ✅ Respostas sendo geradas pela Sonia
3. ✅ Mensagens sendo enviadas via Evolution API
4. ⏭️ Implementar botão WhatsApp no frontend
5. ⏭️ Testes finais de ponta a ponta

---

## Referências

- Documentação Evolution API v2: https://doc.evolution-api.com/v2/
- Postman Collection oficial: Consultar na documentação
- Vercel Logs: https://vercel.com/dashboard




