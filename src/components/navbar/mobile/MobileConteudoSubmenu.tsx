import React from "react";
import { BookOpen, FileText, Wrench, Book } from "lucide-react";
import MobileSubmenuItem from "./MobileSubmenuItem";
import { useNavigate } from "react-router-dom";
import { useHasPublishedFerramentas } from "@/hooks/useHasPublishedFerramentas";

interface MobileConteudoSubmenuProps {
  isActive: (path: string) => boolean;
  isActivePrefix: (path: string) => boolean;
  onClose: () => void;
}

const MobileConteudoSubmenu: React.FC<MobileConteudoSubmenuProps> = ({ 
  isActive, 
  isActivePrefix,
  onClose 
}) => {
  const navigate = useNavigate();
  const { hasFerramentas } = useHasPublishedFerramentas();

  const handleNavigation = (path: string) => {
    // Close the mobile menu immediately
    onClose();
    
    // Navigate to the path immediately
    navigate(path);
  };
  
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
      <h3 className="flex items-center gap-2 px-4 py-2 font-medium">
        <BookOpen className="h-4 w-4" />
        Conteúdo
      </h3>
      
      {/* Central de Conteúdo */}
      <MobileSubmenuItem 
        to="/conteudo"
        icon={FileText}
        label="Central de Conteúdo"
        isActive={isActive("/conteudo")}
        onClick={onClose}
        className="px-8 py-2"
      />
      
      {/* Blog */}
      <MobileSubmenuItem 
        to="/blog"
        icon={FileText}
        label="Blog"
        isActive={isActive("/blog")}
        onClick={onClose}
        className="px-8 py-2"
      />
      
      {/* Materials */}
      <h4 className="px-8 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
        Materiais
      </h4>
      
      <button 
        type="button"
        className="w-full text-left flex items-center gap-2 px-10 py-2 text-sm rounded-md hover:bg-primary/10 cursor-pointer"
        onClick={() => handleNavigation("/materiais-gratuitos")}
      >
        <FileText className="h-4 w-4" />
        Materiais Gratuitos
      </button>
      
      {hasFerramentas && (
        <button 
          type="button"
          className="w-full text-left flex items-center gap-2 px-10 py-2 text-sm rounded-md hover:bg-primary/10 cursor-pointer"
          onClick={() => handleNavigation("/ferramentas-gratuitas")}
        >
          <Wrench className="h-4 w-4" />
          Ferramentas Gratuitas
        </button>
      )}
      
      <button 
        type="button"
        className="w-full text-left flex items-center gap-2 px-10 py-2 text-sm rounded-md hover:bg-primary/10 cursor-pointer"
        onClick={() => handleNavigation("/glossario")}
      >
        <Book className="h-4 w-4" />
        Glossário
      </button>
    </div>
  );
};

export default MobileConteudoSubmenu;
