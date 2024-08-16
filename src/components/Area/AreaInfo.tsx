'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import LocationCard from '@/components/Locations/Location/LocationCard';
import { ServiceDisplayBadge } from '@/components/MapPage/MapSheet/FilterWidget/ServiceBadge';
import useLocations, { useLocationServices } from '@/hooks/useLocation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Area } from '@/lib/api/areas';

const AreaInfo = ({ data }: { data: Area }) => {
  const tAreaPage = useTranslations('AreaPage');
  const { services, isServiceLoading } = useLocationServices({ query: {} });
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { locations, isLocationLoading } = useLocations();
  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  return (
    <div className='flex w-full flex-col gap-2 px-2 py-2 md:gap-6 md:px-6 md:py-8'>
      <div className='text-2xl font-bold text-font-header'>
        {tAreaPage('detailTitle')} <span className='text-secondary'>{data.name}</span> (100)
      </div>
      {!isServiceLoading && services?.data?.length && (
        <div className='flex flex-wrap gap-2'>
          {services?.data?.map((service) => (
            <ServiceDisplayBadge key={service.id} item={service.attributes} isSelected />
          ))}
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: data.description }} className='prose font-gaegu lg:prose-xl' />
      <div className='flex flex-col gap-2'>
        <div className='text-2xl font-bold text-font-header'>
          <span className='text-secondary'>{data.name}</span> {tAreaPage('detailLocationTitle')}
        </div>
        {isLocationLoading ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>Loading...</div>
        ) : !locationsData?.length ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>
            &quot;There Are No Places In This Area&quot;
          </div>
        ) : (
          <div className='grid grid-cols-1 place-items-center gap-4 md:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-3'>
            {locationsData?.map((location, index) => (
              <LocationCard
                key={index}
                data={location}
                imagePosition={isDesktop ? 'top' : 'left'}
                size={isDesktop ? 'small' : 'large'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaInfo;
