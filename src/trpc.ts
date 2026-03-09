/**
 * tRPC React client for marketing API.
 * Uses /api/trpc with credentials for httpOnly cookies.
 */

import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

// Use generic type; for full types run build:server and use: import type { AppRouter } from '../../dist-server/routers';
export type AppRouter = any;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return import.meta.env.VITE_API_URL || 'http://localhost:3001';
};

export const trpc = createTRPCReact<AppRouter>();

export function createTrpcClient() {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        fetch(url, options) {
          return fetch(url, { ...options, credentials: 'include' });
        },
      }),
    ],
  });
}
