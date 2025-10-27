
import React from 'react';

const BlogHero: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-brand-black text-white">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Blog onsmartAI
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Insights, estratégias e conhecimento sobre Agentes de IA e transformação empresarial
        </p>
      </div>
    </section>
  );
};

export default BlogHero;
