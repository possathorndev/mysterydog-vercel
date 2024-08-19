import { useQuery } from '@tanstack/react-query';

// API
import { findLocations, findLocationBySlug } from '@/lib/api/locations';
import { useInfiniteFindQuery } from '@/hooks/useInfiniteFindQuery';
import { useLocationQueryCtx } from '@/contexts/LocationQueryProvider';
import { findLocationCategories } from '@/lib/api/categories';
import { findLocationAreas } from '@/lib/api/areas';
import { findLocationServices } from '@/lib/api/services';
import { Query } from '@/lib/api/utils/common';

// Find Location
const useLocations = () => {
  const {
    data: locations,
    isLoading: isLocationLoading,
    fetchMoreData,
    isLoadingMoreData,
    hasMoreData,
  } = useInfiniteFindQuery({
    queryKey: ['locations'],
    queryCtxFunction: useLocationQueryCtx,
    queryFn: ({ pageParam, pagination, sort, filters }) => {
      return findLocations({
        query: {
          pagination: {
            page: pageParam,
            pageSize: pagination.pageSize,
          },
          sort,
          filters,
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
  // TODO: get user current location

  const { data: locations, isLoading } = useQuery({
    queryKey: ['locationsNearMe'],
    queryFn: () => {
      return findLocations({
        query: {
          sort: ['createdAt:desc'],
          filters: {},
        },
      });
    },
  });

  return {
    locations,
    isLoading,
  };
};

// Find Location from slug
export const useLocationBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ['location', slug],
    queryFn: () => findLocationBySlug(slug!),
    enabled: !!slug,
  });
};

// Category
export const useLocationCategories = ({ query }: { query: Query }) => {
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isFetched: isCategoryFetched,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => findLocationCategories({ query }),
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
  } = useQuery({
    queryKey: ['services'],
    queryFn: () => findLocationServices({ query }),
  });

  return { services, isServiceLoading, isServiceFetched };
};

// Area
export const useLocationAreas = ({ query }: { query: Query }) => {
  const {
    data: areas,
    isLoading: isAreaLoading,
    isFetched: isAreaFetched,
  } = useQuery({
    queryKey: ['areas'],
    queryFn: () => findLocationAreas({ query }),
  });

  return { areas, isAreaLoading, isAreaFetched };
};

export default useLocations;
