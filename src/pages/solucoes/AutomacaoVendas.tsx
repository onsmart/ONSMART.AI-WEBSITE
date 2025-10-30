import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, TrendingUp, Users, Clock, Target, BarChart3, Zap, Shield, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function AutomacaoVendas() {
  const navigate = useNavigate();
  const { t } = useTranslation(['solucoes', 'common']);

  const scrollToForm = () => {
    const formSelectors = [
      'form',
      '[data-testid="contact-form"]',
      '.contact-form',
      '#contact-form'
    ];
    
    let formElement = null;
    
    for (const selector of formSelectors) {
      formElement = document.querySelector(selector);
      if (formElement) break;
    }
    
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      setTimeout(() => {
        formElement.focus();
      }, 500);
    } else {
      navigate('/contato');
    }
  };

  const features = [
    {
      icon: Users,
      title: t('solucoes:automacaoVendas.features.virtualSDR.title'),
      description: t('solucoes:automacaoVendas.features.virtualSDR.description')
    },
    {
      icon: Target,
      title: t('solucoes:automacaoVendas.features.intelligentQualification.title'),
      description: t('solucoes:automacaoVendas.features.intelligentQualification.description')
    },
    {
      icon: BarChart3,
      title: t('solucoes:automacaoVendas.features.salesAnalytics.title'),
      description: t('solucoes:automacaoVendas.features.salesAnalytics.description')
    },
    {
      icon: Clock,
      title: t('solucoes:automacaoVendas.features.conversationalAI.title'),
      description: t('solucoes:automacaoVendas.features.conversationalAI.description')
    }
  ];

  const benefits = t('solucoes:automacaoVendas.benefits', { returnObjects: true }) as string[];
  
  const stats = [
    { label: t('solucoes:automacaoVendas.stats.conversion'), value: "+300%", icon: TrendingUp },
    { label: t('solucoes:automacaoVendas.stats.leads'), value: "10x mais", icon: Target },
    { label: t('solucoes:automacaoVendas.stats.roi'), value: "80%", icon: Clock }
  ];

  const useCases = [
    {
      title: t('solucoes:automacaoVendas.useCases.leadGeneration.title'),
      description: t('solucoes:automacaoVendas.useCases.leadGeneration.description')
    },
    {
      title: t('solucoes:automacaoVendas.useCases.qualification.title'),
      description: t('solucoes:automacaoVendas.useCases.qualification.description')
    },
    {
      title: t('solucoes:automacaoVendas.useCases.nurturing.title'),
      description: t('solucoes:automacaoVendas.useCases.nurturing.description')
    },
    {
      title: t('solucoes:automacaoVendas.useCases.closing.title'),
      description: t('solucoes:automacaoVendas.useCases.closing.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden hero-pattern-bg -mt-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images-onsmart.vercel.app/onsmart.ai/nossos-produtos-bg.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/20 rounded-full blur-blob animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-blue-light/30 rounded-full blur-blob animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-20">
          <div className="text-center animate-fade-in max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-8 w-8 text-brand-blue" />
              <Badge variant="outline" className="bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                Automação de Vendas
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
              SDRs Virtuais que Trabalham 24/7
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
              Transforme seu processo de vendas com agentes de IA que prospectam, qualificam leads e agendam reuniões automaticamente
            </p>

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

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona Nossa Automação de Vendas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa IA trabalha como uma extensão da sua equipe de vendas, operando 24/7 para maximizar suas oportunidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-brand-blue/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Casos de Uso Principais</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja como nossa automação de vendas pode ser aplicada em diferentes cenários do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand-blue" />
                  {useCase.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
            
            <div className="bg-gradient-to-br from-brand-blue/5 to-brand-blue/10 p-8 rounded-2xl">
              <div className="text-center">
                <Shield className="h-12 w-12 text-brand-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementação Garantida</h3>
                <p className="text-gray-600 mb-6">
                  Nossa equipe especializada garante a implementação completa em 30 dias, 
                  com treinamento e suporte contínuo.
                </p>
                <div className="text-2xl font-bold text-brand-blue mb-2">98%</div>
                <div className="text-sm text-gray-600">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-brand-blue to-brand-blue/90">
        <div className="max-w-4xl mx-auto text-center">
          <Cpu className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('solucoes:automacaoVendas.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('solucoes:automacaoVendas.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-white text-brand-blue hover:bg-gray-100 font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {t('solucoes:automacaoVendas.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/agentes-ia')}
              className="border-white text-white bg-white/10 hover:bg-white/20 font-medium px-8 py-6 text-lg rounded-xl transition-all"
            >
              {t('cta.viewOthers')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
