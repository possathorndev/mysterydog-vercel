import AreasPage from '@/components/Area/AreasPage';
import { allowCities } from '@/constants/config';
import { toUpperCaseFirstLetter } from '@/utils/helpers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = params;

  return {
    title: toUpperCaseFirstLetter(city),
    description: 'Explore all pet friendly areas in ' + city,
  };
}

export default async function City({ params }: Props) {
  if (!allowCities.includes(params.city)) {
    return notFound();
  }

  return <AreasPage />;
}
