// Configurações do ElevenLabs para a Sonia
export const ELEVENLABS_CONFIG = {
  // Usar o agentId correto (não a API key)
  agentId: 'agent_7601k62ynbm8fjgvmb54g6wdhxw1',
  // Tentar diferentes URLs possíveis para o script
  scriptUrls: [
    'https://unpkg.com/@elevenlabs/convai-widget-embed@latest',
    'https://unpkg.com/@elevenlabs/convai-widget-embed',
    'https://cdn.jsdelivr.net/npm/@elevenlabs/convai-widget-embed@latest'
  ],
  settings: {
    // Configurações para conversa em tempo real sem gravação
    autoStart: false,
    showUI: false,
    language: 'pt-BR',
    voiceSettings: {
      stability: 0.5,
      similarityBoost: 0.8,
      style: 0.0,
      useSpeakerBoost: true
    },
    // Configurações de áudio para melhor qualidade
    audioSettings: {
      outputFormat: 'pcm_16000',
      inputFormat: 'pcm_16000',
      sampleRate: 16000
    }
  }
};

/** Custom element do pacote @elevenlabs/convai-widget-embed (fluxo atual do site). */
export const isElevenLabsConvaiElementDefined = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return !!window.customElements?.get('elevenlabs-convai');
  } catch {
    return false;
  }
};

/** API legada (window.elevenLabsConvAI) ou widget por custom element. */
export const isElevenLabsAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!(window.elevenLabsConvAI && typeof window.elevenLabsConvAI.init === 'function') || isElevenLabsConvaiElementDefined();
};

/**
 * Garante que o script do widget exista e que o custom element `elevenlabs-convai` esteja registrado.
 * Usa polling com timeout (evita spinner infinito se CSP ou rede falharem).
 */
export const loadElevenLabsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('No window'));
      return;
    }
    if (isElevenLabsAvailable()) {
      resolve();
      return;
    }

    let pollId: ReturnType<typeof setInterval> | undefined;

    let scriptEl = document.querySelector('script[src*="elevenlabs"]') as HTMLScriptElement | null;
    if (!scriptEl) {
      const scriptUrl = ELEVENLABS_CONFIG.scriptUrls[0];
      console.log(`Carregando ElevenLabs convai: ${scriptUrl}`);
      scriptEl = document.createElement('script');
      scriptEl.src = scriptUrl;
      scriptEl.async = true;
      scriptEl.type = 'text/javascript';
      scriptEl.onerror = () => {
        if (pollId !== undefined) clearInterval(pollId);
        reject(new Error('Failed to load ElevenLabs script'));
      };
      document.head.appendChild(scriptEl);
    }

    const start = Date.now();
    const maxMs = 20000;
    pollId = window.setInterval(() => {
      if (isElevenLabsAvailable()) {
        if (pollId !== undefined) clearInterval(pollId);
        resolve();
      } else if (Date.now() - start > maxMs) {
        if (pollId !== undefined) clearInterval(pollId);
        reject(new Error('ElevenLabs convai widget timeout'));
      }
    }, 120);
  });
};
