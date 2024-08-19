import qs from 'qs';
import { QueryKey } from '@tanstack/react-query';

import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Category } from '@/lib/api/categories';
import { getCookie } from 'cookies-next';
import { defaultLocale } from '@/constants/config';
import {
  Address,
  FindResponse,
  Image,
  ListResponseData,
  Query,
  ResponseData,
  SingleResponseData,
} from '@/lib/api/utils/common';
import { Service } from '@/lib/api/services';
import { Area } from '@/lib/api/areas';
import { Tag } from '@/lib/api/tags';

export type OpeningHour = {
  title: string;
  openTime: string;
  closeTime: string;
  displayValue: string;
};

export type Location = {
  slug: string;
  name: string;
  thumbnailImage: SingleResponseData<Image>;
  images: ListResponseData<Image>;
  shortDescription: string;
  description: string;
  lat: number;
  long: number;
  address: Address;
  openingHours: OpeningHour[];
  services: ListResponseData<Service>;
  categories: ListResponseData<Category>;
  areas: ListResponseData<Area>;
  tags: ListResponseData<Tag>;
};

const defaultQuery = {
  filters: {},
  populate: [
    'thumbnailImage',
    'tags',
    'categories',
    'categories.iconMarker',
    'address',
    'openingHours',
    'services',
    'services.icon',
  ],
};

export const findLocations = async (params: { query: Query }): Promise<FindResponse<Location>> => {
  const queryString = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...params.query?.filters },
      populate: [...defaultQuery.populate, ...(params.query?.populate ? params.query?.populate : [])],
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
      sort: params.query?.sort || [],
    },
    { encode: false },
  );

  const response = await publicAPI.get(`/locations?${queryString}`);

  return response.data;
};

export const findLocationBySlug = async (slug: string): Promise<Location> => {
  const queryString = qs.stringify({
    populate: [...defaultQuery.populate, 'images'],
  });

  const response = await publicAPI.get(`/locations/${slug}?${queryString}`);

  return response?.data?.data?.attributes;
};

export const findLocationBySlugSSR = async ({ queryKey }: { queryKey: QueryKey }): Promise<Location | undefined> => {
  const [_key, slug] = queryKey;

  const query = qs.stringify(
    {
      populate: defaultQuery.populate,
    },
    {
      encodeValuesOnly: true,
    },
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/locations/${slug}?${query}`, {
    next: { revalidate: defaultStaleTime },
  });

  const result: SingleResponseData<Location> = await response.json();

  return result?.data?.attributes;
};
