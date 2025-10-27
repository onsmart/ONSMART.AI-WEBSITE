
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Download, CheckCircle } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';

const IABasico = () => {
  return (
    <>
      <UnifiedSEO 
        title="IA Básico - Curso Introdutório de Inteligência Artificial | onsmartAI University"
        description="Aprenda os fundamentos da Inteligência Artificial com nosso curso IA Básico. Conceitos essenciais para iniciantes em IA empresarial."
        keywords="curso ia basico, inteligencia artificial iniciantes, fundamentos ia, aprender ia, curso gratuito ia"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Enhanced Hero Section */}
        <section className="py-20 px-4 md:px-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-brand-blue/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue/10 to-blue-600/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              onsmartAI University
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">
              IA Básico
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Aprenda os fundamentos da Inteligência Artificial e como ela pode transformar sua empresa
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:from-brand-blue/90 hover:via-blue-600/90 hover:to-brand-blue/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Começar Curso
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                <Download className="mr-2 h-5 w-5" />
                Material PDF
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Conteúdo do Curso */}
        <section className="py-20 px-4 md:px-6 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-blue-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-600/5 to-brand-blue/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-4xl font-bold mb-10">Módulos do <span className="bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue bg-clip-text text-transparent">Curso</span></h2>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                        <CardTitle>O que é Inteligência Artificial?</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Conceitos fundamentais, história e aplicações práticas da IA no mundo empresarial.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Definições e conceitos básicos
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          História da IA
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Tipos de IA (Narrow, General, Super)
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <CardTitle>Machine Learning Essencial</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Entenda como as máquinas aprendem e tomam decisões automatizadas.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Tipos de aprendizado (supervisionado, não supervisionado)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Algoritmos básicos
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Exemplos práticos empresariais
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                        <CardTitle>IA na Prática Empresarial</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Como implementar IA na sua empresa de forma prática e eficiente.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Casos de uso por setor
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          ROI e métricas de sucesso
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Primeiros passos para implementação
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Curso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                      <p className="font-semibold">2 horas</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Nível</p>
                      <p className="font-semibold">Iniciante</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Formato</p>
                      <p className="font-semibold">Vídeo + Material</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Certificado</p>
                      <p className="font-semibold">Sim</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>O que você aprenderá</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Conceitos fundamentais de IA
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Como a IA pode ajudar sua empresa
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Identificar oportunidades de automação
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        Calcular ROI de projetos de IA
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IABasico;
