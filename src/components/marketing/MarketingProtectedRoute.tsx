/**
 * Protects marketing routes: redirects to /marketing/login if not authenticated.
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMarketingAuth } from '@/contexts/MarketingAuthContext';

interface MarketingProtectedRouteProps {
  children: React.ReactNode;
}

export function MarketingProtectedRoute({ children }: MarketingProtectedRouteProps) {
  const { user, isLoading } = useMarketingAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-blue border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    const loginPath = '/marketing/login';
    const from = (location.state as any)?.from?.pathname || loginPath;
    window.location.href = `${loginPath}?redirect=${encodeURIComponent(from)}`;
    return null;
  }

  return <>{children}</>;
}
