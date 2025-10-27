
import React, { useState } from 'react';
import { BookOpen, Users, Activity, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

const EbookForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    email: '',
    whatsapp: '',
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleEbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.comment.trim().toUpperCase() !== 'VIBE ENTERPRISE') {
      toast.error("Por favor, digite 'VIBE ENTERPRISE' para receber o ebook gratuito.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast.error("Por favor, informe um email válido.");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Por favor, informe seu nome.");
      return;
    }

    if (!formData.company.trim()) {
      toast.error("Por favor, informe sua empresa.");
      return;
    }

    if (!formData.position.trim()) {
      toast.error("Por favor, informe seu cargo.");
      return;
    }

    if (!formData.whatsapp.trim()) {
      toast.error("Por favor, informe seu WhatsApp.");
      return;
    }

    setSubmitted(true);
    toast.success("Sucesso! Seu ebook está a caminho!", {
      description: "Verifique seu email nas próximas horas.",
    });

    // Resetar os campos após o envio bem-sucedido
    setFormData({
      name: '',
      company: '',
      position: '',
      email: '',
      whatsapp: '',
      comment: ''
    });
  };

  return (
    <section className="py-24 px-4 md:px-6 bg-blue-50 dark:bg-blue-900/20">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-8 overflow-hidden rounded-2xl shadow-xl">
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-primary/10 p-2">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary">OFERTA ESPECIAL!</h2>
            </div>
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                E-book GRATUITO "O Guia do Trabalho com Agentes de IA"
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Um manual prático para implementar estas estratégias na sua organização!
              </p>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 text-green-500 bg-green-50 p-0.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>Estratégias práticas de implementação</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 text-green-500 bg-green-50 p-0.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>Casos de uso reais e exemplos</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 text-green-500 bg-green-50 p-0.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>Técnicas avançadas de engenharia de prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 text-green-500 bg-green-50 p-0.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <span>Frameworks para medir o ROI da IA</span>
                </li>
              </ul>
            </div>

            {!submitted ? (
              <form onSubmit={handleEbookSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Seu nome completo:</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nome completo" 
                      className="w-full rounded-lg border-gray-300" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">Sua empresa:</Label>
                    <Input 
                      id="company" 
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nome da empresa" 
                      className="w-full rounded-lg border-gray-300" 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium">Seu cargo:</Label>
                    <Input 
                      id="position" 
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="Cargo atual" 
                      className="w-full rounded-lg border-gray-300" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Seu email corporativo:</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com" 
                      className="w-full rounded-lg border-gray-300" 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-sm font-medium">Seu WhatsApp:</Label>
                    <Input 
                      id="whatsapp" 
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000" 
                      className="w-full rounded-lg border-gray-300" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="comment" className="text-sm font-medium">Digite "VIBE ENTERPRISE" para receber:</Label>
                    <Input 
                      id="comment" 
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="VIBE ENTERPRISE" 
                      className="w-full rounded-lg border-gray-300" 
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg transition-colors">
                  Quero receber o e-book!
                </Button>
              </form>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-green-100 mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Obrigado!</h4>
                <p className="text-green-800 dark:text-green-200">
                  Seu e-book foi enviado para o seu email.
                </p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 bg-blue-600 p-8 md:p-12 text-white">
            <h3 className="text-2xl font-bold mb-8 text-white">O que você vai aprender:</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Força de Trabalho Aumentada</h4>
                  <p className="text-white/90">Como transformar Agentes de IA em uma força de trabalho efetiva em sua organização</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Modelo LÍDER</h4>
                  <p className="text-white/90">Implementação do framework exclusivo LÍDER com Agentes de IA na sua empresa</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Democratização do Acesso</h4>
                  <p className="text-white/90">Como democratizar o acesso aos Agentes de IA em todos os níveis da organização</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Métricas de Sucesso</h4>
                  <p className="text-white/90">Indicadores e métricas para acompanhar os resultados da implementação dos Agentes de IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookForm;
