import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CtaSectionProps {
  handleContactClick: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ handleContactClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDiagnosticoClick = () => {
    if (location.pathname === "/diagnostico") {
      // If already on diagnostico page, just scroll to form
      const formElement = document.getElementById('diagnostico-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to diagnostico page
      navigate("/diagnostico");
      // Use setTimeout to ensure page loads before scrolling
      setTimeout(() => {
        const formElement = document.getElementById('diagnostico-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-blue-light/20 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-xl animate-fade-in border border-brand-blue-light/20">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para transformar seu negócio?</h2>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 max-w-2xl">
                Agende uma consulta gratuita e descubra como nossa abordagem de IA pode impulsionar sua produtividade e reduzir custos operacionais.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Implementação rápida com resultados tangíveis",
                  "Soluções customizadas para seu setor e necessidades",
                  "Suporte contínuo e treinamento da sua equipe"
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 hover:translate-x-1 transition-transform animate-fade-in"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={handleDiagnosticoClick} 
                size="lg" 
                className="bg-brand-black text-white hover:bg-brand-black/90 shadow-md hover:shadow-xl transition-all hover:translate-y-[-3px]"
              >
                Agendar Diagnóstico Gratuito
              </Button>
            </div>
            <div className="hidden md:flex md:col-span-2 bg-gradient-to-br from-brand-black to-brand-blue items-center justify-center text-white group">
              <div className="p-12 text-center">
                <Zap className="h-16 w-16 mx-auto mb-6 text-white animate-pulse-slow" />
                <h3 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform">Multiplique resultados</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Nossas soluções de IA aumentam em média 85% a produtividade e reduzem até 65% dos custos operacionais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
