'use client';

import { useState } from 'react';

export type FiltersSchema = { [key: string]: boolean | string | any };

export const useFiltersQuery = <Filters extends FiltersSchema = FiltersSchema>(initial?: Partial<Filters>) => {
  const [filters, setFilters] = useState<Partial<Filters>>(initial ?? {});

  const setFilter = <Key extends keyof Filters, Value extends Filters[Key]>(key: Key, value: Value) => {
    setFilters((prev) => {
      console.log(`setFilter ${key.toString()}`, { ...prev, [key]: value });

      return { ...prev, [key]: value };
    });
  };

  const resetFilter = <Key extends keyof Filters>(key: Key) => {
    setFilters((prev) => {
      if (prev[key]) {
        const { [key]: _, ...rest } = prev;

        console.log(`resetFilters ${key.toString()}`, rest);

        return rest as Partial<Filters>;
      } else {
        console.log(`resetFilters else ${key.toString()}`, prev);
        return prev;
      }
    });
  };

  const toggleFilter = <Key extends keyof Filters, Value extends Filters[Key]>(key: Key, value: Value) => {
    setFilters((prev) => {
      if (prev[key]) {
        const { [key]: _, ...rest } = prev;

        return rest as Partial<Filters>;
      }

      return { ...prev, [key]: value };
    });
  };

  return {
    filters,
    setFilter,
    resetFilter,
    toggleFilter,
    setFilters,
  };
};

export default useFiltersQuery;
