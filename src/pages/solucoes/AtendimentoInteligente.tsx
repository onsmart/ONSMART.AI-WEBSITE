import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, HeadphonesIcon, MessageSquare, Clock, Smile, BarChart3, Zap, Shield, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function AtendimentoInteligente() {
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
      icon: MessageSquare,
      title: t('solucoes:atendimentoInteligente.features.multichannelChatbots.title'),
      description: t('solucoes:atendimentoInteligente.features.multichannelChatbots.description')
    },
    {
      icon: Bot,
      title: t('solucoes:atendimentoInteligente.features.conversationalAI.title'),
      description: t('solucoes:atendimentoInteligente.features.conversationalAI.description')
    },
    {
      icon: BarChart3,
      title: t('solucoes:atendimentoInteligente.features.realTimeAnalytics.title'),
      description: t('solucoes:atendimentoInteligente.features.realTimeAnalytics.description')
    },
    {
      icon: Clock,
      title: t('solucoes:atendimentoInteligente.benefits.availability.title'),
      description: t('solucoes:atendimentoInteligente.benefits.availability.description')
    }
  ];

  const benefits = [
    "Atendimento multicanal integrado",
    "Resolução inteligente de problemas",
    "Aprendizado contínuo da IA",
    "95% de satisfação do cliente",
    "Resposta instantânea 24/7",
    "85% de resolução automática"
  ];

  const stats = [
    { label: "Satisfação", value: "+95%", icon: Smile },
    { label: "Resposta", value: "Instantânea", icon: Clock },
    { label: "Resolução", value: "85%", icon: CheckCircle }
  ];

  const useCases = [
    {
      title: "Suporte ao Cliente",
      description: "Resolve dúvidas, problemas técnicos e solicitações de forma automática e inteligente."
    },
    {
      title: "Vendas Conversacionais",
      description: "Qualifica leads, apresenta produtos e conduz o cliente através do processo de compra."
    },
    {
      title: "Pós-Venda Automatizado",
      description: "Acompanha satisfação, coleta feedback e oferece suporte contínuo aos clientes."
    },
    {
      title: "FAQ Inteligente",
      description: "Responde perguntas frequentes de forma natural e contextualizada."
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
        
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/20 rounded-full blur-blob animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-green-400/30 rounded-full blur-blob animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-20">
          <div className="text-center animate-fade-in max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HeadphonesIcon className="h-8 w-8 text-green-500" />
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Atendimento Inteligente
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
              IA Conversacional 24/7
            </h1>
            
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-md">
              Revolucione o atendimento ao cliente com chatbots inteligentes que entendem contexto e resolvem problemas complexos
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona Nosso Atendimento Inteligente</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa IA conversacional oferece suporte multicanal com compreensão contextual e resolução inteligente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-green-500/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
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
              Veja como nosso atendimento inteligente pode ser aplicado em diferentes cenários do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
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
            
            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 p-8 rounded-2xl">
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Português Otimizado</h3>
                <p className="text-gray-600 mb-6">
                  Nossa IA é especializada em português brasileiro, compreendendo gírias, 
                  expressões regionais e contextos culturais.
                </p>
                <div className="text-2xl font-bold text-green-500 mb-2">98%</div>
                <div className="text-sm text-gray-600">Precisão em Português</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('solucoes:atendimentoInteligente.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('solucoes:atendimentoInteligente.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-white text-green-500 hover:bg-gray-100 font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {t('solucoes:atendimentoInteligente.cta.button')}
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
