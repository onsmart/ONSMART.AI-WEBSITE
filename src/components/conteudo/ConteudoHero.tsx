
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ConteudoHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesquisa iniciada",
      description: `Buscando por: ${searchQuery}`,
    });
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden animate-fade-in">
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="inline-block text-sm font-semibold mb-6 py-1 px-3 rounded-full bg-primary/10 text-primary">
              Recursos Educacionais
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
              Conteúdos Exclusivos
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto md:mx-0 mb-10">
              Acesse materiais exclusivos para implementar os <span className="font-bold text-primary">Agentes de IA</span> na sua organização
            </p>
            <form onSubmit={handleSearch} className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Buscar conteúdo..." 
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" variant="default" className="bg-brand-black hover:bg-brand-black/90 text-white font-medium">
                Buscar
              </Button>
            </form>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center overflow-hidden">
              <BookOpen className="h-24 w-24 text-primary/70" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl"></div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConteudoHero;
