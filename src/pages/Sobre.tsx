import React from 'react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { Users, Target, Award, TrendingUp, Heart, Lightbulb, Shield, Rocket } from 'lucide-react';

const Sobre = () => {
  return (
    <>
      <UnifiedSEO 
        pageType="page"
        pageData={{
          title: "Sobre a onsmart AI - Nossa História e Missão",
          description: "Conheça a onsmart AI: especialistas em Inteligência Artificial empresarial com foco em resultados reais e transformação digital sustentável."
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-blue rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          </div>

          <div className="container mx-auto max-w-4xl px-4 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                <Users className="h-4 w-4 text-brand-blue" />
                <span className="text-sm font-semibold text-brand-blue">Nossa História</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Transformando o Futuro com{' '}
                <span className="text-brand-blue">Inteligência Artificial</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Somos especialistas em Inteligência Artificial empresarial, dedicados a democratizar o acesso à IA 
                e transformar negócios através de soluções inovadoras e resultados mensuráveis.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                        <Target className="h-6 w-6 text-brand-blue" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nossa Missão</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Democratizar o acesso à Inteligência Artificial, tornando-a acessível, prática e eficiente 
                      para empresas de todos os tamanhos. Acreditamos que toda organização deve ter a oportunidade 
                      de se beneficiar do poder transformador da IA.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-brand-blue" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nossa Visão</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Ser a empresa líder em soluções de IA empresarial, reconhecida pela excelência em 
                      implementação, resultados comprovados e impacto positivo na transformação digital 
                      das organizações brasileiras.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-blue/5 p-8 rounded-2xl border border-brand-blue/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Nossos Valores</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Excelência</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Comprometimento com a qualidade em cada projeto</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Transparência</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Comunicação clara e honesta em todas as relações</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Inovação</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Sempre na vanguarda da tecnologia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Resultados</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Foco em impacto real e mensurável</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nossos <span className="text-brand-blue">Resultados</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Números que comprovam nosso compromisso com a excelência e transformação empresarial
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-brand-blue/20">
                <div className="text-3xl font-bold text-brand-blue mb-2">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Empresas Transformadas</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-brand-blue/20">
                <div className="text-3xl font-bold text-brand-blue mb-2">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Sucesso</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-brand-blue/20">
                <div className="text-3xl font-bold text-brand-blue mb-2">420%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Aumento Médio de Produtividade</div>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-brand-blue/20">
                <div className="text-3xl font-bold text-brand-blue mb-2">21</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Dias para Implementação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nossa <span className="text-brand-blue">Equipe</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Especialistas apaixonados por tecnologia e comprometidos com o sucesso dos nossos clientes
              </p>
            </div>

            <div className="bg-brand-blue/5 p-8 rounded-2xl border border-brand-blue/20 text-center">
              <Award className="h-16 w-16 text-brand-blue mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Expertise Multidisciplinar
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Nossa equipe é formada por especialistas em Inteligência Artificial, Ciência de Dados, 
                Engenharia de Software e Estratégia Empresarial. Combinamos conhecimento técnico avançado 
                com profunda compreensão dos desafios empresariais, garantindo soluções que realmente 
                fazem a diferença no seu negócio.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Descubra como a onsmart AI pode revolucionar sua empresa com soluções de IA personalizadas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/contato'}
                className="bg-white text-brand-blue hover:bg-gray-100 font-bold px-8 py-3 rounded-lg transition-all duration-300"
              >
                Fale Conosco
              </button>
              <button 
                onClick={() => window.location.href = '/diagnostico'}
                className="border-2 border-white hover:bg-white hover:text-brand-blue font-bold px-8 py-3 rounded-lg transition-all duration-300"
              >
                Diagnóstico Gratuito
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Sobre;
