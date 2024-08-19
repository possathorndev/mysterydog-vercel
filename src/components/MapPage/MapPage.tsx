'use client';

import React, { useEffect, useMemo, useState } from 'react';

// Components
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import Directory from '@/components/MapPage/Directory/Directory';
import SearchFormWithFilter from '@/components/SearchBar/SearchFormWithFilter';
import QuickFilterMenu from '@/components/MapPage/MapSheet/QuickFilterMenu/QuickFilterMenu';

// Hooks
import useLocations, { useLocationBySlug } from '@/hooks/useLocation';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';
import { useFormContext } from 'react-hook-form';

// Types
import { Location } from '@/lib/api/locations';

const MapPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<Location | undefined>();

  const form = useFormContext();
  const { watch, setValue } = form;
  const locationWatch = watch('selectedLocation');

  const { locations } = useLocations();
  const { selectedLocation, handleSelectLocation } = useMapParamsCtx();
  const { data } = useLocationBySlug(selectedLocation);

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  const onMarkerSelect = async (data?: Location) => {
    setSelectedMarker(data);
    handleSelectLocation(data?.slug || '');
    setValue('selectedLocation', data?.slug);
  };

  useEffect(() => {
    data && onMarkerSelect(data);
  }, [data, selectedLocation]);

  useEffect(() => {
    !locationWatch && setSelectedMarker(undefined);
  }, [locationWatch]);

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
      <GoogleMap
        locations={locationsData as Location[]}
        selectedMarker={selectedMarker}
        onMarkerSelect={onMarkerSelect}
      />

      {/* DIRECTORY */}
      <Directory selectedMarker={selectedMarker} onMarkerDeselect={() => onMarkerSelect(undefined)} />
    </div>
  );
};

export default MapPage;
