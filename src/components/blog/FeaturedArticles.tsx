
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, FileText } from "lucide-react";

const FeaturedArticles = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-800/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Artigos em Destaque</h2>
          <Button variant="outline" className="gap-2">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover-scale glass-card overflow-hidden border-t-4 border-t-primary">
            <CardHeader>
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 text-xs font-medium rounded">
                  Agentes de IA
                </span>
              </div>
              <CardTitle className="text-2xl">Como os Agentes de IA estão revolucionando a produtividade corporativa</CardTitle>
              <CardDescription>Descubra como empresas estão aumentando sua eficiência em 200%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-md h-60 flex items-center justify-center mb-6 relative overflow-hidden">
                <Book className="h-16 w-16 text-primary absolute z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-tr from-primary/10 via-secondary/10 to-accent/10 animate-pulse"></div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                A nova força de trabalho composta por Agentes de IA está redefinindo como as organizações operam, tomam decisões e escalam seus negócios.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-primary text-white hover:bg-primary/90 font-medium">
                Ler artigo completo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Card key={idx} className="flex flex-row hover-scale glass-card overflow-hidden">
                <div className="w-1/3 bg-gradient-to-br from-secondary/5 to-primary/5 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-secondary" />
                </div>
                <div className="w-2/3 p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                      Case de Sucesso
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Implementando Agentes de IA em escala empresarial</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    Descubra como a empresa X implementou 50 Agentes de IA e economizou 2 milhões por ano.
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
