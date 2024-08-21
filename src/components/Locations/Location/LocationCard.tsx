'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatAddressToString } from '@/utils/helpers';

// Components
import OpeningHourLabel from '@/components/Locations/Location/OpeningHourLabel';
import ServicePopover from '@/components/Locations/Location/ServicePopover';
import { ServiceDisplayBadge } from '@/components/MapPage/MapSheet/FilterWidget/ServiceBadge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

// Types
import { Location } from '@/lib/api/locations';

const LocationCard = ({
  data,
  imagePosition = 'left',
  size = 'large',
  showOpeningHourButton,
}: {
  data: Location;
  imagePosition?: 'left' | 'top';
  size?: 'small' | 'large';
  showOpeningHourButton?: boolean;
}) => {
  const defaultCategory = useMemo(() => data?.categories?.data?.[0]?.attributes, [data?.categories]);

  return (
    <Card
      style={{
        border: `2px solid ${defaultCategory?.color || '#0307121F'}`,
        backgroundColor: defaultCategory?.color + '0A' || '#fff',
      }}
      className={cn(
        'overflow-hidden',
        size === 'small' ? 'max-w-52' : 'max-w-full',
        imagePosition === 'left' ? 'max-h-72' : 'max-h-96 min-h-72',
      )}
    >
      <CardContent className={cn('flex h-full w-full p-0', imagePosition === 'left' ? 'flex-row' : 'flex-col')}>
        <div className={cn(imagePosition === 'left' ? 'min-w-[33%]' : 'w-full')}>
          <AspectRatio
            ratio={imagePosition === 'left' ? 120 / 143 : size === 'small' ? 16 / 9 : 16 / 6}
            className={cn('bg-muted', imagePosition === 'top' && 'rounded-t-[13.8px]')}
          >
            <Image
              src={data?.thumbnailImage?.data?.attributes?.url || '/images/image-placeholder.png'}
              alt='Banner Image'
              fill
              className={cn('object-cover', imagePosition === 'top' && 'rounded-t-[13.8px]')}
            />
          </AspectRatio>
        </div>
        {/* HEX Alpha - https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4 */}
        <div className='h-full rounded-b-[13.8px] p-2 px-3'>
          <div className='flex items-center justify-between'>
            <div style={{ color: defaultCategory?.color }} className='font-gaegu text-sm'>
              {defaultCategory?.name}
            </div>
            <ServicePopover services={data.services.data.map((service) => service.attributes)} />
          </div>
          <div className='text-sm font-bold text-font-header'>{data.name}</div>
          <div className='font-gaegu text-sm text-font-description'>{formatAddressToString(data.address)}</div>
          <div className='mt-1 flex flex-wrap gap-1'>
            {data.services?.data?.map((service) => (
              <ServiceDisplayBadge key={service.id} item={service.attributes} small showIcon={false} />
            ))}
          </div>
          <div className='mt-1'>
            <OpeningHourLabel data={data.openingHours} showAllButton={showOpeningHourButton} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
