
import React from 'react';
import { MobileButton } from "@/components/ui/mobile-optimized";
import { toast } from "@/components/ui/sonner";

const LoadMoreButton: React.FC = () => {
  const handleLoadMore = () => {
    toast.info("Carregando mais conteúdos...");
    
    // Simular carregamento com delay
    setTimeout(() => {
      toast.success("Novos conteúdos carregados!");
    }, 1500);
  };

  return (
    <div className="mt-12 flex justify-center">
      <MobileButton 
        variant="outline" 
        className="border-primary text-primary hover:bg-primary/10 min-w-[200px]"
        onClick={handleLoadMore}
        touchOptimized={true}
      >
        Carregar mais conteúdos
      </MobileButton>
    </div>
  );
};

export default LoadMoreButton;
