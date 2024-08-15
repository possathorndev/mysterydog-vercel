// Internationalisation
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

// Providers
import { LocationQueryContextProvider } from '@/contexts/LocationQueryProvider';
import { GeolocationContextProvider } from '@/contexts/GeolocationProvider';

// Components
import Navbar from '@/components/Navbar/navbar';

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocationQueryContextProvider>
        <GeolocationContextProvider>
          <div className='fixed top-0 z-50 w-full'>
            <Navbar />
          </div>
          {children}
        </GeolocationContextProvider>
      </LocationQueryContextProvider>
    </NextIntlClientProvider>
  );
}
