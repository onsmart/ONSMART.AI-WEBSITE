# FASE 3: Atualizar Evolution API para v2.3.*

**Objetivo:** Atualizar para versão mais recente que pode ter correções para o bug `device_removed`.  
**Status FASE 2:** ✅ Concluída - Limpeza não resolveu (problema persiste)  
**Versão atual:** v2.2.3  
**Versão alvo:** v2.3.* (mais recente estável)  
**Tempo estimado:** 30-40 minutos

---

## 📋 Checklist de Execução

- [ ] **Passo 3.1:** Verificar Versão Mais Recente
- [ ] **Passo 3.2:** Fazer Backup (Opcional mas Recomendado)
- [ ] **Passo 3.3:** Atualizar docker-compose.yml
- [ ] **Passo 3.4:** Atualizar e Reiniciar
- [ ] **Passo 3.5:** Limpar Instâncias Antigas do Banco
- [ ] **Passo 3.6:** Criar Nova Instância e Testar

---

## 🔍 Passo 3.1: Verificar Versão Mais Recente

**Consultar versão mais recente disponível:**

1. **Docker Hub - atendai:**
   - Acesse: https://hub.docker.com/r/atendai/evolution-api/tags
   - Procure pela tag mais recente da série v2.3.* (ex: `v2.3.0`, `v2.3.1`, `v2.3.2`)

2. **Docker Hub - evoapicloud (alternativa):**
   - Acesse: https://hub.docker.com/r/evoapicloud/evolution-api/tags
   - Verifique se há versões mais recentes

3. **Documentação oficial:**
   - Acesse: https://doc.evolution-api.com/v2/
   - Verifique qual versão está documentada como estável

**Versão escolhida:**
```
✅ Versão escolhida: v2.3.6
✅ Repositório: evoapicloud/evolution-api
✅ Comando: docker pull evoapicloud/evolution-api:v2.3.6
```

---

## 💾 Passo 3.2: Fazer Backup (Opcional mas Recomendado)

**⚠️ IMPORTANTE:** Fazer backup antes de atualizar é uma boa prática.

### Backup dos Volumes Docker:

```bash
# Criar diretório para backups
mkdir -p ~/evolution-backups
cd ~/evolution-backups

# Backup dos volumes (se quiser ter segurança)
docker run --rm \
  -v evolution-api_evolution_instances:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/evolution_instances_backup_$(date +%Y%m%d_%H%M%S).tar.gz /data

docker run --rm \
  -v evolution-api_evolution_store:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/evolution_store_backup_$(date +%Y%m%d_%H%M%S).tar.gz /data

# Verificar que os backups foram criados
ls -lh ~/evolution-backups/
```

### Backup do docker-compose.yml:

```bash
# Fazer backup do docker-compose.yml atual
cp ~/evolution-api/docker-compose.yml ~/evolution-api/docker-compose.yml.backup.$(date +%Y%m%d_%H%M%S)
```

---

## 📝 Passo 3.3: Atualizar docker-compose.yml

**Localizar e editar o arquivo:**

```bash
# Navegar para o diretório
cd ~/evolution-api

# Fazer backup antes de editar
cp docker-compose.yml docker-compose.yml.backup

# Editar o arquivo (usar nano, vim ou seu editor preferido)
nano docker-compose.yml
```

**Localizar a linha com a imagem e atualizar:**

```yaml
# ANTES:
image: atendai/evolution-api:v2.2.3

# DEPOIS (versão escolhida: v2.3.6):
image: evoapicloud/evolution-api:v2.3.6
```

**⚠️ NOTA:** Você escolheu a versão `v2.3.6` do repositório `evoapicloud`. Certifique-se de que o `docker-compose.yml` está usando `evoapicloud/evolution-api:v2.3.6`.

**⚠️ IMPORTANTE:**
- Verificar qual repositório está sendo usado (atendai ou evoapicloud)
- Usar a tag mais recente estável da série v2.3.*
- Manter todas as outras configurações iguais

**Verificar se o arquivo está correto:**

```bash
# Ver a linha da imagem
grep "image:" docker-compose.yml
```

---

## 🚀 Passo 3.4: Atualizar e Reiniciar

```bash
# Garantir que está no diretório correto
cd ~/evolution-api

# Parar containers
docker compose down

# Puxar nova imagem
docker compose pull

# Verificar que a nova imagem foi baixada
docker images | grep evolution-api

# Subir novamente
docker compose up -d

# Aguardar inicialização
sleep 15

# Verificar se subiu corretamente
docker ps | grep evolution-api

# Monitorar logs para ver se iniciou sem erros
docker logs evolution-api --tail 50
```

**✅ Resultado esperado:**
- Container `evolution-api` aparece rodando
- Logs mostram inicialização sem erros críticos
- Versão nos logs deve mostrar v2.3.* (não mais v2.2.3)

**Verificar versão:**

```bash
# Ver versão no log
docker logs evolution-api | grep -i "v2\." | head -5

# OU testar endpoint
curl http://localhost:8080/ 2>/dev/null | grep -o '"version":"[^"]*"'
```

---

## 🗑️ Passo 3.5: Limpar Instâncias Antigas do Banco

**⚠️ IMPORTANTE:** Antes de criar nova instância, limpar as instâncias antigas do banco de dados.

**Opção A: Via API (Recomendado)**

```bash
# Definir variáveis
export EVOLUTION_API_KEY="LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs="
export BASE_URL="https://kick-repair-tobacco-flows.trycloudflare.com"

# Listar instâncias
curl -X GET "${BASE_URL}/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq '.[].name'

# Deletar instância antiga (sonia-whatsapp)
curl -X DELETE "${BASE_URL}/instance/delete/sonia-whatsapp" \
  -H "apikey: ${EVOLUTION_API_KEY}"

# Deletar instância nova que falhou (sonia-whatsapp-v2)
curl -X DELETE "${BASE_URL}/instance/delete/sonia-whatsapp-v2" \
  -H "apikey: ${EVOLUTION_API_KEY}"

# Verificar que foram deletadas
curl -X GET "${BASE_URL}/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .
```

**Opção B: Via Banco de Dados (Avançado)**

```bash
# Conectar ao PostgreSQL (ajustar credenciais conforme necessário)
# psql -h 192.168.15.31 -U postgres -d sonia_db

# Deletar instâncias antigas (CUIDADO: ajustar IDs conforme necessário)
# DELETE FROM "Instance" WHERE "instanceName" IN ('sonia-whatsapp', 'sonia-whatsapp-v2');
```

---

## 🆕 Passo 3.6: Criar Nova Instância e Testar

**Agora criar uma nova instância com a versão atualizada:**

```bash
# Definir variáveis
export EVOLUTION_API_KEY="LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs="
export INSTANCE_NAME="sonia-whatsapp-v3"   # NOVO NOME
export BASE_URL="https://kick-repair-tobacco-flows.trycloudflare.com"    # OU URL pública se estiver usando Cloudflare Tunnel

# Criar nova instância
curl -X POST "${BASE_URL}/instance/create" \
  -H "Content-Type: application/json" \
  -H "apikey: ${EVOLUTION_API_KEY}" \
  -d "{
    \"instanceName\": \"${INSTANCE_NAME}\",
    \"token\": \"${EVOLUTION_API_KEY}\",
    \"qrcode\": true,
    \"integration\": \"WHATSAPP-BAILEYS\"
  }"

# Obter QR Code
curl -X GET "${BASE_URL}/instance/connect/${INSTANCE_NAME}?qrcode=true" \
  -H "apikey: ${EVOLUTION_API_KEY}"
```

**OU acessar via navegador:**
- Se estiver usando Cloudflare Tunnel: `https://sua-url-cloudflare.trycloudflare.com/manager`
- Ou: `http://seu-ip-vps:8080/manager`

**Escanear QR Code e monitorar:**

```bash
# Monitorar logs em tempo real
docker logs -f evolution-api | grep -i "${INSTANCE_NAME}\|connected\|logout\|error\|device_removed"
```

**O que observar:**
1. ✅ Conecta normalmente?
2. ✅ Permanece conectado por 5+ minutos?
3. ❌ Ainda desconecta com `device_removed`?

---

## 📝 Formulário de Resultados

**Preencha após completar os testes:**

```
Data/Hora: _____/_____/_____  _____:_____

PASSO 3.1 - Versão Escolhida:
[ ] Versão: v2.3.X
[ ] Repositório: atendai / evoapicloud

PASSO 3.2 - Backup:
[ ] Backup dos volumes feito
[ ] Backup do docker-compose.yml feito

PASSO 3.3 - Atualização:
[ ] docker-compose.yml atualizado
[ ] Versão confirmada: v2.3.X

PASSO 3.4 - Reinicialização:
[ ] Container atualizado e rodando
[ ] Versão confirmada nos logs: v2.3.X

PASSO 3.5 - Limpeza:
[ ] Instâncias antigas deletadas

PASSO 3.6 - Teste:
[ ] Nova instância criada: nome = _________________
[ ] QR Code escaneado
[ ] Conectou: SIM / NÃO
[ ] Permaneceu conectado por 5+ minutos: SIM / NÃO
[ ] Se desconectou, tempo até desconectar: _____ minutos
[ ] Erro recebido (se houver): _________________

CONCLUSÃO:
[ ] Atualização resolveu → Sucesso! Configurar webhook
[ ] Ainda desconecta → Considerar FASE 4 (teste com outro número) ou aguardar correção

OBSERVAÇÕES:
_________________________________________________
_________________________________________________
```

---

## ✅ Próximos Passos

**Após completar a FASE 3:**

1. **Se a conexão ficou estável (5+ minutos conectado):**
   - ✅ **Sucesso!** A atualização resolveu o problema
   - ➡️ Atualizar `EVOLUTION_API_INSTANCE_ID` na Vercel
   - ➡️ Configurar webhook na Evolution
   - ➡️ Testar envio/recebimento de mensagens

2. **Se ainda desconectar:**
   - ❌ Atualização não resolveu
   - ➡️ Considerar **FASE 4: Teste com outro número** (para isolar se é problema da conta)
   - ➡️ OU aguardar correção futura da Evolution API

---

## 🔧 Troubleshooting

### Erro ao puxar nova imagem
```bash
# Verificar conexão com Docker Hub
docker pull atendai/evolution-api:v2.3.0

# Se der erro, tentar outra tag
docker pull atendai/evolution-api:v2.3.1
```

### Container não inicia após atualização
```bash
# Ver logs detalhados
docker logs evolution-api

# Verificar se há incompatibilidade de configuração
# Comparar com documentação da v2.3.*
```

### Erro ao deletar instâncias
```bash
# Verificar se a API está respondendo
curl http://localhost:8080/

# Tentar deletar uma por vez
curl -X DELETE "${BASE_URL}/instance/delete/sonia-whatsapp" \
  -H "apikey: ${EVOLUTION_API_KEY}"
```

---

**Última Atualização:** 25/11/2025  
**Status:** ⏳ Pronto para Execução

