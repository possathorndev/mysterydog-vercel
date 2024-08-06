import type { Metadata } from 'next';
import AuthSessionProvider from '@/contexts/AuthSessionProvider';
import { ThemeProvider } from '@/components/ThemeProvider/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import APIQueryProvider from '@/contexts/APIQueryProvider';

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
  title: 'Create Next App',
  description: 'Generated by create next app',
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
