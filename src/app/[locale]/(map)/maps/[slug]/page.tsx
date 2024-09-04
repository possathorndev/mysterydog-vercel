import MapPage from '@/components/MapPage/MapPage';
import { findLocationBySlugSSR } from '@/lib/api/locations';
import { generatePageMetadata } from '@/lib/api/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';
import { prefetchQuerySSR } from '@/lib/api/utils/query';
import { HydrationBoundary } from '@tanstack/react-query';
import SelectedMapPage from '@/components/MapPage/SelectedMapPage';

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

export default async function Page({ params }: Props) {
  const dehydratedState = await prefetchQuerySSR({
    queryKey: ['location', params.slug],
    queryFn: findLocationBySlugSSR,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <SelectedMapPage slug={params.slug} />
    </HydrationBoundary>
  );
}
