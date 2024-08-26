'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import BlogCard from '@/components/Blog/BlogCard';
import { BLOGS_PATH } from '@/constants/config';
import { useBlogs } from '@/hooks/useBlog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const BlogList = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const tHome = useTranslations('HomePage');
  const tGlobal = useTranslations('Global');
  const tBlogPage = useTranslations('BlogPage');

  const { blogs, isLoading } = useBlogs();
  const blogsData = useMemo(() => {
    return blogs?.data?.map((location) => location.attributes);
  }, [blogs]);

  return (
    <div className='md:bg-secondary/10'>
      <div className='mx-auto my-4 flex max-w-screen-2xl flex-col gap-2 px-2 md:my-8 md:gap-6 md:px-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='md:flex md:flex-col'>
            <div className='text-2xl font-bold text-font-header'>{tHome('blogHeader')}</div>
            <div className='hidden font-gaegu text-lg font-bold text-secondary md:block'>
              {tHome('blogDescription')}
            </div>
          </div>
          <Link className='font-gaegu text-lg font-bold text-secondary' href={BLOGS_PATH}>
            {tGlobal('seeAll')}
          </Link>
        </div>

        {isLoading ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>{tGlobal('loading')}</div>
        ) : !blogsData?.length ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>
            &quot;{tBlogPage('noBlog')}&quot;
          </div>
        ) : isDesktop ? (
          <div className='flex flex-wrap justify-center gap-4'>
            {blogsData?.map((blog, index) => <BlogCard key={index} data={blog} />)}
          </div>
        ) : (
          <ScrollArea className='w-[calc(100vw-25px)] max-w-screen-2xl whitespace-nowrap md:w-[calc(100vw-50px)]'>
            <div className='mt-4 flex gap-2'>
              {blogsData?.map((blog, index) => <BlogCard key={index} data={blog} />)}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default BlogList;
