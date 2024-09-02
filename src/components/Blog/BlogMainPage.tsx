'use client';

import BannerImages from '@/components/Homepage/BannerImages';
import { useBlogPage, useBlogs } from '@/hooks/useBlog';
import { BlogCMS } from '@/lib/api/blog';
import { Link } from '@/utils/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const BlogMainPage = ({ initialData }: { initialData?: BlogCMS }) => {
  const { data } = useBlogPage({ initialData });
  const { blogs, isLoading } = useBlogs();
  const tGlobal = useTranslations('Global');
  const tBlogPage = useTranslations('BlogPage');

  const blogsData = useMemo(() => {
    return blogs?.data?.map((blog) => blog.attributes);
  }, [blogs]);

  return (
    <div className='mx-auto flex w-full flex-col gap-6'>
      <BannerImages images={data?.bannerImages} />

      <div>
        <div>[{tBlogPage('blogListHeader')}]</div>
        <div className='flex flex-wrap gap-4'>
          {data?.categories?.data?.map((category) => (
            <Link key={category.id} href={`/blogs/${category.attributes.slug}`} className='text-primary'>
              [{category.attributes.name}]
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div>[{tBlogPage('popularBlogHeader')}]</div>
        <div>[{tBlogPage('popularBlogSubHeader')}]</div>

        <div className='flex flex-wrap gap-4'>
          {data?.popularBlogs?.data?.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.attributes.categories?.data?.[0]?.attributes?.slug}/${blog.attributes.slug}`}
              className='text-primary'
            >
              [{blog.attributes.title}]
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div>[{tBlogPage('newBlogHeader')}]</div>
        <div>[{tBlogPage('newBlogSubHeader')}]</div>
        {isLoading ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>{tGlobal('loading')}</div>
        ) : !blogsData?.length ? (
          <div className='text-center font-gaegu text-lg font-bold text-secondary'>
            &quot;{tBlogPage('noBlog')}&quot;
          </div>
        ) : (
          <div className='flex flex-wrap gap-4'>
            {blogsData?.map((blog, index) => (
              <Link
                key={index}
                href={`/blogs/${blog.categories?.data?.[0]?.attributes?.slug}/${blog.slug}`}
                className='text-primary'
              >
                [{blog.title}]
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogMainPage;
