import { useState, useCallback } from 'react';

interface VoiceCallState {
  isInCall: boolean;
  isMuted: boolean;
  isLoading: boolean;
}

export const useVoiceCall = () => {
  const [voiceState, setVoiceState] = useState<VoiceCallState>({
    isInCall: false,
    isMuted: false,
    isLoading: false
  });

  const startCall = useCallback(() => {
    setVoiceState(prev => ({
      ...prev,
      isInCall: true,
      isLoading: false
    }));
  }, []);

  const endCall = useCallback(() => {
    setVoiceState(prev => ({
      ...prev,
      isInCall: false,
      isMuted: false,
      isLoading: false
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setVoiceState(prev => ({
      ...prev,
      isMuted: !prev.isMuted
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setVoiceState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  return {
    ...voiceState,
    startCall,
    endCall,
    toggleMute,
    setLoading
  };
};
