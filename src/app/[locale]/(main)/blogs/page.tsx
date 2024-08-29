import BlogMainPage from '@/components/Blog/BlogMainPage';
import { findBlogCMSServerSide } from '@/lib/api/blog';
import { unstable_setRequestLocale } from 'next-intl/server';

export default async function Page({ params }: { params: { locale: string } }) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  const data = await findBlogCMSServerSide({ locale: params.locale });

  return <BlogMainPage initialData={data} />;
}
