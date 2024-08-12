import { useMemo, useState } from 'react';

export type SortOptionOrder = 'asc' | 'desc';
export type SortOptionField = string;
export type SortOptionValue<Field extends SortOptionField = string> = `${Field}:${SortOptionOrder}`;
export type SortOptionKey = string;

export type SortOption<
  Key extends SortOptionKey,
  Field extends SortOptionField = SortOptionField,
  Value extends SortOptionValue<Field> = SortOptionValue<Field>,
> = {
  name: string;
  key: Key;
  value: Value;
};

export const useSortQuery = <
  Key extends SortOptionKey,
  Field extends string = string,
  Option extends SortOption<Key, Field> = SortOption<Key, Field>,
>(
  options: Option[],
  defaultKey?: Key,
) => {
  const [sortBy, setSortBy] = useState<SortOptionKey>(defaultKey ?? options[0].key);

  const sorts = useMemo(() => {
    const selectedSortOption = options.find((option) => option.key === sortBy);

    if (!selectedSortOption) return undefined;

    return [selectedSortOption.value];
  }, [options, sortBy]);

  const handleSetSortBy = (value: Key) => {
    setSortBy(value);
  };

  return { sorts, handleSetSortBy };
};

export default useSortQuery;
