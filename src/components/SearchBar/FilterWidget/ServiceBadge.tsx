import Image from 'next/image';
import { Control, useController } from 'react-hook-form';

// Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Types
import { Service } from '@/lib/api/services';
import { cn } from '@/lib/utils';
import { useMapParamsCtx } from '@/contexts/MapParamsProvider';

interface ServiceBadge {
  item: Service;
  formController: Control;
  selectAll: boolean;
  handleSubmit: () => void;
}

export const ServiceDisplayBadge = ({
  isSelected = false,
  item,
  small = false,
  showIcon = true,
}: {
  isSelected?: boolean;
  item: Service;
  small?: boolean;
  showIcon?: boolean;
}) => {
  return (
    <Badge
      style={{
        ...(isSelected
          ? { borderWidth: 1, borderColor: item.color, color: item.color, backgroundColor: `${item.color}10` }
          : { color: item.color, backgroundColor: `${item.color}10` }),
      }}
      className={cn('py-1', small ? 'px-2 text-[0.5rem]' : 'px-2 text-xs md:p-3')}
    >
      {showIcon && (
        <Image
          src={item?.icon?.data?.attributes?.url || ''}
          alt={item.slug}
          width={small ? 12 : 18}
          height={small ? 12 : 18}
          className='mr-2'
        />
      )}
      {item.name}
    </Badge>
  );
};

const ServiceBadge = ({ item, formController, selectAll, handleSubmit }: ServiceBadge) => {
  const { handleUpdateParams } = useMapParamsCtx();
  const { field } = useController({
    name: 'selectedServices',
    control: formController,
  });

  const isSelected = field.value.includes(item.slug);

  const handleClick = () => {
    const updatedParams = isSelected
      ? field.value.filter((slug: string) => slug !== item.slug)
      : [...field.value, item.slug];

    field.onChange(updatedParams);

    handleSubmit?.();

    handleUpdateParams('services', updatedParams);
  };

  return (
    <Button asChild className='mb-1 mr-1 px-3' onClick={handleClick}>
      {/* TODO: to use ServiceDisplayBadge */}
      <Badge
        style={{
          ...(isSelected || selectAll
            ? { borderWidth: 2, borderColor: item.color, color: item.color, backgroundColor: `${item.color}10` }
            : { color: item.color, backgroundColor: `${item.color}10` }),
        }}
        className='cursor-pointer'
      >
        <Image src={item?.icon?.data?.attributes?.url || ''} alt={item.slug} width={18} height={18} className='mr-2' />
        {item.name}
      </Badge>
    </Button>
  );
};

export default ServiceBadge;
