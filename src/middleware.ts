import createMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { locales, defaultLocale, localePrefix } from '@/constants/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(th)/:path*', // (th|en) for both locales

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const shouldHandle = /^\/(?!api\/|_next\/|_vercel\/|.*\..*).*$/.test(pathname);

  if (!shouldHandle) return;

  return intlMiddleware(request);
});
