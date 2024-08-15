import { MapParamsContextProvider } from '@/contexts/MapParamsProvider';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // return <div className='relative pt-[70px]'>{children}</div>;
  return (
    <MapParamsContextProvider>
      <div className='relative'>{children}</div>
    </MapParamsContextProvider>
  );
}
