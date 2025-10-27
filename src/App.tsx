
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "@/components/app/AppProviders";
import CleanAppLayout from "@/components/app/CleanAppLayout";
import SimpleAppRoutes from "@/components/app/SimpleAppRoutes";
import SEOConfig from "@/components/seo/SEOConfig";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import { initGA, trackPageView, startActiveUserTracking } from "@/utils/analytics";
import "./App.css";
import ScrollToTop from "@/components/navigation/ScrollToTop";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Inicializar GA4 apenas uma vez
    initGA();
    
    // Iniciar rastreamento de usuários ativos
    startActiveUserTracking();
  }, []);

  useEffect(() => {
    // Rastrear mudanças de página
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <GoogleAnalytics />
      <SEOConfig>
        <CleanAppLayout>
          <SimpleAppRoutes />
        </CleanAppLayout>
      </SEOConfig>
    </>
  );
}

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
