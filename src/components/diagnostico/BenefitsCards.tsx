
import React from "react";
import { Search, DollarSign, TrendingUp, Users, MapPin, Trophy } from "lucide-react";

const benefitsData = [
  {
    icon: Search,
    title: "Identifique Oportunidades",
    description: "Descubra áreas específicas onde a implementação de IA pode trazer os maiores retornos para seu negócio.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: DollarSign,
    title: "Reduza Custos Operacionais",
    description: "Nossos clientes relatam reduções médias de 40% em custos operacionais após a implementação adequada de IA.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: TrendingUp,
    title: "Aumente a Produtividade",
    description: "Libere o potencial da sua equipe com Agentes de IA que realizam tarefas repetitivas e estratégicas.",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    icon: Users,
    title: "Melhore a Experiência",
    description: "Transforme a experiência dos seus clientes com respostas imediatas, 24/7, e serviços personalizados.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: MapPin,
    title: "Obtenha um Roadmap",
    description: "Receba um plano de implementação completo com estimativas de ROI e cronograma detalhado.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Trophy,
    title: "Ganhe Vantagem Competitiva",
    description: "Coloque-se à frente da concorrência ao adotar Agentes de IA de forma estratégica e inteligente.",
    gradient: "from-yellow-500 to-orange-500"
  }
];

const BenefitsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefitsData.map((benefit, index) => {
        const IconComponent = benefit.icon;
        return (
          <div 
            key={index}
            className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-brand-blue/30 animate-in fade-in duration-500"
            style={{animationDelay: `${index * 100}ms`}}
          >
            {/* Icon */}
            <div className="mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
            </div>
            
            {/* Title */}
            <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-brand-blue transition-colors">
              {benefit.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {benefit.description}
            </p>
            
            {/* Hover Effect - Progress bar */}
            <div className="mt-4 h-0.5 bg-gray-200/50 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${benefit.gradient} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BenefitsCards;
