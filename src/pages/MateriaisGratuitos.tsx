import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, Users } from "lucide-react";
import UnifiedSEO from "@/components/shared/UnifiedSEO";

const MateriaisGratuitos = () => {
  const materiais = [
    {
      title: "Guia Completo de IA para Empresas",
      description: "Um guia abrangente sobre como implementar Inteligência Artificial na sua empresa",
      icon: Book,
      downloadUrl: "#",
      pages: "45 páginas"
    },
    {
      title: "Checklist de Implementação de Agentes",
      description: "Lista completa de verificação para implementar agentes de IA com sucesso",
      icon: FileText,
      downloadUrl: "#",
      pages: "12 páginas"
    },
    {
      title: "Template de ROI para IA",
      description: "Planilha para calcular o retorno sobre investimento em projetos de IA",
      icon: FileText,
      downloadUrl: "#",
      pages: "Template Excel"
    },
    {
      title: "Metodologia LÍDER",
      description: "E-book completo sobre nossa metodologia proprietária de implementação",
      icon: Book,
      downloadUrl: "#",
      pages: "67 páginas"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <UnifiedSEO 
        title="Materiais Gratuitos de IA - E-books e Guias | onsmartAI"
        description="Baixe gratuitamente nossos e-books, guias e templates sobre Inteligência Artificial empresarial. Conteúdo especializado para acelerar sua jornada com IA."
        keywords="materiais gratuitos ia, e-books ia, guias inteligencia artificial, templates ia, metodologia líder"
      />
      
      {/* Enhanced Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-brand-blue/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-blue/10 to-blue-600/10 rounded-full border border-brand-blue/20 mb-6">
            <span className="text-brand-blue font-medium text-sm">Recursos Gratuitos</span>
          </div>
          
          {/* Main title with gradient */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Materiais{" "}
            <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              Gratuitos
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Baixe gratuitamente nossos e-books, guias e templates especializados em Inteligência Artificial empresarial
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white px-8 py-3"
            >
              <Download className="mr-2 h-5 w-5" />
              Baixar Todos os Materiais
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent px-8 py-3"
            >
              Ver Casos de Sucesso
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Materials Grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Conteúdo Especializado
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Materiais desenvolvidos por especialistas em IA para acelerar sua jornada de transformação digital
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {materiais.map((material, index) => {
              const IconComponent = material.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-brand-blue" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                          {material.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{material.pages}</p>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {material.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Baixar Agora
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 relative overflow-hidden">
        {/* SVG Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Animated badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-blue/20 to-blue-600/20 rounded-full border border-brand-blue/30 mb-6">
            <span className="text-brand-blue font-medium text-sm">Conteúdo Exclusivo</span>
          </div>
          
          {/* Main title with gradient */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para{" "}
            <span className="bg-gradient-to-r from-brand-blue via-blue-400 to-brand-blue bg-clip-text text-transparent">
              exclusivo
            </span>
            ?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Acesse materiais exclusivos e acelere sua jornada de transformação digital com IA
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-blue-600 hover:via-brand-blue hover:to-blue-600 text-white px-8 py-3"
            >
              <Users className="mr-2 h-5 w-5" />
              Agendar Diagnóstico
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 px-8 py-3"
            >
              Ver Todos os Materiais
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MateriaisGratuitos;