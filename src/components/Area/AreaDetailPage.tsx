'use client';

import { useAreaBySlug } from '@/hooks/useArea';
import GoogleMap from '@/components/MapPage/GoogleMap/GoogleMap';
import { ScrollArea } from '@/components/ui/scroll-area';
import AreaInfo from '@/components/Area/AreaInfo';
import MenuBreadcrumb from '@/components/MenuBreadcrumb';
import { LOCATION_PATH } from '@/constants/config';
import MapBanner from '@/components/Homepage/MapBanner';
import useLocations from '@/hooks/useLocation';
import React, { useEffect, useMemo, useState } from 'react';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';
import { useMapSheetCtx } from '@/contexts/MapProvider/MapSheetProvider';
import { useFormContext } from 'react-hook-form';
import { Location } from '@/lib/api/locations';
import PlaceWidget from '@/components/MapPage/MapSheet/PlaceWidget/PlaceWidget';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslations } from 'next-intl';

const AreaDetailPage = ({ slug }: { slug: string }) => {
  const tGlobal = useTranslations('Global');

  const [hideAreaContent, setHideAreaContent] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { handleSelectLocation } = useMapParamsCtx();
  const { triggerOpen } = useMapSheetCtx();

  const { data: areas, isLoading: isAreaLoading } = useAreaBySlug(slug);
  const { locations, isLocationLoading } = useLocations({
    query: {
      populate: ['areas'],
      filters: { areas: { slug: { $eq: slug } } },
    },
  });

  const areaData = useMemo(() => {
    return areas?.data?.[0]?.attributes;
  }, [locations]);

  const locationsData = useMemo(() => {
    return locations?.pages?.flatMap((page) => page.data).map((location) => location.attributes) || [];
  }, [locations]);

  const form = useFormContext();

  const onLocationClick = async (data?: Location) => {
    if (!data) return;

    handleSelectLocation(data.slug || '', 'push');
    form.setValue('selectedLocation', data.slug);
    triggerOpen(true, <PlaceWidget slug={data.slug} />);

    !isDesktop && setHideAreaContent(true);
  };

  const markerSelectCallback = () => {
    !isDesktop && setHideAreaContent(true);
  };

  useEffect(() => {
    const handleStateChange = () => setHideAreaContent(false);
    handleStateChange();
    window.addEventListener('popstate', handleStateChange);

    return () => window.removeEventListener('popstate', handleStateChange);
  }, [setHideAreaContent]);

  return (
    <div className='h-[calc(100vh-70px)]'>
      {!hideAreaContent && (
        <div className='absolute left-0 top-0 z-10 mt-[70px] h-[calc(100vh-70px)] w-full bg-white md:max-w-[460px]'>
          {isAreaLoading ? (
            <div className='text-center font-gaegu text-lg font-bold text-secondary'>{tGlobal('loading')}</div>
          ) : !areaData ? (
            <div className='text-center font-gaegu text-lg font-bold text-secondary'>&quot;No Data&quot;</div>
          ) : (
            <>
              <MenuBreadcrumb
                data={[{ title: 'Bangkok', href: `${LOCATION_PATH}/bangkok` }, { title: areaData.name }]}
              />
              <ScrollArea className='h-[calc(100vh-125px)] w-full'>
                {/* Map Banner - for mobile */}
                <div className='lg:hidden'>
                  <MapBanner />
                </div>
                <AreaInfo
                  area={areaData}
                  totalLocations={areaData?.locationsCount || 0}
                  locations={locationsData}
                  isLocationLoading={isLocationLoading}
                  onLocationClick={(location) => onLocationClick(location)}
                />
              </ScrollArea>
            </>
          )}
        </div>
      )}

      <GoogleMap locations={locationsData} onMarkerSelectCallback={markerSelectCallback} />
    </div>
  );
};

export default AreaDetailPage;
