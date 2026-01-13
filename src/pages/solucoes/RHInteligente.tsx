import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Users, UserCheck, BarChart3, Clock, Target, Zap, Shield, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function RHInteligente() {
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
      icon: UserCheck,
      title: t('solucoes:rhInteligente.features.automatedRecruitment.title'),
      description: t('solucoes:rhInteligente.features.automatedRecruitment.description')
    },
    {
      icon: Target,
      title: t('solucoes:rhInteligente.features.intelligentScreening.title'),
      description: t('solucoes:rhInteligente.features.intelligentScreening.description')
    },
    {
      icon: BarChart3,
      title: t('solucoes:rhInteligente.features.performanceAnalytics.title'),
      description: t('solucoes:rhInteligente.features.performanceAnalytics.description')
    },
    {
      icon: Brain,
      title: t('solucoes:rhInteligente.features.employeeExperience.title'),
      description: t('solucoes:rhInteligente.features.employeeExperience.description')
    }
  ];

  const benefits = t('solucoes:rhInteligente.benefits', { returnObjects: true }) as string[];
  
  const stats = [
    { label: t('solucoes:rhInteligente.stats.efficiency'), value: "70%", icon: Clock },
    { label: t('solucoes:rhInteligente.stats.timeReduction'), value: "90%", icon: Target },
    { label: t('solucoes:rhInteligente.stats.retention'), value: "+40%", icon: Users }
  ];

  const useCases = [
    {
      title: t('solucoes:rhInteligente.useCases.talentAcquisition.title'),
      description: t('solucoes:rhInteligente.useCases.talentAcquisition.description')
    },
    {
      title: t('solucoes:rhInteligente.useCases.performanceManagement.title'),
      description: t('solucoes:rhInteligente.useCases.performanceManagement.description')
    },
    {
      title: t('solucoes:rhInteligente.useCases.employeeEngagement.title'),
      description: t('solucoes:rhInteligente.useCases.employeeEngagement.description')
    },
    {
      title: t('solucoes:rhInteligente.useCases.predictiveHR.title'),
      description: t('solucoes:rhInteligente.useCases.predictiveHR.description')
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
        
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-blob animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-400/30 rounded-full blur-blob animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-20">
          <div className="text-center animate-fade-in max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-purple-500" />
              <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                RH Inteligente
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
              IA Preditiva para Recursos Humanos
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
              Potencialize seu RH com IA preditiva que automatiza recrutamento, prevê turnover e otimiza o desenvolvimento de talentos
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona Nosso RH Inteligente</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa IA analisa dados de RH para otimizar processos, prever tendências e tomar decisões estratégicas baseadas em dados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-500/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
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
              Veja como nosso RH inteligente pode ser aplicado em diferentes cenários da gestão de pessoas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-500" />
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
            
            <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-8 rounded-2xl">
              <div className="text-center">
                <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Decisões Baseadas em Dados</h3>
                <p className="text-gray-600 mb-6">
                  Nossa IA analisa grandes volumes de dados de RH para fornecer insights 
                  precisos e recomendações estratégicas.
                </p>
                <div className="text-2xl font-bold text-purple-500 mb-2">500+</div>
                <div className="text-sm text-gray-600">Empresas Atendidas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <Brain className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('solucoes:rhInteligente.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('solucoes:rhInteligente.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-white text-purple-500 hover:bg-gray-100 font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {t('solucoes:rhInteligente.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/agentes-ia')}
              className="border-white text-white bg-white/10 hover:bg-white/20 font-medium px-8 py-6 text-lg rounded-xl transition-all"
            >
              {t('cta.viewOthers', { ns: 'common' })}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
