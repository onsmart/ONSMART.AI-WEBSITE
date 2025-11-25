# FASE 1: Validação da Conta WhatsApp

**Objetivo:** Garantir que o problema não é da conta/app do WhatsApp antes de mexer na infraestrutura.  
**Número:** `551150931836`  
**Tempo estimado:** 30-45 minutos

---

## 📋 Checklist de Validação

- [ ] **Passo 1.1:** Verificar WhatsApp no Celular
- [ ] **Passo 1.2:** Testar WhatsApp Web Oficial
- [ ] **Passo 1.3:** Reset Completo do WhatsApp (se necessário)

---

## 🔍 Passo 1.1: Verificar WhatsApp no Celular

### 1.1.1: Verificar se é App Oficial

**No celular com o número `551150931836`:**

1. Abra o WhatsApp
2. Vá em **Configurações** → **Ajuda** → **Informações do aplicativo**
3. Verifique:
   - ✅ **Nome do pacote deve ser:** `com.whatsapp` (WhatsApp normal) ou `com.whatsapp.w4b` (WhatsApp Business)
   - ❌ **NÃO deve ser:** `com.gbwhatsapp`, `com.fmwhatsapp`, `com.yowhatsapp`, etc.
   - Se for app modificado, **desinstale imediatamente** e instale da loja oficial

### 1.1.2: Verificar Versão Beta

**Android (Play Store):**
1. Abra a Play Store
2. Procure por "WhatsApp"
3. Se você estiver no programa beta, verá "Você é um beta tester"
4. **Se estiver em beta:** Sair do beta (Play Store → WhatsApp → Sair do programa beta)

**iOS (App Store):**
1. Abra a App Store
2. Procure por "WhatsApp"
3. Se estiver usando TestFlight, você verá "TestFlight" no app
4. **Se estiver em beta:** Desinstalar versão beta e instalar versão estável

### 1.1.3: Verificar Atualização

**Android:**
1. Play Store → WhatsApp → Verificar se há atualização disponível
2. Se houver, atualizar

**iOS:**
1. App Store → Atualizações → Verificar se há atualização do WhatsApp
2. Se houver, atualizar

**✅ Resultado esperado:**
- App oficial instalado
- Versão estável (não beta)
- App atualizado para a versão mais recente

---

## 🌐 Passo 1.2: Testar WhatsApp Web Oficial

**Este é o teste mais importante!** Se o WhatsApp Web também desconectar, o problema é da conta/app, não da Evolution.

### 1.2.1: Preparar Ambiente

1. Abra um navegador no computador (Chrome, Firefox, Edge, etc.)
2. Certifique-se de que está usando navegador atualizado
3. Feche todas as outras abas do WhatsApp Web (se houver)

### 1.2.2: Conectar WhatsApp Web

1. Acesse: **https://web.whatsapp.com**
2. No celular, abra o WhatsApp
3. Vá em **Menu (⋮)** → **Aparelhos conectados** → **Conectar um aparelho**
4. Escaneie o QR Code que aparece na tela do computador
5. Aguarde conectar

### 1.2.3: Monitorar Conexão (15-20 minutos)

**⚠️ IMPORTANTE:** Deixe o WhatsApp Web aberto e **NÃO feche a aba** por pelo menos 15-20 minutos.

**O que observar:**

1. **Primeiros 2 minutos:**
   - ✅ WhatsApp Web conecta normalmente
   - ✅ Mensagens aparecem
   - ✅ Pode enviar/receber mensagens

2. **Após 5 minutos:**
   - ✅ Continua conectado?
   - ✅ Mensagens continuam chegando?
   - ❌ Aparece mensagem de "Conectando..." ou "Reconectando..."?

3. **Após 10 minutos:**
   - ✅ Ainda conectado?
   - ❌ Desconectou sozinho?

4. **Após 15-20 minutos:**
   - ✅ Ainda conectado?
   - ❌ Desconectou sozinho?

**Anotar observações:**
- [ ] Conectou normalmente: ✅ / ❌
- [ ] Permaneceu conectado por 15+ minutos: ✅ / ❌
- [ ] Desconectou sozinho: ✅ / ❌
- [ ] Se desconectou, quanto tempo levou: _____ minutos
- [ ] Mensagem de erro (se houver): _________________

### 1.2.4: Interpretar Resultado

**✅ Se o WhatsApp Web ficou estável (15+ minutos conectado):**
- ✅ Problema **NÃO é da conta/app**
- ✅ Problema é da **Evolution/Baileys**
- ➡️ **Próximo passo:** Ir para FASE 2 (Limpeza Total de Sessão Evolution)

**❌ Se o WhatsApp Web também desconectou:**
- ❌ Problema **É da conta/app**
- ➡️ **Próximo passo:** Fazer Passo 1.3 (Reset Completo do WhatsApp)

---

## 🔄 Passo 1.3: Reset Completo do WhatsApp (SOMENTE SE NECESSÁRIO)

**⚠️ ATENÇÃO:** Só faça este passo se o WhatsApp Web também desconectou no Passo 1.2.

### 1.3.1: Fazer Backup (Opcional mas Recomendado)

**Android:**
1. WhatsApp → **Configurações** → **Conversas** → **Backup de conversas**
2. Toque em **Fazer backup agora**
3. Aguarde o backup ser concluído
4. Verifique se o backup foi salvo no Google Drive (Configurações → Google Drive)

**iOS:**
1. WhatsApp → **Configurações** → **Conversas** → **Backup de conversas**
2. Toque em **Fazer backup agora**
3. Aguarde o backup ser concluído
4. Verifique se o backup foi salvo no iCloud (Configurações → iCloud)

### 1.3.2: Remover Todas as Sessões Conectadas

**No celular:**
1. WhatsApp → **Configurações** → **Aparelhos conectados**
2. Você verá uma lista de aparelhos conectados (WhatsApp Web, Desktop, etc.)
3. **Remova TODAS as sessões:**
   - Toque em cada sessão
   - Toque em **Desconectar** ou **Remover**
4. Confirme que não há mais nenhuma sessão conectada

### 1.3.3: Desinstalar WhatsApp

**Android:**
1. Vá em **Configurações** → **Apps** → **WhatsApp**
2. Toque em **Desinstalar**
3. Confirme a desinstalação

**iOS:**
1. Mantenha pressionado o ícone do WhatsApp
2. Toque em **Remover App** → **Excluir App**
3. Confirme a exclusão

### 1.3.4: Limpar Cache (Android - Opcional)

**Se estiver no Android:**
1. Vá em **Configurações** → **Armazenamento**
2. Procure por dados residuais do WhatsApp
3. Limpe cache/dados residuais (se houver)

### 1.3.5: Reinstalar WhatsApp

**Android:**
1. Abra a **Play Store**
2. Procure por "WhatsApp"
3. Certifique-se de que é o app oficial (desenvolvedor: WhatsApp LLC)
4. Toque em **Instalar**
5. Aguarde a instalação

**iOS:**
1. Abra a **App Store**
2. Procure por "WhatsApp"
3. Certifique-se de que é o app oficial (desenvolvedor: WhatsApp Inc.)
4. Toque em **Obter** / **Instalar**
5. Aguarde a instalação

### 1.3.6: Configurar WhatsApp Novamente

1. Abra o WhatsApp recém-instalado
2. Aceite os termos de serviço
3. Digite o número `551150931836`
4. Confirme o número
5. Aguarde receber o código de verificação via SMS
6. Digite o código
7. Configure nome e foto (se quiser)
8. **NÃO restaure o backup ainda** (vamos testar primeiro)

### 1.3.7: Aguardar Estabilização

1. Deixe o WhatsApp aberto por **5-10 minutos**
2. Envie algumas mensagens de teste para você mesmo
3. Verifique se está funcionando normalmente

### 1.3.8: Testar WhatsApp Web Novamente

1. Repita o **Passo 1.2** (Testar WhatsApp Web Oficial)
2. Deixe conectado por 15-20 minutos
3. Observe se permanece estável

**✅ Se o WhatsApp Web ficar estável agora:**
- ✅ Reset resolveu o problema da conta
- ➡️ **Próximo passo:** Ir para FASE 2 (Limpeza Total de Sessão Evolution) e tentar conectar na Evolution

**❌ Se o WhatsApp Web ainda desconectar:**
- ❌ Problema pode ser mais profundo (conta com flags no WhatsApp)
- ➡️ **Próximo passo:** Considerar usar outro número ou aguardar alguns dias antes de tentar novamente

---

## 📝 Formulário de Resultados

**Preencha este formulário após completar os testes:**

```
Data/Hora do teste: _____/_____/_____  _____:_____

PASSO 1.1 - Verificação do App:
[ ] App oficial (com.whatsapp)
[ ] Versão estável (não beta)
[ ] App atualizado

PASSO 1.2 - Teste WhatsApp Web:
[ ] Conectou normalmente
[ ] Permaneceu conectado por 15+ minutos: SIM / NÃO
[ ] Se desconectou, tempo até desconectar: _____ minutos
[ ] Mensagem de erro (se houver): _________________

PASSO 1.3 - Reset (se necessário):
[ ] Backup feito
[ ] Sessões removidas
[ ] App desinstalado
[ ] App reinstalado
[ ] WhatsApp Web testado novamente: Estável / Instável

CONCLUSÃO:
[ ] Problema é da conta/app → Fazer Passo 1.3
[ ] Problema NÃO é da conta/app → Ir para FASE 2

OBSERVAÇÕES:
_________________________________________________
_________________________________________________
_________________________________________________
```

---

## ✅ Próximos Passos

**Após completar a FASE 1:**

1. **Se WhatsApp Web ficou estável:**
   - ➡️ Ir para **FASE 2: Limpeza Total de Sessão Evolution**
   - O problema é da Evolution/Baileys, não da conta

2. **Se WhatsApp Web também desconectou:**
   - ➡️ Fazer **Passo 1.3: Reset Completo**
   - Depois testar WhatsApp Web novamente
   - Se ainda desconectar, pode ser problema mais profundo da conta

---

**Última Atualização:** 25/11/2025  
**Status:** ⏳ Aguardando Execução

