
import React from "react";
import { Send, Clock, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToForm } from "@/utils/scrollUtils";
import { getUrgencyMessage } from "@/utils/urgencyMessages";

const ContatoCTA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleFormClick = () => {
    if (location.pathname === '/contato') {
      // If already on contact page, scroll to form
      scrollToForm();
    } else {
      // Navigate to contact page
      navigate('/contato');
      // Use setTimeout to ensure page loads before scrolling
      setTimeout(() => {
        scrollToForm();
      }, 300);
    }
  };

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
      {/* Background Pattern Clean */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-5xl text-center px-4 sm:px-6 md:px-8 relative z-10">
        {/* Badge Superior - Estilo Homepage */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
          <Send className="h-3 w-3" />
          Comece Agora
        </div>

        {/* Título - Estilo Homepage */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
            Transforme
          </span> sua empresa em{" "}
          <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
            30 dias
          </span> com IA
        </h2>
        
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 sm:px-2 md:px-0 mb-6">
          Junte-se às <span className="font-bold text-brand-blue">350+ empresas</span> que já multiplicaram seus resultados com nossa{" "}
          <span className="font-bold text-brand-blue">metodologia LÍDER</span>
        </p>

        {/* Stats Cards - Estilo Homepage */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-gray-900">420%</div>
            <div className="text-xs text-gray-600">ROI Médio</div>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-gray-900">30 dias</div>
            <div className="text-xs text-gray-600">Implementação</div>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="text-lg font-bold text-gray-900">350+</div>
            <div className="text-xs text-gray-600">Empresas</div>
          </div>
        </div>

        <Button 
          size="lg" 
          className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
          onClick={handleFormClick}
        >
          <Send className="mr-2 h-4 w-4" />
          Falar com Especialista
        </Button>

        {/* Trust Indicators - Estilo Homepage */}
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>✓ Consultoria gratuita</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>✓ Sem compromisso</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>✓ Resposta em 2h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContatoCTA;
