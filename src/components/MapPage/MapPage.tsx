'use client';

import React, { useEffect, useMemo, useState } from 'react';

// Components
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import SearchFormWithFilter from '@/components/SearchBar/SearchFormWithFilter';
import QuickFilterMenu from '@/components/MapPage/MapSheet/QuickFilterMenu/QuickFilterMenu';

// Hooks
import useLocations, { useLocationBySlug } from '@/hooks/useLocation';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';
import { useFormContext } from 'react-hook-form';

// Types
import { Location } from '@/lib/api/locations';
import { useMapSheetCtx } from '@/contexts/MapProvider/MapSheetProvider';
import PlaceWidget from '@/components/MapPage/MapSheet/PlaceWidget/PlaceWidget';

const MapPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<Location | undefined>();

  const form = useFormContext();
  const { watch, setValue } = form;
  const locationWatch = watch('selectedLocation');

  const { locations } = useLocations();
  const { selectedLocation, handleSelectLocation } = useMapParamsCtx();
  const { triggerOpen } = useMapSheetCtx();
  const { data } = useLocationBySlug(selectedMarker?.slug);

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  const onMarkerSelect = async (data?: Location) => {
    if (!data) return;

    handleSelectLocation(data.slug || '');
    setSelectedMarker(data);
    setValue('selectedLocation', data.slug);
    triggerOpen(true, <PlaceWidget place={data} />);
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
    </div>
  );
};

export default MapPage;
