'use client';
import React from 'react';

// Components
import VenueDetailHeader from '@/components/Venues/VenueDetail/VenueDetailHeader';
import VenueDetailContent from '@/components/Venues/VenueDetail/VenueDetailContent';
import { useVenueBySlug } from '@/hooks/useVenue';

const VenueDetailPage = ({ slug }: { slug: string }) => {
  const { isLoading, data } = useVenueBySlug(slug);

  return (
    <div className='m-auto flex max-w-3xl flex-col items-center space-y-4 py-12'>
      {/* HEADER */}
      <VenueDetailHeader data={data} isLoading={isLoading} />

      {/* DETAIL */}
      <VenueDetailContent data={data} isLoading={isLoading} />
    </div>
  );
};

export default VenueDetailPage;
