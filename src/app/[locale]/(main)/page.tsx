import Homepage from '@/components/Homepage/Homepage';
import { findHomeServerSide } from '@/lib/api/home';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  const data = await findHomeServerSide({ locale: params.locale });

  return <Homepage initialData={data} />;
}
