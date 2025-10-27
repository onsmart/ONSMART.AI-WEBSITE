import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquareQuote, Users } from 'lucide-react';

const ServicesTestimonials: React.FC = () => {
  // Expanded testimonials data with different sectors
  const testimonials = [
    {
      name: "Carlos Silva",
      position: "CTO da TechCorp",
      company: "TechCorp",
      sector: "Tecnologia",
      initials: "CS",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "A implementação dos Agentes de IA na nossa empresa elevou a produtividade da equipe de desenvolvimento em 280%. Os processos que antes levavam dias agora são concluídos em horas."
    },
    {
      name: "Ana Ferreira",
      position: "CEO da HealthPlus",
      company: "HealthPlus",
      sector: "Saúde",
      initials: "AF",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "Após 3 meses com a solução VIBE ENTERPRISE, conseguimos reduzir nossos custos operacionais em 35% e melhorar significativamente o atendimento aos pacientes."
    },
    {
      name: "Roberto Mendes",
      position: "Diretor de Inovação",
      company: "FinanceGroup",
      sector: "Finanças",
      initials: "RM",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "Os Agentes de IA transformaram nossa análise de risco. Agora processamos 10x mais dados com maior precisão e conformidade regulatória."
    },
    {
      name: "Luciana Carvalho",
      position: "Gerente de Marketing",
      company: "RetailMaster",
      sector: "Varejo",
      initials: "LC",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "Implementamos os assistentes de IA para analisar o comportamento de compra e personalizar recomendações. Nosso engagement cresceu 45% e as vendas online aumentaram 28% em apenas 2 meses."
    },
    {
      name: "Eduardo Santos",
      position: "Diretor de Operações",
      company: "LogTech",
      sector: "Logística",
      initials: "ES",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "O sistema de IA da onsmartAI reduziu nossos custos logísticos em 23% e melhorou a precisão das entregas em 47%. Agora conseguimos prever atrasos e reagir proativamente."
    },
    {
      name: "Juliana Martins",
      position: "Head de RH",
      company: "TalentCorp",
      sector: "Recursos Humanos",
      initials: "JM",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "A integração de IA nos processos de recrutamento e seleção transformou nosso departamento. Reduzimos o tempo de contratação em 60% e aumentamos a retenção de talentos em 40%."
    },
    {
      name: "Marcelo Almeida",
      position: "CFO",
      company: "ConstructBuild",
      sector: "Construção Civil",
      initials: "MA",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "Os Agentes de IA nos ajudaram a otimizar o controle de custos e gestão de projetos. Conseguimos reduzir atrasos em obras em 30% e melhorar o planejamento financeiro de longo prazo."
    },
    {
      name: "Regina Torres",
      position: "Diretora Acadêmica",
      company: "EduFuture",
      sector: "Educação",
      initials: "RT",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "A implementação de IA personalizada para nossa instituição educacional melhorou o engajamento dos alunos em 50% e permitiu que nossos professores dedicassem 35% mais tempo ao atendimento individualizado."
    },
    {
      name: "Paulo Guimarães",
      position: "Diretor de Produtos",
      company: "AgriTech",
      sector: "Agronegócio",
      initials: "PG",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      text: "Os Agentes de IA revolucionaram nossa gestão de safra e previsão de produtividade. Aumentamos a eficiência da colheita em 25% e reduzimos o desperdício em quase 30%."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <MessageSquareQuote className="h-6 w-6 text-primary animate-pulse-slow" />
          </div>
          <h2 className="text-3xl font-bold mb-3">O que nossos clientes estão dizendo</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Depoimentos de profissionais que transformaram suas organizações com nossas soluções de IA
          </p>
        </div>
        
        {/* Setor badges para filtragem visual */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
          {Array.from(new Set(testimonials.map(t => t.sector))).map((sector, index) => (
            <span 
              key={index}
              className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {sector}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group animate-fade-in hover:translate-y-[-5px]"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400 animate-pulse-slow' : 'text-gray-300'}`} 
                        style={{ animationDelay: `${0.1 * i}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                    {testimonial.sector}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20 ring-2 ring-white dark:ring-gray-800">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">{testimonial.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</span>
                    <span className="text-sm font-medium text-primary mt-1 opacity-80 group-hover:opacity-100 transition-opacity">{testimonial.company}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesTestimonials;
