
import React from 'react';
import { useAccessibilityEnhancements } from '@/hooks/useAccessibilityEnhancements';
import { useAccessibilityTesting } from '@/hooks/useAccessibilityTesting';
import { useGlobalKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import SkipLinks from './SkipLinks';
import KeyboardNavigation from './KeyboardNavigation';
import AriaLandmarks from './AriaLandmarks';
import KeyboardShortcutsGuide from './KeyboardShortcutsGuide';
import { AnnouncementProvider } from './ScreenReaderAnnouncements';

interface AccessibilityProps {
  children: React.ReactNode;
}

const AccessibilityEnhancements: React.FC<AccessibilityProps> = ({ children }) => {
  useAccessibilityEnhancements();
  useAccessibilityTesting();
  useGlobalKeyboardShortcuts();

  return (
    <AnnouncementProvider>
      <SkipLinks />
      <KeyboardNavigation />
      <AriaLandmarks />
      <KeyboardShortcutsGuide />
      {children}
    </AnnouncementProvider>
  );
};

export default AccessibilityEnhancements;

export const HighContrastMode: React.FC = () => {
  const [highContrast, setHighContrast] = React.useState(false);

  React.useEffect(() => {
    const savedPreference = localStorage.getItem('high-contrast-mode');
    if (savedPreference === 'true') {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('high-contrast-mode', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('high-contrast-mode', 'false');
    }
  };

  return (
    <button
      onClick={toggleHighContrast}
      aria-pressed={highContrast}
      aria-label={`${highContrast ? 'Desativar' : 'Ativar'} modo alto contraste`}
      className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {highContrast ? '🔆' : '🌙'}
    </button>
  );
};
