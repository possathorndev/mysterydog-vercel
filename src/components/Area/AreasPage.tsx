'use client';

import AreaCard from '@/components/Area/AreaCard';
import LocationCard from '@/components/Locations/Location/LocationCard';
import { useAreas, useAreasWithLocationCount } from '@/hooks/useArea';
import { useLocationsNearMe } from '@/hooks/useLocation';
import { toUpperCaseFirstLetter } from '@/utils/helpers';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useGeolocationCtx } from '@/contexts/GeolocationProvider';
import { Location } from '@/lib/api/locations';
import { MAPS_PATH } from '@/constants/config';
import { useRouter } from '@/utils/navigation';

const AreasPage = () => {
  const router = useRouter();
  const params = useParams<{ city: string }>();

  const tGlobal = useTranslations('Global');
  const tHome = useTranslations('HomePage');
  const tAreaPage = useTranslations('AreaPage');
  const tLocationPage = useTranslations('LocationPage');

  const { currentLocation } = useGeolocationCtx();
  const { areas, isLoading } = useAreasWithLocationCount();

  const areasData = useMemo(() => {
    return areas?.data?.map((location) => location.attributes);
  }, [areas]);

  const { locations, isLoading: isLocationLoading } = useLocationsNearMe();
  const locationsData = useMemo(() => {
    return locations?.data?.map((location) => location.attributes);
  }, [locations]);

  const onLocationCardClick = (location: Location) => router.push(`${MAPS_PATH}/${location.slug}`);

  return (
    <div className='mx-auto my-6 flex min-h-[calc(100vh-230px)] max-w-screen-2xl flex-col gap-6 px-6'>
      <div className='text-2xl font-bold text-font-header'>
        {tAreaPage('title', { city: toUpperCaseFirstLetter(params.city) })}
      </div>

      {!currentLocation ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>
          &quot;{tLocationPage('noLocationPermission')}&quot;
        </div>
      ) : isLoading ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>{tGlobal('loading')}</div>
      ) : !areasData?.length ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>&quot;{tAreaPage('noArea')}&quot;</div>
      ) : (
        <div className='flex flex-wrap gap-2'>
          {areasData?.map((item, index) => (
            <AreaCard key={index} data={item} locationCount={item.locationsCount || 0} border navigateToMap />
          ))}
        </div>
      )}

      <div className='text-2xl font-bold text-font-header'>{tHome('locationHeader')}</div>

      {isLocationLoading ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>{tGlobal('loading')}</div>
      ) : !locationsData?.length ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>
          &quot;{tLocationPage('noLocation')}&quot;
        </div>
      ) : (
        <div className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {locationsData?.map((location, index) => (
            <div className='cursor-pointer' key={index}>
              <LocationCard data={location} imagePosition='top' onClick={() => onLocationCardClick(location)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreasPage;
