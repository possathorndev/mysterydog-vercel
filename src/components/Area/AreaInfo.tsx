'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import LocationCard from '@/components/Locations/Location/LocationCard';
import { ServiceDisplayBadge } from '@/components/MapPage/MapSheet/FilterWidget/ServiceBadge';
import { useLocationServices } from '@/hooks/useLocation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Area } from '@/lib/api/areas';
import { Location } from '@/lib/api/locations';

interface AreaInfo {
  area: Area;
  locations: Location[];
  totalLocations: number;
  isLocationLoading: boolean;
  onLocationClick: (location: Location) => void;
}

const AreaInfo = ({ area, totalLocations, locations, isLocationLoading, onLocationClick }: AreaInfo) => {
  const tGlobal = useTranslations('Global');
  const tAreaPage = useTranslations('AreaPage');

  const { services, isServiceLoading } = useLocationServices({ query: {} });
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className='flex w-full flex-col gap-2 px-2 py-2 md:gap-6 md:px-6 md:py-8'>
      <div className='text-2xl font-bold text-font-header'>
        {tAreaPage('detailTitle')} <span className='text-secondary'>{area.name}</span> ({totalLocations})
      </div>
      {!isServiceLoading && services?.data?.length && (
        <div className='flex flex-wrap gap-2'>
          {services?.data?.map((service) => (
            <ServiceDisplayBadge key={service.id} item={service.attributes} isSelected />
          ))}
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: area.description }} className='prose font-gaegu lg:prose-xl' />
      <div className='flex flex-col gap-2'>
        <div className='mb-2 text-2xl font-bold text-font-header'>
          <span className='text-secondary'>{area.name}</span> {tAreaPage('detailLocationTitle')}
        </div>
        {isLocationLoading ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>{tGlobal('loading')}</div>
        ) : !locations?.length ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>
            &quot;{tAreaPage('noLocation')}&quot;
          </div>
        ) : (
          <div className='grid grid-cols-1 place-items-center gap-4 md:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-3'>
            {locations?.map((location, index) => (
              <div key={index} className='cursor-pointer' onClick={() => onLocationClick(location)}>
                <LocationCard
                  data={location}
                  imagePosition={isDesktop ? 'top' : 'left'}
                  size={isDesktop ? 'small' : 'large'}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaInfo;
