import React from "react";
<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Package, Briefcase, BookOpen, Mail, Building, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
=======
import { Home, Package, Briefcase, BookOpen, Mail, Building } from "lucide-react";
import NavMenuItem from "./components/NavMenuItem";
import DropdownMenuItem from "./components/DropdownMenuItem";
import MenuConteudoDropdown from "./MenuConteudoDropdown";
import ServicosDropdown from "./ServicosDropdown";
import SetoresDropdown from "./SetoresDropdown";
import ProdutosDropdown from "./ProdutosDropdown";
import { useMenuState } from "./hooks/useMenuState";
>>>>>>> Mateus
import {
  isConteudoActive,
  isServicosActive,
  isHomeActive,
  isContatoActive,
  isSetoresActive,
  isProdutosActive,
} from "./utils/menuUtils";
<<<<<<< HEAD
=======
import { useTranslation } from "react-i18next";
>>>>>>> Mateus

interface TabletMenuProps {
  isActive: (path: string) => boolean;
  isActivePrefix: (prefix: string) => boolean;
  handleContatoClick: () => void;
<<<<<<< HEAD
  handleDiagnosticoClick: () => void;
}

const TabletMenu: React.FC<TabletMenuProps> = ({ 
  isActive, 
  isActivePrefix, 
  handleContatoClick,
  handleDiagnosticoClick 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  const isHomeActiveState = isHomeActive(location.pathname);
  const isProdutosActiveState = isProdutosActive(location.pathname);
  const isServicosActiveState = isServicosActive(location.pathname);
  const isContatoActiveState = isContatoActive(location.pathname);
  const isConteudoActiveState = isConteudoActive(location.pathname);
  const isSetoresActiveState = isSetoresActive(location.pathname);
    
  return (
    <div className="hidden md:flex lg:hidden items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          isHomeActiveState ? "text-brand-blue bg-brand-blue/10" : "text-gray-600 hover:text-brand-blue"
        )}
        onClick={() => handleNavigate("/")}
      >
        <Home className="h-4 w-4 mr-1" />
        Início
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          isProdutosActiveState ? "text-brand-blue bg-brand-blue/10" : "text-gray-600 hover:text-brand-blue"
        )}
        onClick={() => handleNavigate("/agentes-ia")}
      >
        <Package className="h-4 w-4 mr-1" />
        Produtos
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          isServicosActiveState ? "text-brand-blue bg-brand-blue/10" : "text-gray-600 hover:text-brand-blue"
        )}
        onClick={() => handleNavigate("/servicos")}
      >
        <Briefcase className="h-4 w-4 mr-1" />
        Serviços
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          isConteudoActiveState ? "text-brand-blue bg-brand-blue/10" : "text-gray-600 hover:text-brand-blue"
        )}
        onClick={() => handleNavigate("/conteudo")}
      >
        <BookOpen className="h-4 w-4 mr-1" />
        Conteúdo
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          isSetoresActiveState ? "text-brand-blue bg-brand-blue/10" : "text-gray-600 hover:text-brand-blue"
        )}
        onClick={() => handleNavigate("/setores")}
      >
        <Building className="h-4 w-4 mr-1" />
        Setores
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2 py-1 text-sm font-medium transition-colors",
          isContatoActiveState ? "text-brand-blue bg-brand-blue/10" : "text-gray-600 hover:text-brand-blue"
        )}
        onClick={handleContatoClick}
      >
        <Mail className="h-4 w-4 mr-1" />
        Contato
      </Button>
      
      <Button
        size="sm"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg border-2 border-orange-500 hover:border-orange-400 transition-all duration-300 hover:scale-105 text-sm px-3 py-1 ml-2"
        onClick={handleDiagnosticoClick}
        aria-label="Agendar diagnóstico gratuito de IA"
      >
        <Calendar className="h-4 w-4 mr-1" />
        Agendar
      </Button>
    </div>
=======
}

const TabletMenu: React.FC<TabletMenuProps> = ({ isActive, isActivePrefix, handleContatoClick }) => {
  const { t } = useTranslation('navigation');
  const {
    location,
    servicosOpen,
    setServicosOpen,
    conteudoOpen,
    setConteudoOpen,
    setoresOpen,
    setSetoresOpen,
    produtosOpen,
    setProdutosOpen,
    closeAllDropdowns,
    navigateTo,
  } = useMenuState();

  // Textos abreviados para tablet - usar tradução completa pois são curtos

  return (
    <nav className="hidden md:flex lg:hidden relative z-[90] flex max-w-max flex-1 items-center justify-center">
      <ul className="group flex flex-1 list-none items-center justify-center gap-1 sm:gap-1.5">
        <NavMenuItem
          icon={Home}
          label={t('menu.home')}
          isActive={isHomeActive(location.pathname)}
          onClick={(e) => navigateTo("/")}
        />
        
        <DropdownMenuItem
          icon={Package}
          label={t('menu.products')}
          isActive={isProdutosActive(location.pathname)}
          isOpen={produtosOpen}
          onOpenChange={setProdutosOpen}
          onMenuItemClick={closeAllDropdowns}
          navigateTo={navigateTo}
          path="/produtos"
          contentWidth="w-64 p-0"
        >
          <ProdutosDropdown />
        </DropdownMenuItem>
        
        <DropdownMenuItem
          icon={Briefcase}
          label={t('menu.services')}
          isActive={isServicosActive(location.pathname)}
          isOpen={servicosOpen}
          onOpenChange={setServicosOpen}
          onMenuItemClick={closeAllDropdowns}
          navigateTo={navigateTo}
          path="/servicos"
          contentWidth="w-64 p-0"
        >
          <ServicosDropdown />
        </DropdownMenuItem>
        
        <DropdownMenuItem
          icon={BookOpen}
          label={t('menu.content')}
          isActive={isConteudoActive(location.pathname)}
          isOpen={conteudoOpen}
          onOpenChange={setConteudoOpen}
          onMenuItemClick={closeAllDropdowns}
          navigateTo={navigateTo}
          path="/conteudo"
          contentWidth="w-64 p-0"
        >
          <MenuConteudoDropdown />
        </DropdownMenuItem>
        
        <DropdownMenuItem
          icon={Building}
          label={t('menu.sectors')}
          isActive={isSetoresActive(location.pathname)}
          isOpen={setoresOpen}
          onOpenChange={setSetoresOpen}
          onMenuItemClick={closeAllDropdowns}
          navigateTo={navigateTo}
          path="/setores"
          contentWidth="w-64 p-0"
        >
          <SetoresDropdown />
        </DropdownMenuItem>
        
        <NavMenuItem
          icon={Mail}
          label={t('menu.contact')}
          isActive={isContatoActive(location.pathname)}
          onClick={handleContatoClick}
        />
      </ul>
    </nav>
>>>>>>> Mateus
  );
};

export default TabletMenu;
<<<<<<< HEAD
=======

>>>>>>> Mateus
