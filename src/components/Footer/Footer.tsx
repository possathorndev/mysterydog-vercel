import { NavbarMenuList } from '@/constants/config';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SocialList = [
  {
    name: 'facebook',
    url: 'https://www.facebook.com/',
    image: '/icons/facebook.png',
  },
  {
    name: 'tiktok',
    url: 'https://www.tiktok.com/',
    image: '/icons/tiktok.png',
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/',
    image: '/icons/instagram.png',
  },
];

const Footer = () => {
  return (
    <div className='h-[140px] w-full border-t-[1px] border-[#007AFF29] bg-white sm:h-[90px]'>
      <div className='mx-auto flex h-full max-w-screen-2xl items-center justify-between px-6 py-2'>
        <div className='flex flex-col gap-2'>
          <Image src='/secondary-logo.png' alt='Mystery Dog Logo' width={158} height={25} />
          <div className='text-xs font-light text-secondary'>@ {new Date().getFullYear().toString()} - Copyright</div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col items-end gap-1 sm:flex-row sm:items-start sm:gap-4'>
            {NavbarMenuList.map((item, index) => (
              <Link href={item.url} key={index} className='text-xs text-secondary'>
                {item.title}
              </Link>
            ))}
          </div>
          <div className='flex justify-end gap-1'>
            {SocialList.map((item, index) => (
              <Link key={index} href={item.url} target='_blank' rel='noreferrer noopener'>
                <Image src={item.image} alt={item.name} width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
