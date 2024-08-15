import { useMemo, useState } from 'react';

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
import { useMapParamsCtx } from '@/contexts/MapParamsProvider';
import { Badge } from '@/components/ui/badge';

interface FilterWidget {
  onSubmit: () => void;
}

const FilterWidget = ({ onSubmit }: FilterWidget) => {
  const { categoriesParams, servicesParams, areasParams } = useMapParamsCtx();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [open, setOpen] = useState<boolean>(false);

  const filterCount = useMemo(() => {
    const categoriesCount = categoriesParams ? categoriesParams.split(',').filter(Boolean).length : 0;
    const servicesCount = servicesParams ? servicesParams.split(',').filter(Boolean).length : 0;
    const areasCount = areasParams ? areasParams.split(',').filter(Boolean).length : 0;

    return categoriesCount + servicesCount + areasCount;
  }, [categoriesParams, servicesParams, areasParams]);

  return (
    <Sheet open={open} modal={false}>
      <SheetTrigger asChild>
        <div
          className={`flex cursor-pointer items-center rounded-sm p-2 md:p-0 ${open ? 'bg-secondary' : 'bg-secondary/10'} md:bg-white`}
          onClick={() => setOpen(!open)}
        >
          <SlidersHorizontal
            className={`h-6 w-6 md:h-5 md:w-5 ${open ? 'text-white' : 'text-secondary'} md:text-secondary`}
          />
          {isDesktop && <p className='ml-1 text-sm font-bold text-font-header'>Filters</p>}
          {filterCount > 0 && (
            <Badge className='absolute mb-7 ml-5 flex h-5 w-5 items-center justify-center px-0 py-0 md:relative md:mb-0 md:ml-1'>
              {filterCount}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        side={'left' as StringToBoolean<'left'>}
        className='z-20 mt-auto flex h-[calc(100vh-140px)] min-w-full flex-col py-0 md:h-[calc(100vh-70px)] md:min-w-[460px] md:pt-[90px]'
      >
        <div className='no-scrollbar overflow-y-scroll pt-4'>
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

          <div className='mb-2 grid gap-4 py-4'>
            <AreaFilter onSubmit={onSubmit} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterWidget;
