import React from 'react';

const LocationHeader = () => {
  return (
    <div className='flex flex-col gap-2 px-6 py-16 text-center'>
      <h3 className='font-pixel8 text-3xl font-bold uppercase'>See what we&apos;ve been up to</h3>
      <p className='text-description text-lg'>Here are the list of interesting locations</p>
    </div>
  );
};

export default LocationHeader;
