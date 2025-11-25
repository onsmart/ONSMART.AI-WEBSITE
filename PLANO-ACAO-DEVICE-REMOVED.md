# Plano de Ação - Resolução do Erro `device_removed 401`

**Data:** 25/11/2025  
**Problema:** Instância WhatsApp conecta mas é desconectada imediatamente com erro `code="401" type="device_removed"`  
**Número afetado:** `551150931836`  
**Versão atual:** Evolution API v2.2.3

---

## 📋 Resumo do Problema

Baseado na análise do ChatGPT, o erro `device_removed 401` é um problema conhecido que afeta múltiplas libs (Baileys, Evolution, Whatsmeow, etc.) e **não é causado pelo código nem pelo Cloudflare Tunnel**. É uma combinação de:
- Comportamento do WhatsApp
- Estado da conta WhatsApp
- Possível bug/limitação na versão v2.2.3 da Evolution

---

## 🎯 Plano de Ação (Priorizado)

### **FASE 1: Validação da Conta WhatsApp** ⚠️ CRÍTICO - FAZER PRIMEIRO

**📄 Guia Completo:** Ver arquivo `FASE1-VALIDACAO-CONTA-WHATSAPP.md`

**Objetivo:** Garantir que o problema não é da conta/app do WhatsApp antes de mexer na infraestrutura.

#### Resumo dos Passos:
1. **Passo 1.1:** Verificar WhatsApp no Celular (app oficial, não beta, atualizado)
2. **Passo 1.2:** Testar WhatsApp Web Oficial (15-20 minutos de monitoramento)
3. **Passo 1.3:** Reset Completo do WhatsApp (só se WhatsApp Web também desconectar)

**Tempo estimado:** 30-45 minutos  
**Prioridade:** 🔴 ALTA - Fazer antes de qualquer outra coisa

**➡️ Abra o arquivo `FASE1-VALIDACAO-CONTA-WHATSAPP.md` para instruções detalhadas passo a passo.**

---

### **FASE 2: Limpeza Total de Sessão Evolution** ✅ PRÓXIMA A EXECUTAR

**📄 Guia Completo:** Ver arquivo `FASE2-LIMPEZA-SESSAO-EVOLUTION.md`

**Status FASE 1:** ✅ Concluída - WhatsApp Web funciona normalmente (problema confirmado: Evolution API)

**Objetivo:** Garantir que não há dados residuais/corrompidos causando conflito.

#### Resumo dos Passos:
1. **Passo 2.1:** Parar Stack Docker
2. **Passo 2.2:** Limpar Volumes de Sessão (instâncias e store)
3. **Passo 2.3:** Subir Stack Novamente
4. **Passo 2.4:** Criar Nova Instância do Zero (com novo nome)
5. **Passo 2.5:** Monitorar Conexão (5+ minutos)

**Tempo estimado:** 15-20 minutos  
**Prioridade:** 🟡 MÉDIA - Fazer agora (FASE 1 concluída)

**➡️ Abra o arquivo `FASE2-LIMPEZA-SESSAO-EVOLUTION.md` para instruções detalhadas e comandos prontos.**

---

### **FASE 3: Atualizar Evolution API para v2.3.***

**Objetivo:** Usar versão mais recente que pode ter correções para o bug `device_removed`.

#### Passo 3.1: Verificar Versão Mais Recente
- [ ] Consultar Docker Hub: https://hub.docker.com/r/evoapicloud/evolution-api/tags
- [ ] OU consultar: https://hub.docker.com/r/atendai/evolution-api/tags
- [ ] Identificar tag mais recente v2.3.* (ex: `v2.3.0`, `v2.3.1`, etc.)
- [ ] Verificar documentação oficial: https://doc.evolution-api.com/v2/

#### Passo 3.2: Atualizar docker-compose.yml
**Arquivo a modificar:** `docker-compose.yml` na VPS

**Mudança necessária:**
```yaml
# ANTES:
image: atendai/evolution-api:v2.2.3

# DEPOIS (exemplo - ajustar para versão mais recente):
image: evoapicloud/evolution-api:v2.3.0
# OU
image: atendai/evolution-api:v2.3.0
```

**⚠️ IMPORTANTE:** 
- Verificar qual repositório está sendo usado (atendai ou evoapicloud)
- Usar a tag mais recente estável da série v2.3.*

#### Passo 3.3: Fazer Backup (Opcional mas Recomendado)
```bash
# Backup dos volumes (se quiser ter segurança)
docker run --rm -v evolution_instances:/data -v $(pwd):/backup alpine tar czf /backup/evolution_instances_backup_$(date +%Y%m%d).tar.gz /data
docker run --rm -v evolution_store:/data -v $(pwd):/backup alpine tar czf /backup/evolution_store_backup_$(date +%Y%m%d).tar.gz /data
```

#### Passo 3.4: Atualizar e Reiniciar
```bash
# Parar containers
docker compose down

# Puxar nova imagem
docker compose pull

# Subir novamente
docker compose up -d

# Monitorar logs
docker logs -f evolution-api
```

#### Passo 3.5: Repetir Fase 2 (Limpeza Total)
- [ ] Após atualizar, fazer limpeza total novamente (Fase 2)
- [ ] Criar nova instância
- [ ] Testar conexão

**Tempo estimado:** 30-40 minutos  
**Prioridade:** 🟡 MÉDIA - Fazer se Fase 1 e 2 não resolverem

---

### **FASE 4: Teste Cruzado com Outro Número**

**Objetivo:** Isolar se o problema é específico da conta `551150931836` ou geral da infraestrutura.

#### Passo 4.1: Preparar Segundo Número
- [ ] Conseguir outro chip/número WhatsApp (pode ser temporário só para teste)
- [ ] Instalar WhatsApp oficial no celular com esse número
- [ ] Verificar que o número está funcionando normalmente

#### Passo 4.2: Testar na Mesma Evolution
- [ ] Criar nova instância na MESMA Evolution (mesmo servidor, mesma versão)
- [ ] Escanear QR Code com o segundo número
- [ ] Monitorar por 15-20 minutos

#### Passo 4.3: Analisar Resultado
- ✅ **Se o segundo número ficar estável:**
  - Problema é específico da conta `551150931836`
  - Possíveis causas:
    - Conta com histórico de uso em ferramentas
    - Flags de "comportamento suspeito" no WhatsApp
    - Bug específico dessa conta + versão do app

- ❌ **Se ambos os números caírem:**
  - Problema é geral de compatibilidade Evolution/Baileys
  - Solução pode depender de:
    - Atualização futura da Evolution
    - Ou considerar trocar de stack (Cloud API oficial)

**Tempo estimado:** 45-60 minutos  
**Prioridade:** 🟢 BAIXA - Fazer se Fases 1-3 não resolverem

---

### **FASE 5: Continuar Desenvolvimento em Paralelo**

**Objetivo:** Não perder tempo enquanto resolve o problema de conexão.

#### Passo 5.1: Testar Webhook com Payload Fake
- [ ] Usar Postman ou curl para simular webhook da Evolution
- [ ] Testar endpoint `/api/whatsapp/webhook` na Vercel
- [ ] Validar que `soniaBrain.generateSoniaReplyFromSingleMessage()` funciona
- [ ] Validar formato de resposta

#### Passo 5.2: Testar Envio de Mensagem (quando instância estiver estável)
- [ ] Quando a instância conectar e permanecer conectada
- [ ] Testar `evolutionApi.sendWhatsAppMessage()` via API
- [ ] Validar que mensagens são enviadas corretamente

#### Passo 5.3: Documentar Processo
- [ ] Atualizar `STATUS-INTEGRACAO-WHATSAPP-25-11-2025.md` com resultados
- [ ] Documentar qual solução funcionou
- [ ] Criar checklist para futuras instalações

**Tempo estimado:** Contínuo (pode fazer em paralelo)  
**Prioridade:** 🟢 BAIXA - Pode fazer enquanto testa conexão

---

## 📊 Checklist de Execução

### Ordem Recomendada:
1. ✅ **FASE 1** - Validação da Conta WhatsApp ✅ **CONCLUÍDA**
   - ✅ WhatsApp Web funciona normalmente
   - ✅ Problema confirmado: Evolution API, não da conta
2. 🔄 **FASE 2** - Limpeza Total de Sessão ⏳ **PRÓXIMA**
3. ⏳ **FASE 3** - Atualizar para v2.3.* (se necessário)
4. ⏳ **FASE 4** - Teste com outro número (se necessário)
5. ⏳ **FASE 5** - Continuar desenvolvimento (em paralelo)

---

## 🔍 Comandos Úteis para Monitoramento

```bash
# Monitorar logs em tempo real
docker logs -f evolution-api | grep -i "sonia-whatsapp\|connected\|logout\|error\|device_removed"

# Ver status da instância
curl -X GET "http://localhost:8080/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_API_APIKEY}"

# Ver QR Code
curl -X GET "http://localhost:8080/instance/connect/sonia-whatsapp" \
  -H "apikey: ${EVOLUTION_API_APIKEY}"

# Verificar volumes Docker
docker volume ls | grep evolution

# Ver uso de disco dos volumes
docker system df -v
```

---

## 📝 Notas Importantes

1. **Não é problema do código:** O erro acontece antes de qualquer mensagem chegar no webhook
2. **Não é problema do Cloudflare Tunnel:** O túnel só expõe a API HTTP, não interfere no WebSocket
3. **Problema conhecido:** Várias pessoas reportando o mesmo erro na v2.2.3
4. **Solução pode estar na v2.3.***: Versões mais recentes podem ter correções

---

## ✅ Próximo Passo Imediato

**VALIDAR ESTE PLANO COM O USUÁRIO ANTES DE EXECUTAR**

Após validação, começar pela **FASE 1 - Passo 1.2** (testar WhatsApp Web oficial).

---

**Última Atualização:** 25/11/2025  
**Status:** ⏳ Aguardando Validação

