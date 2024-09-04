import { findBlogCategoryBySlugSSR } from '@/lib/api/blog';
import { generatePageMetadata } from '@/lib/api/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    query: params.category,
    fn: findBlogCategoryBySlugSSR,
  });

  if (!metadata) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${metadata.name} - Blogs`,
    description: metadata.shortDescription,
    openGraph: {
      images: [metadata.bannerImages?.data?.[0]?.attributes?.url, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  return <div>Blog Category: {params.category}</div>;
}
