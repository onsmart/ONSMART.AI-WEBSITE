
import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  pageTitle?: string;
}

const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs, pageTitle }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageTitle || "Perguntas Frequentes - onsmartAI",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  React.useEffect(() => {
    const existingFAQ = document.querySelector('script[data-faq-schema="true"]');
    if (existingFAQ) {
      existingFAQ.remove();
    }

    if (faqs.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-faq-schema', 'true');
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }

    return () => {
      const cleanup = document.querySelector('script[data-faq-schema="true"]');
      if (cleanup) {
        cleanup.remove();
      }
    };
  }, [faqs]);

  return null;
};

export default FAQSchema;
