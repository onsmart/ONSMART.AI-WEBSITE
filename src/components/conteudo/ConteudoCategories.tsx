
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { 
  FileText, 
  Book, 
  Video, 
  GalleryHorizontal, 
  Image, 
  BookOpen,
  FileSpreadsheet,
  CheckSquare,
  Calculator,
  Map
} from "lucide-react";

interface ConteudoCategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ConteudoCategories: React.FC<ConteudoCategoriesProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    toast.info(`Categoria selecionada: ${category}`);
  };

  const categories = [
    { id: 'artigos', label: 'Artigos & Guias', icon: FileText },
    { id: 'videos', label: 'Vídeos', icon: Video },
    { id: 'ebooks', label: 'E-books', icon: Book },
    { id: 'webinars', label: 'Webinars', icon: GalleryHorizontal },
    { id: 'infograficos', label: 'Infográficos', icon: Image },
    { id: 'casos', label: 'Cases de Sucesso', icon: BookOpen },
    { id: 'templates', label: 'Templates', icon: FileSpreadsheet },
    { id: 'checklists', label: 'Checklists', icon: CheckSquare },
    { id: 'calculadoras', label: 'Calculadoras', icon: Calculator },
    { id: 'guias', label: 'Guias Práticos', icon: Map }
  ];

  return (
    <section className="py-8 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <Button 
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"} 
                className={selectedCategory === category.id 
                  ? "bg-primary text-white" 
                  : "bg-white dark:bg-gray-800 hover:bg-primary/10"}
                onClick={() => handleCategoryClick(category.id)}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConteudoCategories;
