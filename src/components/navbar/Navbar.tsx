
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DesktopMenu from "./DesktopMenu";
import TabletMenu from "./TabletMenu";
import MobileMenu from "./mobile"; 
import Logo from "./Logo";
import { Calendar } from "lucide-react";
import { scrollToElement } from "@/utils/scrollUtils";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation('navigation');
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // These functions are still needed for backward compatibility with other components
  const isActive = (path: string) => location.pathname === path;
  const isActivePrefix = (prefix: string) => location.pathname.startsWith(prefix);


  // Handle navigation to diagnostico with improved scroll behavior
  const handleDiagnosticoClick = () => {
    if (location.pathname === "/diagnostico") {
      // If already on diagnostico page, just scroll to form
      scrollToElement('diagnostico-form', '#diagnostico-form-section');
    } else {
      // Navigate to diagnostico page
      navigate("/diagnostico");
      // Use setTimeout with longer delay to ensure page loads before scrolling
      setTimeout(() => {
        scrollToElement('diagnostico-form', '#diagnostico-form-section');
      }, 300);
    }
  };

  // Handle navigation to contato - simple navigation without auto-scroll
  const handleContatoClick = () => {
    navigate("/contato");
  };


  // Handle potential click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Reset scroll position and focus management on route change
  useEffect(() => {
    // Focus main content for accessibility
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
    }
  }, [location.pathname]);


  return (
    <>
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[200] focus:bg-white dark:focus:bg-gray-900 focus:p-4 focus:border focus:shadow-lg">
        <a 
          href="#main-content" 
          className="skip-link bg-brand-blue text-white px-4 py-2 rounded mr-4 hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        >
          {t('menu.skipToContent')}
        </a>
        <a 
          href="#navigation" 
          className="skip-link bg-brand-blue text-white px-4 py-2 rounded mr-4 hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        >
          {t('menu.skipToNavigation')}
        </a>
        <a 
          href="#footer" 
          className="skip-link bg-brand-blue text-white px-4 py-2 rounded hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        >
          {t('menu.skipToFooter')}
        </a>
      </div>

      <div 
        id="navigation"
        className="fixed top-0 z-[100] w-full bg-white dark:bg-gray-900 shadow-lg py-0 border-b border-gray-200 dark:border-gray-800"
        role="banner"
        aria-label={t('menu.navigationLabel')}
      >
        <div className="w-full flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-2.5 gap-2 sm:gap-3 md:gap-4">
          {/* Logo - Esquerda */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Desktop Navigation - Centro */}
          <div className="flex-1 flex justify-center min-w-0 overflow-hidden">
            <div className="max-w-full mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
              {/* Menu Tablet - Aparece entre md e lg (768px - 1023px) */}
              <TabletMenu 
                isActive={isActive} 
                isActivePrefix={isActivePrefix}
                handleContatoClick={handleContatoClick}
              />
              {/* Menu Desktop - Aparece a partir de lg (1024px+) */}
              <DesktopMenu 
                isActive={isActive} 
                isActivePrefix={isActivePrefix}
                handleContatoClick={handleContatoClick}
              />
            </div>
          </div>
          
          {/* CTA and Mobile Menu - Direita */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-2.5 flex-shrink-0">
            {/* Theme Toggle - Alternar tema claro/escuro - OCULTO TEMPORARIAMENTE */}
            {/* <ThemeToggle /> */}
            
            {/* Language Switcher - Seletor de idioma (apenas ícone, discreto) */}
            <LanguageSwitcher />
            
            {/* Botão CTA - Ícone apenas em tablet, ícone+texto em desktop */}
            <Button 
              className="hidden md:flex bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg border-2 border-orange-500 hover:border-orange-400 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              onClick={handleDiagnosticoClick}
              aria-label={t('menu.scheduleDiagnosticAria')}
            >
              <Calendar className="h-4 w-4 md:mr-0 lg:mr-2 flex-shrink-0" />
              <span className="hidden lg:inline xl:hidden">{t('menu.scheduleDiagnosticShort', { defaultValue: 'Agendar' })}</span>
              <span className="hidden xl:inline">{t('menu.scheduleDiagnostic')}</span>
            </Button>
            
            <MobileMenu isActive={isActive} isActivePrefix={isActivePrefix} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
