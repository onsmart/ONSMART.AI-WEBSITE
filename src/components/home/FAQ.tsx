
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Como os Agentes de IA se integram aos sistemas existentes?",
      answer: "Utilizamos conectores pré-construídos e APIs para integração com sistemas como SAP, Salesforce e Microsoft 365. O processo leva de 2 a 4 semanas com suporte completo da nossa equipe."
    },
    {
      question: "Qual é o tempo médio de implementação?",
      answer: "De 4 a 8 semanas, incluindo diagnóstico, configuração, treinamento e lançamento. Para empresas maiores, pode levar até 12 semanas."
    },
    {
      question: "Como é calculado o ROI da implementação?",
      answer: "Consideramos redução de custos, aumento de produtividade, redução de erros e melhoria na experiência do cliente. ROI médio superior a 300% anual com break-even em 3-6 meses."
    },
    {
      question: "É necessário conhecimento técnico para gerenciar?",
      answer: "Não. A plataforma possui interfaces intuitivas para usuários de negócio e inclui treinamento completo. Oferecemos também o serviço totalmente gerenciado."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-brand-blue text-sm sm:text-base font-medium mb-4 sm:mb-6">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            Dúvidas <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">frequentes</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600 dark:text-gray-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => window.location.href = '/contato'} 
            className="text-brand-blue hover:text-brand-blue/80 font-medium text-sm inline-flex items-center"
          >
            Fale com um especialista
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
