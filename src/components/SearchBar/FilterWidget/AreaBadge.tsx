import { Area } from '@/lib/api/areas';
import { Checkbox } from '@/components/ui/checkbox';
import { Control, useController } from 'react-hook-form';

interface AreaBadge {
  item: Area;
  formController: Control;
  showAlphabet?: boolean;
  handleSubmit?: (search: string) => Promise<void>;
}

const AreaBadge = ({ formController, item, showAlphabet = false, handleSubmit }: AreaBadge) => {
  const { field } = useController({
    name: 'selectedAreas',
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
    <div className='flex items-center'>
      <Checkbox
        className='border-secondary data-[state=checked]:bg-secondary'
        checked={isSelected}
        onClick={handleClick}
      />
      <p className='ml-2 text-sm text-secondary'>{item.name}</p>
    </div>
  );
};

export default AreaBadge;
