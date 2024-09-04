import Footer from '@/components/Footer/Footer';
import MapPin from '@/components/MapPin/MapPin';
import { locales } from '@/constants/config';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  return (
    <>
      <div className='relative pt-[70px]'>{children}</div>
      <div className='w-full'>{/*<Footer />*/}</div>
      <MapPin />
    </>
  );
}
