import createMiddleware from 'next-intl/middleware';

import { auth } from '@/auth';
import { locales, defaultLocale } from '@/constants/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const shouldHandle = /^\/(?!api\/|_next\/|_vercel\/|.*\..*).*$/.test(pathname);

  if (!shouldHandle) return;

  return intlMiddleware(request);
});
