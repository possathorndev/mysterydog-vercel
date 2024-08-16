'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { debounce } from 'next/dist/server/utils';

// Hooks
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocationCategories } from '@/hooks/useLocation';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';

// Types
import { Category } from '@/lib/api/categories';

// Components
import CategoryBadge from '@/components/MapPage/MapSheet/FilterWidget/CategoryBadge';
import { useMapFormCtx } from '@/contexts/MapProvider/MapFormProvider';

const QuickFilterMenu = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const categoriesSearchParams = useSearchParams().get('categories');
  const { categoriesParams } = useMapParamsCtx();

  const { isCategoryLoading, categories: categoriesData } = useLocationCategories({ query: {} });

  const allCategories = useMemo(() => {
    return categoriesData?.data?.flatMap((category) => category.attributes);
  }, [categoriesData]);

  const { onFilter } = useMapFormCtx();
  const form = useFormContext();
  const { control, handleSubmit, setValue } = form;

  const categories = useMemo(() => {
    return categoriesSearchParams ? categoriesSearchParams.split(',') : [];
  }, [categoriesSearchParams]);

  const debouncedSubmit = useCallback(
    debounce(() => {
      console.log('submitting ...');
      handleSubmit(onFilter)();
    }, 200),
    [],
  );

  useEffect(() => {
    setValue('selectedCategories', categories);
    debouncedSubmit();
  }, [categories]);

  return (
    <div>
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
              handleSubmit={handleSubmit(onFilter)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickFilterMenu;
