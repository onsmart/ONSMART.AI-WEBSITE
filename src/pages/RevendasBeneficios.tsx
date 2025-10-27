
import React from 'react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import RevendasBeneficiosHeader from '@/components/revendas/beneficios/RevendasBeneficiosHeader';
import BeneficiosFinanceiros from '@/components/revendas/beneficios/BeneficiosFinanceiros';
import SuporteTreinamento from '@/components/revendas/beneficios/SuporteTreinamento';
import RecursosFerramentas from '@/components/revendas/beneficios/RecursosFerramentas';
import EstruturaMargensTable from '@/components/revendas/beneficios/EstruturaMargensTable';
import RevendasBeneficiosCTA from '@/components/revendas/beneficios/RevendasBeneficiosCTA';

const RevendasBeneficios = () => {
  return (
    <>
      <UnifiedSEO 
        title="Benefícios do Programa de Revendas onsmartAI - Margens e Vantagens"
        description="Descubra todos os benefícios de ser uma revenda onsmartAI: margens atrativas, suporte técnico completo, treinamentos, material de vendas e muito mais."
        keywords="benefícios revenda, margens revenda ia, suporte técnico, treinamento vendas, material marketing"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <RevendasBeneficiosHeader />
        <BeneficiosFinanceiros />
        <SuporteTreinamento />
        <RecursosFerramentas />
        <EstruturaMargensTable />
        <RevendasBeneficiosCTA />
      </div>
    </>
  );
};

export default RevendasBeneficios;
