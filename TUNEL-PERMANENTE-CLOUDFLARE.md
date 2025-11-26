# Guia: Configurar Túnel Permanente do Cloudflare

Este guia detalha como substituir o túnel temporário do Cloudflare por um túnel permanente que mantém a URL fixa e inicia automaticamente.

## 📋 Pré-requisitos

- Servidor Linux com acesso root/sudo
- `cloudflared` instalado
- Evolution API rodando na porta 8080
- Conta Cloudflare (gratuita)

## 🚀 Implementação Rápida

### Opção 1: Script Automatizado (Recomendado)

Execute o script completo que automatiza todos os passos:

```bash
cd /caminho/para/projeto
chmod +x scripts/setup-cloudflare-tunnel-permanent.sh
./scripts/setup-cloudflare-tunnel-permanent.sh
```

O script irá:
1. Verificar/criar autenticação
2. Criar túnel nomeado permanente
3. Configurar arquivo `config.yml`
4. Testar o túnel
5. Criar serviço systemd
6. Iniciar serviço automaticamente
7. Exibir URL fixa obtida

### Opção 2: Passo a Passo Manual

Se preferir fazer manualmente ou se o script encontrar problemas, siga os passos abaixo.

## 📝 Passo a Passo Manual

### Fase 1: Resolver Problema de Login

**Problema comum:** `cloudflared tunnel login` fica esperando infinitamente.

#### Solução 1: Verificar se login já foi feito

```bash
ls -la ~/.cloudflared/cert.pem
```

Se o arquivo existir, o login já foi concluído.

#### Solução 2: Login via Dashboard Web (Recomendado)

1. Acesse: https://one.dash.cloudflare.com/
2. Faça login na sua conta Cloudflare
3. Vá em: **Zero Trust** > **Access** > **Tunnels**
4. Clique em **Create a tunnel**
5. Escolha **Cloudflared**
6. Dê um nome ao túnel (ex: `evolution-api-permanent`)
7. Clique em **Save tunnel**
8. Na próxima tela, copie o **token** exibido
9. No servidor, execute:

```bash
cloudflared tunnel create evolution-api-permanent --token <token-copiado>
```

#### Solução 3: Login via Terminal (se funcionar)

```bash
cloudflared tunnel login
```

- Abra a URL exibida no navegador
- Faça login e autorize
- Volte ao terminal e pressione Enter

### Fase 2: Criar Túnel Nomeado

```bash
# Se ainda não criou via dashboard, crie agora:
cloudflared tunnel create evolution-api-permanent

# Verificar túnel criado:
cloudflared tunnel list
```

Anote o **Tunnel ID** exibido (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

### Fase 3: Configurar Arquivo config.yml

```bash
# Criar diretório se não existir
mkdir -p ~/.cloudflared

# Editar arquivo de configuração
nano ~/.cloudflared/config.yml
```

**Conteúdo do arquivo** (substitua `<tunnel-id>` pelo ID obtido):

```yaml
tunnel: <tunnel-id>
credentials-file: /home/<seu-usuario>/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: evolution-api-onsmart.trycloudflare.com
    service: http://localhost:8080
  - service: http_status:404
```

**Importante:**
- Substitua `<tunnel-id>` pelo ID do túnel
- Substitua `<seu-usuario>` pelo seu usuário Linux
- O hostname pode ser qualquer subdomínio `.trycloudflare.com` de sua escolha
- A porta `8080` deve corresponder à porta onde a Evolution API está rodando

**Exemplo completo:**

```yaml
tunnel: a1b2c3d4-e5f6-7890-abcd-ef1234567890
credentials-file: /home/usuario/.cloudflared/a1b2c3d4-e5f6-7890-abcd-ef1234567890.json

ingress:
  - hostname: evolution-api-onsmart.trycloudflare.com
    service: http://localhost:8080
  - service: http_status:404
```

### Fase 4: Testar Túnel Manualmente

Antes de configurar como serviço, teste manualmente:

```bash
cloudflared tunnel run evolution-api-permanent
```

**Verificar:**
- Túnel inicia sem erros
- URL fixa é exibida (formato: `https://evolution-api-onsmart.trycloudflare.com`)
- A URL **não muda** a cada execução (diferente do túnel temporário)

**Testar conectividade:**

```bash
# Em outro terminal, testar:
curl https://evolution-api-onsmart.trycloudflare.com/health

# Ou testar endpoint da Evolution API:
curl -X GET "https://evolution-api-onsmart.trycloudflare.com/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API"
```

Se tudo funcionar, pressione `Ctrl+C` para parar o túnel e continue.

### Fase 5: Configurar como Serviço systemd

Criar arquivo de serviço:

```bash
sudo nano /etc/systemd/system/cloudflared.service
```

**Conteúdo** (ajuste `<seu-usuario>` e caminho do `cloudflared`):

```ini
[Unit]
Description=Cloudflare Tunnel para Evolution API
After=network.target

[Service]
Type=simple
User=<seu-usuario>
WorkingDirectory=/home/<seu-usuario>
ExecStart=/usr/local/bin/cloudflared tunnel run evolution-api-permanent
Restart=on-failure
RestartSec=5s
Environment="HOME=/home/<seu-usuario>"

[Install]
WantedBy=multi-user.target
```

**Encontrar caminho do cloudflared:**

```bash
which cloudflared
```

**Exemplo completo:**

```ini
[Unit]
Description=Cloudflare Tunnel para Evolution API
After=network.target

[Service]
Type=simple
User=usuario
WorkingDirectory=/home/usuario
ExecStart=/usr/bin/cloudflared tunnel run evolution-api-permanent
Restart=on-failure
RestartSec=5s
Environment="HOME=/home/usuario"

[Install]
WantedBy=multi-user.target
```

**Habilitar e iniciar serviço:**

```bash
# Recarregar systemd
sudo systemctl daemon-reload

# Habilitar para iniciar automaticamente
sudo systemctl enable cloudflared

# Iniciar serviço
sudo systemctl start cloudflared

# Verificar status
sudo systemctl status cloudflared
```

### Fase 6: Obter URL Fixa

Após iniciar o serviço, obter a URL fixa:

```bash
# Ver logs e procurar URL
sudo journalctl -u cloudflared -n 100 | grep -i "https://"

# Ou usar script auxiliar
./scripts/get-cloudflare-tunnel-url.sh
```

**Anote a URL obtida!** Ela será usada nas próximas fases.

### Fase 7: Atualizar Variável na Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto
3. Vá em: **Settings** > **Environment Variables**
4. Localize: `EVOLUTION_API_BASE_URL`
5. Atualize o valor para a nova URL fixa (ex: `https://evolution-api-onsmart.trycloudflare.com`)
6. **IMPORTANTE:** Remova a barra final (`/`) se houver
7. Clique em **Save**
8. Faça um novo deploy

### Fase 8: Atualizar Webhook na Evolution API

No servidor, atualizar o webhook:

```bash
# Definir variáveis
EVOLUTION_URL="https://evolution-api-onsmart.trycloudflare.com"
EVOLUTION_API_KEY="sua-chave-api"
INSTANCE_NAME="sonia-whatsapp-v3"
WEBHOOK_URL="https://onsmart.ai/api/whatsapp/webhook"

# Atualizar webhook
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

**Ou usar o script auxiliar:**

```bash
export EVOLUTION_API_KEY="sua-chave-api"
./scripts/update-webhook-new-url.sh
```

### Fase 9: Testes e Validação

**Checklist:**

- [ ] Túnel está rodando: `sudo systemctl status cloudflared`
- [ ] URL fixa está acessível: `curl https://<url-fixa>/health`
- [ ] Evolution API responde: `curl https://<url-fixa>/instance/fetchInstances -H "apikey: <chave>"`
- [ ] Webhook atualizado na Evolution API
- [ ] Variável `EVOLUTION_API_BASE_URL` atualizada na Vercel
- [ ] Teste enviando mensagem no WhatsApp
- [ ] Verificar logs da Vercel para confirmar webhook funcionando

**Script de teste completo:**

```bash
./scripts/test-cloudflare-tunnel.sh
```

## 🔧 Comandos Úteis

### Gerenciar Serviço

```bash
# Ver status
sudo systemctl status cloudflared

# Ver logs em tempo real
sudo journalctl -u cloudflared -f

# Ver últimas 100 linhas de log
sudo journalctl -u cloudflared -n 100

# Reiniciar serviço
sudo systemctl restart cloudflared

# Parar serviço
sudo systemctl stop cloudflared

# Iniciar serviço
sudo systemctl start cloudflared

# Desabilitar inicialização automática
sudo systemctl disable cloudflared
```

### Gerenciar Túnel

```bash
# Listar túneis
cloudflared tunnel list

# Ver informações do túnel
cloudflared tunnel info evolution-api-permanent

# Deletar túnel (cuidado!)
cloudflared tunnel delete evolution-api-permanent

# Obter URL do túnel
./scripts/get-cloudflare-tunnel-url.sh
```

### Testar Conectividade

```bash
# Teste básico
curl https://evolution-api-onsmart.trycloudflare.com

# Teste Evolution API
curl -X GET "https://evolution-api-onsmart.trycloudflare.com/instance/fetchInstances" \
  -H "apikey: SUA_CHAVE_API"

# Script de teste completo
./scripts/test-cloudflare-tunnel.sh
```

## 🐛 Troubleshooting

### Problema: Login não completa

**Sintomas:** `cloudflared tunnel login` fica esperando infinitamente.

**Soluções:**
1. Verificar se `~/.cloudflared/cert.pem` já existe (login já foi feito)
2. Usar login via dashboard web (recomendado)
3. Verificar firewall/proxy não está bloqueando
4. Tentar em outro terminal/sessão

### Problema: Túnel não inicia

**Sintomas:** Serviço falha ao iniciar.

**Diagnóstico:**
```bash
sudo journalctl -u cloudflared -n 50
```

**Soluções:**
1. Verificar arquivo `config.yml` está correto
2. Verificar arquivo de credenciais JSON existe
3. Verificar caminhos no arquivo de serviço estão corretos
4. Verificar usuário do serviço tem permissões

### Problema: URL ainda muda

**Sintomas:** URL do túnel muda a cada reinicialização.

**Causa:** Ainda está usando túnel temporário (`cloudflared tunnel --url`).

**Solução:** Certifique-se de usar `cloudflared tunnel run <nome>` e não `tunnel --url`.

### Problema: Serviço não inicia automaticamente

**Sintomas:** Após reiniciar servidor, túnel não inicia.

**Diagnóstico:**
```bash
sudo systemctl is-enabled cloudflared
```

**Solução:**
```bash
sudo systemctl enable cloudflared
```

### Problema: Evolution API não responde pelo túnel

**Sintomas:** Túnel está rodando mas Evolution API não responde.

**Diagnóstico:**
1. Verificar Evolution API está rodando localmente:
   ```bash
   curl http://localhost:8080
   ```
2. Verificar porta no `config.yml` está correta
3. Verificar logs do túnel:
   ```bash
   sudo journalctl -u cloudflared -f
   ```

## 📚 Recursos Adicionais

- [Documentação oficial Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Guia de túneis nomeados](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/)
- [Configuração de systemd](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/as-a-service/linux/)

## ✅ Checklist Final

Após implementação completa:

- [ ] Túnel permanente criado e configurado
- [ ] Serviço systemd rodando e habilitado
- [ ] URL fixa obtida e documentada
- [ ] Variável `EVOLUTION_API_BASE_URL` atualizada na Vercel
- [ ] Webhook atualizado na Evolution API
- [ ] Testes realizados e funcionando
- [ ] Documentação atualizada com nova URL

## 📝 Notas Importantes

1. **URL Fixa:** Túneis nomeados mantêm a mesma URL mesmo após reinicializações
2. **Sem Domínio Próprio:** Não é necessário configurar DNS, o Cloudflare fornece URL `.trycloudflare.com`
3. **Persistência:** O serviço systemd garante que o túnel inicie automaticamente
4. **Segurança:** As credenciais ficam em `~/.cloudflared/` - proteger adequadamente
5. **Backup:** Fazer backup dos arquivos de configuração antes de modificar
6. **Atualizações:** Atualizar `cloudflared` periodicamente: `sudo cloudflared update`

