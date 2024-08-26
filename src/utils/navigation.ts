import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { localePrefix, locales } from '@/constants/config';

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});
