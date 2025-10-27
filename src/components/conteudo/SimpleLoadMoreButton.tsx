
import React from 'react';
import { Button } from "@/components/ui/button";

const SimpleLoadMoreButton: React.FC = () => {
  const handleLoadMore = () => {
    console.log("Loading more content...");
  };

  return (
    <div className="mt-12 flex justify-center">
      <Button 
        variant="outline" 
        className="border-primary text-primary hover:bg-primary/10 min-w-[200px]"
        onClick={handleLoadMore}
      >
        Carregar mais conteúdos
      </Button>
    </div>
  );
};

export default SimpleLoadMoreButton;
