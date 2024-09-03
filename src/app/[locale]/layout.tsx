import type { Metadata } from 'next';
import AuthSessionProvider from '@/contexts/AuthSessionProvider';
import APIQueryProvider from '@/contexts/APIQueryProvider';

// Components
import { ThemeProvider } from '@/components/ThemeProvider/theme-provider';
import { Toaster } from '@/components/ui/toaster';

// Fonts
import { Balsamiq_Sans, Gaegu } from 'next/font/google';

import { locales } from '@/constants/config';

// Internationalisation
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

// Providers
import { LocationQueryContextProvider } from '@/contexts/LocationQueryProvider';
import { GeolocationContextProvider } from '@/contexts/GeolocationProvider';

// Components
import Navbar from '@/components/Navbar/navbar';

// Styles
import '@/styles/globals.css';
import '@/styles/custom-style.scss';

const balsamiqSans = Balsamiq_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const gaegu = Gaegu({
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Mystery Dog',
    default: 'Mystery Dog',
  },
  description: `Your ultimate guide to exploring the city with your furry friends! Discover the best pet-friendly cafes, restaurants, malls, and parks that Bangkok has to offer. Our easy-to-use map view allows you to effortlessly find and navigate to all the pet-friendly spots in the city. Whether you're looking for a cozy cafe to enjoy a coffee with your pet, a restaurant that welcomes your four-legged companion, a mall that accommodates pets, or a park for some outdoor fun, we've got you covered. Start your pet-friendly adventure in Bangkok today!`,
  openGraph: {
    images: [''],
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale || 'en'} suppressHydrationWarning>
      <body
        style={
          {
            '--font-sans': balsamiqSans.style.fontFamily,
            '--font-gaegu': gaegu.style.fontFamily,
            fontFamily: balsamiqSans.style.fontFamily, // Set default font family
          } as React.CSSProperties
        }
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <AuthSessionProvider>
            <APIQueryProvider>
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
            </APIQueryProvider>
          </AuthSessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
