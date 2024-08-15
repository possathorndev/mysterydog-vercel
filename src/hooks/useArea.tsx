import { useQuery } from '@tanstack/react-query';

// API
import { findLocationAreas } from '@/lib/api/areas';

// Find Blogs
export const useAreas = () => {
  const { data: areas, isLoading } = useQuery({
    queryKey: ['areas'],
    queryFn: () => {
      return findLocationAreas({
        query: {
          sort: ['name:asc'],
          filters: {},
        },
      });
    },
  });

  return {
    areas,
    isLoading,
  };
};
