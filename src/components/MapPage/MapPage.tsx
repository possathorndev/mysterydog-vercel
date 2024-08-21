'use client';

import React, { useEffect, useMemo, useState } from 'react';

// Components
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import SearchFormWithFilter from '@/components/SearchBar/SearchFormWithFilter';
import QuickFilterMenu from '@/components/MapPage/MapSheet/QuickFilterMenu/QuickFilterMenu';

// Hooks
import useLocations from '@/hooks/useLocation';

// Types
import { Location } from '@/lib/api/locations';

const MapPage = () => {
  const { locations } = useLocations();

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  return (
    <div className='h-[calc(100vh-70px)]'>
      <div className='absolute z-10 w-full pt-[70px] md:z-30'>
        <div className='md:flex'>
          <div className='w-full bg-white md:ml-[20px] md:mt-[20px] md:max-h-[55px] md:w-[420px] md:rounded-xl'>
            <SearchFormWithFilter />
          </div>
          <div className='z-10'>
            <QuickFilterMenu />
          </div>
        </div>
      </div>

      {/* MAP */}
      <GoogleMap locations={locationsData as Location[]} />
    </div>
  );
};

export default MapPage;
