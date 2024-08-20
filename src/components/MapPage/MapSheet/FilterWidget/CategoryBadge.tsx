import Image from 'next/image';

import { Control, useController, useFormContext } from 'react-hook-form';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Category } from '@/lib/api/categories';
import { useMemo } from 'react';

interface CategoryBadge {
  item: Category;
  displayMode?: 'lg' | 'md' | 'sm';
  selectAll?: boolean;
  formController: Control;
  handleSubmit?: () => void;
}

const CategoryBadge = ({
  item,
  handleSubmit,
  formController,
  selectAll = false,
  displayMode = 'lg',
}: CategoryBadge) => {
  const { handleUpdateFilterParams } = useMapParamsCtx();

  const form = useFormContext();
  const { setValue } = form;

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

    handleUpdateFilterParams('categories', updatedParams);
    setValue('selectedLocation', '');
  };

  const buttonCn = useMemo(() => {
    switch (displayMode) {
      case 'sm':
        return 'flex items-center justify-center w-full rounded-3xl';
      case 'md':
        return 'h-16 min-w-16 rounded-2xl mx-[2px]';
      case 'lg':
      default:
        return 'h-full w-full rounded-2xl';
    }
  }, [displayMode]);

  const badgeCn = useMemo(() => {
    switch (displayMode) {
      case 'sm':
        return 'cursor-pointer text-wrap';
      case 'md':
      case 'lg':
      default:
        return 'flex aspect-square cursor-pointer flex-col text-wrap text-center';
    }
  }, [displayMode]);

  const textCn = useMemo(() => {
    switch (displayMode) {
      case 'sm':
        return 'ml-1 text-2xs text-white';
      case 'md':
        return 'mt-2 text-2xs text-white';
      case 'lg':
      default:
        return 'mt-2 text-2xs text-white';
    }
  }, []);

  return (
    <Button asChild onClick={handleClick} className={buttonCn}>
      <Badge
        style={{
          ...(isSelected || selectAll
            ? displayMode === 'lg'
              ? {
                  backgroundColor: item.color,
                  borderWidth: 4,
                  borderBottomWidth: 8,
                  borderRightWidth: 8,
                  borderColor: '#03071236',
                }
              : {
                  backgroundColor: item.color,
                  borderWidth: 2,
                  borderBottomWidth: 4,
                  borderRightWidth: 4,
                  borderColor: '#03071236',
                }
            : { backgroundColor: `${item.color}90` }),
        }}
        className={badgeCn}
      >
        <Image
          src={item.icon.data.attributes.url}
          alt={item.slug}
          width={displayMode === 'lg' ? 24 : 16}
          height={displayMode === 'lg' ? 24 : 16}
        />
        <p className={textCn}>{item.name}</p>
      </Badge>
    </Button>
  );
};

export default CategoryBadge;
