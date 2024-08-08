'use client';

import React, { useMemo, useState } from 'react';

// Components
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import Directory from '@/components/MapPage/Directory/Directory';

// Types
import { Location } from '@/lib/api/locations';
import useLocations from '@/hooks/useLocation';

const MapPage = () => {
  const [selectedMarker, setSelectedMarker] = useState<Location | undefined>();

  const { isLoading, data } = useLocations();

  // TODO: location context
  const locationsData = useMemo(() => {
    return data?.data?.flatMap((location) => location.attributes);
  }, [data]);

  return (
    <div className='h-[calc(100vh-70px)]'>
      {/* MAP */}
      <GoogleMap
        locations={locationsData}
        selectedMarker={selectedMarker}
        onMarkerSelect={(marker) => setSelectedMarker(marker)}
      />

      {/* DIRECTORY */}
      <Directory selectedMarker={selectedMarker} onMarkerDeselect={() => setSelectedMarker(undefined)} />
    </div>
  );
};

export default MapPage;
