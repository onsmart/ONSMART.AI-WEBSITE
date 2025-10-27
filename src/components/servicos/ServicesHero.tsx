
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, Briefcase, Users, Target, Clock } from 'lucide-react';

const ServicesHero: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleContactClick = () => {
    navigate('/contato');
  };

  const handleDiagnosticoClick = () => {
    if (location.pathname === "/diagnostico") {
      const formElement = document.getElementById('diagnostico-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate("/diagnostico");
      setTimeout(() => {
        const formElement = document.getElementById('diagnostico-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const services = [
    { icon: Briefcase, title: "Aceleração de Adoção", count: "6 serviços" },
    { icon: Target, title: "Implementação Técnica", count: "4 serviços" },
    { icon: Users, title: "Treinamento & Gestão", count: "3 serviços" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
            <Briefcase className="h-3 w-3" />
            Serviços Especializados
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transforme Sua Empresa com <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Serviços de IA</span>
          </h1>
          
          {/* AIDA - Atenção + Interesse */}
          <div className="max-w-3xl mx-auto space-y-6 mb-10">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                <span className="font-bold text-red-600">ALERTA:</span> Empresas que não implementam IA estão perdendo <span className="font-bold text-green-600">R$ 100.000+ por mês</span> em oportunidades de automação e eficiência.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                Nossa <span className="font-bold text-brand-blue">metodologia LÍDER</span> já transformou <span className="font-bold text-brand-blue">350+ empresas</span> com <span className="font-bold text-brand-blue">13 serviços especializados</span> e resultados comprovados em 30 dias.
              </p>
            </div>
          </div>

          {/* AIDA - Desejo */}
          <div className="bg-white border border-green-300 rounded-xl p-6 max-w-3xl mx-auto mb-6 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-green-700 mb-2">BENEFÍCIOS EXCLUSIVOS</h3>
              <p className="text-sm text-gray-600">O que você recebe com nossos serviços especializados</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Metodologia LÍDER</h4>
                  <p className="text-xs text-gray-600">6 etapas validadas e comprovadas</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Implementação Rápida</h4>
                  <p className="text-xs text-gray-600">Resultados em apenas 30 dias</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Suporte Especializado</h4>
                  <p className="text-xs text-gray-600">Para cada setor e necessidade</p>
                </div>
              </div>
            </div>
          </div>

          {/* AIDA - Urgência */}
          <div className="bg-red-50 border border-red-300 rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                VAGAS LIMITADAS
              </div>
              <h4 className="text-lg font-bold text-red-700 mb-2">
                Apenas 8 vagas restantes para implementação este mês
              </h4>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Resposta em 2h
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Sem compromisso
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Especialista dedicado
                </span>
              </div>
            </div>
          </div>

          {/* CTAs com navegação clara */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              onClick={handleDiagnosticoClick} 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg border-2 border-green-500/20"
            >
              SOLICITAR DIAGNÓSTICO GRATUITO
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleContactClick} 
              variant="outline" 
              size="lg"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
            >
              FALAR COM ESPECIALISTA
            </Button>
          </div>

          {/* Indicadores de confiança */}
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Resposta em 2h
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Proposta personalizada
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Sem compromisso
            </span>
          </div>
        </div>

        {/* Grid de serviços - visual diferenciado */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-900">Nossos Serviços por Categoria</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-brand-blue/5 transition-all"
                >
                  <div className="p-3 rounded-lg bg-brand-blue/10">
                    <service.icon className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{service.title}</div>
                    <div className="text-sm text-gray-600">{service.count}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-brand-blue/5 rounded-lg text-center">
              <div className="text-2xl font-bold text-brand-blue">13</div>
              <div className="text-sm text-gray-600">Serviços especializados disponíveis</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;

    <section className="py-20 md:py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-brand-blue-light/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Briefcase className="h-4 w-4" />
              <span>Catálogo Completo de Serviços</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Serviços especializados para cada fase da sua <span className="text-brand-blue">jornada de IA</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Do diagnóstico inicial à implementação completa. Oferecemos <strong>13 serviços especializados</strong> 
              para acelerar sua transformação digital com metodologia comprovada.
            </p>

            {/* Diferenciais únicos */}
            <div className="space-y-4 mb-8">
              {[
                "Metodologia LÍDER exclusiva com 6 etapas validadas",
                "Implementação em 30 dias com resultados mensuráveis",
                "Suporte especializado para cada setor e necessidade"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs com navegação clara */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                onClick={handleDiagnosticoClick} 
                size="lg" 
                className="bg-brand-blue text-white hover:bg-brand-blue/90 transition-all hover:translate-y-[-2px] shadow-lg"
              >
                Diagnóstico Gratuito
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={handleContactClick} 
                variant="outline" 
                size="lg"
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5 transition-all hover:translate-y-[-2px]"
              >
                Falar com Especialista
              </Button>
            </div>

            {/* Indicadores de confiança */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Resposta em 2h</span>
              </div>
              <span>•</span>
              <span>✓ Proposta personalizada</span>
              <span>•</span>
              <span>✓ Sem compromisso</span>
            </div>
          </div>

          {/* Grid de serviços - visual diferenciado */}
          <div className="lg:ml-auto">
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg border border-brand-blue-light/20">
              <h3 className="text-xl font-bold mb-6 text-center">Nossos Serviços por Categoria</h3>
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-brand-blue/5 transition-all animate-fade-in"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="p-3 rounded-lg bg-brand-blue/10">
                      <service.icon className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{service.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{service.count}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-brand-blue/5 rounded-lg text-center">
                <div className="text-2xl font-bold text-brand-blue">13</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Serviços especializados disponíveis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
