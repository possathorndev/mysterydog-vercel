import { useQuery } from '@tanstack/react-query';

// API
import { findBlogBySlug, findBlogs } from '@/lib/api/blog';

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
