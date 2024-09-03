'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface GeolocationContextValues {
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
  error: string | null;
}

export const GeolocationContext = createContext<GeolocationContextValues | undefined>(undefined);

interface GeolocationProviderProps {
  children: ReactNode;
}

export const GeolocationContextProvider: React.FC<GeolocationProviderProps> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function fetch() {
      if ('geolocation' in navigator) {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              if (!position.coords.latitude) throw new Error('Coords not found');

              setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (err) => {
              setError(err.message);
            },
          );
        } catch (err) {
          console.log('... fetch geolocation error', err);
        }
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }
    fetch();
  }, []);

  return <GeolocationContext.Provider value={{ currentLocation, error }}>{children}</GeolocationContext.Provider>;
};

export default GeolocationContextProvider;

export function useGeolocationCtx(): GeolocationContextValues {
  const context = useContext(GeolocationContext);

  if (!context) {
    throw new Error('Missing Geolocation context');
  }

  return context;
}
