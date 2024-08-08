import React from 'react';

// Components
import LocationHeader from '@/components/Locations/Location/LocationHeader';
import LocationList from '@/components/Locations/Location/LocationList';

const LocationPage = () => {
  return (
    <div className='max-w-screen-fullhd m-auto flex flex-col items-center space-y-4 py-4'>
      {/* HEADER */}
      <LocationHeader />

      {/* BLOG LIST */}
      <LocationList />
    </div>
  );
};

export default LocationPage;
