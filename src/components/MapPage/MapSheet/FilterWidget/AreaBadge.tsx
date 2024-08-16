import { Area } from '@/lib/api/areas';
import { Checkbox } from '@/components/ui/checkbox';
import { Control, useController, useFormContext } from 'react-hook-form';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';

interface AreaBadge {
  item: Area;
  formController: Control;
  selectAll: boolean;
  showAlphabet?: boolean;
  handleSubmit?: () => void;
}

const AreaBadge = ({ formController, handleSubmit, item, showAlphabet = false, selectAll }: AreaBadge) => {
  const { handleUpdateParams } = useMapParamsCtx();

  const form = useFormContext();
  const { setValue } = form;

  const { field } = useController({
    name: 'selectedAreas',
    control: formController,
  });

  const isSelected = field.value.includes(item.slug);

  const handleClick = () => {
    const updatedParams = isSelected
      ? field.value.filter((slug: string) => slug !== item.slug)
      : [...field.value, item.slug];

    field.onChange(updatedParams);

    handleSubmit?.();

    handleUpdateParams('areas', updatedParams);
    setValue('selectedLocation', '');
  };

  return (
    <div className='flex items-center'>
      <Checkbox
        className='border-secondary data-[state=checked]:bg-secondary'
        checked={isSelected || selectAll}
        onClick={handleClick}
      />
      <p className='ml-2 text-sm text-secondary'>{item.name}</p>
    </div>
  );
};

export default AreaBadge;
