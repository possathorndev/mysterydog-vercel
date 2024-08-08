import qs from 'qs';
import { QueryKey } from '@tanstack/react-query';

import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Category } from '@/lib/api/categories';
import { getCookie } from 'cookies-next';
import { defaultLocale } from '@/constants/config';
import { ListResponseData, ResponseData, SingleResponseData } from '@/lib/api/utils/common';

export type Location = {
  slug: string;
  name: string;
  lat: number;
  long: number;
  categories: Category[];
};

export const findLocations = async ({ queryKey }: { queryKey: string[] }): Promise<ListResponseData<Location>> => {
  const [_key, query] = queryKey;

  const queryString = qs.stringify(
    {
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
      // populate: '*',
    },
    { encode: false },
  );

  const response = await publicAPI.get(`/locations?${queryString}`);

  return response?.data;
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
