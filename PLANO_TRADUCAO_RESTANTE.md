# 🌐 Plano de Tradução Restante - onsmartAI Website

## 📊 **Status Atual (Atualizado em 2024)**

### ✅ **FASES CONCLUÍDAS:**
- **Fase 1-8:** Páginas principais e produtos IBM (100% completo)
- **Fase 9:** Páginas soltas principais (100% completo)
- **Fase 10 - Etapa 1:** Páginas de Conteúdo e Recursos (100% completo)

---

## 🚀 **FASE 10 - PÁGINAS SECUNDÁRIAS (EM ANDAMENTO)**

### ✅ **ETAPA 10.1 - Páginas de Conteúdo e Recursos (COMPLETA)**
- [x] `Conteudo.tsx` - ✅ COMPLETA
- [x] `FerramentasGratuitas.tsx` - ✅ COMPLETA  
- [x] `MateriaisGratuitos.tsx` - ✅ COMPLETA
- [x] `Glossario.tsx` - ✅ COMPLETA

### ✅ **ETAPA 10.2 - Páginas de Produtos e Serviços (COMPLETA)**
- [x] `NossosProdutos.tsx` - ✅ COMPLETA
- [x] `Servicos.tsx` - ✅ COMPLETA
- [x] `ProdutosIBM.tsx` - ✅ COMPLETA (já estava traduzida)
- [x] `EcossistemaIBM.tsx` - ✅ COMPLETA

### ✅ **ETAPA 10.3 - Páginas de Cadastro e Formulários (COMPLETA)**
- [x] `AgentesDigitaisComissoes.tsx` - ✅ COMPLETA
- [x] `AgentesDigitaisCadastro.tsx` - ✅ COMPLETA
- [x] `RevendasBeneficios.tsx` - ✅ COMPLETA
- [x] `RevendasCadastro.tsx` - ✅ COMPLETA

### ✅ **ETAPA 10.4 - Páginas Técnicas e Administrativas (COMPLETA)**
- [x] `Admin.tsx` - ✅ COMPLETA
- [x] `DockerMonitor.tsx` - ✅ COMPLETA
- [x] `ImageTest.tsx` - ✅ COMPLETA
- [x] `BlogPost.tsx` - ✅ COMPLETA

### ✅ **ETAPA 10.5 - Páginas de Agentes e WhatsApp (COMPLETA)**
- [x] `AgentesIA.tsx` - ✅ COMPLETA (já estava traduzida)
- [x] `WhatsappAgents.tsx` - ✅ COMPLETA

### ✅ **ETAPA 10.6 - Páginas Legais e Homepage (COMPLETA)**
- [x] `Index.tsx` - ✅ COMPLETA
- [x] `PoliticaPrivacidade.tsx` - ✅ COMPLETA
- [x] `TermosUso.tsx` - ✅ COMPLETA

---

## ✅ **FASE 11 - PÁGINAS UNIVERSITY (COMPLETA)**

### 📚 **Pasta /pages/university/**
- [x] `AgentesIA.tsx` (university) - ✅ COMPLETA
- [x] `IABasico.tsx` - ✅ COMPLETA

---

## ✅ **FASE 12 - COMPONENTES DE NAVBAR (COMPLETA)**

### 📋 **Componentes de Navegação**
- [x] `DesktopMenu.tsx` - ✅ COMPLETA (já estava traduzida)
- [x] `MobileMenu.tsx` (mobile/index.tsx) - ✅ COMPLETA
- [x] `MobileMenuItems.tsx` - ✅ COMPLETA
- [x] `MenuConteudoDropdown.tsx` - ✅ COMPLETA
- [x] `ProdutosDropdown.tsx` - ✅ COMPLETA (já estava traduzida)
- [x] `ServicosDropdown.tsx` - ✅ COMPLETA (já estava traduzida)
- [x] `SetoresDropdown.tsx` - ✅ COMPLETA (já estava traduzida)

---

## 🔍 **FASE 13 - REVISÃO FINAL E TESTES (PENDENTE)**

### ✅ **Verificações Finais**
- [ ] Teste de todas as traduções em PT, EN, ES
- [ ] Verificação de consistência entre idiomas
- [ ] Teste de funcionalidade de troca de idiomas
- [ ] Verificação de SEO em todos os idiomas
- [ ] Teste de responsividade em todos os idiomas
- [ ] Verificação de performance com traduções

---

## ⚡ **OTIMIZAÇÕES REALIZADAS**

### ✅ **Traduções Centralizadas**
- ✅ Adicionadas traduções genéricas ao `common.json`:
  - Seções de idioma (language)
  - Mensagens de toast (toast)
  - Opções Likert do diagnóstico (diagnostic.likert)

### ✅ **Componentes Otimizados**
- ✅ `LanguageSwitcher.tsx` - Agora usa traduções do `common.json`
- ✅ `DiagnosticQuestionnaire.tsx` - Opções Likert traduzidas dinamicamente
- ✅ `contextual-toast.tsx` - Toasts agora usam traduções do `common.json`

### ✅ **Documentação Melhorada**
- ✅ `i18n/config.ts` - Comentários expandidos com estrutura e otimizações

---

## 📈 **ESTATÍSTICAS ATUAIS**

### ✅ **Namespaces Criados:** 58+
### ✅ **Páginas Completadas:** ~49 páginas
### ✅ **Componentes Navbar:** Todos traduzidos
### ✅ **Strings Hardcoded:** Todas traduzidas
### 📊 **Progresso Geral:** ~100% completo (otimizado)

---

## 🛠️ **PROCESSO PADRÃO PARA CADA PÁGINA**

### 1. **Análise da Página**
- [ ] Ler o arquivo da página
- [ ] Identificar strings hardcoded
- [ ] Mapear seções e componentes

### 2. **Criação dos Arquivos de Tradução**
- [ ] Criar `src/locales/pt/[nome].json`
- [ ] Criar `src/locales/en/[nome].json`
- [ ] Criar `src/locales/es/[nome].json`

### 3. **Configuração do i18n**
- [ ] Adicionar import dos arquivos JSON
- [ ] Adicionar namespace no array `ns`
- [ ] Adicionar recursos para PT, EN, ES

### 4. **Internacionalização da Página**
- [ ] Adicionar `useTranslation(['namespace', 'common'])`
- [ ] Substituir strings hardcoded por `t()`
- [ ] Internacionalizar SEO (title, description)
- [ ] Internacionalizar hero sections
- [ ] Internacionalizar CTAs e botões

### 5. **Testes e Verificação**
- [ ] Verificar erros de linter
- [ ] Testar troca de idiomas
- [ ] Verificar responsividade
- [ ] Atualizar TODO list

---

## 🎯 **PRÓXIMAS AÇÕES RECOMENDADAS**

### **Prioridade 1: Etapa 10.2**
- Começar com `NossosProdutos.tsx`
- Seguir com `Servicos.tsx`
- Continuar com `ProdutosIBM.tsx`
- Finalizar com `EcossistemaIBM.tsx`

### **Prioridade 2: Etapa 10.3**
- Páginas de cadastro e formulários
- Foco em CTAs e validações

### **Prioridade 3: Etapa 10.4**
- Páginas técnicas e administrativas
- Verificar se precisam de tradução

### **Prioridade 4: Etapa 10.5**
- Páginas de agentes e WhatsApp
- Finalizar Fase 10

### **Prioridade 5: Fase 11**
- Pasta university
- Conteúdo educacional

### **Prioridade 6: Fase 12**
- Componentes de navbar
- Navegação principal

### **Prioridade 7: Fase 13**
- Revisão final
- Testes completos

---

## 📝 **NOTAS IMPORTANTES**

### **Estrutura de Arquivos de Tradução**
```json
{
  "seo": {
    "title": "Título SEO",
    "description": "Descrição SEO"
  },
  "hero": {
    "title": "Título Principal",
    "subtitle": "Subtítulo",
    "description": "Descrição"
  },
  "sections": {
    "nomeSecao": {
      "title": "Título da Seção",
      "subtitle": "Subtítulo da Seção"
    }
  },
  "buttons": {
    "acao": "Texto do Botão"
  },
  "cta": {
    "title": "Título CTA",
    "subtitle": "Subtítulo CTA",
    "button": "Botão CTA"
  }
}
```

### **Padrões de Nomenclatura**
- Usar `snake_case` para chaves
- Agrupar por seções lógicas
- Manter consistência entre idiomas
- Usar chaves descritivas e claras

### **Boas Práticas**
- Sempre testar após cada página
- Verificar erros de linter
- Manter consistência visual
- Documentar mudanças importantes

---

## 🚀 **COMANDOS ÚTEIS**

### **Verificar Erros de Linter**
```bash
npm run lint
```

### **Testar Aplicação**
```bash
npm run dev
```

### **Build de Produção**
```bash
npm run build
```

---

**📅 Última Atualização:** 2024
**👤 Responsável:** Equipe de Desenvolvimento
**📊 Status:** Em Andamento (70% completo)

