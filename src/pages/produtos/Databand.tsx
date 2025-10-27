import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, AlertTriangle, Eye, Shield, Users, Zap, Send } from "lucide-react";
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

export default function Databand() {
  const navigate = useNavigate();
  
  // Contadores animados
  const detectionCount = useCountUp(99, 1500);
  const reductionCount = useCountUp(80, 2000);
  const monitoringCount = useCountUp(24, 1800);
  const pipelinesCount = useCountUp(1000, 2500);
  const accuracyCount = useCountUp(95, 2000);
  const enterpriseCount = useCountUp(150, 2200);

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
                    src="https://images-onsmart.vercel.app/onsmart.ai/databand.png" 
                    alt="Databand" 
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain scale-150"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Data Observability</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">Databand</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Plataforma de observabilidade de dados para monitoramento e qualidade de pipelines de dados.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={detectionCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {detectionCount.count}.9%
                  </div>
                  <div className="text-sm text-gray-600">Detecção de Problemas</div>
                </div>
                <div className="text-center" ref={reductionCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {reductionCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Redução de Tempo</div>
                </div>
                <div className="text-center" ref={monitoringCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {monitoringCount.count}/7
                  </div>
                  <div className="text-sm text-gray-600">Monitoramento</div>
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
                      <h4 className="font-semibold text-gray-900">Monitoramento de Pipelines</h4>
                      <p className="text-gray-600">Detecção automática de problemas em pipelines de dados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Alertas Inteligentes</h4>
                      <p className="text-gray-600">Notificações proativas sobre problemas de qualidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Análise de Impacto</h4>
                      <p className="text-gray-600">Avaliação do impacto de problemas nos dados downstream</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Debugging Avançado</h4>
                      <p className="text-gray-600">Ferramentas para investigação e correção de problemas</p>
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
              Descubra como o Databand pode revolucionar sua observabilidade de dados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Detecção de Anomalias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Identificação automática de padrões anômalos em dados e pipelines.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Visibilidade Completa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualização detalhada de todos os aspectos dos pipelines de dados.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Qualidade de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitoramento contínuo da qualidade e integridade dos dados.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Colaboração em Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ferramentas para trabalho colaborativo na resolução de problemas.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Alertas em Tempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Notificações instantâneas sobre problemas críticos nos dados.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Integração Universal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Conectores para todas as principais ferramentas de dados e ETL.
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
              Veja como o Databand está revolucionando a observabilidade de dados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={pipelinesCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {pipelinesCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Pipelines Monitorados</div>
              <div className="text-gray-600">Em produção ativa</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={accuracyCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {accuracyCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Precisão de Detecção</div>
              <div className="text-gray-600">De problemas de dados</div>
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
            Transforme sua Observabilidade de Dados
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Junte-se às empresas que já transformaram seus negócios com Databand.
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