import { useInfiniteQuery } from '@tanstack/react-query';

import { FindQueryContextValues, Pagination } from '@/contexts/FindQueryProvider';
import { SortOptionField, SortOptionValue } from '@/hooks/searchQuery/useSortQuery';
import { FiltersSchema } from '@/hooks/searchQuery/useFilterQuery';
import { FindResponse } from '@/lib/api/utils/common';

export const useInfiniteFindQuery = <
  T,
  SortField extends SortOptionField = SortOptionField,
  Filters extends FiltersSchema = FiltersSchema,
>(params: {
  queryKey: any[];
  queryCtxFunction: () => FindQueryContextValues<SortField, Filters>;
  queryFn: (params: {
    pageParam: number;
    pagination: Pagination;
    sort: SortOptionValue<SortField>[];
    filters: Partial<Filters>;
  }) => Promise<FindResponse<T>>;
}) => {
  const { queryKey, queryCtxFunction, queryFn } = params;
  const { pagination, sort, filters } = queryCtxFunction();

  const {
    data,
    isLoading,
    fetchNextPage: fetchMoreData,
    isFetchingNextPage: isLoadingMoreData,
    hasNextPage: hasMoreData,
  } = useInfiniteQuery({
    queryKey: [...queryKey, pagination, sort, filters],
    queryFn: ({ pageParam }) => queryFn({ pageParam, pagination, sort, filters }),
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      if (firstPage.meta.pagination.page === 1) return undefined;
      return firstPage.meta.pagination.page - 1;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.pagination.page === lastPage.meta.pagination.pageCount) return undefined;
      return lastPage.meta.pagination.page + 1;
    },
    retry: 2,
  });

  return { data, isLoading, hasMoreData, fetchMoreData, isLoadingMoreData };
};
