import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Stethoscope, Home, ShoppingBag, Scale, Banknote, Phone, Package, Factory, TrendingUp, CheckCircle } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { sectorsData } from '@/data/sectorsData';
import { useTranslation } from 'react-i18next';

const Setores: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['setores', 'common']);

  const handleCtaClick = () => {
    navigate('/contato');
  };

  const handleSectorClick = (slug: string) => {
    navigate(`/setores/${slug}`);
  };

  // Mapeamento de ícones para os setores (usa ID do setor)
  const getSectorIcon = (sectorId: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'advocacia': Scale,
      'bancos': Banknote,
      'comercio': ShoppingBag,
      'industria': Factory,
      'saude': Stethoscope,
      'telecomunicacoes': Phone,
      'varejo': Package,
      'setor-imobiliario': Home
    };
    return iconMap[sectorId] || Building2;
  };

  return (
    <>
      <UnifiedSEO 
        pageType="service"
        pageData={{
          title: t('setores:hero.title') + " - IA Personalizada por Segmento | onsmartAI",
          description: t('setores:hero.subtitle') + " Implementação personalizada em 30 dias."
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
              <div className="text-center mb-8 sm:mb-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-brand-blue/20">
                  <Building2 className="h-3 w-3" />
                  {t('setores:sections.sectors.title')}
                </div>
                
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {t('setores:hero.title')}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
                  {t('setores:hero.subtitle')}
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md border border-gray-200/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm sm:text-base">{t('setores:stats.sectors.value')}</span>
                    </div>
                    <p className="text-xs text-gray-600">{t('setores:stats.sectors.description')}</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md border border-gray-200/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm sm:text-base">{t('setores:stats.roi.value')}</span>
                    </div>
                    <p className="text-xs text-gray-600">{t('setores:stats.roi.description')}</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md border border-gray-200/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm sm:text-base">{t('setores:stats.companies.value')}</span>
                    </div>
                    <p className="text-xs text-gray-600">{t('setores:stats.companies.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sectors Grid */}
          <section className="pb-8 sm:pb-12 md:pb-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {sectorsData.map((sector) => {
                  const IconComponent = getSectorIcon(sector.id);
                  return (
                    <div 
                      key={sector.id}
                      onClick={() => handleSectorClick(sector.slug)}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-brand-blue" />
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-brand-blue transition-colors">
                        {t(`setores:sectors.${sector.id}.name`, { defaultValue: sector.name })}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                        {t(`setores:sectors.${sector.id}.description`, { defaultValue: sector.description })}
                      </p>
                      
                      <div className="flex items-center text-brand-blue text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                        <span>{t('setores:buttons.learnMore')}</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-50 to-blue-50/30">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200/50">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-green-500/20">
                  <CheckCircle className="h-3 w-3" />
                  {t('setores:sections.cta.title')}
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {t('setores:sections.cta.title')}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-3xl mx-auto">
                  {t('setores:sections.cta.subtitle')}
                </p>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleCtaClick}
                    className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      {t('setores:buttons.requestQuote')}
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </Button>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{t('setores:guarantees.consulting')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{t('setores:guarantees.responseTime')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{t('setores:guarantees.noCommitment')}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Setores;