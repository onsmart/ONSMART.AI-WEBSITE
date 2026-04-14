/**
 * Lê planilhas públicas do Google (mesmas URLs do sync) para listagem no site
 * quando o Supabase não está configurado ou a lista principal vem vazia / falha.
 */
import { sanitizeSlug } from './sanitize.js';
export const DEFAULT_BLOG_SHEET_ID = '1GPgJ2wETkmEjZtJAxs1s8i2wnjjBdNSiykv-Hn-sbJ4';
export const DEFAULT_EBOOKS_SHEET_ID = '1VjjagCCY-UmkmSn__nZ6pw_Oejsx6Idc_i43AcYEfqg';
export async function fetchMarketingSheetJson(sheetId) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq=select *`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok)
        throw new Error('Falha ao acessar a planilha');
    const text = await res.text();
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    if (jsonStart < 0 || jsonEnd <= jsonStart)
        throw new Error('Resposta inválida da planilha');
    return JSON.parse(text.slice(jsonStart, jsonEnd));
}
function nowIso() {
    return new Date().toISOString();
}
export async function getPublicBlogRowsFromSheet() {
    try {
        const sheetId = process.env.MARKETING_GOOGLE_SHEET_ID || DEFAULT_BLOG_SHEET_ID;
        const data = await fetchMarketingSheetJson(sheetId);
        const tableRows = data.table?.rows?.slice(1) ?? [];
        const rows = [];
        const t = nowIso();
        for (const r of tableRows) {
            const title = (r.c?.[0]?.v ?? '').toString().trim();
            const image = (r.c?.[1]?.v ?? '').toString().trim() || null;
            const link = (r.c?.[2]?.v ?? '').toString().trim() || null;
            const description = (r.c?.[3]?.v ?? '').toString().trim() || null;
            if (!title || title === 'TÍTULO')
                continue;
            const slug = sanitizeSlug(title);
            rows.push({
                id: `sheet-${slug}`,
                type: 'blog_artigos',
                status: 'published',
                slug,
                titulo: title,
                resumo: description,
                conteudo: null,
                imagem_url: image,
                pdf_path: null,
                meta: null,
                post_source: 'linkedin',
                external_url: link,
                created_at: t,
                updated_at: t,
            });
        }
        return { rows, total: rows.length };
    }
    catch (e) {
        console.error('[marketing] getPublicBlogRowsFromSheet:', e);
        return { rows: [], total: 0 };
    }
}
export async function getPublicEbooksRowsFromSheet() {
    try {
        const sheetId = process.env.MARKETING_EBOOKS_SHEET_ID || DEFAULT_EBOOKS_SHEET_ID;
        const data = await fetchMarketingSheetJson(sheetId);
        const tableRows = data.table?.rows?.slice(1) ?? [];
        const rows = [];
        const t = nowIso();
        for (const r of tableRows) {
            const title = (r.c?.[0]?.v ?? '').toString().trim();
            const image = (r.c?.[1]?.v ?? '').toString().trim() || null;
            const description = (r.c?.[2]?.v ?? '').toString().trim() || null;
            const link = (r.c?.[3]?.v ?? '').toString().trim() || null;
            if (!title || title === 'TÍTULO')
                continue;
            const slug = 'ebook-' + sanitizeSlug(title);
            rows.push({
                id: `sheet-${slug}`,
                type: 'materiais_gratuitos',
                status: 'published',
                slug,
                titulo: title,
                resumo: description,
                conteudo: null,
                imagem_url: image,
                pdf_path: null,
                meta: null,
                post_source: 'site',
                external_url: link,
                created_at: t,
                updated_at: t,
            });
        }
        return { rows, total: rows.length };
    }
    catch (e) {
        console.error('[marketing] getPublicEbooksRowsFromSheet:', e);
        return { rows: [], total: 0 };
    }
}
