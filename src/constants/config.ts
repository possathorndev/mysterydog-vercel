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
    descriptionKey: 'HomeDescription',
    url: '/',
    color: '#98C002',
  },
  {
    title: 'Area List',
    key: 'AreaList',
    descriptionKey: 'AreaListDescription',
    url: `${LOCATION_PATH}/${defaultCity}`,
    color: '#0F1EAF',
  },
  {
    title: 'Maps',
    key: 'Maps',
    descriptionKey: 'MapsDescription',
    url: MAPS_PATH,
    color: '#E8A302',
  },
  {
    title: 'Blogs',
    key: 'Blogs',
    descriptionKey: 'BlogsDescription',
    url: BLOGS_PATH,
    color: '#007AFF',
  },
];

export const localePrefix: LocalePrefix<typeof locales> = 'as-needed';
