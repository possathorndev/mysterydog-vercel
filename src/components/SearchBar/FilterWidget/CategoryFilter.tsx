import { useMemo } from 'react';

// API
import { Category } from '@/lib/api/categories';

// Hooks
import { useLocationCategories } from '@/hooks/useLocation';
import { useMapParamsCtx } from '@/contexts/MapParamsProvider';

// Components
import CategoryBadge from '@/components/SearchBar/CategoryBadge';
import { Label } from '@/components/ui/label';
import ConnectForm from '@/components/FormConnect/FormConnect';

interface CategoryFilter {
  onSubmit: () => void;
}

const CategoryFilter = ({ onSubmit }: CategoryFilter) => {
  const { hasCategoriesParams } = useMapParamsCtx();
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
              By Category <span className='font-gaegu text-font-description/50'>(multiple select)</span>
            </Label>
            {isCategoryLoading ? (
              <span>Loading ...</span>
            ) : (
              <div className='grid grid-cols-4 gap-2'>
                {categoriesData?.map((item: Category, index) => (
                  <CategoryBadge
                    key={index}
                    item={item}
                    formController={control}
                    selectAll={!hasCategoriesParams}
                    handleSubmit={onSubmit}
                    showIcon
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
