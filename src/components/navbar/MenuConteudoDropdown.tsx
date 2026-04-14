import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHasPublishedFerramentas } from '@/hooks/useHasPublishedFerramentas';

interface MenuConteudoDropdownProps {
  onMenuItemClick?: () => void;
}

const MenuConteudoDropdown: React.FC<MenuConteudoDropdownProps> = ({ 
  onMenuItemClick = () => {} 
}) => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();
  const { hasFerramentas } = useHasPublishedFerramentas();

  const handleViewAllClick = () => {
    navigate('/conteudo');
    onMenuItemClick();
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="space-y-2">
          <button
            onClick={() => {
              navigate('/blog');
              onMenuItemClick();
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
          >
            {t('menu.blog')}
          </button>
          <button
            onClick={() => {
              navigate('/materiais-gratuitos');
              onMenuItemClick();
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
          >
            {t('menu.freeMaterials')}
          </button>
          {hasFerramentas && (
            <button
              onClick={() => {
                navigate('/ferramentas-gratuitas');
                onMenuItemClick();
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
            >
              {t('menu.freeTools')}
            </button>
          )}
          <hr className="my-2 border-gray-200" />
          <button
            onClick={handleViewAllClick}
            className="w-full text-left px-3 py-2 text-sm text-brand-blue font-medium hover:bg-blue-50 rounded-md transition-colors"
          >
            {t('menu.viewAllContent')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuConteudoDropdown;
