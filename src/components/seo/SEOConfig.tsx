import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfigProps {
  children: React.ReactNode;
}

const SEOConfig: React.FC<SEOConfigProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Ensure proper SEO configuration for all pages
    const configureSEO = () => {
      // Remove any existing noindex tags
      const noindexTags = document.querySelectorAll('meta[name="robots"][content*="noindex"]');
      noindexTags.forEach(tag => {
        if (!location.pathname.includes('/admin') && !location.pathname.includes('/404')) {
          tag.remove();
        }
      });

      // Add proper robots meta tag if not exists
      let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }

      // Set appropriate robots content based on page
      if (location.pathname.includes('/admin')) {
        robotsMeta.setAttribute('content', 'noindex, nofollow');
      } else if (location.pathname.includes('/404')) {
        robotsMeta.setAttribute('content', 'noindex, nofollow');
      } else {
        robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      }

      // Ensure canonical URL is set
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }

      const currentUrl = `https://onsmart.ai${location.pathname}`;
      canonical.setAttribute('href', currentUrl);

      // Add hreflang tags for international SEO
      const addHreflang = (lang: string, url: string) => {
        let hreflang = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement;
        if (!hreflang) {
          hreflang = document.createElement('link');
          hreflang.setAttribute('rel', 'alternate');
          hreflang.setAttribute('hreflang', lang);
          document.head.appendChild(hreflang);
        }
        hreflang.setAttribute('href', url);
      };

      addHreflang('pt-BR', currentUrl);
      addHreflang('x-default', currentUrl);

      // Add structured data for organization
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "onsmartAI",
        "url": "https://onsmart.ai",
        "logo": "https://onsmart.ai/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png",
        "description": "Especialistas em Agentes de IA empresarial no Brasil",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "BR",
          "addressRegion": "São Paulo"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-11-99666-9247",
          "contactType": "customer service",
          "areaServed": "BR",
          "availableLanguage": "Portuguese"
        },
        "sameAs": [
          "https://www.linkedin.com/company/onsmartai",
          "https://twitter.com/onsmartAI"
        ]
      };

      // Remove existing organization schema
      const existingOrgSchema = document.querySelector('script[data-org-schema="true"]');
      if (existingOrgSchema) {
        existingOrgSchema.remove();
      }

      // Add new organization schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-org-schema', 'true');
      script.textContent = JSON.stringify(organizationSchema);
      document.head.appendChild(script);
    };

    configureSEO();
  }, [location.pathname]);

  return <>{children}</>;
};

export default SEOConfig; 