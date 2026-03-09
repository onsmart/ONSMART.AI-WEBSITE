
import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import UnifiedSEO from '@/components/shared/UnifiedSEO';
import { blogPosts } from '@/components/blog/data/blogData';
import { trpc } from '@/trpc';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation(['blogPost', 'blog', 'common']);

  const { data: marketingContent, isLoading: loadingMarketing, isError: marketingError } = trpc.marketing.public.getBySlug.useQuery(
    slug!,
    { enabled: !!slug, retry: false }
  );

  const isLinkedIn =
    marketingContent &&
    (marketingContent as { post_source?: string }).post_source === 'linkedin' &&
    (marketingContent as { external_url?: string | null }).external_url;

  useEffect(() => {
    if (isLinkedIn && (marketingContent as { external_url?: string }).external_url) {
      window.location.href = (marketingContent as { external_url: string }).external_url;
    }
  }, [isLinkedIn, marketingContent]);

  if (isLinkedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Redirecionando para o LinkedIn...</p>
      </div>
    );
  }

  // Conteúdo do marketing (artigo no site)
  if (marketingContent && !isLinkedIn) {
    const row = marketingContent as {
      titulo: string;
      resumo: string | null;
      conteudo: string | null;
      imagem_url: string | null;
      updated_at: string;
    };
    return (
      <>
        <UnifiedSEO
          title={`${row.titulo} | Blog OnSmartAI`}
          description={row.resumo || undefined}
        />
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl px-4 py-16">
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backButton')}
              </Link>
            </Button>
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  {row.updated_at
                    ? new Date(row.updated_at).toLocaleDateString('pt-BR')
                    : null}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  {row.titulo}
                </h1>
                {row.resumo && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                    {row.resumo}
                  </p>
                )}
                {row.conteudo && (
                  <div
                    className="marketing-content-prose prose prose-lg max-w-none mx-auto dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-ol:my-4"
                    dangerouslySetInnerHTML={{ __html: row.conteudo }}
                  />
                )}
              </div>
            </article>
          </div>
        </div>
      </>
    );
  }

  if (loadingMarketing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-blue border-t-transparent" />
      </div>
    );
  }

  // Fallback: artigo estático (blogData)
  const article = blogPosts.find(post => post.slug === slug);

  // Obter traduções do artigo
  const translatedPost = useMemo(() => {
    if (!article || !slug) return null;

    const translations = t(`blog:posts.${slug}`, { returnObjects: true }) as any;
    
    if (translations && typeof translations === 'object' && translations.title) {
      // Processar o conteúdo para manter as letras LÍDER hardcoded
      let processedContent = translations.content || article.content;
      
      // Manter as letras L, Í, D, E, R hardcoded com português hardcoded + tradução
      // Formato: L - [PT hardcoded] - [tradução atual]
      const ptDescriptions = {
        L: "Levantamento de processos",
        Í: "Identificação de oportunidades",
        D: "Desenvolvimento dos agentes",
        E: "Execução e implementação",
        R: "Refinamento contínuo"
      };
      
      const currentLanguageDescriptions = {
        L: t('blog:liderDescriptions.L'),
        Í: t('blog:liderDescriptions.Í'),
        D: t('blog:liderDescriptions.D'),
        E: t('blog:liderDescriptions.E'),
        R: t('blog:liderDescriptions.R')
      };
      
      // Em português, mostrar apenas PT hardcoded, nos outros idiomas mostrar PT + tradução
      if (i18n.language === 'pt') {
        processedContent = processedContent.replace(/{{LIDER_L}}/g, ptDescriptions.L);
        processedContent = processedContent.replace(/{{LIDER_Í}}/g, ptDescriptions.Í);
        processedContent = processedContent.replace(/{{LIDER_D}}/g, ptDescriptions.D);
        processedContent = processedContent.replace(/{{LIDER_E}}/g, ptDescriptions.E);
        processedContent = processedContent.replace(/{{LIDER_R}}/g, ptDescriptions.R);
      } else {
        processedContent = processedContent.replace(/{{LIDER_L}}/g, `${ptDescriptions.L} - ${currentLanguageDescriptions.L}`);
        processedContent = processedContent.replace(/{{LIDER_Í}}/g, `${ptDescriptions.Í} - ${currentLanguageDescriptions.Í}`);
        processedContent = processedContent.replace(/{{LIDER_D}}/g, `${ptDescriptions.D} - ${currentLanguageDescriptions.D}`);
        processedContent = processedContent.replace(/{{LIDER_E}}/g, `${ptDescriptions.E} - ${currentLanguageDescriptions.E}`);
        processedContent = processedContent.replace(/{{LIDER_R}}/g, `${ptDescriptions.R} - ${currentLanguageDescriptions.R}`);
      }

      return {
        title: translations.title || article.title,
        excerpt: translations.excerpt || article.excerpt,
        content: processedContent,
        category: translations.category || article.category,
        author: article.author,
        date: article.date,
        readTime: article.readTime
      };
    }

    // Fallback para artigo original se não houver tradução
    return {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      date: article.date,
      readTime: article.readTime
    };
  }, [article, slug, t]);

  if (!article || !translatedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backButton')}
            </Link>
          </Button>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">{t('empty.title', { ns: 'blog' })}</h1>
            <p className="text-gray-600">{t('empty.description', { ns: 'blog' })}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <UnifiedSEO 
        title={`${translatedPost.title} | Blog OnSmartAI`}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backButton')}
            </Link>
          </Button>

          {/* Article Header */}
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(translatedPost.date).toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'es' ? 'es-ES' : 'en-US')}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {translatedPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {translatedPost.readTime} {t('readTime')}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                {translatedPost.title}
              </h1>

              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                <span className="inline-block bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-medium">
                  {t(`blog:categories.${translatedPost.category}`) || translatedPost.category}
                </span>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  {t('share')}
                </Button>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                dangerouslySetInnerHTML={{ __html: translatedPost.content }}
              />
            </div>
          </article>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">{t('related.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t('related.article1.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {t('related.article1.description')}
                  </p>
                  <Link to="/blog/erros-implementacao-ia" className="text-brand-blue hover:underline text-sm font-medium">
                    {t('related.article1.link')}
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t('related.article2.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {t('related.article2.description')}
                  </p>
                  <Link to="/blog/roi-projetos-ia" className="text-brand-blue hover:underline text-sm font-medium">
                    {t('related.article2.link')}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
