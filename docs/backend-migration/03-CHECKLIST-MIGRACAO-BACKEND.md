# Checklist de Migração: Backend da Sonia

Use este checklist para acompanhar o progresso da migração do backend da Sonia para o servidor.

## Fase 1: Preparação

### Repositório e Estrutura
- [ ] Criar repositório Git `sonia-backend` (ou `onsmart-backend-api`)
- [ ] Clonar repositório localmente
- [ ] Criar estrutura de pastas conforme `02-GUIA-CRIACAO-REPOSITORIO-BACKEND.md`
- [ ] Criar arquivos base (package.json, Dockerfile, docker-compose.yml)
- [ ] Configurar .gitignore e .env.example

### Análise do Código Atual
- [ ] Revisar `ONSMART-WEBSITE/api/services/soniaService.js`
- [ ] Revisar `ONSMART-WEBSITE/api/services/soniaBrain.js`
- [ ] Revisar `ONSMART-WEBSITE/api/services/evolutionApi.js`
- [ ] Revisar `ONSMART-WEBSITE/api/whatsapp/webhook.js`
- [ ] Documentar dependências e variáveis de ambiente usadas

## Fase 2: Desenvolvimento do Backend

### Configuração Base
- [ ] Criar `src/app.js` (servidor Express)
- [ ] Configurar middleware (CORS, JSON parser, error handling)
- [ ] Criar `src/config/database.js` (PostgreSQL)
- [ ] Criar `src/config/redis.js` (Redis)
- [ ] Criar `src/routes/health.routes.js`

### Migração de Serviços
- [ ] Migrar `soniaService.js` → `src/services/sonia.service.js`
- [ ] Integrar `soniaBrain.js` em `sonia.service.js`
- [ ] Migrar `evolutionApi.js` → `src/services/evolution.service.js`
- [ ] Adaptar código para ES Modules
- [ ] Substituir Map em memória por PostgreSQL
- [ ] Adicionar tratamento de erros adequado
- [ ] Adicionar logs estruturados

### Modelos de Dados
- [ ] Criar schema PostgreSQL `sonia_backend`
- [ ] Criar tabela `conversations`
- [ ] Criar tabela `messages`
- [ ] Criar tabela `users` (se necessário)
- [ ] Criar migrations (se usar sistema de migrations)
- [ ] Criar `src/models/Conversation.js`
- [ ] Criar `src/models/Message.js`

### Rotas
- [ ] Criar `src/routes/sonia.routes.js`
  - [ ] POST `/sonia/message`
  - [ ] GET `/sonia/conversation/:userId`
  - [ ] DELETE `/sonia/conversation/:userId` (reset)
- [ ] Criar `src/routes/webhook.routes.js`
  - [ ] POST `/webhook/whatsapp`
- [ ] Testar todas as rotas localmente

### Docker
- [ ] Criar Dockerfile otimizado
- [ ] Criar docker-compose.yml
- [ ] Configurar healthcheck
- [ ] Testar build da imagem
- [ ] Testar container localmente

## Fase 3: Integração com Frontend

### Atualização do Frontend (ONSMART-WEBSITE)
- [ ] Criar `src/lib/apiClient.ts`
- [ ] Atualizar `src/lib/openaiService.ts` para usar novo backend
- [ ] Implementar modo dual (fallback para Vercel)
- [ ] Adicionar variável `VITE_SONIA_API_URL` na Vercel
- [ ] Testar integração frontend ↔ backend localmente

### Testes
- [ ] Testar envio de mensagem via webchat
- [ ] Testar histórico de conversa
- [ ] Testar reset de conversa
- [ ] Testar detecção de idioma
- [ ] Testar fallback em caso de erro

## Fase 4: Deploy no Servidor

### Preparação do Servidor
- [ ] Verificar portas disponíveis (3001)
- [ ] Verificar acesso ao PostgreSQL
- [ ] Verificar acesso ao Redis
- [ ] Verificar acesso à Evolution API (via Cloudflare Tunnel)
- [ ] Criar usuário `sonia-backend` no servidor
- [ ] Adicionar usuário ao grupo docker

### Configuração DNS e SSL
- [ ] Criar registro DNS para `api.onsmart.ai`
- [ ] Configurar SSL/TLS (Let's Encrypt ou Cloudflare)
- [ ] Testar resolução DNS
- [ ] Testar certificado SSL

### Configuração Nginx
- [ ] Criar arquivo `api.onsmart.ai.conf`
- [ ] Configurar proxy para porta 3001
- [ ] Configurar CORS
- [ ] Configurar headers de segurança
- [ ] Testar configuração: `nginx -t`
- [ ] Recarregar Nginx: `systemctl reload nginx`

### Deploy do Backend
- [ ] Clonar repositório no servidor (`/opt/sonia-backend`)
- [ ] Configurar arquivo `.env` no servidor
- [ ] Build da imagem Docker
- [ ] Start do container
- [ ] Verificar logs do container
- [ ] Testar health check: `curl https://api.onsmart.ai/health`

### Testes de Conectividade
- [ ] Testar endpoint `/health` externamente
- [ ] Testar endpoint `/sonia/message` externamente
- [ ] Verificar logs de erro
- [ ] Verificar conexão com PostgreSQL
- [ ] Verificar conexão com Redis
- [ ] Verificar integração com OpenAI API
- [ ] Verificar integração com Evolution API

## Fase 5: Migração Completa

### Migração de Funcionalidades
- [ ] Migrar webhook WhatsApp
- [ ] Testar recebimento de mensagens WhatsApp
- [ ] Testar envio de respostas WhatsApp
- [ ] Verificar histórico de conversas no banco
- [ ] Verificar cache no Redis

### Limpeza do Código Antigo
- [ ] Remover `api/services/soniaService.js` do ONSMART-WEBSITE
- [ ] Remover `api/services/soniaBrain.js` do ONSMART-WEBSITE
- [ ] Remover `api/whatsapp/webhook.js` do ONSMART-WEBSITE (ou manter como fallback temporário)
- [ ] Remover variáveis de ambiente não utilizadas da Vercel
- [ ] Atualizar documentação

### Monitoramento
- [ ] Configurar logs estruturados
- [ ] Configurar alertas (se aplicável)
- [ ] Monitorar uso de recursos (CPU, memória)
- [ ] Monitorar latência das requisições
- [ ] Monitorar erros e exceções

### Documentação
- [ ] Atualizar README do repositório `sonia-backend`
- [ ] Documentar endpoints da API
- [ ] Documentar variáveis de ambiente
- [ ] Documentar processo de deploy
- [ ] Documentar troubleshooting

## Fase 6: Go-Live e Validação

### Validação Final
- [ ] Testar todos os fluxos de usuário
- [ ] Testar em diferentes navegadores
- [ ] Testar em dispositivos móveis
- [ ] Validar performance
- [ ] Validar segurança

### Go-Live
- [ ] Remover modo dual (fallback)
- [ ] Ativar backend novo em produção
- [ ] Monitorar primeiras horas de operação
- [ ] Coletar feedback dos usuários
- [ ] Ajustar conforme necessário

### Pós-Deploy
- [ ] Revisar logs das primeiras 24h
- [ ] Verificar métricas de uso
- [ ] Identificar e corrigir problemas
- [ ] Otimizar performance se necessário
- [ ] Planejar melhorias futuras

## Notas

- Marque cada item conforme for completado
- Documente problemas encontrados e soluções
- Mantenha backup do código antigo até validação completa
- Teste sempre em ambiente de staging antes de produção

---

**Última atualização:** 2025-01-28




