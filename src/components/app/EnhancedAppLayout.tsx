import React, { Suspense } from "react";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import SoniaChat from "@/components/chat/SoniaChat";
import { AccessibilityEnhancements } from "@/components/accessibility/AccessibilityEnhancements";
import { HighContrastMode } from "@/components/accessibility/HighContrastMode";
import PageSpecificSchema from "@/components/seo/PageSpecificSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FastPagePreloader from "./FastPagePreloader";
import PageTransition from "@/components/ui/page-transition";
import { usePrefetch } from "@/hooks/usePrefetch";
import { useResourceHints } from "@/hooks/useResourceHints";
import { useLocation } from "react-router-dom";

const Footer = React.lazy(() => import("@/components/Footer"));

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
}

const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Initialize performance optimizations
  usePrefetch({ enabled: true, priority: 'high' });
  useResourceHints();

  // Determine page type for schema
  const getPageType = (pathname: string) => {
    if (pathname.startsWith('/blog/')) return 'blog';
    if (pathname === '/servicos') return 'service';
    if (pathname === '/contato') return 'contact';
    if (pathname === '/diagnostico') return 'diagnostic';
    if (pathname === '/case-de-sucesso') return 'case-study';
    return undefined;
  };

  const pageType = getPageType(location.pathname);

  return (
    <AccessibilityEnhancements>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col w-full">
          {/* Enhanced Schema markup for current page */}
          <PageSpecificSchema pageType={pageType} />
          <BreadcrumbSchema />
          
          {/* Fast page preloader */}
          <FastPagePreloader enabled={true} />
          
          {/* Navigation */}
          <header role="banner" aria-label="Navegação principal">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSkeleton variant="card" className="h-16" />}>
                <Navbar />
              </Suspense>
            </ErrorBoundary>
          </header>

          {/* Main content with page transitions */}
          <main 
            role="main" 
            id="main-content" 
            tabIndex={-1}
            aria-label="Conteúdo principal"
            className="flex-grow pt-16 md:pt-18"
          >
            <ErrorBoundary>
              <PageTransition>
                {children}
              </PageTransition>
            </ErrorBoundary>
          </main>

          {/* Footer */}
          <footer 
            role="contentinfo" 
            id="footer"
            aria-label="Informações do rodapé"
          >
            <Suspense fallback={<LoadingSkeleton variant="card" className="h-32" />}>
              <Footer />
            </Suspense>
          </footer>
          
          {/* Floating elements */}
          <Suspense fallback={null}>
            <SoniaChat />
          </Suspense>

          {/* Accessibility controls */}
          <HighContrastMode />
        </div>
      </ErrorBoundary>
    </AccessibilityEnhancements>
  );
};

export default EnhancedAppLayout;
