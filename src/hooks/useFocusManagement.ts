
import { useEffect, useRef, useCallback } from 'react';

interface FocusOptions {
  restoreFocus?: boolean;
  trapFocus?: boolean;
  autoFocus?: boolean;
}

export const useFocusManagement = (isOpen: boolean, options: FocusOptions = {}) => {
  const { restoreFocus = true, trapFocus = true, autoFocus = true } = options;
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback((container: HTMLElement) => {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!trapFocus || !containerRef.current) return;

    const focusableElements = getFocusableElements(containerRef.current);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    if (e.key === 'Escape') {
      const escapeEvent = new CustomEvent('focusEscape');
      containerRef.current.dispatchEvent(escapeEvent);
    }
  }, [trapFocus, getFocusableElements]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      if (autoFocus && containerRef.current) {
        const focusableElements = getFocusableElements(containerRef.current);
        const firstElement = focusableElements[0];
        firstElement?.focus();
      }

      if (trapFocus) {
        document.addEventListener('keydown', handleKeyDown);
      }
    } else if (restoreFocus && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }

    return () => {
      if (trapFocus) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isOpen, autoFocus, restoreFocus, trapFocus, handleKeyDown, getFocusableElements]);

  return containerRef;
};

export const useFocusAnnouncement = () => {
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return { announceToScreenReader };
};
