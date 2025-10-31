
import React from 'react';
import { useTranslation } from 'react-i18next';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import RevendasBeneficiosHeader from '@/components/revendas/beneficios/RevendasBeneficiosHeader';
import BeneficiosFinanceiros from '@/components/revendas/beneficios/BeneficiosFinanceiros';
import SuporteTreinamento from '@/components/revendas/beneficios/SuporteTreinamento';
import RecursosFerramentas from '@/components/revendas/beneficios/RecursosFerramentas';
import EstruturaMargensTable from '@/components/revendas/beneficios/EstruturaMargensTable';
import RevendasBeneficiosCTA from '@/components/revendas/beneficios/RevendasBeneficiosCTA';

const RevendasBeneficios = () => {
  const { t } = useTranslation(['revendasBeneficios', 'common']);
  
  return (
    <>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
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
