'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { BLOGS_PATH } from '@/constants/config';
import { Blog } from '@/lib/api/blog';
import readingTime from 'reading-time';

const BlogCard = ({ data }: { data: Blog }) => {
  const defaultCategory = useMemo(() => data?.categories?.data?.[0]?.attributes, [data?.categories]);

  const readTime = useMemo(() => readingTime(data.content), [data.content]);

  return (
    <Link href={`${BLOGS_PATH}/${data.slug}`}>
      <div
        className='flex h-52 w-64 flex-col justify-between overflow-hidden rounded-lg p-2 md:p-4'
        style={{ backgroundColor: defaultCategory.color }}
      >
        <div className='flex flex-col gap-3'>
          <div
            className='w-fit rounded-md bg-white px-2 font-gaegu text-lg font-bold'
            style={{ color: defaultCategory.color }}
          >
            {defaultCategory.name}
          </div>
          <div className='text-lg text-white'>{data.title}</div>
        </div>
        <div className='font-gaegu text-lg text-white'>Read Time: {readTime.text?.replace('read', '')}</div>
      </div>
    </Link>
  );
};

export default BlogCard;
