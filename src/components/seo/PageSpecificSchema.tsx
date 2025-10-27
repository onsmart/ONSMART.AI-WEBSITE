
import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageSpecificSchemaProps {
  pageType?: 'blog' | 'service' | 'contact' | 'diagnostic' | 'case-study';
  pageData?: any;
}

const PageSpecificSchema: React.FC<PageSpecificSchemaProps> = ({ 
  pageType, 
  pageData 
}) => {
  const location = useLocation();
  
  const getSchemaData = () => {
    const baseUrl = 'https://onsmart.ai';
    const currentUrl = `${baseUrl}${location.pathname}`;
    
    switch (pageType) {
      case 'blog':
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": pageData?.title || "Blog onsmartAI",
          "description": pageData?.excerpt || "Insights sobre IA empresarial",
          "image": pageData?.image ? `${baseUrl}${pageData.image}` : `${baseUrl}/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png`,
          "author": {
            "@type": "Person",
            "name": pageData?.author || "Equipe onsmartAI",
            "jobTitle": pageData?.authorRole || "Especialista em IA",
            "description": pageData?.authorBio || "Especialista em implementação de agentes de IA empresarial"
          },
          "publisher": {
            "@type": "Organization",
            "name": "onsmartAI",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png`
            }
          },
          "datePublished": pageData?.date || new Date().toISOString(),
          "dateModified": pageData?.date || new Date().toISOString(),
          "mainEntityOfPage": currentUrl,
          "wordCount": pageData?.content?.length || 1000,
          "articleSection": pageData?.category || "IA Empresarial",
          "keywords": pageData?.tags?.join(", ") || "agentes de IA, inteligência artificial",
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["h1", "h2", ".summary"]
          }
        };
        
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Implementação de Agentes de IA Empresarial",
          "description": "Serviços especializados em implementação de agentes de IA para transformação empresarial com metodologia LÍDER",
          "provider": {
            "@type": "Organization",
            "name": "onsmartAI",
            "url": baseUrl,
            "logo": `${baseUrl}/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5"
            }
          },
          "serviceType": "Consultoria em Inteligência Artificial",
          "category": "Transformação Digital",
          "areaServed": {
            "@type": "Country",
            "name": "Brasil"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços de IA",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Diagnóstico de IA Gratuito",
                  "description": "Análise completa do potencial de IA na sua empresa"
                },
                "price": "0",
                "priceCurrency": "BRL"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Implementação de Agentes de IA",
                  "description": "Desenvolvimento e implementação de agentes personalizados"
                }
              }
            ]
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "ROI Médio",
              "value": "420%"
            },
            {
              "@type": "PropertyValue", 
              "name": "Tempo de Implementação",
              "value": "30 dias"
            }
          ]
        };
        
      case 'contact':
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contato - onsmartAI",
          "description": "Entre em contato com nossos especialistas em IA empresarial",
          "url": currentUrl,
          "mainEntity": {
            "@type": "Organization",
            "name": "onsmartAI",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+55-11-99666-9247",
                "contactType": "customer service",
                "areaServed": "BR",
                "availableLanguage": "Portuguese",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              },
              {
                "@type": "ContactPoint",
                "email": "atendimento.ai@onsmart.com.br",
                "contactType": "customer support",
                "areaServed": "BR"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR",
              "addressRegion": "SP",
              "addressLocality": "São Paulo"
            }
          }
        };
        
      case 'diagnostic':
        return {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Diagnóstico Gratuito de IA",
          "description": "Ferramenta de diagnóstico gratuita para avaliar o potencial de IA na sua empresa",
          "url": currentUrl,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString()
          },
          "featureList": [
            "Análise de processos empresariais",
            "Estimativa de ROI",
            "Roadmap personalizado", 
            "Consultoria especializada"
          ],
          "softwareRequirements": "Navegador web moderno",
          "screenshot": `${baseUrl}/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png`,
          "applicationSuite": "onsmartAI Tools"
        };
        
      case 'case-study':
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Cases de Sucesso - onsmartAI",
          "description": "Cases reais de transformação empresarial com agentes de IA",
          "url": currentUrl,
          "about": {
            "@type": "Thing",
            "name": "Implementação de Agentes de IA",
            "description": "Casos de sucesso reais de implementação de IA empresarial"
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Cases de Sucesso por Setor",
            "description": "Estudos de caso organizados por indústria",
            "numberOfItems": 12,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Tecnologia - 420% ROI"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "Saúde - Redução 60% Custos"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Varejo - 300% Eficiência"
              }
            ]
          },
          "hasPart": [
            {
              "@type": "CaseStudy",
              "name": "Transformação Digital em Startup de Tecnologia",
              "result": "420% de aumento no ROI"
            }
          ]
        };
        
      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "onsmartAI - Agentes de IA Empresarial",
          "description": "Especialistas em implementação de agentes de IA para transformação empresarial",
          "url": currentUrl,
          "isPartOf": {
            "@type": "WebSite",
            "name": "onsmartAI",
            "url": baseUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${baseUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Início",
                "item": baseUrl
              }
            ]
          }
        };
    }
  };

  React.useEffect(() => {
    const schemaData = getSchemaData();
    
    // Remove existing page-specific schema
    const existingSchema = document.querySelector('script[data-page-schema="true"]');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-schema', 'true');
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
    
    return () => {
      const cleanup = document.querySelector('script[data-page-schema="true"]');
      if (cleanup) {
        cleanup.remove();
      }
    };
  }, [pageType, pageData, location.pathname]);

  return null;
};

export default PageSpecificSchema;
