import qs from 'qs';

import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Category } from '@/lib/api/categories';
import { Image, ListResponseData, SingleResponseData } from '@/lib/api/utils/common';
import { Area } from '@/lib/api/areas';
import { defaultLocale } from '@/constants/config';
import { getCookie } from 'cookies-next';

export type Home = {
  bannerImages: ListResponseData<Image>;
  categories: ListResponseData<Category>;
  popularAreas: ListResponseData<Area>;
};

const defaultQuery = {
  filters: {},
  populate: ['bannerImages', 'categories', 'popularAreas', 'categories.thumbnailImage', 'popularAreas.localizations'],
};

export const findHome = async ({ locale }: { locale?: string }): Promise<Home> => {
  const query = qs.stringify(
    {
      filters: { ...defaultQuery.filters },
      populate: [...defaultQuery.populate],
      locale: locale || getCookie('NEXT_LOCALE') || defaultLocale,
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<SingleResponseData<Home>>(`/home?${query}`);

  return response?.data?.data?.attributes;
};

export const findHomeServerSide = async ({ locale }: { locale?: string }): Promise<Home> => {
  const query = qs.stringify(
    {
      filters: { ...defaultQuery.filters },
      populate: [...defaultQuery.populate],
      locale: locale || defaultLocale,
    },
    { encodeValuesOnly: true },
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home?${query}`, {
    next: { revalidate: 60 * 60 },
  });

  const result: SingleResponseData<Home> = await response.json();

  return result.data?.attributes;
};
