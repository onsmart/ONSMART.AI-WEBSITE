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
              {t('whyAdopt.title', { service: serviceTranslations?.title || service.name })}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {serviceKey ? t(`whyAdopt.sections.${serviceKey}.title`, { defaultValue: 'Automação Inteligente' }) : 'Automação Inteligente'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {serviceKey ? t(`whyAdopt.sections.${serviceKey}.description`, { defaultValue: 'Agentes de IA automatizam processos complexos, reduzindo custos operacionais e aumentando a eficiência da sua equipe.' }) : 'Agentes de IA automatizam processos complexos, reduzindo custos operacionais e aumentando a eficiência da sua equipe.'}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('whyAdopt.strategicBenefits.title')}
              </h3>
              <ul className="space-y-3">
                {(() => {
                  const benefits = serviceKey 
                    ? (t(`whyAdopt.sections.${serviceKey}.benefits`, { returnObjects: true }) as string[])
                    : (t('whyAdopt.strategicBenefits.default', { returnObjects: true }) as string[]);
                  return benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                    </li>
                  ));
                })()}
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
                {serviceKey 
                  ? t(`whyAdopt.cta.title.${serviceKey}`, { 
                      defaultValue: t('whyAdopt.cta.title.default', { service: serviceTranslations?.title || service.name })
                    })
                  : t('whyAdopt.cta.title.default', { service: serviceTranslations?.title || service.name })
                }
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('whyAdopt.cta.subtitle')}
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