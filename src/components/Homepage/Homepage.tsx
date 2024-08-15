'use client';

import useHome from '@/hooks/useHome';
import { Home } from '@/lib/api/home';
import BannerImages from '@/components/Homepage/BannerImages';
import CategoryList from '@/components/Category/CategoryList';
import MapBanner from '@/components/Homepage/MapBanner';
import LocationNearMe from '@/components/Homepage/LocationNearMe';
import BlogList from '@/components/Blog/BlogList';
import AreaList from '@/components/Area/AreaList';

export default function Homepage({ initialData }: { initialData?: Home }) {
  const { data } = useHome({ initialData });

  return (
    <div className='mx-auto flex w-full flex-col gap-4'>
      <BannerImages images={data?.bannerImages} />
      <div className='mx-auto flex max-w-screen-2xl flex-col gap-6 px-2 md:gap-8 md:px-6 xl:px-0'>
        {/* Reverse order when desktop */}
        <div className='flex flex-col gap-6 md:flex-col-reverse'>
          <MapBanner />
          <CategoryList data={data?.categories?.data?.map((item) => item.attributes)} />
        </div>
        <LocationNearMe />
      </div>
      <BlogList />
      <div className='mx-auto w-full max-w-screen-2xl px-2 md:px-6'>
        <AreaList data={data?.popularAreas} />
      </div>
    </div>
  );
}
