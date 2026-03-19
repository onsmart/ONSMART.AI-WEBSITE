/**
 * Create or edit marketing content. Upload PDF/image. Auto-slug from title. Single content field + Format with IA + preview.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { trpc } from '@/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, Sparkles, Eye } from 'lucide-react';
import { sanitizeHtml } from '@/utils/sanitizeHtml';

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/\u0300-\u036f/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'post';
}

function youtubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  const m = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

/** Garante URL absoluta para validação do backend (z.string().url()). */
function normalizeExternalUrl(url: string): string {
  const u = url.trim();
  if (!u) return u;
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u.replace(/^\/+/, '')}`;
}

const TYPES = [
  { value: 'blog_artigos', label: 'Blog / Artigos' },
  { value: 'ferramentas', label: 'Ferramentas' },
  { value: 'materiais_gratuitos', label: 'Materiais Gratuitos' },
  { value: 'cases', label: 'Cases de Sucesso' },
] as const;

const FORMAT_HTML_API = '/api/openai-format-html';

export default function MarketingContentEdit() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || 'blog_artigos';
  const isNew = !id;

  const [type, setType] = useState<string>(typeParam);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [formattingContent, setFormattingContent] = useState(false);
  const [imagemUrl, setImagemUrl] = useState('');
  const [pdfPath, setPdfPath] = useState('');
  const [postSource, setPostSource] = useState<'site' | 'linkedin' | 'youtube'>('site');
  const [externalUrl, setExternalUrl] = useState('');
  const [youtubeUrlToFetch, setYoutubeUrlToFetch] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { data: existing, isLoading: loadingExisting } = trpc.marketing.content.getById.useQuery(id!, { enabled: !!id });
  const { data: youtubeMeta } = trpc.marketing.youtube.fetchMeta.useQuery(
    { url: youtubeUrlToFetch! },
    { enabled: !!youtubeUrlToFetch && youtubeUrlToFetch.startsWith('http') }
  );
  const utils = trpc.useUtils();
  const createMutation = trpc.marketing.content.create.useMutation({
    onSuccess: () => {
      utils.marketing.content.list.invalidate();
      window.location.href = '/marketing';
    },
  });
  const updateMutation = trpc.marketing.content.update.useMutation({
    onSuccess: () => {
      utils.marketing.content.list.invalidate();
      window.location.href = '/marketing';
    },
  });
  const uploadMutation = trpc.marketing.content.upload.useMutation();

  useEffect(() => {
    if (youtubeMeta?.video_title) {
      setTitulo(youtubeMeta.video_title);
      setYoutubeUrlToFetch(null);
    }
  }, [youtubeMeta]);

  useEffect(() => {
    if (existing) {
      setType(existing.type);
      setStatus(existing.status as 'draft' | 'published');
      setSlug(existing.slug);
      setTitulo(existing.titulo);
      setResumo(existing.resumo || '');
      setConteudo(existing.conteudo || '');
      setImagemUrl(existing.imagem_url || '');
      setPdfPath(existing.pdf_path || '');
      setPostSource(
        (existing as { post_source?: string }).post_source === 'linkedin'
          ? 'linkedin'
          : (existing as { post_source?: string }).post_source === 'youtube'
            ? 'youtube'
            : 'site'
      );
      setExternalUrl((existing as { external_url?: string | null }).external_url || '');
      setSlugManuallyEdited(false);
    } else if (isNew) {
      setType(typeParam);
      setSlugManuallyEdited(false);
    }
  }, [existing, isNew, typeParam]);

  // Para YouTube: ao colar a URL, preencher slug com o ID do vídeo (minúsculas) para habilitar o botão Criar
  useEffect(() => {
    if (postSource !== 'youtube' || slugManuallyEdited || !externalUrl.trim()) return;
    const id = youtubeVideoId(externalUrl);
    if (id) setSlug(`video-${id.toLowerCase()}`);
  }, [postSource, externalUrl, slugManuallyEdited]);

  // Novo conteúdo com link YouTube: deixar "Publicado" por padrão para aparecer no blog
  useEffect(() => {
    if (isNew && postSource === 'youtube') setStatus('published');
  }, [isNew, postSource]);

  // Novo Case de Sucesso: deixar "Publicado" por padrão para aparecer na página inicial
  useEffect(() => {
    if (isNew && type === 'cases') setStatus('published');
  }, [isNew, type]);

  useEffect(() => {
    if (slugManuallyEdited) return;
    if (titulo.trim()) setSlug(slugFromTitle(titulo));
    else if (isNew && !(type === 'blog_artigos' && postSource === 'youtube' && externalUrl.trim())) setSlug('');
  }, [titulo, slugManuallyEdited, isNew, type, postSource, externalUrl]);

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true);
    setSlug(e.target.value);
  };

  const handleFormatWithAI = async () => {
    const text = conteudo.trim() || titulo;
    if (!text) return;
    setFormattingContent(true);
    try {
      const res = await fetch(FORMAT_HTML_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const contentType = res.headers.get('content-type') || '';
      const raw = await res.text();
      const rawPreview = typeof raw === 'string' ? raw.slice(0, 200) : String(raw);

      if (!contentType.includes('application/json')) {
        console.error('Format HTML API returned non-JSON:', rawPreview);
        const is404 = raw.includes('Cannot POST') || res.status === 404;
        const isTimeout =
          res.status === 504 ||
          raw.includes('FUNCTION_INVOCATION_TIMEOUT') ||
          raw.toLowerCase().includes('timeout') ||
          raw.includes('An error occurred with your');
        if (isTimeout) {
          alert('A formatação demorou demais (timeout). Tente com menos texto ou aguarde e tente novamente.');
        } else if (is404) {
          alert(
            'Rota /api/openai-format-html não encontrada (404). Reinicie o backend: feche o terminal onde está rodando o servidor e suba de novo com npm run dev:one (front + backend juntos). O .env é lido ao iniciar o servidor.'
          );
        } else {
          alert(
            'A resposta do servidor não é válida (não é JSON). Verifique se o backend está rodando (npm run dev:one) e se OPENAI_API_KEY está definido no .env.'
          );
        }
        return;
      }

      let data: { error?: string; html?: string };
      try {
        data = JSON.parse(raw);
      } catch {
        alert('Resposta inválida da API. Tente novamente.');
        return;
      }

      if (!res.ok) throw new Error(data.error || 'Erro ao formatar');
      if (data.html) {
        // Garantir que tags sejam HTML real (não entidades), para o preview e a página renderizarem corretamente
        const decoded = String(data.html)
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");
        setConteudo(decoded);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao formatar com IA. Verifique se a API OpenAI está configurada.');
    } finally {
      setFormattingContent(false);
    }
  };

  const handleFile = async (file: File, bucket: 'pdf' | 'image') => {
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      if (!base64) {
        setUploadError('Falha ao ler o arquivo.');
        return;
      }
      const contentType = file.type || (bucket === 'pdf' ? 'application/pdf' : 'image/jpeg');
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      try {
        const result = await uploadMutation.mutateAsync({ bucket, path, base64, contentType });
        if (bucket === 'image') setImagemUrl(result.url);
        else setPdfPath(result.path);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro ao enviar arquivo. Verifique o tamanho (recomendado < 6MB) e a conexão.';
        setUploadError(msg);
      }
    };
    reader.onerror = () => setUploadError('Falha ao ler o arquivo.');
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isBlog = type === 'blog_artigos';
    const tituloToSend =
      isBlog && postSource === 'youtube' && !titulo.trim() ? 'Vídeo YouTube' : titulo;
    const slugToSend =
      slug.trim() ||
      (isBlog && postSource === 'youtube' && externalUrl.trim()
        ? `video-${(youtubeVideoId(externalUrl) ?? 'youtube').toLowerCase()}`
        : slugFromTitle(tituloToSend));
    const externalUrlToSend =
      isBlog && (postSource === 'linkedin' || postSource === 'youtube') && externalUrl.trim()
        ? normalizeExternalUrl(externalUrl)
        : null;
    const payload = {
      type: type as 'blog_artigos' | 'ferramentas' | 'materiais_gratuitos' | 'cases',
      status,
      slug: slugToSend,
      titulo: tituloToSend,
      resumo: resumo || null,
      conteudo: conteudo || null,
      imagem_url: imagemUrl || null,
      pdf_path: pdfPath || null,
      ...(isBlog && {
        post_source: postSource,
        external_url: externalUrlToSend,
      }),
    };
    if (isNew) {
      createMutation.mutate(payload as any);
    } else {
      updateMutation.mutate({ id: id!, ...payload, slug: slug || undefined } as any);
    }
  };

  // Botão Criar/Salvar só habilita com título, slug e conteúdo preenchidos.
  // Para ferramentas/materiais: conteúdo = texto OU PDF anexado OU imagem (qualquer um conta).
  // Para blog: site = conteúdo; linkedin/youtube = external_url.
  const showContentField = type !== 'blog_artigos' || postSource === 'site';
  const hasContent =
    !showContentField ||
    (postSource === 'youtube' && externalUrl.trim().length > 0) ||
    (postSource === 'linkedin' && externalUrl.trim().length > 0) ||
    conteudo.trim().length > 0 ||
    (pdfPath && pdfPath.trim().length > 0) ||
    (imagemUrl && imagemUrl.trim().length > 0);
  // Para YouTube: basta URL + slug (título é preenchido ao sair do campo ou pelo backend ao salvar)
  const hasRequiredFields =
    slug.trim().length > 0 &&
    hasContent &&
    (titulo.trim().length > 0 || (postSource === 'youtube' && externalUrl.trim().length > 0));
  const canSubmit = hasRequiredFields && !createMutation.isPending && !updateMutation.isPending;

  if (!isNew && loadingExisting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100/80 dark:from-gray-950 dark:to-gray-900/95 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100/80 dark:from-gray-950 dark:to-gray-900/95 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-4 text-gray-600 hover:text-brand-blue dark:text-gray-400 dark:hover:text-brand-blue rounded-xl">
          <Link to="/marketing"><ArrowLeft className="h-4 w-4 mr-2 shrink-0" />Voltar</Link>
        </Button>
        <Card className="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-xl shadow-gray-200/30 dark:shadow-none bg-white dark:bg-gray-800 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-brand-blue to-blue-600" />
          <CardHeader className="pb-6 pt-6 sm:pt-8 px-4 sm:px-6 md:px-8 border-b border-gray-100 dark:border-gray-700/50">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {isNew ? 'Novo conteúdo' : 'Editar conteúdo'}
            </h1>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-6">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</Label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 px-4 transition-all duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none"
                >
                  {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</Label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 px-4 transition-all duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {type === 'blog_artigos' && postSource === 'youtube'
                    ? 'Conteúdos com status Publicado aparecem na listagem do blog. Use Rascunho para ocultar.'
                    : 'Use Rascunho para ocultar o conteúdo do site e editar com calma. Você pode voltar para Publicado quando quiser.'}
                </p>
              </div>
              {type === 'blog_artigos' && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de postagem</Label>
                    <select
                      value={postSource}
                      onChange={(e) => setPostSource(e.target.value as 'site' | 'linkedin' | 'youtube')}
                      className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 px-4 transition-all duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none"
                    >
                      <option value="site">Conteúdo no site (escrever artigo aqui)</option>
                      <option value="linkedin">Apenas link do LinkedIn (card redireciona para o post)</option>
                      <option value="youtube">Link de vídeo YouTube (título e capa carregados automaticamente)</option>
                    </select>
                  </div>
                  {postSource === 'linkedin' && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL do LinkedIn</Label>
                      <Input
                        type="url"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        placeholder="https://www.linkedin.com/..."
                        className="h-11 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">O card no blog abrirá este link ao clicar.</p>
                    </div>
                  )}
                  {postSource === 'youtube' && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">URL do vídeo (YouTube)</Label>
                      <Input
                        type="url"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        onBlur={() => {
                          const url = externalUrl.trim();
                          if (url && /youtube\.com|youtu\.be/i.test(url)) setYoutubeUrlToFetch(url);
                        }}
                        placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                        className="h-11 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">Cole a URL e saia do campo: o título do vídeo será preenchido automaticamente. No card do blog será exibido o título persistido no YouTube.</p>
                    </div>
                  )}
                </>
              )}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Título</Label>
                <Input
                  value={titulo}
                  onChange={handleTituloChange}
                  required={postSource !== 'youtube'}
                  className="h-11 rounded-xl border-gray-200 dark:border-gray-600 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Slug</Label>
                <Input
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="Gerado automaticamente a partir do título"
                  className="h-11 rounded-xl font-mono text-sm border-gray-200 dark:border-gray-600 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Gerado automaticamente ao digitar o título. Você pode editar manualmente.</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Resumo (opcional)</Label>
                <textarea
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                  placeholder="Breve descrição para cards e listagens"
                  className="w-full min-h-[80px] rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 px-4 py-3 text-sm transition-all duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none resize-y"
                />
              </div>
              {(type !== 'blog_artigos' || postSource === 'site') && (
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Conteúdo</Label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleFormatWithAI}
                      disabled={formattingContent}
                      className="rounded-xl border-gray-200 dark:border-gray-600 hover:border-brand-blue hover:bg-brand-blue/5"
                    >
                      <Sparkles className="h-4 w-4 mr-1.5 shrink-0" />
                      {formattingContent ? 'Formatando...' : 'Formatar com IA'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewModalOpen(true)}
                      className="rounded-xl border-gray-200 dark:border-gray-600 hover:border-brand-blue hover:bg-brand-blue/5"
                    >
                      <Eye className="h-4 w-4 mr-1.5 shrink-0" />
                      Preview
                    </Button>
                  </div>
                </div>
                <textarea
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  placeholder="Digite o texto. Use &quot;Formatar com IA&quot; para converter em HTML responsivo."
                  className="w-full min-h-[200px] rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 font-mono text-sm px-4 py-3 transition-all duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 focus:outline-none resize-y"
                />
              </div>
              )}

              <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                  <DialogHeader className="px-6 pt-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <DialogTitle className="text-xl">Preview do conteúdo</DialogTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Como aparecerá na página do site
                    </p>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                    <article className="mx-auto w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-6 md:p-8">
                        <div
                          className="marketing-content-prose prose prose-lg max-w-none mx-auto dark:prose-invert
                            prose-headings:font-bold prose-headings:tracking-tight
                            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 first:prose-h2:mt-0
                            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-semibold
                            prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 prose-h4:font-semibold
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                            prose-ul:my-4 prose-ol:my-4 prose-li:my-1"
                          dangerouslySetInnerHTML={{
                            __html: (() => {
                              if (!conteudo) return '<p class="text-gray-400 italic">Nenhum conteúdo para visualizar.</p>';
                              // Detecta HTML (tag com nome de elemento)
                              if (/<\s*[a-z][a-z0-9]*[\s>\/]/i.test(conteudo.trim())) {
                                return sanitizeHtml(conteudo);
                              }
                              const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                              const pClass =
                                'mb-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 last:mb-0';
                              return conteudo
                                .split(/\n\s*\n/)
                                .map((block) => block.trim())
                                .filter(Boolean)
                                .map(
                                  (block) =>
                                    `<p class="${pClass}">${escape(block).replace(/\n/g, '<br />')}</p>`
                                )
                                .join('');
                            })(),
                          }}
                        />
                      </div>
                    </article>
                  </div>
                </DialogContent>
              </Dialog>
              {uploadError && (
                <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-2">
                  {uploadError}
                </p>
              )}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Imagem (URL ou upload)</Label>
                <Input
                  value={imagemUrl}
                  onChange={(e) => setImagemUrl(e.target.value)}
                  placeholder="URL ou envie arquivo"
                  className="h-11 rounded-xl border-gray-200 dark:border-gray-600 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
                <label className="flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 hover:border-brand-blue/50 hover:bg-brand-blue/5 dark:hover:bg-brand-blue/10 cursor-pointer transition-colors text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'image')} />
                  Enviar imagem
                </label>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">PDF (upload)</Label>
                <div className="flex gap-2 items-center flex-wrap">
                  <Input
                    value={pdfPath}
                    readOnly
                    placeholder="Caminho após upload"
                    className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800/80 border-gray-200 dark:border-gray-600 font-mono text-sm flex-1 min-w-0"
                  />
                  {pdfPath.trim() ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => { setPdfPath(''); setUploadError(null); }}
                      className="h-11 rounded-xl border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0"
                    >
                      Remover PDF
                    </Button>
                  ) : null}
                </div>
                <label className="flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 hover:border-brand-blue/50 hover:bg-brand-blue/5 dark:hover:bg-brand-blue/10 cursor-pointer transition-colors text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <input type="file" accept="application/pdf" className="sr-only" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'pdf')} />
                  {pdfPath.trim() ? 'Substituir PDF' : 'Enviar PDF'}
                </label>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                {!hasRequiredFields && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Preencha título, slug e conteúdo (ou anexe um PDF/imagem) para habilitar o botão {isNew ? 'Criar' : 'Salvar'}.
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className={`h-11 rounded-xl px-6 font-medium w-full sm:w-auto ${
                    canSubmit
                      ? 'bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white shadow-md shadow-brand-blue/25'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isNew ? 'Criar' : 'Salvar'}
                </Button>
                <Button type="button" variant="outline" asChild className="h-11 rounded-xl border-gray-200 dark:border-gray-600 w-full sm:w-auto">
                  <Link to="/marketing">Cancelar</Link>
                </Button>
              </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
