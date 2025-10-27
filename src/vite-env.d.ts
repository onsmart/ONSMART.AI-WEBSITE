/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_MODEL: string
  readonly VITE_OPENAI_TEMPERATURE: string
  readonly VITE_OPENAI_MAX_TOKENS: string
  readonly VITE_COMPANY_PHONE: string
  readonly VITE_COMPANY_EMAIL: string
  readonly VITE_COMPANY_NAME: string
  readonly VITE_CALENDLY_URL: string
  readonly VITE_YOUTUBE_API_KEY: string
  readonly VITE_GOOGLE_PAGESPEED_API_KEY: string
  readonly VITE_ELEVENLABS_API_KEY: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}