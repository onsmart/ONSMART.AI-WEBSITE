import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Target, Users, Zap, Star, Shield, TrendingUp, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { useTranslation } from 'react-i18next';

const Servicos = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['servicos', 'common']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactClick = () => {
    navigate('/contato');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('submitted.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('submitted.description')}
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white"
            >
              {t('submitted.button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-white dark:bg-gray-900">
      <UnifiedSEO 
        pageType="service"
        pageData={{
          title: t('seo.title'),
          description: t('seo.description')
        }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <section id="hero-section" className="py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800/50 dark:via-blue-900/10 dark:to-brand-blue/5 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="text-center mb-8 animate-fade-in">
              {/* Badge Superior Profissional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Users className="h-3 w-3" />
                {t('hero.badge')}
              </div>
              
              {/* Título principal - Padronizado */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
                {t('hero.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
              </h1>
              
              {/* Subheadline compacto */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
                {t('hero.subtitle')} <span className="font-bold text-brand-blue">{t('hero.subtitleHighlight1')}</span> {t('hero.subtitleEnd')} <span className="font-bold text-brand-blue">{t('hero.subtitleHighlight2')}</span>
              </p>
            </div>

            {/* Stats Cards estilo HeroSection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue mb-1">350+</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">{t('stats.companies')}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t('stats.companiesDescription')}</div>
                </div>
              </div>

              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">420%</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">{t('stats.productivity')}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t('stats.productivityDescription')}</div>
                </div>
              </div>

              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">30</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">{t('stats.days')}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t('stats.daysDescription')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800/50 dark:via-blue-900/10 dark:to-brand-blue/5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="text-center mb-8 animate-fade-in">
              {/* Badge Superior Profissional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Star className="h-3 w-3" />
                {t('benefits.badge')}
              </div>
              
              {/* Título principal - Padronizado */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
                {t('benefits.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('benefits.titleHighlight')}</span>
              </h2>
              
              {/* Subheadline compacto */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
                {t('benefits.subtitle')} <span className="font-bold text-brand-blue">{t('benefits.subtitleHighlight1')}</span>, {t('benefits.subtitleEnd')} <span className="font-bold text-brand-blue">{t('benefits.subtitleHighlight2')}</span>
              </p>
            </div>
            
            {/* Cards estilo HeroSection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand-blue mb-1">{t('benefits.items.methodology.title')}</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">{t('benefits.items.methodology.subtitle')}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t('benefits.items.methodology.description')}</div>
                </div>
              </div>
              
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-green-600 mb-1">{t('benefits.items.experts.title')}</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">{t('benefits.items.experts.subtitle')}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t('benefits.items.experts.description')}</div>
                </div>
              </div>
              
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-purple-600 mb-1">{t('benefits.items.implementation.title')}</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">{t('benefits.items.implementation.subtitle')}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t('benefits.items.implementation.description')}</div>
                </div>
              </div>
              
              <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-orange-600 mb-1">{t('benefits.items.support.title')}</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">{t('benefits.items.support.subtitle')}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t('benefits.items.support.description')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800/50 dark:via-blue-900/10 dark:to-brand-blue/5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="text-center mb-8 animate-fade-in">
              {/* Badge Superior Profissional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Mail className="h-3 w-3" />
                {t('contact.badge')}
              </div>
              
              {/* Título principal - Padronizado */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
                {t('contact.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('contact.titleHighlight')}</span> {t('contact.titleEnd')}
              </h2>
              
              {/* Subheadline compacto */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
                {t('contact.subtitle')} <span className="font-bold text-brand-blue">{t('contact.subtitleHighlight')}</span> {t('contact.subtitleEnd')}
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('contact.email')}</h3>
                  <p className="text-sm text-gray-600">contato@onsmartai.com</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('contact.phone')}</h3>
                  <p className="text-sm text-gray-600">+55 11 99666-9247</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('contact.location')}</h3>
                  <p className="text-sm text-gray-600">São Paulo - SP</p>
                </div>

                <a 
                  href="https://wa.me/551150931836?text=Olá%20[SRC=ONSMART]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">WhatsApp da Sonia</h3>
                  <p className="text-sm text-gray-600">+55 11 5093-1836</p>
                  <p className="text-xs text-green-600 font-medium mt-1">Assistente IA</p>
                </a>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleContactClick}
                  className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white px-8 py-3"
                >
                  <Users className="h-5 w-5 mr-2" />
                  {t('buttons.requestQuote')}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Servicos;





