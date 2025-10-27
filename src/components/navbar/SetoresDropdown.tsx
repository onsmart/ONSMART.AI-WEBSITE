import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building } from 'lucide-react';
import { sectorsData } from '@/data/sectorsData';
import { getSectorIcon } from '@/utils/sectorIcons';

interface SetoresDropdownProps {
  onMenuItemClick?: () => void;
}

const SetoresDropdown: React.FC<SetoresDropdownProps> = ({ onMenuItemClick }) => {
  const navigate = useNavigate();

  const handleSectorClick = (sectorSlug: string) => {
    navigate(`/setores/${sectorSlug}`);
    onMenuItemClick?.();
  };

  const handleViewAllClick = () => {
    navigate('/setores');
    onMenuItemClick?.();
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="space-y-2">
          {sectorsData.slice(0, 6).map((sector) => (
            <button
              key={sector.id}
              onClick={() => handleSectorClick(sector.slug)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
            >
              {sector.name}
            </button>
          ))}
          <hr className="my-2 border-gray-200" />
          <button
            onClick={handleViewAllClick}
            className="w-full text-left px-3 py-2 text-sm text-brand-blue font-medium hover:bg-blue-50 rounded-md transition-colors"
          >
            Ver Todos os Setores
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetoresDropdown;
