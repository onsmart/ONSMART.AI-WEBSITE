# Corrigir Erros da Sonia no WhatsApp

**Problemas identificados:**
1. ❌ Sonia retorna "problemas técnicos" (erro na API OpenAI)
2. ❌ Detecção de idioma não funciona corretamente

---

## ✅ Correções Aplicadas

### 1. Detecção de Idioma Melhorada
- ✅ Adicionada detecção por padrões de acentos
- ✅ Mais palavras-chave em cada idioma
- ✅ Lógica de decisão mais robusta

### 2. Logs Melhorados
- ✅ Logs detalhados para debug
- ✅ Log do idioma detectado
- ✅ Log da URL usada para chamar OpenAI

---

## 🔧 Verificar Configuração na Vercel

**O erro "problemas técnicos" geralmente significa que a variável `OPENAI_API_KEY` não está configurada.**

### Passo 1: Verificar Variáveis de Ambiente

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables

2. Verifique se existe:
   ```
   OPENAI_API_KEY=sk-...
   ```

3. Se não existir, adicione:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** Sua chave da OpenAI (começa com `sk-`)
   - **Environment:** Production, Preview, Development (marque todos)

4. **Após adicionar, faça um novo deploy:**
   - Vá em Deployments
   - Clique nos 3 pontos do último deployment
   - Clique em "Redeploy"

---

## 🧪 Testar Novamente

### 1. Fazer Deploy das Correções

```bash
# Adicionar mudanças
git add api/whatsapp/webhook.js api/services/soniaBrain.js

# Commit
git commit -m "fix: melhorar detecção de idioma e adicionar logs de debug"

# Push
git push
```

### 2. Aguardar Deploy

- Aguardar deploy automático na Vercel
- OU fazer redeploy manual

### 3. Testar Mensagens

**Teste 1 - Português:**
- Enviar: "Olá, como funciona?"
- Esperado: Resposta em português

**Teste 2 - Inglês:**
- Enviar: "Hello, how does it work?"
- Esperado: Resposta em inglês

**Teste 3 - Espanhol:**
- Enviar: "Hola, ¿cómo funciona?"
- Esperado: Resposta em espanhol

---

## 📊 Verificar Logs

**Após enviar mensagem, verificar logs da Vercel:**

1. Acesse: https://vercel.com/seu-projeto/logs
2. Procure por:
   - `🌐 Idioma detectado: pt/en/es`
   - `🔗 Chamando OpenAI proxy: ...`
   - `✅ Sonia reply generated...`
   - `❌ OpenAI API error` (se houver erro)

**O que procurar:**
- ✅ Idioma sendo detectado corretamente
- ✅ URL do proxy sendo chamada
- ❌ Erros de API key não configurada
- ❌ Erros de conexão

---

## 🔍 Troubleshooting

### Erro: "API key not configured"

**Solução:**
1. Adicionar `OPENAI_API_KEY` na Vercel
2. Fazer redeploy

### Erro: "OpenAI API error: 401"

**Solução:**
- Verificar se a chave está correta
- Verificar se a chave não expirou

### Erro: "OpenAI API error: 429"

**Solução:**
- Limite de rate limit atingido
- Aguardar alguns minutos e tentar novamente

### Idioma ainda detectando errado

**Solução:**
- Verificar logs para ver qual idioma foi detectado
- Ajustar palavras-chave na função `detectLanguage` se necessário

---

## 📝 Checklist

- [ ] `OPENAI_API_KEY` configurada na Vercel
- [ ] Deploy feito após configurar variável
- [ ] Código atualizado (detecção de idioma melhorada)
- [ ] Testado com mensagem em português
- [ ] Testado com mensagem em inglês
- [ ] Testado com mensagem em espanhol
- [ ] Logs verificados (sem erros)

---

**Última Atualização:** 25/11/2025

