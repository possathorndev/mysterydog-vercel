'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Components
import Loader from '@/components/MapPage/GoogleMap/Loader';
import { Location } from '@/lib/api/locations';

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
  lat: 13.8677124,
  lng: 100.4160849,
};

const GoogleMapComponent = ({
  locations = [],
  selectedMarker,
  onMarkerSelect,
}: {
  locations: Location[];
  selectedMarker?: Location;
  onMarkerSelect: (marker: Location) => void;
}) => {
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (map && navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  }, [map, navigator]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} loadingElement={<Loader />}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          styles: mapStyle,
        }}
        onLoad={(map) => setMap(map)}
      >
        {locations.map((location, index) => {
          if (!map) return;

          return (
            <>
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.long }}
                onClick={() => onMarkerSelect(location)}
                icon={{
                  url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                  anchor: new google.maps.Point(0, 20),
                  strokeWeight: 10,
                }}
              />
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.long }}
                onClick={() => onMarkerSelect(location)}
                icon={{
                  path: 'M17.4348 2.94043C15.6625 2.93949 13.9075 3.2861 12.27 3.96044C10.6324 4.63477 9.14457 5.62362 7.89141 6.87043C6.63825 8.11724 5.64437 9.59755 4.9666 11.2268C4.28883 12.856 3.94046 14.6021 3.94141 16.3654C3.9413 19.2056 4.84704 21.9726 6.52823 24.268C8.20942 26.5634 10.5793 28.2689 13.2968 29.1388C14.0764 29.4003 14.7761 29.855 15.3301 30.46C15.8841 31.0651 16.2741 31.8006 16.4632 32.5971L16.6504 33.3131C16.6854 33.4926 16.7822 33.6543 16.924 33.7705C17.0658 33.8868 17.2438 33.9504 17.4276 33.9503C17.6101 33.9487 17.7864 33.8844 17.9267 33.7683C18.0671 33.6521 18.1628 33.4914 18.1976 33.3131L18.3847 32.5971C18.5738 31.8006 18.9638 31.0651 19.5178 30.46C20.0718 29.855 20.7716 29.4003 21.5511 29.1388C24.2686 28.2689 26.6385 26.5634 28.3197 24.268C30.0009 21.9726 30.9066 19.2056 30.9065 16.3654C30.9065 12.8086 29.4879 9.39716 26.9621 6.88011C24.4362 4.36305 21.0097 2.94612 17.4348 2.94043Z',
                  fillColor: 'blue',
                  fillOpacity: 1,
                  strokeWeight: 0,
                  rotation: 0,
                  scale: 2,
                  anchor: new google.maps.Point(0, 20),
                }}
              />
            </>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
