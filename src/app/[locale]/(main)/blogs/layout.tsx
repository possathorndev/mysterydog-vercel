import { locales } from '@/constants/config';
import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(params.locale);

  return (
    <div className='mx-auto my-6 flex min-h-[calc(100vh-230px)] max-w-screen-2xl flex-col gap-6 px-6'>{children}</div>
  );
}
