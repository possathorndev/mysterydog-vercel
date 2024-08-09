import type { Metadata } from 'next';
import AuthSessionProvider from '@/contexts/AuthSessionProvider';
import APIQueryProvider from '@/contexts/APIQueryProvider';

// Components
import { ThemeProvider } from '@/components/ThemeProvider/theme-provider';
import { Toaster } from '@/components/ui/toaster';

// Fonts
import { Balsamiq_Sans, Gaegu } from 'next/font/google';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
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
            <APIQueryProvider>{children}</APIQueryProvider>
          </AuthSessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
