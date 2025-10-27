
import React from "react";
import { CheckCircle, BarChart3, MapPin, Lightbulb, FileText, Star } from "lucide-react";

const servicesData = [
  {
    number: 1,
    icon: BarChart3,
    title: "Avaliação de Maturidade em IA",
    description: "Uma análise completa do nível atual de maturidade da sua empresa em relação à adoção de IA, identificando pontos fortes e oportunidades.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: 2,
    icon: MapPin,
    title: "Mapeamento de Processos Prioritários",
    description: "Identificação dos processos de negócio que mais se beneficiariam com a implementação de Agentes de IA, com estimativas de ganhos potenciais.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Análise de ROI Personalizada",
    description: "Um relatório detalhado com projeções de retorno sobre investimento para cada iniciativa de IA sugerida, considerando custos e benefícios estimados.",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    number: 4,
    icon: FileText,
    title: "Roadmap de Implementação",
    description: "Um plano estratégico faseado para implementação de Agentes de IA em sua empresa, considerando prioridades, impacto no negócio e complexidade.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    number: 5,
    icon: Lightbulb,
    title: "Proposta de Soluções Personalizadas",
    description: "Recomendações de soluções e ferramentas de IA adaptadas às necessidades específicas do seu negócio, com demonstrações de aplicabilidade prática.",
    gradient: "from-indigo-500 to-blue-500"
  }
];

const DiagnosticoServices = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
              <FileText className="h-3 w-3" />
              O Que Você Recebe
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Seu <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Diagnóstico Completo</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
              Receba um <span className="font-bold text-brand-blue">relatório detalhado</span> com análises personalizadas e <span className="font-bold text-brand-blue">recomendações estratégicas</span> para sua empresa.
            </p>
          </div>
          
          <div className="space-y-6">
            {servicesData.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-brand-blue/30 animate-in fade-in duration-500"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-start gap-4">
                    {/* Number Badge */}
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="font-bold text-white text-lg">{service.number}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors duration-300">
                        <IconComponent className="h-5 w-5 text-brand-blue" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-brand-blue transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-4 h-0.5 bg-gray-200/50 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${service.gradient} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`} style={{transitionDelay: `${index * 100}ms`}}></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Testimonial Card */}
          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-md border border-gray-200/50 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-brand-blue fill-current" />
            </div>
            
            <blockquote className="text-center text-base sm:text-lg font-medium text-gray-900 mb-6 leading-relaxed">
              "O diagnóstico realizado pela onsmart AI nos permitiu identificar <span className="text-brand-blue font-bold">oportunidades que nem sabíamos que existiam</span>. Implementamos os Agentes de IA recomendados e obtivemos um <span className="text-green-600 font-bold">aumento de 42% na produtividade</span> da equipe de suporte com apenas 2 meses de uso."
            </blockquote>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">MS</span>
              </div>
              <p className="font-bold text-gray-900">Maria Silva</p>
              <p className="text-gray-500 text-sm">Diretora de Operações • TechSolutions</p>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-brand-blue/5 to-blue-600/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticoServices;
