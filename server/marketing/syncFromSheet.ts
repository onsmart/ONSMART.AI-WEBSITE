/**
 * Sync blog articles and e-books from Google Sheets into marketing_contents.
 * Run on server start when MARKETING_BACKFILL_FROM_SITE=true so content is persisted for edição.
 */

import { createMarketingContent, getMarketingContentById, getMarketingContentIdBySlug, updateMarketingContent } from './db.js';
import { sanitizeSlug } from './sanitize.js';
import {
  DEFAULT_BLOG_SHEET_ID,
  DEFAULT_EBOOKS_SHEET_ID,
  fetchMarketingSheetJson,
} from './sheetPublicList.js';

/** Sync blog/artigos LinkedIn da planilha → marketing_contents type blog_artigos */
export async function syncBlogFromSheet(): Promise<{ created: number; updated: number }> {
  const sheetId = process.env.MARKETING_GOOGLE_SHEET_ID || DEFAULT_BLOG_SHEET_ID;
  const data = await fetchMarketingSheetJson(sheetId);
  const rows = data.table?.rows?.slice(1) ?? [];
  let created = 0;
  let updated = 0;

  for (const r of rows) {
    const title = (r.c?.[0]?.v ?? '').toString().trim();
    const image = (r.c?.[1]?.v ?? '').toString().trim() || null;
    const link = (r.c?.[2]?.v ?? '').toString().trim() || null;
    const description = (r.c?.[3]?.v ?? '').toString().trim() || null;
    if (!title) continue;

    const slug = sanitizeSlug(title);
    const existingId = await getMarketingContentIdBySlug(slug);

    if (existingId) {
      const existing = await getMarketingContentById(existingId);
      const changed =
        !existing ||
        existing.titulo !== title ||
        (existing.resumo ?? null) !== description ||
        (existing.imagem_url ?? null) !== image ||
        (existing.external_url ?? null) !== link;
      if (changed) {
        const ok = await updateMarketingContent(existingId, {
          titulo: title,
          resumo: description,
          imagem_url: image,
          post_source: 'linkedin',
          external_url: link,
        });
        if (ok) updated++;
      }
    } else {
      const createdRow = await createMarketingContent({
        type: 'blog_artigos',
        status: 'published',
        slug,
        titulo: title,
        resumo: description,
        imagem_url: image,
        post_source: 'linkedin',
        external_url: link,
      });
      if (createdRow) created++;
    }
  }

  return { created, updated };
}

/** Sync e-books da planilha → marketing_contents type materiais_gratuitos. Slug com prefixo ebook- para não colidir com blog. */
export async function syncEbooksFromSheet(): Promise<{ created: number; updated: number }> {
  const sheetId = process.env.MARKETING_EBOOKS_SHEET_ID || DEFAULT_EBOOKS_SHEET_ID;
  const data = await fetchMarketingSheetJson(sheetId);
  const rows = data.table?.rows?.slice(1) ?? [];
  let created = 0;
  let updated = 0;

  for (const r of rows) {
    const title = (r.c?.[0]?.v ?? '').toString().trim();
    const image = (r.c?.[1]?.v ?? '').toString().trim() || null;
    const description = (r.c?.[2]?.v ?? '').toString().trim() || null;
    const link = (r.c?.[3]?.v ?? '').toString().trim() || null;
    if (!title) continue;

    const slug = 'ebook-' + sanitizeSlug(title);
    const existingId = await getMarketingContentIdBySlug(slug);

    if (existingId) {
      const existing = await getMarketingContentById(existingId);
      const changed =
        !existing ||
        existing.titulo !== title ||
        (existing.resumo ?? null) !== description ||
        (existing.imagem_url ?? null) !== image ||
        (existing.external_url ?? null) !== link;
      if (changed) {
        const ok = await updateMarketingContent(existingId, {
          titulo: title,
          resumo: description,
          imagem_url: image,
          external_url: link,
        });
        if (ok) updated++;
      }
    } else {
      const createdRow = await createMarketingContent({
        type: 'materiais_gratuitos',
        status: 'published',
        slug,
        titulo: title,
        resumo: description,
        imagem_url: image,
        external_url: link,
      });
      if (createdRow) created++;
    }
  }

  return { created, updated };
}
