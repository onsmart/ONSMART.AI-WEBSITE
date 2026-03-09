/**
 * Marketing auth context: me query, login, logout, refresh.
 * Used only inside the /marketing layout.
 */

import React, { createContext, useContext, useCallback } from 'react';
import { trpc } from '@/trpc';

interface MarketingUser {
  id: string;
  email: string;
  name: string | null;
}

interface MarketingAuthContextValue {
  user: MarketingUser | null | undefined;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const MarketingAuthContext = createContext<MarketingAuthContextValue | null>(null);

export function MarketingAuthProvider({ children }: { children: React.ReactNode }) {
  const utils = trpc.useUtils();
  const { data: user, isLoading, isError } = trpc.marketing.auth.me.useQuery(undefined, {
    retry: false,
    staleTime: 60_000,
  });

  const resolvedUser = isError ? null : (user ?? null);

  const loginMutation = trpc.marketing.auth.login.useMutation({
    onSuccess: (data) => {
      utils.marketing.auth.me.setData(undefined, data.user);
    },
  });
  const logoutMutation = trpc.marketing.auth.logout.useMutation({
    onSuccess: () => utils.marketing.auth.me.invalidate(),
  });
  const refreshMutation = trpc.marketing.auth.refresh.useMutation({
    onSuccess: () => utils.marketing.auth.me.invalidate(),
  });

  const login = useCallback(
    async (email: string, password: string) => {
      await loginMutation.mutateAsync({ email, password });
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const refresh = useCallback(async () => {
    await refreshMutation.mutateAsync();
  }, [refreshMutation]);

  const value: MarketingAuthContextValue = {
    user: resolvedUser,
    isLoading,
    login,
    logout,
    refresh,
  };

  return (
    <MarketingAuthContext.Provider value={value}>
      {children}
    </MarketingAuthContext.Provider>
  );
}

export function useMarketingAuth() {
  const ctx = useContext(MarketingAuthContext);
  if (!ctx) throw new Error('useMarketingAuth must be used within MarketingAuthProvider');
  return ctx;
}
