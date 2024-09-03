'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/utils/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LocaleSwitcher = ({ color = 'primary' }: { color?: 'primary' | 'secondary' | 'support-main' }) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const handleLocaleSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectLocale = e.currentTarget.value;

    if (locale === selectLocale) {
      e.preventDefault();
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: selectLocale });
    });

    queryClient.invalidateQueries();
  };

  return (
    <div
      className={cn(
        'rounded-md',
        color === 'primary' && 'bg-accent',
        color === 'secondary' && 'bg-accent/15',
        color === 'support-main' && 'bg-support-main',
      )}
    >
      <Button
        variant='ghost'
        className={cn(
          'm-1 h-8 rounded-sm px-3 font-bold',
          color === 'primary' && 'inherit text-gray-500 hover:bg-primary/20 hover:text-gray-500',
          color === 'secondary' && 'text-white hover:bg-inherit hover:text-white',
          color === 'support-main' && 'text-white hover:bg-inherit hover:text-white',
          locale === 'en' && color === 'primary' && 'bg-primary text-white hover:bg-primary/80 hover:text-white',
          locale === 'en' && color === 'secondary' && 'bg-white text-primary hover:bg-white/80 hover:text-primary',
          locale === 'en' &&
            color === 'support-main' &&
            'hover:text-support-main text-support-main bg-white hover:bg-white/80',
        )}
        disabled={isPending}
        onClick={handleLocaleSwitch}
        value='en'
      >
        EN
      </Button>
      <Button
        variant='ghost'
        className={cn(
          'm-1 h-8 rounded-sm px-3 font-bold',
          color === 'primary' && 'inherit text-gray-500 hover:bg-primary/20 hover:text-gray-500',
          color === 'secondary' && 'text-white hover:bg-inherit hover:text-white',
          color === 'support-main' && 'text-white hover:bg-inherit hover:text-white',
          locale === 'th' && color === 'primary' && 'bg-primary text-white hover:bg-primary/80 hover:text-white',
          locale === 'th' && color === 'secondary' && 'bg-white text-primary hover:bg-white/80 hover:text-primary',
          locale === 'th' &&
            color === 'support-main' &&
            'hover:text-support-main text-support-main bg-white hover:bg-white/80',
        )}
        disabled={isPending}
        onClick={handleLocaleSwitch}
        value='th'
      >
        TH
      </Button>
    </div>
  );
};

export default LocaleSwitcher;
