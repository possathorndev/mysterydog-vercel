'use client';
import React, { useMemo } from 'react';

import useLocations from '@/hooks/useLocation';

// Components
import LocationCard from '@/components/Locations/Location/LocationCard';

const LocationList = () => {
  const { isLoading, data } = useLocations();

  // TODO: location context
  const locationsData = useMemo(() => {
    return data?.data?.flatMap((location) => location.attributes);
  }, [data]);

  if (isLoading) return <p>Loading ...</p>;

  if (!locationsData || locationsData?.length < 1) return <p>No locations in this area</p>;

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid w-full gap-5 px-6 md:grid-cols-3'>
        {locationsData?.map((item, index) => <LocationCard key={index} data={item} />)}
      </div>
    </div>
  );
};

export default LocationList;
