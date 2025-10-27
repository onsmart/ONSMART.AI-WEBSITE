# 🔗 Webhook Setup - ElevenLabs + Twilio + HubSpot

Este guia explica como configurar e usar o webhook para integração entre ElevenLabs, Twilio e HubSpot.

## 📋 Estrutura Criada

### **Arquivo Principal:**
- `api/elevenlabs/webhook.js` - Endpoint do webhook

### **URL do Webhook:**
```
https://seu-dominio.vercel.app/api/elevenlabs/webhook
```

## 🔧 Configuração

### 1. **Variáveis de Ambiente no Vercel**

Acesse [vercel.com/onsmart](https://vercel.com/onsmart) → Settings → Environment Variables:

```bash
# OBRIGATÓRIO
HUBSPOT_TOKEN=pat-na1-abc123...

# OPCIONAIS (para validação de segurança)
TWILIO_WEBHOOK_SECRET=your-twilio-secret
ELEVENLABS_WEBHOOK_SECRET=your-elevenlabs-secret
```

### 2. **Configurar no ElevenLabs**

1. Acesse [ElevenLabs Conversational AI](https://elevenlabs.io/app/conversational-ai)
2. Selecione seu agente
3. Vá em **Settings** → **Webhooks**
4. Adicione a URL: `https://seu-dominio.vercel.app/api/elevenlabs/webhook`
5. Configure os eventos que deseja capturar

### 3. **Configurar no Twilio**

1. Acesse [Twilio Console](https://console.twilio.com/)
2. Vá em **Phone Numbers** → **Manage** → **Active numbers**
3. Clique no número que deseja configurar
4. Em **Webhook**, adicione: `https://seu-dominio.vercel.app/api/elevenlabs/webhook`
5. Configure para **HTTP POST**

## 📊 Como Funciona

### **Fluxo de Dados:**
```
ElevenLabs/Twilio → Webhook → HubSpot CRM
```

### **Mapeamento de Campos:**

| ElevenLabs/Twilio | HubSpot | Descrição |
|-------------------|---------|-----------|
| `nome` / `first_name` | `firstname` | Nome do contato |
| `sobrenome` / `last_name` | `lastname` | Sobrenome |
| `celular` / `phone` | `phone` | Telefone |
| `empresa` / `company` | `company` | Empresa |
| `cnpj` / `document` | `cnpj` | CNPJ |
| `email` | `email` | E-mail |
| `conversation_id` | `conversation_id` | ID da conversa |
| `call_sid` | `call_sid` | ID da chamada Twilio |

## 🧪 Testando o Webhook

### **1. Teste Local:**
```bash
# Iniciar servidor local
npm run server

# Testar webhook
curl -X POST http://localhost:3001/api/elevenlabs/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "lead": {
      "nome": "João",
      "sobrenome": "Silva",
      "email": "joao@exemplo.com",
      "celular": "11999999999",
      "empresa": "Empresa Teste"
    }
  }'
```

### **2. Teste em Produção:**
```bash
curl -X POST https://seu-dominio.vercel.app/api/elevenlabs/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "lead": {
      "nome": "Maria",
      "sobrenome": "Santos",
      "email": "maria@exemplo.com",
      "celular": "11888888888",
      "empresa": "Empresa Teste"
    }
  }'
```

## 📝 Exemplos de Payload

### **ElevenLabs Conversational AI:**
```json
{
  "lead": {
    "nome": "João",
    "sobrenome": "Silva",
    "email": "joao@exemplo.com",
    "celular": "11999999999",
    "empresa": "Empresa ABC",
    "conversation_id": "conv_123",
    "agent_id": "agent_456",
    "transcript": "Cliente interessado em nossos serviços..."
  }
}
```

### **Twilio Voice:**
```json
{
  "lead": {
    "first_name": "Maria",
    "last_name": "Santos",
    "email": "maria@exemplo.com",
    "phone": "11888888888",
    "company": "Empresa XYZ",
    "call_sid": "CA123456789",
    "from": "+5511999999999",
    "to": "+5511888888888",
    "transcript": "Cliente ligou para saber sobre preços..."
  }
}
```

## 🔒 Segurança

### **Validação de Assinatura (Opcional):**

Para adicionar validação de segurança, descomente e configure:

```javascript
// No arquivo api/elevenlabs/webhook.js
const signature = req.headers['x-elevenlabs-signature'] || req.headers['x-twilio-signature'];

if (signature) {
  // Validar assinatura aqui
  const isValid = validateSignature(payload, signature);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
}
```

### **Rate Limiting:**
O Vercel já aplica rate limiting automático nas API Routes.

## 🐛 Debugging

### **Logs do Vercel:**
1. Acesse [vercel.com/onsmart](https://vercel.com/onsmart)
2. Selecione seu projeto
3. Vá em **Functions** → **Logs**
4. Filtre por `/api/elevenlabs/webhook`

### **Logs Locais:**
```bash
# Ver logs em tempo real
npm run server

# Os logs aparecerão no console
```

### **Teste de Conectividade:**
```bash
# Verificar se o endpoint está funcionando
curl -X GET https://seu-dominio.vercel.app/api/elevenlabs/webhook
# Deve retornar: {"error": "Method not allowed"}
```

## 📊 Monitoramento

### **Métricas Importantes:**
- **Taxa de sucesso** dos webhooks
- **Tempo de resposta** da API
- **Erros** de integração com HubSpot
- **Volume** de leads processados

### **Alertas Recomendados:**
- Falha na integração com HubSpot
- Webhook não recebendo dados
- Erro de autenticação
- Rate limit atingido

## 🔄 Manutenção

### **Atualizações:**
1. **Código**: Push para GitHub → Deploy automático
2. **Variáveis**: Atualizar no painel do Vercel
3. **Configurações**: Atualizar no ElevenLabs/Twilio

### **Backup:**
- **Configurações**: Documentar no README
- **Variáveis**: Backup seguro das chaves
- **Logs**: Exportar periodicamente

## 🆘 Solução de Problemas

### **Erro: "HUBSPOT_TOKEN not configured"**
- Verificar se a variável está configurada no Vercel
- Verificar se o token está correto
- Verificar se tem permissões no HubSpot

### **Erro: "HubSpot create failed"**
- Verificar se o token tem permissão para criar contatos
- Verificar se os campos obrigatórios estão sendo enviados
- Verificar limites de API do HubSpot

### **Webhook não recebe dados**
- Verificar URL configurada no ElevenLabs/Twilio
- Verificar se o endpoint está acessível
- Verificar logs do Vercel

### **Dados não aparecem no HubSpot**
- Verificar mapeamento de campos
- Verificar se o contato já existe
- Verificar logs de erro

## 📞 Suporte

Para problemas:
1. Verificar logs do Vercel
2. Testar endpoint manualmente
3. Verificar configurações no ElevenLabs/Twilio
4. Verificar permissões no HubSpot

---

**Desenvolvido para OnSmart AI** 🚀

