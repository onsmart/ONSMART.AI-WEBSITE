import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Stethoscope, Home, ShoppingBag, Scale, Banknote, Phone, Package, Factory, CheckCircle } from 'lucide-react';
import { getSectorBySlug } from '@/data/sectorsData';
import NotFound from '@/pages/NotFound';
import ServiceChart from '@/components/shared/ServiceChart';
import { useTranslation } from 'react-i18next';

const SectorDynamic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['setores', 'common']);
  
  if (!slug) {
    return <NotFound />;
  }

  const sector = getSectorBySlug(slug);
  
  if (!sector) {
    return <NotFound />;
  }

  const handleContactClick = () => {
    navigate('/contato');
  };

  // Configurações específicas por setor
  const getSectorConfig = (sectorSlug: string) => {
    switch (sectorSlug) {
      case 'advocacia':
        return {
          chartType: 'bar' as const,
          chartTitle: t('setores:chartTitles.legalAutomation'),
          icon: <Scale className="h-6 w-6 text-white" />
        };
      case 'bancos':
        return {
          chartType: 'line' as const,
          chartTitle: t('setores:chartTitles.creditAnalysis'),
          icon: <Banknote className="h-6 w-6 text-white" />
        };
      case 'comercio':
        return {
          chartType: 'growth' as const,
          chartTitle: t('setores:chartTitles.salesGrowth'),
          icon: <ShoppingBag className="h-6 w-6 text-white" />
        };
      case 'industria':
        return {
          chartType: 'bar' as const,
          chartTitle: t('setores:chartTitles.industrialEfficiency'),
          icon: <Factory className="h-6 w-6 text-white" />
        };
      case 'saude':
        return {
          chartType: 'pie' as const,
          chartTitle: t('setores:chartTitles.healthAnalytics'),
          icon: <Stethoscope className="h-6 w-6 text-white" />
        };
      case 'telecomunicacoes':
        return {
          chartType: 'line' as const,
          chartTitle: t('setores:chartTitles.telecomAnalytics'),
          icon: <Phone className="h-6 w-6 text-white" />
        };
      case 'varejo':
        return {
          chartType: 'growth' as const,
          chartTitle: t('setores:chartTitles.retailOptimization'),
          icon: <Package className="h-6 w-6 text-white" />
        };
      case 'setor-imobiliario':
        return {
          chartType: 'bar' as const,
          chartTitle: t('setores:chartTitles.realEstateInsights'),
          icon: <Home className="h-6 w-6 text-white" />
        };
      default:
        return {
          chartType: 'bar' as const,
          chartTitle: t('setores:chartTitles.sectorResults'),
          icon: <Building2 className="h-6 w-6 text-white" />
        };
    }
  };

  const config = getSectorConfig(sector.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  {config.icon}
                </div>
                <span className="text-blue-600 font-semibold text-lg">
                  {t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name })}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {t(`setores:sectors.${sector.id}.heroTitle`, { defaultValue: sector.heroTitle })}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t(`setores:sectors.${sector.id}.heroSubtitle`, { defaultValue: sector.heroSubtitle })}
              </p>
            </div>
            
            <div className="relative">
              <ServiceChart type={config.chartType} title={config.chartTitle} />
            </div>
          </div>
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Por que adotar agentes de IA para {t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name })}?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {(() => {
                  switch (sector.id) {
                    case 'advocacia':
                      return 'Automação Jurídica Inteligente';
                    case 'bancos':
                      return 'Transformação Digital Financeira';
                    case 'comercio':
                      return 'Otimização de Operações Comerciais';
                    case 'industria':
                      return 'Indústria 4.0 com IA';
                    case 'saude':
                      return 'Assistência Médica Inteligente';
                    case 'telecomunicacoes':
                      return 'Telecomunicações de Nova Geração';
                    case 'varejo':
                      return 'Varejo Inteligente e Personalizado';
                    case 'setor-imobiliario':
                      return 'Imobiliária Digital e Eficiente';
                    default:
                      return 'Automação Inteligente';
                  }
                })()}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {(() => {
                  switch (sector.id) {
                    case 'advocacia':
                      return 'Agentes de IA transformam escritórios de advocacia ao automatizar pesquisas jurídicas, geração de petições e atendimento ao cliente. Eles reduzem drasticamente o tempo gasto em tarefas repetitivas, permitindo que advogados se concentrem em estratégias e casos complexos, aumentando a produtividade e a qualidade do serviço.';
                    case 'bancos':
                      return 'No setor bancário, agentes de IA automatizam análise de crédito, detecção de fraudes e atendimento ao cliente. Eles processam grandes volumes de transações em tempo real, identificam padrões suspeitos e oferecem recomendações personalizadas, melhorando a segurança e a experiência do cliente.';
                    case 'comercio':
                      return 'Agentes de IA otimizam operações comerciais através da automação de gestão de estoque, previsão de demanda e atendimento ao cliente. Eles analisam tendências de mercado, ajustam preços dinamicamente e personalizam recomendações, resultando em maior eficiência operacional e aumento de vendas.';
                    case 'industria':
                      return 'Na indústria, agentes de IA automatizam manutenção preditiva, controle de qualidade e otimização de produção. Eles monitoram equipamentos em tempo real, preveem falhas antes que ocorram e otimizam processos de manufatura, reduzindo custos e aumentando a eficiência produtiva.';
                    case 'saude':
                      return 'No setor de saúde, agentes de IA auxiliam em diagnósticos, agendamento de consultas e gestão de prontuários. Eles analisam exames médicos, identificam padrões em sintomas e automatizam processos administrativos, permitindo que profissionais de saúde foquem no cuidado ao paciente.';
                    case 'telecomunicacoes':
                      return 'Agentes de IA revolucionam telecomunicações ao automatizar suporte técnico, otimização de redes e análise de tráfego. Eles resolvem problemas de conectividade automaticamente, otimizam a distribuição de banda e personalizam planos de serviço, melhorando a experiência do cliente e reduzindo custos operacionais.';
                    case 'varejo':
                      return 'No varejo, agentes de IA personalizam experiências de compra, otimizam precificação e gerenciam inventário. Eles analisam comportamento do consumidor, recomendam produtos relevantes e ajustam estratégias de marketing em tempo real, aumentando conversões e fidelização.';
                    case 'setor-imobiliario':
                      return 'Agentes de IA transformam o setor imobiliário automatizando busca de propriedades, qualificação de leads e agendamento de visitas. Eles analisam preferências de clientes, sugerem propriedades compatíveis e automatizam processos de documentação, acelerando vendas e locações.';
                    default:
                      return 'Agentes de IA automatizam processos específicos do seu setor, reduzindo custos operacionais e aumentando a eficiência da sua equipe.';
                  }
                })()}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Benefícios Estratégicos
              </h3>
              <ul className="space-y-3">
                {(() => {
                  switch (sector.id) {
                    case 'advocacia':
                      return [
                        'Redução de 75% no tempo de pesquisa jurídica',
                        'Geração automática de petições em minutos',
                        'Zero perda de prazos processuais',
                        'Atendimento ao cliente 24/7 automatizado'
                      ];
                    case 'bancos':
                      return [
                        'Análise de crédito 10x mais rápida',
                        'Detecção de fraudes em tempo real',
                        'Redução de 60% em custos operacionais',
                        'Experiência do cliente altamente personalizada'
                      ];
                    case 'comercio':
                      return [
                        'Otimização automática de estoque reduz desperdícios',
                        'Previsão de demanda com 95% de precisão',
                        'Aumento de 40% em vendas através de personalização',
                        'Gestão de preços dinâmica e inteligente'
                      ];
                    case 'industria':
                      return [
                        'Manutenção preditiva reduz paradas em 80%',
                        'Controle de qualidade automatizado',
                        'Otimização de produção aumenta eficiência em 50%',
                        'Redução de custos operacionais significativa'
                      ];
                    case 'saude':
                      return [
                        'Auxílio em diagnóstico com maior precisão',
                        'Agendamento automatizado reduz esperas',
                        'Gestão de prontuários eletrônicos eficiente',
                        'Análise de exames em tempo real'
                      ];
                    case 'telecomunicacoes':
                      return [
                        'Resolução automática de 85% dos problemas técnicos',
                        'Otimização de rede em tempo real',
                        'Redução de 50% em chamados de suporte',
                        'Personalização de planos baseada em uso'
                      ];
                    case 'varejo':
                      return [
                        'Personalização aumenta conversões em 60%',
                        'Otimização de precificação em tempo real',
                        'Gestão inteligente de inventário',
                        'Recomendações de produtos altamente precisas'
                      ];
                    case 'setor-imobiliario':
                      return [
                        'Qualificação automática de leads',
                        'Matching inteligente entre clientes e propriedades',
                        'Agendamento automatizado de visitas',
                        'Processamento de documentação 5x mais rápido'
                      ];
                    default:
                      return [
                        'Aumento significativo na produtividade',
                        'Redução de custos operacionais',
                        'Melhoria na qualidade dos processos',
                        'Escalabilidade sem limites'
                      ];
                  }
                })().map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Automation */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {(() => {
                  const sectorName = t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name });
                  switch (sector.id) {
                    case 'advocacia':
                      return 'Quer automatizar seu escritório de advocacia com agentes de IA?';
                    case 'bancos':
                      return 'Quer automatizar seu banco ou instituição financeira com agentes de IA?';
                    case 'comercio':
                      return 'Quer automatizar seu comércio com agentes de IA?';
                    case 'industria':
                      return 'Quer automatizar sua indústria com agentes de IA?';
                    case 'saude':
                      return 'Quer automatizar sua clínica ou hospital com agentes de IA?';
                    case 'telecomunicacoes':
                      return 'Quer automatizar sua empresa de telecomunicações com agentes de IA?';
                    case 'varejo':
                      return 'Quer automatizar seu varejo com agentes de IA?';
                    case 'setor-imobiliario':
                      return 'Quer automatizar seu setor imobiliário com agentes de IA?';
                    default:
                      return `Quer automatizar ${sectorName.toLowerCase()} com agentes de IA?`;
                  }
                })()}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Entre em contato conosco ou marque uma reunião com nosso especialista
              </p>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleContactClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t('setores:buttons.requestQuote')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SectorDynamic;
