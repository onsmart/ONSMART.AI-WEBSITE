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

export default function WatsonXAI() {
  const navigate = useNavigate();
  
  // Contadores animados
  const implementationCount = useCountUp(85, 1500);
  const complianceCount = useCountUp(100, 1000);
  const roiCount = useCountUp(4, 2000);
  const modelsCount = useCountUp(500, 2500);
  const accuracyCount = useCountUp(92, 1800);
  const enterpriseCount = useCountUp(300, 2200);

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
                    src="https://images-onsmart.vercel.app/onsmart.ai/watsonx.png" 
                    alt="watsonx.ai" 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">AI Tools</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">watsonx.ai™</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Trabalhe com modelos, ferramentas e governança de IA criados especificamente para negócios.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={implementationCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {implementationCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Redução no tempo de implementação</div>
                </div>
                <div className="text-center" ref={complianceCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {complianceCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Conformidade regulatória</div>
                </div>
                <div className="text-center" ref={roiCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {roiCount.count}x
                  </div>
                  <div className="text-sm text-gray-600">ROI médio em 6 meses</div>
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
                      <h4 className="font-semibold text-gray-900">Treinamento de Modelos</h4>
                      <p className="text-gray-600">Crie e treine modelos de IA com seus dados empresariais</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Governança de IA</h4>
                      <p className="text-gray-600">Controle total sobre o ciclo de vida dos modelos de IA</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Inteligência Empresarial</h4>
                      <p className="text-gray-600">Insights acionáveis baseados em dados reais</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Integração Simplificada</h4>
                      <p className="text-gray-600">Conecte-se facilmente com sistemas existentes</p>
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
              Descubra como o watsonx.ai™ pode transformar sua estratégia de IA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Studio de IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ambiente visual para criar, treinar e implantar modelos de IA sem código.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Governança Avançada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Controle de acesso, auditoria e conformidade regulatória integrados.
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
                  Trabalhe em conjunto com sua equipe em projetos de IA.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Monitoramento em Tempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Acompanhe o desempenho e saúde dos seus modelos de IA.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>AutoML</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatização completa do processo de machine learning.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Deploy Automatizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Implante modelos em produção com um clique.
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
              Veja como o watsonx.ai™ está transformando a IA empresarial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={modelsCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {modelsCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Modelos Treinados</div>
              <div className="text-gray-600">Em produção ativa</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={accuracyCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {accuracyCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Precisão Média</div>
              <div className="text-gray-600">Dos modelos em produção</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={enterpriseCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {enterpriseCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Empresas Ativas</div>
              <div className="text-gray-600">Usando a plataforma</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Transforme sua IA hoje
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Junte-se às empresas que já revolucionaram seus negócios com watsonx.ai™.
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