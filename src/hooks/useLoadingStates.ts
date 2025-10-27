
import { useState, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

interface LoadingStates {
  [key: string]: LoadingState;
}

export const useLoadingStates = () => {
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});

  const setLoading = useCallback((key: string, state: LoadingState) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: state
    }));
  }, []);

  const startLoading = useCallback((key: string, message?: string) => {
    setLoading(key, { isLoading: true, message });
  }, [setLoading]);

  const updateProgress = useCallback((key: string, progress: number, message?: string) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        progress,
        message: message || prev[key]?.message
      }
    }));
  }, []);

  const finishLoading = useCallback((key: string) => {
    setLoadingStates(prev => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  }, []);

  const isLoading = useCallback((key: string) => {
    return loadingStates[key]?.isLoading || false;
  }, [loadingStates]);

  const getLoadingState = useCallback((key: string) => {
    return loadingStates[key];
  }, [loadingStates]);

  return {
    loadingStates,
    setLoading,
    startLoading,
    updateProgress,
    finishLoading,
    isLoading,
    getLoadingState
  };
};
