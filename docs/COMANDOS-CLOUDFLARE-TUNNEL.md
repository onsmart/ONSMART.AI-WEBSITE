# Comandos Úteis - Cloudflare Tunnel

Guia rápido de comandos para gerenciar o túnel permanente do Cloudflare no servidor Linux.

## 📋 Informações do Túnel

- **Nome do túnel:** `evolution-api-onsmart`
- **Tunnel ID:** `d3641f5e-5053-4a57-ba7e-bc3833b55f00`
- **URL:** `https://evolution.onsmart.ai`
- **Arquivo de config:** `~/.cloudflared/config.yml`
- **Serviço systemd:** `cloudflared.service`

---

## 🔍 Verificar Status

### Status do Serviço

```bash
sudo systemctl status cloudflared
```

### Verificar se está rodando

```bash
sudo systemctl is-active cloudflared
```

### Verificar se inicia automaticamente

```bash
sudo systemctl is-enabled cloudflared
```

### Listar túneis

```bash
cloudflared tunnel list
```

### Informações do túnel

```bash
cloudflared tunnel info evolution-api-onsmart
```

---

## 📊 Ver Logs

### Logs em tempo real

```bash
sudo journalctl -u cloudflared -f
```

### Últimas 50 linhas de log

```bash
sudo journalctl -u cloudflared -n 50
```

### Logs desde hoje

```bash
sudo journalctl -u cloudflared --since today
```

### Logs com filtro (apenas erros)

```bash
sudo journalctl -u cloudflared -p err
```

### Logs de um período específico

```bash
sudo journalctl -u cloudflared --since "2025-11-27 10:00:00" --until "2025-11-27 12:00:00"
```

---

## 🚀 Gerenciar Serviço

### Iniciar serviço

```bash
sudo systemctl start cloudflared
```

### Parar serviço

```bash
sudo systemctl stop cloudflared
```

### Reiniciar serviço

```bash
sudo systemctl restart cloudflared
```

### Recarregar configuração (após mudar config.yml)

```bash
sudo systemctl daemon-reload
sudo systemctl restart cloudflared
```

### Habilitar inicialização automática

```bash
sudo systemctl enable cloudflared
```

### Desabilitar inicialização automática

```bash
sudo systemctl disable cloudflared
```

---

## 🧪 Testar Conectividade

### Teste básico (health check)

```bash
curl https://evolution.onsmart.ai/health
```

### Teste Evolution API (listar instâncias)

```bash
curl -X GET "https://evolution.onsmart.ai/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API"
```

### Teste com verbose (ver detalhes)

```bash
curl -v https://evolution.onsmart.ai/health
```

### Teste local (Evolution API no servidor)

```bash
curl http://localhost:8080
```

---

## 🔧 Gerenciar Túnel

### Rodar túnel manualmente (para testes)

```bash
cloudflared tunnel run evolution-api-onsmart
```

**Nota:** Pressione `Ctrl+C` para parar. Use apenas para testes, pois o serviço systemd já gerencia isso.

### Verificar arquivo de configuração

```bash
cat ~/.cloudflared/config.yml
```

### Editar arquivo de configuração

```bash
nano ~/.cloudflared/config.yml
```

Após editar, recarregue o serviço:
```bash
sudo systemctl daemon-reload
sudo systemctl restart cloudflared
```

### Verificar arquivo de credenciais

```bash
ls -la ~/.cloudflared/*.json
```

---

## 🔄 Atualizar Webhook

### Atualizar webhook da Evolution API

```bash
EVOLUTION_URL="https://evolution.onsmart.ai"
EVOLUTION_API_KEY="sua-chave-api"
INSTANCE_NAME="sonia-whatsapp-v3"
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

---

## 🐛 Troubleshooting

### Verificar se Evolution API está rodando

```bash
docker ps | grep evolution
# ou
curl http://localhost:8080
```

### Verificar porta no config.yml

```bash
grep "service:" ~/.cloudflared/config.yml
```

### Verificar DNS (resolução do domínio)

```bash
dig evolution.onsmart.ai
# ou
nslookup evolution.onsmart.ai
```

### Limpar cache do DNS local

```bash
sudo systemd-resolve --flush-caches
```

### Verificar conexões do túnel

```bash
sudo journalctl -u cloudflared -n 100 | grep "Registered tunnel connection"
```

### Verificar erros recentes

```bash
sudo journalctl -u cloudflared -n 100 | grep -i error
```

---

## 📝 Atualizar Cloudflared

### Verificar versão atual

```bash
cloudflared --version
```

### Atualizar cloudflared

```bash
sudo cloudflared update
```

**Nota:** Se instalado via package manager, use o gerenciador de pacotes para atualizar.

---

## 🔐 Verificar Autenticação

### Verificar certificado de autenticação

```bash
ls -la ~/.cloudflared/cert.pem
```

### Verificar arquivo de credenciais do túnel

```bash
ls -la ~/.cloudflared/d3641f5e-5053-4a57-ba7e-bc3833b55f00.json
```

---

## 📋 Checklist de Diagnóstico

Se o túnel não estiver funcionando, verifique nesta ordem:

```bash
# 1. Serviço está rodando?
sudo systemctl status cloudflared

# 2. Evolution API está rodando?
curl http://localhost:8080

# 3. Config.yml está correto?
cat ~/.cloudflared/config.yml

# 4. DNS está resolvendo?
dig evolution.onsmart.ai

# 5. Há erros nos logs?
sudo journalctl -u cloudflared -n 50 | grep -i error

# 6. Túnel está conectado?
sudo journalctl -u cloudflared -n 50 | grep "Registered tunnel connection"
```

---

## 💡 Dicas

- O serviço reinicia automaticamente em caso de falha (`Restart=on-failure`)
- O túnel inicia automaticamente quando o servidor reinicia (se `enabled`)
- Logs são mantidos pelo systemd e podem ser consultados a qualquer momento
- Alterações no `config.yml` requerem reiniciar o serviço
- O túnel roda em background, independente do terminal estar aberto

---

## 🔗 Links Úteis

- **Zero Trust Dashboard:** https://one.dash.cloudflare.com/
- **Cloudflare Dashboard (DNS):** https://dash.cloudflare.com/
- **Documentação Cloudflare Tunnel:** https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/

