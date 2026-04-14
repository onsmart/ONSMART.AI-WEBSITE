// Prevent event bubbling for the dropdown content
export const handleContentClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

// Check if the content section is active
export const isConteudoActive = (pathname: string) =>
  pathname === "/conteudo" ||
  pathname === "/blog" ||
  pathname === "/materiais-gratuitos" ||
  pathname === "/ferramentas-gratuitas" ||
  pathname.startsWith("/ferramentas/") ||
  pathname === "/glossario";

// Check if services section is active
export const isServicosActive = (pathname: string) => 
  pathname === "/servicos" || 
  pathname.startsWith("/servicos/");

// Check if home is active - only when path is exactly "/"
export const isHomeActive = (pathname: string) => pathname === "/";

// Check if contact is active
export const isContatoActive = (pathname: string) => pathname === "/contato";

// Check if sectors section is active
export const isSetoresActive = (pathname: string) => pathname === "/setores" || pathname.startsWith("/setores/");

// Check if products section is active
export const isProdutosActive = (pathname: string) => 
  pathname === "/agentes-ia" || 
  pathname === "/ecossistema-ibm" || 
  pathname.startsWith("/produtos/");