'use client';

import { MAPS_PATH } from '@/constants/config';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MapBanner = ({ border }: { border?: boolean }) => {
  const t = useTranslations('HomePage');
  return (
    <div
      className={cn('relative h-56 w-full bg-primary/10', border && 'rounded-md border-2')}
      style={{
        backgroundImage: 'url(/images/maps.png)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(255,255,255,0.5)',
        backgroundBlendMode: 'lighten',
      }}
    >
      <div className='flex h-full flex-col justify-between md:flex-row'>
        <div className='hidden h-full w-full flex-col justify-end gap-2 px-4 py-2 md:flex md:w-1/3 md:p-6 md:px-4 md:py-4'>
          <div className='text-2xl font-bold text-font-header'>{t('mapTitle')}</div>
          <div className='font-gaegu text-xl text-font-description'>{t('mapDescription')}</div>
        </div>
        <div className='flex h-full w-full flex-col justify-end px-4 py-2 md:w-1/3 md:p-6 md:px-4 md:py-4'>
          <div className='relative flex h-28 w-full justify-between rounded-md bg-white p-4'>
            <div className='absolute -top-[75px] left-4 block md:hidden'>
              <Image src='/images/french-bulldog.png' alt='French Bulldog' width={85} height={75} />
            </div>
            <div className='flex w-2/3 flex-col gap-2'>
              <div className='text-2xl font-bold text-primary'>{t('mapLinkTitle')}</div>
              <div className='font-gaegu text-base font-light leading-4 text-secondary'>{t('mapLinkDescription')}</div>
            </div>
            <Link
              className='ml-4 flex w-1/3 flex-col items-center justify-center gap-2 rounded-md bg-secondary/10 p-0'
              href={MAPS_PATH}
            >
              <Image src='/icons/arrow-up-right.png' alt='Map Pin' width={18} height={18} />
              <div className='text-center text-sm font-bold text-secondary'>{t('mapLinkNavigate')}</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapBanner;
