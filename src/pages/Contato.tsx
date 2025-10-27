import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, ValidationError } from '@formspree/react';

const Contato = () => {
  const [state, handleSubmit] = useForm("xyzpvjrd");
  const [mapLoading, setMapLoading] = useState(true);

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200/50 max-w-md w-full text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                Mensagem Enviada com Sucesso!
              </span>
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-green-200/50">
              <p className="text-gray-700 text-center text-sm sm:text-base">
                <span className="font-bold text-green-600">✓ Recebemos sua mensagem!</span><br/>
                Nossa equipe responderá em até <span className="font-bold text-brand-blue">2 horas úteis</span> com uma proposta personalizada.
              </p>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-brand-blue" />
                <span>Confirmação enviada para seu email</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                <span>Tempo de resposta: até 2 horas úteis</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Enviar Nova Mensagem
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                Voltar ao Início
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
                Fale Conosco
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Transforme Sua Empresa com <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">IA em 30 Dias</span>
              </h1>
              
              {/* AIDA - Atenção + Interesse */}
              <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-6 sm:mb-10">
                <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg">
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                    <span className="font-bold text-red-600">ALERTA:</span> Sua concorrência já está usando IA para aumentar produtividade em <span className="font-bold text-green-600">420%</span> e reduzir custos operacionais drasticamente.
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
                    Nossa <span className="font-bold text-brand-blue">metodologia LÍDER</span> já transformou <span className="font-bold text-brand-blue">350+ empresas</span> com resultados comprovados em apenas 30 dias. Não deixe sua empresa ficar para trás!
                  </p>
                </div>
              </div>

              {/* AIDA - Desejo */}
              <div className="bg-white border border-green-300 rounded-xl p-4 sm:p-6 max-w-4xl mx-auto mb-4 sm:mb-6 shadow-sm">
                <div className="text-center mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">BENEFÍCIOS EXCLUSIVOS</h3>
                  <p className="text-xs sm:text-sm text-gray-600">O que você recebe ao entrar em contato hoje</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Diagnóstico Empresarial</h4>
                      <p className="text-xs text-gray-600">Análise completa e gratuita da sua empresa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Projeção de ROI</h4>
                      <p className="text-xs text-gray-600">Cálculo personalizado do retorno sobre investimento</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Plano de Implementação</h4>
                      <p className="text-xs text-gray-600">Roadmap detalhado para 30 dias</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Consultoria Estratégica</h4>
                      <p className="text-xs text-gray-600">Sessão gratuita sem compromisso</p>
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
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/50">
                  <div className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-brand-blue/20">
                      <Mail className="h-3 w-3" />
                      Informações de Contato
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                      Fale <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Conosco</span>
                    </h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Email</h4>
                        <p className="text-xs sm:text-sm text-gray-600">atendimento.ai@onsmart.com.br</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Telefone</h4>
                        <p className="text-xs sm:text-sm text-gray-600">+55 11 99666-9247</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Horário</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Segunda à Sexta, 9h às 18h</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Endereço</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Rua Arizona, 1349</p>
                        <p className="text-xs text-gray-500">São Paulo - SP</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/50">
                  <div className="mb-3 sm:mb-4">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/5 text-orange-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-orange-500/20">
                      <MapPin className="h-3 w-3" />
                      Nossa Localização
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      Visite nosso <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-clip-text text-transparent">Escritório</span>
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
                        <p className="text-xs sm:text-sm text-brand-blue font-medium">Carregando mapa...</p>
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
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-gray-200/50">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 border border-green-500/20">
                      <CheckCircle className="h-3 w-3" />
                      Resposta Garantida
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Respondemos todos os contatos em até <span className="font-bold text-brand-blue">2 horas úteis</span>
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
                      Formulário de Contato
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                      Garanta Seu <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Diagnóstico Gratuito</span>
                    </h2>
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <p className="text-gray-800 text-sm sm:text-base font-semibold">
                        Descubra o potencial de economia da IA na sua empresa
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Preencha o formulário abaixo e receba em até <span className="font-bold text-green-600">2 horas úteis</span>: análise personalizada, projeção de ROI e plano de implementação detalhado.
                      </p>
                    </div>
                    
                    {/* Social Proof */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                        <div>
                          <div className="text-base sm:text-lg font-bold text-blue-600">1.247</div>
                          <div className="text-xs text-gray-600">Empresas atendidas</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-bold text-blue-600">4.9/5</div>
                          <div className="text-xs text-gray-600">Satisfação média</div>
                        </div>
                        <div>
                          <div className="text-base sm:text-lg font-bold text-blue-600">2h</div>
                          <div className="text-xs text-gray-600">Tempo resposta</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg text-sm sm:text-base"
                          placeholder="Seu nome completo"
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
                          Email Profissional *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          required
                          className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg text-sm sm:text-base"
                          placeholder="seu@empresa.com"
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
                        Nome da Empresa
                      </label>
                      <Input
                        id="company"
                        type="text"
                        name="company"
                        className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue rounded-lg text-sm sm:text-base"
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Como podemos ajudar? *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full border-gray-300 focus:border-brand-blue focus:ring-brand-blue resize-none rounded-lg text-sm sm:text-base"
                        placeholder="Ex: Quero automatizar atendimento ao cliente, reduzir custos operacionais, aumentar produtividade da equipe..."
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
                          <p className="font-bold text-green-700 mb-2 sm:mb-3">BÔNUS EXCLUSIVO ao enviar hoje:</p>
                          <div className="space-y-1 sm:space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">Diagnóstico IA</span> personalizado (valor R$ 2.500)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">Projeção ROI</span> detalhada da sua empresa</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">Roadmap 30 dias</span> para implementação</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span><span className="font-semibold">Consultoria estratégica</span> de 1 hora gratuita</span>
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
                          Enviando Solicitação...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                          SOLICITAR DIAGNÓSTICO GRATUITO
                        </div>
                      )}
                    </Button>
                    
                    {/* Trust indicators abaixo do botão */}
                    <div className="text-center space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Dados 100% seguros
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Sem spam
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Resposta em 2h
                        </span>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3">
                        <p className="text-xs text-green-700 font-medium">
                          Últimas 48 horas: <span className="font-bold">127 empresas</span> solicitaram diagnóstico
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