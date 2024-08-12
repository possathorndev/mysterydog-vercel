'use client';

import { SortOption, useSortQuery } from '@/hooks/searchQuery/useSortQuery';
import useFiltersQuery from '@/hooks/searchQuery/useFilterQuery';
import { LocationQueryFilter } from '@/contexts/LocationQueryProvider';

export type SortOptionKey = 'recentlyCreated' | 'recentlyUpdated';
export type SortField = 'createdAt' | 'updatedAt';

export const sortOptions: SortOption<SortOptionKey, SortField>[] = [
  {
    name: 'Nearest',
    key: 'recentlyUpdated',
    value: 'updatedAt:desc',
  },
  {
    name: 'Recently Created',
    key: 'recentlyCreated',
    value: 'createdAt:desc',
  },
];

export type Filters = {
  name: { $contains: string };
  categories: { slug: { $in: string[] } };
  services: { slug: { $in: string[] } };
  areas: { slug: { $in: string[] } };
};

export const useLocationQuery = () => {
  const { sorts, handleSetSortBy } = useSortQuery<SortOptionKey, SortField>(sortOptions, sortOptions[0].key);
  const { filters, setFilter, resetFilter } = useFiltersQuery<Filters>();

  const handleSearch = (value: string) => (value ? setFilter('name', { $contains: value }) : resetFilter('name'));

  const handleFilter = (filters: LocationQueryFilter) => {
    filters?.categories?.length > 0
      ? setFilter('categories', { slug: { $in: filters.categories } })
      : resetFilter('categories');

    filters?.services?.length > 0
      ? setFilter('services', { slug: { $in: filters.services } })
      : resetFilter('services');

    filters?.areas?.length > 0 ? setFilter('areas', { slug: { $in: filters.areas } }) : resetFilter('areas');
  };

  return { handleSearch, sorts, handleSetSortBy, filters, handleFilter };
};

export default useLocationQuery;
