# Status da Integração WhatsApp - Evolution API v2.3.6
**Data:** 25/11/2025  
**Projeto:** ONSMART-WEBSITE  
**Integração:** Evolution API v2.3.6 + Sonia (WhatsApp)

---

## 📋 Resumo Executivo

✅ **SUCESSO!** A instância WhatsApp conectou com sucesso após atualização para Evolution API v2.3.6.  
**Instância:** `sonia-whatsapp-v3`  
**Status:** Conectada e aguardando testes de estabilidade e funcionalidades.

---

## ✅ O Que Foi Feito

### 1. **Infraestrutura e Configuração**

#### Docker e Evolution API
- ✅ Evolution API v2.3.6 instalada e rodando via Docker Compose (atualizada de v2.2.3)
- ✅ PostgreSQL configurado e conectado (banco: `sonia_db`)
- ✅ Redis configurado e funcionando
- ✅ Container `evolution-api` rodando na porta 8080
- ✅ Rede Docker configurada corretamente (containers se comunicando)

#### Cloudflare Tunnel
- ✅ Cloudflare Tunnel configurado para expor a API publicamente
- ✅ URL pública: `https://medicaid-paint-confidential-operation.trycloudflare.com`
- ⚠️ **Nota:** URL temporária (muda a cada reinício do túnel)

#### Variáveis de Ambiente
- ✅ `EVOLUTION_API_APIKEY` configurada
- ✅ `EVOLUTION_API_BASE_URL` configurada (via Cloudflare Tunnel)
- ⚠️ `EVOLUTION_API_INSTANCE_ID` aguardando conexão estável

### 2. **Código e Endpoints**

#### Webhook Endpoints Criados
- ✅ `/api/whatsapp/webhook.js` - Endpoint principal para receber mensagens
- ✅ `/api/whatsapp/webhook/connection-update.js` - Endpoint para eventos de conexão
- ✅ `vercel.json` atualizado com configurações de timeout

#### Serviços Criados
- ✅ `api/services/soniaBrain.js` - Função `generateSoniaReplyFromSingleMessage()` (sem histórico)
- ✅ `api/services/evolutionApi.js` - Função `sendWhatsAppMessage()` para enviar mensagens

### 3. **Instância WhatsApp**

#### Status Atual
- ✅ Instância `sonia-whatsapp-v3` criada com sucesso
- ✅ QR Code sendo gerado corretamente
- ✅ Instância conectou ao WhatsApp (`CONNECTED TO WHATSAPP`)
- ✅ **SUCESSO:** Conexão estabelecida após atualização para v2.3.6
- ⏳ **Aguardando:** Testes de estabilidade e funcionalidades

---

## ❌ Problemas Identificados

### 🔴 Problema Crítico: Desconexão Imediata

**Sintoma:**
- Instância conecta ao WhatsApp com sucesso
- Após ~1 minuto, recebe erro: `code="401"` com `type="device_removed"`
- Instância faz LOGOUT automaticamente

**Logs do Erro:**
```
[Evolution API]  [sonia-whatsapp]  ...  INFO   [ChannelStartupService]  [string]
  ┌──────────────────────────────┐
  │    CONNECTED TO WHATSAPP     │
  └──────────────────────────────┘
        wuid: 551150931836
        name: sonia-whatsapp

{"level":50,"time":...,"node":{"tag":"stream:error","attrs":{"code":"401"},"content":[{"tag":"conflict","attrs":{"type":"device_removed"}}]},"msg":"stream errored out"}

[Evolution API]  ...  WARN   [WAMonitoringService]  [string]  Instance "sonia-whatsapp" - LOGOUT
```

**Possíveis Causas:**
1. **Múltiplas tentativas de conexão** - WhatsApp pode estar bloqueando temporariamente
2. **Sessão antiga/corrompida** - Dados residuais causando conflito
3. **Detecção de atividade suspeita** - WhatsApp detectando múltiplas conexões rápidas
4. **Problema conhecido na v2.2.3** - Pode ser um bug da versão

**Tentativas de Solução Já Realizadas:**
- ✅ Limpeza de dados da instância
- ✅ Reinicialização do container
- ✅ Verificação de sessões no celular (nenhuma sessão ativa)
- ✅ Criação de nova instância do zero
- ✅ **FASE 1 CONCLUÍDA:** Teste WhatsApp Web oficial - funciona normalmente
  - ✅ **Conclusão:** Problema é da Evolution API, não da conta WhatsApp
  - ✅ WhatsApp Web conecta rapidamente e permanece estável
- ✅ **FASE 2 CONCLUÍDA:** Limpeza Total de Sessão Evolution
  - ✅ Volumes limpos com sucesso
  - ✅ Nova instância `sonia-whatsapp-v2` criada
  - ✅ Instância conectou ao WhatsApp
  - ❌ **Problema persiste:** Desconecta após exatamente 1 minuto com `device_removed 401`
  - ✅ **Conclusão:** Limpeza dos volumes não resolveu - problema não é de dados residuais
- ✅ **FASE 3 CONCLUÍDA:** Atualização para Evolution API v2.3.6
  - ✅ Evolution API atualizada de v2.2.3 para v2.3.6
  - ✅ Nova instância `sonia-whatsapp-v3` criada
  - ✅ **SUCESSO:** Instância conectou ao WhatsApp
  - ✅ **Conclusão:** Atualização para v2.3.6 resolveu o problema de conexão
- ✅ **WEBHOOK CONFIGURADO:** Integração com Vercel
  - ✅ Webhook configurado na Evolution API
  - ✅ URL: `https://onsmart-website.vercel.app/api/whatsapp/webhook`
  - ✅ Eventos: `MESSAGES_UPSERT`
  - ✅ Status: Habilitado
  - ➡️ **Próximo passo:** Testar fluxo completo (enviar mensagem → Sonia responde)

---

## 🔧 O Que Falta Corrigir

### 1. **Problema Principal: Estabilizar Conexão WhatsApp**

**Ações Necessárias:**
- [ ] Aguardar 15-30 minutos entre tentativas de conexão
- [ ] Limpar completamente todos os dados da instância antes de tentar novamente
- [ ] Verificar se há bloqueio temporário no número do WhatsApp
- [ ] Considerar atualizar para versão mais recente da Evolution API (se disponível)
- [ ] Verificar logs detalhados durante a conexão para identificar momento exato da desconexão

**Comandos Úteis:**
```bash
# Limpar completamente
docker exec evolution-api sh -c "rm -rf /evolution/instances/*"
docker compose restart evolution-api

# Monitorar logs em tempo real
docker logs evolution-api -f | grep -i "sonia-whatsapp\|connected\|logout\|error"
```

### 2. **Configuração de Webhook na Vercel**

**Status:** Endpoints criados, mas não testados (instância não conecta)

**Ações Necessárias:**
- [ ] Fazer deploy dos endpoints na Vercel
- [ ] Configurar `EVOLUTION_API_INSTANCE_ID` na Vercel após conexão estável
- [ ] Testar recebimento de mensagens via webhook
- [ ] Testar envio de respostas da Sonia

**Variáveis de Ambiente na Vercel (pendentes):**
```
EVOLUTION_API_BASE_URL=https://medicaid-paint-confidential-operation.trycloudflare.com
EVOLUTION_API_APIKEY=<já configurada>
EVOLUTION_API_INSTANCE_ID=sonia-whatsapp (após conexão estável)
```

### 3. **Solução Permanente para Exposição Pública**

**Status Atual:** Usando Cloudflare Tunnel temporário

**Problema:** URL muda a cada reinício do túnel

**Ações Necessárias:**
- [ ] Configurar túnel permanente do Cloudflare (com domínio fixo)
- [ ] OU configurar port forwarding no roteador (porta 80/443)
- [ ] OU configurar Nginx + SSL (Let's Encrypt) com domínio próprio
- [ ] Atualizar `EVOLUTION_API_BASE_URL` na Vercel com URL permanente

### 4. **Testes e Validação**

**Ações Necessárias:**
- [ ] Testar recebimento de mensagem via WhatsApp
- [ ] Testar resposta automática da Sonia
- [ ] Testar detecção de idioma (pt/en/es)
- [ ] Testar fallback para mensagens não-texto
- [ ] Validar que não há armazenamento de histórico (conforme requisito)

### 5. **Documentação**

**Ações Necessárias:**
- [ ] Documentar processo completo de instalação e configuração
- [ ] Documentar troubleshooting do problema de desconexão (quando resolvido)
- [ ] Atualizar `EVOLUTION-API-INTEGRATION.md` com status final

---

## 📝 Arquivos Criados/Modificados

### Novos Arquivos
- `api/whatsapp/webhook.js` - Endpoint principal do webhook
- `api/whatsapp/webhook/connection-update.js` - Endpoint para eventos de conexão
- `api/services/soniaBrain.js` - Lógica da Sonia para WhatsApp (sem histórico)
- `api/services/evolutionApi.js` - Função para enviar mensagens via Evolution API

### Arquivos Modificados
- `vercel.json` - Adicionado timeout para endpoints do webhook

### Arquivos de Documentação
- `INSTALACAO-EVOLUTION-API.md` - Guia de instalação (atualizado)
- `CONFIGURACAO-AMBIENTE.md` - Variáveis de ambiente
- `COMO-OBTER-VALORES-EVOLUTION-API.md` - Como obter valores necessários
- `EVOLUTION-API-INTEGRATION.md` - Documentação principal da integração

---

## 🔍 Informações Técnicas Importantes

### URLs e Endpoints

**Evolution API:**
- URL Pública (temporária): `https://medicaid-paint-confidential-operation.trycloudflare.com`
- Manager: `https://medicaid-paint-confidential-operation.trycloudflare.com/manager`
- Porta Local: `8080`

**Vercel:**
- Projeto: `onsmart-website`
- Webhook: `https://onsmart-website.vercel.app/api/whatsapp/webhook`
- Connection Update: `https://onsmart-website.vercel.app/api/whatsapp/webhook/connection-update`

### Instância WhatsApp
- **Nome:** `sonia-whatsapp`
- **ID:** `61cb98ef-45d4-492e-b50d-2907081a1891` (última instância criada)
- **Status:** Desconectando imediatamente após conectar
- **Número:** `551150931836`

### Configuração Docker

**Container:**
- Nome: `evolution-api`
- Imagem: `atendai/evolution-api:v2.2.3`
- Porta: `8080:8080`

**Volumes:**
- `evolution_instances:/evolution/instances`
- `evolution_store:/evolution/store`

**Rede:**
- `evolution-api_evolution-network` (rede compartilhada com Redis)
- PostgreSQL conectado via IP do host: `192.168.15.31:5432`

---

## 🎯 Próximos Passos Prioritários

1. **Imediato:**
   - Aguardar 15-30 minutos
   - Limpar completamente dados da instância
   - Tentar conectar novamente
   - Monitorar logs detalhadamente

2. **Curto Prazo:**
   - Resolver problema de desconexão
   - Fazer deploy dos endpoints na Vercel
   - Testar fluxo completo de mensagens

3. **Médio Prazo:**
   - Configurar solução permanente para exposição pública
   - Documentar processo completo
   - Adicionar testes automatizados

---

## 📞 Contatos e Referências

**Documentação:**
- Evolution API v2.x: https://doc.evolution-api.com/v2
- GitHub: https://github.com/EvolutionAPI/evolution-api

**Problemas Conhecidos:**
- Issue #1286: Problemas com QR Code na v2.2.3
- Issue #1543: Problemas de conexão com Baileys

---

## 📅 Histórico de Tentativas

- **24/11/2025 15:23** - Primeira conexão bem-sucedida, desconexão após ~1 minuto
- **24/11/2025 15:35** - Segunda tentativa, mesmo problema
- **24/11/2025 15:37** - Terceira tentativa, instância criada mas não conectada ainda

---

**Última Atualização:** 25/11/2025  
**Status Geral:** 🟡 Em Progresso - Problema crítico identificado, aguardando resolução


