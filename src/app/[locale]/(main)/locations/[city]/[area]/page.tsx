import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

import { HydrationBoundary } from '@tanstack/react-query';
import { prefetchQuerySSR } from '@/lib/api/utils/query';
import { generatePageMetadata } from '@/lib/api/utils/metadata';
import { findAreaBySlugSSR } from '@/lib/api/areas';
import { toUpperCaseFirstLetter } from '@/utils/helpers';
import AreaDetailPage from '@/components/Area/AreaDetailPage';

type Props = {
  params: { city: string; area: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    query: params.area,
    fn: findAreaBySlugSSR,
  });

  if (!metadata) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${metadata.name} - ${toUpperCaseFirstLetter(params.city)}`,
    description: metadata.shortDescription,
    openGraph: {
      images: [metadata.image?.data?.attributes?.url, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  const dehydratedState = await prefetchQuerySSR({
    queryKey: ['area', params.area],
    queryFn: findAreaBySlugSSR,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <AreaDetailPage slug={params.area} />
    </HydrationBoundary>
  );
}
