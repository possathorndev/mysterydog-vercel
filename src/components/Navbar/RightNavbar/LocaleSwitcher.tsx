import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const LocaleSwitcher = () => {
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
    <>
      <Link href={pathname} locale='en' aria-disabled={locale === 'en'} onClick={(e) => handleLocaleSwitch(e, 'en')}>
        EN
      </Link>
      <Link href={pathname} locale='th' onClick={(e) => handleLocaleSwitch(e, 'th')} className='mx-2'>
        TH
      </Link>
    </>
  );
};

export default LocaleSwitcher;
