
import React from 'react';

interface CaseStudyData {
  title: string;
  description: string;
  industry: string;
  company?: string;
  companySize?: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  timeline: string;
  roi?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface CaseStudySchemaProps {
  caseData: CaseStudyData;
  caseId?: string;
}

const CaseStudySchema: React.FC<CaseStudySchemaProps> = ({ caseData, caseId }) => {
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    "@id": `https://onsmart.ai/case-de-sucesso#${caseId || 'case'}`,
    "name": caseData.title,
    "description": caseData.description,
    "about": {
      "@type": "Thing",
      "name": `Implementação de IA - ${caseData.industry}`,
      "description": caseData.challenge
    },
    "result": caseData.results.map(result => ({
      "@type": "QuantitativeValue",
      "name": result.metric,
      "description": `${result.improvement} de melhoria`,
      "value": result.after,
      "unitText": result.metric.includes('%') ? 'percent' : 'units'
    })),
    "subjectOf": {
      "@type": "CreativeWork",
      "name": `Case de Sucesso - ${caseData.industry}`,
      "author": {
        "@type": "Organization",
        "name": "onsmartAI"
      },
      "datePublished": new Date().toISOString(),
      "genre": "Case Study"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": caseData.company || `Empresa do setor ${caseData.industry}`,
      "industry": caseData.industry,
      "numberOfEmployees": caseData.companySize
    },
    "workExample": {
      "@type": "CreativeWork",
      "name": `Solução de IA para ${caseData.industry}`,
      "description": caseData.solution,
      "creator": {
        "@type": "Organization",
        "name": "onsmartAI"
      }
    }
  };

  // Add testimonial as a separate review object if available
  if (caseData.testimonial) {
    (caseStudySchema as any).review = {
      "@type": "Review",
      "reviewBody": caseData.testimonial.quote,
      "author": {
        "@type": "Person",
        "name": caseData.testimonial.author,
        "jobTitle": caseData.testimonial.role
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5
      }
    };
  }

  React.useEffect(() => {
    const schemaId = `case-study-${caseId || 'default'}`;
    const existingSchema = document.querySelector(`script[data-case-schema="${schemaId}"]`);
    if (existingSchema) {
      existingSchema.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-case-schema', schemaId);
    script.textContent = JSON.stringify(caseStudySchema);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.querySelector(`script[data-case-schema="${schemaId}"]`);
      if (cleanup) {
        cleanup.remove();
      }
    };
  }, [caseData, caseId]);

  return null;
};

export default CaseStudySchema;
