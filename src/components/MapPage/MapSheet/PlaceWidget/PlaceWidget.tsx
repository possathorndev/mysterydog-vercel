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

import Image from 'next/image';
import { Link } from '@/utils/navigation';

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
      className='z-40 mt-auto flex h-[calc(100vh-70px)] min-w-full flex-col px-0 py-0 pb-[60px] md:h-[calc(100vh-0px)] md:min-w-[460px] md:pt-[90px]'
    >
      <div className='no-scrollbar overflow-y-scroll'>
        <SheetHeader className='md:mb-5'>
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
          </div>
        </SheetHeader>

        <PlaceImages images={place.images} />
        <PlaceContent data={place} />

        <div className='absolute bottom-0 w-full border-t-[1px] bg-white px-4 py-2'>
          <Link href={place.googleMapUrl} target='_blank' rel='noreferrer noopener'>
            <Button className='w-full bg-secondary hover:bg-secondary'>
              <Image src={'/icons/navigation.png'} alt='Navigation' width={20} height={20} className='mr-2' />
              Open map
            </Button>
          </Link>
        </div>
      </div>
    </SheetContent>
  );
};

export default PlaceWidget;
