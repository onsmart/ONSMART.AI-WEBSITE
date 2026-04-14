/**
 * Feed de e-books / materiais gratuitos vindo da API de marketing (marketing_contents type: materiais_gratuitos).
 * Usado no Blog (aba E-books) e na página /materiais-gratuitos.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink, Calendar, Clock, Download, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/ui/lazy-image';
import { trpc } from '@/trpc';

type ContentRow = {
  id: string;
  type: string;
  status: string;
  slug: string;
  titulo: string;
  resumo: string | null;
  imagem_url: string | null;
  external_url?: string | null;
  pdf_path?: string | null;
};

export default function EbooksFeed() {
  const primary = trpc.marketing.public.list.useQuery({
    type: 'materiais_gratuitos',
    limit: 50,
    offset: 0,
  });

  const needFallback =
    primary.isFetched &&
    (primary.isError || (primary.data?.rows?.length ?? 0) === 0);

  const sheet = trpc.marketing.public.listFromSheets.useQuery(
    { kind: 'materiais_gratuitos' },
    { enabled: needFallback },
  );

  const isLoading =
    !primary.isFetched || (needFallback && !sheet.isFetched);

  const rows = (
    primary.isSuccess && (primary.data?.rows?.length ?? 0) > 0
      ? primary.data!.rows
      : sheet.data?.rows ?? []
  ) as ContentRow[];

  const isError =
    primary.isFetched &&
    needFallback &&
    sheet.isFetched &&
    sheet.isError;

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Carregando e-books...</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Aguarde um momento</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Erro ao carregar e-books</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Nenhum e-book encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {rows.map((ebook) => (
        <EbookCard key={ebook.id} item={ebook} />
      ))}
    </div>
  );
}

function EbookCard({ item }: { item: ContentRow }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = item.imagem_url?.trim();
  const hasExternalLink = !!item.external_url?.trim();

  const cardContent = (
    <>
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            <LazyImage
              src={imageUrl}
              alt={item.titulo}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-500/20 via-emerald-500/30 to-green-500/20 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-green-500/50" />
          </div>
        )}
        <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg border-0 px-3 py-1">
          <BookOpen className="h-3 w-3 mr-1" />
          E-book
        </Badge>
        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <ArrowRight className="h-4 w-4 text-green-500" />
          </div>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">
          {item.titulo}
        </CardTitle>
        {item.resumo && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-3 leading-relaxed">
            {item.resumo}
          </p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>E-book</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>Download</span>
          </div>
        </div>
        {hasExternalLink ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 transition-all duration-300 group/btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(item.external_url!, '_blank', 'noopener,noreferrer');
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Baixar E-book
            <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 transition-all duration-300 group/btn"
            asChild
          >
            <Link to={`/materiais-gratuitos/${item.slug}`}>
              <Download className="h-4 w-4 mr-2" />
              Acessar E-book
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
            </Link>
          </Button>
        )}
      </CardContent>
    </>
  );

  const cardClass =
    'overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-500/50 hover:-translate-y-1 cursor-pointer';

  if (hasExternalLink) {
    return (
      <Card
        className={cardClass}
        onClick={() => window.open(item.external_url!, '_blank', 'noopener,noreferrer')}
      >
        {cardContent}
      </Card>
    );
  }

  return (
    <Link to={`/materiais-gratuitos/${item.slug}`}>
      <Card className={cardClass}>{cardContent}</Card>
    </Link>
  );
}
