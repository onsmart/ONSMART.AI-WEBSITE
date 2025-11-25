# Corrigir Erro 404 no Webhook

**Problema:** Webhook retornando 404 (endpoint não encontrado)  
**Erro nos logs:** `Request failed with status code 404`  
**URL:** `https://onsmart-website.vercel.app/api/whatsapp/webhook`

---

## 🔍 Diagnóstico

O erro 404 significa que o endpoint não está acessível na Vercel. Possíveis causas:

1. **Deploy não foi feito** - O código não está na Vercel
2. **Endpoint não foi incluído no deploy** - Arquivo não foi commitado/pushado
3. **Caminho incorreto** - Estrutura de pastas diferente

---

## ✅ Solução: Fazer Deploy na Vercel

### Passo 1: Verificar se o arquivo está no repositório

```bash
# Verificar se o arquivo existe
ls -la api/whatsapp/webhook.js

# Verificar se está no git
git status api/whatsapp/webhook.js
```

### Passo 2: Adicionar e commitar (se necessário)

```bash
# Adicionar arquivos
git add api/whatsapp/webhook.js
git add api/services/soniaBrain.js
git add api/services/evolutionApi.js
git add vercel.json

# Fazer commit
git commit -m "feat: adicionar webhook WhatsApp e integração Sonia"

# Fazer push
git push
```

### Passo 3: Verificar Deploy na Vercel

1. **Acesse o painel da Vercel:**
   - https://vercel.com/seu-projeto/deployments

2. **Verifique se há um deploy recente:**
   - Se não houver, faça um novo deploy
   - OU aguarde o deploy automático após o push

3. **OU fazer deploy manual via CLI:**
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer deploy
vercel --prod
```

### Passo 4: Testar Endpoint Manualmente

**Após o deploy, teste se o endpoint está acessível:**

```bash
# Testar endpoint
curl -X POST https://onsmart-website.vercel.app/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Resultado esperado:**
- ✅ **200/400/405** = Endpoint existe (mesmo que erro, significa que está acessível)
- ❌ **404** = Endpoint não existe (precisa fazer deploy)

---

## 🔧 Alternativa: Verificar Estrutura do Projeto

**Se o projeto usa App Router (Next.js 13+), o endpoint deve estar em:**

```
src/app/api/whatsapp/webhook/route.ts
```

**Se usa Pages Router (Next.js 12 ou anterior), o endpoint deve estar em:**

```
api/whatsapp/webhook.js  ✅ (atual)
```

**Verificar qual estrutura está sendo usada:**

```bash
# Verificar se existe src/app
ls -la src/app 2>/dev/null || echo "Não usa App Router"

# Verificar se existe pages
ls -la pages 2>/dev/null || echo "Não usa Pages Router"
```

---

## 📝 Checklist de Verificação

- [ ] Arquivo `api/whatsapp/webhook.js` existe localmente
- [ ] Arquivo foi commitado no git
- [ ] Push foi feito para o repositório
- [ ] Deploy foi feito na Vercel (verificar deployments)
- [ ] Endpoint está acessível (testar com curl)
- [ ] Variáveis de ambiente estão configuradas na Vercel

---

## 🚀 Comandos Rápidos

**Se precisar fazer tudo de uma vez:**

```bash
# 1. Verificar status
git status

# 2. Adicionar tudo
git add .

# 3. Commit
git commit -m "feat: configurar webhook WhatsApp"

# 4. Push
git push

# 5. Aguardar deploy automático OU fazer deploy manual
vercel --prod
```

---

## ✅ Após Deploy

**Testar novamente:**

1. Enviar mensagem do celular
2. Verificar logs da Vercel: https://vercel.com/seu-projeto/logs
3. Verificar se o endpoint foi chamado
4. Verificar se a resposta foi enviada

---

**Última Atualização:** 25/11/2025

