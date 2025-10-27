# Configuração do Sistema de Polling Calendly

## ✅ Arquivos Implementados

- `src/services/calendlyPollingService.ts` - Serviço principal de polling
- `api/calendly-polling.js` - Endpoint da API
- `vercel.json` - Configuração do Vercel (sem cron jobs)

## 🔧 Configuração do Uptime Robot

### Passo 1: Criar conta no Uptime Robot
1. Acesse: https://uptimerobot.com
2. Clique em "Sign Up" (canto superior direito)
3. Preencha os dados e confirme o e-mail

### Passo 2: Configurar o Monitor
1. Faça login na conta
2. Clique em "Add New Monitor" (botão azul)
3. Configure os seguintes campos:

**Monitor Type:**
- Selecione "HTTP(s)"

**Friendly Name:**
```
Calendly Polling - OnSmart AI
```

**URL (or IP):**
```
https://onsmart.ai/api/calendly-polling
```

**Monitoring Interval:**
- Selecione "5 minutes"

**HTTP Method:**
- Selecione "POST"

**HTTP Headers (opcional):**
```
Content-Type: application/json
```

**HTTP Body (opcional):**
```json
{"source": "uptime-robot"}
```

### Passo 3: Salvar e Ativar
1. Clique em "Create Monitor"
2. O monitor aparecerá na lista
3. Certifique-se de que está "Paused: No"

## 🧪 Teste da Configuração

### Teste Manual
```powershell
# No PowerShell
Invoke-RestMethod -Uri "https://onsmart.ai/api/calendly-polling" -Method POST
```

### Teste Real
1. Faça um agendamento no Calendly
2. Aguarde até 5 minutos
3. Verifique se o Ricardo recebeu a notificação

## 📊 Monitoramento

### Logs do Vercel
- Acesse: https://vercel.com/onsmart/onsmartai-website
- Vá em "Functions" → "Logs"
- Procure por "Calendly polling"

### Logs do Uptime Robot
- Acesse sua conta no Uptime Robot
- Clique no monitor "Calendly Polling"
- Veja o histórico de execuções

## 🔧 Variáveis de Ambiente (Vercel)

**Obrigatórias:**
- `CALENDLY_PAT` - Token do Calendly
- `CALENDLY_USER_URI` - URI do usuário
- `CALENDLY_ORG_URI` - URI da organização

**Opcionais:**
- `NOTIFY_EMAIL_TO` - E-mail para notificações
- `WHATSAPP_WEBHOOK_URL` - URL do WhatsApp
- `CALENDLY_WEBHOOK_DEBUG` - Logs detalhados (true/false)

## 🚨 Troubleshooting

### Se não receber notificações:
1. Verifique se as variáveis de ambiente estão configuradas
2. Teste o endpoint manualmente
3. Verifique os logs do Vercel
4. Confirme se o Uptime Robot está executando

### Se der erro 500:
1. Verifique se o CALENDLY_PAT está correto
2. Confirme se o CALENDLY_USER_URI está correto
3. Verifique os logs para mais detalhes

## 📱 Notificações

O sistema envia notificações para:
- **E-mail**: ricardo.palomar@onsmart.com.br (ou configurado em NOTIFY_EMAIL_TO)
- **WhatsApp**: Se configurado em WHATSAPP_WEBHOOK_URL

### Formato das notificações:

**Novo Agendamento:**
```
📅 Novo Agendamento

👤 João Silva
📧 joao@email.com
📅 25/10/2025 às 14:00
📍 Google Meet
```

**Agendamento Cancelado:**
```
❌ Agendamento Cancelado

👤 João Silva
📧 joao@email.com
📅 25/10/2025 às 14:00
```
