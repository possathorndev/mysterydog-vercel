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
import { useGeolocationCtx } from '@/contexts/GeolocationProvider';

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
          ...(params?.query?.sortByNearest &&
            params?.query?.lat &&
            params?.query?.lng && {
              lat: params?.query?.lat,
              long: params?.query?.lng,
              sortByNearest: params?.query?.sortByNearest,
            }),
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
  const { currentLocation } = useGeolocationCtx();
  const query: Query = {
    sort: ['createdAt:desc'],
    filters: {},
    lat: currentLocation?.latitude,
    lng: currentLocation?.longitude,
    sortByNearest: true,
  };

  const { data: locations, isLoading } = useLocaleQuery({
    queryKey: ['locationsNearMe', currentLocation],
    queryFn: (query) => findLocations({ query }),
    query,
    enabled: !!currentLocation?.latitude && !!currentLocation?.longitude,
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
export const useLocationCategories = (params?: { query: Query }) => {
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isFetched: isCategoryFetched,
  } = useLocaleQuery({
    queryKey: ['categories'],
    queryFn: (query) => findLocationCategories({ query }),
    query: params?.query || {},
  });

  return {
    categories,
    isCategoryLoading,
    isCategoryFetched,
  };
};

// Service
export const useLocationServices = (params?: { query: Query }) => {
  const {
    data: services,
    isLoading: isServiceLoading,
    isFetched: isServiceFetched,
  } = useLocaleQuery({
    queryKey: ['services'],
    queryFn: (query) => findLocationServices({ query }),
    query: params?.query || {},
  });

  return { services, isServiceLoading, isServiceFetched };
};

// Area
export const useLocationAreas = (params?: { query: Query }) => {
  const {
    data: areas,
    isLoading: isAreaLoading,
    isFetched: isAreaFetched,
  } = useLocaleQuery({
    queryKey: ['areas'],
    queryFn: (query) => findLocationAreas({ query }),
    query: params?.query || {},
  });

  return { areas, isAreaLoading, isAreaFetched };
};

export default useLocations;
