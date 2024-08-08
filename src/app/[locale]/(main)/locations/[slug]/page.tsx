import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

// API
import { HydrationBoundary } from '@tanstack/react-query';
import { prefetchQuerySSR } from '@/lib/api/utils/query';
import { findLocationBySlugSSR } from '@/lib/api/locations';
import { generatePageMetadata } from '@/lib/api/utils/metadata';

// Components
import LocationDetailPage from '@/components/Locations/LocationDetail/LocationDetailPage';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    query: params.slug,
    fn: findLocationBySlugSSR,
  });

  if (!metadata) return {};

  return {
    title: metadata.name,
  };
}

export default async function Page({ params }: Props) {
  const dehydratedState = await prefetchQuerySSR({
    queryKey: ['location', params.slug],
    queryFn: findLocationBySlugSSR,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <LocationDetailPage slug={params.slug} />
    </HydrationBoundary>
  );
}
