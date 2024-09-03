'use client';
import React, { useMemo } from 'react';

import useLocations from '@/hooks/useLocation';

// Components
import LocationCard from '@/components/Locations/Location/LocationCard';

// Types
import { Location } from '@/lib/api/locations';

const LocationList = () => {
  const { locations, isLocationLoading, hasMoreData, isLoadingMoreData, fetchMoreData } = useLocations();

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  if (isLocationLoading) return <p>Loading ...</p>;

  if (!locationsData || locationsData?.length < 1) return <p>No locations in this area</p>;

  return (
    <div className='flex flex-col gap-4 px-6'>
      <div>This show different types of locations card</div>
      <div className='grid w-full gap-5 md:grid-cols-3'>
        {locationsData?.map((item, index) => (
          <LocationCard key={index} data={item as Location} showOpeningHourButton />
        ))}
      </div>
      <div className='grid w-full gap-5 md:grid-cols-3'>
        {locationsData?.map((item, index) => (
          <LocationCard key={index} data={item as Location} imagePosition='top' size='small' showOpeningHourButton />
        ))}
      </div>
      <div className='flex gap-4'>
        {locationsData?.map((item, index) => (
          <LocationCard key={index} data={item as Location} imagePosition='top' showOpeningHourButton />
        ))}
      </div>
    </div>
  );
};

export default LocationList;
