import React from 'react';

// UI
import { Link } from '@/navigation';
import { useLocale } from 'next-intl';

const RightNavbar = () => {
  const locale = useLocale();

  return (
    <div className='right-navbar-content flex items-center'>
      <Link href='/' locale='en' aria-disabled={locale === 'en'} onClick={(e) => locale === 'en' && e.preventDefault()}>
        EN
      </Link>
      <Link href='/' locale='th' onClick={(e) => locale === 'th' && e.preventDefault()} className='mx-2'>
        TH
      </Link>
    </div>
  );
};

export default RightNavbar;
