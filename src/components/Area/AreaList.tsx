'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import BlogCard from '@/components/Blog/BlogCard';
import { LOCATION_PATH } from '@/constants/config';
import { useBlogs } from '@/hooks/useBlog';
import { Area } from '@/lib/api/areas';
import { FindResponse, ListResponseData } from '@/lib/api/utils/common';
import AreaCard from '@/components/Area/AreaCard';

const AreaList = ({ data, isLoading }: { data?: ListResponseData<Area>; isLoading?: boolean }) => {
  const tHome = useTranslations('HomePage');
  const tGlobal = useTranslations('Global');

  const areas = useMemo(() => {
    return data?.data?.map((location) => location.attributes);
  }, [data]);

  return (
    <div className='flex w-full flex-col gap-2 py-2 md:gap-6 md:py-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='text-2xl font-bold text-font-header'>{tHome('popularAreaHeader')}</div>
        <Link className='font-gaegu text-lg font-bold text-secondary' href={LOCATION_PATH}>
          {tGlobal('seeAll')}
        </Link>
      </div>

      {isLoading ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>Loading...</div>
      ) : !areas?.length ? (
        <div className='text-center font-gaegu text-lg font-bold text-secondary'>
          &quot;No Popular Areas Found&quot;
        </div>
      ) : (
        <div className='grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-8'>
          {areas?.map((area, index) => <AreaCard key={index} data={area} />)}
        </div>
      )}
    </div>
  );
};

export default AreaList;
