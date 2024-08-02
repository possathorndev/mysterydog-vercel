import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/utils/navigation';

const LocaleSwitcher = () => {
  const locale = useLocale();

  return (
    <>
      <Link href='/' locale='en' aria-disabled={locale === 'en'} onClick={(e) => locale === 'en' && e.preventDefault()}>
        EN
      </Link>
      <Link href='/' locale='th' onClick={(e) => locale === 'th' && e.preventDefault()} className='mx-2'>
        TH
      </Link>
    </>
  );
};

export default LocaleSwitcher;
