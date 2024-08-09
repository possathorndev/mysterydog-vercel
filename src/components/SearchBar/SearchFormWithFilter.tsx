'use client';

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
      selectedCategories: [],
      selectedServices: [],
      selectedAreas: [],
    },
  });

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
          <FilterWidget onSubmit={form.handleSubmit(handleFilter)} />
        </div>
      </form>
    </Form>
  );
};

export default SearchFormWithFilter;
