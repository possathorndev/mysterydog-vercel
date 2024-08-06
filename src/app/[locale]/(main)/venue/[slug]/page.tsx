import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

// API
import { HydrationBoundary } from '@tanstack/react-query';
import { prefetchQuerySSR } from '@/lib/api/utils/query';
import { findVenueBySlugSSR } from '@/lib/api/venues';
import { generatePageMetadata } from '@/lib/api/utils/metadata';

// Components
import VenueDetailPage from '@/components/Venues/VenueDetail/VenueDetailPage';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    query: params.slug,
    fn: findVenueBySlugSSR,
  });

  if (!metadata) return {};

  return {
    title: metadata.name,
  };
}

export default async function Page({ params }: Props) {
  const dehydratedState = await prefetchQuerySSR({
    queryKey: ['venue', params.slug],
    queryFn: findVenueBySlugSSR,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <VenueDetailPage slug={params.slug} />
    </HydrationBoundary>
  );
}
