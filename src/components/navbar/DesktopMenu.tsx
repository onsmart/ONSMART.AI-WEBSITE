import React from "react";
import { Home, Package, Briefcase, BookOpen, Mail, Building } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
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

interface DesktopMenuProps {
  isActive: (path: string) => boolean;
  isActivePrefix: (prefix: string) => boolean;
  handleContatoClick: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ isActive, isActivePrefix, handleContatoClick }) => {
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
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        <NavMenuItem
          icon={Home}
          label="Início"
          isActive={isHomeActive(location.pathname)}
          onClick={(e) => navigateTo("/")}
        />
        
        <DropdownMenuItem
          icon={Package}
          label="Produtos"
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
          label="Serviços"
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
          label="Conteúdo"
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
          label="Setores"
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
          label="Contato"
          isActive={isContatoActive(location.pathname)}
          onClick={handleContatoClick}
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;