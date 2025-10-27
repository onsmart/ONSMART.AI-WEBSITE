
import React from 'react';
import { Badge } from '@/components/ui/badge';

const RevendasBeneficiosHeader = () => {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <Badge variant="secondary" className="mb-6">
          Benefícios Exclusivos
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Benefícios do Programa de Revendas
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Maximize seus lucros vendendo IA para empresas de R$ 50M a R$ 1B com um programa completo de benefícios
        </p>
      </div>
    </section>
  );
};

export default RevendasBeneficiosHeader;
