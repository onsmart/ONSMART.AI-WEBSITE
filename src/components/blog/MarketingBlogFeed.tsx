/**
 * Feed de artigos do blog vindo da API de marketing (marketing_contents).
 * Mostra todos os artigos publicados; tipo "site" = link para /blog/:slug, tipo "linkedin" = card que abre external_url.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/trpc';

type ContentRow = {
  id: string;
  type: string;
  status: string;
  slug: string;
  titulo: string;
  resumo: string | null;
  imagem_url: string | null;
  post_source?: 'site' | 'linkedin';
  external_url?: string | null;
};

function ArticleCard({
  article,
  index,
  isLinkedIn,
}: {
  article: ContentRow;
  index: number;
  isLinkedIn: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = article.imagem_url?.trim();
  const resumo = article.resumo?.trim();

  const handleClick = () => {
    if (isLinkedIn && article.external_url) {
      window.open(article.external_url!, '_blank', 'noopener,noreferrer');
    }
  };

  const cardContent = (
    <>
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={article.titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading={index < 3 ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 via-blue-500/30 to-brand-blue/20 flex items-center justify-center">
            <FileText className="h-12 w-12 text-brand-blue/50" />
          </div>
        )}
        <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-lg border-0 px-3 py-1">
          <FileText className="h-3 w-3 mr-1" />
          {isLinkedIn ? 'LinkedIn' : 'Artigo'}
        </Badge>
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <ArrowRight className="h-4 w-4 text-brand-blue" />
          </div>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors duration-300 text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">
          {article.titulo}
        </CardTitle>
        {resumo && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-3 leading-relaxed">
            {resumo}
          </p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{isLinkedIn ? 'LinkedIn' : 'Artigo'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>Leitura</span>
          </div>
        </div>
        {isLinkedIn ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-brand-blue hover:text-white hover:bg-gradient-to-r hover:from-brand-blue hover:to-blue-600 transition-all duration-300 group/btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (article.external_url) window.open(article.external_url!, '_blank', 'noopener,noreferrer');
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
            Ler no LinkedIn
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-brand-blue hover:text-white hover:bg-gradient-to-r hover:from-brand-blue hover:to-blue-600 transition-all duration-300 group/btn"
            asChild
          >
            <Link to={`/blog/${article.slug}`}>
              <ArrowRight className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
              Ler artigo completo
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
            </Link>
          </Button>
        )}
      </CardContent>
    </>
  );

  const cardClass =
    'overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:-translate-y-1 cursor-pointer';

  if (isLinkedIn) {
    return (
      <Card className={cardClass} onClick={handleClick}>
        {cardContent}
      </Card>
    );
  }

  return (
    <Link to={`/blog/${article.slug}`}>
      <Card className={cardClass}>{cardContent}</Card>
    </Link>
  );
}

export default function MarketingBlogFeed() {
  const { data, isLoading, isError } = trpc.marketing.public.list.useQuery({
    type: 'blog_artigos',
    limit: 50,
    offset: 0,
  });

  const rows = (data?.rows ?? []) as ContentRow[];

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-16 h-16 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Carregando artigos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
          <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Erro ao carregar artigos</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Nenhum artigo publicado ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {rows.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          index={index}
          isLinkedIn={article.post_source === 'linkedin' && !!article.external_url}
        />
      ))}
    </div>
  );
}
