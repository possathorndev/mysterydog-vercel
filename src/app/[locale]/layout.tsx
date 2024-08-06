import Navbar from '@/components/Navbar/navbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className='fixed top-0 z-50 w-full bg-[#0D0D0D]'>
        <Navbar />
      </div>
      <div className='relative pb-9 pt-24'>{children}</div>
      {/* <Footer /> */}
    </NextIntlClientProvider>
  );
}
