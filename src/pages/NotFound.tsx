import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // SEO: Update document title for 404 page
    document.title = "Página não encontrada - onsmartAI";
    
    // SEO: Add meta description for 404 page
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Página não encontrada. Explore nossos serviços de Agentes de IA.');
    }

    // Add noindex meta tag for 404 pages to prevent indexing
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    // Add canonical URL to prevent duplicate content issues
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://onsmart.ai/404');

    // Add structured data for 404 page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Página não encontrada",
      "description": "A página solicitada não foi encontrada",
      "url": "https://onsmart.ai/404",
      "isPartOf": {
        "@type": "WebSite",
        "name": "onsmartAI",
        "url": "https://onsmart.ai"
      }
    };

    // Remove existing 404 structured data
    const existingScript = document.querySelector('script[data-404-schema="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-404-schema', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const cleanup = document.querySelector('script[data-404-schema="true"]');
      if (cleanup) {
        cleanup.remove();
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Accessible heading structure */}
        <h1 className="text-6xl md:text-8xl font-bold text-brand-black mb-4" aria-label="Erro 404">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Página não encontrada
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida. 
          Que tal explorar nossos serviços de <strong>Agentes de IA</strong>?
        </p>

        {/* Accessible navigation options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-brand-black hover:bg-brand-black/90 text-white font-medium"
            aria-label="Voltar para página inicial"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              Página Inicial
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.history.back()}
            aria-label="Voltar à página anterior"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Voltar
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            aria-label="Ver nossos serviços"
          >
            <Link to="/servicos">
              <Search className="mr-2 h-4 w-4" aria-hidden="true" />
              Nossos Serviços
            </Link>
          </Button>
        </div>

        {/* Popular links for better UX */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Links Populares
          </h3>
          <nav aria-label="Links populares">
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <li>
                <Link 
                  to="/servicos" 
                  className="text-brand-blue hover:text-brand-blue/80 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link 
                  to="/case-de-sucesso" 
                  className="text-brand-blue hover:text-brand-blue/80 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                >
                  Cases de Sucesso
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-brand-blue hover:text-brand-blue/80 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="text-brand-blue hover:text-brand-blue/80 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 rounded"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
