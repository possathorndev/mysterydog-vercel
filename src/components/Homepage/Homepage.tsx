'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Homepage() {
  const t = useTranslations('HomePage');

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className=''>Default: {t('title')}</h1>
      <h1 className='font-sans'>Balsamiq Sans: {t('title')}</h1>
      <h1 className='font-gaegu'>Gaegu: {t('title')}</h1>
    </main>
  );
}
