/**
 * Sanitization for slugs, URLs, rich text and file names.
 */
export function sanitizeSlug(slug) {
    return slug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-_]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'post';
}
export function sanitizeFileName(name) {
    return name
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/_+/g, '_')
        .substring(0, 200) || 'file';
}
export function sanitizeUrl(url) {
    try {
        const u = new URL(url);
        return u.origin + u.pathname;
    }
    catch {
        return '';
    }
}
/** Strip dangerous tags from HTML; keep safe structure. */
export function sanitizeRichText(html) {
    if (!html || typeof html !== 'string')
        return '';
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '');
}
