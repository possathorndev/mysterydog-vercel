import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/consts/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldHandle = /^\/(?!api\/|_next\/|_vercel\/|.*\..*).*$/.test(pathname);

  if (!shouldHandle) return;

  return intlMiddleware(request);
}
