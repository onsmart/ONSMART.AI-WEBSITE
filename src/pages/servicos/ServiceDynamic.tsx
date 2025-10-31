import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, Calendar, Clock, DollarSign } from 'lucide-react';
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

  const handleDiagnosticoClick = () => {
    navigate('/diagnostico');
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
                  {serviceTranslations?.title || service.name}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {serviceTranslations?.heroTitle || service.heroTitle}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {serviceTranslations?.heroSubtitle || service.heroSubtitle || service.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleContactClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  {t('buttons.requestQuote')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleDiagnosticoClick}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 px-8 py-3 text-lg font-medium bg-white"
                >
                  {t('buttons.freeDiagnostic')}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <ServiceChart type={config.chartType} title={config.chartTitle} />
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('sections.features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('sections.features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(serviceTranslations?.detailedFeatures || service.features || []).map((feature: any, index: number) => {
              // Se for objeto, usar diretamente; se não, buscar da tradução ou service.features
              let featureData;
              if (typeof feature === 'object' && feature !== null && feature.title) {
                featureData = feature;
              } else if (serviceTranslations?.detailedFeatures?.[index]) {
                featureData = serviceTranslations.detailedFeatures[index];
              } else if (service.features[index] && typeof service.features[index] === 'object') {
                featureData = service.features[index];
              } else {
                featureData = {
                  title: feature || `Feature ${index + 1}`,
                  description: '',
                  benefits: []
                };
              }
              
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {featureData.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {featureData.description}
                  </p>
                  <ul className="space-y-2">
                    {(featureData.benefits || []).slice(0, 3).map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('sections.process.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('sections.process.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(serviceTranslations?.process || service.process || []).map((step: any, index: number) => {
              // Se for objeto com step, usar diretamente; se não, buscar da tradução ou service.process
              let stepData;
              if (typeof step === 'object' && step !== null && (step.step || step.title)) {
                stepData = step;
              } else if (serviceTranslations?.process?.[index]) {
                stepData = serviceTranslations.process[index];
              } else if (service.process[index] && typeof service.process[index] === 'object') {
                stepData = service.process[index];
              } else {
                stepData = {
                  step: index + 1,
                  title: step || `Step ${index + 1}`,
                  description: ''
                };
              }
              
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {stepData.step || (index + 1)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {stepData.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {stepData.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('sections.pricing.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('sections.pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(serviceTranslations?.pricing || service.pricing || []).map((plan: any, index: number) => {
              // Se for objeto com tier, usar diretamente; se não, buscar da tradução ou service.pricing
              let planData;
              if (typeof plan === 'object' && plan !== null && plan.tier) {
                planData = plan;
              } else if (serviceTranslations?.pricing?.[index]) {
                planData = serviceTranslations.pricing[index];
              } else if (service.pricing[index] && typeof service.pricing[index] === 'object') {
                planData = service.pricing[index];
              } else {
                planData = {
                  tier: plan || `Plan ${index + 1}`,
                  price: '',
                  features: []
                };
              }
              
              return (
                <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${index === 1 ? 'ring-2 ring-blue-600' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {planData.tier}
                    </h3>
                    <div className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                      {t('sections.pricing.completeSolution')}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {(planData.features || []).slice(0, 3).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={handleContactClick}
                    className={`w-full ${index === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                  >
                    {t('buttons.requestQuote')}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {serviceTranslations?.ctaTitle || service.ctaTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {serviceTranslations?.ctaSubtitle || service.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContactClick}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              {t('buttons.requestQuote')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleDiagnosticoClick}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium bg-transparent"
            >
              {t('buttons.freeDiagnostic')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDynamic;