'use client';

import CategoryThumbnailCard from '@/components/Category/CategoryThumbnailCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Category } from '@/lib/api/categories';
import { useTranslations } from 'next-intl';

const CategoryList = ({ data }: { data?: Category[] }) => {
  const t = useTranslations('Global');

  return (
    <div className='my-4 max-w-screen-2xl'>
      <div className='text-2xl font-bold text-font-header'>{t('category')}</div>
      <div className='font-gaegu text-lg font-bold text-secondary'>{t('categoryDescription')}</div>
      <ScrollArea className='w-[calc(100vw-25px)] max-w-screen-2xl whitespace-nowrap md:w-[calc(100vw-50px)]'>
        <div className='mt-4 flex gap-2'>
          {data?.map((item, index) => <CategoryThumbnailCard key={index} data={item} />)}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};

export default CategoryList;
