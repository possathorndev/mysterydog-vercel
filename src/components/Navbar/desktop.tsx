'use client';

import { Link } from '@/utils/navigation';
import Image from 'next/image';
import { usePathname } from '@/utils/navigation';

import { NavbarMenuList } from '@/constants/config';
import { cn } from '@/lib/utils';
import RightNavbar from '@/components/Navbar/RightNavbar/RightNavbar';
import { useTranslations } from 'next-intl';

const DesktopNavbar = () => {
  const pathname = usePathname();
  const t = useTranslations('Navbar');

  return (
    <div className='flex w-full items-center justify-between'>
      <div className='flex gap-8'>
        <Link href='/'>
          <Image className='w-[158px]' src='/logo.png' alt='Mystery Dog Logo' width={158} height={25} />
        </Link>
        <div className='flex items-center gap-8'>
          {NavbarMenuList.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className={cn(
                'pt-1 text-base font-bold text-secondary',
                index !== 0 && pathname.includes(item.url) && 'rounded-full bg-font-header p-3 text-white',
                pathname === '/' && index === 0 && 'rounded-full bg-font-header p-3 text-white',
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </div>

      <RightNavbar />
    </div>
  );
};

export default DesktopNavbar;
