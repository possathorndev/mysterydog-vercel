'use client';

import { createContext, useContext } from 'react';
import qs from 'qs';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from '@/utils/navigation';

type MapParamsContextValues = {};

const initialState: MapParamsContextValues = {};

export const MapParamsContext: React.Context<MapParamsContextValues> =
  createContext<MapParamsContextValues>(initialState);

export const MapParamsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const selectedLocation = params?.slug;
  const hasCategoriesParams = !!useSearchParams().get('categories');
  const hasServicesParams = !!useSearchParams().get('services');
  const hasAreasParams = !!useSearchParams().get('areas');

  const handleSelectLocation = (slug: string) => {
    const currentParams = searchParams.toString();
    const queryString = currentParams ? `?${currentParams}` : '';

    router.push(`/maps/${slug || ''}${queryString}`, { shallow: true });
  };

  const handleUpdateParams = (key: 'search' | 'categories' | 'services' | 'areas', updatedParams: string[]) => {
    const newParams = {
      ...(updatedParams?.length > 0 && {
        [key]: key === 'search' ? updatedParams : updatedParams.join(','),
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

    router.push(`?${queryString}`);
  };

  return (
    <MapParamsContext.Provider
      value={{
        selectedLocation,
        hasCategoriesParams,
        hasServicesParams,
        hasAreasParams,
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
