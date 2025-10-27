import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface DynamicPageSEOProps {
  pageData?: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    author?: string;
    publishDate?: string;
    modifiedDate?: string;
    category?: string;
    tags?: string[];
  };
  pageType?: 'blog' | 'case-study' | 'service' | 'product';
}

const DynamicPageSEO: React.FC<DynamicPageSEOProps> = ({ pageData, pageType }) => {
  const location = useLocation();

  useEffect(() => {
    const configureDynamicSEO = () => {
      const currentUrl = `https://onsmart.ai${location.pathname}`;
      
      // Update title if provided
      if (pageData?.title) {
        document.title = pageData.title;
      }

      // Update meta description
      if (pageData?.description) {
        let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', pageData.description);
      }

      // Update keywords
      if (pageData?.keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', pageData.keywords);
      }

      // Update Open Graph tags
      const updateOGTag = (property: string, content: string) => {
        let ogTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!ogTag) {
          ogTag = document.createElement('meta');
          ogTag.setAttribute('property', property);
          document.head.appendChild(ogTag);
        }
        ogTag.setAttribute('content', content);
      };

      if (pageData?.title) {
        updateOGTag('og:title', pageData.title);
      }
      if (pageData?.description) {
        updateOGTag('og:description', pageData.description);
      }
      if (pageData?.image) {
        updateOGTag('og:image', `https://onsmart.ai${pageData.image}`);
      }
      updateOGTag('og:url', currentUrl);

      // Update Twitter Card tags
      const updateTwitterTag = (name: string, content: string) => {
        let twitterTag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!twitterTag) {
          twitterTag = document.createElement('meta');
          twitterTag.setAttribute('name', name);
          document.head.appendChild(twitterTag);
        }
        twitterTag.setAttribute('content', content);
      };

      if (pageData?.title) {
        updateTwitterTag('twitter:title', pageData.title);
      }
      if (pageData?.description) {
        updateTwitterTag('twitter:description', pageData.description);
      }
      if (pageData?.image) {
        updateTwitterTag('twitter:image', `https://onsmart.ai${pageData.image}`);
      }

      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', currentUrl);

      // Add structured data based on page type
      const generateStructuredData = () => {
        const baseData = {
          "@context": "https://schema.org",
          "url": currentUrl,
          "publisher": {
            "@type": "Organization",
            "name": "onsmartAI",
            "logo": {
              "@type": "ImageObject",
              "url": "https://onsmart.ai/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png"
            }
          }
        };

        switch (pageType) {
          case 'blog':
            return {
              ...baseData,
              "@type": "BlogPosting",
              "headline": pageData?.title || "Blog onsmartAI",
              "description": pageData?.description || "Insights sobre IA empresarial",
              "image": pageData?.image ? `https://onsmart.ai${pageData.image}` : "https://onsmart.ai/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png",
              "author": {
                "@type": "Person",
                "name": pageData?.author || "Equipe onsmartAI"
              },
              "datePublished": pageData?.publishDate || new Date().toISOString(),
              "dateModified": pageData?.modifiedDate || new Date().toISOString(),
              "articleSection": pageData?.category || "IA Empresarial",
              "keywords": pageData?.tags?.join(", ") || "agentes de ia, inteligência artificial"
            };

          case 'case-study':
            return {
              ...baseData,
              "@type": "Article",
              "headline": pageData?.title || "Case de Sucesso",
              "description": pageData?.description || "Estudo de caso sobre implementação de IA",
              "image": pageData?.image ? `https://onsmart.ai${pageData.image}` : "https://onsmart.ai/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png",
              "author": {
                "@type": "Person",
                "name": pageData?.author || "Equipe onsmartAI"
              },
              "datePublished": pageData?.publishDate || new Date().toISOString(),
              "articleSection": "Cases de Sucesso"
            };

          case 'service':
            return {
              ...baseData,
              "@type": "Service",
              "name": pageData?.title || "Serviços de IA",
              "description": pageData?.description || "Serviços especializados em IA empresarial",
              "provider": {
                "@type": "Organization",
                "name": "onsmartAI"
              },
              "serviceType": "Consultoria em IA",
              "areaServed": "Brasil"
            };

          default:
            return {
              ...baseData,
              "@type": "WebPage",
              "name": pageData?.title || "onsmartAI",
              "description": pageData?.description || "Especialistas em Agentes de IA empresarial"
            };
        }
      };

      // Remove existing dynamic structured data
      const existingDynamicSchema = document.querySelector('script[data-dynamic-schema="true"]');
      if (existingDynamicSchema) {
        existingDynamicSchema.remove();
      }

      // Add new structured data
      const structuredData = generateStructuredData();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic-schema', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    configureDynamicSEO();
  }, [location.pathname, pageData, pageType]);

  return null;
};

export default DynamicPageSEO; 