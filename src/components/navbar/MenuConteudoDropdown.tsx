
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen, FileText, GraduationCap, Wrench } from 'lucide-react';
import { contentData, getContentByCategory } from '@/data/contentData';
import { getContentIcon } from '@/utils/contentIcons';

interface MenuConteudoDropdownProps {
  onMenuItemClick?: () => void;
}

const MenuConteudoDropdown: React.FC<MenuConteudoDropdownProps> = ({ 
  onMenuItemClick = () => {} 
}) => {
  const { t } = useTranslation('navigation');
  const navigate = useNavigate();
  
  const handleContentClick = (contentSlug: string, category: string) => {
    let path = '';
    switch (category) {
      case 'blog':
        path = `/blog/${contentSlug}`;
        break;
      case 'material':
        path = `/materiais/${contentSlug}`;
        break;
      case 'ferramenta':
        path = `/ferramentas/${contentSlug}`;
        break;
      case 'university':
        path = `/university/${contentSlug}`;
        break;
      default:
        path = `/conteudo/${contentSlug}`;
    }
    navigate(path);
    onMenuItemClick();
  };

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
          <button
            onClick={() => {
              navigate('/ferramentas-gratuitas');
              onMenuItemClick();
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
          >
            {t('menu.freeTools')}
          </button>
          <button
            onClick={() => {
              navigate('/university/ia-basico');
              onMenuItemClick();
            }}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
          >
            {t('menu.university')}
          </button>
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
