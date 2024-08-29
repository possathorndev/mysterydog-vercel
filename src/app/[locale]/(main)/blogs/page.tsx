import BlogMainPage from '@/components/Blog/BlogMainPage';
import { findBlogCMSServerSide } from '@/lib/api/blog';
import { Metadata, ResolvingMetadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({}, parent: ResolvingMetadata): Promise<Metadata> {
  const metadata = await findBlogCMSServerSide({});

  if (!metadata) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${metadata.title}`,
    description: metadata.shortDescription,
    openGraph: {
      images: [metadata.bannerImages?.data?.[0]?.attributes?.url, ...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  const data = await findBlogCMSServerSide({ locale: params.locale });

  return <BlogMainPage initialData={data} />;
}
