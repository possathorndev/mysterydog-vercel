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

const FilterWidget = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} modal={false}>
      <SheetTrigger asChild>
        <div
          className={`cursor-pointer rounded-sm p-2 ${open ? 'bg-secondary' : 'bg-secondary/10'}`}
          onClick={() => setOpen(!open)}
        >
          <SlidersHorizontal className={`h-6 w-6 ${open ? 'text-white' : 'text-secondary'}`} />
        </div>
      </SheetTrigger>
      <SheetContent
        side={'left' as StringToBoolean<'left'>}
        className='mt-auto flex h-[calc(100vh-70px)] w-full flex-col py-0'
      >
        <div className='no-scrollbar overflow-y-scroll py-4'>
          <SheetHeader>
            <SheetTitle className='text-left text-xl text-font-header'>Filter list</SheetTitle>
          </SheetHeader>

          <Separator className='mt-3' />

          <div className='grid gap-4 py-4'>
            <CategoryFilter />
          </div>

          <div className='grid gap-4 py-4'>
            <ServiceFilter />
          </div>

          <div className='mb-2 grid gap-4'>
            <AreaFilter />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterWidget;
