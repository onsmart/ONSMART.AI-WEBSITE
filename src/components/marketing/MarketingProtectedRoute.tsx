/**
 * Protects marketing routes: redirects to /marketing/login if not authenticated.
 */

import React from 'react';
import { useMarketingAuth } from '@/contexts/MarketingAuthContext';

interface MarketingProtectedRouteProps {
  children: React.ReactNode;
}

export function MarketingProtectedRoute({ children }: MarketingProtectedRouteProps) {
  const { user, isLoading } = useMarketingAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-b from-slate-50 to-gray-100/80 dark:from-gray-950 dark:to-gray-900/95">
        <div className="h-11 w-11 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    const loginPath = '/marketing/login';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/marketing';
    const redirectTo = (currentPath && currentPath !== loginPath && currentPath.startsWith('/marketing'))
      ? currentPath
      : '/marketing';
    window.location.href = `${loginPath}?redirect=${encodeURIComponent(redirectTo)}`;
    return null;
  }

  return <>{children}</>;
}
