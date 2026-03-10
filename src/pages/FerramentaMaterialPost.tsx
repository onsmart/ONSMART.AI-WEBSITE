/**
 * Página compartilhada de conteúdo por slug: ferramentas e materiais gratuitos.
 * Conteúdo só é liberado após preencher formulário (nome, email, telefone).
 * Controle de acesso por localStorage (lead_captured_${slug}, validade 30 dias).
 */

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Calendar, Mail } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { trpc } from '@/trpc';
import { LeadCaptureForm, getLeadCaptured } from '@/components/marketing/LeadCaptureForm';

type ContentTypeSlug = 'ferramentas' | 'materiais_gratuitos';

interface FerramentaMaterialPostProps {
  expectedType: ContentTypeSlug;
  backPath: string;
  backLabel: string;
  pageTitleSuffix: string;
}

export default function FerramentaMaterialPost({
  expectedType,
  backPath,
  backLabel,
  pageTitleSuffix,
}: FerramentaMaterialPostProps) {
  const { slug } = useParams<{ slug: string }>();
  const [hasAccess, setHasAccess] = useState(false);

  const { data: content, isLoading, isError } = trpc.marketing.public.getBySlug.useQuery(slug!, {
    enabled: !!slug,
    retry: false,
  });

  const stored = useMemo(() => (slug ? getLeadCaptured(slug) : null), [slug]);
  const showForm = !hasAccess && !stored;
  const showContent = hasAccess || !!stored;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-green-500 border-t-transparent" />
      </div>
    );
  }

  if (isError || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Conteúdo não encontrado</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">O link pode estar incorreto ou o conteúdo foi removido.</p>
          <Button asChild>
            <Link to={backPath}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const row = content as {
    type: string;
    titulo: string;
    resumo: string | null;
    conteudo: string | null;
    imagem_url: string | null;
    updated_at: string;
    pdf_path?: string | null;
    pdfSignedUrl?: string | null;
    external_url?: string | null;
  };

  if (row.type !== expectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Conteúdo não encontrado</h1>
          <Button asChild>
            <Link to={backPath}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (row.external_url?.trim()) {
    window.location.href = row.external_url;
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Redirecionando...</p>
      </div>
    );
  }

  return (
    <>
      <UnifiedSEO
        title={`${row.titulo} | ${pageTitleSuffix}`}
        description={row.resumo || undefined}
      />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Button asChild variant="ghost" className="mb-8">
            <Link to={backPath}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Link>
          </Button>

          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {row.imagem_url && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={row.imagem_url}
                  alt={row.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                {row.updated_at ? new Date(row.updated_at).toLocaleDateString('pt-BR') : null}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                {row.titulo}
              </h1>
              {row.resumo && (
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                  {row.resumo}
                </p>
              )}

              {showForm && (
                <div className="mb-8">
                  <LeadCaptureForm
                    contentSlug={slug!}
                    contentTitle={row.titulo}
                    contentType={expectedType}
                    onSuccess={() => setHasAccess(true)}
                  />
                </div>
              )}

              {showContent && (
                <>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Mail className="h-5 w-5 shrink-0" />
                    O arquivo foi enviado para seu e-mail. Verifique a caixa de entrada e o spam.
                  </div>
                  {/* Conteúdo e arquivos não são exibidos aqui — apenas o envio por e-mail. */}
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
