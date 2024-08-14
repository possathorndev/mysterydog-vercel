'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import FilterWidget from '@/components/SearchBar/FilterWidget/FilterWidget';

export interface LocationSearchQuery {
  search: string;
  selectedCategories: string[];
  selectedServices: string[];
  selectedAreas: string[];
}

export interface SearchFormWithFilter {
  handleSearch: (searchQuery: LocationSearchQuery) => void;
  handleFilter: (searchQuery: LocationSearchQuery) => void;
}

const formSchema = z.object({
  search: z.string(),
  selectedCategories: z.array(z.string()),
  selectedServices: z.array(z.string()),
  selectedAreas: z.array(z.string()),
});

const SearchFormWithFilter = ({ handleSearch, handleFilter }: SearchFormWithFilter) => {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      selectedCategories: [],
      selectedServices: [],
      selectedAreas: [],
    },
  });

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

  useEffect(() => {
    form.setValue('search', searchString);
    form.setValue('selectedCategories', categories);
    form.setValue('selectedServices', services);
    form.setValue('selectedAreas', areas);
  }, [searchString, categories, services, areas]);

  useEffect(() => {
    // @ts-ignore
    const subscription = form.watch(form.handleSubmit(handleFilter));
    // @ts-ignore
    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <div className='flex items-center gap-2 p-4'>
          <div className='rounded-sm bg-secondary/10 p-2'>
            <Search className='h-6 w-6 text-secondary' />
          </div>
          <FormField
            control={form.control}
            name='search'
            render={({ field }) => (
              <>
                <FormControl>
                  <Input
                    placeholder='Search Area, Location Category...'
                    className='h-8 border-none text-secondary placeholder:text-secondary focus-visible:ring-secondary/10'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
          <FilterWidget />
        </div>
      </form>
    </Form>
  );
};

export default SearchFormWithFilter;
