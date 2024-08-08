// Components
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { StringToBoolean } from 'class-variance-authority/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Location } from '@/lib/api/locations';

const Directory = ({
  selectedMarker,
  onMarkerDeselect,
}: {
  selectedMarker?: Location;
  onMarkerDeselect: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(!!selectedMarker);
  }, [selectedMarker]);

  return (
    <>
      <Sheet open={open} onOpenChange={onMarkerDeselect} modal={false}>
        <SheetContent side={'bottom' as StringToBoolean<'bottom'>} className='rounded-t-2xl'>
          <SheetHeader>
            <SheetTitle>{selectedMarker?.name}</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Directory;
