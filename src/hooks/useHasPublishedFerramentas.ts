import { trpc } from '@/trpc';

/**
 * Indica se existe ao menos uma ferramenta publicada (marketing_contents.type = ferramentas).
 * Enquanto a query não conclui, hasFerramentas é false para evitar flash do menu.
 */
export function useHasPublishedFerramentas() {
  const q = trpc.marketing.public.list.useQuery(
    { type: 'ferramentas', limit: 1, offset: 0 },
    { staleTime: 60_000 },
  );

  const isReady = q.isFetched;
  const hasFerramentas =
    q.isSuccess &&
    ((q.data?.total ?? 0) > 0 || (q.data?.rows?.length ?? 0) > 0);

  return { hasFerramentas, isReady };
}
