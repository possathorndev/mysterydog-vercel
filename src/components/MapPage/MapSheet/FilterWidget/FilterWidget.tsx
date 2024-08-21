import { useMemo } from 'react';

// Components
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import CategoryFilter from '@/components/MapPage/MapSheet/FilterWidget/CategoryFilter';
import ServiceFilter from '@/components/MapPage/MapSheet/FilterWidget/ServiceFilter';
import AreaFilter from '@/components/MapPage/MapSheet/FilterWidget/AreaFilter';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

// Types
import { StringToBoolean } from 'class-variance-authority/types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';
import { Badge } from '@/components/ui/badge';
import { useMapSheetCtx } from '@/contexts/MapProvider/MapSheetProvider';
import { Button } from '@/components/ui/button';

export const FilterSheetTrigger = ({ handleTrigger }: { handleTrigger: () => void }) => {
  const { open } = useMapSheetCtx();
  const { categoriesParams, servicesParams, areasParams } = useMapParamsCtx();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const filterCount = useMemo(() => {
    const categoriesCount = categoriesParams ? categoriesParams.split(',').filter(Boolean).length : 0;
    const servicesCount = servicesParams ? servicesParams.split(',').filter(Boolean).length : 0;
    const areasCount = areasParams ? areasParams.split(',').filter(Boolean).length : 0;

    return categoriesCount + servicesCount + areasCount;
  }, [categoriesParams, servicesParams, areasParams]);

  return (
    <div
      className={`flex cursor-pointer items-center rounded-sm p-2 md:p-0 ${open ? 'bg-secondary' : 'bg-secondary/10'} md:bg-white`}
      onClick={handleTrigger}
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
  );
};

interface FilterWidget {
  onSubmit: () => void;
  onClearFilter: () => void;
}

const FilterWidget = ({ onSubmit, onClearFilter }: FilterWidget) => {
  const { categoriesParams, servicesParams, areasParams } = useMapParamsCtx();

  const filterCount = useMemo(() => {
    const categoriesCount = categoriesParams ? categoriesParams.split(',').filter(Boolean).length : 0;
    const servicesCount = servicesParams ? servicesParams.split(',').filter(Boolean).length : 0;
    const areasCount = areasParams ? areasParams.split(',').filter(Boolean).length : 0;

    return categoriesCount + servicesCount + areasCount;
  }, [categoriesParams, servicesParams, areasParams]);

  return (
    <SheetContent
      side={'left' as StringToBoolean<'left'>}
      className='z-20 mt-auto flex h-[calc(100vh-140px)] min-w-full flex-col py-0 md:h-[calc(100vh-70px)] md:min-w-[460px] md:pt-[90px]'
    >
      <div className='no-scrollbar overflow-y-scroll pt-4'>
        <SheetHeader>
          <div className='flex items-center justify-between'>
            <SheetTitle className='text-left text-xl text-font-header'>Filter list</SheetTitle>
            {filterCount > 0 && (
              <Button
                variant='secondary'
                className='bg-secondary/10 text-sm text-font-header hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0'
                onClick={onClearFilter}
              >
                <RotateCcw className='mr-1 text-secondary' width={16} strokeWidth={2} />
                Clean filters
              </Button>
            )}
          </div>
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
    // </Sheet>
  );
};

export default FilterWidget;
