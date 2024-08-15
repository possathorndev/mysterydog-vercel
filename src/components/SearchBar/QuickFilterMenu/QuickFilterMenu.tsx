'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { debounce } from 'next/dist/server/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocationCategories } from '@/hooks/useLocation';
import { Category } from '@/lib/api/categories';
import CategoryBadge from '@/components/SearchBar/CategoryBadge';
import { useMapParamsCtx } from '@/contexts/MapParamsProvider';

export interface LocationSearchQuery {
  selectedCategories: string[];
}

export interface QuickFilterMenu {
  handleFilter: (searchQuery: LocationSearchQuery) => void;
}

const formSchema = z.object({
  selectedCategories: z.array(z.string()),
});

const QuickFilterMenu = ({ handleSearch, handleFilter }: QuickFilterMenu) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const searchParams = useSearchParams();
  const { categoriesParams } = useMapParamsCtx();

  const { isCategoryLoading, categories: categoriesData } = useLocationCategories({ query: {} });

  const allCategories = useMemo(() => {
    return categoriesData?.data?.flatMap((category) => category.attributes);
  }, [categoriesData]);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedCategories: [],
    },
  });
  const { control, handleSubmit, setValue } = methods;

  const categories = useMemo(() => {
    const categoriesString = searchParams.get('categories');
    return categoriesString ? categoriesString.split(',') : [];
  }, [searchParams]);

  const debouncedSubmit = useCallback(
    debounce(() => {
      console.log('submitting ...');
      methods.handleSubmit(handleFilter)();
    }, 1000),
    [],
  );

  useEffect(() => {
    setValue('selectedCategories', categories);
    methods.handleSubmit(handleFilter)();
  }, [categories]);

  return (
    <Form {...methods}>
      <form>
        {isCategoryLoading ? (
          <></>
        ) : (
          <div
            className={
              isDesktop ? 'ml-[40px] mt-[20px] grid grid-cols-8 gap-1' : 'no-scrollbar flex overflow-x-scroll px-2 pt-2'
            }
          >
            {allCategories?.map((item: Category, index) => (
              <CategoryBadge
                key={index}
                item={item}
                displayMode={isDesktop ? 'sm' : 'md'}
                formController={control}
                selectAll={!categoriesParams}
                handleSubmit={handleSubmit(handleFilter)}
              />
            ))}
          </div>
        )}
      </form>
    </Form>
  );
};

export default QuickFilterMenu;
