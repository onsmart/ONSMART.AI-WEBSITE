import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, HardDrive, Zap, Shield, Users, Scale, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StorageCeph() {
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
  const capacityCount = useCountUp(1, 1500);
  const availabilityCount = useCountUp(99, 2000);
  const opensourceCount = useCountUp(100, 1800);

  // Contadores para seção adicional
  const petabyteCount = useCountUp(1000, 2500);
  const enterpriseCount = useCountUp(600, 2200);
  const performanceCount = useCountUp(99, 2000);

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
                    src="https://images-onsmart.vercel.app/onsmart.ai/storage.png" 
                    alt="Storage Ceph" 
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain scale-150"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Storage</Badge>
                  <h1 className="text-4xl font-bold text-gray-900">Storage Ceph</h1>
                </div>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Plataforma de armazenamento distribuído escalável para aplicações modernas e cloud-native.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center" ref={capacityCount.ref}>
                  <div className="text-2xl font-bold text-blue-600 transition-all duration-300">
                    {capacityCount.count}EB+
                  </div>
                  <div className="text-sm text-gray-600">Capacidade</div>
                </div>
                <div className="text-center" ref={availabilityCount.ref}>
                  <div className="text-2xl font-bold text-green-600 transition-all duration-300">
                    {availabilityCount.count}.9%
                  </div>
                  <div className="text-sm text-gray-600">Disponibilidade</div>
                </div>
                <div className="text-center" ref={opensourceCount.ref}>
                  <div className="text-2xl font-bold text-purple-600 transition-all duration-300">
                    {opensourceCount.count}%
                  </div>
                  <div className="text-sm text-gray-600">Open Source</div>
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
                      <h4 className="font-semibold text-gray-900">Armazenamento Distribuído</h4>
                      <p className="text-gray-600">Sistema de armazenamento distribuído altamente escalável</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Alta Disponibilidade</h4>
                      <p className="text-gray-600">Redundância e replicação automática de dados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Escalabilidade Linear</h4>
                      <p className="text-gray-600">Crescimento linear da performance com a capacidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Compatibilidade Universal</h4>
                      <p className="text-gray-600">Suporte a múltiplos protocolos de acesso</p>
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
              Descubra como o Storage Ceph pode revolucionar seu armazenamento de dados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <HardDrive className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Armazenamento Unificado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Plataforma única para objetos, blocos e arquivos com interface unificada.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Performance Otimizada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Alta performance com latência baixa e throughput elevado.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Segurança Avançada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Criptografia em repouso e em trânsito com controle de acesso granular.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Multi-tenancy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Suporte a múltiplos inquilinos com isolamento completo.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Escalabilidade Massiva</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Capacidade de escalar de TBs a exabytes sem interrupção.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Integração Cloud</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compatibilidade nativa com APIs S3 e integração com clouds.
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
              Veja como o Storage Ceph está revolucionando o armazenamento de dados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={petabyteCount.ref}>
              <div className="text-4xl font-bold text-blue-600 mb-2 transition-all duration-300">
                {petabyteCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Petabytes</div>
              <div className="text-gray-600">Armazenados</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={enterpriseCount.ref}>
              <div className="text-4xl font-bold text-green-600 mb-2 transition-all duration-300">
                {enterpriseCount.count}+
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Empresas Ativas</div>
              <div className="text-gray-600">Usando a plataforma</div>
            </div>
            <div className="text-center bg-white rounded-xl p-8 shadow-lg" ref={performanceCount.ref}>
              <div className="text-4xl font-bold text-purple-600 mb-2 transition-all duration-300">
                {performanceCount.count}%
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Performance</div>
              <div className="text-gray-600">Consistente</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Transforme seu Armazenamento de Dados
          </h2>
          <p className="text-xl mb-8 text-gray-600">
            Junte-se às empresas que já transformaram seus negócios com Storage Ceph.
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