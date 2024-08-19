'use client';

import { createContext, useContext } from 'react';
import qs from 'qs';
import { useParams, useSearchParams } from 'next/navigation';

type MapParamsContextValues = {
  selectedLocation: string;
  searchTextParams: string;
  categoriesParams: string;
  servicesParams: string;
  areasParams: string;
  handleUpdateParams: (key: 'search' | 'categories' | 'services' | 'areas', updatedParams: string[] | string) => void;
  handleSelectLocation: (slug: string) => void;
};

const initialState: MapParamsContextValues = {
  selectedLocation: '',
  searchTextParams: '',
  categoriesParams: '',
  servicesParams: '',
  areasParams: '',
  handleUpdateParams: () => {},
  handleSelectLocation: () => {},
};

export const MapParamsContext: React.Context<MapParamsContextValues> =
  createContext<MapParamsContextValues>(initialState);

export const MapParamsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const searchParams = useSearchParams();

  const selectedLocation = params?.slug as string;
  const searchTextParams = useSearchParams().get('search') || '';
  const categoriesParams = useSearchParams().get('categories') || '';
  const servicesParams = useSearchParams().get('services') || '';
  const areasParams = useSearchParams().get('areas') || '';

  const handleSelectLocation = (slug: string) => {
    const currentParams = decodeURIComponent(searchParams.toString());

    const queryString = currentParams ? `?${currentParams}` : '';

    window.history.replaceState(undefined, '', `/maps${slug ? `/${slug}` : ''}${queryString}`);
  };

  const handleUpdateParams = (
    key: 'search' | 'categories' | 'services' | 'areas',
    updatedParams: string[] | string,
  ) => {
    const newParams = {
      ...(updatedParams &&
        updatedParams?.length > 0 && {
          [key]: Array.isArray(updatedParams) ? updatedParams.join(',') : updatedParams,
        }),
      ...Array.from(searchParams.entries()).reduce(
        (acc, [k, v]) => {
          if (k !== key) acc[k] = v;
          return acc;
        },
        {} as Record<string, string>,
      ),
    };

    const queryString = qs.stringify({ ...newParams }, { encode: false });

    window.history.replaceState(undefined, '', `/maps?${queryString}`);
  };

  return (
    <MapParamsContext.Provider
      value={{
        selectedLocation,
        searchTextParams,
        categoriesParams,
        servicesParams,
        areasParams,
        handleUpdateParams,
        handleSelectLocation,
      }}
    >
      {children}
    </MapParamsContext.Provider>
  );
};

export function useMapParamsCtx(): MapParamsContextValues {
  const context = useContext(MapParamsContext);

  if (!context) {
    throw new Error('Missing MapParams context');
  }
  return context;
}
