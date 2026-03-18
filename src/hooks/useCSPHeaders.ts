
import { useEffect } from 'react';

interface CSPConfig {
  defaultSrc: string[];
  scriptSrc: string[];
  styleSrc: string[];
  imgSrc: string[];
  connectSrc: string[];
  fontSrc: string[];
  frameSrc: string[];
  mediaSrc: string[];
  objectSrc: string[];
  baseUri: string[];
  formAction: string[];
}

const defaultCSPConfig: CSPConfig = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Necessário para libs e widget ElevenLabs
    "'unsafe-eval'", // Necessário para libs e widget ElevenLabs
    "blob:", // Audio Worklets do ElevenLabs (rawAudioProcessor, etc.)
    "data:", // Worklets injetados como data:application/javascript;base64,...
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://static.hotjar.com",
    "https://script.hotjar.com",
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com",
    "https://cdn.jsdelivr.net"
  ],
  imgSrc: [
    "'self'",
    "data:",
    "blob:",
    "https:",
    "https://www.google-analytics.com",
    "https://static.hotjar.com"
  ],
  connectSrc: [
    "'self'",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://region1.google-analytics.com",
    "https://vc.hotjar.io",
    "https://in.hotjar.com",
    "https://api.elevenlabs.io",
    "https://api.us.elevenlabs.io",
    "wss:"
  ],
  fontSrc: [
    "'self'",
    "https://fonts.gstatic.com",
    "data:"
  ],
  frameSrc: [
    "'self'",
    "https://vars.hotjar.com",
    "https://www.google.com"
  ],
  mediaSrc: ["'self'"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"]
};

export const useCSPHeaders = (customConfig?: Partial<CSPConfig>) => {
  useEffect(() => {
    const config = { ...defaultCSPConfig, ...customConfig };
    
    const buildCSPString = (config: CSPConfig): string => {
      const directives = [
        `default-src ${config.defaultSrc.join(' ')}`,
        `script-src ${config.scriptSrc.join(' ')}`,
        `style-src ${config.styleSrc.join(' ')}`,
        `img-src ${config.imgSrc.join(' ')}`,
        `connect-src ${config.connectSrc.join(' ')}`,
        `font-src ${config.fontSrc.join(' ')}`,
        `frame-src ${config.frameSrc.join(' ')}`,
        `media-src ${config.mediaSrc.join(' ')}`,
        `object-src ${config.objectSrc.join(' ')}`,
        `base-uri ${config.baseUri.join(' ')}`,
        `form-action ${config.formAction.join(' ')}`
      ];
      
      return directives.join('; ');
    };

    const cspString = buildCSPString(config);

    // Aplicar CSP via meta tag (método mais compatível para SPAs)
    const existingMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', cspString);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Security-Policy');
      meta.setAttribute('content', cspString);
      document.head.appendChild(meta);
    }

    // Log para desenvolvimento
    if (import.meta.env.DEV) {
      console.log('CSP Headers aplicados:', cspString);
    }

    // Listener para violações de CSP
    const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
      console.warn('CSP Violation:', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        documentURI: event.documentURI
      });

      // Track violações no analytics se disponível
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'csp_violation', {
          blocked_uri: event.blockedURI,
          violated_directive: event.violatedDirective
        });
      }
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, [customConfig]);

  const updateCSP = (newConfig: Partial<CSPConfig>) => {
    // Trigger re-execution with new config
    window.location.reload();
  };

  return { updateCSP };
};
