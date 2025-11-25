# FASE 2: Limpeza Total de Sessão Evolution

**Objetivo:** Garantir que não há dados residuais/corrompidos causando conflito na Evolution API.  
**Status FASE 1:** ✅ Concluída - WhatsApp Web funciona normalmente (problema é da Evolution)  
**Tempo estimado:** 15-20 minutos

---

## 📋 Checklist de Execução

- [ ] **Passo 2.1:** Parar Stack Docker
- [ ] **Passo 2.2:** Limpar Volumes de Sessão
- [ ] **Passo 2.3:** Subir Stack Novamente
- [ ] **Passo 2.4:** Criar Nova Instância do Zero
- [ ] **Passo 2.5:** Testar Conexão

---

## 🛑 Passo 2.1: Parar Stack Docker

**Conecte-se na VPS via SSH e execute:**

```bash
# Navegar para o diretório onde está o docker-compose.yml
# (Ajuste o caminho conforme necessário)
cd ~/evolution-api

# OU se estiver em outro diretório, encontre o arquivo:
# find ~ -name "docker-compose.yml" -type f 2>/dev/null

# Parar todos os containers
docker compose down

# Verificar que parou (não deve mostrar o container evolution-api)
docker ps
```

**✅ Resultado esperado:**
- Container `evolution-api` não aparece na lista de containers rodando
- Comando `docker compose down` executa sem erros

---

## 🧹 Passo 2.2: Limpar Volumes de Sessão

**⚠️ IMPORTANTE:** Isso vai apagar TODAS as instâncias e sessões. Você precisará criar uma nova instância depois.

### Opção A: Se usar Volumes Nomeados (Recomendado)

```bash
# Listar volumes para confirmar os nomes
docker volume ls | grep evolution

# IMPORTANTE: Os volumes podem ter prefixo do projeto Docker Compose
# Exemplos de nomes possíveis:
# - evolution_instances OU evolution-api_evolution_instances
# - evolution_store OU evolution-api_evolution_store

# Remover volumes de instâncias e store (tentar ambos os formatos)
docker volume rm evolution_instances evolution_store 2>/dev/null || true
docker volume rm evolution-api_evolution_instances evolution-api_evolution_store 2>/dev/null || true

# OU remover todos os volumes evolution (exceto redis se necessário)
# docker volume rm $(docker volume ls -q | grep evolution | grep -v redis) 2>/dev/null || true

# Verificar que foram removidos
docker volume ls | grep evolution
```

**⚠️ NOTA:** Se os volumes ainda aparecerem, pode ser porque o container ainda está usando eles. Certifique-se de que o container está parado (`docker compose down`) antes de remover os volumes.

### Opção B: Se usar Bind Mounts (Diretórios)

```bash
# CUIDADO: Não apagar o volume do Postgres se não quiser perder o banco
# Ajuste os caminhos conforme sua configuração

# Verificar onde estão os dados
docker inspect evolution-api | grep -A 10 "Mounts"

# Remover dados das instâncias (ajustar caminho se necessário)
sudo rm -rf /evolution/instances/*
sudo rm -rf /evolution/store/*

# OU se estiver em outro local:
# sudo rm -rf /caminho/para/evolution/instances/*
# sudo rm -rf /caminho/para/evolution/store/*
```

### Opção C: Limpar Diretamente do Container (Alternativa)

```bash
# Se o container ainda existir, limpar de dentro
docker exec evolution-api sh -c "rm -rf /evolution/instances/* /evolution/store/*" 2>/dev/null || true
```

**✅ Resultado esperado:**
- Volumes removidos OU diretórios limpos
- Nenhum erro crítico (alguns warnings podem aparecer, é normal)

---

## 🚀 Passo 2.3: Subir Stack Novamente

```bash
# Garantir que está no diretório correto
cd ~/evolution-api  # Ajustar se necessário

# Puxar última imagem (opcional, mas recomendado para garantir versão atual)
docker compose pull

# Subir containers
docker compose up -d

# Aguardar alguns segundos para inicializar
sleep 10

# Verificar se subiu corretamente
docker ps | grep evolution-api

# Ver logs para confirmar que iniciou sem erros
docker logs evolution-api --tail 50
```

**✅ Resultado esperado:**
- Container `evolution-api` aparece rodando
- Logs mostram inicialização sem erros críticos
- API deve estar respondendo na porta 8080

**Verificar se API está respondendo:**
```bash
# Testar health check (ajustar endpoint conforme doc v2)
curl -X GET "http://localhost:8080/health" \
  -H "apikey: ${EVOLUTION_API_APIKEY}" 2>/dev/null || echo "Endpoint pode variar"

# OU testar endpoint raiz
curl http://localhost:8080/ 2>/dev/null | head -20
```

---

## 🆕 Passo 2.4: Criar Nova Instância do Zero

**⚠️ IMPORTANTE:** Use um **NOVO NOME** para a instância (não use `sonia-whatsapp` novamente).

### 2.4.1: Definir Variáveis

```bash
# Definir variáveis (ajustar conforme necessário)
export EVOLUTION_API_KEY="LS44e+SKfFA6AxGxLG8pRmBaReT0QPx+BiR8gpWzZqs="  # A mesma do .env
export INSTANCE_NAME="sonia-whatsapp-v2"   # NOVO NOME
export BASE_URL="https://kick-repair-tobacco-flows.trycloudflare.com"    # OU a URL pública se estiver usando
```

### 2.4.2: Criar Instância

```bash
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
```

**OU usando a API diretamente (ajustar conforme documentação v2):**

```bash
# Verificar endpoint exato na documentação
# Possíveis formatos:
# POST /instance/create
# POST /v2/instance/create
# POST /instance/create?instanceName=sonia-whatsapp-v2

curl -X POST "${BASE_URL}/instance/create?instanceName=${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}"
```

### 2.4.3: Obter QR Code

```bash
# Obter QR Code para escanear
curl -X GET "${BASE_URL}/instance/connect/${INSTANCE_NAME}?qrcode=true" \
  -H "apikey: ${EVOLUTION_API_KEY}"
```

**OU acessar via navegador:**
- Se estiver usando Cloudflare Tunnel: `https://sua-url-cloudflare.trycloudflare.com/manager`
- Ou: `http://seu-ip-vps:8080/manager`
- Procurar pela instância `sonia-whatsapp-v2` e clicar em "Conectar" / "QR Code"

### 2.4.4: Escanear QR Code

1. Abra o WhatsApp no celular com o número `551150931836`
2. Vá em **Menu (⋮)** → **Aparelhos conectados** → **Conectar um aparelho**
3. Escaneie o QR Code que aparece
4. Aguarde conectar

---

## 📊 Passo 2.5: Monitorar Conexão

**Deixe os logs abertos para monitorar:**

```bash
# Monitorar logs em tempo real (filtrado)
docker logs -f evolution-api | grep -i "${INSTANCE_NAME}\|connected\|logout\|error\|device_removed"
```

**O que observar:**

1. **Primeiros segundos:**
   - ✅ Aparece mensagem de "CONNECTED TO WHATSAPP"
   - ✅ Mostra o número: `wuid: 551150931836`
   - ✅ Mostra o nome da instância

2. **Após 1 minuto:**
   - ✅ Ainda conectado?
   - ❌ Apareceu erro `device_removed`?
   - ❌ Apareceu mensagem de "LOGOUT"?

3. **Após 5 minutos:**
   - ✅ Ainda conectado?
   - ❌ Desconectou?

**Comandos úteis para verificar status:**

```bash
# Ver status da instância
curl -X GET "${BASE_URL}/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .

# OU ver status específico
curl -X GET "${BASE_URL}/instance/fetchInstance/${INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_API_KEY}" | jq .
```

---

## 📝 Formulário de Resultados

**Preencha após completar os testes:**

```
Data/Hora: _____/_____/_____  _____:_____

PASSO 2.1 - Parar Stack:
[ ] Containers parados com sucesso

PASSO 2.2 - Limpar Volumes:
[ ] Volumes/diretórios limpos
[ ] Método usado: Volumes Nomeados / Bind Mounts / Container

PASSO 2.3 - Subir Stack:
[ ] Containers subiram corretamente
[ ] API respondendo

PASSO 2.4 - Nova Instância:
[ ] Instância criada: nome = _________________
[ ] QR Code gerado
[ ] QR Code escaneado

PASSO 2.5 - Monitoramento:
[ ] Conectou: SIM / NÃO
[ ] Tempo até conectar: _____ segundos
[ ] Permaneceu conectado por 5+ minutos: SIM / NÃO
[ ] Se desconectou, tempo até desconectar: _____ minutos
[ ] Erro recebido (se houver): _________________

CONCLUSÃO:
[ ] Conexão estável → Sucesso! Atualizar variáveis de ambiente
[ ] Ainda desconecta → Ir para FASE 3 (Atualizar Evolution)

OBSERVAÇÕES:
_________________________________________________
_________________________________________________
```

---

## ✅ Próximos Passos

**Após completar a FASE 2:**

1. **Se a conexão ficou estável (5+ minutos conectado):**
   - ✅ **Sucesso!** O problema era dados residuais
   - ➡️ Atualizar `EVOLUTION_API_INSTANCE_ID` na Vercel com o novo nome da instância
   - ➡️ Configurar webhook na Evolution
   - ➡️ Testar envio/recebimento de mensagens

2. **Se ainda desconectar:**
   - ❌ Limpeza não resolveu
   - ➡️ Ir para **FASE 3: Atualizar Evolution API para v2.3.***

---

## 🔧 Troubleshooting

### Erro: "Volume não encontrado"
```bash
# Se der erro ao remover volume, pode não existir (é normal)
# Continue para o próximo passo
```

### Erro: "Permission denied" ao remover diretórios
```bash
# Usar sudo
sudo rm -rf /caminho/para/evolution/instances/*
```

### API não responde após subir
```bash
# Verificar logs detalhados
docker logs evolution-api

# Verificar se porta está em uso
sudo netstat -tulpn | grep 8080

# Reiniciar container
docker compose restart evolution-api
```

### Não consegue criar instância
```bash
# Verificar se API está respondendo
curl http://localhost:8080/

# Verificar variável de ambiente
echo $EVOLUTION_API_KEY

# Ver logs para erros
docker logs evolution-api --tail 100
```

---

**Última Atualização:** 25/11/2025  
**Status:** ⏳ Pronto para Execução

