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
import ptContato from '../locales/pt/contato.json';
import enContato from '../locales/en/contato.json';
import esContato from '../locales/es/contato.json';
import ptBlog from '../locales/pt/blog.json';
import enBlog from '../locales/en/blog.json';
import esBlog from '../locales/es/blog.json';
import ptDiagnostico from '../locales/pt/diagnostico.json';
import enDiagnostico from '../locales/en/diagnostico.json';
import esDiagnostico from '../locales/es/diagnostico.json';
import ptPlanos from '../locales/pt/planos.json';
import enPlanos from '../locales/en/planos.json';
import esPlanos from '../locales/es/planos.json';
import ptRevendas from '../locales/pt/revendas.json';
import enRevendas from '../locales/en/revendas.json';
import esRevendas from '../locales/es/revendas.json';
import ptAgentesDigitais from '../locales/pt/agentesDigitais.json';
import enAgentesDigitais from '../locales/en/agentesDigitais.json';
import esAgentesDigitais from '../locales/es/agentesDigitais.json';
import ptNotFound from '../locales/pt/notFound.json';
import enNotFound from '../locales/en/notFound.json';
import esNotFound from '../locales/es/notFound.json';
import ptConteudo from '../locales/pt/conteudo.json';
import enConteudo from '../locales/en/conteudo.json';
import esConteudo from '../locales/es/conteudo.json';
import ptFerramentasGratuitas from '../locales/pt/ferramentasGratuitas.json';
import enFerramentasGratuitas from '../locales/en/ferramentasGratuitas.json';
import esFerramentasGratuitas from '../locales/es/ferramentasGratuitas.json';
import ptMateriaisGratuitos from '../locales/pt/materiaisGratuitos.json';
import enMateriaisGratuitos from '../locales/en/materiaisGratuitos.json';
import esMateriaisGratuitos from '../locales/es/materiaisGratuitos.json';
import ptGlossario from '../locales/pt/glossario.json';
import enGlossario from '../locales/en/glossario.json';
import esGlossario from '../locales/es/glossario.json';
import ptNossosProdutos from '../locales/pt/nossosProdutos.json';
import enNossosProdutos from '../locales/en/nossosProdutos.json';
import esNossosProdutos from '../locales/es/nossosProdutos.json';
import ptAgentesDigitaisComissoes from '../locales/pt/agentesDigitaisComissoes.json';
import enAgentesDigitaisComissoes from '../locales/en/agentesDigitaisComissoes.json';
import esAgentesDigitaisComissoes from '../locales/es/agentesDigitaisComissoes.json';
import ptAgentesDigitaisCadastro from '../locales/pt/agentesDigitaisCadastro.json';
import enAgentesDigitaisCadastro from '../locales/en/agentesDigitaisCadastro.json';
import esAgentesDigitaisCadastro from '../locales/es/agentesDigitaisCadastro.json';
import ptRevendasCadastro from '../locales/pt/revendasCadastro.json';
import enRevendasCadastro from '../locales/en/revendasCadastro.json';
import esRevendasCadastro from '../locales/es/revendasCadastro.json';
import ptRevendasBeneficios from '../locales/pt/revendasBeneficios.json';
import enRevendasBeneficios from '../locales/en/revendasBeneficios.json';
import esRevendasBeneficios from '../locales/es/revendasBeneficios.json';
import ptAdmin from '../locales/pt/admin.json';
import enAdmin from '../locales/en/admin.json';
import esAdmin from '../locales/es/admin.json';
import ptDockerMonitor from '../locales/pt/dockerMonitor.json';
import enDockerMonitor from '../locales/en/dockerMonitor.json';
import esDockerMonitor from '../locales/es/dockerMonitor.json';
import ptImageTest from '../locales/pt/imageTest.json';
import enImageTest from '../locales/en/imageTest.json';
import esImageTest from '../locales/es/imageTest.json';
import ptBlogPost from '../locales/pt/blogPost.json';
import enBlogPost from '../locales/en/blogPost.json';
import esBlogPost from '../locales/es/blogPost.json';
import ptUniversityAgentesIA from '../locales/pt/universityAgentesIA.json';
import enUniversityAgentesIA from '../locales/en/universityAgentesIA.json';
import esUniversityAgentesIA from '../locales/es/universityAgentesIA.json';
import ptUniversityIABasico from '../locales/pt/universityIABasico.json';
import enUniversityIABasico from '../locales/en/universityIABasico.json';
import esUniversityIABasico from '../locales/es/universityIABasico.json';
import ptIndex from '../locales/pt/index.json';
import enIndex from '../locales/en/index.json';
import esIndex from '../locales/es/index.json';
import ptPoliticaPrivacidade from '../locales/pt/politicaPrivacidade.json';
import enPoliticaPrivacidade from '../locales/en/politicaPrivacidade.json';
import esPoliticaPrivacidade from '../locales/es/politicaPrivacidade.json';
import ptTermosUso from '../locales/pt/termosUso.json';
import enTermosUso from '../locales/en/termosUso.json';
import esTermosUso from '../locales/es/termosUso.json';

/**
 * CONFIGURAÇÃO DO I18NEXT - OTIMIZADA
 * 
 * Este arquivo configura o sistema de internacionalização do projeto.
 * 
 * 📋 ESTRUTURA:
 * - Common: Traduções compartilhadas (botões, labels, mensagens genéricas)
 * - Navigation: Menus e navegação
 * - Pages: Traduções específicas de cada página
 * - Products: Traduções específicas de produtos IBM
 * 
 * ⚡ OTIMIZAÇÕES:
 * - Todos os namespaces carregados de uma vez (boa performance para apps SPA)
 * - Fallback para 'pt' quando tradução não existe
 * - Cache no localStorage para preferência do usuário
 * - Interpolação ativada para variáveis dinâmicas
 * 
 * 🔧 CONFIGURAÇÕES:
 * 1. LanguageDetector: Detecta automaticamente o idioma
 *    - Ordem: localStorage → navigator.language → fallback 'pt'
 * 
 * 2. Namespaces: Organiza traduções por categoria
 *    - Facilita manutenção e organização
 *    - Permite lazy loading futuro se necessário
 * 
 * 3. Interpolação: Variáveis nas traduções
 *    - Exemplo: "Olá {{name}}" → t('greeting', { name: 'João' })
 * 
 * 4. Debug: Habilitado apenas em desenvolvimento
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
    ns: ['common', 'navigation', 'home', 'chat', 'contact', 'produtos', 'agentesIA', 'sonia', 'granite', 'metaLlama', 'watsonxAI', 'dataProductHub', 'knowledgeCatalog', 'mistral', 'watsonxData', 'dataStage', 'streamsets', 'storageCeph', 'watsonxOrchestrate', 'watsonxGovernance', 'watsonxCodeAssistant', 'aiCodeAssistant', 'mantaDataLineage', 'planningAnalytics', 'guardiumDataSecurityCenter', 'databand', 'servicos', 'setores', 'solucoes', 'sobre', 'contato', 'blog', 'diagnostico', 'planos', 'revendas', 'agentesDigitais', 'notFound', 'conteudo', 'ferramentasGratuitas', 'materiaisGratuitos', 'glossario', 'nossosProdutos', 'agentesDigitaisComissoes', 'agentesDigitaisCadastro', 'revendasCadastro', 'revendasBeneficios', 'admin', 'dockerMonitor', 'imageTest', 'blogPost', 'universityAgentesIA', 'universityIABasico', 'index', 'politicaPrivacidade', 'termosUso'],
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
        contato: ptContato,
        blog: ptBlog,
        diagnostico: ptDiagnostico,
        planos: ptPlanos,
        revendas: ptRevendas,
        agentesDigitais: ptAgentesDigitais,
        notFound: ptNotFound,
        conteudo: ptConteudo,
        ferramentasGratuitas: ptFerramentasGratuitas,
        materiaisGratuitos: ptMateriaisGratuitos,
        glossario: ptGlossario,
        nossosProdutos: ptNossosProdutos,
        agentesDigitaisComissoes: ptAgentesDigitaisComissoes,
        agentesDigitaisCadastro: ptAgentesDigitaisCadastro,
        revendasCadastro: ptRevendasCadastro,
        revendasBeneficios: ptRevendasBeneficios,
        admin: ptAdmin,
        dockerMonitor: ptDockerMonitor,
        imageTest: ptImageTest,
        blogPost: ptBlogPost,
        universityAgentesIA: ptUniversityAgentesIA,
        universityIABasico: ptUniversityIABasico,
        index: ptIndex,
        politicaPrivacidade: ptPoliticaPrivacidade,
        termosUso: ptTermosUso,
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
        contato: enContato,
        blog: enBlog,
        diagnostico: enDiagnostico,
        planos: enPlanos,
        revendas: enRevendas,
        agentesDigitais: enAgentesDigitais,
        notFound: enNotFound,
        conteudo: enConteudo,
        ferramentasGratuitas: enFerramentasGratuitas,
        materiaisGratuitos: enMateriaisGratuitos,
        glossario: enGlossario,
        nossosProdutos: enNossosProdutos,
        agentesDigitaisComissoes: enAgentesDigitaisComissoes,
        agentesDigitaisCadastro: enAgentesDigitaisCadastro,
        revendasCadastro: enRevendasCadastro,
        revendasBeneficios: enRevendasBeneficios,
        admin: enAdmin,
        dockerMonitor: enDockerMonitor,
        imageTest: enImageTest,
        blogPost: enBlogPost,
        universityAgentesIA: enUniversityAgentesIA,
        universityIABasico: enUniversityIABasico,
        index: enIndex,
        politicaPrivacidade: enPoliticaPrivacidade,
        termosUso: enTermosUso,
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
        contato: esContato,
        blog: esBlog,
        diagnostico: esDiagnostico,
        planos: esPlanos,
        revendas: esRevendas,
        agentesDigitais: esAgentesDigitais,
        notFound: esNotFound,
        conteudo: esConteudo,
        ferramentasGratuitas: esFerramentasGratuitas,
        materiaisGratuitos: esMateriaisGratuitos,
        glossario: esGlossario,
        nossosProdutos: esNossosProdutos,
        agentesDigitaisComissoes: esAgentesDigitaisComissoes,
        agentesDigitaisCadastro: esAgentesDigitaisCadastro,
        revendasCadastro: esRevendasCadastro,
        revendasBeneficios: esRevendasBeneficios,
        admin: esAdmin,
        dockerMonitor: esDockerMonitor,
        imageTest: esImageTest,
        blogPost: esBlogPost,
        universityAgentesIA: esUniversityAgentesIA,
        universityIABasico: esUniversityIABasico,
        index: esIndex,
        politicaPrivacidade: esPoliticaPrivacidade,
        termosUso: esTermosUso,
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

