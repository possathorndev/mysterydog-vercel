import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Tag } from '@/lib/api/tags';
import { FindResponse, Image, ListResponseData, Query, SingleResponseData } from '@/lib/api/utils/common';
import { QueryKey } from '@tanstack/react-query';
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
};

const defaultQuery = {
  filters: {},
  populate: ['localizations'],
  sort: [],
};

export const findLocationAreas = async (params: { query: Query }): Promise<FindResponse<Area>> => {
  const query = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...params.query?.filters },
      populate: [...defaultQuery.populate, ...(params.query?.populate ? params.query?.populate : [])],
      sort: params.query?.sort || [],
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<FindResponse<Area>>(`/location-areas?${query}`);

  return response.data;
};

export const findAreaBySlug = async (slug: string): Promise<Area> => {
  const query = qs.stringify(
    {
      filters: { slug },
      populate: defaultQuery.populate,
    },
    { encodeValuesOnly: true },
  );
  const response = await publicAPI.get<ListResponseData<Area>>(`/location-areas?${query}`);

  return response?.data?.data?.[0]?.attributes;
};

export const findAreaBySlugSSR = async ({ queryKey }: { queryKey: QueryKey }): Promise<Area | undefined> => {
  const [_key, slug] = queryKey;

  const query = qs.stringify(
    {
      filters: { slug },
      populate: defaultQuery.populate,
    },
    { encodeValuesOnly: true },
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/location-areas?${query}`, {
    next: { revalidate: defaultStaleTime },
  });

  const result: ListResponseData<Area> = await response.json();

  return result?.data?.[0]?.attributes;
};
