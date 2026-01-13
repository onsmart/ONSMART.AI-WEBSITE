
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, Star, Clock, Sparkles } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const AgentesIA = () => {
  const { t } = useTranslation(['universityAgentesIA', 'common']);
  
  return (
    <>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Enhanced Hero Section */}
        <section className="py-20 px-4 md:px-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-brand-blue/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-blue-600/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-3 text-gray-600 text-lg font-medium">{t('hero.rating')}</span>
            </div>
            
            {/* Coming Soon Message */}
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 border-brand-blue/30 shadow-lg hover:shadow-xl hover:border-brand-blue/50 hover:scale-105 transition-all duration-300 cursor-default group">
              <div className="relative">
                <Clock className="h-6 w-6 text-brand-blue group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t('hero.comingSoon', { defaultValue: 'Curso estará disponível em breve' })}
              </span>
              <Sparkles className="h-5 w-5 text-brand-blue group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* Enhanced Conteúdo do Curso */}
        <section className="py-20 px-4 md:px-6 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-blue-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-600/5 to-brand-blue/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-4xl font-bold mb-10">{t('curriculum.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('curriculum.titleHighlight')}</span></h2>
                
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((moduleNum) => {
                    const moduleKey = `curriculum.modules.${moduleNum}`;
                    const moduleItems = t(`${moduleKey}.items`, { returnObjects: true }) as string[];
                    return (
                      <Card key={moduleNum}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{moduleNum}</div>
                            <CardTitle>{t(`${moduleKey}.title`)}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="mb-4">
                            {t(`${moduleKey}.description`)}
                          </CardDescription>
                          <ul className="space-y-2 text-sm">
                            {moduleItems.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('sidebar.courseInfo.title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('sidebar.courseInfo.duration')}</p>
                      <p className="font-semibold">{t('sidebar.courseInfo.durationValue')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('sidebar.courseInfo.level')}</p>
                      <p className="font-semibold">{t('sidebar.courseInfo.levelValue')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('sidebar.courseInfo.format')}</p>
                      <p className="font-semibold">{t('sidebar.courseInfo.formatValue')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('sidebar.courseInfo.certificate')}</p>
                      <p className="font-semibold">{t('sidebar.courseInfo.certificateValue')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('sidebar.courseInfo.support')}</p>
                      <p className="font-semibold">{t('sidebar.courseInfo.supportValue')}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('sidebar.youWillBeAble.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {(t('sidebar.youWillBeAble.items', { returnObjects: true }) as string[]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
                  <CardHeader>
                    <CardTitle>{t('sidebar.bonus.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {(t('sidebar.bonus.items', { returnObjects: true }) as string[]).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AgentesIA;
