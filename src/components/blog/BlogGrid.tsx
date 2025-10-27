
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/ui/lazy-image';
import { BlogPost } from '@/components/blog/data/blogData';

interface BlogGridProps {
  articles: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600 mb-4">
          Nenhum artigo encontrado
        </p>
        <p className="text-gray-500">
          Tente ajustar sua busca ou filtros
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group bg-white border border-gray-200">
          <div className="aspect-video bg-gray-200 relative overflow-hidden">
            {article.image ? (
              <LazyImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <Badge className="absolute top-4 left-4 z-10 bg-brand-blue text-white">
              {article.category}
            </Badge>
          </div>
          
          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors text-gray-900">
              <Link to={`/blog/${article.slug}`}>
                {article.title}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-3 text-gray-600">
              {article.excerpt}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString('pt-BR')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              
              <Button asChild variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue/80">
                <Link to={`/blog/${article.slug}`}>
                  Ler mais →
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogGrid;
