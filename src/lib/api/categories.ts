import qs from 'qs';

import { publicAPI } from '@/lib/api';
import { Tag } from '@/lib/api/tags';
import { FindResponse, Image, ListResponseData, Query, SingleResponseData } from '@/lib/api/utils/common';

export type Category = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  locale: string;
  color: string;
  icon: SingleResponseData<Image>;
  thumbnailImage: SingleResponseData<Image>;
  tags: ListResponseData<Tag>;
  iconMarker: SingleResponseData<Image>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

const defaultQuery = {
  filters: {},
  populate: ['icon'],
};

export const findLocationCategories = async (params: { query: Query }): Promise<FindResponse<Category>> => {
  const query = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...params.query?.filters },
      populate: [...defaultQuery.populate, ...(params.query?.populate ? params.query?.populate : [])],
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<FindResponse<Category>>(`/location-categories?${query}`);

  return response.data;
};
