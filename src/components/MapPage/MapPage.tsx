'use client';

import React, { useEffect, useMemo, useState } from 'react';

// Components
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import Directory from '@/components/MapPage/Directory/Directory';
import SearchFormWithFilter, { LocationSearchQuery } from '@/components/SearchBar/SearchFormWithFilter';

// Hooks
import useLocations, { useLocationBySlug } from '@/hooks/useLocation';
import { useLocationQueryCtx } from '@/contexts/LocationQueryProvider';
import { useMapParamsCtx } from '@/contexts/MapParamsProvider';

// Types
import { Location } from '@/lib/api/locations';

const MapPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<Location | undefined>();

  const { locations } = useLocations();
  const { handleSearch, handleFilter } = useLocationQueryCtx();
  const { selectedLocation, handleUpdateParams } = useMapParamsCtx();
  const { data, isLoading } = useLocationBySlug(selectedLocation);

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  const onSearch = async (searchQuery: LocationSearchQuery) => {
    handleUpdateParams('search', searchQuery.search);
    await handleSearch(searchQuery.search);
  };

  const onFilter = async (searchQuery: LocationSearchQuery) => {
    await handleFilter({
      categories: searchQuery.selectedCategories,
      services: searchQuery.selectedServices,
      areas: searchQuery.selectedAreas,
    });
  };

  const onMarkerSelect = async (marker?: Location) => {
    setSelectedMarker(marker);
    handleUpdateParams('selected', marker?.slug);
  };

  useEffect(() => {
    if (!data) return;

    setSelectedMarker(data);
  }, [data, selectedLocation]);

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
        onMarkerSelect={onMarkerSelect}
      />

      {/* DIRECTORY */}
      <Directory selectedMarker={selectedMarker} onMarkerDeselect={() => onMarkerSelect(undefined)} />
    </div>
  );
};

export default MapPage;
