import { useQuery } from '@tanstack/react-query';

// API
import { findAreaBySlug, findLocationAreas, findLocationAreasWithLocationCount } from '@/lib/api/areas';
import { useLocaleQuery } from '@/hooks/useLocaleQuery';

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

export const useAreasWithLocationCount = () => {
  const { data: areas, isLoading } = useLocaleQuery({
    queryKey: ['areasWithCount'],
    queryFn: (query) => findLocationAreasWithLocationCount({ query }),
    query: {
      sort: ['name:asc'],
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
