import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calculator, CheckCircle, Target, Zap } from "lucide-react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FerramentasGratuitas = () => {
  const { t } = useTranslation(['ferramentasGratuitas', 'common']);
  const navigate = useNavigate();
  
  const ferramentas = [
    {
      title: t('tools.roiCalculator.title'),
      description: t('tools.roiCalculator.description'),
      icon: Calculator,
      url: "#",
      category: t('tools.roiCalculator.category')
    },
    {
      title: t('tools.digitalMaturity.title'),
      description: t('tools.digitalMaturity.description'),
      icon: CheckCircle,
      url: "#",
      category: t('tools.digitalMaturity.category')
    },
    {
      title: t('tools.automationPlanner.title'),
      description: t('tools.automationPlanner.description'),
      icon: Target,
      url: "#",
      category: t('tools.automationPlanner.category')
    },
    {
      title: t('tools.productivitySimulator.title'),
      description: t('tools.productivitySimulator.description'),
      icon: Zap,
      url: "#",
      category: t('tools.productivitySimulator.category')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords="ferramentas gratuitas ia, calculadora roi ia, avaliador maturidade digital, simulador produtividade"
      />
      
      {/* Enhanced Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-brand-blue/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-blue/10 to-blue-600/10 rounded-full border border-brand-blue/20 mb-6">
            <span className="text-brand-blue font-medium text-sm">{t('hero.badge')}</span>
          </div>
          
          {/* Main title with gradient */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('hero.titleHighlight') ? (
              <>
                {t('hero.title')}{" "}
                <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </>
            ) : (
              t('hero.title')
            )}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white px-8 py-3"
            >
              <Calculator className="mr-2 h-5 w-5" />
              {t('hero.startNow')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent px-8 py-3"
            >
              {t('hero.viewDemo')}
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Tools Grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('specialized.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('specialized.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {ferramentas.map((ferramenta, index) => {
              const IconComponent = ferramenta.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-brand-blue" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-blue transition-colors">
                          {ferramenta.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{ferramenta.category}</p>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {ferramenta.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('buttons.accessTool')}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Info Section */}
      <section className="py-20 px-4 bg-gray-900 dark:bg-gray-900 relative overflow-hidden">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-blue/20 to-blue-600/20 rounded-full border border-brand-blue/30 mb-6">
            <span className="text-brand-blue font-medium text-sm">{t('expertise.badge')}</span>
          </div>
          
          {/* Main title with gradient */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('expertise.title')}{" "}
            <span className="bg-gradient-to-r from-brand-blue via-blue-400 to-brand-blue bg-clip-text text-transparent">
              {t('expertise.titleHighlight')}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('expertise.description')}
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white px-8 py-3"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              {t('expertise.knowOtherResources')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-8 py-3"
            >
              {t('expertise.viewSuccessCases')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FerramentasGratuitas;