export type ResponseData<T> = { id: number; attributes: T };
export type SingleResponseData<T> = { data: ResponseData<T> };
export type ListResponseData<T> = { data: ResponseData<T>[] };

export type FindResponse<T> = ListResponseData<T> & {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type ImageExtension = 'jpg' | 'png';
export type ImageMime = 'image/jpeg' | 'image/png';

export type ImageFormat = {
  name: string;
  hash: string;
  ext: `.${ImageExtension}`;
  mime: ImageMime;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

export type Image = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: `.${ImageExtension}`;
  mime: ImageMime;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
};

// Query Type
// Define the filter types based on Strapi documentation
type StringFilter = {
  $eq?: string;
  $ne?: string;
  $in?: string[];
  $notIn?: string[];
  $lt?: string;
  $lte?: string;
  $gt?: string;
  $gte?: string;
  $contains?: string;
  $notContains?: string;
  $startsWith?: string;
  $endsWith?: string;
};

type NumberFilter = {
  $eq?: number;
  $ne?: number;
  $in?: number[];
  $notIn?: number[];
  $lt?: number;
  $lte?: number;
  $gt?: number;
  $gte?: number;
};

type DateFilter = {
  $eq?: Date;
  $ne?: Date;
  $in?: Date[];
  $notIn?: Date[];
  $lt?: Date;
  $lte?: Date;
  $gt?: Date;
  $gte?: Date;
};

type Filters = {
  [key: string]: StringFilter | NumberFilter | DateFilter | Filters;
};

// Define the populate type
type Populate = string[]; // | { [key: string]: Populate };

// Define the sort type
type Sort = string | string[];

// Define the fields type
type Fields = string | string[];

// Define the pagination type
type Pagination = {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
};

// Combine all the types into a Query type
export type Query = {
  locale?: string;
  filters?: Partial<Filters>;
  populate?: Populate;
  sort?: Sort;
  fields?: Fields;
  pagination?: Pagination;
};

export type Address = {
  address1: string;
  address2: string;
  district: string;
  subDistrict: string;
  city: string;
  country: string;
  postcode: string;
};
