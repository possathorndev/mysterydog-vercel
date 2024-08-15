import AreasPage from '@/components/Area/AreasPage';
import { allowCities } from '@/constants/config';
import { toUpperCaseFirstLetter } from '@/utils/helpers';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { city: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { city } = params;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: toUpperCaseFirstLetter(city),
    description: 'Explore all pet friendly areas in ' + city,
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default async function City({ params }: Props) {
  if (!allowCities.includes(params.city)) {
    return notFound();
  }

  return <AreasPage />;
}
