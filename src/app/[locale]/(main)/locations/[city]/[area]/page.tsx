import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

// API
import { HydrationBoundary } from '@tanstack/react-query';
import { prefetchQuerySSR } from '@/lib/api/utils/query';
import { generatePageMetadata } from '@/lib/api/utils/metadata';
import { findAreaBySlugSSR } from '@/lib/api/areas';

// Components
import LocationDetailPage from '@/components/Locations/LocationDetail/LocationDetailPage';

type Props = {
  params: { area: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    query: params.area,
    fn: findAreaBySlugSSR,
  });

  if (!metadata) return {};

  return {
    title: metadata.name,
    description: metadata.shortDescription,
  };
}

export default async function Page({ params }: Props) {
  const dehydratedState = await prefetchQuerySSR({
    queryKey: ['area', params.area],
    queryFn: findAreaBySlugSSR,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      {/* <LocationDetailPage slug={params.area} /> */}
      {params.area}
    </HydrationBoundary>
  );
}
