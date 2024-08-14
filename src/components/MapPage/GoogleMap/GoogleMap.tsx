'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Components
import { Location } from '@/lib/api/locations';
import { useGeolocationCtx } from '@/contexts/GeolocationProvider';

const mapStyle = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#12608d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 0,
  lng: 0,
};

const GoogleMapComponent = ({
  locations = [],
  selectedMarker,
  onMarkerSelect,
}: {
  locations?: Location[];
  selectedMarker?: Location;
  onMarkerSelect: (marker: Location) => void;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const { currentLocation } = useGeolocationCtx();

  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (map && currentLocation?.latitude && currentLocation?.longitude) {
      const latLng = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
      map.setCenter(latLng);
    }
  }, [map, currentLocation]);

  useEffect(() => {
    if (map && locations.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      locations.forEach((location) => {
        bounds.extend(new google.maps.LatLng(location.lat, location.long));
      });

      map.fitBounds(bounds);
      map.getZoom() > 16 && map.setZoom(16);
    }
  }, [map, locations]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{
        styles: mapStyle,
      }}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(undefined)}
    >
      {locations.map((location, index) => {
        if (!map) return;

        const mainCategoryIcon = location.categories?.data?.[0]?.attributes?.iconMarker?.data?.attributes?.url;

        return (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.long }}
            onClick={() => onMarkerSelect(location)}
            icon={{
              url: mainCategoryIcon || '',
              scale: 2,
              scaledSize: new google.maps.Size(50, 55),
            }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapComponent;
