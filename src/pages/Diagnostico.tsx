
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
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
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
                <span>Diagnóstico personalizado em 45 minutos</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% gratuito e sem compromisso</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Outro Diagnóstico
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-6 py-3 rounded-xl transition-all duration-300"
              >
                Voltar ao Início
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
                Diagnóstico de IA
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Descubra Quanto Sua Empresa Pode <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Economizar com IA</span>
              </h1>
              
              {/* AIDA - Atenção + Interesse */}
              <div className="max-w-3xl mx-auto space-y-6 mb-10">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                    <span className="font-bold text-red-600">ALERTA FINANCEIRO:</span> Sua empresa pode estar perdendo R$ 50.000+ por mês em custos operacionais que a IA poderia eliminar imediatamente.
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                    Empresas similares à sua já economizam <span className="font-bold text-brand-blue">420% mais</span> com nossa metodologia LÍDER. Não deixe seus concorrentes saírem na frente!
                  </p>
                </div>
              </div>

              {/* AIDA - Desejo */}
              <div className="bg-white border border-green-300 rounded-xl p-6 max-w-3xl mx-auto mb-6 shadow-sm">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-green-700 mb-2">DIAGNÓSTICO COMPLETO</h3>
                  <p className="text-sm text-gray-600">O que você recebe no diagnóstico gratuito de 45 minutos</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Análise Completa</h4>
                      <p className="text-xs text-gray-600">Avaliação detalhada dos seus processos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Cálculo de Economia</h4>
                      <p className="text-xs text-gray-600">Projeção exata do potencial de economia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Roadmap Personalizado</h4>
                      <p className="text-xs text-gray-600">Plano de implementação customizado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Projeção de ROI</h4>
                      <p className="text-xs text-gray-600">Retorno sobre investimento em 12 meses</p>
                    </div>
                  </div>
                </div>
              </div>

              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">100% Gratuito</span>
                  </div>
                  <p className="text-xs text-gray-600">Sem custos ou compromissos</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">45 Minutos</span>
                  </div>
                  <p className="text-xs text-gray-600">Análise completa e detalhada</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">420% ROI</span>
                  </div>
                  <p className="text-xs text-gray-600">Retorno médio comprovado</p>
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
                      O Que Você Receberá
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Análise <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Completa</span>
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Search className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Identificação de Oportunidades</h4>
                        <p className="text-xs text-gray-600">Áreas específicas onde a IA pode gerar maior ROI</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Projeção de ROI</h4>
                        <p className="text-xs text-gray-600">Cálculos detalhados de retorno sobre investimento</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Roadmap Personalizado</h4>
                        <p className="text-xs text-gray-600">Plano de implementação com cronograma</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Trust Indicators */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-3 border border-green-500/20">
                      <Shield className="h-3 w-3" />
                      Confiança Garantida
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                        350+
                      </span> Empresas Atendidas
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg">
                      <div className="font-bold text-brand-blue">24h</div>
                      <div className="text-xs text-gray-600">Resposta</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-gray-50 to-green-50/30 rounded-lg">
                      <div className="font-bold text-green-600">98%</div>
                      <div className="text-xs text-gray-600">Satisfação</div>
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
                      "Diagnóstico revelou oportunidades que não imaginávamos. ROI de 380% em 6 meses."
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-1">- CEO, Empresa de Logística</p>
                  </div>
                </div>
              </div>
              
              {/* Diagnostic Form */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-md border border-gray-200/50">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                      <Calendar className="h-3 w-3" />
                      Agendar Diagnóstico
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      Garanta Sua <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Vaga Gratuita</span>
                    </h2>
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-800 text-sm sm:text-base font-semibold">
                        Descubra o potencial de economia da IA na sua empresa
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Preencha o formulário abaixo e receba em até <span className="font-bold text-green-600">24 horas</span>: agendamento confirmado, material preparatório e checklist personalizado.
                      </p>
                    </div>
                    
                    {/* Social Proof */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">2.847</div>
                          <div className="text-xs text-gray-600">Diagnósticos realizados</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">4.9/5</div>
                          <div className="text-xs text-gray-600">Satisfação média</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-600">R$ 2.500</div>
                          <div className="text-xs text-gray-600">Valor gratuito</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder="Seu nome completo"
                        />
                        <ValidationError
                          prefix="Nome"
                          field="name"
                          errors={state.errors}
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Profissional *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder="seu@empresa.com"
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa *
                        </label>
                        <Input
                          id="company"
                          type="text"
                          name="company"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder="Nome da sua empresa"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone *
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          name="phone"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                          Setor da Empresa *
                        </label>
                        <input type="hidden" name="sector" id="sector" />
                        <Select onValueChange={(value) => {
                          const hiddenInput = document.getElementById('sector') as HTMLInputElement;
                          if (hiddenInput) hiddenInput.value = value;
                        }}>
                          <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg">
                            <SelectValue placeholder="Selecione o setor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saude">Saúde</SelectItem>
                            <SelectItem value="contabilidade">Contabilidade</SelectItem>
                            <SelectItem value="advocacia">Advocacia</SelectItem>
                            <SelectItem value="varejo">Varejo</SelectItem>
                            <SelectItem value="industria">Indústria</SelectItem>
                            <SelectItem value="servicos">Serviços</SelectItem>
                            <SelectItem value="tecnologia">Tecnologia</SelectItem>
                            <SelectItem value="financeiro">Financeiro</SelectItem>
                            <SelectItem value="educacao">Educação</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-2">
                          Número de Funcionários *
                        </label>
                        <input type="hidden" name="employees" id="employees" />
                        <Select onValueChange={(value) => {
                          const hiddenInput = document.getElementById('employees') as HTMLInputElement;
                          if (hiddenInput) hiddenInput.value = value;
                        }}>
                          <SelectTrigger className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg">
                            <SelectValue placeholder="Selecione o porte" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 funcionários</SelectItem>
                            <SelectItem value="11-50">11-50 funcionários</SelectItem>
                            <SelectItem value="51-200">51-200 funcionários</SelectItem>
                            <SelectItem value="201-500">201-500 funcionários</SelectItem>
                            <SelectItem value="500+">Mais de 500 funcionários</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Principais Desafios da Empresa *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue resize-none rounded-lg"
                        placeholder="Descreva os principais desafios que sua empresa enfrenta e onde acredita que a IA poderia ajudar..."
                      />
                      <ValidationError
                        prefix="Mensagem"
                        field="message"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-brand-blue/5 rounded-lg p-4 border border-brand-blue/20">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          <p className="font-medium text-gray-900 mb-1">Ao solicitar o diagnóstico, você receberá:</p>
                          <ul className="space-y-1 text-xs">
                            <li>• Contato da nossa equipe em até 24 horas</li>
                            <li>• Agendamento de sessão de 45 minutos</li>
                            <li>• Análise personalizada 100% gratuita</li>
                            <li>• Relatório com oportunidades identificadas</li>
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
                          Enviando Solicitação...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Solicitar Diagnóstico Gratuito
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
