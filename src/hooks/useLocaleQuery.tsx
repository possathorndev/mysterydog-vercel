import { useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';

import { SortOptionField } from '@/hooks/searchQuery/useSortQuery';
import { FiltersSchema } from '@/hooks/searchQuery/useFilterQuery';
import { FindResponse, Query, SingleResponseData } from '@/lib/api/utils/common';

export const useLocaleQuery = <
  T,
  SortField extends SortOptionField = SortOptionField,
  Filters extends FiltersSchema = FiltersSchema,
>(params: {
  queryKey: any[];
  queryFn: (query: Query) => Promise<FindResponse<T> | SingleResponseData<T>>;
  query: Query;
  enabled?: boolean;
}) => {
  const locale = useLocale();
  const { queryKey, queryFn, query, enabled = true } = params;
  const { data, isLoading, isFetching, isFetched } = useQuery({
    queryKey: [...queryKey, locale],
    queryFn: () => queryFn({ ...query, locale }),
    retry: 2,
    enabled,
  });

  return { data, isLoading, isFetching, isFetched };
};
