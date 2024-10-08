// export { auth as middleware } from '@/auth';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { auth } from '@/auth';
import { locales, defaultLocale, localePrefix } from '@/constants/config';

const privatePages = ['/profile'];
const authPages = ['/auth/login', '/auth/register'];

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  return RegExp(
    `^(/(${locales.join('|')}))?(${pages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  ).test(pathName);
};

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

const authMiddleware = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPrivatePage = testPathnameRegex(privatePages, nextUrl.pathname);
  const isAuthPage = testPathnameRegex(authPages, nextUrl.pathname);

  if (!isLoggedIn && isPrivatePage) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }
  return intlMiddleware(req);
});

export default function middleware(req: NextRequest) {
  const isPrivatePage = testPathnameRegex(privatePages, req.nextUrl.pathname);
  const isAuthPage = testPathnameRegex(authPages, req.nextUrl.pathname);

  if (isAuthPage || isPrivatePage) {
    return (authMiddleware as any)(req);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
