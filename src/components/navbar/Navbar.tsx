
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DesktopMenu from "./DesktopMenu";
import TabletMenu from "./TabletMenu";
import MobileMenu from "./mobile"; 
import Logo from "./Logo";
import { Calendar } from "lucide-react";
import { scrollToElement, scrollToForm } from "@/utils/scrollUtils";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  // Handle scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[200] focus:bg-white focus:p-4 focus:border focus:shadow-lg">
        <a 
          href="#main-content" 
          className="skip-link bg-brand-blue text-white px-4 py-2 rounded mr-4 hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        >
          Pular para o conteúdo principal
        </a>
        <a 
          href="#navigation" 
          className="skip-link bg-brand-blue text-white px-4 py-2 rounded mr-4 hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        >
          Pular para a navegação
        </a>
        <a 
          href="#footer" 
          className="skip-link bg-brand-blue text-white px-4 py-2 rounded hover:bg-brand-blue/90 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        >
          Pular para o rodapé
        </a>
      </div>

      <div 
        id="navigation"
        className="fixed top-0 z-[100] w-full bg-white shadow-lg py-0 border-b border-gray-200"
        role="banner"
        aria-label="Navegação principal"
      >
        <div className="container mx-auto flex items-center justify-between px-2 sm:px-4 md:px-6 py-2.5">
          <Logo />
          
          {/* Desktop Navigation */}
          <DesktopMenu 
            isActive={isActive} 
            isActivePrefix={isActivePrefix}
            handleContatoClick={handleContatoClick}
          />
          
          {/* Tablet Navigation */}
          <TabletMenu 
            isActive={isActive} 
            isActivePrefix={isActivePrefix}
            handleContatoClick={handleContatoClick}
            handleDiagnosticoClick={handleDiagnosticoClick}
          />
          
          {/* CTA and Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <Button 
              className="hidden lg:flex bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg border-2 border-orange-500 hover:border-orange-400 transition-all duration-300 ml-2 sm:ml-4 hover:scale-105 text-sm sm:text-base px-3 sm:px-4 py-2"
              onClick={handleDiagnosticoClick}
              aria-label="Agendar diagnóstico gratuito de IA"
            >
              <Calendar className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden xl:inline">Agendar Diagnóstico</span>
              <span className="xl:hidden">Agendar</span>
            </Button>
            
            <MobileMenu isActive={isActive} isActivePrefix={isActivePrefix} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
