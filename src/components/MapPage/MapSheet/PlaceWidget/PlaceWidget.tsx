import Image from 'next/image';
import { Link } from '@/utils/navigation';

// Components
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlaceImages from '@/components/MapPage/MapSheet/PlaceWidget/PlaceImages';
import PlaceContent from '@/components/MapPage/MapSheet/PlaceWidget/PlaceContent';

// Hooks
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocationBySlug } from '@/hooks/useLocation';
import { useMapSheetCtx } from '@/contexts/MapProvider/MapSheetProvider';

// Types
import { StringToBoolean } from 'class-variance-authority/types';
import { useState } from 'react';
import LocationCard from '@/components/Locations/Location/LocationCard';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

interface PlaceWidget {
  slug: string;
}

const PlaceWidget = ({ slug }: PlaceWidget) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useFormContext();
  const { triggerClose } = useMapSheetCtx();

  const { data, isLoading } = useLocationBySlug(slug);

  if (isLoading || !data) return;

  const defaultCategory = data?.categories?.data?.[0]?.attributes;

  const onBack = () => {
    setExpanded(false);

    if (!isDesktop && expanded) return;

    triggerClose();
    form.setValue('selectedLocation', '');
    window.history.back();
  };

  if (isDesktop || expanded) {
    return (
      <SheetContent
        side={'left' as StringToBoolean<'left'>}
        className='z-40 mt-auto flex h-[calc(100vh-70px)] min-w-full flex-col px-0 py-0 pb-[60px] md:h-[calc(100vh-0px)] md:min-w-[460px] md:pt-[90px]'
      >
        <div className='no-scrollbar overflow-y-scroll'>
          <SheetHeader className='md:mb-5'>
            <div
              style={{
                ...(!isDesktop && {
                  backgroundColor: defaultCategory?.color,
                  ':hover': { backgroundColor: defaultCategory?.color },
                }),
              }}
              className='flex items-center px-4 py-1'
            >
              <Button
                className='rounded-md border-[1px] border-white/60 bg-white/20 py-1 pl-1 font-bold text-white hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0 md:bg-primary/20 md:text-primary'
                onClick={onBack}
              >
                <ChevronLeft />
                Back
              </Button>
              <SheetTitle className='ml-2 text-left font-gaegu text-xl text-white md:font-sans md:text-font-header'>
                {data.name}
              </SheetTitle>
            </div>
          </SheetHeader>

          <PlaceImages images={data.images} />
          <PlaceContent data={data} />

          <div className='absolute bottom-0 w-full border-t-[1px] bg-white px-4 py-2'>
            {data?.googleMapUrl && (
              <Link href={data.googleMapUrl} target='_blank' rel='noreferrer noopener'>
                <Button className='w-full bg-secondary hover:bg-secondary'>
                  <Image src={'/icons/navigation.png'} alt='Navigation' width={20} height={20} className='mr-2' />
                  Open map
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    );
  }

  return (
    <>
      <SheetContent side={'bottom' as StringToBoolean<'bottom'>} className='h-auto min-w-full py-4'>
        <SheetHeader>
          <SheetTitle className='mb-2'>
            <X className='ml-auto h-5 w-5 text-primary' onClick={onBack} />
          </SheetTitle>
        </SheetHeader>

        <div className='cursor-pointer' onClick={() => setExpanded(true)}>
          <LocationCard data={data} />
        </div>
      </SheetContent>
    </>
  );
};

export default PlaceWidget;
