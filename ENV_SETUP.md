# 🔧 Configuração de Variáveis de Ambiente

Este guia te ajudará a configurar todas as chaves de API necessárias para o projeto OnSmart AI.

## 🚀 Configuração Rápida.

### 1. Criar o arquivo .env
```bash
npm run setup:env
```

### 2. Editar o arquivo .env
Abra o arquivo `.env` criado e configure suas chaves de API.

## 📋 Chaves de API Necessárias

### 🔴 **OBRIGATÓRIAS** (para funcionamento básico)

#### 1. **OPENAI_API_KEY** - Chat da Sonia
- **Onde obter**: https://platform.openai.com/api-keys
- **Como configurar**:
  1. Acesse o link acima
  2. Faça login na sua conta OpenAI
  3. Clique em "Create new secret key"
  4. Copie a chave (começa com `sk-`)
  5. Cole no arquivo `.env`

#### 2. **ELEVENLABS_AGENT_ID** - Voz da Sonia
- **Onde obter**: https://elevenlabs.io/app/conversational-ai
- **Como configurar**:
  1. Acesse o link acima
  2. Crie um novo agente conversacional
  3. Copie o Agent ID
  4. Cole no arquivo `.env`

#### 3. **VITE_ELEVENLABS_API_KEY** - API do ElevenLabs
- **Onde obter**: https://elevenlabs.io/app/settings/api-keys
- **Como configurar**:
  1. Acesse o link acima
  2. Clique em "Create API Key"
  3. Copie a chave
  4. Cole no arquivo `.env`

### 🟡 **OPCIONAIS** (para funcionalidades extras)

#### 4. **VITE_SUPABASE_URL** e **VITE_SUPABASE_ANON_KEY** - Banco de dados
- **Onde obter**: https://supabase.com/
- **Como configurar**:
  1. Crie uma conta no Supabase
  2. Crie um novo projeto
  3. Vá em Settings > API
  4. Copie a URL e a chave anônima
  5. Cole no arquivo `.env`

#### 5. **VITE_YOUTUBE_API_KEY** - Feed do YouTube
- **Onde obter**: https://console.developers.google.com/
- **Como configurar**:
  1. Acesse o Google Cloud Console
  2. Ative a YouTube Data API v3
  3. Crie uma chave API
  4. Cole no arquivo `.env`

#### 6. **VITE_GOOGLE_PAGESPEED_API_KEY** - Métricas de performance
- **Onde obter**: https://console.developers.google.com/
- **Como configurar**:
  1. Acesse o Google Cloud Console
  2. Ative a PageSpeed Insights API
  3. Crie uma chave API
  4. Cole no arquivo `.env`

## 📝 Exemplo de arquivo .env configurado

```env
# Configurações do servidor
PORT=3001
NODE_ENV=development

# OpenAI (OBRIGATÓRIO)
OPENAI_API_KEY=<OPENAI_API_KEY_REMOVED>...
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7

# ElevenLabs (OBRIGATÓRIO)
ELEVENLABS_AGENT_ID=agent_123...
VITE_ELEVENLABS_API_KEY=sk_abc123...

# Frontend OpenAI
VITE_OPENAI_MODEL=gpt-4o-mini
VITE_OPENAI_TEMPERATURE=0.7
VITE_OPENAI_MAX_TOKENS=150

# Supabase (OPCIONAL)
VITE_SUPABASE_URL=https://abc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# YouTube (OPCIONAL)
VITE_YOUTUBE_API_KEY=AIzaSyAbc123...

# Google PageSpeed (OPCIONAL)
VITE_GOOGLE_PAGESPEED_API_KEY=AIzaSyDef456...

# Configurações da empresa
VITE_COMPANY_PHONE=5511996669247
VITE_COMPANY_EMAIL=contato@onsmartai.com
VITE_COMPANY_NAME=OnSmart AI
VITE_CALENDLY_URL=https://calendly.com/ricardo-palomar-onsmartai/30min

# Analytics
VITE_GA_DEBUG_MODE=false
```

## ✅ Verificação da Configuração

### 1. Testar o servidor
```bash
npm run server
```

### 2. Testar o frontend
```bash
npm run dev
```

### 3. Verificar funcionalidades
- **Chat da Sonia**: Deve funcionar com OpenAI
- **Voz da Sonia**: Deve funcionar com ElevenLabs
- **YouTube Feed**: Funciona se configurado
- **Métricas**: Funcionam se configuradas

## 🐛 Solução de Problemas

### Erro: "API key not configured"
- Verifique se a chave está correta no arquivo `.env`
- Certifique-se de que não há espaços extras
- Reinicie o servidor após alterar o `.env`

### Erro: "Failed to fetch ElevenLabs widget"
- Verifique se o `ELEVENLABS_AGENT_ID` está correto
- Certifique-se de que o agente está ativo no ElevenLabs

### Erro: "OpenAI API error"
- Verifique se a `OPENAI_API_KEY` está correta
- Certifique-se de que tem créditos na conta OpenAI

### Chat não funciona
- Verifique se o servidor está rodando (`npm run server`)
- Verifique se as chaves estão configuradas
- Verifique os logs do servidor

## 🔒 Segurança

### ⚠️ **IMPORTANTE**
- **NUNCA** commite o arquivo `.env` no Git
- **NUNCA** compartilhe suas chaves de API
- Use chaves diferentes para desenvolvimento e produção
- Revogue chaves comprometidas imediatamente

### Boas práticas:
- Use variáveis de ambiente no servidor de produção
- Configure limites de uso nas APIs
- Monitore o uso das chaves regularmente
- Mantenha backups seguros das configurações

## 📞 Suporte

Se tiver problemas:
1. Verifique se todas as chaves estão corretas
2. Consulte a documentação das APIs
3. Verifique os logs do servidor
4. Teste cada integração individualmente

---

**Desenvolvido para OnSmart AI** 🚀

