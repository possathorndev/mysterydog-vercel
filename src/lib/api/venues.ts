import qs from 'qs';
import { QueryKey } from '@tanstack/react-query';

import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Category } from '@/lib/api/categories';
import { getCookie } from 'cookies-next';
import { defaultLocale } from '@/consts/config';
import { ListResponseData, ResponseData, SingleResponseData } from '@/lib/api/utils/common';

export type Venue = {
  slug: string;
  name: string;
  categories: Category[];
};

export const findVenues = async ({ queryKey }: {queryKey: string[]}): Promise<ListResponseData<Venue>> => {
  const [_key, query] = queryKey;

  const queryString = qs.stringify(
    {
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encode: false },
  );

  const response = await publicAPI.get(`/locations?${queryString}`);

  return response?.data;
};

export const findVenueBySlug = async (slug: string): Promise<Venue> => {
  const response = await publicAPI.get(`/locations/${slug}`);

  return response?.data?.data?.attributes;
};

export const findVenueBySlugSSR = async ({ queryKey }: {queryKey: QueryKey}): Promise<Venue> => {
  const [_key, slug] = queryKey;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations/${slug}`, {
    next: { revalidate: defaultStaleTime },
  });

  const result: SingleResponseData<Venue> = await response.json();

  return result.data?.attributes;
};
