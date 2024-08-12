import { useState } from 'react';

// Components
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import CategoryFilter from '@/components/SearchBar/FilterWidget/CategoryFilter';
import ServiceFilter from '@/components/SearchBar/FilterWidget/ServiceFilter';
import AreaFilter from '@/components/SearchBar/FilterWidget/AreaFilter';
import { SlidersHorizontal } from 'lucide-react';

// Types
import { StringToBoolean } from 'class-variance-authority/types';

interface FormWidget {
  onSubmit: () => void;
}

const FilterWidget = ({ onSubmit }: FormWidget) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <div className='cursor-pointer rounded-sm bg-secondary/10 p-2' onClick={() => setOpen(true)}>
          <SlidersHorizontal className='h-6 w-6 text-secondary' />
        </div>
      </SheetTrigger>
      <SheetContent
        side={'left' as StringToBoolean<'left'>}
        className='mt-auto flex h-[calc(100vh-70px)] w-full flex-col pb-[70px] pt-0'
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

          <div className='grid gap-4 pt-4'>
            <AreaFilter />
          </div>

          <SheetFooter className='absolute bottom-0 left-0 right-0 flex h-[70px] items-center justify-center border-t-[1px] bg-white'>
            <SheetClose asChild>
              <Button
                type='submit'
                className='w-1/2'
                onClick={() => {
                  onSubmit();
                  setOpen(false);
                }}
              >
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterWidget;
