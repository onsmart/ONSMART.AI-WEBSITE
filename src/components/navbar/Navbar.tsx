
import { useState, useEffect, useMemo, memo, useCallback } from "react";
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

const Navbar = memo(() => {
  const { t } = useTranslation('navigation');
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // These functions are still needed for backward compatibility with other components
  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);
  const isActivePrefix = useCallback((prefix: string) => location.pathname.startsWith(prefix), [location.pathname]);

  // Handle navigation to diagnostico with improved scroll behavior
  const handleDiagnosticoClick = useCallback(() => {
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
  }, [location.pathname, navigate]);

  // Handle navigation to contato - simple navigation without auto-scroll
  const handleContatoClick = useCallback(() => {
    navigate("/contato");
  }, [navigate]);


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
        className={cn(
          "fixed top-0 z-[100] w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 transition-all duration-300"
        )}
        style={{
          boxShadow: '0 4px 20px -2px rgba(121, 185, 234, 0.08), 0 2px 8px -2px rgba(12, 13, 14, 0.04)'
        }}
        role="banner"
        aria-label={t('menu.navigationLabel')}
      >
        <div className="w-full flex items-center justify-between px-3 sm:px-5 md:px-6 lg:px-10 xl:px-16 py-3.5 gap-2 sm:gap-3 md:gap-4">
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
              className="hidden md:flex bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border-0 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap px-5 py-2.5"
              style={{
                boxShadow: '0 4px 14px -2px rgba(249, 115, 22, 0.4), 0 2px 6px -2px rgba(249, 115, 22, 0.2)'
              }}
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
});

Navbar.displayName = 'Navbar';

export default Navbar;
