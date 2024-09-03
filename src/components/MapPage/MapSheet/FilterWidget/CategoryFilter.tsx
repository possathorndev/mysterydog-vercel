import { useMemo } from 'react';

// API
import { Category } from '@/lib/api/categories';

// Hooks
import { useLocationCategories } from '@/hooks/useLocation';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';

// Components
import CategoryBadge from '@/components/MapPage/MapSheet/FilterWidget/CategoryBadge';
import { Label } from '@/components/ui/label';
import ConnectForm from '@/components/FormConnect/FormConnect';
import { useTranslations } from 'next-intl';

interface CategoryFilter {
  onSubmit: () => void;
}

const CategoryFilter = ({ onSubmit }: CategoryFilter) => {
  const tGlobal = useTranslations('Global');
  const tFilterWidget = useTranslations('FilterWidget');

  const { categoriesParams } = useMapParamsCtx();
  const { isCategoryLoading, categories } = useLocationCategories({ query: {} });

  const categoriesData = useMemo(() => {
    return categories?.data?.flatMap((category) => category.attributes);
  }, [categories]);

  return (
    <ConnectForm>
      {({ control }) => {
        return (
          <>
            <Label htmlFor='name' className='text-left font-bold text-primary'>
              {tFilterWidget('byCategory')}{' '}
              <span className='font-gaegu text-font-description/50'>({tFilterWidget('multipleSelect')})</span>
            </Label>
            {isCategoryLoading ? (
              <span>{tGlobal('loading')}</span>
            ) : (
              <div className='grid grid-cols-4 gap-2'>
                {categoriesData?.map((item: Category, index) => (
                  <CategoryBadge
                    key={index}
                    item={item}
                    formController={control}
                    selectAll={!categoriesParams}
                    handleSubmit={onSubmit}
                  />
                ))}
              </div>
            )}
          </>
        );
      }}
    </ConnectForm>
  );
};

export default CategoryFilter;
