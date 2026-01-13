import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp } from 'lucide-react';
import { getServiceBySlug } from '@/data/servicesData';
import NotFound from '@/pages/NotFound';
import ServiceChart from '@/components/shared/ServiceChart';
import { useTranslation } from 'react-i18next';

const ServiceDynamic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation(['servicos', 'common']);
  
  // Mapear slugs para keys de tradução
  const slugToKeyMap: Record<string, string> = {
    'diagnostico-ia': 'diagnostico',
    'aceleracao-adocao-ia': 'aceleracao',
    'implementacao-tecnica': 'implementacao',
    'analise-dados': 'analise',
    'treinamento-ia': 'treinamento',
    'suporte-continuo': 'suporte'
  };

  if (!slug) {
    return <NotFound />;
  }

  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

  const serviceKey = slugToKeyMap[slug] || '';
  const serviceTranslations = serviceKey ? t(`services.items.${serviceKey}`, { returnObjects: true }) as any : null;

  const handleContactClick = () => {
    navigate('/contato');
  };

  // Configurações específicas por serviço
  const getServiceConfig = (serviceSlug: string) => {
    switch (serviceSlug) {
      case 'diagnostico-ia':
        return {
          chartType: 'bar' as const,
          chartTitle: t('chartTitles.potentialAnalysis'),
          icon: <CheckCircle className="h-6 w-6 text-white" />
        };
      case 'aceleracao-adocao-ia':
        return {
          chartType: 'growth' as const,
          chartTitle: t('chartTitles.adoptionGrowth'),
          icon: <TrendingUp className="h-6 w-6 text-white" />
        };
      case 'implementacao-tecnica':
        return {
          chartType: 'bar' as const,
          chartTitle: t('chartTitles.technicalPerformance'),
          icon: <Users className="h-6 w-6 text-white" />
        };
      case 'analise-dados':
        return {
          chartType: 'line' as const,
          chartTitle: t('chartTitles.dataInsights'),
          icon: <TrendingUp className="h-6 w-6 text-white" />
        };
      case 'treinamento-ia':
        return {
          chartType: 'pie' as const,
          chartTitle: t('chartTitles.knowledgeDistribution'),
          icon: <Star className="h-6 w-6 text-white" />
        };
      case 'suporte-continuo':
        return {
          chartType: 'line' as const,
          chartTitle: t('chartTitles.continuousMonitoring'),
          icon: <CheckCircle className="h-6 w-6 text-white" />
        };
      default:
        return {
          chartType: 'bar' as const,
          chartTitle: t('chartTitles.serviceResults'),
          icon: <CheckCircle className="h-6 w-6 text-white" />
        };
    }
  };

  const config = getServiceConfig(service.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  {config.icon}
                </div>
                <span className="text-blue-600 font-semibold text-lg">
                  {serviceTranslations?.title || service.name}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {serviceTranslations?.heroTitle || service.heroTitle}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {serviceTranslations?.heroSubtitle || service.heroSubtitle || service.description}
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
              Por que adotar agentes de IA para {serviceTranslations?.title || service.name}?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {(() => {
                  switch (serviceKey) {
                    case 'diagnostico':
                      return 'Automatização Inteligente de Análises';
                    case 'aceleracao':
                      return 'Aceleração Estratégica de Implementação';
                    case 'implementacao':
                      return 'Implementação Técnica Otimizada';
                    case 'treinamento':
                      return 'Treinamento Personalizado e Contínuo';
                    case 'suporte':
                      return 'Suporte Proativo 24/7';
                    case 'analise':
                      return 'Análise de Dados em Tempo Real';
                    default:
                      return 'Automação Inteligente';
                  }
                })()}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {(() => {
                  switch (serviceKey) {
                    case 'diagnostico':
                      return 'Nossos agentes de IA realizam diagnósticos automatizados e contínuos, identificando oportunidades de melhoria em tempo real. Eles analisam processos, dados e métricas de desempenho, fornecendo insights acionáveis sem intervenção manual constante.';
                    case 'aceleracao':
                      return 'Agentes de IA aceleram significativamente a adoção de IA na sua empresa, automatizando processos de onboarding, treinamento e suporte. Eles garantem que sua equipe esteja sempre atualizada e preparada para utilizar as novas tecnologias de forma eficiente.';
                    case 'implementacao':
                      return 'A implementação técnica se torna mais rápida e precisa com agentes de IA. Eles automatizam configurações, testes e validações, reduzindo erros humanos e garantindo que todas as integrações sejam feitas corretamente desde o primeiro momento.';
                    case 'treinamento':
                      return 'Agentes de IA oferecem treinamento personalizado e adaptativo para cada membro da equipe. Eles identificam lacunas de conhecimento, criam conteúdos personalizados e acompanham o progresso, garantindo que todos dominem as ferramentas de IA.';
                    case 'suporte':
                      return 'Com agentes de IA, você tem suporte contínuo e proativo. Eles monitoram sistemas, identificam problemas antes que se tornem críticos, resolvem questões automaticamente e escalam apenas quando necessário, garantindo máxima disponibilidade.';
                    case 'analise':
                      return 'Agentes de IA transformam a análise de dados em um processo contínuo e automatizado. Eles processam grandes volumes de informação, identificam padrões, geram relatórios e alertas em tempo real, permitindo decisões mais rápidas e baseadas em dados.';
                    default:
                      return 'Agentes de IA automatizam processos complexos, reduzindo custos operacionais e aumentando a eficiência da sua equipe.';
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
                  switch (serviceKey) {
                    case 'diagnostico':
                      return [
                        'Redução de até 80% no tempo de análise de processos',
                        'Identificação automática de gargalos e oportunidades',
                        'Relatórios detalhados gerados automaticamente',
                        'Monitoramento contínuo sem necessidade de intervenção manual'
                      ];
                    case 'aceleracao':
                      return [
                        'Redução de 60% no tempo de adoção de novas tecnologias',
                        'Onboarding automatizado e personalizado para cada usuário',
                        'Suporte contínuo durante toda a jornada de transformação',
                        'Métricas de adoção em tempo real'
                      ];
                    case 'implementacao':
                      return [
                        'Implementação 3x mais rápida que métodos tradicionais',
                        'Redução de 90% em erros de configuração',
                        'Testes automatizados garantem qualidade desde o início',
                        'Documentação técnica gerada automaticamente'
                      ];
                    case 'treinamento':
                      return [
                        'Treinamento personalizado baseado no perfil de cada usuário',
                        'Aumento de 70% na retenção de conhecimento',
                        'Acompanhamento contínuo do progresso individual',
                        'Conteúdo atualizado automaticamente conforme novas funcionalidades'
                      ];
                    case 'suporte':
                      return [
                        'Disponibilidade 24/7 sem custos adicionais de equipe',
                        'Resolução automática de 85% dos problemas comuns',
                        'Alertas proativos antes que problemas se tornem críticos',
                        'Histórico completo de interações para análise contínua'
                      ];
                    case 'analise':
                      return [
                        'Processamento de dados em tempo real 24/7',
                        'Identificação automática de tendências e anomalias',
                        'Relatórios executivos gerados automaticamente',
                        'Integração com múltiplas fontes de dados simultaneamente'
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
                  const serviceName = serviceTranslations?.title || service.name;
                  switch (serviceKey) {
                    case 'diagnostico':
                      return 'Quer automatizar o diagnóstico de IA da sua empresa com agentes de IA?';
                    case 'aceleracao':
                      return 'Quer acelerar a adoção de IA na sua empresa com agentes de IA?';
                    case 'implementacao':
                      return 'Quer automatizar a implementação técnica de IA com agentes de IA?';
                    case 'treinamento':
                      return 'Quer automatizar o treinamento de IA da sua equipe com agentes de IA?';
                    case 'suporte':
                      return 'Quer automatizar o suporte contínuo de IA com agentes de IA?';
                    case 'analise':
                      return 'Quer automatizar a análise de dados da sua empresa com agentes de IA?';
                    default:
                      return `Quer automatizar ${serviceName.toLowerCase()} com agentes de IA?`;
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
                  {t('buttons.requestQuote')}
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

export default ServiceDynamic;