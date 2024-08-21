import React from 'react';

// Components
import LocationCard from '@/components/Locations/Location/LocationCard';

// Types
import { Location } from '@/lib/api/locations';
import { Button } from '@/components/ui/button';

interface Props {
  data?: Location[];
  isLoading: boolean;
  hasMoreData: boolean;
  isLoadingMoreData: boolean;
  loadMoreData: () => void;
}

export const PlaceList = React.forwardRef<HTMLDivElement, Props>(
  ({ data, isLoading, hasMoreData, isLoadingMoreData, loadMoreData }, ref) => {
    return (
      <div className='grid gap-4 py-4'>
        {data?.map((location, index) => <LocationCard key={index} data={location} showOpeningHourButton />)}
        {hasMoreData && !!data?.length && (
          <div className='flex w-full items-center justify-center pb-4' ref={ref}>
            <Button
              variant='secondary'
              className='mx-6 w-full md:w-1/4'
              onClick={loadMoreData}
              disabled={isLoadingMoreData || !hasMoreData}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    );
  },
);

PlaceList.displayName = 'PlaceList';

export default PlaceList;
