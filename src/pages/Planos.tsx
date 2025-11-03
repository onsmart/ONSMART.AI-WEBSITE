
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useTranslation } from 'react-i18next';

const Planos = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['planos', 'common']);

  const plans = [
    {
      name: t('plans.starter.name'),
      description: t('plans.starter.description'),
      price: t('plans.starter.price'),
      period: t('plans.starter.period'),
      icon: Zap,
      popular: false,
      features: t('plans.starter.features', { returnObjects: true }) as string[]
    },
    {
      name: t('plans.business.name'),
      description: t('plans.business.description'),
      price: t('plans.business.price'),
      period: t('plans.business.period'),
      icon: Star,
      popular: true,
      features: t('plans.business.features', { returnObjects: true }) as string[]
    },
    {
      name: t('plans.enterprise.name'),
      description: t('plans.enterprise.description'),
      price: t('plans.enterprise.price'),
      period: t('plans.enterprise.period'),
      icon: Crown,
      popular: false,
      features: t('plans.enterprise.features', { returnObjects: true }) as string[]
    }
  ];

  const handleContactClick = () => {
    navigate('/contato');
  };

  const handleDiagnosticoClick = () => {
    navigate('/diagnostico');
  };

  return (
    <>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords="planos ia, preços agentes ia, planos empresariais, investimento ia, agentes inteligencia artificial"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-block text-sm font-semibold mb-6 py-1 px-3 rounded-full bg-brand-blue/10 text-brand-blue">
              {t('hero.title')}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-black to-brand-blue text-transparent bg-clip-text">
              {t('hero.subtitle')}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button 
                size="lg" 
                onClick={handleDiagnosticoClick}
                className="bg-brand-black hover:bg-brand-black/90 text-white font-medium"
              >
                {t('buttons.requestDemo')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleContactClick}
                className="border-brand-black text-brand-black hover:bg-brand-black/5"
              >
                {t('buttons.contactSales')}
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => {
                const IconComponent = plan.icon;
                return (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 ${
                      plan.popular ? 'border-2 border-brand-blue shadow-lg scale-105' : 'hover:scale-105'
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute top-4 right-4 bg-brand-blue text-white">
                        {t('badges.popular')}
                      </Badge>
                    )}
                    
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-brand-blue/10 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-brand-blue" />
                      </div>
                      <CardTitle className="text-2xl font-bold dark:text-gray-100">{plan.name}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="text-center">
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-brand-black">{plan.price}</span>
                        <span className="text-gray-500">{plan.period}</span>
                      </div>

                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        className={`w-full font-medium ${
                          plan.popular 
                            ? 'bg-brand-blue hover:bg-brand-blue/90 text-white' 
                            : 'bg-brand-black hover:bg-brand-black/90 text-white'
                        }`}
                        onClick={plan.name === t('plans.enterprise.name') ? handleContactClick : handleDiagnosticoClick}
                      >
                        {plan.name === t('plans.enterprise.name') ? t('buttons.contactSales') : t('buttons.getStarted')}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-6 bg-white/50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">Perguntas Frequentes</h2>
            
            <div className="space-y-6">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-gray-100">Como funciona a implementação?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nossa metodologia LÍDER garante uma implementação estruturada em 6 etapas, 
                    desde o diagnóstico até a otimização contínua dos Agentes de IA.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Qual o prazo de implementação?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    O prazo varia de 30 a 90 dias, dependendo da complexidade e quantidade de Agentes de IA. 
                    Fornecemos um cronograma detalhado após o diagnóstico inicial.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posso mudar de plano?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                    Nossa equipe ajudará na transição sem interrupções.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-4 md:px-6 bg-brand-black text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Transformar sua Empresa?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Agende um diagnóstico gratuito e descubra como os Agentes de IA podem revolucionar seus processos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleDiagnosticoClick}
                className="bg-white text-brand-black hover:bg-gray-100 font-medium"
              >
                <Users className="mr-2 h-5 w-5" />
                Diagnóstico Gratuito
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleContactClick}
                className="border-white text-white hover:bg-white hover:text-brand-black"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Planos;
