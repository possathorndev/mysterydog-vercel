import { LocalePrefix } from 'next-intl/routing';

export const locales = ['en', 'th'];
export const defaultLocale = 'en';

export const defaultCity = 'bangkok';
export const allowCities = [defaultCity];

export const LOCATION_PATH = '/locations';
export const MAPS_PATH = '/maps';
export const BLOGS_PATH = '/blogs';

export const NavbarMenuList = [
  {
    title: 'Home',
    key: 'Home',
    url: '/',
  },
  {
    title: 'Area List',
    key: 'AreaList',
    url: `${LOCATION_PATH}/${defaultCity}`,
  },
  {
    title: 'Maps',
    key: 'Maps',
    url: MAPS_PATH,
  },
  {
    title: 'Blogs',
    key: 'Blogs',
    url: BLOGS_PATH,
  },
];

export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';
