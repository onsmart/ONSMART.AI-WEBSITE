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

  if (!slug) {
    return <NotFound />;
  }

  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

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
          chartTitle: t('servicos:chartTitles.potentialAnalysis'),
          icon: <CheckCircle className="h-6 w-6 text-white" />
        };
      case 'aceleracao-adocao-ia':
        return {
          chartType: 'growth' as const,
          chartTitle: t('servicos:chartTitles.adoptionGrowth'),
          icon: <TrendingUp className="h-6 w-6 text-white" />
        };
      case 'implementacao-tecnica':
        return {
          chartType: 'bar' as const,
          chartTitle: t('servicos:chartTitles.technicalPerformance'),
          icon: <Users className="h-6 w-6 text-white" />
        };
      case 'analise-dados':
        return {
          chartType: 'line' as const,
          chartTitle: t('servicos:chartTitles.dataInsights'),
          icon: <TrendingUp className="h-6 w-6 text-white" />
        };
      case 'treinamento-ia':
        return {
          chartType: 'pie' as const,
          chartTitle: t('servicos:chartTitles.knowledgeDistribution'),
          icon: <Star className="h-6 w-6 text-white" />
        };
      case 'suporte-continuo':
        return {
          chartType: 'line' as const,
          chartTitle: t('servicos:chartTitles.continuousMonitoring'),
          icon: <CheckCircle className="h-6 w-6 text-white" />
        };
      default:
        return {
          chartType: 'bar' as const,
          chartTitle: t('servicos:chartTitles.serviceResults'),
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
                <span className="text-blue-600 font-semibold text-lg">{service.name}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {service.heroTitle}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {service.heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleContactClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  {t('servicos:buttons.requestQuote')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleDiagnosticoClick}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 px-8 py-3 text-lg font-medium bg-white"
                >
                  {t('servicos:buttons.freeDiagnostic')}
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
              {t('servicos:sections.features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('servicos:sections.features.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('servicos:sections.process.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('servicos:sections.process.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('servicos:sections.pricing.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('servicos:sections.pricing.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.pricing.map((plan, index) => (
              <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${index === 1 ? 'ring-2 ring-blue-600' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {plan.tier}
                  </h3>
                  <div className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                    {t('servicos:sections.pricing.completeSolution')}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.slice(0, 3).map((feature, idx) => (
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
                  {t('servicos:buttons.requestQuote')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {service.ctaTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {service.ctaSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContactClick}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              {t('servicos:buttons.requestQuote')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleDiagnosticoClick}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium bg-transparent"
            >
              {t('servicos:buttons.freeDiagnostic')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDynamic;