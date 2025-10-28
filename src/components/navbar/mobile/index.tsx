import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileMenuItems from "./MobileMenuItems";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  isActive: (path: string) => boolean;
  isActivePrefix: (prefix: string) => boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isActive, isActivePrefix }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleClose = () => setIsMenuOpen(false);

  // Bloquear scroll do body quando o menu estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden p-1.5 group">
          <Menu className={`h-6 w-6 text-gray-700 transition-all duration-300 ${
            isMenuOpen 
              ? 'rotate-90 scale-110' 
              : 'rotate-0 scale-100 group-hover:scale-105'
          }`} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[280px] h-screen max-h-screen overflow-y-auto bg-white animate-in slide-in-from-right duration-300">
        <SheetHeader className="mb-2">
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
        </SheetHeader>
        <div className="px-4 pt-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
          <MobileMenuItems 
            isActive={isActive} 
            isActivePrefix={isActivePrefix}
            onClose={handleClose} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
