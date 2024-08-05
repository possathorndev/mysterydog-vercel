'use client';
import React from 'react';

import useVenues from '@/hooks/useVenue';

// Components
import VenueCard from '@/components/Venues/Venue/VenueCard';

const VenueList = () => {
  const { data } = useVenues();

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid w-full gap-5 px-6 md:grid-cols-3'>
        {data?.map((item, index) => <VenueCard key={index} data={item} />)}
      </div>
    </div>
  );
};

export default VenueList;
