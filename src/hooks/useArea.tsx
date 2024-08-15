import { useQuery } from '@tanstack/react-query';

// API
import { findAreaBySlug, findLocationAreas } from '@/lib/api/areas';

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

export const useAreaBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['area', slug],
    queryFn: () => findAreaBySlug(slug),
    enabled: !!slug,
  });
};
