import { findBlogBySlugSSR } from '@/lib/api/blog';
import { generatePageMetadata } from '@/lib/api/utils/metadata';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string; category: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await generatePageMetadata({
    query: params.slug,
    fn: findBlogBySlugSSR,
  });

  if (!metadata) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${metadata.title} - Blogs`,
    description: metadata.description,
    openGraph: {
      images: [metadata.bannerImages?.data?.[0]?.attributes?.url, ...previousImages],
    },
  };
}

export default async function Page({ params }: Props) {
  return (
    <div>
      <div>Blog Category: {params.category}</div>
      <div>Blog Slug: {params.slug}</div>
    </div>
  );
}
