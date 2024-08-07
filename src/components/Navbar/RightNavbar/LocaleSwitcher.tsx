import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LocaleSwitcher = ({ color = 'primary' }: { color?: 'primary' | 'secondary' }) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleSwitch = (e, selectLocale) => {
    if (locale === selectLocale) {
      e.preventDefault();
      return;
    }
    queryClient.invalidateQueries();
  };

  return (
    <div className={cn('rounded-md', color === 'primary' && 'bg-accent', color === 'secondary' && 'bg-primary/50')}>
      <Button
        variant='ghost'
        className={cn(
          'm-1 h-8 px-3 font-bold',
          color === 'primary' && 'inherit text-gray-500 hover:bg-primary/20 hover:text-gray-500',
          color === 'secondary' && 'text-white hover:bg-inherit hover:text-white',
          locale === 'en' && color === 'primary' && 'bg-primary text-white hover:bg-primary/80 hover:text-white',
          locale === 'en' && color === 'secondary' && 'bg-white text-primary hover:bg-white/80 hover:text-primary',
        )}
        asChild
        disabled={locale === 'en'}
      >
        <Link href={pathname} locale='en' onClick={(e) => handleLocaleSwitch(e, 'en')}>
          EN
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          'm-1 h-8 px-3 font-bold',
          color === 'primary' && 'inherit text-gray-500 hover:bg-primary/20 hover:text-gray-500',
          color === 'secondary' && 'text-white hover:bg-inherit hover:text-white',
          locale === 'th' && color === 'primary' && 'bg-primary text-white hover:bg-primary/80 hover:text-white',
          locale === 'th' && color === 'secondary' && 'bg-white text-primary hover:bg-white/80 hover:text-primary',
        )}
        asChild
        disabled={locale === 'th'}
      >
        <Link href={pathname} locale='th' onClick={(e) => handleLocaleSwitch(e, 'th')}>
          TH
        </Link>
      </Button>
    </div>
  );
};

export default LocaleSwitcher;
