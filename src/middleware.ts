import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

import { auth } from '@/auth';

import { locales, defaultLocale, localePrefix } from '@/constants/config';

const privatePages = ['/profile', '/profile/test'];
const authPages = ['/login', '/register'];

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
  const isAuthPage = testPathnameRegex(authPages, req.nextUrl.pathname);
  const session = req.auth;

  if (!session && !isAuthPage) return NextResponse.redirect(new URL('/login', req.nextUrl));
  if (session && isAuthPage) return NextResponse.redirect(new URL('/', req.nextUrl));

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
