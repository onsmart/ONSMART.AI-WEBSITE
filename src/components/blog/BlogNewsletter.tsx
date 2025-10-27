
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BlogNewsletter: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-brand-black text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Não Perca Nenhum Insight
        </h2>
        <p className="text-xl mb-8 text-gray-200">
          Receba nossos artigos mais recentes direto no seu email
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Seu melhor email"
            className="bg-white text-gray-900 border-white placeholder:text-gray-500"
          />
          <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold">
            Inscrever-se
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;
