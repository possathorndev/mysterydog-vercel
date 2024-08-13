import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Service } from '@/lib/api/services';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Control, useController } from 'react-hook-form';

interface ServiceBadge {
  item: Service;
  formController: Control;
  handleSubmit?: (search: string) => Promise<void>;
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

const ServiceBadge = ({ item, formController, handleSubmit }: ServiceBadge) => {
  const { field } = useController({
    name: 'selectedServices',
    control: formController,
  });

  const isSelected = field.value.includes(item.slug);

  const handleClick = () => {
    if (isSelected) {
      field.onChange(field.value.filter((slug: string) => slug !== item.slug));
    } else {
      field.onChange([...field.value, item.slug]);
    }
  };

  return (
    <Button asChild className='mb-1 mr-1 px-3' onClick={handleClick}>
      {/* TODO: to use ServiceDisplayBadge */}
      <Badge
        style={{
          ...(isSelected
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
