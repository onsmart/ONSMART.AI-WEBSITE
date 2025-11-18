# 🚀 Guia Completo - Deploy e Teste da Evolution API no Vercel

Este guia explica como configurar e testar a integração da Sonia com WhatsApp **apenas em produção (Vercel)**, mantendo as variáveis sensíveis seguras no backend.

## 📋 Pré-requisitos

1. ✅ Código já implementado (webhook, serviços, etc)
2. ✅ Conta no Vercel
3. ✅ Evolution API rodando no Docker do servidor
4. ✅ URL pública para acessar a Evolution API (não pode ser IP local)

## ⚠️ IMPORTANTE: URL Pública Necessária

O Vercel **NÃO consegue acessar IPs locais** (192.168.x.x). Você precisa de uma URL pública para a Evolution API.

### Opções:

1. **Usar ngrok** (para testes rápidos):
   ```bash
   ngrok http 8080
   ```
   Use a URL gerada (ex: `https://abc123.ngrok.io`)

2. **Configurar domínio** apontando para o servidor
3. **Usar um serviço de hospedagem** com IP público

## 🔧 Passo 1: Configurar Variáveis no Vercel

### 1.1 Acesse o Painel do Vercel

1. Vá para: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**

### 1.2 Adicione as Variáveis

Adicione as seguintes variáveis (uma por uma):

#### Variáveis do Backend (Serverless Functions):

| Nome | Valor | Ambiente |
|------|-------|----------|
| `EVOLUTION_API_URL` | `https://sua-url-publica.com` ou `https://abc123.ngrok.io` | **Production, Preview, Development** |
| `EVOLUTION_API_KEY` | `sua-api-key-da-evolution` | **Production, Preview, Development** |
| `EVOLUTION_INSTANCE_NAME` | `sonia-whatsapp` | **Production, Preview, Development** |
| `OPENAI_API_KEY` | `sk-...` (sua chave OpenAI) | **Production, Preview, Development** |
| `OPENAI_MODEL` | `gpt-4o-mini` | **Production, Preview, Development** |
| `OPENAI_TEMPERATURE` | `0.7` | **Production, Preview, Development** |

#### Variáveis do Frontend:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `VITE_EVOLUTION_API_URL` | `https://sua-url-publica.com` | **Production, Preview, Development** |
| `VITE_EVOLUTION_INSTANCE_NAME` | `sonia-whatsapp` | **Production, Preview, Development** |
| `VITE_SONIA_PHONE` | `551150931836` | **Production, Preview, Development** |
| `VITE_ADMIN_PASSWORD` | `sua-senha-segura` | **Production, Preview, Development** |

**⚠️ IMPORTANTE:**
- `VITE_ADMIN_PASSWORD` é **OBRIGATÓRIA** para proteger a página `/admin`
- Use uma senha forte e única
- Não compartilhe esta senha publicamente

**⚠️ IMPORTANTE:**
- `EVOLUTION_API_KEY` e `OPENAI_API_KEY` são **SENSÍVEIS** - nunca as coloque no frontend
- Use apenas variáveis `VITE_*` para o frontend (e apenas URLs, nunca keys)

### 1.3 Verificar Variáveis

Após adicionar, você deve ver todas as variáveis listadas. Certifique-se de que:
- ✅ Todas estão marcadas para **Production**
- ✅ `EVOLUTION_API_KEY` e `OPENAI_API_KEY` **NÃO** têm prefixo `VITE_`

## 🚀 Passo 2: Fazer Deploy

### 2.1 Commit e Push

```bash
git add .
git commit -m "feat: integração Evolution API com Sonia"
git push origin main
```

### 2.2 Deploy Automático

O Vercel fará deploy automaticamente quando você fizer push. Ou:

1. Vá para o painel do Vercel
2. Clique em **Deployments**
3. Clique em **Redeploy** (se necessário)

### 2.3 Aguardar Deploy

Aguarde o deploy terminar. Você verá:
- ✅ Build successful
- ✅ Deployment ready

## 🔗 Passo 3: Configurar Webhook na Evolution API

### 3.0 Descobrir Endpoints Disponíveis (IMPORTANTE)

**Antes de configurar o webhook, vamos descobrir qual endpoint sua versão da Evolution API usa:**

1. **Verificar versão e rotas disponíveis:**
   ```bash
   # Tentar acessar a documentação Swagger (se disponível)
   curl -X GET "http://192.168.15.31:8080/api-docs" \
     -H "apikey: SUA-API-KEY"
   
   # Ou verificar informações da API
   curl -X GET "http://192.168.15.31:8080/info" \
     -H "apikey: SUA-API-KEY"
   ```

2. **Listar instâncias existentes (para confirmar o nome):**
   ```bash
   curl -X GET "http://192.168.15.31:8080/instance/fetchInstances" \
     -H "apikey: SUA-API-KEY"
   ```
   Isso mostrará todas as instâncias e seus nomes. Confirme que `sonia-whatsapp` existe.

3. **Testar diferentes endpoints de webhook:**
   Tente cada um dos métodos abaixo até encontrar o que funciona.

### 3.1 Obter URL do Webhook

A URL do webhook para o projeto **onsmart-website** é:
```
https://onsmart-website.vercel.app/api/evolution-webhook
```

**Nota:** Se você tiver um domínio customizado configurado no Vercel, pode usar esse domínio também. A URL padrão do Vercel sempre funciona.

### 3.2 Configurar na Evolution API

**⚠️ IMPORTANTE:** O nome da instância é `sonia-whatsapp` (não `sonia`). Use este nome em todos os comandos.

**Método 1: Endpoint `/instance/{instanceName}/webhook/set` (PUT) - Mais Comum**

Este é o endpoint mais comum em versões recentes da Evolution API:

```bash
curl -X PUT "http://192.168.15.31:8080/instance/sonia-whatsapp/webhook/set" \
  -H "apikey: SUA-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://onsmart-website.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "CONNECTION_UPDATE"
    ]
  }'
```

**Método 2: Endpoint `/webhook/set/{instanceName}` (PUT)**

```bash
curl -X PUT "http://192.168.15.31:8080/webhook/set/sonia-whatsapp" \
  -H "apikey: SUA-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://onsmart-website.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "CONNECTION_UPDATE"
    ]
  }'
```

**Método 3: Endpoint `/webhook/instance` (POST) - Com instanceName no body**

```bash
curl -X POST "http://192.168.15.31:8080/webhook/instance" \
  -H "apikey: SUA-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "sonia-whatsapp",
    "url": "https://onsmart-website.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "CONNECTION_UPDATE"
    ]
  }'
```

**Método 4: Endpoint `/instance/webhook/set/{instanceName}` (PUT)**

```bash
curl -X PUT "http://192.168.15.31:8080/instance/webhook/set/sonia-whatsapp" \
  -H "apikey: SUA-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://onsmart-website.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "CONNECTION_UPDATE"
    ]
  }'
```

**Substitua apenas:**
- `SUA-API-KEY` → pela sua API key da Evolution API (a mesma que está configurada no Vercel)
- `192.168.15.31:8080` → pela URL/IP da sua Evolution API (ou use a URL pública se tiver ngrok/domínio)

**Exemplo completo com Método 1 (substitua `SUA-API-KEY` pela sua chave real):**
```bash
curl -X PUT "http://192.168.15.31:8080/instance/sonia-whatsapp/webhook/set" \
  -H "apikey: SUA-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://onsmart-website.vercel.app/api/evolution-webhook",
    "webhook_by_events": true,
    "webhook_base64": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "CONNECTION_UPDATE"
    ]
  }'
```

**⚠️ Se nenhum método funcionar:**
1. Verifique se a instância `sonia-whatsapp` existe:
   ```bash
   curl -X GET "http://192.168.15.31:8080/instance/fetchInstances" \
     -H "apikey: SUA-API-KEY"
   ```

2. Verifique a documentação da sua versão: https://doc.evolution-api.com
3. Verifique os logs do Docker da Evolution API para ver quais rotas estão disponíveis
4. Considere atualizar a Evolution API para a versão mais recente

### 3.3 Verificar Webhook Configurado

Execute um destes comandos para verificar se o webhook foi configurado corretamente:

**Método 1 (mais comum):**
```bash
curl -X GET "http://192.168.15.31:8080/instance/sonia-whatsapp/webhook/find" \
  -H "apikey: SUA-API-KEY"
```

**Método 2 (alternativa):**
```bash
curl -X GET "http://192.168.15.31:8080/webhook/find/sonia-whatsapp" \
  -H "apikey: SUA-API-KEY"
```

**Substitua:**
- `SUA-API-KEY` → pela sua API key da Evolution API
- `192.168.15.31:8080` → pela URL/IP da sua Evolution API

**Resposta esperada:**
Deve retornar um JSON com a configuração do webhook, incluindo a URL `https://onsmart-website.vercel.app/api/evolution-webhook`.

**Teste direto do webhook:**
Você também pode testar se o webhook está acessível diretamente:
```bash
curl -X GET "https://onsmart-website.vercel.app/api/evolution-webhook"
```

Deve retornar: `{"status":"ok"}`

## ✅ Passo 4: Testar a Integração

### 4.1 Verificar Status da Instância

**⚠️ IMPORTANTE:** A página `/admin` atualmente **NÃO tem autenticação** e está acessível publicamente. Use apenas para monitoramento, não para configuração sensível.

**Método Recomendado - Via Terminal (Mais Confiável):**

Verifique o status diretamente na Evolution API:

```bash
curl -X GET "http://192.168.15.31:8080/instance/fetchInstances" \
  -H "apikey: SUA-API-KEY"
```

Procure por `sonia-whatsapp` na resposta e verifique o campo `status`:
- `"status": "open"` → ✅ Conectado
- `"status": "close"` → ❌ Desconectado (precisa escanear QR Code)
- `"status": "qrcode"` → ⏳ Aguardando QR Code

**Método Alternativo - Interface Admin (Apenas Visualização):**

1. Acesse: `https://onsmart-website.vercel.app/admin`
2. Vá na aba **WhatsApp**
3. Verifique o status exibido

**Nota:** A interface admin pode não funcionar corretamente se:
- As variáveis de ambiente não estiverem configuradas no Vercel
- A URL da Evolution API for um IP local (o Vercel não acessa IPs locais)
- A API key não estiver configurada corretamente

### 4.2 Enviar Mensagem de Teste

1. Abra o WhatsApp no seu celular
2. Envie uma mensagem para: **55 11 5093-1836**
3. Mensagem: "Olá, Sonia!"

### 4.3 Verificar Resposta

A Sonia deve responder automaticamente em alguns segundos.

### 4.4 Verificar Logs

1. Vá para o Vercel Dashboard
2. Clique em **Deployments**
3. Clique no deployment mais recente
4. Vá em **Functions** → **evolution-webhook**
5. Veja os logs em tempo real

## 🔍 Passo 5: Troubleshooting

### Problema: Erro 404 ao configurar webhook ("Cannot PUT /webhook/set/sonia-whatsapp")

**Solução:**
O endpoint pode variar conforme a versão da Evolution API. Siga estes passos:

1. **Primeiro, confirme que a instância existe:**
   ```bash
   curl -X GET "http://192.168.15.31:8080/instance/fetchInstances" \
     -H "apikey: SUA-API-KEY"
   ```
   Verifique se `sonia-whatsapp` aparece na lista.

2. **Tente o Método 1 (mais comum em versões recentes):**
   ```bash
   curl -X PUT "http://192.168.15.31:8080/instance/sonia-whatsapp/webhook/set" \
     -H "apikey: SUA-API-KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "url": "https://onsmart-website.vercel.app/api/evolution-webhook",
       "webhook_by_events": true,
       "webhook_base64": false,
       "events": ["MESSAGES_UPSERT", "MESSAGES_UPDATE", "CONNECTION_UPDATE"]
     }'
   ```

3. **Se não funcionar, tente os outros métodos da seção 3.2**

4. **Verificar versão da Evolution API:**
   - Acesse os logs do Docker: `docker logs [nome-do-container]`
   - Ou tente: `curl -X GET "http://192.168.15.31:8080/info" -H "apikey: SUA-API-KEY"`

5. **Verificar documentação da sua versão:**
   - Acesse: https://doc.evolution-api.com
   - Procure pela seção de Webhooks da sua versão específica

### Problema: Webhook não recebe mensagens

**Solução:**
1. Verifique se a URL do webhook está correta: `https://onsmart-website.vercel.app/api/evolution-webhook`
2. Verifique se o webhook está configurado na Evolution API (use o comando da seção 3.3)
3. Verifique os logs do Vercel (Deployments → Functions → evolution-webhook)
4. Teste o webhook manualmente:
   ```bash
   curl -X GET "https://onsmart-website.vercel.app/api/evolution-webhook"
   ```
   Deve retornar: `{"status":"ok"}`

### Problema: "Evolution API não configurada"

**Solução:**
1. Verifique se `EVOLUTION_API_URL` está configurada no Vercel
2. Verifique se `EVOLUTION_API_KEY` está configurada no Vercel
3. Faça um novo deploy após adicionar as variáveis

### Problema: "OpenAI API error"

**Solução:**
1. Verifique se `OPENAI_API_KEY` está configurada no Vercel
2. Verifique se a chave está correta
3. Verifique se tem créditos na conta OpenAI

### Problema: Sonia não responde

**Solução:**
1. Verifique os logs do webhook no Vercel
2. Verifique se a instância está conectada (status: "open")
3. Verifique se o webhook está recebendo as mensagens
4. Teste enviando uma mensagem e veja os logs em tempo real

### Problema: Status aparece como "close" (Desconectado)

**O que significa:**
- Status "close" = A instância existe mas não está conectada ao WhatsApp
- Você precisa escanear o QR Code para conectar

**⚠️ IMPORTANTE:** A conexão do WhatsApp **DEVE ser feita diretamente na Evolution API via comandos curl**, não pela interface admin. A interface admin é apenas para visualização/monitoramento.

**Solução passo a passo (via Terminal - Método Correto):**

1. **Verificar se a instância existe:**
   ```bash
   curl -X GET "http://192.168.15.31:8080/instance/fetchInstances" \
     -H "apikey: SUA-API-KEY"
   ```
   Procure por `sonia-whatsapp` na resposta.

2. **Se a instância NÃO existe, crie ela:**
   ```bash
   curl -X POST "http://192.168.15.31:8080/instance/create" \
     -H "apikey: SUA-API-KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "instanceName": "sonia-whatsapp",
       "qrcode": true,
       "integration": "WHATSAPP-BAILEYS"
     }'
   ```

3. **Obter o QR Code para conectar:**
   ```bash
   curl -X GET "http://192.168.15.31:8080/instance/connect/sonia-whatsapp" \
     -H "apikey: SUA-API-KEY"
   ```
   
   A resposta conterá o QR Code em base64. Para visualizar:
   
   **Opção A - Converter base64 para imagem:**
   - Copie o valor do campo `base64` da resposta
   - Use um conversor online (ex: https://base64.guru/converter/decode/image)
   - Ou salve em um arquivo HTML e abra no navegador:
     ```html
     <img src="data:image/png;base64,COLE_O_BASE64_AQUI" />
     ```
   
   **Opção B - Usar script Python (se tiver Python instalado):**
   ```python
   import base64
   import json
   
   # Cole a resposta do curl aqui
   response = '{"qrcode": {"base64": "..."}}'
   data = json.loads(response)
   base64_data = data['qrcode']['base64']
   
   # Salvar imagem
   with open('qrcode.png', 'wb') as f:
       f.write(base64.b64decode(base64_data))
   print("QR Code salvo em qrcode.png")
   ```

4. **Escanear o QR Code:**
   - Abra o WhatsApp no seu celular
   - Vá em **Menu (⋮)** → **Aparelhos conectados** → **Conectar um aparelho**
   - Escaneie o QR Code que você gerou
   - Aguarde alguns segundos

5. **Verificar se conectou:**
   ```bash
   curl -X GET "http://192.168.15.31:8080/instance/fetchInstances" \
     -H "apikey: SUA-API-KEY"
   ```
   O status deve mudar para `"open"` quando conectado.

6. **Se ainda estiver "close" após escanear:**
   - Tente reiniciar a instância:
     ```bash
     curl -X PUT "http://192.168.15.31:8080/instance/restart/sonia-whatsapp" \
       -H "apikey: SUA-API-KEY"
     ```
   - Aguarde alguns segundos e obtenha um novo QR Code
   - Escaneie novamente

**Por que a interface Admin não funciona para conectar?**
- A interface admin depende das variáveis de ambiente do Vercel
- Se a `EVOLUTION_API_URL` for um IP local, o Vercel não consegue acessar
- A conexão deve ser feita diretamente no servidor onde está a Evolution API

**Status possíveis:**
- `"open"` → ✅ Conectado e funcionando
- `"qrcode"` → ⏳ Aguardando escanear QR Code
- `"close"` → ❌ Desconectado (precisa escanear QR Code)
- `"connecting"` → 🔄 Conectando (aguarde alguns segundos)

### Problema: "Connection refused" ou "Network error"

**Solução:**
- O Vercel não consegue acessar IPs locais
- Você **DEVE** usar uma URL pública para `EVOLUTION_API_URL`
- Use ngrok ou configure um domínio público

## 📝 Checklist Final

Antes de testar, verifique:

- [ ] Variáveis configuradas no Vercel
- [ ] Deploy realizado com sucesso
- [ ] URL pública para Evolution API (não IP local)
- [ ] Webhook configurado na Evolution API
- [ ] Instância do WhatsApp conectada (status: "open")
- [ ] OpenAI API Key configurada e válida

## 🎯 Fluxo Completo

```
1. Usuário envia mensagem → WhatsApp
2. WhatsApp → Evolution API (Docker servidor)
3. Evolution API → Webhook Vercel (https://onsmart-website.vercel.app/api/evolution-webhook)
4. Webhook Vercel → Processa com Sonia (OpenAI)
5. Sonia gera resposta → Webhook Vercel
6. Webhook Vercel → Evolution API
7. Evolution API → Envia resposta → WhatsApp
8. Usuário recebe resposta da Sonia
```

## 🔐 Segurança

### ✅ Autenticação da Página Admin

A página `/admin` agora possui **autenticação por senha**. Para acessar:

1. **Configure a senha no Vercel:**
   - Vá em **Settings** → **Environment Variables**
   - Adicione a variável: `VITE_ADMIN_PASSWORD` com o valor da sua senha
   - Marque para **Production, Preview, Development**

2. **Acesse a página admin:**
   - Vá para: `https://onsmart-website.vercel.app/admin`
   - Digite a senha configurada
   - A sessão dura 8 horas

3. **Segurança:**
   - A senha é comparada no frontend (para produção, considere usar uma API route)
   - A sessão expira após 8 horas de inatividade
   - Use uma senha forte e única
   - Não compartilhe a senha publicamente

**Nota:** Para maior segurança em produção, considere:
- Implementar autenticação via API route (backend)
- Usar hash de senha (bcrypt)
- Adicionar rate limiting
- Implementar 2FA (autenticação de dois fatores)

### Boas Práticas

✅ **Correto:**
- Variáveis sensíveis (`EVOLUTION_API_KEY`, `OPENAI_API_KEY`) apenas no backend
- URLs públicas para comunicação
- Webhook protegido (apenas Evolution API pode chamar)
- Configurações críticas via terminal/comandos diretos na Evolution API

❌ **Nunca faça:**
- Expor API keys no frontend
- Usar IPs locais em produção
- Commitar variáveis sensíveis no código
- Deixar páginas admin sem autenticação em produção

## 📞 Próximos Passos

Após tudo funcionando:

1. ✅ Teste com várias mensagens
2. ✅ Ajuste o prompt da Sonia se necessário
3. ✅ Configure filtros (ignorar grupos, etc)
4. ✅ Monitore os logs regularmente

---

**Dúvidas?** Verifique os logs do Vercel ou entre em contato com o suporte.


