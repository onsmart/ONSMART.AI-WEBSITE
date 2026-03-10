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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-blue border-t-transparent" />
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
