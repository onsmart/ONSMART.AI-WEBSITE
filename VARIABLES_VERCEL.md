# Variáveis de Ambiente - Vercel

## 📋 Checklist de Variáveis Obrigatórias

### 1. **OPENAI_API_KEY** ⚠️ OBRIGATÓRIA
- **Descrição**: Chave da API da OpenAI para gerar respostas da Sonia
- **Formato**: `sk-...` (chave completa da OpenAI)
- **Onde configurar**: Vercel → Settings → Environment Variables
- **Ambientes**: Production, Preview, Development (todos)
- **Como verificar**: Se não estiver configurada, aparecerá erro "API key not configured" nos logs

### 2. **EVOLUTION_API_BASE_URL** ⚠️ OBRIGATÓRIA
- **Descrição**: URL base da sua Evolution API (servidor onde está rodando)
- **Formato**: `https://seu-servidor.com` ou `http://seu-ip:porta` (sem barra no final)
- **Exemplo**: `https://evoapi.onsmart.ai` ou `http://192.168.1.100:8080`
- **Onde configurar**: Vercel → Settings → Environment Variables
- **Ambientes**: Production, Preview, Development (todos)
- **⚠️ IMPORTANTE**: Deve ser acessível publicamente (ou via Cloudflare Tunnel)

### 3. **EVOLUTION_API_APIKEY** ⚠️ OBRIGATÓRIA
- **Descrição**: Chave de API da Evolution API
- **Formato**: String alfanumérica (geralmente longa)
- **Onde encontrar**: No painel da Evolution API ou no arquivo de configuração
- **Onde configurar**: Vercel → Settings → Environment Variables
- **Ambientes**: Production, Preview, Development (todos)

### 4. **EVOLUTION_API_INSTANCE_ID** ⚠️ OBRIGATÓRIA
- **Descrição**: ID da instância do WhatsApp na Evolution API
- **Formato**: String (ex: `sonia-whatsapp-v3` ou `sonia`)
- **Onde encontrar**: No painel da Evolution API, na lista de instâncias
- **Onde configurar**: Vercel → Settings → Environment Variables
- **Ambientes**: Production, Preview, Development (todos)

### 5. **CALENDLY_URL** (Opcional, mas recomendado)
- **Descrição**: URL do Calendly para agendamentos
- **Formato**: `https://calendly.com/ricardo-palomar-onsmartai/30min/`
- **Valor padrão**: `https://calendly.com/ricardo-palomar-onsmartai/30min/` (se não configurado)
- **Onde configurar**: Vercel → Settings → Environment Variables
- **Ambientes**: Production, Preview, Development (todos)

### 6. **OPENAI_MODEL** (Opcional)
- **Descrição**: Modelo da OpenAI a ser usado
- **Formato**: `gpt-4o-mini`, `gpt-4`, `gpt-3.5-turbo`, etc.
- **Valor padrão**: `gpt-4o-mini` (se não configurado)
- **Onde configurar**: Vercel → Settings → Environment Variables
- **Ambientes**: Production, Preview, Development (todos)

### 7. **OPENAI_TEMPERATURE** (Opcional)
- **Descrição**: Temperatura do modelo (criatividade)
- **Formato**: Número entre 0 e 2 (ex: `0.7`)
- **Valor padrão**: `0.7` (se não configurado)
- **Onde configurar**: Vercel → Settings → Environment Variables
- **Ambientes**: Production, Preview, Development (todos)

---

## 🔧 Como Configurar na Vercel

### Passo a Passo:

1. **Acesse o Dashboard da Vercel**
   - Vá para: https://vercel.com/dashboard
   - Selecione seu projeto

2. **Acesse Settings → Environment Variables**
   - No menu lateral, clique em **Settings**
   - Clique em **Environment Variables**

3. **Adicione cada variável**
   - Clique em **Add New**
   - Preencha:
     - **Key**: Nome da variável (ex: `OPENAI_API_KEY`)
     - **Value**: Valor da variável
     - **Environment**: Selecione **Production**, **Preview** e **Development** (ou apenas os que precisar)

4. **Salve e faça redeploy**
   - Após adicionar todas as variáveis, clique em **Save**
   - Vá para **Deployments** e faça um novo deploy (ou aguarde o próximo push)

---

## ✅ Verificação Rápida

### Checklist de Verificação:

- [ ] `OPENAI_API_KEY` está configurada e começa com `sk-`
- [ ] `EVOLUTION_API_BASE_URL` está configurada e é acessível publicamente
- [ ] `EVOLUTION_API_APIKEY` está configurada corretamente
- [ ] `EVOLUTION_API_INSTANCE_ID` está configurada e corresponde à instância ativa
- [ ] Todas as variáveis estão configuradas para **Production** (e Preview se necessário)
- [ ] Um novo deploy foi feito após adicionar as variáveis

---

## 🐛 Problemas Comuns

### 1. "Sonia não responde via WhatsApp, mas não há erros nos logs"

**Possíveis causas:**
- ❌ Webhook não está configurado na Evolution API
- ❌ URL do webhook está incorreta
- ❌ Evolution API não consegue acessar a URL do webhook (firewall/CORS)
- ❌ Instância do WhatsApp não está conectada/ativa

**Solução:**
1. Verifique se o webhook está configurado na Evolution API:
   ```
   URL: https://onsmart.ai/api/whatsapp/webhook
   ```
   Ou:
   ```
   URL: https://onsmart-website.vercel.app/api/whatsapp/webhook
   ```

2. Teste o webhook manualmente:
   ```bash
   curl -X POST https://onsmart.ai/api/whatsapp/webhook \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

3. Verifique os logs da Evolution API no servidor:
   ```bash
   docker logs evoapicloud
   ```

### 2. "Erro: Evolution API configuration missing"

**Causa**: Uma das variáveis da Evolution API não está configurada

**Solução**: Verifique se todas estas variáveis estão configuradas:
- `EVOLUTION_API_BASE_URL`
- `EVOLUTION_API_APIKEY`
- `EVOLUTION_API_INSTANCE_ID`

### 3. "Erro: API key not configured"

**Causa**: `OPENAI_API_KEY` não está configurada

**Solução**: Adicione a variável `OPENAI_API_KEY` na Vercel

### 4. "Erro ao enviar mensagem: 401/403"

**Causa**: Chave da Evolution API incorreta ou expirada

**Solução**: Verifique se `EVOLUTION_API_APIKEY` está correta e atualizada

### 5. "Erro ao enviar mensagem: 404"

**Causa**: URL da Evolution API incorreta ou instância não existe

**Solução**: 
- Verifique se `EVOLUTION_API_BASE_URL` está correta
- Verifique se `EVOLUTION_API_INSTANCE_ID` corresponde a uma instância existente

---

## 🔍 Como Verificar se Está Funcionando

### 1. Verificar Logs na Vercel:
- Acesse: https://vercel.com/dashboard → Seu projeto → Deployments → Último deploy → Logs
- Procure por:
  - `📥 Webhook recebido` - Indica que o webhook está sendo chamado
  - `💬 Mensagem recebida de` - Indica que a mensagem foi processada
  - `✅ Mensagem enviada com sucesso` - Indica que a resposta foi enviada
  - `❌` - Indica erros

### 2. Verificar Logs da Evolution API:
```bash
# No servidor onde está rodando a Evolution API
docker logs evoapicloud -f
```

### 3. Testar o Webhook Manualmente:
```bash
curl -X POST https://onsmart.ai/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "MESSAGES_UPSERT",
    "data": [{
      "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": false
      },
      "message": {
        "conversation": "teste"
      }
    }]
  }'
```

---

## 📝 Exemplo de Configuração Completa

```
OPENAI_API_KEY=<OPENAI_API_KEY_REMOVED>
EVOLUTION_API_BASE_URL=https://evoapi.onsmart.ai
EVOLUTION_API_APIKEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
EVOLUTION_API_INSTANCE_ID=sonia-whatsapp-v3
CALENDLY_URL=https://calendly.com/ricardo-palomar-onsmartai/30min/
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7
```

---

## ⚠️ IMPORTANTE

1. **Nunca commite variáveis de ambiente no Git** - Elas devem estar apenas na Vercel
2. **Faça redeploy após adicionar/modificar variáveis** - As variáveis só são carregadas no deploy
3. **Verifique se o webhook está configurado na Evolution API** - Sem isso, a Sonia não receberá mensagens
4. **Teste em ambiente de Preview antes de Production** - Use Preview para validar mudanças

