# Migração de Responsabilidade: Envio de Mensagens WhatsApp

## 📋 Contexto e Problema Identificado

O projeto **ONSMART-WEBSITE** tinha um webhook (`api/whatsapp/webhook.js`) que recebia mensagens da Evolution API e enviava respostas automaticamente via WhatsApp. Isso estava causando **duplicação de mensagens** porque o **SONIA-BACKEND** também estava enviando mensagens para os mesmos destinatários.

### Situação Anterior (Problemática)
- ❌ **ONSMART-WEBSITE**: Recebia webhook → Processava → **Enviava mensagem**
- ❌ **SONIA-BACKEND**: Recebia webhook → Processava → **Enviava mensagem**
- **Resultado**: Clientes recebiam 2 mensagens idênticas

### Situação Atual (Corrigida)
- ✅ **ONSMART-WEBSITE**: Recebe webhook → Processa → **Retorna resposta no JSON** (NÃO envia)
- ✅ **SONIA-BACKEND**: Recebe webhook → Processa → **ENVIA mensagem** (único responsável)

---

## 🔧 Mudanças Implementadas no ONSMART-WEBSITE

### Arquivo Modificado: `api/whatsapp/webhook.js`

**O que foi desabilitado:**
1. ❌ Envio de resposta normal da Sônia (linha ~301)
2. ❌ Envio de mensagem de fallback para mídias (linha ~234)
3. ❌ Envio de mensagem de erro (linha ~330)

**O que continua funcionando:**
- ✅ Recebe eventos da Evolution API
- ✅ Processa mensagens recebidas
- ✅ Gera resposta da Sônia usando `processSoniaMessage()`
- ✅ Detecta idioma automaticamente
- ✅ Mantém histórico de conversa por usuário
- ✅ Retorna resposta completa no JSON de resposta

---

## 📡 Estrutura da Resposta do Webhook ONSMART-WEBSITE

O webhook do ONSMART-WEBSITE agora retorna no JSON de resposta:

### Caso de Sucesso (Mensagem Processada)
```json
{
  "success": true,
  "message": "Message processed successfully",
  "language": "pt",
  "reply": "Resposta completa da Sônia aqui...",
  "from": "5511999999999",
  "shouldSend": true
}
```

### Caso de Mensagem de Mídia (Não Suportada)
```json
{
  "success": true,
  "message": "Media message ignored",
  "reply": "Olá! Por enquanto, só consigo processar mensagens de texto. Por favor, envie sua dúvida por escrito.",
  "shouldSend": true
}
```

### Caso de Erro
```json
{
  "success": false,
  "error": "Error message here",
  "language": "pt",
  "message": "Error processed, fallback available",
  "reply": "Desculpe, estou com algumas dificuldades técnicas no momento. Mas posso te conectar com nossa equipe comercial. Quer agendar uma conversa?",
  "from": "5511999999999",
  "shouldSend": true
}
```

### Campos da Resposta:
- **`success`**: `true` se processado com sucesso, `false` se houve erro
- **`reply`**: Resposta completa da Sônia (ou mensagem de fallback) que deve ser enviada
- **`from`**: Número do remetente (formato: `5511999999999`, sem `@s.whatsapp.net`)
- **`shouldSend`**: `true` se deve enviar (não é número de teste), `false` se é número de teste
- **`language`**: Idioma detectado (`pt`, `en`, `es`)
- **`message`**: Mensagem de status do processamento

---

## 🎯 Responsabilidades do SONIA-BACKEND

A partir de agora, o **SONIA-BACKEND** é o **ÚNICO** responsável por:

### 1. Receber Webhooks da Evolution API
- Configurar webhook na Evolution API apontando para o SONIA-BACKEND
- Processar eventos de mensagens recebidas

### 2. Processar Mensagens (Duas Opções)

#### Opção A: Usar o ONSMART-WEBSITE como Processador
- Chamar o endpoint do webhook do ONSMART-WEBSITE: `https://onsmart.ai/api/whatsapp/webhook`
- Receber a resposta JSON com o campo `reply`
- Enviar a mensagem usando o campo `reply` e `from` da resposta

#### Opção B: Processar Internamente
- Processar mensagens diretamente no SONIA-BACKEND
- Gerar resposta da Sônia internamente
- Enviar mensagem via Evolution API

### 3. Enviar Mensagens via Evolution API
- **ÚNICO sistema autorizado** a chamar `sendWhatsAppMessage()` ou equivalente
- Usar o número do campo `from` da resposta do webhook
- Enviar o texto do campo `reply` da resposta

### 4. Verificar Flag `shouldSend`
- Só enviar se `shouldSend === true`
- Ignorar números de teste (`999999999`)

---

## 🔄 Fluxo Recomendado de Integração

### Cenário 1: SONIA-BACKEND usa ONSMART-WEBSITE como processador

```
1. Evolution API → Webhook → SONIA-BACKEND
2. SONIA-BACKEND → POST → ONSMART-WEBSITE/api/whatsapp/webhook
3. ONSMART-WEBSITE → Processa → Retorna JSON com {reply, from, shouldSend}
4. SONIA-BACKEND → Verifica shouldSend
5. SONIA-BACKEND → Envia mensagem via Evolution API usando reply e from
```

### Cenário 2: SONIA-BACKEND processa internamente

```
1. Evolution API → Webhook → SONIA-BACKEND
2. SONIA-BACKEND → Processa mensagem internamente
3. SONIA-BACKEND → Gera resposta da Sônia
4. SONIA-BACKEND → Envia mensagem via Evolution API
```

---

## 📝 Exemplo de Código para SONIA-BACKEND

### Exemplo usando ONSMART-WEBSITE como processador:

```javascript
// No SONIA-BACKEND - Handler do webhook
export default async function handler(req, res) {
  try {
    // Receber evento da Evolution API
    const evolutionEvent = req.body;
    
    // Chamar ONSMART-WEBSITE para processar
    const response = await fetch('https://onsmart.ai/api/whatsapp/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(evolutionEvent)
    });
    
    const result = await response.json();
    
    // Verificar se deve enviar
    if (result.shouldSend && result.reply && result.from) {
      // Enviar mensagem via Evolution API
      await sendWhatsAppMessage(result.from, result.reply);
      console.log(`✅ Mensagem enviada para ${result.from}`);
    } else {
      console.log(`⚠️ Mensagem não enviada (shouldSend: ${result.shouldSend})`);
    }
    
    // Retornar sucesso para Evolution API
    return res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}
```

---

## ⚠️ Pontos de Atenção

### 1. Deduplicação de Mensagens
- Garantir que o SONIA-BACKEND não processe a mesma mensagem duas vezes
- Implementar verificação de ID da mensagem para evitar duplicação

### 2. Números de Teste
- O ONSMART-WEBSITE já filtra números de teste (`999999999`)
- O campo `shouldSend` será `false` para números de teste
- Respeitar essa flag no SONIA-BACKEND

### 3. Tratamento de Erros
- Se o ONSMART-WEBSITE retornar erro, o SONIA-BACKEND deve ter fallback
- Usar a mensagem de erro do campo `reply` se disponível

### 4. Histórico de Conversa
- O ONSMART-WEBSITE mantém histórico usando `userId = "whatsapp:{numero}"`
- Se o SONIA-BACKEND processar internamente, considerar manter histórico compatível

### 5. Idioma
- O ONSMART-WEBSITE detecta idioma automaticamente
- O campo `language` na resposta indica o idioma detectado
- Usar isso para manter consistência nas respostas

---

## 🧪 Checklist de Validação

- [ ] SONIA-BACKEND configurado para receber webhooks da Evolution API
- [ ] SONIA-BACKEND implementa envio de mensagens via Evolution API
- [ ] Código de duplicação removido (se existia)
- [ ] Verificação de `shouldSend` implementada
- [ ] Tratamento de erros implementado
- [ ] Testes realizados para garantir apenas uma mensagem por resposta
- [ ] Logs implementados para rastreamento
- [ ] Histórico de conversa mantido (se aplicável)

---

## 📞 Endpoint do ONSMART-WEBSITE

**URL de Produção:**
```
POST https://onsmart.ai/api/whatsapp/webhook
```

**Headers:**
```
Content-Type: application/json
```

**Body:** Payload completo da Evolution API (como recebido no webhook)

**Resposta:** JSON conforme estrutura descrita acima

---

## 🔍 Logs e Debug

O ONSMART-WEBSITE mantém logs detalhados:
- `🔔 [webhook]` - Logs de recebimento do webhook
- `🔄 [webhook]` - Logs de processamento
- `📤 [webhook]` - Logs de resposta gerada (mas não enviada)
- `⚠️ [webhook]` - Avisos sobre envio desabilitado

Todos os logs incluem o prefixo `[webhook]` para facilitar filtragem.

---

## 📅 Data da Migração

**Data:** [Data atual]
**Versão:** 1.0
**Status:** ✅ Implementado e Testado

---

## 🆘 Suporte

Em caso de dúvidas sobre a estrutura do webhook ou formato de resposta, consultar:
- Arquivo: `api/whatsapp/webhook.js` no projeto ONSMART-WEBSITE
- Logs do Vercel para ver exemplos de payloads e respostas

