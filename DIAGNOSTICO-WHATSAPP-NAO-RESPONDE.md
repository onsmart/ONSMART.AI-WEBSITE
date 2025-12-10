# Diagnóstico: Sonia não responde via WhatsApp

Guia para diagnosticar por que a Sonia parou de responder mensagens via WhatsApp.

## Checklist de Diagnóstico

### 1. Verificar se o Cloudflare Tunnel está rodando

```bash
sudo systemctl status cloudflared
```

**Se não estiver rodando:**
```bash
sudo systemctl start cloudflared
sudo systemctl status cloudflared
```

**Ver logs do túnel:**
```bash
sudo journalctl -u cloudflared -n 50
```

### 2. Verificar se a Evolution API está rodando

```bash
docker ps | grep evolution
```

**Se não estiver rodando:**
```bash
cd ~/evolution-api
docker compose up -d
```

**Ver logs da Evolution API:**
```bash
docker logs evolution-api --tail 50
```

### 3. Verificar se o webhook está configurado na Evolution API

No servidor, execute:

```bash
EVOLUTION_URL="https://evolution.onsmart.ai"
EVOLUTION_API_KEY="sua-chave-api"
INSTANCE_NAME="sonia-whatsapp-v3"

# Verificar webhook atual
curl -X GET "$EVOLUTION_URL/webhook/find/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY"
```

**Se o webhook não estiver configurado ou estiver incorreto, atualize:**

```bash
WEBHOOK_URL="https://onsmart.ai/api/whatsapp/webhook"

curl -X POST "$EVOLUTION_URL/webhook/set/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook": {
      "url": "'"$WEBHOOK_URL"'",
      "enabled": true,
      "webhook_by_events": true,
      "webhook_base64": false,
      "events": ["MESSAGES_UPSERT"]
    }
  }'
```

### 4. Testar se o webhook está acessível

```bash
# Testar se a URL do webhook responde
curl -X POST https://onsmart.ai/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Se retornar erro 404 ou não acessível:**
- Verificar se o deploy na Vercel está ativo
- Verificar logs da Vercel para erros

### 5. Verificar logs da Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto `onsmart-website`
3. Vá em: **Deployments** > clique no último deploy
4. Vá em: **Functions** > `api/whatsapp/webhook`
5. Verifique se há erros recentes

### 6. Verificar variáveis de ambiente na Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto
3. Vá em: **Settings** > **Environment Variables**
4. Verifique se estão configuradas:
   - `EVOLUTION_API_BASE_URL` = `https://evolution.onsmart.ai`
   - `EVOLUTION_API_APIKEY` = (sua chave)
   - `EVOLUTION_API_INSTANCE_ID` = `sonia-whatsapp-v3`
   - `OPENAI_API_KEY` = (sua chave OpenAI)

### 7. Testar conexão com Evolution API

```bash
EVOLUTION_URL="https://evolution.onsmart.ai"
EVOLUTION_API_KEY="sua-chave-api"
INSTANCE_NAME="sonia-whatsapp-v3"

# Testar se a API está acessível
curl -X GET "$EVOLUTION_URL/instance/fetchInstances" \
  -H "apikey: $EVOLUTION_API_KEY"
```

### 8. Verificar status da instância do WhatsApp

```bash
EVOLUTION_URL="https://evolution.onsmart.ai"
EVOLUTION_API_KEY="sua-chave-api"
INSTANCE_NAME="sonia-whatsapp-v3"

# Verificar status da instância
curl -X GET "$EVOLUTION_URL/instance/fetchInstance/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY"
```

**Verificar se o status está como "open" ou "connected"**

### 9. Testar envio manual de mensagem

```bash
EVOLUTION_URL="https://evolution.onsmart.ai"
EVOLUTION_API_KEY="sua-chave-api"
INSTANCE_NAME="sonia-whatsapp-v3"
TEST_NUMBER="5511999999999"  # Substitua pelo número de teste

# Enviar mensagem de teste
curl -X POST "$EVOLUTION_URL/message/sendText/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "'"$TEST_NUMBER"'",
    "text": "Teste de mensagem"
  }'
```

### 10. Verificar logs em tempo real

**No servidor, monitore os logs do túnel:**
```bash
sudo journalctl -u cloudflared -f
```

**Monitore logs da Evolution API:**
```bash
docker logs evolution-api -f
```

**Envie uma mensagem de teste e veja se:**
- O túnel recebe a requisição
- A Evolution API processa a mensagem
- O webhook é chamado

## Problemas Comuns e Soluções

### Problema: Webhook não está sendo chamado

**Sintomas:** Mensagens chegam no WhatsApp mas não geram logs no webhook.

**Soluções:**
1. Verificar se o webhook está configurado corretamente (passo 3)
2. Verificar se a URL do webhook está acessível (passo 4)
3. Verificar se o evento `MESSAGES_UPSERT` está habilitado no webhook

### Problema: Webhook retorna erro 404

**Sintomas:** Logs mostram erro 404 ao chamar o webhook.

**Soluções:**
1. Verificar se o deploy na Vercel está ativo
2. Verificar se a rota `/api/whatsapp/webhook` existe
3. Fazer um novo deploy na Vercel

### Problema: Evolution API não está acessível

**Sintomas:** Erro ao tentar acessar `https://evolution.onsmart.ai`

**Soluções:**
1. Verificar se o túnel está rodando (passo 1)
2. Verificar se o DNS está configurado corretamente
3. Testar: `curl https://evolution.onsmart.ai/health`

### Problema: Instância do WhatsApp desconectada

**Sintomas:** Status da instância não está como "open" ou "connected"

**Soluções:**
1. Reconectar a instância:
```bash
curl -X GET "$EVOLUTION_URL/instance/connect/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY"
```
2. Verificar QR Code se necessário
3. Verificar logs da Evolution API para erros de conexão

### Problema: Variáveis de ambiente não configuradas

**Sintomas:** Erros nos logs sobre variáveis de ambiente faltando

**Soluções:**
1. Verificar variáveis na Vercel (passo 6)
2. Fazer um novo deploy após configurar variáveis
3. Verificar se as variáveis estão configuradas para o ambiente correto (Production, Preview, Development)

## Comandos Rápidos de Diagnóstico

```bash
# Script completo de diagnóstico
EVOLUTION_URL="https://evolution.onsmart.ai"
EVOLUTION_API_KEY="sua-chave-api"
INSTANCE_NAME="sonia-whatsapp-v3"

echo "1. Verificando túnel..."
sudo systemctl status cloudflared --no-pager | head -5

echo "2. Verificando Evolution API..."
docker ps | grep evolution

echo "3. Verificando webhook..."
curl -s -X GET "$EVOLUTION_URL/webhook/find/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY" | jq .

echo "4. Verificando status da instância..."
curl -s -X GET "$EVOLUTION_URL/instance/fetchInstance/$INSTANCE_NAME" \
  -H "apikey: $EVOLUTION_API_KEY" | jq .instance.status

echo "5. Testando webhook..."
curl -s -X POST https://onsmart.ai/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

## Próximos Passos

Após executar o diagnóstico:

1. **Se o túnel não estiver rodando:** Inicie o serviço (passo 1)
2. **Se o webhook não estiver configurado:** Configure o webhook (passo 3)
3. **Se houver erros na Vercel:** Verifique logs e faça um novo deploy
4. **Se a instância estiver desconectada:** Reconecte a instância (passo 8)

Se o problema persistir após seguir todos os passos, compartilhe:
- Resultado dos comandos de diagnóstico
- Logs do túnel (últimas 50 linhas)
- Logs da Evolution API (últimas 50 linhas)
- Logs da Vercel (últimas requisições ao webhook)








