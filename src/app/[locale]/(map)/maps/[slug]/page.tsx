import MapPage from '@/components/MapPage/MapPage';
import { findLocationBySlugSSR } from '@/lib/api/locations';
import { generatePageMetadata } from '@/lib/api/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    query: params.slug,
    fn: findLocationBySlugSSR,
  });

  if (!metadata) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${metadata.name} | Mystery Dog`,
    description: metadata.shortDescription,
    openGraph: {
      images: [metadata.thumbnailImage?.data?.attributes?.url, ...previousImages],
    },
  };
}

const Page = () => {
  return <MapPage />;
};

export default Page;
