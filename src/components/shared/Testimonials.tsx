
import React from 'react';
import CompactTestimonialCard from './CompactTestimonialCard';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      position: "CTO",
      company: "TechCorp",
      sector: "Tecnologia",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      rating: 5,
      text: "A implementação dos Agentes de IA na nossa empresa elevou a produtividade da equipe de desenvolvimento em 280%. Os processos que antes levavam dias agora são concluídos em horas."
    },
    {
      name: "Ana Ferreira",
      position: "CEO",
      company: "HealthPlus",
      sector: "Saúde",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      rating: 5,
      text: "Após 3 meses com a solução VIBE ENTERPRISE, conseguimos reduzir nossos custos operacionais em 35% e melhorar significativamente o atendimento aos pacientes."
    },
    {
      name: "Roberto Mendes",
      position: "Diretor de Inovação",
      company: "FinanceGroup",
      sector: "Finanças",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      rating: 5,
      text: "Os Agentes de IA transformaram nossa análise de risco. Agora processamos 10x mais dados com maior precisão e conformidade regulatória."
    },
    {
      name: "Marcela Santos",
      position: "Diretora de Operações",
      company: "EduTech Brasil",
      sector: "Educação",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      rating: 5,
      text: "Os resultados com a implementação do sistema de IA foram surpreendentes. Conseguimos personalizar o aprendizado para cada aluno e aumentamos o engajamento em 45%."
    },
    {
      name: "Ricardo Oliveira",
      position: "Gerente de Supply Chain",
      company: "Mega Varejo",
      sector: "Varejo",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      rating: 5,
      text: "A plataforma de IA para previsão de demanda reduziu nosso desperdício em 40% e otimizou toda a cadeia de suprimentos. Um investimento que se pagou em menos de 6 meses."
    },
    {
      name: "Patricia Mendonça",
      position: "Diretora de Marketing",
      company: "AgriTech",
      sector: "Agronegócio",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=64&h=64&q=80",
      rating: 5,
      text: "Com a plataforma de IA, conseguimos otimizar os ciclos de plantio e colheita, resultando em um aumento de 22% na produtividade das nossas fazendas parceiras."
    },
  ];

  const featuredTestimonials = testimonials.slice(0, 3); // Mostrar apenas 3 testimonials

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="text-brand-blue text-sm sm:text-base font-medium mb-4 sm:mb-6">
            Depoimentos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
            O que dizem nossos <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">clientes</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {featuredTestimonials.map((testimonial, index) => (
            <CompactTestimonialCard
              key={index}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
