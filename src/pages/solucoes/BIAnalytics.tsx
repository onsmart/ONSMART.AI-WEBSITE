import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Database, BarChart3, TrendingUp, Clock, Target, Zap, Shield, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function BIAnalytics() {
  const navigate = useNavigate();
  const { t } = useTranslation(['solucoes', 'common']);

  const scrollToForm = () => {
    const formSelectors = ['form', '[data-testid="contact-form"]', '.contact-form', '#contact-form'];
    let formElement = null;
    for (const selector of formSelectors) {
      formElement = document.querySelector(selector);
      if (formElement) break;
    }
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      setTimeout(() => formElement.focus(), 500);
    } else {
      navigate('/contato');
    }
  };

  const features = [
    { icon: BarChart3, title: t('solucoes:biAnalytics.features.predictiveAnalytics.title'), description: t('solucoes:biAnalytics.features.predictiveAnalytics.description') },
    { icon: Clock, title: t('solucoes:biAnalytics.features.realTimeProcessing.title'), description: t('solucoes:biAnalytics.features.realTimeProcessing.description') },
    { icon: Target, title: t('solucoes:biAnalytics.features.anomalyDetection.title'), description: t('solucoes:biAnalytics.features.anomalyDetection.description') },
    { icon: TrendingUp, title: t('solucoes:biAnalytics.features.actionableInsights.title'), description: t('solucoes:biAnalytics.features.actionableInsights.description') }
  ];

  const benefits = t('solucoes:biAnalytics.benefits', { returnObjects: true }) as string[];
  const stats = [
    { label: t('solucoes:biAnalytics.stats.precision'), value: "95%", icon: Target }, 
    { label: t('solucoes:biAnalytics.stats.speed'), value: "Tempo Real", icon: Clock }, 
    { label: t('solucoes:biAnalytics.stats.insights'), value: "Únicos", icon: Brain }
  ];

  const useCases = [
    { title: t('solucoes:biAnalytics.useCases.salesForecasting.title'), description: t('solucoes:biAnalytics.useCases.salesForecasting.description') },
    { title: t('solucoes:biAnalytics.useCases.churnAnalysis.title'), description: t('solucoes:biAnalytics.useCases.churnAnalysis.description') },
    { title: t('solucoes:biAnalytics.useCases.priceOptimization.title'), description: t('solucoes:biAnalytics.useCases.priceOptimization.description') },
    { title: t('solucoes:biAnalytics.useCases.financialForecasting.title'), description: t('solucoes:biAnalytics.useCases.financialForecasting.description') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="relative py-12 md:py-16 overflow-hidden hero-pattern-bg -mt-8">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images-onsmart.vercel.app/onsmart.ai/nossos-produtos-bg.jpg')` }} />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-blob animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-400/30 rounded-full blur-blob animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-20">
          <div className="text-center animate-fade-in max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Database className="h-8 w-8 text-orange-500" />
              <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">BI & Analytics</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight drop-shadow-lg">Business Intelligence Preditivo</h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">Transforme dados em insights acionáveis com IA avançada, analytics preditiva e processamento em tempo real</p>
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-center mb-1">
                      <IconComponent className="h-4 w-4 text-white mr-1" />
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </div>
                    <div className="text-xs text-gray-200">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona Nosso BI & Analytics</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Nossa IA processa grandes volumes de dados para revelar insights ocultos e gerar previsões precisas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-500/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Casos de Uso Principais</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Veja como nosso BI & Analytics pode ser aplicado em diferentes cenários do seu negócio</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  {useCase.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Principais Benefícios</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 p-8 rounded-2xl">
              <div className="text-center">
                <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Dashboards Inteligentes</h3>
                <p className="text-gray-600 mb-6">Visualizações dinâmicas que se adaptam aos seus dados e revelam insights automaticamente.</p>
                <div className="text-2xl font-bold text-orange-500 mb-2">95%</div>
                <div className="text-sm text-gray-600">Precisão nas Previsões</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <BarChart3 className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">{t('solucoes:biAnalytics.cta.title')}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{t('solucoes:biAnalytics.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToForm} className="bg-white text-orange-500 hover:bg-gray-100 font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
              {t('solucoes:biAnalytics.cta.button')}<ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/agentes-ia')} className="border-white text-white bg-white/10 hover:bg-white/20 font-medium px-8 py-6 text-lg rounded-xl transition-all">
              {t('cta.viewOthers', { ns: 'common' })}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
