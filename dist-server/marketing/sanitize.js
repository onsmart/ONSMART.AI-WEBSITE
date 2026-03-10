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
/** Strip dangerous tags from HTML; keep safe structure. Allows safe inline styles. */
const SAFE_CSS_PROPERTIES = new Set([
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'line-height', 'color', 'font-size', 'font-weight', 'font-style',
    'text-align', 'letter-spacing', 'word-spacing',
    'border', 'border-bottom', 'border-top', 'border-color', 'border-width',
    'max-width', 'width',
]);
const UNSAFE_CSS_PATTERN = /url\s*\(|expression\s*\(|behavior\s*:|javascript\s*:/gi;
function sanitizeStyleValue(value) {
    if (!value || typeof value !== 'string')
        return '';
    return value.replace(UNSAFE_CSS_PATTERN, '').trim();
}
function sanitizeStyleAttribute(style) {
    if (!style || typeof style !== 'string')
        return '';
    const declarations = style.split(';').filter(Boolean);
    const safe = [];
    for (const decl of declarations) {
        const colon = decl.indexOf(':');
        if (colon === -1)
            continue;
        const prop = decl.slice(0, colon).trim().toLowerCase();
        const value = sanitizeStyleValue(decl.slice(colon + 1).trim());
        if (SAFE_CSS_PROPERTIES.has(prop) && value)
            safe.push(`${prop}: ${value}`);
    }
    return safe.join('; ');
}
export function sanitizeRichText(html) {
    if (!html || typeof html !== 'string')
        return '';
    let out = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '');
    // Sanitize style attributes: only allow safe CSS properties
    out = out.replace(/\s*style\s*=\s*["']([^"']*)["']/gi, (_, content) => {
        const cleaned = sanitizeStyleAttribute(content);
        return cleaned ? ` style="${cleaned}"` : '';
    });
    return out;
}
