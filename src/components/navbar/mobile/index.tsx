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
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  isActive: (path: string) => boolean;
  isActivePrefix: (prefix: string) => boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isActive, isActivePrefix }) => {
  const { t } = useTranslation('navigation');
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
        <button className="lg:hidden p-2 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
          <Menu className={`h-6 w-6 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
            isMenuOpen 
              ? 'rotate-90 scale-110 text-brand-blue' 
              : 'rotate-0 scale-100 group-hover:scale-105 group-hover:text-brand-blue'
          }`} />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="right"
        className="w-[280px] sm:w-[320px] md:w-[360px] h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-800/50 animate-in slide-in-from-right duration-300"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 dark:bg-brand-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <SheetHeader className="relative z-10 mb-4 px-4 sm:px-6 pt-2">
          <SheetTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span className="bg-gradient-to-r from-brand-blue to-blue-600 bg-clip-text text-transparent">
              {t('menu.navigationMenuTitle')}
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="relative z-10 px-4 sm:px-6 pt-2 pb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
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
