
// Service Worker Configuration
export const CACHE_CONFIG = {
  CACHE_NAME: 'onsmart-ai-v4',
  STATIC_CACHE_NAME: 'static-v4',
  DYNAMIC_CACHE_NAME: 'dynamic-v4'
};

export const CRITICAL_ASSETS = [
  '/',
  '/diagnostico',
  '/contato',
  '/servicos',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png'
];

export const DYNAMIC_ROUTES = [
  '/blog',
  '/conteudo',
  '/case-de-sucesso'
];
