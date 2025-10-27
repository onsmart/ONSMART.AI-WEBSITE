import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Shield, Users, Clock, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function KnowledgeCatalog() {
  const navigate = useNavigate();

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

  // Contadores animados
  const discoveryCount = useCountUp(95, 1500);
  const speedCount = useCountUp(10, 2000);
  const governanceCount = useCountUp(100, 1800);

  // Contadores para seção adicional
  const datasetsCount = useCountUp(10000, 2500);
  const enterpriseCount = useCountUp(350, 2200);
  const qualityCount = useCountUp(98, 2000);

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
                    src="https://images-onsmart.vercel.app/onsmart.ai/knowledge.png" 
                    alt="Knowledge Catalog" 
                    className="w-12 h-12 sm:w-16 sm:h-16 scale-125 object-contain"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Data Catalog</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">Knowledge Catalog</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Catálogo inteligente de dados que organiza, descobre e governa ativos de dados empresariais.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={discoveryCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {discoveryCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Melhoria na descoberta</div>
                </div>
                <div className="text-center" ref={speedCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {speedCount.count}x
                  </div>
                  <div className="text-sm text-gray-600">Mais rápido acesso</div>
                </div>
                <div className="text-center" ref={governanceCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {governanceCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Governança integrada</div>
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
                      <h4 className="font-semibold text-gray-900">Descoberta Automática</h4>
                      <p className="text-gray-600">Encontre dados automaticamente com IA avançada</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Governança de Dados</h4>
                      <p className="text-gray-600">Controle total sobre qualidade e acesso aos dados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Colaboração Inteligente</h4>
                      <p className="text-gray-600">Compartilhe conhecimento e melhore a produtividade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Qualidade de Dados</h4>
                      <p className="text-gray-600">Monitore e melhore a qualidade dos dados em tempo real</p>
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
              Descubra como o Knowledge Catalog pode revolucionar sua gestão de dados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>IA para Descoberta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Use inteligência artificial para descobrir e catalogar dados automaticamente.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Qualidade de Dados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitore e melhore a qualidade dos dados em tempo real.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Colaboração</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Trabalhe em equipe com ferramentas de colaboração integradas.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Governança Integrada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Controle total sobre acesso e qualidade dos dados.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Metadados Inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Organização automática e rica de metadados dos dados.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>API Enterprise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integração fácil com sistemas existentes via APIs robustas.
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
              Veja como o Knowledge Catalog está revolucionando a gestão de dados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={datasetsCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {datasetsCount.count.toLocaleString()}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Datasets Catalogados</div>
              <div className="text-gray-600">Automaticamente</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={enterpriseCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {enterpriseCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Empresas Ativas</div>
              <div className="text-gray-600">Usando a plataforma</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={qualityCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {qualityCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Qualidade</div>
              <div className="text-gray-600">Dos dados catalogados</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Potencialize seus dados hoje
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Junte-se às empresas que já transformaram sua gestão de dados com Knowledge Catalog.
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