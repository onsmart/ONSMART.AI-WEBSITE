import React from "react";
import { Home, Package, Briefcase, BookOpen, Mail, Building } from "lucide-react";
import NavMenuItem from "./components/NavMenuItem";
import DropdownMenuItem from "./components/DropdownMenuItem";
import MenuConteudoDropdown from "./MenuConteudoDropdown";
import ServicosDropdown from "./ServicosDropdown";
import SetoresDropdown from "./SetoresDropdown";
import ProdutosDropdown from "./ProdutosDropdown";
import { useMenuState } from "./hooks/useMenuState";
import {
  isConteudoActive,
  isServicosActive,
  isHomeActive,
  isContatoActive,
  isSetoresActive,
  isProdutosActive,
} from "./utils/menuUtils";
import { useTranslation } from "react-i18next";

interface DesktopMenuProps {
  isActive: (path: string) => boolean;
  isActivePrefix: (prefix: string) => boolean;
  handleContatoClick: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ isActive, isActivePrefix, handleContatoClick }) => {
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

  return (
    <nav className="hidden lg:flex relative z-[90] flex max-w-max flex-1 items-center justify-center">
      <ul className="group flex flex-1 list-none items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
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
  );
};

export default DesktopMenu;