import { useState, useCallback, useEffect } from 'react';

interface SoniaChatState {
  isOpen: boolean;
  isMinimized: boolean;
  chatMode: 'text' | 'voice';
}

interface SoniaChatActions {
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  setChatMode: (mode: 'text' | 'voice') => void;
}

let globalChatState: SoniaChatState = {
  isOpen: false,
  isMinimized: false,
  chatMode: 'text'
};

let listeners: Set<() => void> = new Set();

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const useSoniaChat = (): SoniaChatState & SoniaChatActions => {
  const [, forceUpdate] = useState({});

  const rerender = useCallback(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    listeners.add(rerender);
    return () => {
      listeners.delete(rerender);
    };
  }, [rerender]);

  const openChat = useCallback(() => {
    console.log('🟢 openChat chamado');
    globalChatState.isOpen = true;
    globalChatState.isMinimized = false;
    notifyListeners();
  }, []);

  const closeChat = useCallback(() => {
    console.log('🔴 closeChat chamado');
    globalChatState.isOpen = false;
    globalChatState.isMinimized = false;
    notifyListeners();
  }, []);

  const toggleChat = useCallback(() => {
    console.log('🟡 toggleChat chamado');
    globalChatState.isOpen = !globalChatState.isOpen;
    if (globalChatState.isOpen) {
      globalChatState.isMinimized = false;
    }
    notifyListeners();
  }, []);

  const minimizeChat = useCallback(() => {
    console.log('🔵 minimizeChat chamado');
    globalChatState.isMinimized = true;
    notifyListeners();
  }, []);

  const maximizeChat = useCallback(() => {
    console.log('🟣 maximizeChat chamado - Estado antes:', { ...globalChatState });
    globalChatState.isOpen = true;
    globalChatState.isMinimized = false;
    console.log('🟣 maximizeChat - Estado depois:', { ...globalChatState });
    notifyListeners();
  }, []);

  const setChatMode = useCallback((mode: 'text' | 'voice') => {
    console.log('🎵 setChatMode chamado:', mode);
    globalChatState.chatMode = mode;
    notifyListeners();
  }, []);

  return {
    ...globalChatState,
    openChat,
    closeChat,
    toggleChat,
    minimizeChat,
    maximizeChat,
    setChatMode
  };
};

// Função para abrir o chat externamente
export const openSoniaChat = () => {
  globalChatState.isOpen = true;
  globalChatState.isMinimized = false;
  notifyListeners();
};

// Função para fechar o chat externamente
export const closeSoniaChat = () => {
  globalChatState.isOpen = false;
  globalChatState.isMinimized = false;
  notifyListeners();
};
