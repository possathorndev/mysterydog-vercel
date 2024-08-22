import qs from 'qs';
import { QueryKey } from '@tanstack/react-query';

import { defaultStaleTime, publicAPI } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { defaultLocale } from '@/constants/config';
import { FindResponse, Image, ListResponseData, Query, SingleResponseData } from '@/lib/api/utils/common';
import { Tag } from '@/lib/api/tags';

export type BlogCategory = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  color: string;
  icon: SingleResponseData<Image>;
  image: SingleResponseData<Image>;
  tags: ListResponseData<Tag>;
  locale: string;
};

export type Blog = {
  title: string;
  slug: string;
  description: string;
  bannerImages: ListResponseData<Image>;
  image: SingleResponseData<Image>;
  content: string;
  categories: ListResponseData<BlogCategory>;
};

const defaultQuery = {
  filters: {},
  populate: ['image', 'categories'],
};

export const findBlogs = async (params: { query: Query }): Promise<FindResponse<Blog>> => {
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

  const response = await publicAPI.get(`/blogs?${queryString}`);

  return response.data;
};

export const findBlogBySlug = async (slug: string): Promise<Blog> => {
  const query = qs.stringify(
    {
      filters: { slug },
      populate: defaultQuery.populate,
      locale: getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encodeValuesOnly: true },
  );
  const response = await publicAPI.get<ListResponseData<Blog>>(`/blogs?${query}`);

  return response?.data?.data?.[0]?.attributes;
};

export const findBlogBySlugSSR = async ({ queryKey }: { queryKey: QueryKey }): Promise<Blog | undefined> => {
  const [_key, slug, locale] = queryKey;

  const query = qs.stringify(
    {
      filters: { slug },
      populate: defaultQuery.populate,
      locale: locale || getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encodeValuesOnly: true },
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs?${query}`, {
    next: { revalidate: defaultStaleTime },
  });

  const result: ListResponseData<Blog> = await response.json();

  return result?.data?.[0]?.attributes;
};
