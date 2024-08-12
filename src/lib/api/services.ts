import { publicAPI } from '@/lib/api';
import { FindResponse, Image, Query, SingleResponseData } from '@/lib/api/utils/common';
import qs from 'qs';

export type Service = {
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  icon: SingleResponseData<Image>;
  color: string;
};

const defaultQuery = {
  filters: {},
  populate: ['icon'],
};

export const findLocationServices = async (params: { query: Query }): Promise<FindResponse<Service>> => {
  const query = qs.stringify(
    {
      ...params.query,
      filters: { ...defaultQuery.filters, ...params.query?.filters },
      populate: [...defaultQuery.populate, ...(params.query?.populate ? params.query?.populate : [])],
    },
    { encodeValuesOnly: true },
  );

  const response = await publicAPI.get<FindResponse<Service>>(`/location-services?${query}`);

  return response.data;
};
