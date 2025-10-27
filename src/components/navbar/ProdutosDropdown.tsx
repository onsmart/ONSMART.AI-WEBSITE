import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight, Bot, ExternalLink } from 'lucide-react';

interface ProdutosDropdownProps {
  onMenuItemClick?: () => void;
}

const ProdutosDropdown: React.FC<ProdutosDropdownProps> = ({ onMenuItemClick }) => {
  const navigate = useNavigate();

  const handleAgentesIAClick = () => {
    navigate('/agentes-ia');
    onMenuItemClick?.();
  };

  const handleEcossistemaIBMClick = () => {
    navigate('/ecossistema-ibm');
    onMenuItemClick?.();
  };

  const handleSoniaAssistenteIAClick = () => {
    navigate('/produtos/sonia-assistente-ia');
    onMenuItemClick?.();
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="space-y-2">
          <button
            onClick={handleAgentesIAClick}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
          >
            Agentes de IA
          </button>
          <button
            onClick={handleEcossistemaIBMClick}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
          >
            Ecossistema IBM
          </button>
          <button
            onClick={handleSoniaAssistenteIAClick}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-brand-blue rounded-md transition-colors"
          >
            Sonia Assistente IA
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProdutosDropdown;
