import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Servicos from '@/pages/Servicos';
import Contato from '@/pages/Contato';
import Diagnostico from '@/pages/Diagnostico';
import Conteudo from '@/pages/Conteudo';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import NotFound from '@/pages/NotFound';
import PoliticaPrivacidade from '@/pages/PoliticaPrivacidade';
import TermosUso from '@/pages/TermosUso';
import Planos from '@/pages/Planos';
import WhatsappAgents from '@/pages/WhatsappAgents';
import MateriaisGratuitos from '@/pages/MateriaisGratuitos';
import FerramentasGratuitas from '@/pages/FerramentasGratuitas';
import Glossario from '@/pages/Glossario';
import IABasico from '@/pages/university/IABasico';
import AgentesIAUniversity from '@/pages/university/AgentesIA';
import Admin from '@/pages/Admin';
import EcossistemaIBM from '@/pages/EcossistemaIBM';
import AgentesIA from '@/pages/AgentesIA';
import Sobre from '@/pages/Sobre';
import ImageTest from '@/pages/ImageTest';

// Páginas de Soluções
import AutomacaoVendas from '@/pages/solucoes/AutomacaoVendas';
import AtendimentoInteligente from '@/pages/solucoes/AtendimentoInteligente';
import RHInteligente from '@/pages/solucoes/RHInteligente';
import BIAnalytics from '@/pages/solucoes/BIAnalytics';
import AutomacaoProcessos from '@/pages/solucoes/AutomacaoProcessos';
import VozLinguagem from '@/pages/solucoes/VozLinguagem';

// Páginas individuais dos produtos
import AICodeAssistant from '@/pages/produtos/AICodeAssistant';
import Granite from '@/pages/produtos/Granite';
import WatsonXAI from '@/pages/produtos/WatsonXAI';
import WatsonXData from '@/pages/produtos/WatsonXData';
import WatsonXOrchestrate from '@/pages/produtos/WatsonXOrchestrate';
import WatsonXGovernance from '@/pages/produtos/WatsonXGovernance';
import MetaLlama from '@/pages/produtos/MetaLlama';
import KnowledgeCatalog from '@/pages/produtos/KnowledgeCatalog';
import DataProductHub from '@/pages/produtos/DataProductHub';
import DataStage from '@/pages/produtos/DataStage';
import PlanningAnalytics from '@/pages/produtos/PlanningAnalytics';
import Mistral from '@/pages/produtos/Mistral';
import MantaDataLineage from '@/pages/produtos/MantaDataLineage';
import Databand from '@/pages/produtos/Databand';
import Streamsets from '@/pages/produtos/Streamsets';
import GuardiumDataSecurityCenter from '@/pages/produtos/GuardiumDataSecurityCenter';
import StorageCeph from '@/pages/produtos/StorageCeph';
import WatsonXCodeAssistant from '@/pages/produtos/WatsonXCodeAssistant';
import SoniaAssistenteIA from '@/pages/produtos/SoniaAssistenteIA';

// Páginas de Revendas
import Revendas from '@/pages/Revendas';
import RevendasBeneficios from '@/pages/RevendasBeneficios';
import RevendasCadastro from '@/pages/RevendasCadastro';

// Páginas de Agentes Digitais
import AgentesDigitais from '@/pages/AgentesDigitais';
import AgentesDigitaisComissoes from '@/pages/AgentesDigitaisComissoes';
import AgentesDigitaisCadastro from '@/pages/AgentesDigitaisCadastro';

// Páginas de Setores
import Setores from '@/pages/setores/Setores';
import SectorDynamic from '@/pages/setores/SectorDynamic';

// Páginas de Serviços
import ServiceDynamic from '@/pages/servicos/ServiceDynamic';

const SimpleAppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/servicos/:slug" element={<ServiceDynamic />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/diagnostico" element={<Diagnostico />} />
      <Route path="/conteudo" element={<Conteudo />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/materiais-gratuitos" element={<MateriaisGratuitos />} />
      <Route path="/ferramentas-gratuitas" element={<FerramentasGratuitas />} />
      <Route path="/glossario-ia" element={<Glossario />} />
      <Route path="/university/ia-basico" element={<IABasico />} />
      <Route path="/university/agentes-ia" element={<AgentesIAUniversity />} />
      <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
      <Route path="/termos-uso" element={<TermosUso />} />
      <Route path="/planos" element={<Planos />} />
      <Route path="/whatsapp-agents" element={<WhatsappAgents />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/ecossistema-ibm" element={<EcossistemaIBM />} />
      <Route path="/agentes-ia" element={<AgentesIA />} />
      <Route path="/sobre" element={<Sobre />} />
      
      {/* Rotas das páginas de soluções */}
      <Route path="/solucoes/automacao-vendas" element={<AutomacaoVendas />} />
      <Route path="/solucoes/atendimento-inteligente" element={<AtendimentoInteligente />} />
      <Route path="/solucoes/rh-inteligente" element={<RHInteligente />} />
      <Route path="/solucoes/bi-analytics" element={<BIAnalytics />} />
      <Route path="/solucoes/automacao-processos" element={<AutomacaoProcessos />} />
      <Route path="/solucoes/voz-linguagem" element={<VozLinguagem />} />
      
      {/* Rotas das páginas individuais dos produtos */}
      <Route path="/produtos/ai-code-assistant" element={<AICodeAssistant />} />
      <Route path="/produtos/granite" element={<Granite />} />
      <Route path="/produtos/watsonx-ai" element={<WatsonXAI />} />
      <Route path="/produtos/watsonx-data" element={<WatsonXData />} />
      <Route path="/produtos/watsonx-orchestrate" element={<WatsonXOrchestrate />} />
      <Route path="/produtos/watsonx-governance" element={<WatsonXGovernance />} />
      <Route path="/produtos/meta-llama" element={<MetaLlama />} />
      <Route path="/produtos/knowledge-catalog" element={<KnowledgeCatalog />} />
      <Route path="/produtos/data-product-hub" element={<DataProductHub />} />
      <Route path="/produtos/datastage" element={<DataStage />} />
      <Route path="/produtos/planning-analytics" element={<PlanningAnalytics />} />
      <Route path="/produtos/mistral" element={<Mistral />} />
      <Route path="/produtos/manta-data-lineage" element={<MantaDataLineage />} />
      <Route path="/produtos/databand" element={<Databand />} />
      <Route path="/produtos/streamsets" element={<Streamsets />} />
      <Route path="/produtos/guardium-data-security-center" element={<GuardiumDataSecurityCenter />} />
      <Route path="/produtos/storage-ceph" element={<StorageCeph />} />
      <Route path="/produtos/watsonx-code-assistant" element={<WatsonXCodeAssistant />} />
      <Route path="/produtos/sonia-assistente-ia" element={<SoniaAssistenteIA />} />
      
      {/* Rotas de Revendas */}
      <Route path="/revendas" element={<Revendas />} />
      <Route path="/revendas/beneficios" element={<RevendasBeneficios />} />
      <Route path="/revendas/cadastro" element={<RevendasCadastro />} />
      
      {/* Rotas de Agentes Digitais */}
      <Route path="/agentes-digitais" element={<AgentesDigitais />} />
      <Route path="/agentes-digitais/comissoes" element={<AgentesDigitaisComissoes />} />
      <Route path="/agentes-digitais/cadastro" element={<AgentesDigitaisCadastro />} />
      
      {/* Rotas de Setores */}
      <Route path="/setores" element={<Setores />} />
      <Route path="/setores/:slug" element={<SectorDynamic />} />
      
      {/* Rota de Teste de Imagens */}
      <Route path="/image-test" element={<ImageTest />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SimpleAppRoutes;