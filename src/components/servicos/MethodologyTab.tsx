
import React from 'react';
import { Button } from "@/components/ui/button";
import { Lightbulb, Code, Award } from 'lucide-react';

interface MethodologyTabProps {
  handleContactClick: () => void;
}

const MethodologyTab: React.FC<MethodologyTabProps> = ({ handleContactClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800/30 rounded-xl p-8 shadow-sm animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 text-center">Nossa Metodologia</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm relative hover:shadow-md transition-all hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold animate-pulse-slow">1</div>
          <div className="mb-4">
            <Lightbulb className="h-8 w-8 text-primary mb-4 transition-transform hover:scale-110" />
            <h3 className="text-xl font-bold mb-3">Diagnóstico</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Analisamos minuciosamente sua operação para identificar oportunidades estratégicas de implementação de IA com alto impacto.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm relative hover:shadow-md transition-all hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold animate-pulse-slow">2</div>
          <div className="mb-4">
            <Code className="h-8 w-8 text-secondary mb-4 transition-transform hover:scale-110" />
            <h3 className="text-xl font-bold mb-3">Implementação</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Desenvolvemos e integramos soluções de IA customizadas para seus desafios específicos, com foco em resultados rápidos.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm relative hover:shadow-md transition-all hover:translate-y-[-5px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold animate-pulse-slow">3</div>
          <div className="mb-4">
            <Award className="h-8 w-8 text-accent mb-4 transition-transform hover:scale-110" />
            <h3 className="text-xl font-bold mb-3">Otimização</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Fornecemos acompanhamento, ajustes e treinamento contínuo para garantir o máximo valor e adoção da sua solução de IA.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          onClick={handleContactClick} 
          size="lg" 
          className="bg-brand-blue text-white hover:bg-brand-blue/90 hover:translate-y-[-2px] transition-transform font-semibold"
        >
          Descubra como podemos ajudar sua empresa
        </Button>
      </div>
    </div>
  );
};

export default MethodologyTab;
