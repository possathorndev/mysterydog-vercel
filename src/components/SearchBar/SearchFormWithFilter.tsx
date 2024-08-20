'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { debounce } from 'next/dist/server/utils';

// Hooks
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSearchParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { useMapSheetCtx } from '@/contexts/MapProvider/MapSheetProvider';

// Components
import { Search } from 'lucide-react';
import { FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FilterWidget, { FilterSheetTrigger } from '@/components/MapPage/MapSheet/FilterWidget/FilterWidget';
import { Separator } from '@/components/ui/separator';

// Context
import { useMapFormCtx } from '@/contexts/MapProvider/MapFormProvider';

const SearchFormWithFilter = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const searchParams = useSearchParams();

  const { open, triggerOpen } = useMapSheetCtx();
  const { onFilter } = useMapFormCtx();

  const form = useFormContext();
  const { control, handleSubmit, setValue } = form;

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
      handleSubmit(onFilter)();
    }, 200),
    [],
  );

  useEffect(() => {
    setValue('search', searchString);
    setValue('selectedCategories', categories);
    setValue('selectedServices', services);
    setValue('selectedAreas', areas);

    debouncedSubmit();
  }, [searchString, categories, services, areas]);

  const onTrigger = () => triggerOpen(!open, <FilterWidget onSubmit={handleSubmit(onFilter)} />);

  return (
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

      <FilterSheetTrigger handleTrigger={onTrigger} />
    </div>
  );
};

export default SearchFormWithFilter;
