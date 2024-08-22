import { useQuery } from '@tanstack/react-query';

// API
import { findLocations, findLocationBySlug } from '@/lib/api/locations';
import { useInfiniteFindQuery } from '@/hooks/useInfiniteFindQuery';
import { useLocationQueryCtx } from '@/contexts/LocationQueryProvider';
import { findLocationCategories } from '@/lib/api/categories';
import { findLocationAreas } from '@/lib/api/areas';
import { findLocationServices } from '@/lib/api/services';
import { Query } from '@/lib/api/utils/common';
import { useLocale } from 'next-intl';
import { useLocaleQuery } from '@/hooks/useLocaleQuery';

// Find Location
const useLocations = (params?: { query: Query }) => {
  const locale = useLocale();

  const {
    data: locations,
    isLoading: isLocationLoading,
    fetchMoreData,
    isLoadingMoreData,
    hasMoreData,
  } = useInfiniteFindQuery({
    queryKey: ['locations', locale, params],
    queryCtxFunction: useLocationQueryCtx,
    queryFn: ({ pageParam, pagination, sort, filters }) => {
      return findLocations({
        query: {
          pagination: {
            page: pageParam,
            pageSize: pagination.pageSize,
          },
          filters: { ...filters, ...params?.query?.filters },
          populate: params?.query?.populate,
          sort,
          locale,
        },
      });
    },
  });

  return {
    locations,
    isLocationLoading,
    hasMoreData,
    fetchMoreData,
    isLoadingMoreData,
  };
};

// Find Location Near Me
export const useLocationsNearMe = () => {
  const query: Query = {
    sort: ['createdAt:desc'],
    filters: {},
  };

  // TODO: get user current location
  const { data: locations, isLoading } = useLocaleQuery({
    queryKey: ['locationsNearMe'],
    queryFn: (query) => findLocations({ query }),
    query,
  });

  return {
    locations,
    isLoading,
  };
};

// Find Location from slug
export const useLocationBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['location', slug],
    queryFn: () => findLocationBySlug(slug),
    enabled: !!slug,
  });
};

// Category
export const useLocationCategories = ({ query }: { query: Query }) => {
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isFetched: isCategoryFetched,
  } = useLocaleQuery({
    queryKey: ['categories'],
    queryFn: (query) => findLocationCategories({ query }),
    query,
  });

  return {
    categories,
    isCategoryLoading,
    isCategoryFetched,
  };
};

// Service
export const useLocationServices = ({ query }: { query: Query }) => {
  const {
    data: services,
    isLoading: isServiceLoading,
    isFetched: isServiceFetched,
  } = useLocaleQuery({
    queryKey: ['services'],
    queryFn: () => findLocationServices({ query }),
    query,
  });

  return { services, isServiceLoading, isServiceFetched };
};

// Area
export const useLocationAreas = ({ query }: { query: Query }) => {
  const {
    data: areas,
    isLoading: isAreaLoading,
    isFetched: isAreaFetched,
  } = useLocaleQuery({
    queryKey: ['areas'],
    queryFn: () => findLocationAreas({ query }),
    query,
  });

  return { areas, isAreaLoading, isAreaFetched };
};

export default useLocations;
