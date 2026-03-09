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

const TYPES = [
  { value: 'blog_artigos', label: 'Blog / Artigos' },
  { value: 'ferramentas', label: 'Ferramentas' },
  { value: 'materiais_gratuitos', label: 'Materiais Gratuitos' },
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
  const [postSource, setPostSource] = useState<'site' | 'linkedin'>('site');
  const [externalUrl, setExternalUrl] = useState('');
  const { data: existing, isLoading: loadingExisting } = trpc.marketing.content.getById.useQuery(id!, { enabled: !!id });
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
    if (existing) {
      setType(existing.type);
      setStatus(existing.status as 'draft' | 'published');
      setSlug(existing.slug);
      setTitulo(existing.titulo);
      setResumo(existing.resumo || '');
      setConteudo(existing.conteudo || '');
      setImagemUrl(existing.imagem_url || '');
      setPdfPath(existing.pdf_path || '');
      setPostSource((existing as { post_source?: string }).post_source === 'linkedin' ? 'linkedin' : 'site');
      setExternalUrl((existing as { external_url?: string | null }).external_url || '');
      setSlugManuallyEdited(false);
    } else if (isNew) {
      setType(typeParam);
      setSlugManuallyEdited(false);
    }
  }, [existing, isNew, typeParam]);

  useEffect(() => {
    if (slugManuallyEdited) return;
    if (titulo.trim()) setSlug(slugFromTitle(titulo));
    else if (isNew) setSlug('');
  }, [titulo, slugManuallyEdited, isNew]);

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

      if (!contentType.includes('application/json')) {
        console.error('Format HTML API returned non-JSON:', raw.slice(0, 200));
        const is404 = raw.includes('Cannot POST') || res.status === 404;
        alert(
          is404
            ? 'Rota /api/openai-format-html não encontrada (404). Reinicie o backend: feche o terminal onde está rodando o servidor e suba de novo com npm run dev:one (front + backend juntos). O .env é lido ao iniciar o servidor.'
            : 'A resposta do servidor não é válida (não é JSON). Verifique se o backend está rodando (npm run dev:one) e se OPENAI_API_KEY está definido no .env.'
        );
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
      if (data.html) setConteudo(data.html);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao formatar com IA. Verifique se a API OpenAI está configurada.');
    } finally {
      setFormattingContent(false);
    }
  };

  const handleFile = async (file: File, bucket: 'pdf' | 'image') => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      if (!base64) return;
      const contentType = file.type || (bucket === 'pdf' ? 'application/pdf' : 'image/jpeg');
      const path = `${Date.now()}-${file.name}`;
      const result = await uploadMutation.mutateAsync({ bucket, path, base64, contentType });
      if (bucket === 'image') setImagemUrl(result.url);
      else setPdfPath(result.path);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isBlog = type === 'blog_artigos';
    const payload = {
      type: type as 'blog_artigos' | 'ferramentas' | 'materiais_gratuitos',
      status,
      slug: slug || titulo.toLowerCase().replace(/\s+/g, '-'),
      titulo,
      resumo: resumo || null,
      conteudo: conteudo || null,
      imagem_url: imagemUrl || null,
      pdf_path: pdfPath || null,
      ...(isBlog && {
        post_source: postSource,
        external_url: postSource === 'linkedin' ? (externalUrl.trim() || null) : null,
      }),
    };
    if (isNew) {
      createMutation.mutate(payload as any);
    } else {
      updateMutation.mutate({ id: id!, ...payload, slug: slug || undefined } as any);
    }
  };

  if (!isNew && loadingExisting) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/marketing"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Link>
        </Button>
        <Card>
          <CardHeader>
            <h1 className="text-xl font-bold">{isNew ? 'Novo conteúdo' : 'Editar conteúdo'}</h1>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Tipo</Label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full mt-1 rounded border px-3 py-2">
                  {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <Label>Status</Label>
                <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')} className="w-full mt-1 rounded border px-3 py-2">
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use Rascunho para ocultar o conteúdo do site e editar com calma. Você pode voltar para Publicado quando quiser.
                </p>
              </div>
              {type === 'blog_artigos' && (
                <>
                  <div>
                    <Label>Tipo de postagem</Label>
                    <select
                      value={postSource}
                      onChange={(e) => setPostSource(e.target.value as 'site' | 'linkedin')}
                      className="w-full mt-1 rounded border px-3 py-2"
                    >
                      <option value="site">Conteúdo no site (escrever artigo aqui)</option>
                      <option value="linkedin">Apenas link do LinkedIn (card redireciona para o post)</option>
                    </select>
                  </div>
                  {postSource === 'linkedin' && (
                    <div>
                      <Label>URL do LinkedIn</Label>
                      <Input
                        type="url"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        placeholder="https://www.linkedin.com/..."
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">O card no blog abrirá este link ao clicar.</p>
                    </div>
                  )}
                </>
              )}
              <div>
                <Label>Título</Label>
                <Input value={titulo} onChange={handleTituloChange} required className="mt-1" />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="Gerado automaticamente a partir do título"
                  className="mt-1 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Gerado automaticamente ao digitar o título. Você pode editar manualmente.</p>
              </div>
              <div>
                <Label>Resumo (opcional)</Label>
                <textarea
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                  placeholder="Breve descrição para cards e listagens"
                  className="w-full mt-1 rounded border px-3 py-2 min-h-[60px] text-sm"
                />
              </div>
              {(type !== 'blog_artigos' || postSource === 'site') && (
              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <Label>Conteúdo</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleFormatWithAI}
                      disabled={formattingContent}
                    >
                      <Sparkles className="h-4 w-4 mr-1.5" />
                      {formattingContent ? 'Formatando...' : 'Formatar com IA'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewModalOpen(true)}
                    >
                      <Eye className="h-4 w-4 mr-1.5" />
                      Preview
                    </Button>
                  </div>
                </div>
                <textarea
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  placeholder="Digite o texto. Use &quot;Formatar com IA&quot; para converter em HTML responsivo."
                  className="w-full mt-1 rounded border px-3 py-2 min-h-[200px] font-mono text-sm"
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
                            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                            prose-ul:my-4 prose-ol:my-4 prose-li:my-1"
                          dangerouslySetInnerHTML={{
                            __html: (() => {
                              if (!conteudo) return '<p class="text-gray-400 italic">Nenhum conteúdo para visualizar.</p>';
                              if (/<[a-z][\s\S]*>/i.test(conteudo)) return conteudo;
                              const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                              return conteudo
                                .split(/\n\s*\n/)
                                .map((block) => block.trim())
                                .filter(Boolean)
                                .map((block) => `<p>${escape(block).replace(/\n/g, '<br />')}</p>`)
                                .join('');
                            })(),
                          }}
                        />
                      </div>
                    </article>
                  </div>
                </DialogContent>
              </Dialog>
              <div>
                <Label>Imagem (URL ou upload)</Label>
                <Input value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} placeholder="URL ou envie arquivo" className="mt-1" />
                <input type="file" accept="image/*" className="mt-2 block" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'image')} />
              </div>
              <div>
                <Label>PDF (upload)</Label>
                <Input value={pdfPath} readOnly placeholder="Caminho após upload" className="mt-1 bg-gray-100" />
                <input type="file" accept="application/pdf" className="mt-2 block" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'pdf')} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {isNew ? 'Criar' : 'Salvar'}
                </Button>
                <Button type="button" variant="outline" asChild><Link to="/marketing">Cancelar</Link></Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
