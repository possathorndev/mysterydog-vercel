'use client';
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Components
import Loader from '@/components/GoogleMap/Loader';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 37.437041393899676,
  lng: -4.191635586788259,
};

const locations = [
  { lat: 37.437041393899676, lng: -4.191635586788259 },
  { lat: 37.440575591901045, lng: -4.231433159434073 },
];

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} loadingElement={<Loader />}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
