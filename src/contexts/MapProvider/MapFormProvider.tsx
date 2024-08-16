'use client';

import { createContext, useContext, useState } from 'react';

// Components
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';
import { useLocationQueryCtx } from '@/contexts/LocationQueryProvider';

type MapFormContextValues = {
  onSearch: (searchQuery: LocationSearchQuery) => void;
  onFilter: (searchQuery: LocationSearchQuery) => void;
};

const initialState: MapFormContextValues = {
  onSearch: (searchQuery: LocationSearchQuery) => {},
  onFilter: (searchQuery: LocationSearchQuery) => {},
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
  const { handleUpdateParams } = useMapParamsCtx();
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
  const { handleSubmit } = form;

  const onSearch = async (searchQuery: LocationSearchQuery) => {
    console.log('... on search');
    if (!searchQuery?.search) return;

    await handleSearch(searchQuery.search);
    handleUpdateParams('search', searchQuery.search);
  };

  const onFilter = async (searchQuery: LocationSearchQuery) => {
    console.log('... on filter');
    await handleFilter({
      categories: searchQuery?.selectedCategories || [],
      services: searchQuery?.selectedServices || [],
      areas: searchQuery?.selectedAreas || [],
    });
  };

  return (
    <MapFormContext.Provider
      value={{
        onSearch,
        onFilter,
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
