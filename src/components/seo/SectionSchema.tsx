
import React from 'react';

interface SectionSchemaProps {
  type: 'service' | 'product' | 'organization' | 'testimonial' | 'howto' | 'course';
  data: any;
  sectionId?: string;
}

const SectionSchema: React.FC<SectionSchemaProps> = ({ type, data, sectionId }) => {
  const generateSchema = () => {
    const baseUrl = 'https://onsmart.ai';
    
    switch (type) {
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${baseUrl}#${sectionId || 'service'}`,
          "name": data.name,
          "description": data.description,
          "serviceType": data.serviceType || "Implementação de Agentes de IA",
          "provider": {
            "@type": "Organization",
            "name": "onsmartAI",
            "url": baseUrl
          },
          "offers": data.offers ? {
            "@type": "Offer",
            "name": data.offers.name,
            "description": data.offers.description,
            "price": data.offers.price || "0",
            "priceCurrency": "BRL"
          } : undefined,
          "areaServed": {
            "@type": "Country",
            "name": "Brasil"
          }
        };

      case 'testimonial':
        return {
          "@context": "https://schema.org",
          "@type": "Review",
          "@id": `${baseUrl}#${sectionId || 'testimonial'}`,
          "author": {
            "@type": "Person",
            "name": data.author,
            "jobTitle": data.authorRole
          },
          "reviewBody": data.content,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": data.rating || 5,
            "bestRating": 5
          },
          "itemReviewed": {
            "@type": "Service",
            "name": "Agentes de IA onsmartAI"
          }
        };

      case 'howto':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "@id": `${baseUrl}#${sectionId || 'howto'}`,
          "name": data.name,
          "description": data.description,
          "step": data.steps?.map((step: any, index: number) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.description,
            "image": step.image ? `${baseUrl}${step.image}` : undefined
          }))
        };

      case 'course':
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": `${baseUrl}#${sectionId || 'course'}`,
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "onsmartAI"
          },
          "courseMode": data.mode || "online",
          "educationalLevel": data.level || "intermediate",
          "about": data.topics || ["Inteligência Artificial", "Agentes de IA"],
          "teaches": data.skills || ["Implementação de IA", "Automação de Processos"]
        };

      default:
        return null;
    }
  };

  React.useEffect(() => {
    const schema = generateSchema();
    if (!schema) return;

    const schemaId = `section-schema-${sectionId || type}`;
    const existingSchema = document.querySelector(`script[data-section-schema="${schemaId}"]`);
    if (existingSchema) {
      existingSchema.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-section-schema', schemaId);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.querySelector(`script[data-section-schema="${schemaId}"]`);
      if (cleanup) {
        cleanup.remove();
      }
    };
  }, [type, data, sectionId]);

  return null;
};

export default SectionSchema;
