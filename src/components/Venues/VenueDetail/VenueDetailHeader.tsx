import React from 'react';
import { Venue } from '@/lib/api/venues';

const VenueDetailHeader = ({ data, isLoading }: { data?: Venue; isLoading: boolean }) => {
  if (isLoading) return <span>Loading ...</span>;

  return (
    <div className='flex max-w-3xl flex-col gap-3 py-10'>
      <div className='flex w-full flex-col gap-3'>
        <p className='text-green text-xs'>Venue: {data.slug}</p>
        <h3 className='font-pixel8 text-4xl font-bold uppercase'>{data.name}</h3>
        <p className='text-description text-base'>
          Ut sagittis sollicitudin eu neque. Egestas auctor dictum tempus sed sagittis. Congue ornare lacus vel
          fringilla nulla eu tellus
        </p>
      </div>
      <div className='flex w-full justify-between border-t py-3'>
        <div className='text-left'>
          <p className='text-green text-xs'>Engineering</p>
          <p className='text-base'>Crypto ipsum bitcoin ethereum</p>
        </div>
        <div className='text-right'>
          <p className='text-green text-xs'>Engineering</p>
          <p className='text-base'>Crypto ipsum bitcoin ethereum</p>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailHeader;
