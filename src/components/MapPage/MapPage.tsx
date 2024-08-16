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
import QuickFilterMenu from '@/components/SearchBar/QuickFilterMenu/QuickFilterMenu';

const MapPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<Location | undefined>();
  const [filterInit, setFilterInit] = useState<boolean>(false);

  const { locations } = useLocations();
  const { handleSearch, handleFilter } = useLocationQueryCtx();
  const { selectedLocation, handleUpdateParams, handleSelectLocation } = useMapParamsCtx();
  const { data } = useLocationBySlug(selectedLocation);

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes);
  }, [locations]);

  const onSearch = async (searchQuery: LocationSearchQuery) => {
    if (!searchQuery?.search) return;

    handleUpdateParams('search', searchQuery.search);
    await handleSearch(searchQuery.search);
  };

  const onFilter = async (searchQuery: LocationSearchQuery) => {
    await handleFilter({
      categories: searchQuery?.selectedCategories || [],
      services: searchQuery?.selectedServices || [],
      areas: searchQuery?.selectedAreas || [],
    });

    setTimeout(() => setFilterInit(true), 1000);
    filterInit && setSelectedMarker(undefined);
  };

  const onMarkerSelect = async (data?: Location) => {
    setSelectedMarker(data);
    handleSelectLocation(data?.slug || '');
  };

  useEffect(() => {
    data && setSelectedMarker(data);
  }, [data, selectedLocation]);

  return (
    <div className='h-[calc(100vh-70px)]'>
      <div className='absolute z-10 w-full pt-[70px] md:z-30'>
        <div className='md:flex'>
          <div className='w-full bg-white md:ml-[20px] md:mt-[20px] md:max-h-[55px] md:w-[420px] md:rounded-xl'>
            <SearchFormWithFilter handleSearch={onSearch} handleFilter={onFilter} />
          </div>
          <div className='z-10'>
            <QuickFilterMenu handleFilter={onFilter} />
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
