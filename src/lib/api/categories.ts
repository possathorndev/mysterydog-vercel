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
  const { query } = params;
  const querystring = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...query?.filters },
      populate: [...defaultQuery.populate, ...(query?.populate ? query?.populate : [])],
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<FindResponse<Category>>(`/location-categories?${querystring}`);

  return response.data;
};
