'use client';
import React from 'react';

// Components
import LocationDetailHeader from '@/components/Locations/LocationDetail/LocationDetailHeader';
import LocationDetailContent from '@/components/Locations/LocationDetail/LocationDetailContent';
import { useLocationBySlug } from '@/hooks/useLocation';

const LocationDetailPage = ({ slug }: { slug: string }) => {
  const { isLoading, data } = useLocationBySlug(slug);

  return (
    <div className='m-auto flex max-w-3xl flex-col items-center space-y-4 py-12'>
      {/* HEADER */}
      <LocationDetailHeader data={data} isLoading={isLoading} />

      {/* DETAIL */}
      <LocationDetailContent data={data} isLoading={isLoading} />
    </div>
  );
};

export default LocationDetailPage;
