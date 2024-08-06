'use client';
import React, { useMemo } from 'react';

import useVenues from '@/hooks/useVenue';

// Components
import VenueCard from '@/components/Venues/Venue/VenueCard';

const VenueList = () => {
  const { isLoading, data } = useVenues();

  // TODO: venue context
  const venuesData = useMemo(() => {
    return data?.data?.flatMap((venue) => venue.attributes);
  }, [data]);

  if (isLoading) return <p>Loading ...</p>;

  if (!venuesData || venuesData?.length < 1) return <p>No venues in this area</p>;

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid w-full gap-5 px-6 md:grid-cols-3'>
        {venuesData?.map((item, index) => <VenueCard key={index} data={item} />)}
      </div>
    </div>
  );
};

export default VenueList;
