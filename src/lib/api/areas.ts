import { defaultLocale } from '@/constants/config';
import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Tag } from '@/lib/api/tags';
import { FindResponse, Image, ListResponseData, Query, SingleResponseData } from '@/lib/api/utils/common';
import { QueryKey } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import qs from 'qs';

export type Area = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: SingleResponseData<Image>;
  tags: ListResponseData<Tag>;
  localizations: ListResponseData<Area>;
  locationsCount: number;
};

const defaultQuery = {
  filters: {},
  populate: ['localizations'],
  sort: [],
};

export const findLocationAreas = async (params: { query: Query }): Promise<FindResponse<Area>> => {
  const querystring = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...params.query?.filters },
      populate: [...defaultQuery.populate, ...(params.query?.populate ? params.query?.populate : [])],
      sort: params.query?.sort || [],
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<FindResponse<Area>>(`/location-areas?${querystring}`);

  return response.data;
};

export const findLocationAreasWithLocationCount = async (params: { query: Query }): Promise<FindResponse<Area>> => {
  const querystring = qs.stringify({
    ...params.query,
    filters: { ...defaultQuery.filters, ...params.query?.filters },
    populate: [...defaultQuery.populate, ...(params.query?.populate ? params.query?.populate : [])],
    sort: params.query?.sort || [],
    locale: getCookie('NEXT_LOCALE') || defaultLocale,
  });

  const response = await publicAPI.get<FindResponse<Area>>(`/location-areas/count?${querystring}`);

  return response.data;
};

export const findAreaBySlug = async (params: { query: Query }): Promise<FindResponse<Area>> => {
  const query = qs.stringify(
    {
      ...params.query,
      populate: defaultQuery.populate,
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encodeValuesOnly: true },
  );
  const response = await publicAPI.get<ListResponseData<Area>>(`/location-areas/count?${query}`);

  return response?.data;
};

export const findAreaBySlugSSR = async ({ queryKey }: { queryKey: QueryKey }): Promise<Area | undefined> => {
  const [_key, slug, locale] = queryKey;

  const query = qs.stringify(
    {
      filters: { slug },
      populate: defaultQuery.populate,
      locale: locale || getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encodeValuesOnly: true },
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/location-areas/count?${query}`, {
    next: { revalidate: defaultStaleTime },
  });

  const result: ListResponseData<Area> = await response.json();

  return result?.data?.[0]?.attributes;
};
