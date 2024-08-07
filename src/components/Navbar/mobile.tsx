'use client';

import Link from 'next/link';
import Image from 'next/image';

import { NavbarMenuList } from '@/constants/config';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Search, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocaleSwitcher from '@/components/Navbar/RightNavbar/LocaleSwitcher';

const HamburgerMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='bg-primary hover:bg-primary/80'>
          {open ? <X className='h-6 w-6 text-white' /> : <Menu className='h-6 w-6 text-white' />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[100vw] bg-primary p-4 text-white'>
        <DropdownMenuGroup>
          {NavbarMenuList.map((item, index) => (
            <DropdownMenuItem key={index} className='focus:bg-accent/10 focus:text-white'>
              <Link
                href={item.url}
                key={index}
                className='flex w-full items-center gap-4 py-2'
                onClick={() => setOpen(false)}
              >
                <Image src='/icons/arrow-right.png' alt='Mystery Dog Logo' width={18} height={18} />
                <span>{item.title.toUpperCase()}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuGroup className='mt-4'>
          <span className='ml-2 text-sm'>Change Language</span>
          <div className='ml-2 mt-1 w-[102px]'>
            <LocaleSwitcher color='secondary' />
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
      <Button variant='outline' size='icon' className='bg-secondary/10 hover:bg-secondary/20'>
        <Search className='h-6 w-6 text-secondary' />
      </Button>
    </div>
  );
};

export default MobileNavbar;
