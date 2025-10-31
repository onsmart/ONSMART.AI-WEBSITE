
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RevendasCadastroHeader = () => {
  const { t } = useTranslation(['revendasCadastro', 'common']);
  
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
        <ShoppingCart className="h-4 w-4" />
        {t('header.badge')}
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        {t('header.title')}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {t('header.subtitle')}
      </p>
    </div>
  );
};

export default RevendasCadastroHeader;
