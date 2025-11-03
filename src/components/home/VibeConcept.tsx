
import React from "react";
import { Network, Layers, Zap, Building2, Users } from "lucide-react";

const VibeConcept = () => {
  return (
    <section id="vibe-concept" className="py-20 px-4 md:px-6 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block text-sm font-semibold mb-3 py-1 px-3 rounded-full bg-primary/10 text-primary">
            Abordagem Revolucionária
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-600 dark:text-red-400">Conceito VIBE ENTERPRISE</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Uma abordagem revolucionária criada pela onsmartAI para transformar fundamentalmente as organizações através da integração 
            holística de Agentes de Inteligência Artificial como uma nova classe de força de trabalho digital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                O VIBE Enterprise transcende a visão convencional da IA como mera ferramenta de automação, 
                posicionando-a como um componente estratégico que opera transversalmente em todos os 
                departamentos e níveis hierárquicos da organização.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Este conceito estabelece um ecossistema inteligente onde agentes autônomos colaboram com 
                humanos e entre si, criando uma sinergia que potencializa a eficiência operacional, a tomada
                de decisões e a capacidade de inovação da empresa.
              </p>
              
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <h3 className="text-xl font-bold mb-3 text-primary dark:text-blue-400">Objetivo Principal</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Criar uma infraestrutura cognitiva distribuída que permeia toda a empresa, conectando 
                  silos de informação, otimizando processos e ampliando as capacidades humanas através de uma 
                  colaboração homem-máquina verdadeiramente integrada.
                </p>
              </div>
              
              <div className="flex items-center gap-3 bg-accent/5 p-4 rounded-lg">
                <div className="flex-shrink-0">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "Mais de 70% das empresas que implementaram soluções de IA reportam aumentos significativos
                  em eficiência operacional." — Ricardo Palomar, CEO da onsmartAI
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-200 dark:border-red-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <Network className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ecossistema Inteligente</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Agentes autônomos que colaboram com humanos e entre si.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <Layers className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Abordagem Holística</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Opera transversalmente em todos os níveis organizacionais.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Potencialização</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Eficiência operacional, decisões e capacidade de inovação.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <Building2 className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Infraestrutura Cognitiva</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Conecta silos e otimiza processos em toda a organização.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VibeConcept;
