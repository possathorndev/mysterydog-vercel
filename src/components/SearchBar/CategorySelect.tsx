import { useLocationCategories } from '@/hooks/useLocation';
import { useMemo } from 'react';
import { Category } from '@/lib/api/categories';

import { Button } from '@/components/ui/button';

const CategorySelect = ({ handleSubmit }: { handleSubmit?: (slug: string) => Promise<void> }) => {
  const { isCategoryLoading, categories } = useLocationCategories();

  const categoriesData = useMemo(() => categories?.data.flatMap((category) => category.attributes), [categories]);

  if (isCategoryLoading) return;

  return (
    <div className='flex w-full flex-col p-4'>
      <div className='text-bold text-xl font-bold text-[#0F1EAF]'>Search By</div>
      <div className='mt-4 flex w-full flex-wrap gap-2'>
        {categoriesData?.map((item: Category, index) => (
          <Button
            key={index}
            asChild
            variant='outline'
            style={{
              borderWidth: 2,
              borderColor: item.color,
              color: item.color,
            }}
            onClick={() => handleSubmit(item.slug)}
          >
            <p>{item.name}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
