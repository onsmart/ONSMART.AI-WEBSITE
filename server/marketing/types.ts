/**
 * Marketing area types.
 * Content type: blog_artigos | ferramentas | materiais_gratuitos (sem cases no site).
 */

export type MarketingContentType = 'blog_artigos' | 'ferramentas' | 'materiais_gratuitos';

export type MarketingContentStatus = 'draft' | 'published';

export interface MarketingUser {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

export interface MarketingContent {
  id: string;
  type: MarketingContentType;
  status: MarketingContentStatus;
  slug: string;
  titulo: string;
  resumo: string | null;
  conteudo: string | null;
  imagem_url: string | null;
  pdf_path: string | null;
  meta: Record<string, unknown> | null;
  post_source: 'site' | 'linkedin';
  external_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MarketingContentInsert {
  type: MarketingContentType;
  status?: MarketingContentStatus;
  slug: string;
  titulo: string;
  resumo?: string | null;
  conteudo?: string | null;
  imagem_url?: string | null;
  pdf_path?: string | null;
  meta?: Record<string, unknown> | null;
  post_source?: 'site' | 'linkedin';
  external_url?: string | null;
}

export interface MarketingContentUpdate {
  type?: MarketingContentType;
  status?: MarketingContentStatus;
  slug?: string;
  titulo?: string;
  resumo?: string | null;
  conteudo?: string | null;
  imagem_url?: string | null;
  pdf_path?: string | null;
  meta?: Record<string, unknown> | null;
  post_source?: 'site' | 'linkedin';
  external_url?: string | null;
}
