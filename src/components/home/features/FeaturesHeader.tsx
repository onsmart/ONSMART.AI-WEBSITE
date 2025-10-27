
import React from 'react';
import { Zap } from 'lucide-react';

const FeaturesHeader: React.FC = () => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      {/* Badge Superior Profissional */}
      <div className="inline-flex items-center bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
        Metodologia LÍDER
      </div>
      
      {/* Título principal - Padronizado */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
        <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">6 Pilares</span> da Transformação
      </h2>
      
      {/* Subheadline compacto */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
        <span className="font-bold text-brand-blue">6 elementos essenciais</span> para implementação de 
        <span className="font-bold text-brand-blue"> IA transformadora</span> em sua empresa
      </p>
    </div>
  );
};

export default FeaturesHeader;
