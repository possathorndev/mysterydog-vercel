'use client';

import Link from 'next/link';
import Image from 'next/image';

import { NavbarMenuList } from '@/constants/config';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocaleSwitcher from '@/components/Navbar/RightNavbar/LocaleSwitcher';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const HamburgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations('Navbar');

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='bg-primary hover:bg-primary/80'>
          {open ? <X className='h-6 w-6 text-white' /> : <Menu className='h-6 w-6 text-white' />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[100vw] p-4'>
        <DropdownMenuGroup>
          {NavbarMenuList.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={cn(
                'text-white focus:bg-accent/10 focus:text-white',
                index % 2 == 0 ? 'rotate-1' : '-rotate-1',
              )}
            >
              <Link
                href={item.url}
                key={index}
                style={{ backgroundColor: item.color }}
                className='flex w-full items-center justify-between gap-4 rounded-3xl px-4 py-2'
                onClick={() => setOpen(false)}
              >
                <span>{t(item.key)?.toUpperCase()}</span>
                <span className='font-gaegu'>{t(item.descriptionKey)}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuGroup className='mt-4'>
          <span className='ml-2 text-sm'>{t('ChangeLanguage')}</span>
          <div className='ml-2 mt-1 w-[102px]'>
            <LocaleSwitcher color='support-main' />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileNavbar = () => {
  return (
    <div className='flex w-full items-center justify-between'>
      <HamburgerMenu />
      <Link href='/'>
        <Image className='w-[158px]' src='/logo.png' alt='Mystery Dog Logo' width={158} height={25} />
      </Link>
      <SearchBar />
    </div>
  );
};

export default MobileNavbar;
