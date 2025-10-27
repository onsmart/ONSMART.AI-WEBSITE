
import React from "react";
import { Clock, TrendingUp, Users, Star, Shield, CheckCircle } from "lucide-react";
import DynamicSocialProof from "@/components/shared/DynamicSocialProof";
import OptimizedCTAHierarchy from "@/components/shared/OptimizedCTAHierarchy";
import { getUrgencyMessage } from "@/utils/urgencyMessages";

const ContatoHero = () => {
  return (
    <section className="py-4 sm:py-6 md:py-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
      {/* Background Pattern Clean */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          {/* Badge Superior - Estilo Homepage */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
            <Clock className="h-3 w-3" />
            Fale Conosco
          </div>
          
          {/* Título padronizado - Mesmo tamanho das outras seções */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            <span className="text-gray-900 dark:text-white">Entre em </span>
            <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              Contato
            </span>
          </h1>
          
          {/* Subheadline compacto */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 sm:px-2 md:px-0 mb-6">
            Converse com nossos <span className="font-bold text-brand-blue">especialistas em IA</span> e descubra como
            <span className="font-bold text-brand-blue"> transformar sua empresa</span> em 30 dias
          </p>

          {/* Stats Cards - Estilo Homepage */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">420%</div>
              <div className="text-xs text-gray-600">ROI Médio</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">350+</div>
              <div className="text-xs text-gray-600">Empresas</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 col-span-2 md:col-span-1">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">30 dias</div>
              <div className="text-xs text-gray-600">Implementação</div>
            </div>
          </div>

          {/* Trust Indicators - Estilo Homepage */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>✓ Resposta em 2h</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>✓ Consultoria gratuita</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>✓ Sem compromisso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContatoHero;
