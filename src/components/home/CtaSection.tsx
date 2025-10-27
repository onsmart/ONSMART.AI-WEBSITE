
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Zap } from "lucide-react";
import { getUrgencyMessage } from "@/utils/urgencyMessages";

interface CtaSectionProps {
  handleContactClick: () => void;
}

const CtaSection = ({ handleContactClick }: CtaSectionProps) => {
  const handleROIClick = () => {
    // Scroll to ROI Calculator section on the same page
    const roiSection = document.querySelector('#roi-calculator');
    if (roiSection) {
      const elementTop = roiSection.getBoundingClientRect().top + window.pageYOffset;
      const headerHeight = document.getElementById('navigation')?.offsetHeight || 80;
      const offsetPosition = elementTop - headerHeight - 20;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    } else {
      // If ROI calculator is not on this page, we can scroll to it within the page
      // or navigate to a dedicated ROI page if it exists
      const roiCalculatorSection = document.querySelector('[data-component="roi-calculator"]');
      if (roiCalculatorSection) {
        const elementTop = roiCalculatorSection.getBoundingClientRect().top + window.pageYOffset;
        const headerHeight = document.getElementById('navigation')?.offsetHeight || 80;
        const offsetPosition = elementTop - headerHeight - 20;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="py-12 sm:py-14 md:py-16 px-4 relative overflow-hidden bg-gradient-to-br from-brand-blue via-blue-600 to-brand-blue/90">
      <div className="absolute top-1/3 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-1/4 w-36 h-36 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto max-w-3xl text-center relative z-10">
        {/* Urgency Element */}
        <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-full text-xs font-bold mb-4">
          <Clock className="h-3 w-3" />
          {getUrgencyMessage('next-month').replace(' ', '')}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Implemente IA em sua empresa em <span className="text-yellow-300">30 dias</span>
        </h2>
        <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
          Junte-se às <strong>350+ empresas</strong> que aumentaram produtividade em 420% com Agentes de IA
        </p>

        {/* Benefits - Inline */}
        <div className="flex justify-center items-center gap-6 mb-8 text-white">
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-300">420%</div>
            <div className="text-xs">ROI Médio</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-300">90 dias</div>
            <div className="text-xs">Garantia</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-300">30 dias</div>
            <div className="text-xs">Implementação</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Button 
            onClick={handleContactClick} 
            className="bg-white text-brand-blue hover:bg-gray-50 font-bold px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Garanta Sua Vaga Agora
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            onClick={handleROIClick}
            variant="outline" 
            className="border-2 border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white font-bold px-6 py-3 transition-all duration-300"
          >
            Calcular Meu ROI
          </Button>
        </div>

        <div className="text-white/80 text-xs">
          <div className="flex items-center justify-center gap-4">
            <span>✓ Sem compromisso</span>
            <span>✓ Setup gratuito</span>
            <span>✓ Suporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
