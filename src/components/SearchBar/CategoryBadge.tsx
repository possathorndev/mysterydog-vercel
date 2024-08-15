import Image from 'next/image';

import { Control, useController } from 'react-hook-form';
import { useMapParamsCtx } from '@/contexts/MapParamsProvider';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/api/categories';

interface CategoryBadge {
  item: Category;
  selectAll?: boolean;
  showIcon?: boolean;
  formController?: Control;
  handleSubmit?: () => void;
}

const CategoryBadge = ({ item, handleSubmit, formController, selectAll = false, showIcon = false }: CategoryBadge) => {
  const { handleUpdateParams } = useMapParamsCtx();

  const { field } = useController({
    name: 'selectedCategories',
    control: formController,
  });

  const isSelected = field.value.includes(item.slug);

  const handleClick = () => {
    const updatedParams = isSelected
      ? field.value.filter((slug: string) => slug !== item.slug)
      : [...field.value, item.slug];

    field.onChange(updatedParams);

    handleSubmit?.();

    handleUpdateParams('categories', updatedParams);
  };

  // With icon
  if (showIcon) {
    return (
      <Button asChild onClick={handleClick} className='h-full w-full rounded-2xl'>
        <Badge
          style={{
            ...(isSelected || selectAll
              ? { backgroundColor: item.color, borderWidth: 4, borderColor: '#03071236' }
              : { backgroundColor: `${item.color}90` }),
          }}
          className='flex aspect-square cursor-pointer flex-col text-wrap text-center'
        >
          <Image src={item.icon.data.attributes.url} alt={item.slug} width={24} height={24} />
          <p className='mt-2 text-2xs text-white'>{item.name}</p>
        </Badge>
      </Button>
    );
  }

  // Without icon
  return (
    <Button asChild variant='ghost' onClick={() => {}}>
      <Badge
        variant='outline'
        style={{ borderColor: item.color, color: item.color }}
        className='cursor-pointer border-2 text-base'
      >
        {item.name}
      </Badge>
    </Button>
  );
};

export default CategoryBadge;
