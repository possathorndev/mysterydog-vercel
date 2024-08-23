import createMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { locales, defaultLocale, localePrefix } from '@/constants/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(th/en)/:path*', // (th|en) for both locales

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};

export default auth((request) => {
  return intlMiddleware(request);
});
