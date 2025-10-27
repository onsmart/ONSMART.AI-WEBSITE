
import React from "react";
import { Shield, Clock, Award, Users, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrustSignals = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Trust Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/5 text-green-600 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-green-500/20">
            <Shield className="h-3 w-3" />
            100% Gratuito e Sem Compromisso
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Diagnóstico <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Confiável</span> e Personalizado
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            Mais de <span className="font-bold text-brand-blue">350 empresas</span> já transformaram seus processos com nossa <span className="font-bold text-brand-blue">metodologia LÍDER</span> comprovada
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 sm:mb-12">
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1 text-center">350+</div>
            <div className="text-xs text-gray-500 text-center">Empresas Transformadas</div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-brand-blue mb-1 text-center">420%</div>
            <div className="text-xs text-gray-500 text-center">ROI Médio</div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1 text-center">24h</div>
            <div className="text-xs text-gray-500 text-center">Tempo de Resposta</div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-1 text-center">98%</div>
            <div className="text-xs text-gray-500 text-center">Satisfação</div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-green-500/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Diagnóstico Completo</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Análise detalhada dos seus processos e identificação de oportunidades de automação</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-brand-blue/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">Resposta Garantida</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Nossa equipe entra em contato em até 24 horas com seu plano personalizado</p>
              </div>
            </div>
          </div>
          
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-purple-500/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Metodologia Comprovada</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Processo testado e validado por centenas de empresas de diferentes setores</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-gray-200/50 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-base font-bold text-gray-900">4.9/5</span>
            </div>
            <blockquote className="text-gray-900 font-medium mb-3 text-sm sm:text-base">
              "Implementação <span className="text-brand-blue font-bold">rápida</span> e resultados <span className="text-green-600 font-bold">surpreendentes</span>. Recomendo!"
            </blockquote>
            <cite className="text-gray-500 text-sm">CEO • TechCorp</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
