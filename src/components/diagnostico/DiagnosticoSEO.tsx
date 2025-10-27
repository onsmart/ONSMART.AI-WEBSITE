
import React from "react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";

const DiagnosticoSEO: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diagnóstico Gratuito de IA Empresarial",
    "description": "Análise completa e gratuita do potencial de Inteligência Artificial para sua empresa. Descubra como a IA pode transformar seus processos em apenas 30 minutos.",
    "provider": {
      "@type": "Organization",
      "name": "onsmartAI",
      "url": "https://onsmart.ai"
    },
    "offers": {
      "@type": "Offer",
      "name": "Diagnóstico Gratuito de IA",
      "description": "Sessão de diagnóstico personalizada de 30 minutos",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Empresas que buscam implementar IA"
    },
    "serviceType": "Consultoria em Inteligência Artificial",
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    }
  };

  return (
    <UnifiedSEO
      title="Diagnóstico Gratuito de IA | Descubra o Potencial da sua Empresa | onsmartAI"
      description="Agende seu diagnóstico gratuito de IA em 3 minutos. Análise personalizada, roadmap de implementação e estimativa de ROI. Resposta garantida em 24h."
      keywords="diagnóstico IA gratuito, consultoria inteligência artificial, análise processos IA, ROI inteligência artificial, implementação IA empresarial"
      ogImage="/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png"
      structuredData={structuredData}
      pageType="diagnostic"
    />
  );
};

export default DiagnosticoSEO;
