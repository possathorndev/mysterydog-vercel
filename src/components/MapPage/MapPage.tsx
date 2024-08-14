'use client';

import React, { useMemo, useState } from 'react';

// Components
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import Directory from '@/components/MapPage/Directory/Directory';

// Hooks
import useLocations from '@/hooks/useLocation';
import { useLocationQueryCtx } from '@/contexts/LocationQueryProvider';

// Types
import { Location } from '@/lib/api/locations';
import SearchFormWithFilter, { LocationSearchQuery } from '@/components/SearchBar/SearchFormWithFilter';

const MapPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<Location | undefined>();

  const { locations } = useLocations();
  const { handleSearch, handleFilter } = useLocationQueryCtx();

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  const onSearch = async (searchQuery: LocationSearchQuery) => {
    await handleSearch(searchQuery.search);
  };

  const onFilter = async (searchQuery: LocationSearchQuery) => {
    await handleFilter({
      categories: searchQuery.selectedCategories,
      services: searchQuery.selectedServices,
      areas: searchQuery.selectedAreas,
    });
  };

  return (
    <div className='h-[calc(100vh-70px)]'>
      <div className='absolute z-40 w-full pt-[70px]'>
        <div className='mx-auto max-w-screen-2xl bg-white px-2'>
          <SearchFormWithFilter handleSearch={onSearch} handleFilter={onFilter} />
        </div>
      </div>

      {/* MAP */}
      <GoogleMap
        locations={locationsData as Location[]}
        selectedMarker={selectedMarker}
        onMarkerSelect={(marker) => setSelectedMarker(marker)}
      />

      {/* DIRECTORY */}
      <Directory selectedMarker={selectedMarker} onMarkerDeselect={() => setSelectedMarker(undefined)} />
    </div>
  );
};

export default MapPage;
