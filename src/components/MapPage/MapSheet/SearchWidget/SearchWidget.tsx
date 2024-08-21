import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Components
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import PlaceList from '@/components/MapPage/MapSheet/SearchWidget/PlaceList';

// Hooks
import useLocations from '@/hooks/useLocation';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';

// Types
import { StringToBoolean } from 'class-variance-authority/types';
import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMapSheetCtx } from '@/contexts/MapProvider/MapSheetProvider';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import * as React from 'react';
import LocationCard from '@/components/Locations/Location/LocationCard';

const SearchWidget = () => {
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { ref, inView } = useInView({ threshold: 0 });

  const { searchTextParams } = useMapParamsCtx();
  const { triggerClose } = useMapSheetCtx();

  const { locations, hasMoreData, isLoadingMoreData, isLocationLoading, fetchMoreData } = useLocations();

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  const totalLocations = useMemo(() => locations?.pages?.[0]?.meta?.pagination?.total || 0, [locations]);

  useEffect(() => {
    if (inView && hasMoreData) {
      fetchMoreData();
    }
  }, [fetchMoreData, hasMoreData, inView]);

  if (!locationsData?.length) return;

  if (isDesktop || seeAll) {
    return (
      <>
        <SheetContent
          side={'left' as StringToBoolean<'left'>}
          className='z-20 mt-auto flex h-[calc(100vh-140px)] min-w-full flex-col py-0 md:h-[calc(100vh-70px)] md:min-w-[460px] md:pt-[90px]'
        >
          <div className='no-scrollbar overflow-y-scroll pt-4'>
            <SheetHeader>
              <SheetTitle className='text-left text-xl text-font-header'>
                <div className='flex items-center'>
                  <Button
                    variant='primary'
                    className='rounded-md bg-primary py-1 pl-1 font-bold text-white'
                    onClick={() => {
                      triggerClose();
                      setSeeAll(false);
                    }}
                  >
                    <ChevronLeft />
                    Back
                  </Button>
                  <div className={cn(isDesktop ? '' : 'ml-4 text-sm')}>
                    Pet Friendly Places <span className='text-secondary'>{`"${searchTextParams}"`}</span>
                  </div>

                  <span className={'ml-auto font-gaegu text-sm text-font-description'}>({totalLocations} Places)</span>
                </div>
              </SheetTitle>
            </SheetHeader>

            <Separator className='mt-3' />

            <PlaceList
              ref={ref}
              data={locationsData}
              isLoading={isLocationLoading}
              hasMoreData={hasMoreData}
              isLoadingMoreData={isLoadingMoreData}
              loadMoreData={fetchMoreData}
            />
          </div>
        </SheetContent>
      </>
    );
  }

  return (
    <>
      <SheetContent side={'bottom' as StringToBoolean<'bottom'>} className='h-auto min-w-full py-4'>
        <SheetHeader>
          <SheetTitle className='text-left text-xl text-font-header'>
            <div className='mb-2 flex items-center'>
              <div className='text-sm'>
                Pet Friendly Places{' '}
                <span
                  className='ml-2 cursor-pointer font-gaegu text-secondary underline'
                  onClick={() => setSeeAll(true)}
                >
                  See all
                </span>
              </div>

              <X className='ml-auto h-5 w-5 text-primary' />
            </div>
          </SheetTitle>
        </SheetHeader>

        <LocationCard data={locationsData[0]} />
      </SheetContent>
    </>
  );
};

export default SearchWidget;
