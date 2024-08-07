'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { NavbarMenuList } from '@/constants/config';
import { cn } from '@/lib/utils';
import RightNavbar from '@/components/Navbar/RightNavbar/RightNavbar';

const DesktopNavbar = () => {
  const pathname = usePathname();

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
              className={cn('pt-1 text-base font-bold text-secondary', pathname.includes(item.url) && 'text-[#0F1EAF]')}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <RightNavbar />
    </div>
  );
};

export default DesktopNavbar;
