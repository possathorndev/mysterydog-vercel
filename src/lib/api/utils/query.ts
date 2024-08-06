import { dehydrate, QueryClient, QueryFunctionContext, QueryKey } from '@tanstack/react-query';

interface PrefetchQueryOptions<T> {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext<QueryKey>) => Promise<T>;
}

export const prefetchQuerySSR = async <T>({ queryKey, queryFn }: PrefetchQueryOptions<T>) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });

  return dehydrate(queryClient);
};
