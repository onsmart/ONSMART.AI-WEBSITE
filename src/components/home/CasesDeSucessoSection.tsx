/**
 * Seção "Cases de Sucesso" na página inicial. Cards no mesmo estilo do blog (marketing_contents tipo "cases").
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { trpc } from '@/trpc';

type CaseRow = {
  id: string;
  slug: string;
  titulo: string;
  resumo: string | null;
  imagem_url: string | null;
};

function CaseCard({ caseItem, index }: { caseItem: CaseRow; index: number }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = caseItem.imagem_url?.trim();
  const resumo = caseItem.resumo?.trim();

  return (
    <Link to={`/blog/${caseItem.slug}`}>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-blue/50 dark:hover:border-brand-blue/50 hover:-translate-y-1 cursor-pointer">
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 relative overflow-hidden">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={caseItem.titulo}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading={index < 3 ? 'eager' : 'lazy'}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 via-blue-500/30 to-brand-blue/20 flex items-center justify-center">
              <Award className="h-12 w-12 text-brand-blue/50" />
            </div>
          )}
          <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-brand-blue to-blue-600 text-white shadow-lg border-0 px-3 py-1">
            <Award className="h-3 w-3 mr-1" />
            Case
          </Badge>
          <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <ArrowRight className="h-4 w-4 text-brand-blue" />
            </div>
          </div>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-2 group-hover:text-brand-blue transition-colors duration-300 text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight">
            {caseItem.titulo}
          </CardTitle>
          {resumo && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mt-3 leading-relaxed">
              {resumo}
            </p>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-brand-blue hover:text-white hover:bg-gradient-to-r hover:from-brand-blue hover:to-blue-600 transition-all duration-300 group/btn"
            asChild
          >
            <span>
              <ArrowRight className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform inline-block" />
              Ver case completo
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all inline-block" />
            </span>
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function CasesDeSucessoSection() {
  const { data, isLoading, isError } = trpc.marketing.public.list.useQuery({
    type: 'cases',
    limit: 6,
    offset: 0,
  });

  const rows = (data?.rows ?? []) as CaseRow[];

  if (isLoading) {
    return (
      <section id="cases-de-sucesso" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Cases de Sucesso
          </h2>
          <div className="py-12 text-center">
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin mx-auto" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">Carregando cases...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError || rows.length === 0) {
    return null;
  }

  return (
    <section id="cases-de-sucesso" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Cases de Sucesso
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-2xl mx-auto">
          Conheça resultados reais de quem já transformou processos com inteligência artificial.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rows.map((caseItem, index) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
