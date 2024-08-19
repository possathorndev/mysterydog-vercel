// Components
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hooks
import { useMapSheetCtx } from '@/contexts/MapProvider/MapSheetProvider';

// Types
import { StringToBoolean } from 'class-variance-authority/types';
import { Location } from '@/lib/api/locations';
import PlaceImages from '@/components/MapPage/MapSheet/PlaceWidget/PlaceImages';
import PlaceContent from '@/components/MapPage/MapSheet/PlaceWidget/PlaceContent';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface PlaceWidget {
  place: Location;
}

const PlaceWidget = ({ place }: PlaceWidget) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { triggerClose } = useMapSheetCtx();

  const defaultCategory = place.categories?.data?.[0]?.attributes;

  return (
    <SheetContent
      side={'left' as StringToBoolean<'left'>}
      className='z-40 mt-auto flex h-[calc(100vh-70px)] min-w-full flex-col px-0 py-0 md:h-[calc(100vh-0px)] md:min-w-[460px] md:pt-[90px]'
    >
      <div className='no-scrollbar overflow-y-scroll'>
        <SheetHeader className='mb-5'>
          <div
            style={{ ...(!isDesktop && { backgroundColor: defaultCategory?.color }) }}
            className='flex items-center px-4 py-1'
          >
            <Button
              className='rounded-md border-[1px] border-white/60 bg-white/20 py-1 pl-1 font-bold text-white hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 md:bg-primary/20 md:text-primary'
              onClick={triggerClose}
            >
              <ChevronLeft />
              Back
            </Button>
            <SheetTitle className='ml-2 text-left font-gaegu text-xl text-white md:font-sans md:text-font-header'>
              {place.name}
            </SheetTitle>

            {/*<Button*/}
            {/*  className='ml-auto rounded-full bg-secondary/20 text-secondary hover:bg-secondary hover:text-white'*/}
            {/*  onClick={triggerClose}*/}
            {/*>*/}
            {/*  <X className='h-4 w-4' />*/}
            {/*</Button>*/}
          </div>
        </SheetHeader>

        <PlaceImages images={place.images} />
        <PlaceContent data={place} />
      </div>
    </SheetContent>
  );
};

export default PlaceWidget;
