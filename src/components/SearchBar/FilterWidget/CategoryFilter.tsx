import { useMemo } from 'react';

// API
import { Category } from '@/lib/api/categories';

// Hooks
import { useLocationCategories } from '@/hooks/useLocation';

// Components
import CategoryBadge from '@/components/SearchBar/CategoryBadge';
import { Label } from '@/components/ui/label';
import ConnectForm from '@/components/FormConnect/FormConnect';

const CategoryFilter = () => {
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
                  <CategoryBadge key={index} item={item} formController={control} showIcon />
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
