import React, { Suspense } from "react";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import SoniaChat from "@/components/chat/SoniaChat";

interface CleanAppLayoutProps {
  children: React.ReactNode;
}

const CleanAppLayout: React.FC<CleanAppLayoutProps> = ({ children }) => {

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col w-full">
        {/* Navigation */}
        <header role="banner" aria-label="Navegação principal">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSkeleton variant="card" className="h-16" />}>
              <Navbar />
            </Suspense>
          </ErrorBoundary>
        </header>

        {/* Main content */}
        <main 
          role="main" 
          id="main-content" 
          tabIndex={-1}
          aria-label="Conteúdo principal"
          className="flex-grow pt-16 md:pt-18"
        >
          {children}
        </main>

        {/* Footer */}
        <footer 
          role="contentinfo" 
          id="footer"
          aria-label="Informações do rodapé"
        >
          <ErrorBoundary>
            <Suspense fallback={<LoadingSkeleton variant="card" className="h-32" />}>
              <Footer />
            </Suspense>
          </ErrorBoundary>
        </footer>
        
        {/* Floating elements */}
        <ErrorBoundary>
          <Suspense fallback={null}>
            <SoniaChat />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default CleanAppLayout;
