import Homepage from '@/components/Homepage/Homepage';
import { findHomeServerSide } from '@/lib/api/home';

export default async function Home() {
  const data = await findHomeServerSide();

  return <Homepage initialData={data} />;
}
