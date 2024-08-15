'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import FilterWidget from '@/components/SearchBar/FilterWidget/FilterWidget';
import { debounce } from 'next/dist/server/utils';
import { Separator } from '@/components/ui/separator';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface LocationSearchQuery {
  search?: string;
  selectedCategories?: string[];
  selectedServices?: string[];
  selectedAreas?: string[];
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
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const searchParams = useSearchParams();

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      selectedCategories: [],
      selectedServices: [],
      selectedAreas: [],
    },
  });
  const { control, handleSubmit, setValue } = methods;

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

  const debouncedSubmit = useCallback(
    debounce(() => {
      console.log('submitting ...');
      methods.handleSubmit(handleFilter)();
    }, 1000),
    [],
  );

  useEffect(() => {
    setValue('search', searchString);
    setValue('selectedCategories', categories);
    setValue('selectedServices', services);
    setValue('selectedAreas', areas);

    methods.handleSubmit(handleFilter)();
  }, [searchString, categories, services, areas]);

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className='flex items-center gap-2 p-4 md:h-[55px] md:rounded-sm md:border-2 md:border-secondary/10'>
          <div className='rounded-sm bg-secondary/10 p-2'>
            <Search className='h-6 w-6 text-secondary md:h-5 md:w-5' />
          </div>
          <FormField
            control={control}
            name='search'
            render={({ field }) => (
              <>
                <FormControl>
                  <Input
                    placeholder='Search Area, Location Category...'
                    className='z-20 h-8 border-none text-font-header placeholder:text-secondary focus-visible:ring-secondary/10 md:focus-visible:ring-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
          {isDesktop && <Separator className='h-[55px]' orientation='vertical' />}
          <FilterWidget onSubmit={handleSubmit(handleFilter)} />
        </div>
      </form>
    </Form>
  );
};

export default SearchFormWithFilter;
