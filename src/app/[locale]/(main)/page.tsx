import Homepage from '@/components/Homepage/Homepage';
import { findHomeServerSide } from '@/lib/api/home';

export default async function Home({ params }: { params: { locale: string } }) {
  const data = await findHomeServerSide({ locale: params.locale });

  return <Homepage initialData={data} />;
}
