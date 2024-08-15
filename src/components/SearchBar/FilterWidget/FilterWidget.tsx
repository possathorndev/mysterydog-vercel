import { useState } from 'react';

// Components
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import CategoryFilter from '@/components/SearchBar/FilterWidget/CategoryFilter';
import ServiceFilter from '@/components/SearchBar/FilterWidget/ServiceFilter';
import AreaFilter from '@/components/SearchBar/FilterWidget/AreaFilter';
import { SlidersHorizontal } from 'lucide-react';

// Types
import { StringToBoolean } from 'class-variance-authority/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface FilterWidget {
  onSubmit: () => void;
}

const FilterWidget = ({ onSubmit }: FilterWidget) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} modal={false}>
      <SheetTrigger asChild>
        <div
          className={`flex cursor-pointer items-center justify-center rounded-sm p-2 ${open ? 'bg-secondary' : 'bg-secondary/10'} md:bg-white`}
          onClick={() => setOpen(!open)}
        >
          <SlidersHorizontal className={`h-6 w-6 ${open ? 'text-white' : 'text-secondary'} md:text-secondary`} />
          {isDesktop && <p className='ml-1 mt-1 font-bold text-font-header'>Filters</p>}
        </div>
      </SheetTrigger>
      <SheetContent
        side={'left' as StringToBoolean<'left'>}
        className='mt-auto flex h-[calc(100vh-140px)] w-full flex-col py-0'
      >
        <div className='no-scrollbar overflow-y-scroll py-4'>
          <SheetHeader>
            <SheetTitle className='text-left text-xl text-font-header'>Filter list</SheetTitle>
          </SheetHeader>

          <Separator className='mt-3' />

          <div className='grid gap-4 py-4'>
            <CategoryFilter onSubmit={onSubmit} />
          </div>

          <div className='grid gap-4 py-4'>
            <ServiceFilter onSubmit={onSubmit} />
          </div>

          <div className='mb-2 grid gap-4'>
            <AreaFilter onSubmit={onSubmit} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterWidget;
