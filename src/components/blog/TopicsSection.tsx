
import React from 'react';
import { Book, BookOpen, GalleryHorizontal } from "lucide-react";

const TopicsSection = () => {
  return (
    <section className="py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Tópicos sobre Agentes de IA</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-40 flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent animate-pulse"></div>
              <Book className="h-16 w-16 text-white absolute z-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fundamentos</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Entenda os conceitos básicos por trás dos Agentes de IA e como eles diferem de outras tecnologias.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-40 flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-secondary via-accent to-primary animate-pulse"></div>
              <BookOpen className="h-16 w-16 text-white absolute z-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Implementação</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Guias práticos para implementar Agentes de IA na sua organização e obter resultados reais.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-40 flex items-center justify-center mb-6 relative overflow-hidden">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-accent via-primary to-secondary animate-pulse"></div>
              <GalleryHorizontal className="h-16 w-16 text-white absolute z-10" />
            </div>
            <h3 className="text-xl font-bold mb-3">Futuro</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tendências e previsões sobre como os Agentes de IA vão moldar o futuro do trabalho.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
