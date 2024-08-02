import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

export const publicAPI: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });
export const authApi: AxiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });

authApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const session = await getSession();

    if (!!session?.user?.jwt) {
      const jwt = session.user.jwt;
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  function (error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: AxiosError): Promise<AxiosError> {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (
      error.response != null &&
      error.response.status != null &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.error({ what: 'Authorization error', e: error });
      signOut({ redirect: false });
    }
    return Promise.reject(error);
  },
);
