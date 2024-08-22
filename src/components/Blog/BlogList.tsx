'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import BlogCard from '@/components/Blog/BlogCard';
import { BLOGS_PATH } from '@/constants/config';
import { useBlogs } from '@/hooks/useBlog';

const BlogList = () => {
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
        ) : (
          <div className='flex flex-wrap justify-center gap-4'>
            {blogsData?.map((blog, index) => <BlogCard key={index} data={blog} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
