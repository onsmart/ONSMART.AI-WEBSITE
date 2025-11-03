
import React, { useState } from "react";
import { Search, CheckCircle, Calendar, Clock, Users, TrendingUp, Send, ArrowRight, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, ValidationError } from '@formspree/react';
import { useTranslation } from 'react-i18next';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const Diagnostico = () => {
  const [state, handleSubmit] = useForm("mwprkloy");
  const { t } = useTranslation(['diagnostico', 'common']);

  if (state.succeeded) {
    return (
      <>
        <UnifiedSEO 
          pageType="page"
          pageData={{
            title: t('seo.title'),
            description: t('seo.description')
          }}
        />
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                {t('success.title')}
              </span>
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-lg p-4 mb-6 border border-green-200/50">
              <p className="text-gray-700 text-center">
                <span className="font-bold text-green-600">{t('success.message')}</span><br/>
                {t('success.responseTime')} <span className="font-bold text-brand-blue">{t('success.responseTimeValue')}</span> {t('success.responseTimeEnd')}
              </p>
            </div>
              <div className="text-sm text-gray-600 mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 text-brand-blue" />
                <span>{t('success.diagnosticTime')}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{t('success.freeGuarantee')}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t('success.scheduleAnother')}
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-6 py-3 rounded-xl transition-all duration-300"
              >
                {t('success.backToHome')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <UnifiedSEO 
        pageType="page"
        pageData={{
          title: t('seo.title'),
          description: t('seo.description')
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10">
          {/* Hero Section */}
        <section className="py-8 sm:py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Search className="h-3 w-3" />
                {t('hero.badge')}
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t('hero.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
              </h1>
              
              {/* AIDA - Atenção + Interesse */}
              <div className="max-w-3xl mx-auto space-y-6 mb-10">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold text-red-600">{t('hero.alerts.financial.label')}</span> {t('hero.alerts.financial.message')}
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                    {t('hero.alerts.competitor.message')} <span className="font-bold text-brand-blue">{t('hero.alerts.competitor.highlight')}</span> {t('hero.alerts.competitor.end')}
                  </p>
                </div>
              </div>

              {/* AIDA - Desejo */}
              <div className="bg-white dark:bg-gray-800 border border-green-300 dark:border-green-600 rounded-xl p-6 max-w-3xl mx-auto mb-6 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-green-700 mb-2">{t('hero.completeDiagnostic.title')}</h3>
                  <p className="text-sm text-gray-600">{t('hero.completeDiagnostic.subtitle')}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{t('hero.completeDiagnostic.items.analysis.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.completeDiagnostic.items.analysis.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{t('hero.completeDiagnostic.items.savings.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.completeDiagnostic.items.savings.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{t('hero.completeDiagnostic.items.roadmap.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.completeDiagnostic.items.roadmap.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{t('hero.completeDiagnostic.items.roi.title')}</h4>
                      <p className="text-xs text-gray-600">{t('hero.completeDiagnostic.items.roi.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{t('hero.stats.free.label')}</span>
                  </div>
                  <p className="text-xs text-gray-600">{t('hero.stats.free.description')}</p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{t('hero.stats.time.label')}</span>
                  </div>
                  <p className="text-xs text-gray-600">{t('hero.stats.time.description')}</p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{t('hero.stats.roi.label')}</span>
                  </div>
                  <p className="text-xs text-gray-600">{t('hero.stats.roi.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Benefits Info */}
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-3 border border-brand-blue/20">
                      <Search className="h-3 w-3" />
                      {t('benefits.sectionTitle')}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {t('benefits.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('benefits.titleHighlight')}</span>
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Search className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{t('benefits.items.opportunities.title')}</h4>
                        <p className="text-xs text-gray-600">{t('benefits.items.opportunities.description')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{t('benefits.items.roiProjection.title')}</h4>
                        <p className="text-xs text-gray-600">{t('benefits.items.roiProjection.description')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{t('benefits.items.roadmap.title')}</h4>
                        <p className="text-xs text-gray-600">{t('benefits.items.roadmap.description')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-3 border border-green-500/20">
                      <Shield className="h-3 w-3" />
                      {t('guarantee.badge')}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                        350+
                      </span> {t('guarantee.title')}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg">
                      <div className="font-bold text-brand-blue">{t('guarantee.stats.response.value')}</div>
                      <div className="text-xs text-gray-600">{t('guarantee.stats.response.label')}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-green-50/30 rounded-lg">
                      <div className="font-bold text-green-600">{t('guarantee.stats.satisfaction.value')}</div>
                      <div className="text-xs text-gray-600">{t('guarantee.stats.satisfaction.label')}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50/30 rounded-lg border border-yellow-200/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                    <p className="text-xs text-gray-700 text-center italic">
                      "{t('guarantee.testimonial.quote')}"
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-1">- {t('guarantee.testimonial.author')}</p>
                  </div>
                </div>
              </div>
              
              {/* Diagnostic Form */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-md border border-gray-200/50">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                      <Calendar className="h-3 w-3" />
                      {t('form.badge')}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {t('form.title')} <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">{t('form.titleHighlight')}</span>
                    </h2>
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-800 dark:text-gray-300 text-sm sm:text-base font-semibold">
                        {t('form.subtitle')}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {t('form.description')} <span className="font-bold text-green-600">{t('form.descriptionHighlight')}</span> {t('form.descriptionEnd')}
                      </p>
                    </div>
                    
                    {/* Social Proof */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">{t('form.socialProof.diagnostics.value')}</div>
                          <div className="text-xs text-gray-600">{t('form.socialProof.diagnostics.label')}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">{t('form.socialProof.satisfaction.value')}</div>
                          <div className="text-xs text-gray-600">{t('form.socialProof.satisfaction.label')}</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">{t('form.socialProof.value.value')}</div>
                          <div className="text-xs text-gray-600">{t('form.socialProof.value.label')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.name.label')} *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder={t('form.name.placeholder')}
                        />
                        <ValidationError
                          prefix={t('form.name.label')}
                          field="name"
                          errors={state.errors}
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.email.label')} *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder={t('form.email.placeholder')}
                        />
                        <ValidationError
                          prefix={t('form.email.label')}
                          field="email"
                          errors={state.errors}
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.company.label')} *
                        </label>
                        <Input
                          id="company"
                          type="text"
                          name="company"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder={t('form.company.placeholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.phone.label')} *
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          name="phone"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder={t('form.phone.placeholder')}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.sector.label')} *
                        </label>
                        <input type="hidden" name="sector" id="sector" />
                        <Select onValueChange={(value) => {
                          const hiddenInput = document.getElementById('sector') as HTMLInputElement;
                          if (hiddenInput) hiddenInput.value = value;
                        }}>
                          <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg">
                            <SelectValue placeholder={t('form.sector.placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saude">{t('form.sector.options.saude')}</SelectItem>
                            <SelectItem value="contabilidade">{t('form.sector.options.contabilidade')}</SelectItem>
                            <SelectItem value="advocacia">{t('form.sector.options.advocacia')}</SelectItem>
                            <SelectItem value="varejo">{t('form.sector.options.varejo')}</SelectItem>
                            <SelectItem value="industria">{t('form.sector.options.industria')}</SelectItem>
                            <SelectItem value="servicos">{t('form.sector.options.servicos')}</SelectItem>
                            <SelectItem value="tecnologia">{t('form.sector.options.tecnologia')}</SelectItem>
                            <SelectItem value="financeiro">{t('form.sector.options.financeiro')}</SelectItem>
                            <SelectItem value="educacao">{t('form.sector.options.educacao')}</SelectItem>
                            <SelectItem value="outro">{t('form.sector.options.outro')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-2">
                          {t('form.employees.label')} *
                        </label>
                        <input type="hidden" name="employees" id="employees" />
                        <Select onValueChange={(value) => {
                          const hiddenInput = document.getElementById('employees') as HTMLInputElement;
                          if (hiddenInput) hiddenInput.value = value;
                        }}>
                          <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg">
                            <SelectValue placeholder={t('form.employees.placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">{t('form.employees.options.1-10')}</SelectItem>
                            <SelectItem value="11-50">{t('form.employees.options.11-50')}</SelectItem>
                            <SelectItem value="51-200">{t('form.employees.options.51-200')}</SelectItem>
                            <SelectItem value="201-500">{t('form.employees.options.201-500')}</SelectItem>
                            <SelectItem value="500+">{t('form.employees.options.500+')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.currentChallenges.label')} *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue resize-none rounded-lg"
                        placeholder={t('form.currentChallenges.placeholder')}
                      />
                      <ValidationError
                        prefix={t('form.currentChallenges.label')}
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-brand-blue/5 rounded-lg p-4 border border-brand-blue/20">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">{t('form.bonus.title')}</p>
                          <ul className="space-y-1 text-xs">
                            <li>• {t('form.bonus.items.contact')}</li>
                            <li>• {t('form.bonus.items.schedule')}</li>
                            <li>• {t('form.bonus.items.analysis')}</li>
                            <li>• {t('form.bonus.items.report')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-base"
                    >
                      {state.submitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          {t('form.sending')}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Calendar className="h-5 w-5" />
                          {t('form.submit')}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default Diagnostico;
