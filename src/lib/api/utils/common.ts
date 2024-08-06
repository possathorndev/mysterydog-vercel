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
