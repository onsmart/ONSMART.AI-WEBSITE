# 🔍 Diagnóstico: Erro 401 no Proxy OpenAI + Instância Não Encontrada

## 📊 Resultado do Teste de Configuração

Baseado no resultado do endpoint `/api/whatsapp/test-config`, foram identificados **2 problemas críticos**:

### ❌ Problema 1: Erro 401 no Proxy OpenAI

**Status**: `❌ ERROR 401`
**URL testada**: `https://onsmart-website-7odxypl1s-on-smart-admins-projects.vercel.app/api/openai-proxy`

**Possíveis causas:**
1. **Chave da OpenAI inválida ou expirada**
   - A chave pode ter sido revogada
   - A chave pode ter expirado
   - A chave pode estar incorreta

2. **Chave com espaços ou caracteres extras**
   - Espaços no início/fim da chave
   - Quebras de linha
   - Caracteres invisíveis

3. **Chave não configurada no ambiente de Preview**
   - A chave pode estar apenas em Production
   - Preview pode ter uma chave diferente/inválida

4. **Limite de uso da OpenAI excedido**
   - Cota da API esgotada
   - Limite de requisições atingido

### ⚠️ Problema 2: Instância do WhatsApp Não Encontrada

**Status**: `⚠️ NOT FOUND`
**Instância procurada**: `sonia-whatsapp-v3`

**Possíveis causas:**
1. **Nome da instância incorreto**
   - A instância pode ter outro nome
   - Pode ser `sonia` ao invés de `sonia-whatsapp-v3`

2. **Instância não existe**
   - A instância pode ter sido deletada
   - A instância pode não ter sido criada

3. **Instância não está conectada**
   - WhatsApp desconectado
   - QR Code não escaneado

---

## 🔧 Soluções

### Solução 1: Corrigir Erro 401 no Proxy OpenAI

#### Passo 1: Verificar a Chave na Vercel
1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings → Environment Variables**
4. Procure por `OPENAI_API_KEY`
5. Verifique se:
   - ✅ Está configurada para **Production**, **Preview** e **Development**
   - ✅ Não tem espaços no início/fim
   - ✅ Começa com `sk-`
   - ✅ Tem aproximadamente 51 caracteres (para chaves antigas) ou mais (para chaves novas)

#### Passo 2: Testar a Chave Manualmente
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer SUA_CHAVE_AQUI"
```

Se retornar 401, a chave está inválida. Se retornar 200, a chave está OK.

#### Passo 3: Recriar a Chave (se necessário)
1. Acesse: https://platform.openai.com/api-keys
2. Crie uma nova chave
3. Copie a chave completa
4. Atualize na Vercel (remova a antiga e adicione a nova)
5. **IMPORTANTE**: Configure para todos os ambientes (Production, Preview, Development)
6. Faça um novo deploy

#### Passo 4: Verificar Limites da OpenAI
1. Acesse: https://platform.openai.com/usage
2. Verifique se há créditos disponíveis
3. Verifique se não há limites de rate limit

### Solução 2: Corrigir Instância Não Encontrada

#### Passo 1: Verificar Instâncias Existentes
No servidor da Evolution API, execute:
```bash
curl -X GET "https://acer-contemporary-poor-scout.trycloudflare.com/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_EVOLUTION_API"
```

Isso retornará todas as instâncias. Procure pelo nome correto.

#### Passo 2: Verificar Nome da Instância
1. Acesse o painel da Evolution API
2. Veja a lista de instâncias
3. Confirme o nome exato (pode ser `sonia`, `sonia-whatsapp`, etc.)

#### Passo 3: Atualizar Variável na Vercel
1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings → Environment Variables**
4. Procure por `EVOLUTION_API_INSTANCE_ID`
5. Atualize com o nome correto da instância
6. Faça um novo deploy

#### Passo 4: Verificar Conexão do WhatsApp
1. Acesse o painel da Evolution API
2. Verifique se a instância está conectada
3. Se não estiver, escaneie o QR Code novamente

---

## 🧪 Testes Após Correções

### Teste 1: Verificar Configuração
Acesse: `https://onsmart.ai/api/whatsapp/test-config`

Verifique se:
- ✅ `openaiProxy.status` = `✅ OK`
- ✅ `evolutionInstanceExists.status` = `✅ FOUND`

### Teste 2: Testar Webhook Manualmente
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

### Teste 3: Enviar Mensagem Real no WhatsApp
1. Envie uma mensagem para o número da Sonia
2. Verifique os logs na Vercel
3. Verifique se a resposta foi gerada corretamente

---

## 📝 Checklist de Verificação

- [ ] `OPENAI_API_KEY` está configurada corretamente na Vercel
- [ ] `OPENAI_API_KEY` está configurada para **todos os ambientes** (Production, Preview, Development)
- [ ] `OPENAI_API_KEY` não tem espaços ou caracteres extras
- [ ] `OPENAI_API_KEY` é válida (testada manualmente)
- [ ] `EVOLUTION_API_INSTANCE_ID` corresponde ao nome real da instância
- [ ] Instância do WhatsApp está conectada
- [ ] Webhook está configurado na Evolution API
- [ ] Novo deploy foi feito após corrigir as variáveis

---

## 🚨 Próximos Passos Imediatos

1. **Verificar a chave da OpenAI**:
   - Teste manualmente com curl
   - Se inválida, crie uma nova e atualize na Vercel

2. **Verificar o nome da instância**:
   - Liste todas as instâncias na Evolution API
   - Confirme o nome exato
   - Atualize `EVOLUTION_API_INSTANCE_ID` na Vercel

3. **Fazer novo deploy**:
   - Após corrigir as variáveis, faça um novo deploy
   - Teste novamente o endpoint `/api/whatsapp/test-config`

4. **Verificar logs**:
   - Após o deploy, envie uma mensagem no WhatsApp
   - Verifique os logs na Vercel para ver se o erro 401 foi resolvido

---

## 📞 Se o Problema Persistir

Se após seguir todos os passos o problema persistir:

1. **Verifique os logs detalhados**:
   - Acesse: Vercel → Deployments → Último deploy → Logs
   - Procure por `❌ [openai-proxy]` para ver detalhes do erro 401

2. **Verifique a resposta da OpenAI**:
   - Os logs agora mostram os detalhes do erro
   - Isso ajudará a identificar se é problema de chave, limite, etc.

3. **Teste a Evolution API diretamente**:
   - Verifique se consegue enviar mensagens manualmente
   - Verifique se o webhook está sendo chamado

