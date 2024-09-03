import { FiltersSchema } from '@/hooks/searchQuery/useFilterQuery';
import { SortOptionField, SortOptionValue } from '@/hooks/searchQuery/useSortQuery';

export type Pagination = {
  pageSize: number;
};

export type FindQueryContextValues<
  SortField extends SortOptionField = SortOptionField,
  Filters extends FiltersSchema = FiltersSchema,
> = {
  pagination: Pagination;
  filters: Partial<Filters>;
  sort: SortOptionValue<SortField>[];
};
