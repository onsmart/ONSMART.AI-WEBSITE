
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/ui/lazy-image';
import { BlogPost } from '@/components/blog/data/blogData';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

interface BlogGridProps {
  articles: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ articles }) => {
  const { t, i18n } = useTranslation('blog');

  // Função para obter o artigo traduzido
  const getTranslatedArticle = useMemo(() => {
    return (article: BlogPost) => {
      const translatedPost = t(`posts.${article.slug}`, { returnObjects: true }) as any;
      if (translatedPost && typeof translatedPost === 'object' && translatedPost.title) {
        return {
          ...article,
          title: translatedPost.title || article.title,
          excerpt: translatedPost.excerpt || article.excerpt,
          category: translatedPost.category || article.category
        };
      }
      return article;
    };
  }, [t]);

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          {t('empty.title')}
        </p>
        <p className="text-gray-500 dark:text-gray-500">
          {t('empty.description')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => {
        const translatedArticle = getTranslatedArticle(article);
        return (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
              {article.image ? (
                <LazyImage
                  src={article.image}
                  alt={translatedArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/40" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <Badge className="absolute top-4 left-4 z-10 bg-brand-blue text-white">
                {t(`categories.${translatedArticle.category}`) || translatedArticle.category}
              </Badge>
            </div>
            
            <CardHeader>
              <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors text-gray-900 dark:text-gray-100">
                <Link to={`/blog/${article.slug}`}>
                  {translatedArticle.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
                {translatedArticle.excerpt}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'es' ? 'es-ES' : 'en-US')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4" />
                  {article.author}
                </div>
                
                <Button asChild variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue/80">
                  <Link to={`/blog/${article.slug}`}>
                    {t('article.readMore')} →
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BlogGrid;
