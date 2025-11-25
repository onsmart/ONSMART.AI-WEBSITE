# Configuração de Variáveis de Ambiente

## Variáveis de Ambiente na Vercel

Configure as seguintes variáveis de ambiente no painel da Vercel:

### 1. Acesse o Painel da Vercel
- Vá para: https://vercel.com/dashboard
- Selecione o projeto `onsmart-website` (ou nome do seu projeto)
- Vá em **Settings** → **Environment Variables**

### 2. Adicione as seguintes variáveis:

```bash
# Evolution API - Configuração de conexão
EVOLUTION_API_BASE_URL=https://evolution.sonia.onsmart.ai
EVOLUTION_API_APIKEY=<sua_chave_api_evolution>
EVOLUTION_API_INSTANCE_ID=<id_da_instancia_evolution>

# WhatsApp - Configuração do número e mensagem inicial
SONIA_WHATSAPP_NUMBER=+551150931836
SONIA_WHATSAPP_INITIAL_MESSAGE=Olá! Sou a Sonia, assistente de IA da onsmart AI. Como posso ajudar?

# Calendly (já deve existir, verificar)
VITE-CALENDLY_URL=https://calendly.com/ricardo-palomar-onsmartai/30min

# OpenAI (já deve existir, verificar)
OPENAI_API_KEY=<sua_chave_openai>
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7
```

### 3. Valores a preencher:

- **EVOLUTION_API_BASE_URL**: URL base da sua Evolution API (ex: `https://evolution.sonia.onsmart.ai`)
  - ⚠️ **Ainda não configurado** - será definido após instalar a Evolution API na VPS
  - 📖 **Como obter**: Ver guia `COMO-OBTER-VALORES-EVOLUTION-API.md` - Seção 2

- **EVOLUTION_API_APIKEY**: Chave de API da Evolution API
  - ⚠️ **Ainda não configurado** - será gerado/obtido após instalar a Evolution API
  - 📖 **Como obter**: Ver guia `COMO-OBTER-VALORES-EVOLUTION-API.md` - Seção 1
  - 💡 **Dica**: Gere com `openssl rand -base64 32` na VPS

- **EVOLUTION_API_INSTANCE_ID**: ID da instância do WhatsApp na Evolution API
  - ⚠️ **Ainda não configurado** - será criado após conectar o WhatsApp na Evolution API
  - 📖 **Como obter**: Ver guia `COMO-OBTER-VALORES-EVOLUTION-API.md` - Seção 3
  - 💡 **Dica**: É o nome que você dá ao criar a instância (ex: `sonia-whatsapp`)

- **SONIA_WHATSAPP_NUMBER**: Número do WhatsApp da Sonia
  - ✅ Já definido: `+551150931836`

- **SONIA_WHATSAPP_INITIAL_MESSAGE**: Mensagem inicial quando usuário clicar no link
  - ✅ Já definido: `Olá! Sou a Sonia, assistente de IA da onsmart AI. Como posso ajudar?`

### 4. Após configurar a Evolution API:

1. Volte aqui e atualize:
   - `EVOLUTION_API_BASE_URL`
   - `EVOLUTION_API_APIKEY`
   - `EVOLUTION_API_INSTANCE_ID`

2. Faça o redeploy na Vercel para aplicar as novas variáveis

---

## Variáveis de Ambiente na VPS (Docker Compose)

As variáveis da Evolution API serão configuradas no arquivo `docker-compose.yml` (ver guia de instalação).

**IMPORTANTE**: Os nomes exatos das variáveis devem ser verificados na documentação oficial da Evolution API v2.x.

