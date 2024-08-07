import Navbar from '@/components/Navbar/navbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className='fixed top-0 z-50 w-full'>
        <Navbar />
      </div>
      {children}
    </NextIntlClientProvider>
  );
}
