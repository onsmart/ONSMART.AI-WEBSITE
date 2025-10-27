
import React from "react";

const CLIENT_LOGOS = [
  {
    name: "TechCorp Brasil",
    sector: "technology",
    logo: "🏢",
    testimonial: "Aumentamos produtividade em 400% com IA"
  },
  {
    name: "Hospital São Paulo",
    sector: "healthcare", 
    logo: "🏥",
    testimonial: "Automatizamos 80% dos processos administrativos"
  },
  {
    name: "Banco Digital+",
    sector: "finance",
    logo: "🏦", 
    testimonial: "ROI de 520% em 6 meses com agentes de IA"
  },
  {
    name: "VarejoMax",
    sector: "retail",
    logo: "🛒",
    testimonial: "Vendas aumentaram 250% com IA personalizada"
  },
  {
    name: "EduTech Academy",
    sector: "education",
    logo: "🎓",
    testimonial: "Ensino personalizado para 10x mais alunos"
  },
  {
    name: "Indústria 4.0 Ltda",
    sector: "manufacturing",
    logo: "🏭",
    testimonial: "Redução de 40% nos custos de produção"
  },
  {
    name: "StartupUnicornio",
    sector: "technology",
    logo: "🦄",
    testimonial: "De startup a unicórnio em 18 meses"
  },
  {
    name: "Consultoria Elite",
    sector: "services",
    logo: "💼",
    testimonial: "Expandimos para 3 países com IA"
  },
  {
    name: "AgriTech Solutions",
    sector: "agriculture",
    logo: "🌾",
    testimonial: "Otimizamos produção agrícola em 300%"
  },
  {
    name: "LogísticaPro",
    sector: "logistics",
    logo: "🚛",
    testimonial: "Entregas 90% mais eficientes"
  }
];

interface EnhancedClientLogosProps {
  showTestimonials?: boolean;
  filterBySector?: string;
  maxLogos?: number;
}

const EnhancedClientLogos: React.FC<EnhancedClientLogosProps> = ({ 
  showTestimonials = false, 
  filterBySector,
  maxLogos = 10 
}) => {
  const filteredLogos = filterBySector 
    ? CLIENT_LOGOS.filter(client => client.sector === filterBySector)
    : CLIENT_LOGOS;

  const displayLogos = filteredLogos.slice(0, maxLogos);

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Empresas que já transformaram seus resultados
          </h3>
          <p className="text-sm text-gray-600">
            Junte-se a {CLIENT_LOGOS.length}+ empresas líderes em seus setores
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-5 gap-8 items-center justify-items-center mb-8">
          {displayLogos.map((client, index) => (
            <div
              key={client.name}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-2">{client.logo}</div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-800">{client.name}</div>
                <div className="text-xs text-gray-500 capitalize">{client.sector}</div>
                {showTestimonials && (
                  <div className="text-xs text-blue-600 mt-1 italic">
                    "{client.testimonial}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-4 pb-4 px-2 snap-x snap-mandatory">
            {displayLogos.map((client, index) => (
              <div
                key={client.name}
                className="flex-shrink-0 w-32 p-3 bg-white rounded-lg shadow-sm snap-center animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-2xl text-center mb-1">{client.logo}</div>
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-800 leading-tight">
                    {client.name}
                  </div>
                  <div className="text-xs text-gray-500 capitalize mt-1">
                    {client.sector}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas de Resultados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600">420%</div>
            <div className="text-sm text-gray-600">ROI Médio</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">Satisfação</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">30 dias</div>
            <div className="text-sm text-gray-600">Implementação</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-orange-600">500+</div>
            <div className="text-sm text-gray-600">Empresas</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedClientLogos;
