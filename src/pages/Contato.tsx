import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, ValidationError } from '@formspree/react';
import { useTranslation } from 'react-i18next';

const Contato = () => {
  const [state, handleSubmit] = useForm("xyzpvjrd");
  const [mapLoading, setMapLoading] = useState(true);
  const { t } = useTranslation(['contato', 'common']);

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-md w-full text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                {t('success.title')}
              </span>
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-green-200/50">
              <p className="text-gray-700 text-center text-sm sm:text-base">
                <span className="font-bold text-green-600">{t('success.message')}</span><br/>
                {t('success.responseTime')} <span className="font-bold text-brand-blue">{t('success.responseTimeValue')}</span> {t('success.responseTimeEnd')}
              </p>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue" />
                <span>{t('success.emailConfirmation')}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                <span>{t('success.responseTimeLabel')}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                {t('success.sendAnother')}
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                {t('success.backToHome')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <div className="text-center mb-8 sm:mb-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-brand-blue/20">
                <MessageCircle className="h-3 w-3" />
                {t('hero.badge')}
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                {t('hero.title').replace(t('hero.titleHighlight'), '')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
              </h1>
              
              {/* AIDA - Atenção + Interesse */}
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-6 sm:mb-10">
                <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg">
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold text-red-600">{t('hero.alert.title')}</span> {t('hero.alert.message')} <span className="font-bold text-green-600">{t('hero.alert.productivity')}</span> {t('hero.alert.andMessage')}
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                    Nossa <span className="font-bold text-brand-blue">{t('hero.leader.methodology')}</span> {t('hero.leader.message')} <span className="font-bold text-brand-blue">{t('hero.leader.companies')}</span> {t('hero.leader.results')}
                  </p>
                </div>
              </div>

              {/* AIDA - Desejo */}
              <div className="bg-white dark:bg-gray-800 border border-green-300 dark:border-green-600 rounded-xl p-4 sm:p-6 max-w-4xl mx-auto mb-4 sm:mb-6 shadow-sm">
                <div className="text-center mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">{t('hero.benefits.title')}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{t('hero.benefits.subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('hero.benefits.items.diagnostic.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.benefits.items.diagnostic.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('hero.benefits.items.roi.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.benefits.items.roi.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('hero.benefits.items.implementation.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.benefits.items.implementation.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('hero.benefits.items.consulting.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.benefits.items.consulting.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-8 sm:pb-12 md:pb-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
              
              {/* Contact Info & Location */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Contact Information */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                  <div className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-brand-blue/20">
                      <Mail className="h-3 w-3" />
                      {t('info.title')}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                      {t('info.contactTitle')}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('info.contactInfo.email.label')}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{t('info.contactInfo.email.value')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('info.contactInfo.phone.label')}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{t('info.contactInfo.phone.value')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('info.contactInfo.hours.label')}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{t('info.contactInfo.hours.value')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">{t('info.contactInfo.address.label')}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Rua Arizona, 1349</p>
                        <p className="text-xs text-gray-500">São Paulo - SP</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                  <div className="mb-3 sm:mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/5 text-orange-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-orange-500/20">
                      <MapPin className="h-3 w-3" />
                      {t('info.location.badge')}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                      {t('info.location.title')}
                    </h3>
                  </div>
                  
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 relative">
                    {/* Loading Animation */}
                    {mapLoading && (
                      <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center z-10">
                        <div className="relative mb-4">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue animate-pulse" />
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-brand-blue font-medium">{t('info.location.loading')}</p>
                      </div>
                    )}
                    
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.2847474916945!2d-46.66149092502845!3d-23.588926478787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce574b1b7b1b1b%3A0x1b1b1b1b1b1b1b1b!2sRua%20Arizona%2C%201349%20-%20Berrini%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização onsmart AI - Rua Arizona, 1349"
                      onLoad={() => setMapLoading(false)}
                    />
                  </div>
                  
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg border border-gray-200/50">
                    <p className="text-xs text-gray-600 text-center">
                      <span className="font-semibold">Rua Arizona, 1349</span> • Berrini • São Paulo - SP
                    </p>
                  </div>
                </div>
                
                {/* Trust Indicator */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-green-500/20">
                      <CheckCircle className="h-3 w-3" />
                      {t('guarantee.badge')}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t('guarantee.message')} <span className="font-bold text-brand-blue">{t('guarantee.value')}</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-md border border-gray-200/50 h-fit">
                  <div className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-brand-blue/20">
                      <Send className="h-3 w-3" />
                      {t('form.title')}
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
                      {t('form.diagnosticTitle')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('form.diagnosticHighlight')}</span>
                    </h2>
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base font-semibold">
                        {t('form.discoverPotential')}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {t('form.fillFormDescription')} <span className="font-bold text-green-600">{t('form.fillFormDescriptionValue')}</span>{t('form.fillFormDescriptionEnd')}
                      </p>
                    </div>
                    
                    {/* Social Proof */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                        <div>
                          <div className="text-base sm:text-lg font-bold text-blue-600">1.247</div>
                          <div className="text-xs text-gray-600">{t('form.socialProof.companies')}</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-bold text-blue-600">4.9/5</div>
                          <div className="text-xs text-gray-600">{t('form.socialProof.satisfaction')}</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-bold text-blue-600">2h</div>
                          <div className="text-xs text-gray-600">{t('form.socialProof.responseTime')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          {t('form.name.label')} *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg text-sm sm:text-base"
                          placeholder={t('form.name.placeholder')}
                        />
                        <ValidationError
                          prefix="Nome"
                          field="name"
                          errors={state.errors}
                          className="text-red-500 text-xs sm:text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          {t('form.email.label')} *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg text-sm sm:text-base"
                          placeholder={t('form.email.placeholder')}
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-red-500 text-xs sm:text-sm mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        {t('form.company.label')}
                      </label>
                      <Input
                        id="company"
                        type="text"
                        name="company"
                        className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg text-sm sm:text-base"
                        placeholder={t('form.company.placeholder')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        {t('form.message.label')} *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue resize-none rounded-lg text-sm sm:text-base"
                        placeholder={t('form.message.placeholder')}
                      />
                      <ValidationError
                        prefix="Mensagem"
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      />
                    </div>
                    
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-xs sm:text-sm text-gray-700">
                          <p className="font-bold text-green-700 mb-2 sm:mb-3">{t('form.bonus.title')}</p>
                          <div className="space-y-1 sm:space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">{t('form.bonus.items.diagnostic.title')}</span> {t('form.bonus.items.diagnostic.value')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">{t('form.bonus.items.roi.title')}</span> {t('form.bonus.items.roi.description')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">{t('form.bonus.items.roadmap.title')}</span> {t('form.bonus.items.roadmap.description')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">{t('form.bonus.items.consulting.title')}</span> {t('form.bonus.items.consulting.description')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                    <Button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 sm:py-4 md:py-5 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base md:text-lg border-2 border-green-500/20"
                    >
                      {state.submitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          {t('form.sending')}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                          {t('form.submit')}
                        </div>
                      )}
                    </Button>
                    
                    {/* Trust indicators abaixo do botão */}
                    <div className="text-center space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {t('form.trust.secure')}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {t('form.trust.noSpam')}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          {t('form.trust.responseTime')}
                        </span>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                        <p className="text-xs text-green-700 font-medium">
                          {t('form.lastCompanies')} <span className="font-bold">127 {t('form.companiesRequested')}</span>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contato;