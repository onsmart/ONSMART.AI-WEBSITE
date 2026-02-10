
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Calendar, Clock, Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ServicesCtaSectionProps {
  handleContactClick: () => void;
}

const ServicesCtaSection: React.FC<ServicesCtaSectionProps> = ({ handleContactClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDiagnosticoClick = () => {
    if (location.pathname === "/diagnostico") {
      const formElement = document.getElementById('diagnostico-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate("/diagnostico");
      setTimeout(() => {
        const formElement = document.getElementById('diagnostico-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = "https://wa.me/5511996669247?text=" + encodeURIComponent("Olá! Vim pelo site da Onsmart.ai");
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-gradient-to-br from-brand-black to-brand-blue">
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-[80px] -z-10"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[80px] -z-10"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Escolha a melhor forma de começar
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Oferecemos diferentes caminhos para você conhecer nossos serviços e encontrar a solução ideal para sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Diagnóstico Gratuito */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-green-500/20 mb-4 group-hover:bg-green-500/30 transition-all">
                <Calendar className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Diagnóstico Gratuito</h3>
              <p className="text-white/80 mb-6">
                Análise completa das oportunidades de IA em sua empresa em 15 minutos.
              </p>
              <Button 
                onClick={handleDiagnosticoClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Fazer Diagnóstico
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
              <div className="mt-3 text-xs text-white/70">
                ✓ Sem compromisso • ✓ Resultado imediato
              </div>
            </div>
          </div>

          {/* Consultoria Especializada */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-blue-500/20 mb-4 group-hover:bg-blue-500/30 transition-all">
                <MessageCircle className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Consultoria Especializada</h3>
              <p className="text-white/80 mb-6">
                Conversa personalizada com nossos especialistas para seu projeto específico.
              </p>
              <Button 
                onClick={handleContactClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Agendar Consultoria
                <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
              <div className="mt-3 text-xs text-white/70">
                ✓ Proposta personalizada • ✓ Resposta em 2h
              </div>
            </div>
          </div>

          {/* WhatsApp Direto */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-yellow-500/20 mb-4 group-hover:bg-yellow-500/30 transition-all">
                <MessageCircle className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">WhatsApp Direto</h3>
              <p className="text-white/80 mb-6">
                Tire suas dúvidas rapidamente via WhatsApp com nossa equipe.
              </p>
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Chamar no WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="mt-3 text-xs text-white/70">
                ✓ Resposta rápida • ✓ Sem formalidades
              </div>
            </div>
          </div>
        </div>

        {/* Garantias e diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3 text-white/90">
            <Clock className="h-5 w-5 text-green-400" />
            <span>Implementação em 30 dias</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/90">
            <Shield className="h-5 w-5 text-blue-400" />
            <span>Garantia de 90 dias</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/90">
            <MessageCircle className="h-5 w-5 text-yellow-400" />
            <span>Suporte especializado 24/7</span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/80 text-sm mb-2">Potencializado por</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-white font-bold text-xl">onsmart</span>
            <span className="text-white/60 text-xl">AI</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCtaSection;
