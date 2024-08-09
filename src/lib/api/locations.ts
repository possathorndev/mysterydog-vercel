import qs from 'qs';
import { QueryKey } from '@tanstack/react-query';

import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Category } from '@/lib/api/categories';
import { getCookie } from 'cookies-next';
import { defaultLocale } from '@/constants/config';
import { FindResponse, ListResponseData, Query, ResponseData, SingleResponseData } from '@/lib/api/utils/common';

export type Location = {
  slug: string;
  name: string;
  lat: number;
  long: number;
  categories: ListResponseData<Category>;
};

const defaultQuery = {
  filters: {},
  populate: ['thumbnailImage', 'tags', 'categories', 'categories.iconMarker'],
};

export const findLocations = async (params: { query: Query }): Promise<FindResponse<Location>> => {
  const queryString = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...params.query?.filters },
      populate: [...defaultQuery.populate, ...(params.query?.populate ? params.query?.populate : [])],
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encode: false },
  );

  const response = await publicAPI.get(`/locations?${queryString}`);

  return response.data;
};

export const findLocationBySlug = async (slug: string): Promise<Location> => {
  const response = await publicAPI.get(`/locations/${slug}`);

  return response?.data?.data?.attributes;
};

export const findLocationBySlugSSR = async ({ queryKey }: { queryKey: QueryKey }): Promise<Location | undefined> => {
  const [_key, slug] = queryKey;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations/${slug}`, {
    next: { revalidate: defaultStaleTime },
  });

  const result: SingleResponseData<Location> = await response.json();

  return result?.data?.attributes;
};
