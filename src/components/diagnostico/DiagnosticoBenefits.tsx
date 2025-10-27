
import React from "react";
import BenefitsCards from "./BenefitsCards";
import { Lightbulb, TrendingUp, Clock, Shield } from "lucide-react";

const DiagnosticoBenefits = () => {
  return (
    <section id="benefits-section" className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
            <Lightbulb className="h-3 w-3" />
            Benefícios do Diagnóstico
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Por Que Realizar um <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Diagnóstico de IA</span>?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            Identifique <span className="font-bold text-brand-blue">oportunidades reais</span> de automação e descubra o <span className="font-bold text-brand-blue">potencial de crescimento</span> da sua empresa com IA.
          </p>
        </div>
        
        <BenefitsCards />
      </div>
    </section>
  );
};

export default DiagnosticoBenefits;
