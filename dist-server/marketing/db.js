/**
 * Supabase (service role) access for marketing_users and marketing_contents.
 * Single admin client; never expose service role on the client.
 * Use SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in production so data persists on deploy.
 */
import { createClient } from '@supabase/supabase-js';
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = url && key
    ? createClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
    })
    : null;
// --- marketing_users ---
export async function getMarketingUserByEmail(email) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin
        .from('marketing_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .single();
    if (error || !data)
        return null;
    return data;
}
export async function getMarketingUserById(id) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin
        .from('marketing_users')
        .select('*')
        .eq('id', id)
        .single();
    if (error || !data)
        return null;
    return data;
}
export async function createMarketingUser(email, passwordHash, name) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin
        .from('marketing_users')
        .insert({
        email: email.toLowerCase().trim(),
        password_hash: passwordHash,
        name: name ?? null,
    })
        .select()
        .single();
    if (error)
        return null;
    return data;
}
export async function updateMarketingUser(id, updates) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin
        .from('marketing_users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
    if (error)
        return null;
    return data;
}
// --- marketing_contents ---
const CONTENT_TYPES = ['blog_artigos', 'ferramentas', 'materiais_gratuitos', 'cases'];
export async function listMarketingContent(options) {
    if (!supabaseAdmin)
        return { rows: [], total: 0 };
    let q = supabaseAdmin.from('marketing_contents').select('*', { count: 'exact' });
    if (options.type && CONTENT_TYPES.includes(options.type)) {
        q = q.eq('type', options.type);
    }
    if (options.status != null && options.status !== '') {
        q = q.eq('status', options.status);
    }
    if (options.search && options.search.trim()) {
        q = q.or(`titulo.ilike.%${options.search.trim()}%,resumo.ilike.%${options.search.trim()}%`);
    }
    q = q.order('created_at', { ascending: false });
    const limit = Math.min(Math.max(Number(options.limit) || 20, 1), 100);
    const offset = options.offset != null
        ? Math.max(Number(options.offset), 0)
        : options.page != null
            ? Math.max((Number(options.page) - 1) * limit, 0)
            : 0;
    q = q.range(offset, offset + limit - 1);
    const { data, error, count } = await q;
    if (error)
        return { rows: [], total: 0 };
    return { rows: (data || []), total: count ?? 0 };
}
export async function getMarketingContentById(id) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin.from('marketing_contents').select('*').eq('id', id).single();
    if (error || !data)
        return null;
    return data;
}
export async function getMarketingContentBySlug(slug) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin.from('marketing_contents').select('*').eq('slug', slug).eq('status', 'published').single();
    if (error || !data)
        return null;
    return data;
}
/** Check if slug exists (any status) - for backfill / uniqueness. */
export async function getMarketingContentIdBySlug(slug) {
    if (!supabaseAdmin)
        return null;
    const { data } = await supabaseAdmin.from('marketing_contents').select('id').eq('slug', slug).limit(1).single();
    return data?.id ?? null;
}
export async function getMarketingContentBySlugAllStatus(slug) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin.from('marketing_contents').select('*').eq('slug', slug).single();
    if (error || !data)
        return null;
    return data;
}
export async function createMarketingContent(input) {
    if (!supabaseAdmin)
        return null;
    const data = {
        type: input.type,
        status: input.status ?? 'draft',
        slug: input.slug,
        titulo: input.titulo,
        resumo: input.resumo ?? null,
        conteudo: input.conteudo ?? null,
        imagem_url: input.imagem_url ?? null,
        pdf_path: input.pdf_path ?? null,
        meta: input.meta ?? null,
        post_source: input.post_source ?? 'site',
        external_url: input.external_url ?? null,
    };
    const { data: result, error } = await supabaseAdmin
        .from('marketing_contents')
        .insert(data)
        .select()
        .single();
    if (error)
        return null;
    return result;
}
export async function updateMarketingContent(id, input) {
    if (!supabaseAdmin)
        return null;
    const { data, error } = await supabaseAdmin
        .from('marketing_contents')
        .update({
        ...input,
        updated_at: new Date().toISOString(),
    })
        .eq('id', id)
        .select()
        .single();
    if (error)
        return null;
    return data;
}
export async function deleteMarketingContent(id) {
    if (!supabaseAdmin)
        return false;
    const { error } = await supabaseAdmin.from('marketing_contents').delete().eq('id', id);
    return !error;
}
export async function isSlugTaken(slug, excludeId) {
    if (!supabaseAdmin)
        return false;
    let q = supabaseAdmin.from('marketing_contents').select('id').eq('slug', slug);
    if (excludeId)
        q = q.neq('id', excludeId);
    const { data } = await q.limit(1);
    return (data?.length ?? 0) > 0;
}
