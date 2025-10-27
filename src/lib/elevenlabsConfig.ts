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

// Função para verificar se o ElevenLabs está disponível
export const isElevenLabsAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.elevenLabsConvAI;
};

// Função para carregar o script do ElevenLabs
export const loadElevenLabsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('Checking if ElevenLabs is already available...');
    
    if (isElevenLabsAvailable()) {
      console.log('ElevenLabs already available');
      resolve();
      return;
    }

    // Verificar se algum script já está sendo carregado
    const existingScript = document.querySelector('script[src*="elevenlabs"]');
    if (existingScript) {
      console.log('ElevenLabs script already exists, waiting for load...');
      existingScript.addEventListener('load', () => {
        console.log('Existing ElevenLabs script loaded');
        // Aguardar um pouco para o objeto estar disponível
        setTimeout(() => {
          if (isElevenLabsAvailable()) {
            resolve();
          } else {
            console.log('ElevenLabs script loaded but object not available, will use Web Speech API');
            reject(new Error('ElevenLabs script loaded but object not available'));
          }
        }, 2000);
      });
      existingScript.addEventListener('error', () => {
        console.error('Existing ElevenLabs script failed to load');
        reject(new Error('Failed to load ElevenLabs script'));
      });
      return;
    }

    // Tentar carregar apenas uma vez para evitar conflitos
    const scriptUrl = ELEVENLABS_CONFIG.scriptUrls[0]; // Usar apenas a primeira URL
    console.log(`Trying to load ElevenLabs script from: ${scriptUrl}`);
    
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      console.log(`ElevenLabs script loaded successfully from: ${scriptUrl}`);
      // Aguardar um pouco para o objeto estar disponível
      setTimeout(() => {
        if (isElevenLabsAvailable()) {
          resolve();
        } else {
          console.log('Script loaded but ElevenLabs object not available, will use Web Speech API');
          reject(new Error('ElevenLabs script loaded but object not available'));
        }
      }, 3000);
    };
    
    script.onerror = () => {
      console.error(`Failed to load ElevenLabs script from: ${scriptUrl}`);
      reject(new Error('Failed to load ElevenLabs script'));
    };
    
    document.head.appendChild(script);
  });
};
