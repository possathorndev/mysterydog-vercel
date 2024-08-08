import qs from 'qs';

import { defaultStaleTime, publicAPI } from '@/lib/api';
import { Category } from '@/lib/api/categories';
import { Image, ListResponseData, SingleResponseData } from '@/lib/api/utils/common';
import { Area } from '@/lib/api/areas';

export type Home = {
  bannerImages: ListResponseData<Image>;
  categories: ListResponseData<Category>;
  popularAreas: ListResponseData<Area>;
};

const defaultQuery = {
  filters: {},
  populate: ['bannerImages', 'categories', 'popularAreas'],
};

export const findHome = async (): Promise<Home> => {
  const query = qs.stringify(
    {
      filters: { ...defaultQuery.filters },
      populate: [...defaultQuery.populate],
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<SingleResponseData<Home>>(`/home?${query}`);

  return response?.data?.data?.attributes;
};

export const findHomeServerSide = async (): Promise<Home> => {
  const query = qs.stringify(
    {
      filters: { ...defaultQuery.filters },
      populate: [...defaultQuery.populate],
    },
    { encodeValuesOnly: true },
  );

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/home?${query}`, {
    next: { revalidate: defaultStaleTime },
  });

  const result: SingleResponseData<Home> = await response.json();

  return result.data?.attributes;
};
