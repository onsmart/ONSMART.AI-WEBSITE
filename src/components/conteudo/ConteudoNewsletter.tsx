
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ConteudoNewsletter = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Por favor, insira um email válido");
      return;
    }
    toast.success("Inscrição realizada com sucesso!");
    setEmail('');
  };

  return (
    <section className="py-16 px-4 md:px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="bg-gradient-to-r from-primary/95 to-secondary/95 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Reduzindo a opacidade das bolhas decorativas para melhorar a legibilidade */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>
          
          <div className="max-w-xl mx-auto text-center relative">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-white" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Receba conteúdo exclusivo sobre Agentes de IA</h2>
            <p className="mb-6 text-white font-medium">
              Cadastre-se na nossa newsletter para receber artigos, e-books e novidades sobre como implementar Agentes de IA na sua organização.
            </p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Seu melhor e-mail" 
                className="bg-white/30 border-white/50 placeholder:text-white/80 text-white font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <Button type="submit" className="bg-white text-primary hover:bg-white/90 font-medium">
                Inscrever-se
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConteudoNewsletter;
