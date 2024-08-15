'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import SearchForm from '@/components/SearchBar/SearchForm';
import { useRouter } from 'next/navigation';
import CategorySelect from '@/components/SearchBar/CategorySelect';
import { MAPS_PATH } from '@/constants/config';

const SearchBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = async (search: string) => {
    router.push(`${MAPS_PATH}?search=${search}`);
    setOpen(false);
  };

  const handleCategorySelect = async (slug: string) => {
    router.push(`${MAPS_PATH}?categories=${slug}`);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='bg-secondary/10 hover:bg-secondary/20'>
          {open ? <X className='h-6 w-6 text-secondary' /> : <Search className='h-6 w-6 text-secondary' />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='h-[calc(100vh-60px)] w-[100vw]'>
        <SearchForm handleSubmit={handleSearch} />
        <DropdownMenuSeparator />
        <CategorySelect handleSubmit={handleCategorySelect} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchBar;
