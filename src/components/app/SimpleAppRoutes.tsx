import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

// Páginas críticas - carregar imediatamente
import Index from '@/pages/Index';
import Servicos from '@/pages/Servicos';
import Contato from '@/pages/Contato';
import ContatoObrigado from '@/pages/ContatoObrigado';
import Diagnostico from '@/pages/Diagnostico';
import NotFound from '@/pages/NotFound';

// Páginas com lazy loading - carregar sob demanda
const Conteudo = lazy(() => import('@/pages/Conteudo'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const PoliticaPrivacidade = lazy(() => import('@/pages/PoliticaPrivacidade'));
const TermosUso = lazy(() => import('@/pages/TermosUso'));
const Planos = lazy(() => import('@/pages/Planos'));
const MateriaisGratuitos = lazy(() => import('@/pages/MateriaisGratuitos'));
const FerramentasGratuitas = lazy(() => import('@/pages/FerramentasGratuitas'));
const Glossario = lazy(() => import('@/pages/Glossario'));
const IABasico = lazy(() => import('@/pages/university/IABasico'));
const AgentesIAUniversity = lazy(() => import('@/pages/university/AgentesIA'));
const EcossistemaIBM = lazy(() => import('@/pages/EcossistemaIBM'));
const AgentesIA = lazy(() => import('@/pages/AgentesIA'));
const Sobre = lazy(() => import('@/pages/Sobre'));
const ImageTest = lazy(() => import('@/pages/ImageTest'));

// Páginas de Soluções - lazy loading
const AutomacaoVendas = lazy(() => import('@/pages/solucoes/AutomacaoVendas'));
const AtendimentoInteligente = lazy(() => import('@/pages/solucoes/AtendimentoInteligente'));
const RHInteligente = lazy(() => import('@/pages/solucoes/RHInteligente'));
const BIAnalytics = lazy(() => import('@/pages/solucoes/BIAnalytics'));
const AutomacaoProcessos = lazy(() => import('@/pages/solucoes/AutomacaoProcessos'));
const VozLinguagem = lazy(() => import('@/pages/solucoes/VozLinguagem'));

// Páginas individuais dos produtos - lazy loading (chunk separado)
const AICodeAssistant = lazy(() => import('@/pages/produtos/AICodeAssistant'));
const Granite = lazy(() => import('@/pages/produtos/Granite'));
const WatsonXAI = lazy(() => import('@/pages/produtos/WatsonXAI'));
const WatsonXData = lazy(() => import('@/pages/produtos/WatsonXData'));
const WatsonXOrchestrate = lazy(() => import('@/pages/produtos/WatsonXOrchestrate'));
const WatsonXGovernance = lazy(() => import('@/pages/produtos/WatsonXGovernance'));
const MetaLlama = lazy(() => import('@/pages/produtos/MetaLlama'));
const KnowledgeCatalog = lazy(() => import('@/pages/produtos/KnowledgeCatalog'));
const DataProductHub = lazy(() => import('@/pages/produtos/DataProductHub'));
const DataStage = lazy(() => import('@/pages/produtos/DataStage'));
const PlanningAnalytics = lazy(() => import('@/pages/produtos/PlanningAnalytics'));
const Mistral = lazy(() => import('@/pages/produtos/Mistral'));
const MantaDataLineage = lazy(() => import('@/pages/produtos/MantaDataLineage'));
const Databand = lazy(() => import('@/pages/produtos/Databand'));
const Streamsets = lazy(() => import('@/pages/produtos/Streamsets'));
const GuardiumDataSecurityCenter = lazy(() => import('@/pages/produtos/GuardiumDataSecurityCenter'));
const StorageCeph = lazy(() => import('@/pages/produtos/StorageCeph'));
const WatsonXCodeAssistant = lazy(() => import('@/pages/produtos/WatsonXCodeAssistant'));
const SoniaAssistenteIA = lazy(() => import('@/pages/produtos/SoniaAssistenteIA'));

// Páginas de Revendas - lazy loading
const Revendas = lazy(() => import('@/pages/Revendas'));
const RevendasBeneficios = lazy(() => import('@/pages/RevendasBeneficios'));
const RevendasCadastro = lazy(() => import('@/pages/RevendasCadastro'));

// Páginas de Agentes Digitais - lazy loading
const AgentesDigitais = lazy(() => import('@/pages/AgentesDigitais'));
const AgentesDigitaisComissoes = lazy(() => import('@/pages/AgentesDigitaisComissoes'));
const AgentesDigitaisCadastro = lazy(() => import('@/pages/AgentesDigitaisCadastro'));

// Páginas de Setores - lazy loading
const Setores = lazy(() => import('@/pages/setores/Setores'));
const SectorDynamic = lazy(() => import('@/pages/setores/SectorDynamic'));

// Páginas de Serviços - lazy loading
const ServiceDynamic = lazy(() => import('@/pages/servicos/ServiceDynamic'));

// Fallback component para lazy loading
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSkeleton variant="card" className="w-full max-w-4xl h-96" />
  </div>
);

const SimpleAppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/:slug" element={<Suspense fallback={<PageFallback />}><ServiceDynamic /></Suspense>} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/contato/obrigado" element={<ContatoObrigado />} />
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
    </Suspense>
  );
};

export default SimpleAppRoutes;