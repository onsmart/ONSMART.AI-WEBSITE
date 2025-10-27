import React, { useState, useMemo } from 'react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import BlogHero from '@/components/blog/BlogHero';
import BlogSearchAndFilters from '@/components/blog/BlogSearchAndFilters';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogEngagementTracker from '@/components/blog/BlogEngagementTracker';
import { blogPosts, blogCategories } from '@/components/blog/data/blogData';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Filtrar artigos baseado na busca e categoria
  const filteredArticles = useMemo(() => {
    return blogPosts.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'todos' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <BlogEngagementTracker selectedCategory={selectedCategory}>
      <UnifiedSEO 
        title="Blog onsmartAI - Artigos sobre IA e Agentes Digitais"
        description="Aprenda sobre implementação de IA, Agentes Digitais e transformação empresarial com nossos artigos especializados e casos práticos."
        keywords="blog ia, artigos agentes digitais, implementação ia, metodologia líder, casos de sucesso ia"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Enhanced Hero Section */}
        <BlogHero />
        
        {/* Enhanced Search and Filters */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <BlogSearchAndFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={blogCategories}
            />
          </div>
        </section>

        {/* Enhanced Main Article Grid */}
        <section className="py-20 px-4 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-brand-blue/10 to-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-brand-blue/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <BlogGrid articles={filteredArticles} />
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <BlogNewsletter />
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-brand-blue via-blue-600 to-brand-blue relative overflow-hidden">
          {/* SVG Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Animated badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full border border-white/30 mb-6">
              <span className="text-white font-medium text-sm">Conteúdo Especializado</span>
            </div>
            
            {/* Main title with gradient */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para implementar{" "}
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                estratégias
              </span>
              ?
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Transforme conhecimento em ação com nossos serviços especializados em IA empresarial
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Agendar Consultoria Gratuita
              </button>
              <button className="border-2 border-white text-white bg-transparent px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-blue transition-colors">
                Ver Casos de Sucesso
              </button>
            </div>
          </div>
        </section>
      </div>
    </BlogEngagementTracker>
  );
};

export default Blog;