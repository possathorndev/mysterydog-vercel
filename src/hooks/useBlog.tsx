import { useQuery } from '@tanstack/react-query';

// API
import { BlogCMS, findBlogBySlug, findBlogCMS, findBlogs } from '@/lib/api/blog';
import { useLocale } from 'next-intl';

export const useBlogPage = ({ initialData }: { initialData?: BlogCMS }) => {
  const locale = useLocale();

  const { data, isLoading } = useQuery({
    queryKey: ['blog-cms', locale],
    queryFn: () => findBlogCMS({ locale }),
    initialData,
  });

  return { data, isLoading };
};

// Find Blogs
export const useBlogs = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => {
      return findBlogs({
        query: {
          sort: ['createdAt:desc'],
          filters: {},
        },
      });
    },
  });

  return {
    blogs,
    isLoading,
  };
};

// Find Blog from slug
export const useBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => findBlogBySlug(slug),
    enabled: !!slug,
  });
};
