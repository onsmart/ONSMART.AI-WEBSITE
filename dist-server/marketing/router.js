/**
 * Marketing tRPC router: auth, content (CRUD + upload + sendPdfByEmail), public.
 */
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, marketingProcedure } from '../_core/trpc.js';
import { getMarketingUserByEmail, getMarketingUserById, } from './db.js';
import { signMarketingAccessToken, signMarketingRefreshToken, verifyMarketingToken, revokeMarketingToken, } from './jwt.js';
import { setMarketingCookies, clearMarketingCookies } from './cookies.js';
import { listMarketingContent, getMarketingContentById, getMarketingContentBySlug, getMarketingContentBySlugAllStatus, createMarketingContent, updateMarketingContent, deleteMarketingContent, isSlugTaken, } from './db.js';
import { uploadMarketingFile, getPublicUrl, getSignedUrl, downloadMarketingFile, fetchFileFromUrl } from './storage.js';
import { sanitizeSlug, sanitizeRichText } from './sanitize.js';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { addOrUpdateMailchimpLead } from './mailchimp.js';
import { addOrUpdateHubSpotContact } from './hubspot.js';
const resendApiKey = process.env.RESEND_API_KEY;
const resendSender = process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev';
/** Fetch YouTube video title and thumbnail via oEmbed (no API key). */
async function fetchYouTubeMeta(videoUrl) {
    try {
        const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok)
            return null;
        const data = (await res.json());
        if (data?.title && data?.thumbnail_url) {
            return { video_title: data.title, video_thumbnail_url: data.thumbnail_url };
        }
        return null;
    }
    catch {
        return null;
    }
}
const contentTypeSchema = z.enum(['blog_artigos', 'ferramentas', 'materiais_gratuitos', 'cases']);
const statusSchema = z.enum(['draft', 'published']);
const slugSchema = z.string().min(1).regex(/^[a-z0-9-_]+$/, 'Slug: apenas letras minúsculas, números, hífen e underscore');
const optionalUrlOrEmptySchema = z
    .union([z.literal(''), z.string().url().max(2000)])
    .optional()
    .nullable();
export const marketingRouter = router({
    auth: router({
        login: publicProcedure
            .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
            .mutation(async ({ ctx, input }) => {
            const user = await getMarketingUserByEmail(input.email);
            if (!user)
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Credenciais inválidas' });
            const ok = await bcrypt.compare(input.password, user.password_hash);
            if (!ok)
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Credenciais inválidas' });
            const jtiAccess = crypto.randomUUID();
            const jtiRefresh = crypto.randomUUID();
            const accessToken = await signMarketingAccessToken({
                sub: user.id,
                email: user.email,
                jti: jtiAccess,
            });
            const refreshToken = await signMarketingRefreshToken({ sub: user.id, jti: jtiRefresh });
            const res = ctx.res;
            if (res && typeof res.setHeader === 'function') {
                setMarketingCookies(res, accessToken, refreshToken);
            }
            return {
                user: { id: user.id, email: user.email, name: user.name },
            };
        }),
        logout: publicProcedure.mutation(async ({ ctx }) => {
            const req = ctx.req;
            const cookieHeader = req.headers?.cookie;
            let refreshToken = null;
            if (cookieHeader) {
                const m = cookieHeader.match(/marketing_refresh=([^;]+)/);
                if (m)
                    refreshToken = decodeURIComponent(m[1]);
            }
            if (refreshToken) {
                const payload = await verifyMarketingToken(refreshToken);
                if (payload)
                    revokeMarketingToken(payload.jti, payload.exp);
            }
            const res = ctx.res;
            if (res && typeof res.setHeader === 'function') {
                clearMarketingCookies(res);
            }
            return { ok: true };
        }),
        refresh: publicProcedure.mutation(async ({ ctx }) => {
            const req = ctx.req;
            const cookieHeader = req.headers?.cookie;
            let refreshToken = null;
            if (cookieHeader) {
                const m = cookieHeader.match(/marketing_refresh=([^;]+)/);
                if (m)
                    refreshToken = decodeURIComponent(m[1]);
            }
            if (!refreshToken)
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'No refresh token' });
            const payload = await verifyMarketingToken(refreshToken);
            if (!payload)
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid refresh token' });
            const user = await getMarketingUserById(payload.sub);
            if (!user)
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'User not found' });
            const jtiAccess = crypto.randomUUID();
            const jtiRefresh = crypto.randomUUID();
            const accessToken = await signMarketingAccessToken({
                sub: user.id,
                email: user.email,
                jti: jtiAccess,
            });
            const newRefreshToken = await signMarketingRefreshToken({ sub: user.id, jti: jtiRefresh });
            revokeMarketingToken(payload.jti, payload.exp);
            const res = ctx.res;
            if (res && typeof res.setHeader === 'function') {
                setMarketingCookies(res, accessToken, newRefreshToken);
            }
            return {
                user: { id: user.id, email: user.email, name: user.name },
            };
        }),
        me: publicProcedure.query(async ({ ctx }) => {
            return ctx.marketingUser;
        }),
    }),
    content: router({
        list: marketingProcedure
            .input(z.object({
            type: z.string().optional(),
            status: z.string().optional(),
            search: z.string().optional(),
            page: z.number().min(1).optional(),
            limit: z.number().min(1).max(100).optional(),
            offset: z.number().min(0).optional(),
        }))
            .query(async ({ input }) => {
            return listMarketingContent({
                type: input.type,
                status: input.status,
                search: input.search,
                page: input.page,
                limit: input.limit,
                offset: input.offset,
            });
        }),
        getById: marketingProcedure.input(z.string().uuid()).query(async ({ input }) => {
            const row = await getMarketingContentById(input);
            if (!row)
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Content not found' });
            return row;
        }),
        getBySlug: marketingProcedure.input(z.string()).query(async ({ input }) => {
            const row = await getMarketingContentBySlugAllStatus(input);
            if (!row)
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Content not found' });
            return row;
        }),
        create: marketingProcedure
            .input(z.object({
            type: contentTypeSchema,
            status: statusSchema.optional(),
            slug: slugSchema,
            titulo: z.string().min(1),
            resumo: z.string().max(500).nullable().optional(),
            conteudo: z.string().max(50_000).nullable().optional(),
            imagem_url: optionalUrlOrEmptySchema,
            pdf_path: z.string().max(2000).nullable().optional(),
            meta: z.record(z.unknown()).nullable().optional(),
            post_source: z.enum(['site', 'linkedin', 'youtube']).optional(),
            external_url: z.string().url().nullable().optional(),
        }))
            .mutation(async ({ input }) => {
            const slug = sanitizeSlug(input.slug);
            if (!/^[a-z0-9-_]+$/.test(slug)) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Slug deve conter apenas letras minúsculas, números, hífen e underscore' });
            }
            if (await isSlugTaken(slug)) {
                throw new TRPCError({ code: 'CONFLICT', message: 'Slug already in use' });
            }
            let meta = input.meta ?? null;
            const postSource = input.post_source ?? 'site';
            const externalUrl = input.external_url ?? null;
            let titulo = input.titulo;
            if (postSource === 'youtube' && externalUrl && /youtube\.com|youtu\.be/i.test(externalUrl)) {
                const videoMeta = await fetchYouTubeMeta(externalUrl);
                if (videoMeta) {
                    meta = { ...(meta ?? {}), ...videoMeta };
                    titulo = videoMeta.video_title;
                }
            }
            const created = await createMarketingContent({
                type: input.type,
                status: input.status,
                slug,
                titulo,
                resumo: input.resumo ?? null,
                conteudo: input.conteudo ? sanitizeRichText(input.conteudo) : null,
                imagem_url: input.imagem_url ?? null,
                pdf_path: input.pdf_path ?? null,
                meta,
                post_source: postSource,
                external_url: externalUrl,
            });
            if (!created)
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Create failed' });
            return created;
        }),
        update: marketingProcedure
            .input(z.object({
            id: z.string().uuid(),
            type: contentTypeSchema.optional(),
            status: statusSchema.optional(),
            slug: slugSchema.optional(),
            titulo: z.string().min(1).optional(),
            resumo: z.string().max(500).nullable().optional(),
            conteudo: z.string().max(50_000).nullable().optional(),
            imagem_url: optionalUrlOrEmptySchema,
            pdf_path: z.string().max(2000).nullable().optional(),
            meta: z.record(z.unknown()).nullable().optional(),
            post_source: z.enum(['site', 'linkedin', 'youtube']).optional(),
            external_url: z.string().url().nullable().optional(),
        }))
            .mutation(async ({ input }) => {
            const { id, ...rest } = input;
            const slug = rest.slug !== undefined ? sanitizeSlug(rest.slug) : undefined;
            if (slug !== undefined && !/^[a-z0-9-_]+$/.test(slug)) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Slug deve conter apenas letras minúsculas, números, hífen e underscore' });
            }
            if (rest.slug !== undefined && (await isSlugTaken(slug, id))) {
                throw new TRPCError({ code: 'CONFLICT', message: 'Slug already in use' });
            }
            let meta = rest.meta;
            let titulo = rest.titulo;
            if (rest.post_source === 'youtube' && rest.external_url && /youtube\.com|youtu\.be/i.test(rest.external_url)) {
                const videoMeta = await fetchYouTubeMeta(rest.external_url);
                if (videoMeta) {
                    meta = { ...(rest.meta ?? {}), ...videoMeta };
                    titulo = videoMeta.video_title;
                }
            }
            const updated = await updateMarketingContent(id, {
                ...rest,
                meta,
                titulo,
                slug,
                conteudo: rest.conteudo !== undefined ? (rest.conteudo ? sanitizeRichText(rest.conteudo) : null) : undefined,
            });
            if (!updated)
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Content not found' });
            return updated;
        }),
        delete: marketingProcedure.input(z.string().uuid()).mutation(async ({ input }) => {
            const ok = await deleteMarketingContent(input);
            if (!ok)
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Content not found' });
            return { ok: true };
        }),
        upload: marketingProcedure
            .input(z.object({
            bucket: z.enum(['pdf', 'image']),
            path: z.string().min(1),
            base64: z.string(),
            contentType: z.string(),
        }))
            .mutation(async ({ input }) => {
            const buf = Buffer.from(input.base64, 'base64');
            const bucket = input.bucket;
            const { path: uploadedPath, error } = await uploadMarketingFile(bucket, input.path, buf, input.contentType);
            if (error)
                throw new TRPCError({ code: 'BAD_REQUEST', message: error });
            const url = bucket === 'image' ? getPublicUrl(bucket, uploadedPath) : await getSignedUrl(bucket, uploadedPath);
            return { path: uploadedPath, url };
        }),
        sendPdfByEmail: publicProcedure
            .input(z.object({
            slug: z.string().min(1),
            nomeCompleto: z.string().min(2, 'Nome completo obrigatório'),
            email: z.string().email(),
            telefone: z.string().min(8, 'Telefone obrigatório'),
        }))
            .mutation(async ({ input }) => {
            const content = await getMarketingContentBySlug(input.slug);
            if (!content) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Conteúdo não encontrado' });
            }
            const allowedTypes = ['ferramentas', 'materiais_gratuitos'];
            if (!allowedTypes.includes(content.type)) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Este conteúdo não permite envio por email' });
            }
            if (content.status !== 'published') {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Conteúdo não encontrado' });
            }
            let attachment = null;
            if (content.pdf_path) {
                attachment = await downloadMarketingFile('pdf', content.pdf_path);
                if (!attachment) {
                    attachment = await fetchFileFromUrl(await getSignedUrl('pdf', content.pdf_path, 3600));
                }
            }
            if (!attachment && content.imagem_url) {
                const url = content.imagem_url;
                const supabaseMatch = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)/);
                if (supabaseMatch) {
                    const [, bucketName, path] = supabaseMatch;
                    const bucket = bucketName === 'marketing-pdfs' ? 'pdf' : 'image';
                    attachment = await downloadMarketingFile(bucket, path);
                }
                if (!attachment) {
                    attachment = await fetchFileFromUrl(url);
                }
            }
            if (!attachment) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Nenhum arquivo (PDF ou imagem) disponível para envio' });
            }
            if (!resendApiKey) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'E-mail não configurado' });
            }
            const resendSenderName = process.env.RESEND_SENDER_NAME || 'OnSmart';
            const resend = new Resend(resendApiKey);
            const isPdf = attachment.contentType === 'application/pdf';
            const subject = isPdf
                ? `📎 ${content.titulo} - ${resendSenderName}`
                : `🖼️ ${content.titulo} - ${resendSenderName}`;
            const bodyHtml = `<p>Olá ${input.nomeCompleto},</p><p>Segue em anexo o material "<strong>${content.titulo}</strong>".</p><p>O arquivo está anexado a este e-mail.</p><p>Equipe ${resendSenderName}</p>`;
            await resend.emails.send({
                from: `${resendSenderName} <${resendSender}>`,
                to: input.email,
                subject,
                html: bodyHtml,
                attachments: [{ filename: attachment.filename, content: attachment.buffer.toString('base64') }],
            });
            const nameParts = input.nomeCompleto.trim().split(/\s+/);
            const firstName = nameParts[0] || input.nomeCompleto;
            const lastName = nameParts.slice(1).join(' ') || '';
            const contentTypeLabel = content.type === 'ferramentas' ? 'Ferramentas' : 'Materiais Gratuitos';
            const tagBaixou = `Baixou: ${content.titulo}`;
            const mailchimpResult = await addOrUpdateMailchimpLead({
                email: input.email,
                firstName,
                lastName,
                phone: input.telefone,
                tags: [contentTypeLabel, tagBaixou],
            });
            if (!mailchimpResult.ok) {
                console.error('[sendPdfByEmail] Mailchimp:', mailchimpResult.error);
            }
            const hubspotResult = await addOrUpdateHubSpotContact({
                email: input.email,
                firstName,
                lastName,
                phone: input.telefone,
                note: `${contentTypeLabel} baixado: ${content.titulo}`,
            });
            if (!hubspotResult.ok) {
                console.error('[sendPdfByEmail] HubSpot:', hubspotResult.error);
            }
            return { success: true };
        }),
    }),
    youtube: router({
        fetchMeta: marketingProcedure
            .input(z.object({ url: z.string().url() }))
            .query(async ({ input }) => {
            if (!/youtube\.com|youtu\.be/i.test(input.url)) {
                return { video_title: null, video_thumbnail_url: null };
            }
            const meta = await fetchYouTubeMeta(input.url);
            return meta ?? { video_title: null, video_thumbnail_url: null };
        }),
    }),
    public: router({
        list: publicProcedure
            .input(z.object({
            type: z.string().optional(),
            search: z.string().optional(),
            page: z.number().min(1).optional(),
            limit: z.number().min(1).max(100).optional(),
            offset: z.number().min(0).optional(),
        }))
            .query(async ({ input }) => {
            return listMarketingContent({
                type: input.type,
                status: 'published',
                search: input.search,
                page: input.page,
                limit: input.limit,
                offset: input.offset,
            });
        }),
        getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
            const row = await getMarketingContentBySlug(input);
            if (!row)
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Content not found' });
            const pdfUrl = row.pdf_path ? await getSignedUrl('pdf', row.pdf_path, 3600) : null;
            return { ...row, pdfSignedUrl: pdfUrl };
        }),
    }),
});
