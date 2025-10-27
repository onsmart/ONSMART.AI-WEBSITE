import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Star, Shield, Users, Clock, Send, Bot, Brain, Zap, Target, MessageCircle, Mic, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { openSoniaChat } from "@/hooks/useSoniaChat";

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

export default function SoniaAssistenteIA() {
  const navigate = useNavigate();
  
  // Contadores animados
  const empresasCount = useCountUp(500, 2500);
  const sucessoCount = useCountUp(98, 1800);
  const implementacaoCount = useCountUp(30, 2000);
  const conversaoCount = useCountUp(300, 1500);
  const satisfacaoCount = useCountUp(95, 2200);
  const eficienciaCount = useCountUp(500, 1800);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-emerald-50">
                  <img 
                    src="/images/sonia.png" 
                    alt="Sonia Assistente IA" 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">AI Omnichannel Pioneer</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">Sonia Assistente IA</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                A primeira assistente de IA omnichannel do Brasil, pioneira em prospecção por voz. Com tecnologia bi-direcional, multilingua e simultaneidade, melhora a cada interação para revolucionar seus processos de vendas e atendimento.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={empresasCount.ref}>
                  <div className="text-2xl font-bold text-emerald-600 transition-all duration-300">
                    {empresasCount.count}+
                  </div>
                  <div className="text-sm text-gray-600">Empresas Atendidas</div>
                </div>
                <div className="text-center" ref={sucessoCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {sucessoCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Taxa de Sucesso</div>
                </div>
                <div className="text-center" ref={implementacaoCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {implementacaoCount.count}
                  </div>
                  <div className="text-sm text-gray-600">Dias de Implementação</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => openSoniaChat()}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com a Sonia
              </Button>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Principais Recursos</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Comunicação Bi-direcional</h4>
                      <p className="text-gray-600">Tecnologia que permite conversas naturais em ambas as direções</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Multilingua</h4>
                      <p className="text-gray-600">Suporte a 15+ idiomas com 98% precisão nativa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Simultaneidade</h4>
                      <p className="text-gray-600">Atende até 1000 clientes simultaneamente sem perder qualidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Aprendizado Contínuo</h4>
                      <p className="text-gray-600">Melhora a cada interação, ficando mais inteligente</p>
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
              Descubra como a Sonia pode revolucionar sua experiência com Agentes de IA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Prospecção por Voz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tecnologia pioneira em prospecção automatizada por voz com +300% conversão.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Atendimento Omnichannel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Primeira assistente omnichannel do Brasil com +95% satisfação.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Comunicação Bi-direcional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tecnologia que permite conversas naturais em ambas as direções com 70% mais eficiência.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Aprendizado Contínuo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Melhora a cada interação com 95% precisão e insights únicos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Automação de Processos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  RPA inteligente com +500% eficiência e -60% custos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Multilingua & Simultaneidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Suporte a 15+ idiomas com atendimento simultâneo de até 1000 clientes e 98% precisão.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Números Impressionantes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja como a Sonia está transformando empresas brasileiras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={conversaoCount.ref}>
              <div className="text-4xl font-bold text-emerald-600 mb-2 transition-all duration-300">
                {conversaoCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Aumento na Conversão</div>
              <div className="text-gray-600">Com automação de vendas</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={satisfacaoCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {satisfacaoCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Satisfação do Cliente</div>
              <div className="text-gray-600">Com atendimento inteligente</div>
            </div>

            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={eficienciaCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {eficienciaCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Aumento na Eficiência</div>
              <div className="text-gray-600">Com automação de processos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Diferenciais da Sonia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Por que escolher a Sonia como sua assistente de IA?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Pioneiros no Brasil</h3>
                  <p className="text-gray-600">Primeira empresa brasileira em IA omnichannel e prospecção por voz</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mic className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prospecção por Voz</h3>
                  <p className="text-gray-600">Tecnologia pioneira em prospecção automatizada por voz</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Omnichannel Completo</h3>
                  <p className="text-gray-600">Primeira assistente omnichannel do Brasil</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comunicação Bi-direcional</h3>
                  <p className="text-gray-600">Conversas naturais em ambas as direções</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mic className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multilingua</h3>
                  <p className="text-gray-600">Suporte a 15+ idiomas com 98% precisão nativa</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Simultaneidade & Aprendizado</h3>
                  <p className="text-gray-600">Atende até 1000 clientes simultaneamente e melhora a cada interação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Seja pioneiro com a Sonia
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Junte-se às empresas que já revolucionaram seus negócios com a primeira assistente omnichannel do Brasil.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => openSoniaChat()}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com a Sonia
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              className="font-medium px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate('/agentes-ia')}
            >
              Ver Outros Produtos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
