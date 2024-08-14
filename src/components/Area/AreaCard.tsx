'use client';

import { MAPS_PATH } from '@/constants/config';
import { Area } from '@/lib/api/areas';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useMemo } from 'react';

const AreaCard = ({ data, locationCount, border }: { data: Area; locationCount?: number; border?: boolean }) => {
  const secondaryLocale = useMemo(() => {
    const selected = data?.localizations?.data?.[0];

    return selected?.attributes;
  }, [data]);

  return (
    <Link href={`${MAPS_PATH}?areas=${data.slug}`}>
      <div className={cn('flex items-center justify-between p-2', border && 'rounded-md border-2')}>
        <div className='flex flex-col'>
          <div className='text-sm text-secondary'>{data.name}</div>
          {!!secondaryLocale && <div className='text-xs text-font-description'>{secondaryLocale.name}</div>}
        </div>
        {locationCount !== undefined && <div className='text-sm text-font-description'>({locationCount})</div>}
      </div>
    </Link>
  );
};

export default AreaCard;
