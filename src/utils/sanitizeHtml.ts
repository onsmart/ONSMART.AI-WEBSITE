import DOMPurify from "dompurify";

/**
 * Configuração segura para HTML de conteúdo (blog, marketing, i18n).
 * Permite tags de formatação e links; remove script, evento, etc.
 */
const RICH_TEXT_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [
    "p", "br", "strong", "b", "em", "i", "u", "a", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "h5", "h6", "span", "div", "blockquote",
    "code", "pre", "sub", "sup", "hr",
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class"],
  ADD_ATTR: ["target"],
};

/**
 * Sanitiza HTML para exibição segura (evita XSS em conteúdo de terceiros ou CMS).
 * Use em todo __html passado para dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html: string): string {
  if (typeof html !== "string" || !html.trim()) return "";
  return DOMPurify.sanitize(html, RICH_TEXT_CONFIG);
}
