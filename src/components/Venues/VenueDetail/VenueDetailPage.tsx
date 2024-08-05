'use client';
import React from 'react';

// Components
import VenueDetailHeader from '@/components/Venues/VenueDetail/VenueDetailHeader';
import VenueDetailContent from '@/components/Venues/VenueDetail/VenueDetailContent';
import useVenues, { useVenueBySlug } from '@/hooks/useVenue';
import { useParams } from 'next/navigation';

const VenueDetailPage = () => {
  const { slug } = useParams();

  const { data } = useVenueBySlug(slug as string);

  return (
    <div className='m-auto flex max-w-3xl flex-col items-center space-y-4 py-12'>
      {/* HEADER */}
      <VenueDetailHeader data={data} />

      {/* DETAIL */}
      <VenueDetailContent data={data} />
    </div>
  );
};

export default VenueDetailPage;
