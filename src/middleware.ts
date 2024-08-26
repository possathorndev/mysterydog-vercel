import createMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { locales, defaultLocale, localePrefix } from '@/constants/config';
import { NextRequest } from 'next/server';

const publicPages = [
  '/',
  '/locations',
  '/locations/*',
  '/maps',
  '/maps/*',
  // (/secret requires auth)
];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

const authMiddleware = auth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // if (isPublicPage) {
  //   return intlMiddleware(req);
  // } else {
  //   return (authMiddleware as any)(req);
  // }

  return intlMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

// export const config = {
//   matcher: [
//     // Enable a redirect to a matching locale at the root
//     '/',

//     // Set a cookie to remember the previous locale for
//     // all requests that have a locale prefix
//     '/(th/en)/:path*', // (th|en) for both locales

//     // Enable redirects that add missing locales
//     // (e.g. `/pathnames` -> `/en/pathnames`)
//     '/((?!api|_next|_vercel|.*\\..*).*)',
//   ],
// };

// export default auth((request) => {
//   return intlMiddleware(request);
// });
