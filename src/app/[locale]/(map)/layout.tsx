import { MapParamsContextProvider } from '@/contexts/MapProvider/MapParamsProvider';
import { MapSheetContextProvider } from '@/contexts/MapProvider/MapSheetProvider';
import { MapFormContextProvider } from '@/contexts/MapProvider/MapFormProvider';
import { Suspense } from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // return <div className='relative pt-[70px]'>{children}</div>;
  return (
    <Suspense fallback={null}>
      <MapParamsContextProvider>
        <MapFormContextProvider>
          <MapSheetContextProvider>
            <div className='relative'>{children}</div>
          </MapSheetContextProvider>
        </MapFormContextProvider>
      </MapParamsContextProvider>
    </Suspense>
  );
}
