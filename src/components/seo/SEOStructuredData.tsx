
import { useEffect } from 'react';

interface SEOStructuredDataProps {
  structuredData?: any;
  ogImage: string;
}

const SEOStructuredData = ({ structuredData, ogImage }: SEOStructuredDataProps) => {
  useEffect(() => {
    // Handle structured data
    const finalStructuredData = structuredData || {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://onsmart.ai/#organization",
          "name": "onsmartAI",
          "description": "Especialistas em Agentes de IA empresarial no Brasil",
          "url": "https://onsmart.ai",
          "logo": {
            "@type": "ImageObject",
            "url": `https://onsmart.ai${ogImage}`,
            "width": "512",
            "height": "512"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+55-11-99666-9247",
              "contactType": "customer service",
              "areaServed": "BR",
              "availableLanguage": "Portuguese"
            }
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://onsmart.ai/#website",
          "url": "https://onsmart.ai",
          "name": "onsmartAI",
          "publisher": {
            "@id": "https://onsmart.ai/#organization"
          }
        }
      ]
    };

    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (!script.hasAttribute('data-breadcrumb-schema') && 
          !script.hasAttribute('data-faq-schema') && 
          !script.hasAttribute('data-page-schema')) {
        script.remove();
      }
    });

    // Add new structured data
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(finalStructuredData);
    document.head.appendChild(script);
  }, [structuredData, ogImage]);

  return null;
};

export default SEOStructuredData;
