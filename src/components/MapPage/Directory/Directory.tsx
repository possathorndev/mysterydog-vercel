import { useEffect, useState } from 'react';

// Components
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// API
import { Location } from '@/lib/api/locations';

// Types
import { StringToBoolean } from 'class-variance-authority/types';

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
      <Sheet open={open} modal={false}>
        <SheetContent side={'bottom' as StringToBoolean<'bottom'>} className='rounded-t-2xl'>
          <SheetHeader>
            <SheetTitle>{selectedMarker?.name}</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </SheetDescription>
            <SheetClose asChild>
              <Button
                variant='ghost'
                className='absolute right-1 top-1 border-0 text-primary'
                onClick={onMarkerDeselect}
              >
                <X className='h-5 w-5' />
              </Button>
            </SheetClose>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Directory;
