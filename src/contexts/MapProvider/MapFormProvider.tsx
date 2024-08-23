'use client';

import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';

// Components
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';
import { useLocationQueryCtx } from '@/contexts/LocationQueryProvider';
import { debounce } from 'next/dist/server/utils';
import { useParams, useSearchParams } from 'next/navigation';

type MapFormContextValues = {
  onSearch: (searchQuery: LocationSearchQuery) => void;
  onFilter: (searchQuery: LocationSearchQuery) => void;
  onClearFilter: () => void;
};

const initialState: MapFormContextValues = {
  onSearch: (searchQuery: LocationSearchQuery) => {},
  onFilter: (searchQuery: LocationSearchQuery) => {},
  onClearFilter: () => {},
};

export interface LocationSearchQuery {
  search?: string;
  selectedLocation?: string;
  selectedCategories?: string[];
  selectedServices?: string[];
  selectedAreas?: string[];
}

const formSchema = z.object({
  search: z.string(),
  selectedLocation: z.string(),
  selectedCategories: z.array(z.string()),
  selectedServices: z.array(z.string()),
  selectedAreas: z.array(z.string()),
});

export const MapFormContext: React.Context<MapFormContextValues> = createContext<MapFormContextValues>(initialState);

export const MapFormContextProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { handleUpdateSearchParams } = useMapParamsCtx();
  const { handleSearch, handleFilter } = useLocationQueryCtx();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      selectedLocation: '',
      selectedCategories: [],
      selectedServices: [],
      selectedAreas: [],
    },
  });
  const { handleSubmit, setValue, reset } = form;

  const selectedLocation = useMemo(() => {
    return params?.slug as string;
  }, [params]);

  const searchString = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const categories = useMemo(() => {
    const categoriesString = searchParams.get('categories');
    return categoriesString ? categoriesString.split(',') : [];
  }, [searchParams]);

  const services = useMemo(() => {
    const servicesString = searchParams.get('services');
    return servicesString ? servicesString.split(',') : [];
  }, [searchParams]);

  const areas = useMemo(() => {
    const areasString = searchParams.get('areas');
    return areasString ? areasString.split(',') : [];
  }, [searchParams]);

  const debouncedSubmitSearch = useCallback(
    debounce(() => {
      console.log('submitting search ...');
      handleSubmit(onSearch)();
    }, 200),
    [],
  );

  const debouncedSubmitFilter = useCallback(
    debounce(() => {
      console.log('submitting filter ...');
      handleSubmit(onFilter)();
    }, 200),
    [],
  );

  useEffect(() => setValue('selectedLocation', selectedLocation), [selectedLocation]);

  useEffect(() => {
    setValue('search', searchString);

    debouncedSubmitSearch();
  }, [searchString]);

  useEffect(() => {
    setValue('selectedCategories', categories);
    setValue('selectedServices', services);
    setValue('selectedAreas', areas);

    debouncedSubmitFilter();
  }, [categories, services, areas]);

  const onSearch = async (searchQuery: LocationSearchQuery) => {
    await handleSearch(searchQuery?.search || '');
    handleUpdateSearchParams(searchQuery?.search || '');
  };

  const onFilter = async (searchQuery: LocationSearchQuery) => {
    await handleFilter({
      categories: searchQuery?.selectedCategories || [],
      services: searchQuery?.selectedServices || [],
      areas: searchQuery?.selectedAreas || [],
    });
  };

  const onClearFilter = () => {
    reset();
    window.history.replaceState(undefined, '', `/maps`);
  };

  return (
    <MapFormContext.Provider
      value={{
        onSearch,
        onFilter,
        onClearFilter,
      }}
    >
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSearch)}>{children}</form>
        </Form>
      </FormProvider>
    </MapFormContext.Provider>
  );
};

export function useMapFormCtx(): MapFormContextValues {
  const context = useContext(MapFormContext);

  if (!context) {
    throw new Error('Missing MapForm context');
  }
  return context;
}
