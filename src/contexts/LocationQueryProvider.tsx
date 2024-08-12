'use client';

import { createContext, useContext } from 'react';
import useLocationQuery, { Filters, SortField, SortOptionKey } from '@/hooks/searchQuery/useLocationQuery';
import { FindQueryContextValues } from '@/contexts/FindQueryProvider';

export type LocationQueryFilter = {
  categories: string[];
  services: string[];
  areas: string[];
};

type LocationQueryContextValues = FindQueryContextValues<SortField, Filters> & {
  handleSetSortBy: (value: SortOptionKey) => void;
  handleFilter: (value: LocationQueryFilter) => void;
  handleSearch: (value: string) => void;
};

const initialState: LocationQueryContextValues = {
  pagination: {
    pageSize: 12,
  },
  filters: {},
  sort: ['createdAt:desc'],
  handleSetSortBy: () => {},
  handleFilter: () => {},
  handleSearch: () => {},
};

export const LocationQueryContext: React.Context<LocationQueryContextValues> =
  createContext<LocationQueryContextValues>(initialState);

export const LocationQueryContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { sorts, handleSetSortBy, handleFilter, filters, handleSearch } = useLocationQuery();
  return (
    <LocationQueryContext.Provider
      value={{
        pagination: initialState.pagination,
        filters: filters || initialState.filters,
        sort: sorts || initialState.sort,
        handleSetSortBy,
        handleFilter,
        handleSearch,
      }}
    >
      {children}
    </LocationQueryContext.Provider>
  );
};

export function useLocationQueryCtx(): LocationQueryContextValues {
  const context = useContext(LocationQueryContext);

  if (!context) {
    throw new Error('Missing LocationQuery context');
  }
  return context;
}
