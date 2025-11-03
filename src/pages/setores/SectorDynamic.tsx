import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Building2, Stethoscope, Home, ShoppingBag, Scale, Banknote, Phone, Package, Factory } from 'lucide-react';
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

  const handleDiagnosticoClick = () => {
    navigate('/diagnostico');
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

  // Helper para obter chave de tradução da solução baseado no índice
  const getSolutionKey = (sectorId: string, index: number): string => {
    const solutionKeys: Record<string, string[]> = {
      'advocacia': ['assistente', 'gerador', 'prazos'],
      'bancos': ['credito', 'assistente', 'antifraude'],
      'telecomunicacoes': ['suporte', 'otimizador', 'preditor'],
      'varejo': ['personalizador', 'precos', 'comportamento'],
      'industria': ['manutencao', 'qualidade', 'producao'],
      'saude': ['diagnostico', 'exames', 'medicina'],
      'comercio': ['estoque', 'vendas', 'analise'],
      'setor-imobiliario': ['propriedades', 'leads', 'mercado']
    };
    return solutionKeys[sectorId]?.[index] || `solution${index}`;
  };

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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleContactClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  {t('setores:buttons.requestQuote')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleDiagnosticoClick}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 px-8 py-3 text-lg font-medium bg-white"
                >
                  {t('setores:buttons.freeDiagnostic')}
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
              {t('setores:dynamic.whatsIncluded.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('setores:dynamic.whatsIncluded.subtitle', { 
                sector: t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name })
              })}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {sector.solutions.map((solution, index) => {
              const solutionKey = getSolutionKey(sector.id, index);
              const solutionTranslation = t(`setores:sectors.${sector.id}.solutions.${solutionKey}`, { returnObjects: true }) as any;
              
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {solutionTranslation?.title || solution.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {solutionTranslation?.description || solution.description}
                  </p>
                  <ul className="space-y-2">
                    {(solutionTranslation?.benefits || solution.benefits).slice(0, 3).map((benefit: string, idx: number) => (
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
              {t('setores:dynamic.howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('setores:dynamic.howItWorks.subtitle', { 
                sector: t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name })
              })}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('setores:dynamic.howItWorks.steps.analise.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('setores:dynamic.howItWorks.steps.analise.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('setores:dynamic.howItWorks.steps.implementacao.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('setores:dynamic.howItWorks.steps.implementacao.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {t('setores:dynamic.howItWorks.steps.otimizacao.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('setores:dynamic.howItWorks.steps.otimizacao.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('setores:dynamic.plans.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('setores:dynamic.plans.subtitle', { 
                sector: t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name })
              })}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('setores:dynamic.plans.basic.title')}
                </h3>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                  {t('setores:dynamic.plans.description')}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.basic.features.analise')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.basic.features.implementacao')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.basic.features.suporte')}</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleContactClick}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                {t('setores:dynamic.plans.requestQuote')}
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ring-2 ring-blue-600">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('setores:dynamic.plans.professional.title')}
                </h3>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                  {t('setores:dynamic.plans.description')}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.professional.features.analise')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.professional.features.implementacao')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.professional.features.suporte')}</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleContactClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t('setores:dynamic.plans.requestQuote')}
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('setores:dynamic.plans.enterprise.title')}
                </h3>
                <div className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                  {t('setores:dynamic.plans.description')}
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.enterprise.features.analise')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.enterprise.features.implementacao')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('setores:dynamic.plans.enterprise.features.suporte')}</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleContactClick}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                {t('setores:dynamic.plans.requestQuote')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('setores:dynamic.cta.title', { 
              sector: t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name })
            })}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('setores:dynamic.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleContactClick}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              {t('setores:dynamic.plans.requestQuote')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleDiagnosticoClick}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium bg-transparent"
            >
              {t('setores:buttons.freeDiagnostic')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectorDynamic;
