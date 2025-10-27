import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Code, Zap, Users, Shield, Brain, Target, Send } from "lucide-react";
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

export default function WatsonXCodeAssistant() {
  const navigate = useNavigate();
  
  // Contadores animados
  const productivityCount = useCountUp(50, 1500);
  const availabilityCount = useCountUp(24, 1000);
  const languagesCount = useCountUp(100, 2000);
  const projectsCount = useCountUp(1000, 2500);
  const developersCount = useCountUp(500, 2000);
  const accuracyCount = useCountUp(95, 1800);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">


      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-blue-50">
                  <img 
                    src="https://images-onsmart.vercel.app/onsmart.ai/ai-code-assistant.png" 
                    alt="watsonx Code Assistant" 
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">AI Development</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">watsonx Code Assistant</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Assistente de IA especializado em desenvolvimento de código para acelerar a produtividade dos desenvolvedores.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={productivityCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {productivityCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Mais produtividade</div>
                </div>
                <div className="text-center" ref={availabilityCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {availabilityCount.count}/7
                  </div>
                  <div className="text-sm text-gray-600">Disponibilidade</div>
                </div>
                <div className="text-center" ref={languagesCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {languagesCount.count}+
                  </div>
                  <div className="text-sm text-gray-600">Linguagens suportadas</div>
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
                      <h4 className="font-semibold text-gray-900">Geração de Código Inteligente</h4>
                      <p className="text-gray-600">Criação automática de código baseado em descrições em linguagem natural</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Debugging Avançado</h4>
                      <p className="text-gray-600">Identificação e correção automática de bugs e problemas de código</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Refatoração Inteligente</h4>
                      <p className="text-gray-600">Melhoria automática da qualidade e estrutura do código</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Documentação Automática</h4>
                      <p className="text-gray-600">Geração automática de documentação técnica e comentários</p>
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
              Descubra como o watsonx Code Assistant pode revolucionar seu desenvolvimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Autocompletar Inteligente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sugestões contextuais de código baseadas no padrão do projeto.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Testes Automáticos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Geração automática de testes unitários e de integração.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Colaboração em Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compartilhamento de conhecimento e padrões entre desenvolvedores.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Segurança de Código</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Detecção automática de vulnerabilidades e práticas inseguras.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Análise de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Otimização automática de código para melhor performance.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Integração IDE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integração nativa com principais IDEs e editores de código.
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
              Veja como o watsonx Code Assistant está transformando o desenvolvimento de software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={projectsCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {projectsCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Projetos Concluídos</div>
              <div className="text-gray-600">Com sucesso em empresas globais</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={developersCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {developersCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Desenvolvedores Ativos</div>
              <div className="text-gray-600">Usando a plataforma diariamente</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={accuracyCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {accuracyCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Precisão do Código</div>
              <div className="text-gray-600">Gerado automaticamente</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Acelere seu Desenvolvimento com IA
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Junte-se aos desenvolvedores que já transformaram sua produtividade com watsonx Code Assistant.
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