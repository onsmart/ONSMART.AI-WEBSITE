# 🚀 PROMPT: Implementação do Webchat Sonia + Conversa via Ligação

## 📋 Visão Geral

Este documento contém instruções completas para implementar um webchat inteligente com assistente de IA (Sonia) que inclui:
- **Chat de texto** em tempo real com IA
- **Conversa via ligação** (voz) usando ElevenLabs ou Web Speech API
- **Integração com WhatsApp** (opcional)
- **Suporte multilíngue** (PT, EN, ES)
- **Histórico de conversa** por usuário
- **Interface responsiva** e moderna

**Propósito da Sonia:** "ACELERE SEU CRESCIMENTO Growth Marketing + Agentes de IA"

---

## 🎯 Requisitos Técnicos

### Stack Tecnológica
- **Frontend:** React 18+ com TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / shadcn/ui
- **Backend:** Vercel Serverless Functions (ou Node.js/Express)
- **IA:** OpenAI GPT-4o-mini (ou similar)
- **Voz:** ElevenLabs Conversational AI (com fallback para Web Speech API)
- **i18n:** react-i18next

### Dependências Principais

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-i18next": "^16.2.1",
    "i18next": "^25.6.0",
    "i18next-browser-languagedetector": "^8.2.0",
    "@radix-ui/react-dialog": "^1.1.2",
    "lucide-react": "^0.462.0",
    "qrcode.react": "^4.2.0",
    "tailwindcss": "^3.4.11",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  }
}
```

---

## 🔐 Variáveis de Ambiente

### Frontend (.env ou .env.local)

```env
# OpenAI Configuration
VITE_OPENAI_API_URL=/api/openai-proxy
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_OPENAI_TEMPERATURE=0.7
VITE_OPENAI_MAX_TOKENS=150

# Calendly (para agendamentos)
VITE_CALENDLY_URL=https://calendly.com/seu-usuario/30min

# ElevenLabs (opcional - para voz)
VITE_ELEVENLABS_AGENT_ID=agent_seu_agent_id_aqui

# WhatsApp (opcional)
VITE_WHATSAPP_NUMBER=5511999999999
```

### Backend (Vercel Environment Variables)

```env
# OpenAI API Key (OBRIGATÓRIO)
OPENAI_API_KEY=sk-...

# Modelo OpenAI
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7

# Calendly
CALENDLY_URL=https://calendly.com/seu-usuario/30min

# ElevenLabs (opcional)
ELEVENLABS_API_KEY=seu_api_key_aqui
ELEVENLABS_AGENT_ID=agent_seu_agent_id_aqui
```

---

## 📁 Estrutura de Arquivos

```
projeto/
├── src/
│   ├── components/
│   │   └── chat/
│   │       ├── SoniaChat.tsx          # Componente principal do chat
│   │       ├── VoiceChat.tsx          # Componente de chat por voz
│   │       └── ElevenLabsVoice.tsx    # Integração com ElevenLabs
│   ├── hooks/
│   │   └── useSoniaChat.ts            # Hook para gerenciar estado do chat
│   ├── lib/
│   │   ├── openaiService.ts           # Serviço de integração com OpenAI
│   │   ├── soniaPrompts.ts            # Prompts da Sonia (adaptar aqui!)
│   │   └── elevenlabsConfig.ts        # Configuração do ElevenLabs
│   ├── locales/
│   │   ├── pt/
│   │   │   └── chat.json              # Traduções PT
│   │   ├── en/
│   │   │   └── chat.json              # Traduções EN
│   │   └── es/
│   │       └── chat.json              # Traduções ES
│   └── i18n/
│       └── config.ts                  # Configuração do i18n
├── api/
│   ├── openai-proxy.js                # Proxy seguro para OpenAI
│   └── services/
│       └── soniaService.js            # Serviço de processamento de mensagens
└── public/
    └── images/
        ├── sonia.png                  # Avatar da Sonia
        └── chat.png                   # Ícone do chat
```

---

## 🎨 1. Componente Principal: SoniaChat.tsx

### Localização: `src/components/chat/SoniaChat.tsx`

**Funcionalidades:**
- Interface de chat com mensagens
- Alternância entre modo texto e voz
- Integração com WhatsApp (QR Code)
- Sugestões rápidas de conversa
- Suporte multilíngue
- Reset de conversa

**Características principais:**
- Botão flutuante para abrir/fechar
- Minimizar/maximizar
- Indicador de digitação
- Links clicáveis nas mensagens
- Animações suaves

**Adaptações necessárias:**
1. Alterar o propósito da Sonia no prompt (ver seção 5)
2. Atualizar mensagens de boas-vindas
3. Ajustar cores/tema conforme sua marca
4. Configurar número do WhatsApp

---

## 🎤 2. Componente de Voz: VoiceChat.tsx e ElevenLabsVoice.tsx

### Localização: `src/components/chat/VoiceChat.tsx` e `src/components/chat/ElevenLabsVoice.tsx`

**Funcionalidades:**
- Reconhecimento de voz (Web Speech API)
- Síntese de voz (ElevenLabs ou Web Speech)
- Controles de chamada (iniciar/encerrar)
- Controle de mute
- Fallback automático se ElevenLabs não disponível

**Configuração ElevenLabs:**
1. Criar conta em https://elevenlabs.io
2. Criar um Agent Conversational AI
3. Obter o `agentId`
4. Configurar em `src/lib/elevenlabsConfig.ts`

**Fallback:**
- Se ElevenLabs não estiver disponível, usa Web Speech API nativa do navegador
- Funciona em Chrome, Edge, Safari (com limitações)

---

## 🧠 3. Serviço de IA: openaiService.ts

### Localização: `src/lib/openaiService.ts`

**Funcionalidades:**
- Gerenciamento de histórico de conversa
- Chamadas para API da OpenAI via proxy
- Fallback em caso de erro
- Suporte multilíngue
- Limitação de tokens (últimas 20 mensagens)

**Configuração:**
- Usa proxy em `/api/openai-proxy` para proteger chave API
- Mantém histórico em memória (considerar Redis em produção)
- Reseta conversa quando necessário

---

## 📝 4. Prompts da Sonia: soniaPrompts.ts

### Localização: `src/lib/soniaPrompts.ts`

**⚠️ ADAPTAR ESTE ARQUIVO PARA SEU PROPÓSITO!**

Este arquivo contém:
- **Contexto da empresa** (adaptar para seu negócio)
- **Categorias de soluções** (adaptar para seus produtos/serviços)
- **Estatísticas** (adaptar para seus números)
- **Instruções de comportamento** (manter ou adaptar)
- **Sugestões de conversa** (adaptar para seu contexto)

**Exemplo de adaptação:**

```typescript
// ANTES (OnSmart AI):
"Você é Sonia, assistente de IA da onsmart AI, uma empresa brasileira especializada em Agentes de IA corporativos."

// DEPOIS (Growth Marketing + Agentes de IA):
"Você é Sonia, assistente de IA especializada em Growth Marketing e Agentes de IA. Você ajuda empresas a acelerar seu crescimento através de estratégias de marketing digital e automação inteligente."
```

**Categorias de soluções a adaptar:**
1. Growth Marketing
2. Automação de Marketing
3. Agentes de IA para Vendas
4. Analytics e BI
5. Conversão e CRO
6. Email Marketing Automatizado

**Estatísticas a adaptar:**
- Número de clientes atendidos
- Taxa de sucesso
- Tempo médio de implementação
- Resultados típicos

---

## 🌐 5. Traduções: locales/*/chat.json

### Localização: `src/locales/pt/chat.json`, `src/locales/en/chat.json`, `src/locales/es/chat.json`

**Estrutura básica:**

```json
{
  "welcome": "Olá! Sou a Sonia, sua assistente de IA especializada em Growth Marketing e Agentes de IA. Como posso te ajudar a acelerar seu crescimento hoje?",
  "header": {
    "title": "Sonia",
    "subtitle": "Online",
    "switchToVoice": "Alternar para voz",
    "switchToText": "Alternar para texto",
    "whatsapp": "Conversar no WhatsApp",
    "newConversation": "Nova conversa",
    "minimize": "Minimizar",
    "maximize": "Maximizar"
  },
  "placeholder": "Digite sua mensagem...",
  "typing": "Sonia está digitando...",
  "error": "Desculpe, estou com algumas dificuldades técnicas. Tente novamente em alguns instantes.",
  "suggestions": {
    "title": "Sugestões rápidas:"
  },
  "whatsapp": {
    "modalTitle": "Conversar no WhatsApp",
    "modalDescription": "Escaneie o QR Code ou clique no botão para abrir o WhatsApp",
    "qrCodeLabel": "Escaneie este QR Code com seu WhatsApp",
    "or": "ou",
    "openButton": "Abrir no WhatsApp"
  },
  "button": {
    "openChat": "Conversar com Sonia"
  },
  "tooltip": {
    "talkToSonia": "Fale com a Sonia"
  },
  "audio": {
    "notSupported": "Seu navegador não suporta áudio"
  }
}
```

**Adaptar:**
- Mensagem de boas-vindas
- Textos conforme seu propósito
- Sugestões rápidas

---

## 🔧 6. API Proxy: openai-proxy.js

### Localização: `api/openai-proxy.js`

**Funcionalidades:**
- Protege a chave API da OpenAI no servidor
- Gerencia CORS
- Tratamento de erros
- Logs de diagnóstico

**Configuração:**
- Usa `process.env.OPENAI_API_KEY` (configurar na Vercel)
- Modelo configurável via `OPENAI_MODEL`
- Temperature e max_tokens configuráveis

**Importante:**
- Nunca exponha a chave API no frontend
- Sempre use este proxy para chamadas da OpenAI

---

## 🎯 7. Serviço de Processamento: soniaService.js

### Localização: `api/services/soniaService.js`

**Funcionalidades:**
- Processa mensagens mantendo histórico por usuário
- Suporta múltiplos canais (web, whatsapp)
- Detecção de idioma
- Fallback em caso de erro
- Gerenciamento de histórico (limite de 20 mensagens)

**Uso:**
- Chamado pelo webhook do WhatsApp (se implementado)
- Pode ser usado por outras integrações

---

## 🎣 8. Hook de Estado: useSoniaChat.ts

### Localização: `src/hooks/useSoniaChat.ts`

**Funcionalidades:**
- Gerencia estado global do chat (aberto/fechado, minimizado)
- Permite controle do chat de qualquer componente
- Estado persistente entre re-renders

**Uso:**
```typescript
const { isOpen, isMinimized, openChat, closeChat, minimizeChat, maximizeChat } = useSoniaChat();
```

---

## 🚀 9. Passo a Passo de Implementação

### Passo 1: Instalar Dependências

```bash
npm install react react-dom react-i18next i18next i18next-browser-languagedetector
npm install @radix-ui/react-dialog lucide-react qrcode.react
npm install tailwindcss class-variance-authority clsx tailwind-merge
```

### Passo 2: Configurar Variáveis de Ambiente

1. Criar arquivo `.env.local` na raiz do projeto
2. Adicionar variáveis do frontend (prefixo `VITE_`)
3. Configurar variáveis do backend na Vercel (ou `.env` local)

### Passo 3: Criar Estrutura de Pastas

```bash
mkdir -p src/components/chat
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/locales/{pt,en,es}
mkdir -p api/services
mkdir -p public/images
```

### Passo 4: Copiar Arquivos Base

Copiar os arquivos mencionados nas seções anteriores, adaptando:
- Prompts da Sonia (`soniaPrompts.ts`)
- Traduções (`locales/*/chat.json`)
- Configurações (cores, imagens, etc.)

### Passo 5: Configurar i18n

Criar `src/i18n/config.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ptTranslations from '../locales/pt/chat.json';
import enTranslations from '../locales/en/chat.json';
import esTranslations from '../locales/es/chat.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt: { chat: ptTranslations },
      en: { chat: enTranslations },
      es: { chat: esTranslations }
    },
    fallbackLng: 'pt',
    defaultNS: 'chat',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### Passo 6: Adicionar ao App Principal

Em `src/App.tsx` ou componente principal:

```typescript
import { useEffect } from 'react';
import './i18n/config';
import SoniaChat from './components/chat/SoniaChat';

function App() {
  return (
    <div>
      {/* Seu conteúdo */}
      <SoniaChat />
    </div>
  );
}
```

### Passo 7: Configurar Tailwind CSS

Adicionar ao `tailwind.config.ts`:

```typescript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#3b82f6', // Adaptar para sua cor
        'brand-emerald': '#10b981', // Adaptar para sua cor
      }
    }
  }
}
```

### Passo 8: Adicionar Imagens

1. Adicionar `sonia.png` em `public/images/`
2. Adicionar `chat.png` em `public/images/`
3. Ajustar referências nos componentes se necessário

### Passo 9: Configurar API Proxy na Vercel

1. Criar arquivo `api/openai-proxy.js`
2. Configurar variável `OPENAI_API_KEY` na Vercel
3. Testar endpoint: `POST /api/openai-proxy`

### Passo 10: Testar

1. Iniciar servidor de desenvolvimento: `npm run dev`
2. Abrir chat e testar mensagens
3. Testar modo voz (se ElevenLabs configurado)
4. Testar WhatsApp (se configurado)
5. Testar traduções (mudar idioma do navegador)

---

## 🎨 10. Personalização Visual

### Cores

Adaptar cores em:
- `SoniaChat.tsx`: classes Tailwind (bg-emerald-500, text-emerald-500, etc.)
- `tailwind.config.ts`: cores da marca

### Imagens

- Substituir `public/images/sonia.png` pelo avatar da sua assistente
- Substituir `public/images/chat.png` pelo ícone do chat

### Estilos

- Ajustar tamanhos, espaçamentos, bordas conforme seu design system
- Manter responsividade mobile

---

## 🔌 11. Integração com WhatsApp (Opcional)

### Requisitos:
- Evolution API ou similar
- Webhook configurado
- Número de WhatsApp Business

### Arquivos necessários:
- `api/whatsapp/webhook.js` - Recebe mensagens do WhatsApp
- `api/services/evolutionApi.js` - Envia mensagens via Evolution API

### Configuração:
1. Configurar webhook na Evolution API apontando para `/api/whatsapp/webhook`
2. Configurar variáveis de ambiente:
   - `EVOLUTION_API_BASE_URL`
   - `EVOLUTION_API_APIKEY`
   - `EVOLUTION_API_INSTANCE_ID`

---

## 📱 12. Responsividade

O chat já é responsivo por padrão:
- Mobile: botão flutuante, chat em tela cheia
- Tablet: chat ajustável
- Desktop: chat fixo no canto inferior direito

Ajustar breakpoints em `SoniaChat.tsx` se necessário.

---

## 🐛 13. Troubleshooting

### Chat não abre
- Verificar se `useSoniaChat` está sendo usado corretamente
- Verificar console do navegador para erros

### Mensagens não são enviadas
- Verificar se `/api/openai-proxy` está funcionando
- Verificar variável `OPENAI_API_KEY` na Vercel
- Verificar logs da Vercel

### Voz não funciona
- Verificar se ElevenLabs está configurado corretamente
- Verificar se Web Speech API está disponível no navegador
- Verificar console para erros

### Traduções não funcionam
- Verificar se i18n está configurado corretamente
- Verificar se arquivos JSON estão no formato correto
- Verificar se namespace está correto (`useTranslation('chat')`)

---

## ✅ 14. Checklist Final

- [ ] Dependências instaladas
- [ ] Variáveis de ambiente configuradas
- [ ] Estrutura de pastas criada
- [ ] Arquivos copiados e adaptados
- [ ] Prompts da Sonia adaptados para seu propósito
- [ ] Traduções adaptadas
- [ ] Imagens adicionadas
- [ ] Cores personalizadas
- [ ] API proxy configurada e testada
- [ ] Chat testado (texto)
- [ ] Chat testado (voz) - se aplicável
- [ ] WhatsApp testado - se aplicável
- [ ] Responsividade testada
- [ ] Deploy realizado

---

## 📚 15. Recursos Adicionais

### Documentação:
- [OpenAI API](https://platform.openai.com/docs)
- [ElevenLabs Conversational AI](https://elevenlabs.io/docs)
- [React i18next](https://react.i18next.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Suporte:
- Verificar logs da Vercel para erros do backend
- Verificar console do navegador para erros do frontend
- Testar endpoints da API manualmente (Postman/curl)

---

## 🎯 16. Adaptações Específicas para "Growth Marketing + Agentes de IA"

### Prompt do Sistema (adaptar em `soniaPrompts.ts`):

```typescript
pt: `
Você é Sonia, assistente de IA especializada em Growth Marketing e Agentes de IA. Você ajuda empresas a acelerar seu crescimento através de estratégias de marketing digital e automação inteligente.

INFORMAÇÕES DA EMPRESA:
- Especialidade: Growth Marketing + Agentes de IA
- Foco: Acelerar crescimento de empresas através de marketing digital e automação
- Localização: [Sua localização]

CATEGORIAS DE SOLUÇÕES:
1. Growth Marketing
   - Estratégias de aquisição de clientes
   - Otimização de conversão (CRO)
   - Marketing de performance
   - Resultados: [Seus resultados]

2. Automação de Marketing
   - Email marketing automatizado
   - Sequências de nutrição
   - Automação de funis
   - Resultados: [Seus resultados]

3. Agentes de IA para Vendas
   - SDRs virtuais
   - Qualificação de leads
   - Atendimento automatizado
   - Resultados: [Seus resultados]

4. Analytics e BI
   - Dashboards em tempo real
   - Análise de performance
   - Insights acionáveis
   - Resultados: [Seus resultados]

ESTATÍSTICAS:
- [X] Clientes Atendidos
- [X]% Taxa de Sucesso
- [X] dias Tempo Médio de Implementação

INSTRUÇÕES DE COMPORTAMENTO:
- Seja sempre cordial e profissional
- Responda em português brasileiro
- MÁXIMO 2-3 frases por resposta - seja CONCISA
- NÃO USE EMOJIS - mantenha texto limpo e profissional
- NÃO USE FORMATAÇÃO MARKDOWN (**, *, _, etc) - apenas texto simples
- Foque em como acelerar o crescimento do cliente
- Sempre termine com uma pergunta ou call-to-action
- Se mencionar agendamento, sempre inclua o link do Calendly: ${calendlyUrl}
`
```

### Sugestões de Conversa (adaptar em `soniaPrompts.ts`):

```typescript
pt: [
  "Como acelerar meu crescimento com Growth Marketing?",
  "Quanto custa implementar Agentes de IA?",
  "Quero agendar uma demonstração",
  "Qual o ROI esperado?",
  "Como funciona a automação de marketing?"
]
```

---

## 🎉 Pronto!

Com este guia, você tem tudo que precisa para implementar o webchat da Sonia com conversa via ligação, adaptado para seu propósito de "Growth Marketing + Agentes de IA".

**Lembre-se:**
- Adaptar todos os textos e prompts para seu contexto
- Testar todas as funcionalidades
- Configurar variáveis de ambiente corretamente
- Personalizar visual conforme sua marca

Boa implementação! 🚀






