
import React from 'react';
import { useLocation } from 'react-router-dom';

const routeNames: Record<string, string> = {
  "": "Início",
  "servicos": "Serviços",
  "case-de-sucesso": "Cases de Sucesso",
  "conteudo": "Conteúdo",
  "blog": "Blog",
  "contato": "Contato",
  "diagnostico": "Diagnóstico",
  "planos": "Planos"
};

const BreadcrumbSchema: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(path => path);
  
  if (paths.length === 0) return null;

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Início",
      "item": "https://onsmart.ai"
    },
    ...paths.map((path, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": routeNames[path] || path,
      "item": `https://onsmart.ai/${paths.slice(0, index + 1).join('/')}`
    }))
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  React.useEffect(() => {
    const existingBreadcrumb = document.querySelector('script[data-breadcrumb-schema="true"]');
    if (existingBreadcrumb) {
      existingBreadcrumb.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.querySelector('script[data-breadcrumb-schema="true"]');
      if (cleanup) {
        cleanup.remove();
      }
    };
  }, [location.pathname]);

  return null;
};

export default BreadcrumbSchema;
