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
import { Separator } from '@/components/ui/separator';
import FilterWidget, { FilterSheetTrigger } from '@/components/MapPage/MapSheet/FilterWidget/FilterWidget';
import SearchWidget from '@/components/MapPage/MapSheet/SearchWidget/SearchWidget';

// Context
import { useMapFormCtx } from '@/contexts/MapProvider/MapFormProvider';
import { useTranslations } from 'next-intl';

const SearchFormWithFilter = () => {
  const tSearchWidget = useTranslations('SearchWidget');

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const searchParams = useSearchParams();

  const { open, triggerOpen } = useMapSheetCtx();
  const { onFilter, onClearFilter } = useMapFormCtx();

  const form = useFormContext();
  const { control, handleSubmit, setValue, watch } = form;

  const searchString = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  useEffect(() => {
    triggerOpen(!!searchString, <SearchWidget />);
  }, [searchString]);

  const onFilterWidgetTrigger = () =>
    triggerOpen(!open, <FilterWidget onSubmit={handleSubmit(onFilter)} onClearFilter={onClearFilter} />);

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
                placeholder={tSearchWidget('placeholder')}
                className='z-20 h-8 border-none text-font-header placeholder:text-secondary focus-visible:ring-secondary/10 md:focus-visible:ring-0'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </>
        )}
      />
      {isDesktop && <Separator className='h-[55px]' orientation='vertical' />}

      <FilterSheetTrigger handleTrigger={onFilterWidgetTrigger} />
    </div>
  );
};

export default SearchFormWithFilter;
