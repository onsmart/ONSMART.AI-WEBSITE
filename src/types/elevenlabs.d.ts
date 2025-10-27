declare global {
  interface Window {
    elevenLabsConvAI: {
      init: (config: {
        agentId: string;
        onMessage?: (message: any) => void;
        onError?: (error: any) => void;
        autoStart?: boolean;
        showUI?: boolean;
        language?: string;
        voiceSettings?: {
          stability: number;
          similarityBoost: number;
          style: number;
          useSpeakerBoost: boolean;
        };
        audioSettings?: {
          outputFormat: string;
          inputFormat: string;
          sampleRate: number;
        };
      }) => {
        startCall?: () => void;
        endCall?: () => void;
        toggleMute?: () => void;
        destroy?: () => void;
      };
    };
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export {};
