import React, { Suspense } from "react";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/navigation";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { ComponentSuspenseFallback } from "@/components/ui/ComponentSuspenseFallback";
import SoniaChat from "@/components/chat/SoniaChat";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <ErrorBoundary>
        <Suspense fallback={<ComponentSuspenseFallback />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <Suspense fallback={<LoadingSkeleton variant="text" />}>
              <Breadcrumbs />
            </Suspense>
          </div>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Suspense fallback={<ComponentSuspenseFallback />}>
          <Footer />
        </Suspense>
        
        <Suspense fallback={null}>
          <SoniaChat />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default AppLayout;
