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
              {t('setores:whyAdopt.title', { sector: t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name }) })}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t(`setores:whyAdopt.sections.${sector.id}.title`, { defaultValue: 'Automação Inteligente' })}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(`setores:whyAdopt.sections.${sector.id}.description`, { defaultValue: 'Agentes de IA automatizam processos específicos do seu setor, reduzindo custos operacionais e aumentando a eficiência da sua equipe.' })}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('setores:whyAdopt.strategicBenefits.title')}
              </h3>
              <ul className="space-y-3">
                {(() => {
                  const benefits = t(`setores:whyAdopt.sections.${sector.id}.benefits`, { 
                    returnObjects: true, 
                    defaultValue: t('setores:whyAdopt.strategicBenefits.default', { returnObjects: true }) 
                  }) as string[];
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
                {t(`setores:whyAdopt.cta.title.${sector.id}`, { 
                  defaultValue: t('setores:whyAdopt.cta.title.default', { sector: t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name }) })
                })}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t('setores:whyAdopt.cta.subtitle')}
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
