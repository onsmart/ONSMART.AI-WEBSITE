
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from 'lucide-react';

const ServicesFAQ = () => {
  const faqData = [
    {
      question: "Quanto tempo leva para implementar uma solução de IA?",
      answer: "Depende da complexidade, mas nossa metodologia permite implementações em 4-8 semanas para a maioria dos projetos. Começamos com projetos piloto que entregam resultados em 2-3 semanas, permitindo validação rápida antes da expansão."
    },
    {
      question: "Qual é o investimento médio para implementar IA na empresa?",
      answer: "O investimento varia entre R$ 50.000 a R$ 500.000 dependendo do escopo. Oferecemos projetos piloto a partir de R$ 15.000 para validar o conceito. Use nossa calculadora de ROI para uma estimativa personalizada."
    },
    {
      question: "Como vocês garantem que a IA se integre com nossos sistemas atuais?",
      answer: "Realizamos uma auditoria técnica completa dos seus sistemas antes de qualquer implementação. Nossa equipe tem experiência com ERPs, CRMs e sistemas legados. Usamos APIs e conectores padrão para garantir integração sem interrupções."
    },
    {
      question: "E se minha equipe não souber usar as ferramentas de IA?",
      answer: "Incluímos treinamento completo em todos os nossos serviços. Oferecemos workshops práticos, documentação personalizada e suporte contínuo. Nossa metodologia foca na adoção cultural, não apenas na implementação técnica."
    },
    {
      question: "Quais setores vocês já atenderam com sucesso?",
      answer: "Temos experiência em tecnologia, finanças, saúde, varejo, educação, manufatura e serviços. Cada setor tem suas particularidades, e adaptamos nossa abordagem para as regulamentações e necessidades específicas de cada um."
    },
    {
      question: "Como é feito o suporte após a implementação?",
      answer: "Oferecemos 3 meses de suporte incluído, com monitoramento de performance, ajustes e otimizações. Depois disso, temos planos de manutenção flexíveis com SLA garantido e suporte técnico especializado."
    },
    {
      question: "Vocês trabalham com empresas de qualquer tamanho?",
      answer: "Sim! Atendemos desde startups até grandes corporações. Para PMEs, oferecemos soluções mais enxutas e focadas. Para grandes empresas, temos capacidade para projetos complexos e multi-departamentais."
    },
    {
      question: "Como vocês medem o sucesso da implementação?",
      answer: "Definimos KPIs específicos no início do projeto: redução de tempo, aumento de produtividade, diminuição de erros, ROI financeiro. Fornecemos dashboards em tempo real e relatórios mensais com métricas claras de impacto."
    },
    {
      question: "É possível fazer um projeto piloto antes de uma implementação maior?",
      answer: "Absolutamente! Recomendamos sempre começar com um piloto focado em um processo específico. Isso permite validar a tecnologia, medir resultados reais e ajustar a estratégia antes de expandir para toda a organização."
    },
    {
      question: "Vocês oferecem garantia de resultados?",
      answer: "Sim, oferecemos garantia de satisfação. Se não atingirmos os KPIs acordados nos primeiros 90 dias, trabalhamos sem custo adicional até alcançar os objetivos ou devolvemos o investimento proporcional."
    }
  ];

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto max-w-4xl px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Perguntas Frequentes sobre Nossos Serviços</CardTitle>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Encontre respostas para as dúvidas mais comuns sobre implementação de IA
            </p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-8 text-center p-6 bg-primary/10 rounded-lg">
              <h4 className="font-bold text-lg mb-2">Não encontrou sua pergunta?</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Entre em contato conosco para um diagnóstico gratuito e esclarecimento personalizado
              </p>
              <div className="flex gap-4 justify-center">
                <span className="text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                   atendimento.ai@onsmart.com.br
                </span>
                <span className="text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                  📱 +55 11 99666-9247
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesFAQ;
