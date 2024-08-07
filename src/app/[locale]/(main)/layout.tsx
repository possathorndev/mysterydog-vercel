import Footer from '@/components/Footer/Footer';
import MapPin from '@/components/MapPin/MapPin';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='relative pb-9 pt-24'>{children}</div>
      <div className='w-full'>
        <Footer />
      </div>
      <MapPin />
    </>
  );
}
