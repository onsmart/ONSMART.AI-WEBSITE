import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar recursos de tradução
import ptCommon from '../locales/pt/common.json';
import ptNavigation from '../locales/pt/navigation.json';
import ptHome from '../locales/pt/home.json';
import ptChat from '../locales/pt/chat.json';
import ptContact from '../locales/pt/contact.json';

import enCommon from '../locales/en/common.json';
import enNavigation from '../locales/en/navigation.json';
import enHome from '../locales/en/home.json';
import enChat from '../locales/en/chat.json';
import enContact from '../locales/en/contact.json';

import esCommon from '../locales/es/common.json';
import esNavigation from '../locales/es/navigation.json';
import esHome from '../locales/es/home.json';
import esChat from '../locales/es/chat.json';
import esContact from '../locales/es/contact.json';

/**
 * CONFIGURAÇÃO DO I18NEXT
 * 
 * Este arquivo configura o sistema de internacionalização do projeto.
 * 
 * 1. LanguageDetector: Detecta automaticamente o idioma do navegador
 *    - Primeiro verifica localStorage (se o usuário já escolheu)
 *    - Depois verifica o idioma do navegador (navigator.language)
 *    - Fallback: português (pt-BR)
 * 
 * 2. Namespaces: Organizamos traduções em "namespaces" (comuns, navegação, home, etc.)
 *    - Facilita manutenção
 *    - Permite carregar só o que precisa
 *    - Organiza melhor arquivos grandes
 * 
 * 3. Interpolação: Permite variáveis nas traduções
 *    - Exemplo: "Olá {{name}}" → t('greeting', { name: 'João' })
 * 
 * 4. Fallback: Se uma tradução não existir, usa o idioma padrão
 */
i18n
  // Plugin para detectar idioma do navegador
  .use(LanguageDetector)
  // Plugin para integração com React
  .use(initReactI18next)
  // Inicializar configuração
  .init({
    // Idioma padrão (fallback)
    fallbackLng: 'pt',
    
    // Namespaces (categorias de traduções)
    // Isso permite organizar: t('common.button'), t('home.title'), etc.
    ns: ['common', 'navigation', 'home', 'chat', 'contact'],
    defaultNS: 'common',
    
    // Recursos (traduções)
    resources: {
      pt: {
        common: ptCommon,
        navigation: ptNavigation,
        home: ptHome,
        chat: ptChat,
        contact: ptContact,
      },
      en: {
        common: enCommon,
        navigation: enNavigation,
        home: enHome,
        chat: enChat,
        contact: enContact,
      },
      es: {
        common: esCommon,
        navigation: esNavigation,
        home: esHome,
        chat: esChat,
        contact: esContact,
      },
    },
    
    // Configurações de detecção
    detection: {
      // Onde procurar o idioma (ordem de prioridade)
      order: ['localStorage', 'navigator'],
      // Chave no localStorage onde salvar preferência
      lookupLocalStorage: 'i18nextLng',
      // Cache da detecção
      caches: ['localStorage'],
    },
    
    // Interpolação (uso de variáveis)
    interpolation: {
      escapeValue: false, // React já faz escape automaticamente
    },
    
    // Debug (desabilitar em produção)
    debug: import.meta.env.DEV,
    
    // Comportamento de carregamento
    load: 'currentOnly', // Carrega apenas idioma atual (mais rápido)
  });

export default i18n;

