'use client';

import { useAreaBySlug } from '@/hooks/useArea';
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import { ScrollArea } from '@/components/ui/scroll-area';
import AreaInfo from '@/components/Area/AreaInfo';
import MenuBreadcrumb from '@/components/MenuBreadcrumb';
import { LOCATION_PATH } from '@/constants/config';
import MapBanner from '@/components/Homepage/MapBanner';

const AreaDetailPage = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useAreaBySlug(slug);

  return (
    <div className='relative max-h-[calc(100vh-200px)] w-full overflow-hidden'>
      <div className='absolute left-0 top-0 z-10 h-full w-full bg-white lg:w-1/2 xl:w-1/3'>
        {isLoading ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>Loading...</div>
        ) : !data ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>&quot;No Data&quot;</div>
        ) : (
          <>
            <MenuBreadcrumb data={[{ title: 'Bangkok', href: `${LOCATION_PATH}/bangkok` }, { title: data.name }]} />
            <ScrollArea className='h-full w-full pb-12'>
              {/* Map Banner - for mobile */}
              <div className='lg:hidden'>
                <MapBanner />
              </div>
              <AreaInfo data={data} />
            </ScrollArea>
          </>
        )}
      </div>
      <GoogleMap locations={[]} onMarkerSelect={() => {}} />
    </div>
  );
};

export default AreaDetailPage;
