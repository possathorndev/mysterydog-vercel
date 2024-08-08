import { publicAPI } from '@/lib/api';
import { Tag } from '@/lib/api/tags';
import { FindResponse, Image, ListResponseData, SingleResponseData } from '@/lib/api/utils/common';
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
};

const defaultQuery = {
  filters: {},
  populate: [],
};

export const findLocationAreas = async (params: { query: any }): Promise<FindResponse<Area>> => {
  const query = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...params.query?.filters },
      populate: [...defaultQuery.populate, params.query?.populate],
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<FindResponse<Area>>(`/location-areas?${query}`);

  return response.data;
};
