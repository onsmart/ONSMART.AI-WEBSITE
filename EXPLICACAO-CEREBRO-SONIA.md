# 🧠 Explicação Completa: Como Funciona o Cérebro da Sonia (Sistema de Chat)

## 📋 Visão Geral

O sistema de chat da Sonia é composto por **3 camadas principais** que trabalham juntas para processar mensagens e gerar respostas inteligentes:

1. **Frontend (React)** - Interface do usuário e gerenciamento de estado local
2. **Backend (Vercel Serverless)** - Processamento de mensagens e histórico de conversa
3. **Proxy (API Route)** - Proteção da chave API da OpenAI

---

## 🔄 Fluxo Completo de uma Mensagem

```
┌─────────────────┐
│   Usuário       │
│  Digita msg     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SoniaChat.tsx  │  ← Componente React (Frontend)
│  handleSendMsg  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ openaiService   │  ← Serviço Frontend (gerencia histórico local)
│ .sendMessage()  │
└────────┬────────┘
         │
         │ POST /api/openai-proxy
         │ { messages: [...] }
         ▼
┌─────────────────┐
│ openai-proxy.js │  ← API Route (protege chave API)
│  handler()      │
└────────┬────────┘
         │
         │ POST https://api.openai.com/v1/chat/completions
         │ Authorization: Bearer {API_KEY}
         ▼
┌─────────────────┐
│   OpenAI API    │  ← API Externa (GPT-4o-mini)
│  Chat Completions│
└────────┬────────┘
         │
         │ { message: "resposta..." }
         ▼
┌─────────────────┐
│ openai-proxy.js │  ← Retorna resposta
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ openaiService   │  ← Adiciona ao histórico local
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SoniaChat.tsx  │  ← Exibe resposta na tela
│  setMessages()  │
└─────────────────┘
```

---

## 🎯 1. Frontend: openaiService.ts

### Localização: `src/lib/openaiService.ts`

### Responsabilidades:
- ✅ Gerenciar histórico de conversa **local** (no navegador)
- ✅ Chamar o proxy da API
- ✅ Detectar idioma do navegador (via i18n)
- ✅ Aplicar lembretes de concisão
- ✅ Fallback em caso de erro

### Como Funciona:

#### 1.1. Inicialização

```typescript
export class OpenAIService {
  private messages: ChatMessage[] = [];

  constructor() {
    // Inicializa com prompt do sistema no idioma atual
    this.messages = this.initializeMessages();
  }

  private initializeMessages(): ChatMessage[] {
    return [{
      role: 'system',
      content: this.getCurrentSystemPrompt() // Pega prompt traduzido
    }];
  }
}
```

**O que acontece:**
- Ao criar a instância, inicializa com o prompt do sistema
- O prompt é traduzido conforme o idioma do navegador (pt/en/es)
- Usa `i18n.language` para detectar idioma

#### 1.2. Envio de Mensagem

```typescript
async sendMessage(userMessage: string): Promise<string> {
  // 1. Adiciona mensagem do usuário ao histórico
  this.messages.push({
    role: 'user',
    content: userMessage
  });

  // 2. Adiciona lembrete de concisão se conversa longa (>5 mensagens)
  if (this.messages.length > 5) {
    this.messages.push({
      role: 'system',
      content: 'LEMBRE-SE: Resposta MÁXIMO 2-3 frases...'
    });
  }

  // 3. Chama o proxy
  const response = await fetch('/api/openai-proxy', {
    method: 'POST',
    body: JSON.stringify({ messages: this.messages })
  });

  // 4. Processa resposta
  const data = await response.json();
  const assistantMessage = data.message;

  // 5. Adiciona resposta ao histórico
  this.messages.push({
    role: 'assistant',
    content: assistantMessage
  });

  // 6. Limita histórico (últimas 20 mensagens)
  if (this.messages.length > 21) {
    this.messages = [
      this.messages[0], // system prompt
      ...this.messages.slice(-20) // últimas 20
    ];
  }

  return assistantMessage;
}
```

**Pontos importantes:**
- ✅ Histórico é mantido **em memória** no navegador
- ✅ Limita a 20 mensagens para economizar tokens
- ✅ Adiciona lembrete de concisão automaticamente
- ✅ Remove o lembrete após receber resposta

#### 1.3. Reset de Conversa

```typescript
resetConversation(): void {
  // Recarrega o prompt do sistema no idioma atual
  this.messages = this.initializeMessages();
}
```

**Quando é usado:**
- Usuário clica no botão "Nova conversa"
- Idioma do navegador muda

---

## 🧠 2. Backend: soniaService.js (O CÉREBRO PRINCIPAL)

### Localização: `api/services/soniaService.js`

### Responsabilidades:
- ✅ Gerenciar histórico de conversa **por usuário** (servidor)
- ✅ Processar mensagens com contexto completo
- ✅ Detectar idioma da mensagem
- ✅ Construir prompts do sistema
- ✅ Fallback inteligente

### Como Funciona:

#### 2.1. Armazenamento de Histórico

```javascript
// Map que armazena histórico por userId
const conversationHistory = new Map();

// Exemplo:
// conversationHistory.set('user-123', [
//   { role: 'system', content: 'Você é a Sonia...' },
//   { role: 'user', content: 'Olá' },
//   { role: 'assistant', content: 'Olá! Como posso ajudar?' }
// ]);
```

**Características:**
- ✅ Histórico **persistente por usuário** (diferente do frontend)
- ✅ Usa `Map` para acesso rápido
- ⚠️ **Em produção, considere Redis ou banco de dados** (atualmente é em memória)

#### 2.2. Processamento de Mensagem

```javascript
export async function processSoniaMessage(userId, message, options = {}) {
  const { channel = 'web', language = 'pt' } = options;
  
  // 1. Obter histórico do usuário
  let history = conversationHistory.get(userId) || [];
  
  // 2. Se não tem histórico, inicializar com prompt do sistema
  if (history.length === 0) {
    history = [{
      role: 'system',
      content: getSoniaSystemPrompt(language) // Prompt traduzido
    }];
  }
  
  // 3. Adicionar mensagem do usuário
  history.push({
    role: 'user',
    content: message
  });
  
  // 4. Adicionar lembrete de concisão se necessário
  const addedReminder = history.length > 5;
  if (addedReminder) {
    history.push({
      role: 'system',
      content: 'LEMBRE-SE: Resposta MÁXIMO 2-3 frases...'
    });
  }
  
  // 5. Limitar histórico (últimas 20 mensagens)
  if (history.length > 21) {
    history = [
      history[0], // system prompt
      ...history.slice(-20) // últimas 20
    ];
  }
  
  // 6. Chamar OpenAI através do proxy
  const proxyUrl = buildProxyUrl(channel, options.request);
  const response = await fetch(proxyUrl, {
    method: 'POST',
    body: JSON.stringify({ messages: history })
  });
  
  // 7. Processar resposta
  const data = await response.json();
  const assistantMessage = data.message;
  
  // 8. Remover lembrete se foi adicionado
  if (addedReminder) {
    history.pop();
  }
  
  // 9. Adicionar resposta ao histórico
  history.push({
    role: 'assistant',
    content: assistantMessage
  });
  
  // 10. Salvar histórico atualizado
  conversationHistory.set(userId, history);
  
  return assistantMessage;
}
```

**Diferenças do Frontend:**
- ✅ Histórico é **por usuário** (userId único)
- ✅ Funciona para múltiplos canais (web, whatsapp)
- ✅ Detecta idioma automaticamente se não fornecido
- ✅ Constrói URL do proxy dinamicamente

#### 2.3. Construção da URL do Proxy

```javascript
// Lógica inteligente para construir URL do proxy
function buildProxyUrl(channel, request) {
  if (channel === 'whatsapp') {
    // WhatsApp sempre usa domínio de produção
    return 'https://onsmart.ai/api/openai-proxy';
  }
  
  // Webchat: tenta várias fontes
  if (request?.headers?.['x-forwarded-host']) {
    return `https://${request.headers['x-forwarded-host']}/api/openai-proxy`;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/openai-proxy`;
  }
  
  // Fallback para localhost em desenvolvimento
  return 'http://localhost:3000/api/openai-proxy';
}
```

**Por que isso é importante:**
- ✅ Funciona em diferentes ambientes (dev, staging, produção)
- ✅ Detecta automaticamente a URL correta
- ✅ WhatsApp usa sempre produção (webhook externo)

#### 2.4. Prompt do Sistema

```javascript
function getSoniaSystemPrompt(language = 'pt') {
  const prompts = {
    pt: `Você é Sonia, assistente de IA da onsmart AI...
    
    INFORMAÇÕES DA EMPRESA:
    - Nome: onsmart AI
    - Especialidade: Agentes de IA corporativos
    ...
    
    INSTRUÇÕES DE COMPORTAMENTO:
    - Seja sempre cordial
    - MÁXIMO 2-3 frases por resposta
    - NÃO USE EMOJIS
    ...`,
    
    en: `You are Sonia, AI assistant from onsmart AI...`,
    es: `Eres Sonia, asistente de IA de onsmart AI...`
  };
  
  return prompts[language] || prompts.pt;
}
```

**O que contém:**
- ✅ Identidade da Sonia
- ✅ Informações da empresa
- ✅ Produtos/serviços
- ✅ Estatísticas
- ✅ Regras de comportamento
- ✅ Link do Calendly (para agendamentos)

#### 2.5. Fallback Inteligente

```javascript
function getFallbackResponse(message, language = 'pt') {
  const msg = message.toLowerCase();
  
  // Detectar intenção
  if (msg.includes('preço') || msg.includes('price')) {
    return 'Nossos Agentes de IA são personalizados...';
  }
  
  if (msg.includes('como funciona') || msg.includes('how does')) {
    return 'Nossos Agentes funcionam como assistentes...';
  }
  
  if (msg.includes('agendar') || msg.includes('schedule')) {
    return `Perfeito! Acesse: ${calendlyUrl}`;
  }
  
  return 'Olá! Sou a Sonia... Como posso ajudar?';
}
```

**Quando é usado:**
- ❌ API da OpenAI falha
- ❌ Erro de conexão
- ❌ Timeout

**Como funciona:**
- ✅ Detecta intenção da mensagem (preço, como funciona, agendar)
- ✅ Retorna resposta pré-definida no idioma correto
- ✅ Sempre inclui link do Calendly se for agendamento

---

## 🔒 3. Proxy: openai-proxy.js

### Localização: `api/openai-proxy.js`

### Responsabilidades:
- ✅ **Proteger a chave API** da OpenAI
- ✅ Fazer requisições para a OpenAI
- ✅ Tratar erros
- ✅ Configurar CORS

### Como Funciona:

```javascript
export default async function handler(req, res) {
  // 1. Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 2. Validar método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // 3. Obter chave API do servidor (NUNCA do frontend)
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }
  
  // 4. Preparar mensagens
  const { messages } = req.body;
  
  // 5. Chamar OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}` // Chave protegida
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 150
    })
  });
  
  // 6. Processar resposta
  const data = await response.json();
  const assistantMessage = data.choices[0]?.message?.content;
  
  // 7. Retornar resposta
  return res.status(200).json({ 
    message: assistantMessage,
    usage: data.usage 
  });
}
```

**Por que usar proxy:**
- 🔒 **Segurança**: Chave API nunca exposta no frontend
- 🔒 **Controle**: Pode adicionar rate limiting, logs, etc.
- 🔒 **Flexibilidade**: Pode trocar de API sem mudar frontend

---

## 🌐 4. Detecção de Idioma

### Localização: `api/services/soniaBrain.js` e `api/whatsapp/webhook.js`

### Como Funciona:

```javascript
function detectLanguage(message) {
  const msg = message.toLowerCase().trim();
  
  // Palavras-chave por idioma
  const englishKeywords = ['hello', 'hi', 'how', 'what', 'the', 'is', 'are'];
  const spanishKeywords = ['hola', 'cómo', 'qué', 'es', 'son'];
  const portugueseKeywords = ['olá', 'oi', 'como', 'o que', 'é', 'são'];
  
  // Contar ocorrências
  const englishCount = englishKeywords.filter(kw => msg.includes(kw)).length;
  const spanishCount = spanishKeywords.filter(kw => msg.includes(kw)).length;
  const portugueseCount = portugueseKeywords.filter(kw => msg.includes(kw)).length;
  
  // Detectar padrões (acentos)
  const hasSpanishPattern = /[áéíóúñü¿¡]/i.test(msg);
  const hasPortuguesePattern = /[áàâãéêíóôõúç]/i.test(msg);
  
  // Lógica de decisão
  if (hasSpanishPattern && !hasPortuguesePattern) return 'es';
  if (hasPortuguesePattern) return 'pt';
  if (englishCount >= 2) return 'en';
  
  // Comparar contagens
  if (englishCount > spanishCount && englishCount > portugueseCount) return 'en';
  if (spanishCount > englishCount && spanishCount > portugueseCount) return 'es';
  
  // Padrão: português
  return 'pt';
}
```

**Estratégia:**
1. ✅ Detecta acentos (espanhol vs português)
2. ✅ Conta palavras-chave
3. ✅ Compara contagens
4. ✅ Fallback para português

---

## 📝 5. Estrutura de Mensagens

### Formato das Mensagens:

```javascript
[
  {
    role: 'system',
    content: 'Você é a Sonia, assistente de IA...' // Prompt do sistema
  },
  {
    role: 'user',
    content: 'Olá, como funciona?' // Mensagem do usuário
  },
  {
    role: 'assistant',
    content: 'Olá! Nossos Agentes funcionam como...' // Resposta da IA
  },
  {
    role: 'user',
    content: 'Quanto custa?'
  },
  {
    role: 'assistant',
    content: 'Nossos Agentes são personalizados...'
  }
]
```

**Roles:**
- `system`: Instruções para a IA (prompt)
- `user`: Mensagens do usuário
- `assistant`: Respostas da IA

**Limite:**
- ✅ Máximo 21 mensagens (1 system + 20 user/assistant)
- ✅ Mantém sempre o system prompt no início
- ✅ Remove mensagens mais antigas automaticamente

---

## ⚙️ 6. Configuração Completa

### Variáveis de Ambiente (Frontend)

```env
# .env.local
VITE_OPENAI_API_URL=/api/openai-proxy
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_OPENAI_TEMPERATURE=0.7
VITE_OPENAI_MAX_TOKENS=150
VITE_CALENDLY_URL=https://calendly.com/seu-usuario/30min
```

### Variáveis de Ambiente (Backend - Vercel)

```env
# Vercel Environment Variables
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7
CALENDLY_URL=https://calendly.com/seu-usuario/30min
```

---

## 🔧 7. Como Replicar no Seu Projeto

### Passo 1: Criar Estrutura de Arquivos

```
projeto/
├── src/
│   └── lib/
│       └── openaiService.ts      # Serviço frontend
├── api/
│   ├── openai-proxy.js           # Proxy da API
│   └── services/
│       └── soniaService.js       # Serviço backend (opcional)
```

### Passo 2: Criar Proxy (OBRIGATÓRIO)

```javascript
// api/openai-proxy.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { messages } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 150
    })
  });

  const data = await response.json();
  return res.status(200).json({ 
    message: data.choices[0]?.message?.content 
  });
}
```

### Passo 3: Criar Serviço Frontend

```typescript
// src/lib/openaiService.ts
export class OpenAIService {
  private messages: ChatMessage[] = [];

  constructor() {
    this.messages = [{
      role: 'system',
      content: 'Você é um assistente de IA...' // SEU PROMPT AQUI
    }];
  }

  async sendMessage(userMessage: string): Promise<string> {
    this.messages.push({
      role: 'user',
      content: userMessage
    });

    const response = await fetch('/api/openai-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: this.messages })
    });

    const data = await response.json();
    const assistantMessage = data.message;

    this.messages.push({
      role: 'assistant',
      content: assistantMessage
    });

    // Limitar histórico
    if (this.messages.length > 21) {
      this.messages = [
        this.messages[0],
        ...this.messages.slice(-20)
      ];
    }

    return assistantMessage;
  }

  resetConversation(): void {
    this.messages = [{
      role: 'system',
      content: 'Você é um assistente de IA...'
    }];
  }
}

export const openAIService = new OpenAIService();
```

### Passo 4: Usar no Componente

```typescript
// src/components/Chat.tsx
import { openAIService } from '@/lib/openaiService';

const handleSendMessage = async () => {
  const response = await openAIService.sendMessage(message);
  setMessages(prev => [...prev, {
    text: response,
    sender: 'assistant'
  }]);
};
```

---

## 🎯 8. Diferenças: Frontend vs Backend

| Aspecto | Frontend (openaiService) | Backend (soniaService) |
|---------|-------------------------|------------------------|
| **Histórico** | Por sessão (navegador) | Por usuário (servidor) |
| **Persistência** | Perde ao fechar navegador | Mantém entre sessões |
| **Uso** | Webchat simples | WhatsApp, múltiplos canais |
| **Idioma** | Detecta do navegador | Detecta da mensagem |
| **Complexidade** | Simples | Mais complexo |

**Quando usar cada um:**
- ✅ **Frontend**: Chat simples no site (uma conversa por sessão)
- ✅ **Backend**: WhatsApp, múltiplos usuários, histórico persistente

---

## 🚀 9. Melhorias para Produção

### 1. Armazenar Histórico em Banco de Dados

```javascript
// Em vez de Map em memória
const conversationHistory = new Map();

// Usar banco de dados
async function getHistory(userId) {
  return await db.query('SELECT * FROM conversations WHERE user_id = ?', [userId]);
}
```

### 2. Rate Limiting

```javascript
// No proxy
const rateLimiter = new RateLimiter({
  windowMs: 60000, // 1 minuto
  max: 10 // 10 requisições por minuto
});
```

### 3. Logs e Analytics

```javascript
// Logar todas as conversas
await analytics.track('message_sent', {
  userId,
  message,
  language,
  timestamp: new Date()
});
```

### 4. Cache de Respostas

```javascript
// Cachear respostas frequentes
const cache = new Map();
if (cache.has(message)) {
  return cache.get(message);
}
```

---

## ✅ 10. Checklist de Implementação

- [ ] Criar proxy `/api/openai-proxy`
- [ ] Configurar `OPENAI_API_KEY` na Vercel
- [ ] Criar `openaiService.ts` no frontend
- [ ] Adaptar prompt do sistema para seu propósito
- [ ] Implementar histórico de conversa
- [ ] Adicionar fallback em caso de erro
- [ ] Testar em desenvolvimento
- [ ] Testar em produção
- [ ] Monitorar logs e erros

---

## 📚 Resumo

**O cérebro da Sonia funciona assim:**

1. **Frontend** coleta mensagem do usuário
2. **Frontend** adiciona ao histórico local e chama proxy
3. **Proxy** protege chave API e chama OpenAI
4. **OpenAI** processa com contexto completo (histórico)
5. **Proxy** retorna resposta
6. **Frontend** exibe resposta e atualiza histórico

**Pontos-chave:**
- ✅ Histórico mantém contexto da conversa
- ✅ Prompt do sistema define personalidade da Sonia
- ✅ Fallback garante resposta mesmo se API falhar
- ✅ Proxy protege chave API
- ✅ Detecção de idioma automática

---

**Pronto para implementar!** 🚀


