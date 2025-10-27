import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Target, Users, Zap, Star, Shield, TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const Servicos = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactClick = () => {
    navigate('/contato');
  };

  const handleDiagnosticoClick = () => {
    navigate('/diagnostico');
  };

  const handleVerDetalhesClick = (slug: string) => {
    navigate(`/servicos/${slug}`);
  };

  const services = [
    {
      id: 1,
      title: "Diagnóstico de IA",
      description: "Avaliação completa do potencial de IA da sua empresa. Identificamos oportunidades específicas de implementação nos seus processos e criamos um roadmap personalizado para transformação digital.",
      icon: Target,
      features: ["Análise de processos", "Identificação de oportunidades", "Relatório personalizado", "Roadmap de implementação", "Análise de ROI"],
      price: "Gratuito",
      duration: "15 min",
      color: "text-blue-600",
      slug: "diagnostico-ia"
    },
    {
      id: 2,
      title: "Aceleração de Adoção de IA",
      description: "Estratégia personalizada para implementação de IA na sua empresa. Desenvolvemos um plano completo de transformação digital adaptado ao seu setor e porte empresarial.",
      icon: Users,
      features: ["Roadmap personalizado", "Análise de mercado", "Plano de implementação", "Seleção de tecnologias", "Cronograma de execução"],
      price: "Sob consulta",
      duration: "1-2 semanas",
      color: "text-green-600",
      slug: "aceleracao-adocao-ia"
    },
    {
      id: 3,
      title: "Implementação Técnica",
      description: "Deploy completo de soluções de IA em sua infraestrutura. Implementamos sistemas robustos e escaláveis, integrando com seus sistemas existentes e garantindo alta performance.",
      icon: Zap,
      features: ["Configuração técnica", "Integração com sistemas", "Treinamento da equipe", "Monitoramento contínuo", "Documentação técnica"],
      price: "Sob consulta",
      duration: "30-60 dias",
      color: "text-purple-600",
      slug: "implementacao-tecnica"
    },
    {
      id: 4,
      title: "Treinamento em IA",
      description: "Capacitação completa da sua equipe para trabalhar com IA. Oferecemos cursos personalizados e certificações que preparam seus colaboradores para liderar a transformação digital.",
      icon: Star,
      features: ["Curso personalizado", "Certificação em IA", "Suporte pós-treinamento", "Workshops práticos", "Material didático"],
      price: "Sob consulta",
      duration: "1-4 semanas",
      color: "text-orange-600",
      slug: "treinamento-ia"
    },
    {
      id: 5,
      title: "Suporte Contínuo",
      description: "Acompanhamento e otimização das soluções implementadas. Oferecemos suporte técnico 24/7 e monitoramento proativo para garantir máxima eficiência e segurança.",
      icon: Shield,
      features: ["Monitoramento 24/7", "Otimizações contínuas", "Atualizações regulares", "Suporte especializado", "Relatórios de performance"],
      price: "Sob consulta",
      duration: "Contínuo",
      color: "text-red-600",
      slug: "suporte-continuo"
    },
    {
      id: 6,
      title: "Análise de Dados",
      description: "Transformação de dados em insights acionáveis com IA. Processamos seus dados históricos e em tempo real, criando dashboards inteligentes e previsões precisas.",
      icon: TrendingUp,
      features: ["Processamento de dados", "Dashboards inteligentes", "Relatórios automáticos", "Previsões e tendências", "Visualizações interativas"],
      price: "Sob consulta",
      duration: "2-4 semanas",
      color: "text-cyan-600",
      slug: "analise-dados"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitação Enviada!</h2>
            <p className="text-gray-600 mb-6">
              Obrigado pelo seu interesse em nossos serviços. Entraremos em contato em breve.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white"
            >
              Fazer Nova Solicitação
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-white">
      <UnifiedSEO 
        pageType="service"
        pageData={{
          title: "Serviços de IA - onsmartAI | Implementação e Consultoria Especializada",
          description: "Conheça nossos serviços especializados em IA: Diagnóstico, Consultoria, Implementação, Treinamento e Suporte. Metodologia LÍDER comprovada."
        }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <section id="hero-section" className="py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800/50 dark:via-blue-900/10 dark:to-brand-blue/5 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="text-center mb-8 animate-fade-in">
              {/* Badge Superior Profissional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Users className="h-3 w-3" />
                Nossos Serviços
              </div>
              
              {/* Título principal - Padronizado */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
                Transforme sua empresa com <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">IA</span>
              </h1>
              
              {/* Subheadline compacto */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
                Soluções especializadas para implementar <span className="font-bold text-brand-blue">Inteligência Artificial</span> na sua empresa através da 
                <span className="font-bold text-brand-blue"> metodologia LÍDER</span>
              </p>
            </div>

            {/* Stats Cards estilo HeroSection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue mb-1">350+</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">Empresas Transformadas</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Resultados comprovados</div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">420%</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">Aumento de Produtividade</div>
                  <div className="text-xs text-gray-500 leading-relaxed">ROI médio comprovado</div>
                </div>
              </div>

              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">30</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">Dias para Resultados</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Implementação rápida</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800/50 dark:via-blue-900/10 dark:to-brand-blue/5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="text-center mb-8 animate-fade-in">
              {/* Badge Superior Profissional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Star className="h-3 w-3" />
                Por que escolher nossos serviços?
              </div>
              
              {/* Título principal - Padronizado */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
                Vantagens <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Exclusivas</span>
              </h2>
              
              {/* Subheadline compacto */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
                Nossa metodologia exclusiva combina <span className="font-bold text-brand-blue">expertise técnica</span>, experiência de mercado 
                e <span className="font-bold text-brand-blue">acompanhamento personalizado</span>
              </p>
            </div>
            
            {/* Cards estilo HeroSection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-brand-blue mb-1">Metodologia Comprovada</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">Framework LÍDER</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Testado em 350+ empresas com resultados comprovados</div>
                </div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-green-600 mb-1">Especialistas Certificados</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">Equipe qualificada</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Certificações em IA e experiência de mercado</div>
                </div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-purple-600 mb-1">Implementação Rápida</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">30 dias para resultados</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Implementação ágil e eficiente</div>
                </div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-base font-bold text-orange-600 mb-1">Suporte Contínuo</div>
                  <div className="text-xs text-gray-600 font-medium mb-2">Acompanhamento 24/7</div>
                  <div className="text-xs text-gray-500 leading-relaxed">Máxima performance e segurança</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800/50 dark:via-blue-900/10 dark:to-brand-blue/5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="text-center mb-8 animate-fade-in">
              {/* Badge Superior Profissional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Zap className="h-3 w-3" />
                Nossos Serviços
              </div>
              
              {/* Título principal - Padronizado */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
                Soluções <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Especializadas</span>
              </h2>
              
              {/* Subheadline compacto */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
                Desde o <span className="font-bold text-brand-blue">diagnóstico inicial</span> até o <span className="font-bold text-brand-blue">suporte contínuo</span>, 
                oferecemos um ecossistema completo de serviços de IA
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="text-center flex-1 flex flex-col">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${service.color} bg-opacity-10`}>
                        <service.icon className={`h-6 w-6 ${service.color}`} />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed flex-1 min-h-[120px]">{service.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mb-6 text-sm">
                        <div>
                          <div className="text-gray-500">Investimento</div>
                          <div className="font-semibold text-gray-900">{service.price}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Duração</div>
                          <div className="font-semibold text-gray-900">{service.duration}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mt-auto">
                        <Button 
                          variant="outline"
                          className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                          onClick={() => handleVerDetalhesClick(service.slug)}
                        >
                          Ver Detalhes
                        </Button>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white"
                          onClick={() => {
                            if (service.id === 1) {
                              handleDiagnosticoClick();
                            } else {
                              handleContactClick();
                            }
                          }}
                        >
                          {service.id === 1 ? 'Solicitar Diagnóstico' : 'Solicitar Orçamento'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 dark:bg-gradient-to-br dark:from-gray-800/50 dark:via-blue-900/10 dark:to-brand-blue/5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div className="text-center mb-8 animate-fade-in">
              {/* Badge Superior Profissional */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
                <Mail className="h-3 w-3" />
                Entre em Contato
              </div>
              
              {/* Título principal - Padronizado */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight px-2 sm:px-0">
                Pronto para <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Transformar</span> sua Empresa?
              </h2>
              
              {/* Subheadline compacto */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed px-4 sm:px-2 md:px-0">
                Fale conosco hoje mesmo e descubra como a <span className="font-bold text-brand-blue">IA pode revolucionar</span> seus processos
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-200/50 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-sm text-gray-600">contato@onsmartai.com</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telefone</h3>
                  <p className="text-sm text-gray-600">+55 11 99666-9247</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Localização</h3>
                  <p className="text-sm text-gray-600">São Paulo - SP</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDiagnosticoClick}
                  className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white px-8 py-3"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Diagnóstico Gratuito
                </Button>
                
                <Button
                  onClick={handleContactClick}
                  variant="outline"
                  className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-3"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Falar com Especialista
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Servicos;





