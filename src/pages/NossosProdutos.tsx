import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Star, Clock, Send, Shield, Bot, Zap, Target, Brain, Users, Cpu, Database, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const categoriesIcons = {
  agentes: Bot,
  analytics: Database,
  automacao: Workflow,
  atendimento: Users,
  visao: Target,
  modelos: Brain
};

export default function NossosProdutos() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation(['nossosProdutos', 'common']);
  
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
    } else if (location.pathname !== '/contato') {
      navigate('/contato');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden hero-pattern-bg -mt-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images-onsmart.vercel.app/onsmart.ai/nossos-produtos-bg.jpg')`
          }}
        />
        {/* Overlay para melhorar legibilidade */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Background elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/20 rounded-full blur-blob animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-blue-light/30 rounded-full blur-blob animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-20">
          <div className="text-center animate-fade-in max-w-4xl mx-auto">
            {/* Headline principal */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight drop-shadow-lg">
              {t('hero.title')}
            </h1>
            
            {/* Subheadline com social proof */}
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md">
              {t('hero.subtitle')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-200">{t('stats.companies')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-gray-200">{t('stats.successRate')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white mb-1">30 dias</div>
                <div className="text-sm text-gray-200">{t('stats.implementation')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('categories.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {Object.keys(categoriesIcons).map((categoryId) => {
              const IconComponent = categoriesIcons[categoryId as keyof typeof categoriesIcons];
              return (
                <div key={categoryId} className="group p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-blue transition-colors">
                        {t(`categoryNames.${categoryId}`)}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'agentBuilder', icon: Bot },
              { id: 'analytics', icon: Database },
              { id: 'automation', icon: Workflow },
              { id: 'customerAI', icon: Users },
              { id: 'vision', icon: Target },
              { id: 'brain', icon: Brain }
            ].map((produto) => {
              const IconComponent = produto.icon;
              const productData = t(`products.${produto.id}`, { returnObjects: true }) as any;
              return (
                <Card key={produto.id} className="hover:shadow-xl transition-all duration-300 group border-2 hover:border-brand-blue/30">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-brand-blue transition-colors">
                          {productData.name}
                        </CardTitle>
                        <Badge variant="outline" className="mt-1">{productData.category}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {productData.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">{t('features.title')}</h4>
                      <ul className="space-y-2">
                        {productData.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">{t('features.titleBenefits')}</h4>
                      <ul className="space-y-2">
                        {productData.benefits.map((benefit: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-500">{t('price.from')}</div>
                          <div className="text-lg font-bold text-brand-blue">{productData.price}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
                          onClick={() => navigate(`/nossos-produtos/${productData.name.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                          {t('buttons.viewDetails')}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                          onClick={scrollToForm}
                        >
                          {t('buttons.requestDemo')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('whyChoose.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.national.title')}</h3>
              <p className="text-gray-600 text-sm">{t('benefits.national.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.security.title')}</h3>
              <p className="text-gray-600 text-sm">{t('benefits.security.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.implementation.title')}</h3>
              <p className="text-gray-600 text-sm">{t('benefits.implementation.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('benefits.support.title')}</h3>
              <p className="text-gray-600 text-sm">{t('benefits.support.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
            <Clock className="h-4 w-4" />
            {t('cta.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            {t('cta.description')}
          </p>
          
          {/* Social proof cards */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-brand-blue/20">
              <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-brand-blue">650%</div>
              <div className="text-xs text-gray-600">{t('cta.stats.roi')}</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-brand-blue/20">
              <Shield className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-brand-blue">90 dias</div>
              <div className="text-xs text-gray-600">{t('cta.stats.guarantee')}</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-brand-blue/20">
              <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-brand-blue">30 dias</div>
              <div className="text-xs text-gray-600">{t('cta.stats.implementation')}</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mb-6">
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-white font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              onClick={scrollToForm}
            >
              <span className="relative z-10 flex items-center">
                <Send className="mr-2 h-4 w-4" />
                {t('cta.button')}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue-light opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </div>
          
          {/* Benefits */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.freeSetup')}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.noCommitment')}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.guaranteedROI')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
