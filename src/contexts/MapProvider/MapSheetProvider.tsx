'use client';

import { createContext, useContext, useMemo, useState } from 'react';

// Components
import { Sheet } from '@/components/ui/sheet';

type MapSheetContextValues = {
  open: boolean;
  triggerOpen: (isOpen: boolean, content: JSX.Element) => void;
  triggerClose: () => void;
};

const initialState: MapSheetContextValues = {
  open: false,
  triggerOpen: () => {},
  triggerClose: () => {},
};

export const MapSheetContext: React.Context<MapSheetContextValues> = createContext<MapSheetContextValues>(initialState);

export const MapSheetContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [content, setContent] = useState<JSX.Element>();

  const triggerOpen = (isOpen: boolean, sheetContent: JSX.Element) => {
    setContent(sheetContent);
    setOpen(isOpen);
  };

  const triggerClose = () => setOpen(false);

  return (
    <MapSheetContext.Provider
      value={{
        open,
        triggerOpen,
        triggerClose,
      }}
    >
      {children}
      <Sheet open={open} modal={false}>
        {content}
      </Sheet>
    </MapSheetContext.Provider>
  );
};

export function useMapSheetCtx(): MapSheetContextValues {
  const context = useContext(MapSheetContext);

  if (!context) {
    throw new Error('Missing MapSheet context');
  }
  return context;
}
