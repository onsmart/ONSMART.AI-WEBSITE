
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import { getServiceIcon } from '@/utils/serviceIcons';
import { useTranslation } from 'react-i18next';

interface ServicosDropdownProps {
  onMenuItemClick?: () => void;
}

const ServicosDropdown: React.FC<ServicosDropdownProps> = ({ onMenuItemClick }) => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();

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
          {servicesData.slice(0, 4).map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.slug)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
            >
              {service.name}
            </button>
          ))}
          <hr className="my-2 border-gray-200" />
          <button
            onClick={handleViewAllClick}
            className="w-full text-left px-3 py-2 text-sm text-brand-blue font-medium hover:bg-blue-50 rounded-md transition-colors"
          >
            {t('menu.viewAllServices')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicosDropdown;
