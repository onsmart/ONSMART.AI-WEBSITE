import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle, Award, Star, ArrowRight, Users, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToForm } from "@/utils/scrollUtils";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('produtos');
  
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
      <section className="relative py-24 md:py-32 overflow-hidden hero-pattern-bg -mt-8">
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
        
        <div className="container mx-auto max-w-6xl px-4 md:px-6 relative z-20">
          <div className="text-center animate-fade-in max-w-4xl mx-auto">

            
            {/* Headline principal */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight drop-shadow-lg">
              {t('hero.title')}
            </h1>
            
            {/* Subheadline com social proof */}
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md">
              {t('hero.subtitle')}
            </p>


          </div>
        </div>
      </section>



      {/* Certifications Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('certifications.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('certifications.description')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-center gap-12 max-w-6xl mx-auto">
            {/* Produtos - Lado Esquerdo */}
            <div className="lg:w-1/2 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                {t('products.title')}
              </h3>
              
              {/* AI Productivity */}
              <div className="space-y-4">
                <div className="mb-4 ml-6">
                  <h4 className="text-lg font-semibold text-gray-800">{t('products.aiProductivity.title')}</h4>
                  <p className="text-sm text-gray-600">{t('products.aiProductivity.description')}</p>
                </div>
                
                {/* AI Assistants */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.aiProductivity.categories.assistants.title')}</h5>
                  
                  {/* watsonx Code Assistant™ */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                          <img 
                            src="https://images-onsmart.vercel.app/onsmart.ai/ai-code-assistant.png" 
                            alt="watsonx Code Assistant" 
                            className="w-12 h-12"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{t('products.aiProductivity.categories.assistants.items.watsonxCodeAssistant.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiProductivity.categories.assistants.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiProductivity.categories.assistants.items.watsonxCodeAssistant.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiProductivity.categories.assistants.items.watsonxCodeAssistant.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.aiProductivity.categories.assistants.items.watsonxCodeAssistant.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/watsonx-code-assistant')}
                        >
                          {t('common.viewMore', { ns: 'common' })}
                          <ArrowRight className="h-4 w-4" />
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
                          <CardTitle className="text-xl">{t('products.aiProductivity.categories.assistants.items.watsonxOrchestrate.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiProductivity.categories.assistants.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiProductivity.categories.assistants.items.watsonxOrchestrate.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiProductivity.categories.assistants.items.watsonxOrchestrate.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.aiProductivity.categories.assistants.items.watsonxOrchestrate.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/watsonx-orchestrate')}
                        >
                          {t('common.viewMore', { ns: 'common' })}
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
                          <CardTitle className="text-xl">{t('products.aiProductivity.categories.assistants.items.planningAnalytics.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiProductivity.categories.assistants.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiProductivity.categories.assistants.items.planningAnalytics.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiProductivity.categories.assistants.items.planningAnalytics.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.aiProductivity.categories.assistants.items.planningAnalytics.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/planning-analytics')}
                        >
                          {t('common.viewMore', { ns: 'common' })}
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
                  <h4 className="text-lg font-semibold text-gray-800">{t('products.aiMLOps.title')}</h4>
                  <p className="text-sm text-gray-600">{t('products.aiMLOps.description')}</p>
                </div>
                
                {/* AI Models */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.aiMLOps.categories.models.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.aiMLOps.categories.models.items.granite.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiMLOps.categories.models.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiMLOps.categories.models.items.granite.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiMLOps.categories.models.items.granite.features.title')}</h4>
                        {(t('products.aiMLOps.categories.models.items.granite.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/granite')}
                        >
                          {t('viewMore')}
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
                          <CardTitle className="text-xl">{t('products.aiMLOps.categories.models.items.metaLlama.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiMLOps.categories.models.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiMLOps.categories.models.items.metaLlama.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiMLOps.categories.models.items.metaLlama.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.aiMLOps.categories.models.items.metaLlama.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/meta-llama')}
                        >
                          {t('viewMore')}
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
                          <CardTitle className="text-xl">{t('products.aiMLOps.categories.models.items.mistral.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiMLOps.categories.models.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiMLOps.categories.models.items.mistral.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiMLOps.categories.models.items.mistral.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.aiMLOps.categories.models.items.mistral.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/mistral')}
                        >
                          {t('viewMore')}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Tools */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.aiMLOps.categories.tools.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.aiMLOps.categories.tools.items.watsonxAI.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiMLOps.categories.tools.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiMLOps.categories.tools.items.watsonxAI.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiMLOps.categories.tools.items.watsonxAI.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.aiMLOps.categories.tools.items.watsonxAI.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/watsonx-ai')}
                        >
                          {t('viewMore')}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Governance */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.aiMLOps.categories.governance.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.aiMLOps.categories.governance.items.watsonxGovernance.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.aiMLOps.categories.governance.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.aiMLOps.categories.governance.items.watsonxGovernance.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.aiMLOps.categories.governance.items.watsonxGovernance.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.aiMLOps.categories.governance.items.watsonxGovernance.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/watsonx-governance')}
                        >
                          {t('viewMore')}
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
                  <h4 className="text-lg font-semibold text-gray-800">{t('products.dataFabric.title')}</h4>
                  <p className="text-sm text-gray-600">{t('products.dataFabric.description')}</p>
                </div>
                
                {/* Databases */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.dataFabric.categories.databases.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.databases.items.watsonxData.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.databases.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.databases.items.watsonxData.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.databases.items.watsonxData.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.dataFabric.categories.databases.items.watsonxData.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/watsonx-data')}
                        >
                          {t('viewMore')}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Intelligence */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.dataFabric.categories.intelligence.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.intelligence.items.dataProductHub.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.intelligence.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.intelligence.items.dataProductHub.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.intelligence.items.dataProductHub.features.title')}</h4>
                        <ul className="space-y-1">
                          {(t('products.dataFabric.categories.intelligence.items.dataProductHub.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/data-product-hub')}
                        >
                          {t('viewMore')}
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.intelligence.items.knowledgeCatalog.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.intelligence.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.intelligence.items.knowledgeCatalog.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.intelligence.items.knowledgeCatalog.features.title')}</h4>
                        {(t('products.dataFabric.categories.intelligence.items.knowledgeCatalog.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/knowledge-catalog')}
                        >
                          {t('viewMore')}
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.intelligence.items.mantaDataLineage.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.intelligence.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.intelligence.items.mantaDataLineage.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.intelligence.items.mantaDataLineage.features.title')}</h4>
                        {(t('products.dataFabric.categories.intelligence.items.mantaDataLineage.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/manta-data-lineage')}
                        >
                          {t('viewMore')}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Integration */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.dataFabric.categories.integration.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.integration.items.datastage.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.integration.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.integration.items.datastage.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.integration.items.datastage.features.title')}</h4>
                        {(t('products.dataFabric.categories.integration.items.datastage.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/datastage')}
                        >
                          {t('viewMore')}
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.integration.items.databand.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.integration.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.integration.items.databand.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.integration.items.databand.features.title')}</h4>
                        {(t('products.dataFabric.categories.integration.items.databand.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/databand')}
                        >
                          {t('viewMore')}
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.integration.items.streamsets.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.integration.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.integration.items.streamsets.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.integration.items.streamsets.features.title')}</h4>
                        {(t('products.dataFabric.categories.integration.items.streamsets.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/streamsets')}
                        >
                          {t('viewMore')}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Security */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.dataFabric.categories.security.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.dataFabric.categories.security.items.guardium.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataFabric.categories.security.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataFabric.categories.security.items.guardium.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataFabric.categories.security.items.guardium.features.title')}</h4>
                        {(t('products.dataFabric.categories.security.items.guardium.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/guardium-data-security-center')}
                        >
                          {t('viewMore')}
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
                  <h4 className="text-lg font-semibold text-gray-800">{t('products.dataStorage.title')}</h4>
                  <p className="text-sm text-gray-600">{t('products.dataStorage.description')}</p>
                </div>
                
                {/* Software-defined Storage */}
                <div className="ml-6 space-y-3">
                  <h5 className="text-md font-medium text-gray-700">{t('products.dataStorage.categories.storage.title')}</h5>
                  
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
                          <CardTitle className="text-xl">{t('products.dataStorage.categories.storage.items.storageCeph.name')}</CardTitle>
                          <Badge variant="outline" className="mt-1">{t('products.dataStorage.categories.storage.title')}</Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {t('products.dataStorage.categories.storage.items.storageCeph.description')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('products.dataStorage.categories.storage.items.storageCeph.features.title')}</h4>
                        {(t('products.dataStorage.categories.storage.items.storageCeph.features.items', { returnObjects: true }) as string[]).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => navigate('/produtos/storage-ceph')}
                        >
                          {t('viewMore')}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Certificações - Lado Direito */}
            <div className="lg:w-1/2 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                {t('certifications.sectionTitle')}
              </h3>
              
              {/* IBM Certifications */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{t('certifications.ibmSection.title')}</h4>
                <p className="text-gray-600 text-sm mb-4">
                  {t('certifications.ibmSection.description')}
                </p>
              </div>
              
              <div className="space-y-4">
                
                <div className="grid grid-cols-1 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.watsonxOrchestrateBuild.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.watsonxOrchestrateBuild.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.watsonxAssistantSales.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.watsonxAssistantSales.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.watsonxOrchestrateSales.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.watsonxOrchestrateSales.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.watsonxAgenticAI.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.watsonxAgenticAI.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.watsonxAssistantFoundation.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.watsonxAssistantFoundation.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.watsonxOrchestrateFoundation.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.watsonxOrchestrateFoundation.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.deepLearningSpecialist.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.deepLearningSpecialist.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.generativeAI.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.generativeAI.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.machineLearningPython.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.machineLearningPython.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.aiEngineering.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.aiEngineering.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.computerVision.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.computerVision.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.deepLearningKeras.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.deepLearningKeras.description')}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 rounded-full bg-gray-50">
                          <img 
                            src="https://carbonfair-publico.s3.amazonaws.com/clientes/182/eventos/296/capa_400.png" 
                            alt="Certificações IBM" 
                            className="w-10 h-10 scale-150"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{t('certifications.items.neuralNetworks.title')}</CardTitle>
                          <CardDescription>{t('certifications.items.neuralNetworks.description')}</CardDescription>
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
      <section className="py-4 sm:py-6 md:py-8 bg-gradient-to-br from-white via-blue-50/20 to-brand-blue/5 relative overflow-hidden">
        {/* Background Pattern Clean */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8 relative z-10">
          {/* Badge Superior - Estilo Homepage */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 text-brand-blue px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-brand-blue/20">
            <Clock className="h-3 w-3" />
            {t('cta.badge')}
          </div>
          
          {/* Título - Estilo Homepage */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              {t('cta.title')}
            </span> sua empresa em{" "}
            <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              {t('cta.days')}
            </span> {t('cta.titleEnd')}
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 sm:px-2 md:px-0 mb-6">
            {t('cta.description')} <span className="font-bold text-brand-blue">{t('cta.companies')}</span> {t('cta.descriptionEnd')}{" "}
            <span className="font-bold text-brand-blue">{t('cta.methodology')}</span>
          </p>
          
          {/* Stats Cards - Estilo Homepage */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">420%</div>
              <div className="text-xs text-gray-600">{t('cta.stats.roi')}</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">{t('cta.days')}</div>
              <div className="text-xs text-gray-600">{t('cta.stats.implementation')}</div>
            </div>
            <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">350+</div>
              <div className="text-xs text-gray-600">{t('cta.stats.companies')}</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mb-6">
            <Button 
              size="lg" 
              className="bg-brand-blue hover:bg-brand-blue/90 text-brand-black font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              onClick={scrollToForm}
            >
              <span className="relative z-10 flex items-center">
                <Send className="mr-2 h-4 w-4" />
                {t('cta.button')}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue-light opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </div>
          
          {/* Benefits */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.freeSetup')}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.noCommitment')}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>{t('cta.benefits.guaranteedROI')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 