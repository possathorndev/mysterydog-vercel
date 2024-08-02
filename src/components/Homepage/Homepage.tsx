'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Homepage() {
  const t = useTranslations('HomePage');
  const session = useSession();

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='mb-8 w-1/2 rounded-xl border-2 px-8 py-8'>
        <h1 className='mb-2 text-xl'>Font Family</h1>
        <h1 className='font-sans text-primary'>Balsamiq Sans: {t('title')}</h1>
        <h1 className='font-gaegu text-lg text-primary'>Gaegu: {t('title')}</h1>
      </div>

      <div className='mb-8 w-1/2 rounded-xl border-2 px-8 py-8'>
        <h1 className='mb-2 text-xl'>Authentication</h1>
        <h1 className='font-sans text-primary'>status: {session?.status}</h1>
        <h1 className='font-sans text-primary'>user: {session?.data?.user?.username || '-'}</h1>
      </div>
    </main>
  );
}
