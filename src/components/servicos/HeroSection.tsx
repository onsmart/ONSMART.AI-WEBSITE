
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import StatNumber from './StatNumber';
import { Zap, Lightbulb, Heart, Clock, Users, Shield, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleContactClick = () => {
    navigate('/contato');
  };

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

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden bg-gradient-to-b from-brand-blue/5 to-transparent">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center animate-fade-in max-w-4xl mx-auto">
          <div className="inline-block text-sm font-medium mb-6 py-2 px-4 rounded-full bg-brand-blue/10 text-brand-blue">
             Soluções Especializadas em IA
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Transforme seu negócio com nossa metodologia <span className="text-brand-blue">LÍDER comprovada</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Oferecemos <strong>13 serviços especializados</strong> para acelerar sua jornada de IA, 
            desde diagnóstico inicial até implementação completa com resultados mensuráveis.
          </p>

          {/* CTAs simplificados */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button 
              onClick={handleDiagnosticoClick} 
              size="lg" 
              className="bg-brand-blue text-white hover:bg-brand-blue/90"
            >
              Ver Todos os Serviços
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={handleContactClick} 
              variant="outline" 
              size="lg"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5"
            >
              Falar com Especialista
            </Button>
          </div>

          {/* Stats simplificadas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-brand-blue">13</div>
              <div className="text-xs text-gray-600">Serviços</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-brand-blue">350+</div>
              <div className="text-xs text-gray-600">Empresas</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-brand-blue">30 dias</div>
              <div className="text-xs text-gray-600">Implementação</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-brand-blue">420%</div>
              <div className="text-xs text-gray-600">ROI Médio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
