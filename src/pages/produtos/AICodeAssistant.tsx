import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Shield, Users, Clock, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Hook para contador animado
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16); // 60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count, ref };
};

export default function AICodeAssistant() {
  const navigate = useNavigate();
  
  // Contadores animados
  const productivityCount = useCountUp(90, 1500);
  const accuracyCount = useCountUp(95, 2000);
  const efficiencyCount = useCountUp(3, 1800);
  const projectsCount = useCountUp(500, 2500);
  const developersCount = useCountUp(200, 2200);
  const bugsCount = useCountUp(99, 2000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">


      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-blue-50">
                  <img 
                    src="https://images-onsmart.vercel.app/onsmart.ai/ai-code-assistant.png" 
                    alt="AI Code Assistant" 
                    className="w-16 h-16"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">AI Assistants</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">AI Code Assistant</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Reinvente a forma de trabalhar com agentes de IA inteligentes que revolucionam o desenvolvimento de software.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={productivityCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {productivityCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Redução no tempo de desenvolvimento</div>
                </div>
                <div className="text-center" ref={accuracyCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {accuracyCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Precisão na detecção de bugs</div>
                </div>
                <div className="text-center" ref={efficiencyCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {efficiencyCount.count}x
                  </div>
                  <div className="text-sm text-gray-600">Aumento na produtividade</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-brand-blue hover:bg-brand-blue/90 text-brand-black font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/contato')}
              >
                <Send className="mr-2 h-5 w-5" />
                Solicitar Demonstração
              </Button>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Principais Recursos</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Geração Inteligente de Código</h4>
                      <p className="text-gray-600">Crie código de alta qualidade automaticamente com base em especificações naturais</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Detecção Avançada de Bugs</h4>
                      <p className="text-gray-600">Identifique e corrija problemas antes que cheguem à produção</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Otimização de Performance</h4>
                      <p className="text-gray-600">Melhore automaticamente a eficiência e velocidade do seu código</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Refatoração Inteligente</h4>
                      <p className="text-gray-600">Mantenha seu código limpo e organizado com sugestões automáticas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos Avançados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra como o AI Code Assistant pode transformar seu fluxo de desenvolvimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Análise de Código em Tempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receba feedback instantâneo sobre qualidade, performance e boas práticas enquanto codifica.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Segurança Integrada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Detecção automática de vulnerabilidades e implementação de práticas de segurança.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Colaboração Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Facilite a colaboração entre equipes com sugestões contextualizadas e documentação automática.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Debugging Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Identifique e resolva problemas rapidamente com análise inteligente de logs e stack traces.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Testes Automatizados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gere testes unitários e de integração automaticamente com alta cobertura.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Deploy Otimizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatize o processo de deploy com verificações de qualidade e rollback inteligente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Números Impressionantes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja como o AI Code Assistant está revolucionando o desenvolvimento de software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={projectsCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {projectsCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Projetos Otimizados</div>
              <div className="text-gray-600">Com IA assistiva</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={developersCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {developersCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Desenvolvedores Ativos</div>
              <div className="text-gray-600">Usando a plataforma</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={bugsCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {bugsCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Bugs Detectados</div>
              <div className="text-gray-600">Antes da produção</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Transforme seu desenvolvimento hoje
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Junte-se às empresas que já aumentaram sua produtividade em 300% com AI Code Assistant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-brand-black font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/contato')}
            >
              <Send className="mr-2 h-5 w-5" />
              Solicitar Demonstração
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="font-medium px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/produtos')}
            >
              Ver Outros Produtos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 