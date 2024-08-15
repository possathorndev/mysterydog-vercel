import LocationPage from '@/components/Locations/Location/LocationPage';
import { allowCities } from '@/constants/config';
import { notFound } from 'next/navigation';

export default async function City({ params }: { params: { city: string } }) {
  if (!allowCities.includes(params.city)) {
    return notFound();
  }

  return <LocationPage />;
}
