import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const mockCategory = [
  {
    name: 'Cafe',
    slug: 'cafe',
    color: '#007AFF',
  },
  {
    name: 'Restaurants',
    slug: 'restaurants',
    color: '#98C002',
  },
  {
    name: 'Bars',
    slug: 'bars',
    color: '#FD641F',
  },
  {
    name: 'Shopping Malls',
    slug: 'shopping-mall',
    color: '#E8A302',
  },
];

const CategorySelect = ({ handleSubmit }: { handleSubmit?: (search: string) => Promise<void> }) => {
  return (
    <div className='flex w-full flex-col p-4'>
      <div className='text-bold text-xl font-bold text-[#0F1EAF]'>Search By</div>
      <div className='mt-4 flex w-full flex-wrap gap-2'>
        {mockCategory.map((item, index) => (
          <Button key={index} asChild variant='ghost' onClick={() => handleSubmit?.(item.slug)}>
            <Badge
              variant='outline'
              style={{ borderColor: item.color, color: item.color }}
              className='cursor-pointer border-2 text-base'
            >
              {item.name}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
