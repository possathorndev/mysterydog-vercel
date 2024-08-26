'use client';

import LocationCard from '@/components/Locations/Location/LocationCard';
import { MAPS_PATH } from '@/constants/config';
import { useLocationsNearMe } from '@/hooks/useLocation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useMemo } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const LocationNearMe = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const tHome = useTranslations('HomePage');
  const tGlobal = useTranslations('Global');
  const tLocationPage = useTranslations('LocationPage');

  const { locations, isLoading } = useLocationsNearMe();
  const locationsData = useMemo(() => {
    return locations?.data?.map((location) => location.attributes);
  }, [locations]);

  return (
    <div className='flex flex-col gap-2 md:gap-6'>
      {/* Mobile Header */}
      <div className='flex items-center gap-4 md:hidden'>
        <div className='text-2xl font-bold text-font-header'>{tHome('locationHeader')}</div>
        <Link className='font-gaegu text-lg font-bold text-secondary' href={MAPS_PATH}>
          {tGlobal('seeAll')}
        </Link>
      </div>
      {/* Desktop Header */}
      <div className='hidden items-center justify-center md:flex md:flex-col'>
        <div className='text-2xl font-bold text-font-header'>{tHome('locationHeader')}</div>
        <div className='font-gaegu text-lg font-bold text-primary'>{tHome('locationDescription')}</div>
      </div>

      {isLoading ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>{tGlobal('loading')}</div>
      ) : !locationsData?.length ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>
          &quot;{tLocationPage('noLocation')}&quot;
        </div>
      ) : isDesktop ? (
        <div className='flex flex-wrap justify-center gap-4'>
          {locationsData?.map((location, index) => (
            <LocationCard key={index} data={location} imagePosition='top' size='small' showOpeningHourButton />
          ))}
        </div>
      ) : (
        <ScrollArea className='w-[calc(100vw-25px)] max-w-screen-2xl whitespace-nowrap md:w-[calc(100vw-50px)]'>
          <div className='mt-4 flex gap-2'>
            {locationsData?.map((location, index) => (
              <LocationCard key={index} data={location} imagePosition='top' size='small' showOpeningHourButton />
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      )}

      {!!locationsData?.length && (
        <Link className='mx-auto hidden font-gaegu text-lg font-bold text-primary md:block' href={MAPS_PATH}>
          {tGlobal('seeAll')}
        </Link>
      )}
    </div>
  );
};

export default LocationNearMe;
