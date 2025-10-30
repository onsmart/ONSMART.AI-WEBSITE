import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar recursos de tradução
import ptCommon from '../locales/pt/common.json';
import ptNavigation from '../locales/pt/navigation.json';
import ptHome from '../locales/pt/home.json';
import ptChat from '../locales/pt/chat.json';
import ptContact from '../locales/pt/contact.json';
import ptProdutos from '../locales/pt/produtos.json';
import ptAgentesIA from '../locales/pt/agentesIA.json';
import ptSonia from '../locales/pt/sonia.json';

import enCommon from '../locales/en/common.json';
import enNavigation from '../locales/en/navigation.json';
import enHome from '../locales/en/home.json';
import enChat from '../locales/en/chat.json';
import enContact from '../locales/en/contact.json';
import enProdutos from '../locales/en/produtos.json';
import enAgentesIA from '../locales/en/agentesIA.json';
import enSonia from '../locales/en/sonia.json';

import esCommon from '../locales/es/common.json';
import esNavigation from '../locales/es/navigation.json';
import esHome from '../locales/es/home.json';
import esChat from '../locales/es/chat.json';
import esContact from '../locales/es/contact.json';
import esProdutos from '../locales/es/produtos.json';
import esAgentesIA from '../locales/es/agentesIA.json';
import esSonia from '../locales/es/sonia.json';
import ptGranite from '../locales/pt/granite.json';
import enGranite from '../locales/en/granite.json';
import esGranite from '../locales/es/granite.json';
import ptMetaLlama from '../locales/pt/metaLlama.json';
import enMetaLlama from '../locales/en/metaLlama.json';
import esMetaLlama from '../locales/es/metaLlama.json';
import ptWatsonxAI from '../locales/pt/watsonxAI.json';
import enWatsonxAI from '../locales/en/watsonxAI.json';
import esWatsonxAI from '../locales/es/watsonxAI.json';
import ptDataProductHub from '../locales/pt/dataProductHub.json';
import enDataProductHub from '../locales/en/dataProductHub.json';
import esDataProductHub from '../locales/es/dataProductHub.json';
import ptKnowledgeCatalog from '../locales/pt/knowledgeCatalog.json';
import enKnowledgeCatalog from '../locales/en/knowledgeCatalog.json';
import esKnowledgeCatalog from '../locales/es/knowledgeCatalog.json';
import ptMistral from '../locales/pt/mistral.json';
import enMistral from '../locales/en/mistral.json';
import esMistral from '../locales/es/mistral.json';
import ptWatsonxData from '../locales/pt/watsonxData.json';
import enWatsonxData from '../locales/en/watsonxData.json';
import esWatsonxData from '../locales/es/watsonxData.json';
import ptDataStage from '../locales/pt/dataStage.json';
import enDataStage from '../locales/en/dataStage.json';
import esDataStage from '../locales/es/dataStage.json';
import ptStreamsets from '../locales/pt/streamsets.json';
import enStreamsets from '../locales/en/streamsets.json';
import esStreamsets from '../locales/es/streamsets.json';
import ptStorageCeph from '../locales/pt/storageCeph.json';
import enStorageCeph from '../locales/en/storageCeph.json';
import esStorageCeph from '../locales/es/storageCeph.json';
import ptWatsonxOrchestrate from '../locales/pt/watsonxOrchestrate.json';
import enWatsonxOrchestrate from '../locales/en/watsonxOrchestrate.json';
import esWatsonxOrchestrate from '../locales/es/watsonxOrchestrate.json';
import ptWatsonxGovernance from '../locales/pt/watsonxGovernance.json';
import enWatsonxGovernance from '../locales/en/watsonxGovernance.json';
import esWatsonxGovernance from '../locales/es/watsonxGovernance.json';
import ptAiCodeAssistant from '../locales/pt/aiCodeAssistant.json';
import enAiCodeAssistant from '../locales/en/aiCodeAssistant.json';
import esAiCodeAssistant from '../locales/es/aiCodeAssistant.json';
import ptWatsonxCodeAssistant from '../locales/pt/watsonxCodeAssistant.json';
import enWatsonxCodeAssistant from '../locales/en/watsonxCodeAssistant.json';
import esWatsonxCodeAssistant from '../locales/es/watsonxCodeAssistant.json';
import ptMantaDataLineage from '../locales/pt/mantaDataLineage.json';
import enMantaDataLineage from '../locales/en/mantaDataLineage.json';
import esMantaDataLineage from '../locales/es/mantaDataLineage.json';
import ptPlanningAnalytics from '../locales/pt/planningAnalytics.json';
import enPlanningAnalytics from '../locales/en/planningAnalytics.json';
import esPlanningAnalytics from '../locales/es/planningAnalytics.json';
import ptGuardiumDataSecurityCenter from '../locales/pt/guardiumDataSecurityCenter.json';
import enGuardiumDataSecurityCenter from '../locales/en/guardiumDataSecurityCenter.json';
import esGuardiumDataSecurityCenter from '../locales/es/guardiumDataSecurityCenter.json';
import ptDataband from '../locales/pt/databand.json';
import enDataband from '../locales/en/databand.json';
import esDataband from '../locales/es/databand.json';
import ptServicos from '../locales/pt/servicos.json';
import enServicos from '../locales/en/servicos.json';
import esServicos from '../locales/es/servicos.json';
import ptSetores from '../locales/pt/setores.json';
import enSetores from '../locales/en/setores.json';
import esSetores from '../locales/es/setores.json';
import ptSolucoes from '../locales/pt/solucoes.json';
import enSolucoes from '../locales/en/solucoes.json';
import esSolucoes from '../locales/es/solucoes.json';
import ptSobre from '../locales/pt/sobre.json';
import enSobre from '../locales/en/sobre.json';
import esSobre from '../locales/es/sobre.json';

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
    ns: ['common', 'navigation', 'home', 'chat', 'contact', 'produtos', 'agentesIA', 'sonia', 'granite', 'metaLlama', 'watsonxAI', 'dataProductHub', 'knowledgeCatalog', 'mistral', 'watsonxData', 'dataStage', 'streamsets', 'storageCeph', 'watsonxOrchestrate', 'watsonxGovernance', 'watsonxCodeAssistant', 'aiCodeAssistant', 'mantaDataLineage', 'planningAnalytics', 'guardiumDataSecurityCenter', 'databand', 'servicos', 'setores', 'solucoes', 'sobre'],
    defaultNS: 'common',
    
    // Recursos (traduções)
    resources: {
      pt: {
        common: ptCommon,
        navigation: ptNavigation,
        home: ptHome,
        chat: ptChat,
        contact: ptContact,
        produtos: ptProdutos,
        agentesIA: ptAgentesIA,
        sonia: ptSonia,
        granite: ptGranite,
        metaLlama: ptMetaLlama,
        watsonxAI: ptWatsonxAI,
        dataProductHub: ptDataProductHub,
        knowledgeCatalog: ptKnowledgeCatalog,
        mistral: ptMistral,
        watsonxData: ptWatsonxData,
        dataStage: ptDataStage,
        streamsets: ptStreamsets,
        storageCeph: ptStorageCeph,
        watsonxOrchestrate: ptWatsonxOrchestrate,
        watsonxGovernance: ptWatsonxGovernance,
        watsonxCodeAssistant: ptWatsonxCodeAssistant,
        aiCodeAssistant: ptAiCodeAssistant,
        mantaDataLineage: ptMantaDataLineage,
        planningAnalytics: ptPlanningAnalytics,
        guardiumDataSecurityCenter: ptGuardiumDataSecurityCenter,
        databand: ptDataband,
        servicos: ptServicos,
        setores: ptSetores,
        solucoes: ptSolucoes,
        sobre: ptSobre,
      },
      en: {
        common: enCommon,
        navigation: enNavigation,
        home: enHome,
        chat: enChat,
        contact: enContact,
        produtos: enProdutos,
        agentesIA: enAgentesIA,
        sonia: enSonia,
        granite: enGranite,
        metaLlama: enMetaLlama,
        watsonxAI: enWatsonxAI,
        dataProductHub: enDataProductHub,
        knowledgeCatalog: enKnowledgeCatalog,
        mistral: enMistral,
        watsonxData: enWatsonxData,
        dataStage: enDataStage,
        streamsets: enStreamsets,
        storageCeph: enStorageCeph,
        watsonxOrchestrate: enWatsonxOrchestrate,
        watsonxGovernance: enWatsonxGovernance,
        watsonxCodeAssistant: enWatsonxCodeAssistant,
        aiCodeAssistant: enAiCodeAssistant,
        mantaDataLineage: enMantaDataLineage,
        planningAnalytics: enPlanningAnalytics,
        guardiumDataSecurityCenter: enGuardiumDataSecurityCenter,
        databand: enDataband,
        servicos: enServicos,
        setores: enSetores,
        solucoes: enSolucoes,
        sobre: enSobre,
      },
      es: {
        common: esCommon,
        navigation: esNavigation,
        home: esHome,
        chat: esChat,
        contact: esContact,
        produtos: esProdutos,
        agentesIA: esAgentesIA,
        sonia: esSonia,
        granite: esGranite,
        metaLlama: esMetaLlama,
        watsonxAI: esWatsonxAI,
        dataProductHub: esDataProductHub,
        knowledgeCatalog: esKnowledgeCatalog,
        mistral: esMistral,
        watsonxData: esWatsonxData,
        dataStage: esDataStage,
        streamsets: esStreamsets,
        storageCeph: esStorageCeph,
        watsonxOrchestrate: esWatsonxOrchestrate,
        watsonxGovernance: esWatsonxGovernance,
        watsonxCodeAssistant: esWatsonxCodeAssistant,
        aiCodeAssistant: esAiCodeAssistant,
        mantaDataLineage: esMantaDataLineage,
        planningAnalytics: esPlanningAnalytics,
        guardiumDataSecurityCenter: esGuardiumDataSecurityCenter,
        databand: esDataband,
        servicos: esServicos,
        setores: esSetores,
        solucoes: esSolucoes,
        sobre: esSobre,
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

