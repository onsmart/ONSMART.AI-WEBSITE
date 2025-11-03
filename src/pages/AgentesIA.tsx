import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Star, Clock, Send, Shield, Bot, Zap, Target, Brain, Users, Cpu, Database, Workflow, MessageSquare, HeadphonesIcon, TrendingUp, Mic, ShoppingCart, FileText, ChevronLeft, ChevronRight, Play, Pause, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import TypewriterText from "@/components/ui/TypewriterText";
import { useTranslation } from 'react-i18next';

const nossosProdutos = [
  {
    id: 1,
    name: "OnSmart Sales AI",
    description: "Agentes de IA para automação de vendas, qualificação de leads e integração com CRM",
    icon: TrendingUp,
    category: "Automação de Vendas",
    features: ["SDR Virtual 24/7", "Qualificação Inteligente", "Integração CRM", "Agendamento Automático"],
    benefits: ["Disponibilidade total", "Redução de workload manual", "Integração nativa"],
    targetSectors: ["Telecomunicações", "Serviços Financeiros", "Tecnologia B2B"]
  },
  {
    id: 2,
    name: "OnSmart Customer Service",
    description: "Soluções inteligentes de atendimento ao cliente com chatbots e assistentes virtuais",
    icon: HeadphonesIcon,
    category: "Atendimento Inteligente",
    features: ["Chatbots Multicanal", "Otimização em Português", "Integração WhatsApp/Web", "Análise de Experiência"],
    benefits: ["Suporte automatizado", "Engajamento inicial", "Assistência técnica"],
    targetSectors: ["E-commerce", "Serviços", "Telecomunicações"]
  },
  {
    id: 3,
    name: "OnSmart HR Intelligence",
    description: "Tecnologia de IA para recursos humanos, recrutamento e análise de workforce",
    icon: Users,
    category: "RH Inteligente",
    features: ["Recrutamento Automatizado", "Screening de Candidatos", "Analytics Preditiva", "Plataformas de Aprendizado"],
    benefits: ["Automação de assessment", "Analytics de workforce", "Desenvolvimento personalizado"],
    targetSectors: ["Grandes Corporações", "Consultorias", "Tecnologia"]
  },
  {
    id: 4,
    name: "OnSmart Analytics Pro",
    description: "Business Intelligence avançado com capacidades preditivas e processamento em tempo real",
    icon: Database,
    category: "BI & Analytics",
    features: ["Analytics Preditiva", "Processamento Real-time", "Integração de Sistemas", "Detecção de Fraude"],
    benefits: ["Forecasting de vendas", "Análise comportamental", "Otimização de supply chain"],
    targetSectors: ["Financeiro", "Varejo", "Manufatura"]
  },
  {
    id: 5,
    name: "OnSmart Process AI",
    description: "Automação de processos combinando RPA com capacidades de IA avançada",
    icon: Workflow,
    category: "Automação de Processos",
    features: ["RPA + IA", "Automação Administrativa", "Operação 24/7", "Melhoria de Precisão"],
    benefits: ["Processamento de documentos", "Workflows de atendimento", "Processos financeiros"],
    targetSectors: ["Bancos", "Seguradoras", "Governo"]
  },
  {
    id: 6,
    name: "OnSmart Voice & NLP",
    description: "Tecnologia de voz e processamento de linguagem natural otimizada para português",
    icon: Mic,
    category: "Voz & Linguagem",
    features: ["Interfaces por Voz", "Processamento em Português", "Análise de Conversas", "Integração de Comunicação"],
    benefits: ["Atendimento por voz", "Transcrição de reuniões", "Roteamento de chamadas"],
    targetSectors: ["Call Centers", "Empresas", "Saúde"]
  },
];

const categories = [
  { 
    id: "vendas", 
    name: "Automação de Vendas", 
    icon: TrendingUp, 
    color: "bg-blue-100 text-blue-800", 
    description: "SDRs virtuais e qualificação de leads automatizada",
    detailedDescription: "Transforme seu processo de vendas com agentes de IA que trabalham 24/7. Nossos SDRs virtuais qualificam leads, fazem follow-ups inteligentes, integram com CRM e agendam reuniões automaticamente. Aumente sua taxa de conversão em até 300% com prospecção inteligente.",
    benefits: ["Prospecção 24/7", "Qualificação inteligente", "Integração CRM nativa", "ROI comprovado"],
    stats: { conversion: "+300%", leads: "10x mais", time: "80% menos tempo" }
  },
  { 
    id: "atendimento", 
    name: "Atendimento Inteligente", 
    icon: HeadphonesIcon, 
    color: "bg-green-100 text-green-800", 
    description: "Chatbots multicanal e assistentes virtuais",
    detailedDescription: "Revolucione o atendimento ao cliente com IA conversacional avançada. Chatbots que entendem contexto, resolvem problemas complexos e aprendem continuamente. Suporte multicanal (WhatsApp, web, telefone) com processamento otimizado para português brasileiro.",
    benefits: ["Atendimento multicanal", "Resolução inteligente", "Aprendizado contínuo", "Satisfação +95%"],
    stats: { satisfaction: "+95%", response: "Resposta instantânea", resolution: "85% resolução" }
  },
  { 
    id: "rh", 
    name: "RH Inteligente", 
    icon: Users, 
    color: "bg-purple-100 text-purple-800", 
    description: "Recrutamento automatizado e analytics de workforce",
    detailedDescription: "Potencialize seu RH com IA preditiva. Automatize recrutamento, faça screening inteligente de candidatos, preveja turnover e otimize engajamento. Analytics avançada para decisões estratégicas de pessoas com base em dados reais.",
    benefits: ["Recrutamento automatizado", "Screening inteligente", "Analytics preditiva", "Retenção +40%"],
    stats: { hiring: "70% mais rápido", accuracy: "90% precisão", retention: "+40% retenção" }
  },
  { 
    id: "analytics", 
    name: "BI & Analytics", 
    icon: Database, 
    color: "bg-orange-100 text-orange-800", 
    description: "Business Intelligence preditivo e tempo real",
    detailedDescription: "Transforme dados em insights acionáveis com IA avançada. Analytics preditiva, processamento em tempo real, detecção de anomalias e forecasting inteligente. Dashboards dinâmicos que revelam oportunidades ocultas no seu negócio.",
    benefits: ["Analytics preditiva", "Tempo real", "Detecção de anomalias", "Insights acionáveis"],
    stats: { accuracy: "95% precisão", speed: "Tempo real", insights: "Insights únicos" }
  },
  { 
    id: "processos", 
    name: "Automação de Processos", 
    icon: Workflow, 
    color: "bg-red-100 text-red-800", 
    description: "RPA inteligente com IA avançada",
    detailedDescription: "Automatize processos complexos combinando RPA tradicional com IA cognitiva. Processamento de documentos, workflows administrativos, aprovações inteligentes e operações 24/7. Reduza custos operacionais em até 60% com automação inteligente.",
    benefits: ["RPA + IA cognitiva", "Processamento 24/7", "Workflows inteligentes", "60% redução custos"],
    stats: { efficiency: "+500%", cost: "-60% custos", accuracy: "99% precisão" }
  },
  { 
    id: "voz", 
    name: "Voz & Linguagem", 
    icon: Mic, 
    color: "bg-indigo-100 text-indigo-800", 
    description: "NLP otimizado para português brasileiro",
    detailedDescription: "Domine a comunicação por voz com IA especializada em português. Interfaces conversacionais, transcrição inteligente, análise de sentimento e roteamento automático. Tecnologia 100% otimizada para sotaques e expressões brasileiras.",
    benefits: ["Português otimizado", "Interfaces por voz", "Análise sentimento", "Transcrição inteligente"],
    stats: { accuracy: "98% precisão", languages: "PT-BR nativo", processing: "Tempo real" }
  }
];

export default function NossosProdutos() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation('agentesIA');
  
  // Get translated categories - using useMemo to recalculate when language changes
  const translatedCategories = React.useMemo(() => {
    return categories.map((cat) => {
      const categoryKey = `categories.items.${cat.id}`;
      return {
        ...cat,
        name: t(`${categoryKey}.name`),
        description: t(`${categoryKey}.description`),
        detailedDescription: t(`${categoryKey}.detailedDescription`),
        benefits: t(`${categoryKey}.benefits`, { returnObjects: true }) as string[],
        stats: t(`${categoryKey}.stats`, { returnObjects: true }) as Record<string, string>,
        statsLabels: t(`${categoryKey}.statsLabels`, { returnObjects: true }) as Record<string, string>,
      };
    });
  }, [t, i18n.language]);
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  
  // Carousel functions
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % translatedCategories.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + translatedCategories.length) % translatedCategories.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentSlide, translatedCategories.length]);
  
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden hero-pattern-bg -mt-8">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images-onsmart.vercel.app/onsmart.ai/nossos-produtos-bg.jpg')`
          }}
        />
        
        {/* Background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/20 rounded-full blur-blob animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-blue-light/30 rounded-full blur-blob animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-20">
          <div className="text-center animate-fade-in max-w-4xl mx-auto">
            {/* Headline principal com animação */}
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-3 sm:mb-4">
                <TypewriterText 
                  texts={t('hero.title.texts', { returnObjects: true }) as string[]}
                  className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent"
                  speed={100}
                  deleteSpeed={60}
                  pauseTime={2500}
                />
              </h1>
            </div>
            
            {/* Subheadline compacta */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Stats minimalistas */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-brand-blue mb-1">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('hero.stats.companies')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-brand-blue mb-1">98%</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('hero.stats.success')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-brand-blue mb-1">30 {i18n.language.split('-')[0] === 'en' ? 'days' : i18n.language.split('-')[0] === 'es' ? 'días' : 'dias'}</div>
                <div className="text-xs sm:text-sm text-gray-600">{t('hero.stats.implementation')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Carousel Section */}
      <section className="py-6 sm:py-8 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">{t('categories.title')}</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('categories.subtitle')}
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Main Carousel */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-blue-50/30">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {translatedCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div 
                      key={category.id} 
                      className="w-full flex-shrink-0 p-4 sm:p-6 md:p-8"
                    >
                      <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
                          {/* Left Content */}
                          <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-blue to-brand-blue/80 rounded-xl flex items-center justify-center shadow-lg">
                                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                                  {category.name}
                                </h3>
                                <Badge variant="outline" className={`${category.color} border-0 text-xs sm:text-sm`}>
                                  {category.description}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                              {category.detailedDescription}
                            </p>

                            {/* Benefits */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {category.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                                  <span className="text-xs text-gray-600 dark:text-gray-300">{benefit}</span>
                                </div>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                              <Button 
                                onClick={scrollToForm}
                                className="flex-1 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-brand-blue/90 hover:via-blue-600/90 hover:to-brand-blue/90 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                              >
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                {t('categories.buttons.scheduleMeeting')}
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => {
                                  const routes = {
                                    0: '/solucoes/automacao-vendas',
                                    1: '/solucoes/atendimento-inteligente', 
                                    2: '/solucoes/rh-inteligente',
                                    3: '/solucoes/bi-analytics',
                                    4: '/solucoes/automacao-processos',
                                    5: '/solucoes/voz-linguagem'
                                  };
                                  navigate(routes[currentSlide] || '/agentes-ia');
                                }}
                                className="flex-1 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                              >
                                <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                {t('categories.buttons.viewDetails')}
                              </Button>
                            </div>
                          </div>

                          {/* Right Stats */}
                          <div className="space-y-3 sm:space-y-4">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 dark:border-gray-700">
                              <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 flex items-center gap-2">
                                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue" />
                                {t('categories.results')}
                              </h4>
                              <div className="grid grid-cols-1 gap-2">
                                {Object.entries(category.stats).map(([key, value], idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-md">
                                    <span className="text-xs text-gray-600 dark:text-gray-300">
                                      {category.statsLabels[key] || key}
                                    </span>
                                    <span className="text-xs font-semibold text-brand-blue">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center mt-4 sm:mt-6">
              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {translatedCategories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-brand-blue scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose Our Products */}
      <section className="py-12 sm:py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">{t('features.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('features.titleHighlight')}</span></h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">{t('features.items.portuguese.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{t('features.items.portuguese.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Database className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">{t('features.items.integration.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{t('features.items.integration.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">{t('features.items.availability.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{t('features.items.availability.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">{t('features.items.analytics.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{t('features.items.analytics.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-blue text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
            <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
            {t('cta.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
            {t('cta.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('cta.titleHighlight')}</span> {t('cta.titleEnd')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-600 dark:text-gray-300">
            {t('cta.description')}
          </p>
          
          {/* Social proof cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border border-brand-blue/20 dark:border-gray-700">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-base sm:text-lg font-bold text-brand-blue">{t('cta.proofCards.sales.title')}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{t('cta.proofCards.sales.subtitle')}</div>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border border-brand-blue/20 dark:border-gray-700">
              <HeadphonesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mx-auto mb-2" />
              <div className="text-base sm:text-lg font-bold text-brand-blue">{t('cta.proofCards.support.title')}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{t('cta.proofCards.support.subtitle')}</div>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border border-brand-blue/20 dark:border-gray-700">
              <Workflow className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mx-auto mb-2" />
              <div className="text-base sm:text-lg font-bold text-brand-blue">{t('cta.proofCards.processes.title')}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300">{t('cta.proofCards.processes.subtitle')}</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mb-4 sm:mb-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-brand-blue/90 hover:via-blue-600/90 hover:to-brand-blue/90 text-white font-medium px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              onClick={scrollToForm}
            >
              <span className="relative z-10 flex items-center">
                <Send className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                {t('cta.button')}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue-light opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </div>
          
          {/* Benefits */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.consulting')}</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.demand')}</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.results')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}