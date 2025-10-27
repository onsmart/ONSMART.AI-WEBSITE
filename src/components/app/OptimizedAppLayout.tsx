import React, { Suspense } from "react";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import SoniaChat from "@/components/chat/SoniaChat";

interface OptimizedAppLayoutProps {
  children: React.ReactNode;
}

const OptimizedAppLayout: React.FC<OptimizedAppLayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col w-full">
        {/* Navigation - critical, load immediately */}
        <header role="banner" aria-label="Navegação principal">
          <Navbar />
        </header>

        {/* Main content */}
        <main 
          role="main" 
          id="main-content" 
          tabIndex={-1}
          className="flex-grow pt-16 md:pt-18"
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>

        {/* Footer - critical for SEO */}
        <footer role="contentinfo">
          <Footer />
        </footer>
        
        {/* Non-critical floating elements */}
        <Suspense fallback={null}>
          <SoniaChat />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default OptimizedAppLayout;
