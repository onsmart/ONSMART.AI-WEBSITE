import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle, Award, Star, ArrowRight, Users, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToForm } from "@/utils/scrollUtils";

const products = {
  "ai-productivity": [
    {
      id: 1,
      name: "AI Code Assistant",
      description: "Reinvente a forma de trabalhar e feito com agentes/assistente de IA",
      icon: "🤖",
      category: "AI Assistants",
      certifications: ["ISO 27001", "SOC 2", "GDPR"],
      features: ["Code Generation", "Bug Detection", "Performance Optimization"],
    },
    {
      id: 2,
      name: "Granite™",
      description: "Advanced AI models for enterprise applications with enhanced security",
      icon: "💎",
      category: "AI Models",
      certifications: ["ISO 27001", "SOC 2", "HIPAA"],
      features: ["Natural Language Processing", "Multi-modal AI", "Enterprise Security"],
    },
    {
      id: 3,
      name: "watsonx.ai™",
      description: "Trabalhe com modelos, ferramentas e governança de IA criados para negócios",
      icon: "🧠",
      category: "AI Tools",
      certifications: ["ISO 27001", "SOC 2", "GDPR", "HIPAA"],
      features: ["Model Training", "AI Governance", "Business Intelligence"],
    },
  ],
  "data-fabric": [
    {
      id: 4,
      name: "watsonx.data™",
      description: "Reúna todos os dados de negócios e otimize como eles se movem pelos sistemas",
      icon: "📊",
      category: "Databases",
      certifications: ["ISO 27001", "SOC 2", "GDPR"],
      features: ["Data Integration", "Real-time Analytics", "Cloud Native"],
    },
    {
      id: 5,
      name: "Data Product Hub",
      description: "Centralized platform for managing and discovering data products",
      icon: "🏢",
      category: "Data Intelligence",
      certifications: ["ISO 27001", "SOC 2"],
      features: ["Data Catalog", "Metadata Management", "Data Lineage"],
    },
    {
      id: 6,
      name: "DataStage®",
      description: "Enterprise data integration and transformation platform",
      icon: "🔄",
      category: "Data Integration",
      certifications: ["ISO 27001", "SOC 2", "HIPAA"],
      features: ["ETL Processing", "Data Quality", "Parallel Processing"],
    },
  ],
  "intelligent-solutions": [
    {
      id: 7,
      name: "Logistics Management Platform",
      description: "Comprehensive solution for supply chain optimization and tracking",
      icon: "🚛",
      category: "Logistics",
      certifications: ["ISO 27001", "SOC 2"],
      features: ["Route Optimization", "Real-time Tracking", "Inventory Management"],
    },
    {
      id: 8,
      name: "Smart Drones for Warehouse",
      description: "Automated inventory management using intelligent drone technology",
      icon: "🚁",
      category: "Automation",
      certifications: ["ISO 27001", "GDPR"],
      features: ["Automated Inventory", "3D Mapping", "AI-powered Analytics"],
    },
    {
      id: 9,
      name: "Video Analytics for Smart City",
      description: "Advanced video processing for urban safety and traffic management",
      icon: "📹",
      category: "Smart City",
      certifications: ["ISO 27001", "SOC 2", "GDPR"],
      features: ["Traffic Analysis", "Incident Detection", "Crowd Management"],
    },
  ],
};

const certifications = {
  "ISO 27001": {
    name: "ISO 27001",
    description: "Information Security Management",
    icon: Shield,
    color: "bg-blue-100 text-blue-800",
  },
  "SOC 2": {
    name: "SOC 2 Type II",
    description: "Security & Availability Controls",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
  },
  GDPR: {
    name: "GDPR Compliant",
    description: "Data Protection Regulation",
    icon: Award,
    color: "bg-purple-100 text-purple-800",
  },
  HIPAA: {
    name: "HIPAA Compliant",
    description: "Healthcare Data Protection",
    icon: Star,
    color: "bg-orange-100 text-orange-800",
  },
};

export default function Produtos() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const scrollToForm = () => {
    // Tentar múltiplos seletores para encontrar o formulário
    const formSelectors = [
      'form',
      '[data-testid="contact-form"]',
      '.contact-form',
      '#contact-form'
    ];
    
    let formElement = null;
    
    for (const selector of formSelectors) {
      formElement = document.querySelector(selector);
      if (formElement) break;
    }
    
    if (formElement) {
      formElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      // Adicionar um pequeno delay para garantir que o scroll aconteça
      setTimeout(() => {
        formElement.focus();
      }, 500);
    } else if (location.pathname !== '/contato') {
      // Se não encontrar o formulário e não estiver na página de contato, navegar
      navigate('/contato');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden hero-pattern-bg -mt-8">
                {/* Background Image - direct loading for maximum speed */}
        <div 
          className="absolute inset-0 bg-cover bg-left bg-no-repeat md:bg-center"
          style={{
            backgroundImage: `url('https://images-onsmart.vercel.app/onsmart.ai/ibm-silver-partner.png')`
          }}
        />
        {/* Overlay para melhorar legibilidade */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Background elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/20 rounded-full blur-blob animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-blue-light/30 rounded-full blur-blob animate-pulse-slow"></div>
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8 relative z-20">
          <div className="text-center animate-fade-in max-w-5xl mx-auto">

            
            {/* Headline principal */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight drop-shadow-lg">
              Ecossistema IBM - Realize a promessa da IA com watsonx
            </h1>
            
            {/* Subheadline com social proof */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed drop-shadow-md">
              Faça com que sua empresa priorize a IA e acelere os resultados de negócios internamente
            </p>


          </div>
        </div>
      </section>



      {/* Certifications Section */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Certificações e <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Conformidade</span></h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Nossos produtos atendem aos mais altos padrões de segurança e conformidade da indústria, garantindo a
              proteção dos seus dados e operações.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 sm:gap-12 max-w-7xl mx-auto">
            {/* Produtos - Lado Esquerdo */}
            <div className="lg:w-1/2 space-y-6 sm:space-y-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                Nossos <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Produtos</span>
              </h3>
              
              {/* AI Productivity */}
              <div className="space-y-3 sm:space-y-4">
                <div className="mb-3 sm:mb-4 ml-3 sm:ml-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">AI Productivity</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Reinvente a forma de trabalhar com assistentes de IA.</p>
                </div>
                
                {/* AI Assistants */}
                <div className="ml-3 sm:ml-6 space-y-2 sm:space-y-3">
                  <h5 className="text-sm sm:text-md font-medium text-gray-700">AI Assistants</h5>
                  
                  {/* watsonx Code Assistant™ */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="p-2 sm:p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ai-code-assistant.png" 
                            alt="watsonx Code Assistant" 
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg sm:text-xl">watsonx Code Assistant™</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">AI Assistants</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Reinvente a forma de trabalhar com assistentes de IA para desenvolvimento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-xs sm:text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                            Geração de Código
                          </li>
                          <li className="flex items-center text-xs sm:text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                            Detecção de Bugs
                          </li>
                          <li className="flex items-center text-xs sm:text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                            Otimização de Performance
                          </li>
                        </ul>
                      </div>
                      <div className="pt-3 sm:pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent text-xs sm:text-sm"
                          onClick={() => navigate('/produtos/watsonx-code-assistant')}
                        >
                          Ver mais
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* watsonx Orchestrate™ */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/watsonx.png" 
                            alt="watsonx Orchestrate" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">watsonx Orchestrate™</CardTitle>
                          <Badge variant="outline" className="mt-1">AI Assistants</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Orquestre fluxos de trabalho de IA e automatize processos empresariais
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Automação de Fluxos
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Integração de Sistemas
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Governança de Processos
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/watsonx-orchestrate')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Planning Analytics */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                                                    <img
                            src="https://images-onsmart.vercel.app/onsmart.ai/planning analytics.png"
                            alt="Planning Analytics"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Planning Analytics</CardTitle>
                          <Badge variant="outline" className="mt-1">AI Assistants</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Plataforma de planejamento e análise empresarial integrada
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Planejamento Corporativo
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Análise Preditiva
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Colaboração em Tempo Real
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/planning-analytics')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* AI/ML Ops */}
              <div className="space-y-4">
                <div className="mb-4 ml-6">
                  <h4 className="text-lg font-semibold text-gray-800">AI/ML Ops</h4>
                  <p className="text-sm text-gray-600">Modelos, ferramentas e governança de IA para garantir confiança e escalabilidade.</p>
                </div>
                
                {/* AI Models */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">AI Models</h5>
                  
                  {/* Granite™ */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/Granite.png" 
                            alt="Granite" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Granite™</CardTitle>
                          <Badge variant="outline" className="mt-1">AI Models</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Modelos de IA avançados para aplicações empresariais com segurança aprimorada
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Processamento de Linguagem Natural
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            IA Multi-modal
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Segurança Empresarial
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/granite')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Meta Llama */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/meta.png" 
                            alt="Meta Llama" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Meta Llama</CardTitle>
                          <Badge variant="outline" className="mt-1">AI Models</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Modelos de linguagem avançados para aplicações de IA generativa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Geração de Texto Avançada
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Compreensão de Contexto
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Personalização de Modelos
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/meta-llama')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mistral */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/mistral.png" 
                            alt="Mistral" 
                            className="w-12 h-12"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Mistral</CardTitle>
                          <Badge variant="outline" className="mt-1">AI Models</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Modelos de IA de alta performance para aplicações empresariais
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Performance Otimizada
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Eficiência Computacional
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Flexibilidade de Deployment
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/mistral')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Tools */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">AI Tools</h5>
                  
                  {/* watsonx.ai™ */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/watsonx.png" 
                            alt="watsonx.ai" 
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://images-onsmart.vercel.app/onsmart.ai/watsonx.png";
                            }}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">watsonx.ai™</CardTitle>
                          <Badge variant="outline" className="mt-1">AI Tools</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Trabalhe com modelos, ferramentas e governança de IA criados para negócios
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Treinamento de Modelos
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Governança de IA
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Inteligência Empresarial
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/watsonx-ai')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Governance */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">AI Governance</h5>
                  
                  {/* watsonx.governance™ */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/watsonx.png" 
                            alt="watsonx.governance" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">watsonx.governance™</CardTitle>
                          <Badge variant="outline" className="mt-1">AI Governance</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Governança completa de IA com transparência e responsabilidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Monitoramento de Modelos
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Conformidade Regulatória
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Auditoria de IA
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/watsonx-governance')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Data Fabric */}
              <div className="space-y-4">
                <div className="mb-4 ml-6">
                  <h4 className="text-lg font-semibold text-gray-800">Data Fabric</h4>
                  <p className="text-sm text-gray-600">Integração e otimização dos dados corporativos para IA e análises.</p>
                </div>
                
                {/* Databases */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">Databases</h5>
                  
                  {/* watsonx.data™ */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/watsonx.png" 
                            alt="watsonx.data" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">watsonx.data™</CardTitle>
                          <Badge variant="outline" className="mt-1">Databases</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Reúna todos os dados de negócios e otimize como eles se movem pelos sistemas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Integração de Dados
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Analytics em Tempo Real
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Cloud Nativo
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/watsonx-data')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Intelligence */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">Data Intelligence</h5>
                  
                  {/* Data Product Hub */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/data-product-hub.png" 
                            alt="Data Product Hub" 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Data Product Hub</CardTitle>
                          <Badge variant="outline" className="mt-1">Data Intelligence</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Plataforma centralizada para gerenciar e descobrir produtos de dados
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Catálogo de Dados
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Gerenciamento de Metadados
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Linhagem de Dados
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/data-product-hub')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Knowledge Catalog */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                                                    <img
                            src="https://images-onsmart.vercel.app/onsmart.ai/knowledge.png"
                            alt="Knowledge Catalog"
                            className="w-12 h-12 scale-125"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Knowledge Catalog</CardTitle>
                          <Badge variant="outline" className="mt-1">Data Intelligence</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Catálogo inteligente de dados com governança e descoberta
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Descoberta de Dados
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Governança de Metadados
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Colaboração de Dados
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/knowledge-catalog')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manta Data Lineage */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/manta.png" 
                            alt="Manta Data Lineage" 
                            className="w-12 h-12 rounded-full object-cover scale-150"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Manta Data Lineage</CardTitle>
                          <Badge variant="outline" className="mt-1">Data Intelligence</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Rastreamento automático de linhagem de dados em toda a organização
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Rastreamento Automático
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Visualização de Fluxo
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Impacto de Mudanças
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/manta-data-lineage')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Integration */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">Data Integration</h5>
                  
                  {/* DataStage® */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/DataStage.png" 
                            alt="DataStage" 
                            className="w-12 h-12"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">DataStage®</CardTitle>
                          <Badge variant="outline" className="mt-1">Data Integration</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Plataforma empresarial de integração e transformação de dados
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Processamento ETL
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Qualidade de Dados
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Processamento Paralelo
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/datastage')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Databand® */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/databand.png" 
                            alt="Databand" 
                            className="w-12 h-12 rounded-full object-contain scale-125"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Databand®</CardTitle>
                          <Badge variant="outline" className="mt-1">Data Integration</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Observabilidade completa de dados para pipelines e workflows
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Monitoramento de Pipelines
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Detecção de Anomalias
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Alertas Inteligentes
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/databand')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Streamsets */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/Streamsets.png" 
                            alt="Streamsets" 
                            className="w-12 h-12 rounded-full object-cover scale-150"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Streamsets</CardTitle>
                          <Badge variant="outline" className="mt-1">Data Integration</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Plataforma de integração de dados em tempo real e streaming
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Streaming de Dados
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Transformação em Tempo Real
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Monitoramento de Performance
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/streamsets')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Security */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">Data Security</h5>
                  
                  {/* Guardium® Data Security Center */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/guardium.png" 
                            alt="Guardium Data Security Center" 
                            className="w-12 h-12 rounded-full object-cover scale-150"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Guardium® Data Security Center</CardTitle>
                          <Badge variant="outline" className="mt-1">Data Security</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Centro de segurança de dados com proteção avançada e conformidade
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Proteção de Dados Sensíveis
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Monitoramento de Acesso
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Conformidade Regulatória
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/guardium-data-security-center')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Data Storage */}
              <div className="space-y-4">
                <div className="mb-4 ml-6">
                  <h4 className="text-lg font-semibold text-gray-800">Data Storage</h4>
                  <p className="text-sm text-gray-600">Armazenamento em borda, núcleo e nuvem.</p>
                </div>
                
                {/* Software-defined Storage */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">Software-defined Storage</h5>
                  
                  {/* Storage Ceph® */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/storage.png" 
                            alt="Storage Ceph" 
                            className="w-12 h-12 rounded-full object-cover scale-150"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Storage Ceph®</CardTitle>
                          <Badge variant="outline" className="mt-1">Storage Solution</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        Plataforma de armazenamento distribuído e escalável para dados empresariais
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Principais Recursos</h4>
                        <ul className="space-y-1">
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Armazenamento Distribuído
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Alta Disponibilidade
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            Escalabilidade Horizontal
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue hover:bg-gradient-to-r hover:from-brand-blue hover:via-blue-600 hover:to-brand-blue hover:text-white hover:border-transparent"
                          onClick={() => navigate('/produtos/storage-ceph')}
                        >
                          Ver mais
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Certificações - Lado Direito */}
            <div className="lg:w-1/2 space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Certificações</span>
              </h3>
              
              {/* IBM Certifications */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">IBM Professional Certifications</h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  Credenciais oficiais IBM que validam expertise em tecnologias de IA empresarial e capacitação técnica avançada
                </p>
              </div>
              
              <div className="space-y-4">
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3 sm:pb-4">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="p-2 sm:p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-8 h-8 sm:w-10 sm:h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-sm sm:text-lg">IBM watsonx Orchestrate Build an AI Assistant</CardTitle>
                          <CardDescription className="text-xs sm:text-sm">Certificação oficial para construção de assistentes de IA com watsonx</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">watsonx Assistant Technical Sales Intermediate</CardTitle>
                          <CardDescription>Certificação intermediária em vendas técnicas de assistentes watsonx</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">watsonx Orchestrate Technical Sales Intermediate</CardTitle>
                          <CardDescription>Certificação intermediária em vendas técnicas de orquestração watsonx</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">watsonx Agentic AI Bootcamp - Level 2</CardTitle>
                          <CardDescription>Bootcamp avançado de IA agentiva com watsonx</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">watsonx Assistant Sales Foundation</CardTitle>
                          <CardDescription>Certificação de fundação em vendas de assistentes watsonx</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">watsonx Orchestrate Sales Foundation</CardTitle>
                          <CardDescription>Certificação de fundação em vendas de orquestração watsonx</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Advanced Deep Learning Specialist</CardTitle>
                          <CardDescription>Especialização avançada em deep learning com foco em redes neurais complexas e arquiteturas modernas</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Generative AI and LLMs: Arquitecture and Data Preparation</CardTitle>
                          <CardDescription>Certificação em arquitetura de IA generativa e preparação de dados para modelos de linguagem grandes</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Machine Learning with Python</CardTitle>
                          <CardDescription>Certificação em machine learning utilizando Python para desenvolvimento de modelos preditivos</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">IBM AI Engineering Professional Certificate (V2)</CardTitle>
                          <CardDescription>Certificação profissional em engenharia de IA da IBM, versão atualizada com as melhores práticas</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Computer Vision and Image Processing Essentials</CardTitle>
                          <CardDescription>Fundamentos de visão computacional e processamento de imagens para aplicações de IA</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Deep Learning Essentials with Keras</CardTitle>
                          <CardDescription>Essenciais de deep learning utilizando o framework Keras para desenvolvimento de redes neurais</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ibm-logo.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">Introduction to Neural Networks with PyTorch</CardTitle>
                          <CardDescription>Introdução às redes neurais utilizando o framework PyTorch para desenvolvimento de modelos de IA</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Estilo Homepage */}
      <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
        {/* Background Pattern Clean */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 md:px-8 relative z-10">
          {/* Badge Superior - Estilo Homepage */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-brand-blue/20">
            <Clock className="h-3 w-3" />
            Implementação Rápida
          </div>
          
          {/* Título - Estilo Homepage */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white leading-tight">
            <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              Transforme
            </span> sua empresa em{" "}
            <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              30 dias
            </span> com IA
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0 mb-4 sm:mb-6">
            Junte-se às <span className="font-bold text-brand-blue">350+ empresas</span> que já multiplicaram seus resultados com nossa{" "}
            <span className="font-bold text-brand-blue">metodologia LÍDER</span>
          </p>
          
          {/* Stats Cards - Estilo Homepage */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto mb-4 sm:mb-6">
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-sm sm:text-lg font-bold text-gray-900">420%</div>
              <div className="text-xs text-gray-600">ROI Médio</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-sm sm:text-lg font-bold text-gray-900">30 dias</div>
              <div className="text-xs text-gray-600">Implementação</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-sm sm:text-lg font-bold text-gray-900">350+</div>
              <div className="text-xs text-gray-600">Empresas</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mb-4 sm:mb-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-brand-blue/90 hover:via-blue-600/90 hover:to-brand-blue/90 text-white font-medium px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              onClick={scrollToForm}
            >
              <span className="relative z-10 flex items-center">
                <Send className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Garantir Minha Vaga Agora
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue-light opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </div>
          
          {/* Benefits */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center text-xs sm:text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2" />
              <span>Setup gratuito</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2" />
              <span>Sem compromisso inicial</span>
            </div>
            <div className="flex items-center justify-center">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2" />
              <span>ROI garantido em 90 dias</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 