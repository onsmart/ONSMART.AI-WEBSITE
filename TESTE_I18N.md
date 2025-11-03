# 🧪 Guia de Teste - Internacionalização (i18n)

## ✅ O que foi implementado:

1. ✅ Configuração do i18next (`src/i18n/config.ts`)
2. ✅ Estrutura de traduções (pt, en, es)
3. ✅ Componente `HeroSection` traduzido
4. ✅ Componente `LanguageSwitcher` (seletor de idioma no navbar)
5. ✅ Detecção automática de idioma do navegador

---

## 🚀 Como testar:

### 1. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Ou se estiver usando o servidor completo:

```bash
npm run dev:full
```

---

### 2. Testar Detecção Automática de Idiomas

**Teste A: Idioma do Navegador**
- Acesse o site
- O sistema deve detectar automaticamente o idioma do seu navegador
- Se seu navegador estiver em inglês, deve carregar em inglês
- Se estiver em espanhol, deve carregar em espanhol
- Se não detectar, usa português (fallback)

**Teste B: Persistência no localStorage**
- Abra o DevTools (F12)
- Vá em Application → Local Storage → seu site
- Procure por `i18nextLng`
- Você verá o código do idioma atual (pt, en ou es)
- Mude o idioma pelo seletor e verifique se atualiza

---

### 3. Testar Seletor de Idiomas (Language Switcher)

**Localização:** No topo direito da navbar (ao lado do botão "Agendar Diagnóstico")

**Como testar:**
1. Clique no ícone de globo 🌐 no navbar
2. Você verá um dropdown com 3 opções:
   - 🇧🇷 Português
   - 🇺🇸 English
   - 🇪🇸 Español
3. Clique em qualquer idioma
4. **Observe:** A página deve atualizar IMEDIATAMENTE sem reload
5. O texto do HeroSection deve mudar conforme o idioma

---

### 4. Testar Traduções do HeroSection

**Na página inicial (`/`):**

| Elemento | Português (pt) | Inglês (en) | Espanhol (es) |
|----------|----------------|-------------|---------------|
| Badge | "Metodologia LÍDER" | "LEADER Methodology" | "Metodología LÍDER" |
| Título início | "Transforme sua empresa em uma" | "Transform your company into an" | "Transforma tu empresa en una" |
| Textos do typewriter | Potência de IA, etc. | AI Powerhouse, etc. | Potencia de IA, etc. |
| Botão primário | "Começar Transformação Agora" | "Start Transformation Now" | "Comenzar Transformación Ahora" |
| Botão secundário | "Ver Metodologia LÍDER" | "See LEADER Methodology" | "Ver Metodología LÍDER" |

**Teste:**
- Troque os idiomas pelo seletor
- Compare os textos acima
- Verifique se todos mudam corretamente

---

### 5. Verificar Console (sem erros)

Abra o DevTools → Console e verifique:
- ✅ Nenhum erro relacionado a i18next
- ⚠️ Se aparecer `i18next: languageChanged`, é normal (indica que o idioma mudou)

---

### 6. Testar em Diferentes Páginas

**Páginas para testar:**
- `/` (Home) - ✅ HeroSection traduzido
- `/contato` - ⚠️ Ainda não traduzido (teste para ver se não quebra)
- `/diagnostico` - ⚠️ Ainda não traduzido (teste para ver se não quebra)

**O que observar:**
- Mesmo em páginas não traduzidas, o seletor de idioma deve funcionar
- Os componentes traduzidos devem mudar
- Não deve dar erros

---

### 7. Testar Persistência (Session)

1. Escolha um idioma (ex: English)
2. Feche a aba do navegador
3. Abra novamente o site
4. **Deve manter o idioma escolhido** (English)

---

## 🐛 Problemas comuns e soluções:

### Problema 1: "Cannot find module 'i18next'"
**Solução:** Execute `npm install` novamente

### Problema 2: Seletor não aparece
**Solução:** Verifique se o componente está importado em `Navbar.tsx`

### Problema 3: Textos não mudam
**Solução:** 
- Limpe o cache do navegador
- Verifique se o componente usa `useTranslation('home')`
- Verifique se a key existe no JSON (ex: `hero.badge`)

### Problema 4: Erro de build
**Solução:** 
- Verifique se todos os arquivos JSON estão válidos (sem vírgulas extras)
- Execute `npm run lint` para verificar erros

---

## ✅ Checklist de Teste:

- [ ] Servidor inicia sem erros
- [ ] Seletor de idioma aparece no navbar
- [ ] Dropdown abre e mostra 3 idiomas
- [ ] Troca de idioma funciona (textos mudam)
- [ ] HeroSection traduz corretamente em todos os idiomas
- [ ] Idioma persiste após recarregar página
- [ ] Detecção automática funciona
- [ ] Console não mostra erros críticos

---

## 📝 Próximos passos (após testar):

1. Traduzir Chat da Sônia
2. Traduzir Navbar e Footer
3. Traduzir Formulários
4. Adicionar mais traduções conforme necessário

---

**Boa sorte com os testes! 🚀**

