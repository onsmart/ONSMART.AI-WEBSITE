import React, { useState } from 'react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import BlogHero from '@/components/blog/BlogHero';
import BlogSearchAndFilters from '@/components/blog/BlogSearchAndFilters';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogEngagementTracker from '@/components/blog/BlogEngagementTracker';
import MarketingBlogFeed from '@/components/blog/MarketingBlogFeed';
import EbooksFeed from '@/components/blog/EbooksFeed';
import { blogCategories } from '@/components/blog/data/blogData';
import { useTranslation } from 'react-i18next';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const { t } = useTranslation(['blog', 'common']);

  // Renderizar conteúdo baseado na categoria selecionada
  const renderContent = () => {
    if (selectedCategory === 'ebooks') {
      return <EbooksFeed />;
    } else if (selectedCategory === 'artigos') {
      return <MarketingBlogFeed />;
    } else {
      // 'todos' - mostrar artigos (marketing) + e-books
      return (
        <>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-blue-600 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Artigos</h2>
            </div>
            <MarketingBlogFeed />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">E-books</h2>
            </div>
            <EbooksFeed />
          </div>
        </>
      );
    }
  };

  return (
    <BlogEngagementTracker selectedCategory={selectedCategory}>
      <UnifiedSEO 
        title={t('seo.title')}
        description={t('seo.description')}
        keywords="blog ia, artigos agentes digitais, implementação ia, metodologia líder, casos de sucesso ia"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        {/* Enhanced Hero Section */}
        <BlogHero />
        
        {/* Enhanced Search and Filters */}
        <section className="py-12 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
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
        <section className="py-16 md:py-20 px-4 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-brand-blue/5 to-blue-600/5 dark:from-brand-blue/10 dark:to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/5 to-brand-blue/5 dark:from-blue-600/10 dark:to-brand-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {renderContent()}
          </div>
        </section>

        {/* Enhanced Newsletter Section */}
        <section className="py-8 md:py-12">
          <BlogNewsletter />
        </section>
      </div>
    </BlogEngagementTracker>
  );
};

export default Blog;