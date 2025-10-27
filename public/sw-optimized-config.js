
export const CACHE_CONFIG = {
  CACHE_NAME: 'onsmart-ai-v4',
  STATIC_CACHE_NAME: 'static-v4',
  DYNAMIC_CACHE_NAME: 'dynamic-v4',
  API_CACHE_NAME: 'api-v4'
};

export const CACHE_STRATEGIES = {
  CRITICAL: [
    '/',
    '/diagnostico',
    '/contato',
    '/static/js/bundle.js',
    '/static/css/main.css'
  ],
  IMAGES: [
    '/images/91fc510f-198e-415f-b2c6-af34fe41fa23.png'
  ],
  FONTS: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
};

export const CACHE_TTL = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 dias
  DYNAMIC: 24 * 60 * 60 * 1000, // 1 dia
  API: 5 * 60 * 1000, // 5 minutos
  IMAGES: 30 * 24 * 60 * 60 * 1000 // 30 dias
};
