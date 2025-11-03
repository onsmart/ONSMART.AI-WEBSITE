
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ServicosDropdownProps {
  onMenuItemClick?: () => void;
}

const ServicosDropdown: React.FC<ServicosDropdownProps> = ({ onMenuItemClick }) => {
  const { t } = useTranslation(['navigation', 'servicos']);
  const navigate = useNavigate();

  // Serviços principais exibidos no dropdown
  const mainServices = [
    { key: 'diagnostico', slug: 'diagnostico-ia' },
    { key: 'aceleracao', slug: 'aceleracao-adocao-ia' },
    { key: 'implementacao', slug: 'implementacao-tecnica' },
    { key: 'analise', slug: 'analise-dados' }
  ];

  const handleServiceClick = (serviceSlug: string) => {
    navigate(`/servicos/${serviceSlug}`);
    onMenuItemClick?.();
  };

  const handleViewAllClick = () => {
    navigate('/servicos');
    onMenuItemClick?.();
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="space-y-2">
          {mainServices.map((service) => {
            const serviceData = t(`services.items.${service.key}`, { returnObjects: true, ns: 'servicos' }) as any;
            const serviceTitle = typeof serviceData === 'object' && serviceData !== null ? serviceData.title : serviceData;
            return (
              <button
                key={service.key}
                onClick={() => handleServiceClick(service.slug)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-blue rounded-md transition-colors"
              >
                {serviceTitle || service.key}
              </button>
            );
          })}
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          <button
            onClick={handleViewAllClick}
            className="w-full text-left px-3 py-2 text-sm text-brand-blue font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
          >
            {t('menu.viewAllServices')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicosDropdown;
