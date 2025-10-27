
import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
  disabled?: boolean;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const activeShortcut = shortcuts.find(shortcut => {
      if (shortcut.disabled) return false;
      
      const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatch = !!shortcut.ctrl === (e.ctrlKey || e.metaKey);
      const altMatch = !!shortcut.alt === e.altKey;
      const shiftMatch = !!shortcut.shift === e.shiftKey;
      
      return keyMatch && ctrlMatch && altMatch && shiftMatch;
    });

    if (activeShortcut) {
      e.preventDefault();
      activeShortcut.action();
    }
  }, [shortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return shortcuts;
};

export const useGlobalKeyboardShortcuts = () => {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      alt: true,
      action: () => {
        const homeButton = document.querySelector('a[href="/"]') as HTMLElement;
        homeButton?.click();
      },
      description: 'Ir para página inicial'
    },
    {
      key: 's',
      alt: true,
      action: () => {
        const servicesButton = document.querySelector('a[href="/servicos"]') as HTMLElement;
        servicesButton?.click();
      },
      description: 'Ir para serviços'
    },
    {
      key: 'd',
      alt: true,
      action: () => {
        const diagnosticoButton = document.querySelector('a[href="/diagnostico"]') as HTMLElement;
        diagnosticoButton?.click();
      },
      description: 'Ir para diagnóstico'
    },
    {
      key: 'c',
      alt: true,
      action: () => {
        const contatoButton = document.querySelector('a[href="/contato"]') as HTMLElement;
        contatoButton?.click();
      },
      description: 'Ir para contato'
    },
    {
      key: '/',
      ctrl: true,
      action: () => {
        const searchInput = document.querySelector('input[type="search"]') as HTMLElement;
        searchInput?.focus();
      },
      description: 'Focar no campo de busca'
    }
  ];

  return useKeyboardShortcuts(shortcuts);
};
