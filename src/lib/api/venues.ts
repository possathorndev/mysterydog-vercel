import qs from 'qs';

import { publicAPI } from '@/lib/api';
import { Category } from '@/lib/api/categories';
import { getCookie } from 'cookies-next';
import { defaultLocale } from '@/consts/config';

export type Venue = {
  slug: string;
  name: string;
  categories: Category[];
};

export type VenueAttribute = {
  id: number;
  attributes: Venue;
};

export type FindVenuesResponse = {
  data: VenueAttribute[];
};

export const findVenues = async (query?: {}) => {
  const queryString = qs.stringify(
    {
      ...query,
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encode: false },
  );

  const response = await publicAPI.get<FindVenuesResponse>(`/venues?${queryString}`);

  return response.data.data;
};

export type FindVenueBySlugResponse = {
  data: VenueAttribute;
};

export const findVenueBySlug = async ({ queryKey }) => {
  const [_key, { slug }] = queryKey;

  const response = await publicAPI.get<FindVenueBySlugResponse>(`/venues/${slug}`);

  return response.data.data;
};
