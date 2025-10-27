
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";

const Glossario = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const termos = [
    {
      termo: "Agentes de IA",
      definicao: "Sistemas autônomos que podem tomar decisões e executar tarefas específicas usando inteligência artificial, sem necessidade de intervenção humana constante."
    },
    {
      termo: "Machine Learning",
      definicao: "Subcampo da IA que permite que sistemas aprendam e melhorem automaticamente através da experiência, sem serem explicitamente programados."
    },
    {
      termo: "Processamento de Linguagem Natural (NLP)",
      definicao: "Área da IA que se concentra na interação entre computadores e linguagem humana, permitindo que máquinas entendam e respondam em linguagem natural."
    },
    {
      termo: "Automação Robótica de Processos (RPA)",
      definicao: "Tecnologia que usa software para automatizar tarefas de negócios rotineiras e repetitivas, imitando ações humanas."
    },
    {
      termo: "Deep Learning",
      definicao: "Subconjunto do machine learning que usa redes neurais com múltiplas camadas para analisar dados de forma semelhante ao cérebro humano."
    },
    {
      termo: "API",
      definicao: "Interface de Programação de Aplicativos - conjunto de protocolos que permite a comunicação entre diferentes softwares e sistemas."
    },
    {
      termo: "Big Data",
      definicao: "Conjuntos de dados extremamente grandes e complexos que requerem ferramentas especializadas para processamento e análise."
    },
    {
      termo: "ROI (Return on Investment)",
      definicao: "Métrica que mede a eficiência de um investimento, calculando o retorno obtido em relação ao valor investido."
    }
  ];

  const termosFiltrados = termos.filter(item =>
    item.termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definicao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UnifiedSEO 
        title="Glossário de IA - Termos e Conceitos de Inteligência Artificial | onsmartAI"
        description="Glossário completo com termos técnicos de Inteligência Artificial, Machine Learning e automação empresarial. Definições claras para profissionais."
        keywords="glossário ia, termos inteligencia artificial, definições ia, machine learning conceitos, vocabulário ia"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-6">
                Glossário de IA
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Inteligência Artificial e tecnologias relacionadas desvendadas em definições claras e práticas
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar termos no glossário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6">
              {termosFiltrados.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-brand-blue">
                      <BookOpen className="h-5 w-5" />
                      {item.termo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {item.definicao}
                    </p>
                  </CardContent>
                </Card>
              ))}
              
              {termosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Nenhum termo encontrado para "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tem dúvidas sobre IA na sua empresa?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Agende uma consultoria gratuita com nossos especialistas
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Glossario;
